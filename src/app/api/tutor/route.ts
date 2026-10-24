import { NextResponse } from "next/server";
import { generateText } from "ai";
import { createGoogle } from "@ai-sdk/google";
import { checkTutorLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MAX_QUESTION_CHARS = 1500;
const MAX_META_CHARS = 120;

const LIMIT_MESSAGES = {
  "ip-hour": "وصلت للحد الأقصى من الأسئلة لهذه الساعة (10 أسئلة). عاود المحاولة بعد قليل.",
  "ip-day": "وصلت للحد الأقصى من الأسئلة لهذا اليوم (30 سؤالاً). عاود غداً إن شاء الله.",
  global: "الأستاذ الافتراضي مشغول حالياً بسبب كثرة الطلبات. عاود المحاولة بعد قليل.",
} as const;

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "طلب غير صالح." }, { status: 400 });
  }

  const question = clean(body.question, MAX_QUESTION_CHARS + 1);
  const track = clean(body.track, MAX_META_CHARS) || "2ème Bac";
  const subject = clean(body.subject, MAX_META_CHARS) || "Mathématiques";

  if (!question) {
    return NextResponse.json({ error: "اكتب سؤالك أولاً." }, { status: 400 });
  }
  if (question.length > MAX_QUESTION_CHARS) {
    return NextResponse.json(
      { error: `السؤال طويل جداً. الحد الأقصى ${MAX_QUESTION_CHARS} حرف.` },
      { status: 413 }
    );
  }

  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) {
    // Do not pretend to answer when the AI is not configured.
    return NextResponse.json(
      { error: "الأستاذ الافتراضي غير متاح حالياً. جرب حاسبة المعدل أو نماذج الامتحانات في انتظار ذلك." },
      { status: 503 }
    );
  }

  const limit = checkTutorLimit(clientIp(request));
  if (!limit.ok) {
    return NextResponse.json({ error: LIMIT_MESSAGES[limit.reason] }, { status: 429 });
  }

  try {
    const google = createGoogle({ apiKey });
    const model = google(process.env.GEMINI_MODEL || "gemini-2.5-flash-lite");

    const systemPrompt = `Tu es l'enseignant virtuel de la plateforme marocaine indépendante "Modarisi.ma" (مدرسي).
Tu aides les élèves du collège et du baccalauréat selon le programme scolaire marocain.
Tu n'es PAS affilié au Ministère de l'Éducation Nationale : ne prétends jamais être officiel, et ne présente jamais une correction comme "officielle".

Filière de l'élève : ${track}
Matière : ${subject}

CONSIGNES :
1. Langue :
   - Matières scientifiques (Maths, Physique-Chimie, SVT) : termes techniques et formules en français, explications simples en darija marocaine.
   - Matières littéraires (Philosophie, Éducation islamique, Histoire-Géo, Arabe) : arabe clair et structuré.
2. Méthode : structure ta réponse en 3 parties :
   1. "تذكير بالقاعدة" : la règle ou la formule utile.
   2. "الحل خطوة بخطوة" : le raisonnement détaillé et justifié.
   3. "نصيحة للامتحان" : erreurs fréquentes à éviter.
3. Honnêteté : si tu n'es pas sûr d'un résultat, d'un coefficient ou d'une règle, dis-le clairement et conseille de vérifier avec le professeur.
4. Ne demande jamais d'informations personnelles (nom complet, téléphone, adresse).
5. Si la question n'a rien à voir avec les études, réponds brièvement et ramène poliment la discussion vers les cours.
6. Reste encourageant et concis.`;

    const { text } = await generateText({
      model,
      system: systemPrompt,
      prompt: question,
      maxOutputTokens: 1200,
    });

    return NextResponse.json({ reply: text, mode: "live" });
  } catch (error) {
    console.error("Tutor error:", error);
    return NextResponse.json({ error: "الخدمة غير متاحة مؤقتاً. عاود المحاولة بعد قليل." }, { status: 500 });
  }
}
