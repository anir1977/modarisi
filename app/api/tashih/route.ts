import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ── Types ──────────────────────────────────────────────────────────────────────

interface TashihRequest {
  exercice: string;
  reponse_eleve?: string;
  matiere: string;
  niveau: string;
  chapitre?: string;
  type_exercice: string;
  image_base64?: string; // base64 data URL "data:image/jpeg;base64,..."
}

export interface TashihResult {
  note: number;
  note_max: number;
  badge: "Excellent" | "Bien" | "À améliorer" | "À reprendre";
  points_positifs: string[];
  points_corriger: string[];
  correction_complete: string;
  conseil: string;
}

// ── System prompt ──────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `Tu es Nour, professeure bienveillante et experte pour les élèves marocains du collège (1ère, 2ème, 3ème année). Tu corriges les exercices selon le programme officiel marocain (MEN).

RÈGLES ABSOLUES :
- Réponds UNIQUEMENT en JSON valide, sans aucun texte avant ou après
- Ne mets PAS de balises markdown autour du JSON (pas de \`\`\`json)
- La langue de correction suit la matière : Français pour Maths/PC/SVT/Français/HG, Arabe pour Éducation Islamique/Arabe. Si l'élève écrit en Darija, mélange Darija et Français naturellement comme un vrai prof marocain.
- Sois pédagogue, encourageante, précise. Chaque erreur doit être expliquée clairement.
- Note sur 20 selon les critères du MEN : 18-20 Excellent, 14-17 Bien, 10-13 À améliorer, 0-9 À reprendre
- Si l'élève n'a pas fourni de réponse, génère quand même une correction modèle complète de l'exercice

FORMAT JSON ATTENDU (respecte exactement ces clés) :
{
  "note": <nombre entier entre 0 et 20>,
  "note_max": 20,
  "badge": <"Excellent" | "Bien" | "À améliorer" | "À reprendre">,
  "points_positifs": [<liste de 1 à 4 points forts, strings>],
  "points_corriger": [<liste de 0 à 4 points à corriger, strings>],
  "correction_complete": <string markdown avec la correction détaillée étape par étape>,
  "conseil": <string, conseil personnalisé pour progresser, chaleureux et motivant>
}

Pour correction_complete, utilise du markdown riche :
- **gras** pour les mots-clés
- ## pour les sous-sections (Méthode, Calcul, Résultat...)
- > pour les définitions ou règles importantes
- Formules entre backticks ou sur leur propre ligne
- Numérotation pour les étapes
- Emoji modérés pour rendre ça vivant 📌 ✅ ⚠️`;

// ── Route ──────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    // ── 1. Parse body ────────────────────────────────────────────────────────
    const body: TashihRequest = await req.json();
    const { exercice, reponse_eleve, matiere, niveau, chapitre, type_exercice, image_base64 } = body;

    if (!exercice && !image_base64) {
      return NextResponse.json({ error: "exercice or image_base64 is required" }, { status: 400 });
    }
    if (!matiere || !niveau || !type_exercice) {
      return NextResponse.json({ error: "matiere, niveau and type_exercice are required" }, { status: 400 });
    }

    // ── 2. Auth check (optional — anonymous allowed, but rate-limited) ────────
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => cookieStore.getAll(),
          setAll: (cookiesToSet) => {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch { /* server component */ }
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();

    // Rate-limit free users: max 3 corrections per day
    if (user) {
      const supabaseAdmin = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll: () => cookieStore.getAll(),
            setAll: (cookiesToSet) => {
              try {
                cookiesToSet.forEach(({ name, value, options }) =>
                  cookieStore.set(name, value, options)
                );
              } catch { /* server component */ }
            },
          },
        }
      );

      const { data: profile } = await supabaseAdmin
        .from("profiles")
        .select("plan")
        .eq("id", user.id)
        .single();

      const plan: string = profile?.plan ?? "free";

      if (plan === "free" || plan === "gratuit") {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const { count } = await supabase
          .from("tashih_corrections")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id)
          .gte("created_at", todayStart.toISOString());

        if ((count ?? 0) >= 3) {
          return NextResponse.json(
            { error: "LIMIT_REACHED", limit: 3 },
            { status: 429 }
          );
        }
      }
    }

    // ── 3. Build user prompt ─────────────────────────────────────────────────
    const contextLines = [
      `**Matière:** ${matiere}`,
      `**Niveau:** ${niveau}`,
      chapitre ? `**Chapitre:** ${chapitre}` : null,
      `**Type d'exercice:** ${type_exercice}`,
      `\n**Énoncé de l'exercice:**\n${exercice || "(voir image ci-jointe)"}`,
      reponse_eleve?.trim()
        ? `\n**Réponse de l'élève:**\n${reponse_eleve}`
        : "\n**L'élève n'a pas fourni de réponse.** Génère une correction modèle complète.",
    ].filter(Boolean);

    const userText = contextLines.join("\n");

    // ── 4. Build Anthropic message content ───────────────────────────────────
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "ANTHROPIC_API_KEY not configured" }, { status: 500 });
    }
    const client = new Anthropic({ apiKey });

    type AllowedMediaType = "image/jpeg" | "image/png" | "image/gif" | "image/webp";

    type ContentBlock =
      | { type: "text"; text: string }
      | { type: "image"; source: { type: "base64"; media_type: AllowedMediaType; data: string } };

    const content: ContentBlock[] = [];

    // If image provided, add it first
    if (image_base64) {
      // Expect "data:image/jpeg;base64,<data>" or just raw base64
      const match = image_base64.match(/^data:([^;]+);base64,(.+)$/);
      const rawType = match ? match[1] : "image/jpeg";
      const ALLOWED: AllowedMediaType[] = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      const mediaType: AllowedMediaType = ALLOWED.includes(rawType as AllowedMediaType)
        ? (rawType as AllowedMediaType)
        : "image/jpeg";
      const data = match ? match[2] : image_base64;

      content.push({
        type: "image",
        source: { type: "base64", media_type: mediaType, data },
      });
    }

    content.push({ type: "text", text: userText });

    // ── 5. Call Anthropic ────────────────────────────────────────────────────
    const message = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 2500,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content }],
    });

    const rawText =
      message.content[0].type === "text" ? message.content[0].text : "";

    // Strip possible markdown fences
    const cleaned = rawText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();

    let result: TashihResult;
    try {
      result = JSON.parse(cleaned);
    } catch {
      console.error("[tashih] JSON parse failed. Raw:", rawText.substring(0, 300));
      return NextResponse.json({ error: "AI returned invalid JSON", raw: rawText }, { status: 500 });
    }

    // ── 6. Save to DB (if user logged in) ────────────────────────────────────
    if (user) {
      await supabase.from("tashih_corrections").insert({
        user_id: user.id,
        matiere,
        niveau,
        chapitre: chapitre ?? null,
        type_exercice,
        exercice: exercice?.substring(0, 1000) ?? "(image)",
        note: result.note,
        badge: result.badge,
        has_image: !!image_base64,
      }).then(({ error }) => {
        if (error) console.error("[tashih] DB insert error:", error.message);
      });
    }

    return NextResponse.json(result);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[tashih/POST]", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
