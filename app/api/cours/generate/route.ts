import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase/server";
import { getSubject, getChapter, getLesson, LEVEL_LABELS } from "@/lib/curriculum";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { matiere, niveau, chapitre, lecon } = await req.json();

    if (!matiere || !niveau || !chapitre || !lecon) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const supabase = await createClient();

    // ── Check Supabase cache ─────────────────────────────────────────────────
    const { data: cached } = await supabase
      .from("cours_content")
      .select("content")
      .eq("matiere", matiere)
      .eq("niveau", niveau)
      .eq("chapitre", chapitre)
      .eq("lecon", lecon)
      .single();

    if (cached?.content) {
      return NextResponse.json({ content: cached.content, cached: true });
    }

    // ── Lookup curriculum metadata ───────────────────────────────────────────
    const subject = getSubject(niveau, matiere);
    const chapterData = getChapter(niveau, matiere, chapitre);
    const lessonData = getLesson(niveau, matiere, chapitre, lecon);

    if (!subject || !chapterData || !lessonData) {
      return NextResponse.json({ error: "Course not found in curriculum" }, { status: 404 });
    }

    const niveauLabel = LEVEL_LABELS[niveau] ?? niveau;

    // ── Generate with Anthropic ──────────────────────────────────────────────
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
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    });

    const rawText = message.content[0].type === "text" ? message.content[0].text : "";

    // Parse JSON, stripping potential markdown fences
    let content: Record<string, unknown>;
    try {
      const cleaned = rawText.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();
      content = JSON.parse(cleaned);
    } catch {
      return NextResponse.json({ error: "Failed to parse AI response", raw: rawText }, { status: 500 });
    }

    // ── Save to Supabase cache ───────────────────────────────────────────────
    await supabase.from("cours_content").upsert({
      matiere,
      niveau,
      chapitre,
      lecon,
      content,
    }, { onConflict: "matiere,niveau,chapitre,lecon" });

    return NextResponse.json({ content, cached: false });
  } catch (err) {
    console.error("[cours/generate]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
