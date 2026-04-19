import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase/server";
import {
  getSubject, getChapter, getLesson, LEVEL_LABELS,
  type Subject, type Chapter, type Lesson,
} from "@/lib/curriculum";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ── Fallback content (no Anthropic needed) ────────────────────────────────────
// Used when the AI API is unavailable (no credits, timeout, etc.).
// Returns a structured lesson built purely from curriculum metadata —
// enough for the page to render properly. Not cached so real content
// replaces it as soon as the API becomes available again.

function buildFallback(
  subject: Subject,
  chapterData: Chapter,
  lessonData: Lesson,
  niveauLabel: string,
) {
  const s = subject.label;
  const ch = chapterData.title;
  const le = lessonData.title;

  return {
    objectives: [
      `Comprendre les concepts fondamentaux de : ${le}`,
      `Savoir appliquer les méthodes du chapitre "${ch}"`,
      `Être capable de résoudre des exercices liés à cette leçon`,
    ],
    introduction: `Bienvenue dans cette leçon de ${s} en ${niveauLabel} ! Aujourd'hui nous allons explorer : "${le}", une notion clé du chapitre "${ch}". Suis bien les explications et n'hésite pas à poser tes questions à Nour.`,
    sections: [
      {
        title: "Rappel du programme",
        content: `Cette leçon fait partie du chapitre "${ch}" du programme officiel marocain de ${s} en ${niveauLabel}. La durée estimée est de ${lessonData.duration}.\n\nConsulte ton manuel scolaire pour les définitions complètes et les démonstrations détaillées.`,
        formula: null,
      },
      {
        title: "Points essentiels à retenir",
        content: `Pour maîtriser "${le}", concentre-toi sur :\n• Les définitions clés du chapitre\n• Les formules et règles importantes\n• La méthode de résolution des exercices\n\nTon professeur t'a déjà présenté ces éléments en classe — cette leçon les consolide.`,
        formula: null,
      },
      {
        title: "Comment travailler cette leçon",
        content: "1. Relis tes notes de cours\n2. Lis les exemples du manuel\n3. Essaie les exercices d'application\n4. Pose tes questions à Nour si quelque chose n'est pas clair",
        formula: null,
      },
    ],
    examples: [
      {
        problem: `Exercice type sur "${le}" — consulte ton manuel scolaire pour des énoncés complets.`,
        steps: [
          "Lis l'énoncé attentivement et identifie les données",
          "Choisis la méthode ou la formule adaptée",
          "Applique la méthode étape par étape",
        ],
        answer: "Vérifie ta réponse avec les corrections du manuel ou demande à Nour.",
      },
    ],
    keyPoints: [
      `Maîtrise bien les définitions de : ${le}`,
      `Ce chapitre est fondamental pour la suite du programme de ${s}`,
      "Entraîne-toi régulièrement avec des exercices variés",
      "Nour est disponible 24h/7j pour t'expliquer ce qui n'est pas clair",
    ],
    vocabulary: [
      {
        term: le,
        definition: `Notion clé du chapitre "${ch}" en ${s} — ${niveauLabel}`,
      },
      {
        term: ch,
        definition: `Chapitre du programme officiel marocain de ${s} en ${niveauLabel}`,
      },
    ],
  };
}

// ── Route ─────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const { matiere, niveau, chapitre, lecon } = await req.json();

  if (!matiere || !niveau || !chapitre || !lecon) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  // ── Curriculum metadata (needed for both cache key and fallback) ─────────────
  const subject     = getSubject(niveau, matiere);
  const chapterData = getChapter(niveau, matiere, chapitre);
  const lessonData  = getLesson(niveau, matiere, chapitre, lecon);
  const niveauLabel = LEVEL_LABELS[niveau] ?? niveau;

  if (!subject || !chapterData || !lessonData) {
    return NextResponse.json({ error: "Course not found in curriculum" }, { status: 404 });
  }

  // ── Supabase cache check ─────────────────────────────────────────────────────
  try {
    const supabase = await createClient();

    const { data: cached } = await supabase
      .from("cours_content")
      .select("content")
      .eq("matiere", matiere)
      .eq("niveau", niveau)
      .eq("chapitre", chapitre)
      .eq("lecon", lecon)
      .single();

    if (cached?.content) {
      const raw = cached.content;
      // JSONB can come back as a string in some Supabase client versions.
      if (typeof raw === "string") {
        try {
          return NextResponse.json({ content: JSON.parse(raw), format: "json", cached: true });
        } catch {
          return NextResponse.json({ content: raw, format: "markdown", cached: true });
        }
      }
      return NextResponse.json({ content: raw, format: "json", cached: true });
    }

    // ── Generate with Anthropic ────────────────────────────────────────────────
    const systemPrompt = `Tu es un professeur expert du programme officiel marocain (MEN) pour le collège.
Tu génères des leçons complètes, pédagogiques et adaptées aux élèves marocains de ${niveauLabel}.
Réponds UNIQUEMENT en JSON valide, sans markdown, sans balises, sans texte avant ou après.
Le JSON doit respecter exactement ce schéma:
{
  "objectives": ["string", "string", "string"],
  "introduction": "string (2-3 phrases d'accroche en français)",
  "sections": [
    {
      "title": "string",
      "content": "string (explication claire et détaillée)",
      "formula": "string ou null (formule/règle importante entre guillemets, null si pas de formule)"
    }
  ],
  "examples": [
    {
      "problem": "string (énoncé du problème)",
      "steps": ["string", "string", "string"],
      "answer": "string (réponse finale)"
    }
  ],
  "keyPoints": ["string", "string", "string"],
  "vocabulary": [
    { "term": "string", "definition": "string" }
  ]
}`;

    const userPrompt = `Génère une leçon complète pour:
- Matière: ${subject.label}
- Niveau: ${niveauLabel}
- Chapitre: ${chapterData.title}
- Leçon: ${lessonData.title}
- Durée estimée: ${lessonData.duration}

Exigences:
- 3 objectifs pédagogiques clairs
- Introduction motivante (2-3 phrases)
- 3-4 sections de cours détaillées avec explications progressives
- 2 exemples résolus étape par étape (contexte marocain si possible)
- 3-4 points clés à retenir
- 3-5 termes de vocabulaire importants
- Contenu aligné sur le programme marocain officiel
- Explications claires et accessibles pour un collégien`;

    const message = await anthropic.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 2000,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    });

    const rawText = message.content[0].type === "text" ? message.content[0].text : "";

    let content: Record<string, unknown>;
    try {
      const cleaned = rawText.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();
      content = JSON.parse(cleaned);
    } catch {
      // AI returned malformed JSON — use fallback instead of crashing
      console.error("[cours/generate] JSON parse failed, using fallback");
      return NextResponse.json({
        content: buildFallback(subject, chapterData, lessonData, niveauLabel),
        format: "json",
        cached: false,
        fallback: true,
      });
    }

    // ── Cache the generated content ────────────────────────────────────────────
    await supabase.from("cours_content").upsert(
      { matiere, niveau, chapitre, lecon, content },
      { onConflict: "matiere,niveau,chapitre,lecon" },
    );

    return NextResponse.json({ content, format: "json", cached: false });

  } catch (err: unknown) {
    // ── Anthropic API unavailable (no credits, network, etc.) ──────────────────
    // Instead of a blank error page, serve a fallback lesson built from the
    // curriculum metadata. Students see real structure; Nour can still answer
    // questions. Content will be replaced by AI-generated material once the
    // API is available again (fallback is never written to the cache).
    const msg = (err as { error?: { message?: string }; message?: string })
      ?.error?.message ?? (err as Error)?.message ?? "";

    const isCreditError  = msg.includes("credit balance");
    const isRateError    = msg.includes("rate limit") || msg.includes("overloaded");

    if (isCreditError || isRateError) {
      console.warn("[cours/generate] API unavailable, returning fallback:", msg);
      return NextResponse.json({
        content: buildFallback(subject, chapterData, lessonData, niveauLabel),
        format: "json",
        cached: false,
        fallback: true,
      });
    }

    console.error("[cours/generate]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
