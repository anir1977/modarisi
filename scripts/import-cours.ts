#!/usr/bin/env tsx
/**
 * scripts/import-cours.ts
 *
 * Imports course content from moutamadris.ma PDFs into the Supabase
 * `cours_content` table. Runs locally on your Mac — never on Vercel.
 *
 * Usage:
 *   npx tsx scripts/import-cours.ts [options]
 *
 * Options:
 *   --niveau  <1ere|2eme|3eme>   Only process this level (default: all)
 *   --matiere <maths|pc|…>       Only process this subject (default: all)
 *   --chapitre <1|2|…>           Only process this chapter id (default: all)
 *   --lecon   <1|2|…>            Only process this lesson id (default: all)
 *   --dry-run                    Parse + print, don't write to Supabase
 *   --force                      Re-generate even if already cached in Supabase
 *   --pdf-dir <path>             Directory with local PDFs (default: scripts/pdfs)
 *   --skip-pdf                   Skip PDF extraction, always generate from metadata
 *
 * PDF discovery order:
 *   1. Local file: <pdf-dir>/<niveau>/<matiere>/<chapitre>-<lecon>.pdf
 *   2. Local file: <pdf-dir>/<niveau>/<matiere>/ch<chapitre>.pdf  (whole chapter)
 *   3. Attempt download from moutamadris.ma (may be blocked outside MAR)
 *   4. Generate from curriculum metadata (always works)
 *
 * Prerequisites:
 *   npm install --save-dev tsx @types/node
 *   # pdf-parse and node-fetch are optional (for PDF extraction)
 *   npm install --save-dev pdf-parse node-fetch@2 @types/pdf-parse
 *
 * Env vars (from .env.local — loaded automatically):
 *   ANTHROPIC_API_KEY
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY   ← service role, bypasses RLS for writes
 */

import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@supabase/supabase-js";
import { CURRICULUM, LEVEL_LABELS, getSubject, getChapter, getLesson } from "../lib/curriculum";
import type { Subject, Chapter, Lesson } from "../lib/curriculum";
import * as fs from "fs";
import * as path from "path";
import * as https from "https";
import * as http from "http";
import { Buffer } from "buffer";

// ── Env loading ──────────────────────────────────────────────────────────────

function loadEnv() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;
  const raw = fs.readFileSync(envPath, "utf-8");
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx < 0) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
    if (key && !process.env[key]) process.env[key] = val;
  }
}

loadEnv();

// ── CLI args ─────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);

function getFlag(name: string): string | undefined {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && i + 1 < args.length ? args[i + 1] : undefined;
}

function hasFlag(name: string): boolean {
  return args.includes(`--${name}`);
}

const FILTER_NIVEAU   = getFlag("niveau");
const FILTER_MATIERE  = getFlag("matiere");
const FILTER_CHAPITRE = getFlag("chapitre");
const FILTER_LECON    = getFlag("lecon");
const DRY_RUN         = hasFlag("dry-run");
const FORCE           = hasFlag("force");
const SKIP_PDF        = hasFlag("skip-pdf");
const PDF_DIR         = getFlag("pdf-dir") ?? path.resolve(process.cwd(), "scripts/pdfs");

// ── Clients (lazy — initialized in main() after env validation) ───────────────

let anthropic: Anthropic;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let supabase: ReturnType<typeof createClient>;

// ── Types ─────────────────────────────────────────────────────────────────────

interface LessonContent {
  objectives:  string[];
  introduction: string;
  sections: {
    title:   string;
    content: string;
    formula: string | null;
  }[];
  examples: {
    problem: string;
    steps:   string[];
    answer:  string;
  }[];
  keyPoints:  string[];
  vocabulary: { term: string; definition: string }[];
}

// ── Utility ───────────────────────────────────────────────────────────────────

function log(msg: string) {
  process.stdout.write(msg + "\n");
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

/** Download a URL into a Buffer. Returns null on any error. */
async function fetchBuffer(url: string, timeoutMs = 15_000): Promise<Buffer | null> {
  return new Promise((resolve) => {
    const proto = url.startsWith("https") ? https : http;
    const req = proto.get(
      url,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept": "application/pdf,*/*",
          "Referer": "https://moutamadris.ma/",
        },
        timeout: timeoutMs,
      },
      (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          // Follow one redirect
          fetchBuffer(res.headers.location, timeoutMs).then(resolve);
          return;
        }
        if (!res.statusCode || res.statusCode >= 400) {
          resolve(null);
          return;
        }
        const chunks: Buffer[] = [];
        res.on("data", (c: Buffer) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks)));
        res.on("error", () => resolve(null));
      },
    );
    req.on("error", () => resolve(null));
    req.on("timeout", () => { req.destroy(); resolve(null); });
  });
}

/** Candidate PDF URLs to try for a given lesson. */
function candidatePdfUrls(
  niveau: string,
  matiere: string,
  chapitre: string,
  lecon: string,
  subject: Subject,
  chapter: Chapter,
  lesson: Lesson,
): string[] {
  // moutamadris.ma uses Arabic slugs — we approximate with numeric ids.
  // Common patterns observed on Moroccan educational WordPress sites:
  const base = "https://moutamadris.ma/wp-content/uploads";
  const year = new Date().getFullYear();
  const yearPrev = year - 1;

  const niveauSlug: Record<string, string> = {
    "1ere": "1ere-annee-college",
    "2eme": "2eme-annee-college",
    "3eme": "3eme-annee-college",
  };

  const slug = niveauSlug[niveau] ?? niveau;

  return [
    // Pattern 1: level/subject/chapter-lesson
    `${base}/${year}/${matiere}-${slug}-chapitre${chapitre}-lecon${lecon}.pdf`,
    `${base}/${yearPrev}/${matiere}-${slug}-chapitre${chapitre}-lecon${lecon}.pdf`,
    // Pattern 2: flat naming
    `${base}/${year}/${matiere}-${chapitre}-${lecon}.pdf`,
    // Pattern 3: full chapter PDFs
    `${base}/${year}/${matiere}-${slug}-chapitre${chapitre}.pdf`,
    `${base}/${yearPrev}/${matiere}-${slug}-chapitre${chapitre}.pdf`,
  ];
}

/** Find a local PDF file for this lesson. */
function findLocalPdf(
  niveau: string,
  matiere: string,
  chapitre: string,
  lecon: string,
): string | null {
  const dir = path.join(PDF_DIR, niveau, matiere);
  const candidates = [
    path.join(dir, `${chapitre}-${lecon}.pdf`),
    path.join(dir, `ch${chapitre}-l${lecon}.pdf`),
    path.join(dir, `chapitre${chapitre}-lecon${lecon}.pdf`),
    // Whole-chapter PDF
    path.join(dir, `ch${chapitre}.pdf`),
    path.join(dir, `chapitre${chapitre}.pdf`),
    path.join(dir, `${chapitre}.pdf`),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return null;
}

// ── System prompt (shared / cached) ──────────────────────────────────────────

const SYSTEM_PROMPT = `Tu es un professeur expert du programme officiel marocain (MEN) pour le collège.
Tu génères des leçons complètes, pédagogiques et adaptées aux élèves marocains.
Réponds UNIQUEMENT en JSON valide, sans markdown, sans balises, sans texte avant ou après.
Le JSON doit respecter exactement ce schéma:
{
  "objectives":    ["string", "string", "string"],
  "introduction":  "string (2-3 phrases d'accroche motivantes en français)",
  "sections": [
    {
      "title":   "string",
      "content": "string (explication claire et détaillée)",
      "formula": "string ou null (formule/règle clé, null si aucune)"
    }
  ],
  "examples": [
    {
      "problem": "string (énoncé du problème)",
      "steps":   ["string", "string", "string"],
      "answer":  "string (réponse finale)"
    }
  ],
  "keyPoints":   ["string", "string", "string"],
  "vocabulary": [
    { "term": "string", "definition": "string" }
  ]
}
IMPORTANT: Ne mentionne jamais moutamadris.ma, ni aucun autre site externe. Tout le contenu doit être original et propre.`;

// ── Content generation ────────────────────────────────────────────────────────

/** Extract + structure lesson content from a PDF buffer using Claude. */
async function extractFromPdf(
  pdfBuffer: Buffer,
  niveau: string,
  matiere: string,
  chapitre: string,
  lecon: string,
  subject: Subject,
  chapter: Chapter,
  lesson: Lesson,
): Promise<LessonContent> {
  const niveauLabel = LEVEL_LABELS[niveau] ?? niveau;
  const pdfBase64 = pdfBuffer.toString("base64");

  const response = await (anthropic.messages.create as Function)({
    model: "claude-opus-4-7",
    max_tokens: 4096,
    thinking: { type: "adaptive" },
    system: [
      {
        type: "text",
        text: SYSTEM_PROMPT,
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: [
      {
        role: "user",
        content: [
          {
            type: "document",
            source: {
              type: "base64",
              media_type: "application/pdf",
              data: pdfBase64,
            },
            title: `${subject.label} — ${chapter.title} — ${lesson.title}`,
          },
          {
            type: "text",
            text: `À partir de ce document PDF de cours, extrais et structure le contenu pour la leçon suivante:

- Matière: ${subject.label} (${subject.labelAr})
- Niveau: ${niveauLabel}
- Chapitre: ${chapter.title}
- Leçon: ${lesson.title}
- Durée estimée: ${lesson.duration}

Exigences:
- 3 objectifs pédagogiques clairs et mesurables
- Introduction motivante (2-3 phrases)
- 3-4 sections de cours détaillées avec explications progressives
- 2 exemples résolus étape par étape (contexte marocain si possible)
- 3-4 points clés à retenir
- 3-5 termes de vocabulaire importants avec définitions
- Supprime tout entête, pied de page, logo ou référence au site source
- Contenu aligné sur le programme marocain officiel MEN`,
          },
        ],
      },
    ],
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawText: string = (response as any).content?.find((b: any) => b.type === "text")?.text ?? "";

  return parseJsonResponse(rawText);
}

/** Generate lesson content from curriculum metadata (no PDF needed). */
async function generateFromMetadata(
  niveau: string,
  matiere: string,
  chapitre: string,
  lecon: string,
  subject: Subject,
  chapter: Chapter,
  lesson: Lesson,
): Promise<LessonContent> {
  const niveauLabel = LEVEL_LABELS[niveau] ?? niveau;

  const response = await (anthropic.messages.create as Function)({
    model: "claude-opus-4-7",
    max_tokens: 4096,
    thinking: { type: "adaptive" },
    system: [
      {
        type: "text",
        text: SYSTEM_PROMPT,
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: [
      {
        role: "user",
        content: `Génère une leçon complète pour:
- Matière: ${subject.label} (${subject.labelAr})
- Niveau: ${niveauLabel}
- Chapitre (${chapitre}): ${chapter.title}
- Leçon (${lecon}): ${lesson.title}
- Durée estimée: ${lesson.duration}

Exigences:
- 3 objectifs pédagogiques clairs et mesurables
- Introduction motivante (2-3 phrases)
- 3-4 sections de cours détaillées avec explications progressives
- 2 exemples résolus étape par étape (contexte marocain si possible)
- 3-4 points clés à retenir
- 3-5 termes de vocabulaire importants
- Contenu fidèle au programme marocain officiel MEN`,
      },
    ],
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawText: string = (response as any).content?.find((b: any) => b.type === "text")?.text ?? "";

  return parseJsonResponse(rawText);
}

function parseJsonResponse(raw: string): LessonContent {
  const cleaned = raw
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  const parsed = JSON.parse(cleaned) as LessonContent;

  // Validate required fields
  if (
    !Array.isArray(parsed.objectives) ||
    typeof parsed.introduction !== "string" ||
    !Array.isArray(parsed.sections) ||
    !Array.isArray(parsed.examples) ||
    !Array.isArray(parsed.keyPoints) ||
    !Array.isArray(parsed.vocabulary)
  ) {
    throw new Error("Invalid LessonContent schema from Claude response");
  }

  return parsed;
}

// ── Main import logic ─────────────────────────────────────────────────────────

interface ImportTask {
  niveau:   string;
  matiere:  string;
  chapitre: string;
  lecon:    string;
  subject:  Subject;
  chapter:  Chapter;
  lesson:   Lesson;
}

async function buildTaskList(): Promise<ImportTask[]> {
  const tasks: ImportTask[] = [];

  for (const [niveau, subjects] of Object.entries(CURRICULUM)) {
    if (FILTER_NIVEAU && niveau !== FILTER_NIVEAU) continue;

    for (const subject of subjects) {
      if (FILTER_MATIERE && subject.id !== FILTER_MATIERE) continue;

      for (const chapter of subject.chapters) {
        if (FILTER_CHAPITRE && chapter.id !== FILTER_CHAPITRE) continue;

        for (const lesson of chapter.lessons) {
          if (FILTER_LECON && lesson.id !== FILTER_LECON) continue;

          tasks.push({
            niveau,
            matiere:  subject.id,
            chapitre: chapter.id,
            lecon:    lesson.id,
            subject,
            chapter,
            lesson,
          });
        }
      }
    }
  }

  return tasks;
}

async function isAlreadyCached(
  niveau: string,
  matiere: string,
  chapitre: string,
  lecon: string,
): Promise<boolean> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await (supabase.from("cours_content") as any)
    .select("id")
    .eq("niveau", niveau)
    .eq("matiere", matiere)
    .eq("chapitre", chapitre)
    .eq("lecon", lecon)
    .maybeSingle();
  return !!data;
}

async function upsertContent(
  niveau:   string,
  matiere:  string,
  chapitre: string,
  lecon:    string,
  content:  LessonContent,
): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase.from("cours_content") as any).upsert(
    { niveau, matiere, chapitre, lecon, content },
    { onConflict: "matiere,niveau,chapitre,lecon" },
  );
  if (error) throw new Error(`Supabase upsert failed: ${error.message}`);
}

async function processTask(task: ImportTask, idx: number, total: number): Promise<"cached" | "pdf" | "generated" | "skipped" | "error"> {
  const { niveau, matiere, chapitre, lecon, subject, chapter, lesson } = task;
  const label = `[${idx + 1}/${total}] ${subject.label} › ${chapter.title} › ${lesson.title} (${niveau})`;

  // ── Skip if cached ───────────────────────────────────────────────────────
  if (!FORCE) {
    const cached = await isAlreadyCached(niveau, matiere, chapitre, lecon);
    if (cached) {
      log(`  ⏭  ${label} — already cached`);
      return "cached";
    }
  }

  log(`  ⚙  ${label}`);

  let content: LessonContent;
  let source: "pdf" | "generated";

  // ── Try PDF extraction ───────────────────────────────────────────────────
  if (!SKIP_PDF) {
    // 1. Look for local file
    const localPath = findLocalPdf(niveau, matiere, chapitre, lecon);
    if (localPath) {
      log(`     📄 Found local PDF: ${path.relative(process.cwd(), localPath)}`);
      const buf = fs.readFileSync(localPath);
      try {
        content = await extractFromPdf(buf, niveau, matiere, chapitre, lecon, subject, chapter, lesson);
        source = "pdf";
        log(`     ✅ Extracted from local PDF`);
      } catch (e) {
        log(`     ⚠  PDF extraction failed (${(e as Error).message}), falling back to generation`);
        content = await generateFromMetadata(niveau, matiere, chapitre, lecon, subject, chapter, lesson);
        source = "generated";
      }
    } else {
      // 2. Try remote download
      const urls = candidatePdfUrls(niveau, matiere, chapitre, lecon, subject, chapter, lesson);
      let pdfBuf: Buffer | null = null;
      for (const url of urls) {
        pdfBuf = await fetchBuffer(url);
        if (pdfBuf && pdfBuf.length > 1000) {
          log(`     📥 Downloaded PDF from: ${url}`);
          break;
        }
        pdfBuf = null;
      }

      if (pdfBuf) {
        try {
          content = await extractFromPdf(pdfBuf, niveau, matiere, chapitre, lecon, subject, chapter, lesson);
          source = "pdf";
          log(`     ✅ Extracted from remote PDF`);
        } catch (e) {
          log(`     ⚠  PDF extraction failed (${(e as Error).message}), falling back to generation`);
          content = await generateFromMetadata(niveau, matiere, chapitre, lecon, subject, chapter, lesson);
          source = "generated";
        }
      } else {
        log(`     🤖 No PDF found — generating from curriculum metadata`);
        content = await generateFromMetadata(niveau, matiere, chapitre, lecon, subject, chapter, lesson);
        source = "generated";
      }
    }
  } else {
    log(`     🤖 Skipping PDF — generating from curriculum metadata`);
    content = await generateFromMetadata(niveau, matiere, chapitre, lecon, subject, chapter, lesson);
    source = "generated";
  }

  // ── Write to Supabase ────────────────────────────────────────────────────
  if (DRY_RUN) {
    log(`     🔍 DRY RUN — would upsert ${source} content (objectives: ${content.objectives.length}, sections: ${content.sections.length})`);
  } else {
    await upsertContent(niveau, matiere, chapitre, lecon, content);
    log(`     💾 Saved to Supabase (source: ${source})`);
  }

  return source;
}

async function main() {
  log("");
  log("╔══════════════════════════════════════════════════╗");
  log("║   Modarisi — Course Content Importer             ║");
  log("╚══════════════════════════════════════════════════╝");
  log("");

  // ── Validate env ───────────────────────────────────────────────────────────
  const missing = [
    ["ANTHROPIC_API_KEY",          process.env.ANTHROPIC_API_KEY],
    ["NEXT_PUBLIC_SUPABASE_URL",   process.env.NEXT_PUBLIC_SUPABASE_URL],
    ["SUPABASE_SERVICE_ROLE_KEY",  process.env.SUPABASE_SERVICE_ROLE_KEY],
  ].filter(([, v]) => !v).map(([k]) => k);

  if (missing.length) {
    log(`❌ Missing env vars: ${missing.join(", ")}`);
    log("   Add them to .env.local and retry.");
    process.exit(1);
  }

  // ── Init clients ───────────────────────────────────────────────────────────
  anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
  supabase  = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  // ── Config summary ─────────────────────────────────────────────────────────
  log(`   Filters : niveau=${FILTER_NIVEAU ?? "all"} | matiere=${FILTER_MATIERE ?? "all"} | chapitre=${FILTER_CHAPITRE ?? "all"} | lecon=${FILTER_LECON ?? "all"}`);
  log(`   Options : dry-run=${DRY_RUN} | force=${FORCE} | skip-pdf=${SKIP_PDF}`);
  log(`   PDF dir : ${PDF_DIR}`);
  log("");

  // ── Build task list ────────────────────────────────────────────────────────
  const tasks = await buildTaskList();
  log(`📋 Found ${tasks.length} lesson(s) to process`);
  log("");

  if (tasks.length === 0) {
    log("Nothing to do. Check your --niveau / --matiere / --chapitre / --lecon filters.");
    return;
  }

  // ── Process ────────────────────────────────────────────────────────────────
  const stats = { cached: 0, pdf: 0, generated: 0, skipped: 0, error: 0 };

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    try {
      const result = await processTask(task, i, tasks.length);
      stats[result]++;
    } catch (err) {
      stats.error++;
      log(`  ❌ Error on ${task.subject.id}/${task.niveau}/${task.chapitre}/${task.lecon}: ${(err as Error).message}`);
    }

    // Throttle: 1 request per 2 seconds to respect rate limits
    if (i < tasks.length - 1) {
      await sleep(2000);
    }
  }

  // ── Summary ────────────────────────────────────────────────────────────────
  log("");
  log("══════════════════════════════════════════════════");
  log("📊 Summary");
  log(`   ⏭  Already cached : ${stats.cached}`);
  log(`   📄 From PDF        : ${stats.pdf}`);
  log(`   🤖 AI generated    : ${stats.generated}`);
  log(`   ❌ Errors           : ${stats.error}`);
  log("══════════════════════════════════════════════════");

  if (DRY_RUN) {
    log("ℹ  DRY RUN — nothing was written to Supabase.");
  }
  log("");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
