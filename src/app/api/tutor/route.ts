import { NextResponse } from "next/server";
import { generateText } from "ai";
import { createGoogle } from "@ai-sdk/google";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { question, track = "2bac-pc", subject = "Mathématiques", image = null } = body;

    if (!question && !image) {
      return NextResponse.json({ error: "Veuillez poser une question ou fournir une photo d'exercice." }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey) {
      // Fallback pedagogical response for demo mode if key is not yet set
      return NextResponse.json({
        reply: `### مرحباً بك في مدرسي (Modarisi.ma) 🎓
أنا أستاذك الخصوصي لمستوى **${track}** في مادة **${subject}**.

**سؤالك:** "${question || "تحليل التمرين من الصورة"}"

---
#### 1. التذكير بالقاعدة الأساسية (Rappel de Cours) :
في المقرر المغربي للباكالوريا، هذا النوع من التمارين يتطلب تطبيق القواعد التالية:
- التحقق من مجموعة التعريف والشروط البدئية.
- استخدام العلاقات الرياضية الدقيقة مع التعليل (Justification rigoureuse).

#### 2. مراحل الحل خطوة بخطوة (Résolution Pas-à-Pas) :
1. **المرحلة الأولى:** نحدد المعطيات الأساسية ونكتب الصيغة المناسبة.
2. **المرحلة الثانية:** نقوم بالحساب مع التبسيط وتفادي الأخطاء الشائعة في الامتحان الوطني.
3. **المرحلة الثالثة:** نؤطر النتيجة النهائية ونكتب الجملة الختامية بأسلوب منهجي.

> 💡 **نصيحة الامتحان الوطني:** ركز دائماً على تنظيم ورقة التحرير وكتابة الوحدات (Units) والتعليلات، لأن المصحح يمنح نصف النقطة على المنهجية وطريقة البرهنة!`,
        mode: "demo",
      });
    }

    const google = createGoogle({ apiKey });
    const model = google(process.env.GEMINI_MODEL || "gemini-1.5-flash");

    const systemPrompt = `Tu es l'enseignant virtuel officiel de la plateforme marocaine "Modarisi.ma" (مدرسي).
Tu es un professeur pédagogue, bienveillant, rigoureux et expert du programme officiel du Ministère de l'Éducation Nationale du Maroc (منهاج وزارة التربية الوطنية والتعليم الأولي والرياضة).

Filière actuelle de l'élève : ${track}
Matière : ${subject}

CONSIGNES PÉDAGOGIQUES STRICTES :
1. Langue et Style :
   - Pour les matières scientifiques (Maths, Physique-Chimie, SVT) des filières BIOF : Utilise le français pour les termes techniques, théorèmes et formules, accompagné d'explications chaleureuses en Darija marocaine éducative naturelle pour faciliter la compréhension.
   - Pour les matières littéraires/humaines (Philosophie, Éducation Islamique, Histoire-Géo, Arabe) : Utilise l'arabe soutenu et structuré.
2. Méthodologie d'Examen :
   - Ne donne pas une réponse brute sans explication.
   - Découpe toujours ton explication en 3 parties claires :
     1. "Rappel de cours / تذكير بالقاعدة" : Le théorème ou la formule exacte du programme marocain.
     2. "Démonstration pas-à-pas / الحل خطوة بخطوة" : Le calcul détaillé avec justifications rigoureuses.
     3. "Astuce Examen National / نصيحة للامتحان" : Les pièges fréquents du barème officiel et comment gagner les points bonus.
3. Reste toujours encourageant, motivant et clair (ex: "Bravo a btl/btla", "Rkz m3aya f had l-point").`;

    const { text } = await generateText({
      model,
      system: systemPrompt,
      prompt: question || "Explique et résous cet exercice étape par étape selon le programme marocain.",
    });

    return NextResponse.json({ reply: text, mode: "live" });
  } catch (error) {
    console.error("Tutor error:", error);
    return NextResponse.json({
      error: "Service temporairement indisponible. Veuillez réessayer.",
    }, { status: 500 });
  }
}
