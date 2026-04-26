import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `أنت مولّد أسئلة اختبار للمنهج الدراسي المغربي في المرحلة الإعدادية.

قواعد صارمة:
- اكتب الأسئلة باللغة العربية الفصحى
- الأسئلة مناسبة للمستوى المطلوب (أولى/ثانية/ثالثة إعدادي)
- كل سؤال له 4 خيارات فقط (0-3)
- يجب أن يكون "correct" هو رقم الإجابة الصحيحة (0 إلى 3)
- أجب بـ JSON صحيح فقط — بدون أي نص قبله أو بعده
- الأسئلة مرتبطة بالمنهج المغربي الرسمي

صيغة JSON المطلوبة:
{
  "questions": [
    {
      "question": "نص السؤال",
      "options": ["الخيار أ", "الخيار ب", "الخيار ج", "الخيار د"],
      "correct": 0,
      "explanation": "شرح موجز للإجابة الصحيحة"
    }
  ]
}`;

type Question = {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

const FALLBACK_QUESTIONS: Record<string, Question[]> = {
  "الرياضيات": [
    {
      question: "إذا كان 3x + 5 = 20، فما قيمة x؟",
      options: ["3", "5", "7", "15"],
      correct: 1,
      explanation: "نطرح 5 من الطرفين فنحصل على 3x = 15، ثم نقسم على 3 فنجد x = 5.",
    },
    {
      question: "ما نوع المثلث الذي له ضلعان متقايسان؟",
      options: ["مثلث قائم", "مثلث متساوي الساقين", "مثلث مختلف الأضلاع", "مثلث منفرج"],
      correct: 1,
      explanation: "المثلث متساوي الساقين هو الذي يتوفر على ضلعين متقايسين.",
    },
  ],
  "الفيزياء والكيمياء": [
    {
      question: "ما وحدة قياس شدة التيار الكهربائي؟",
      options: ["الفولت", "الأمبير", "الأوم", "الواط"],
      correct: 1,
      explanation: "شدة التيار الكهربائي تقاس بوحدة الأمبير.",
    },
    {
      question: "أي جهاز يستعمل لقياس التوتر الكهربائي؟",
      options: ["الأمبيرمتر", "الفولطمتر", "الميزان", "المحرار"],
      correct: 1,
      explanation: "الفولطمتر هو الجهاز المخصص لقياس التوتر الكهربائي.",
    },
  ],
  "علوم الحياة والأرض": [
    {
      question: "ما العضو المسؤول أساساً عن ضخ الدم في الجسم؟",
      options: ["الرئة", "الكبد", "القلب", "المعدة"],
      correct: 2,
      explanation: "القلب يضخ الدم نحو مختلف أعضاء الجسم عبر الأوعية الدموية.",
    },
    {
      question: "ما وظيفة الرئتين في جسم الإنسان؟",
      options: ["هضم الأغذية", "تبادل الغازات", "تنقية الدم من السكر", "إنتاج العظام"],
      correct: 1,
      explanation: "الرئتان تسمحان بدخول الأكسجين وخروج ثنائي أكسيد الكربون.",
    },
  ],
  "اللغة العربية": [
    {
      question: "ما نوع الجملة: يراجع التلميذ دروسه؟",
      options: ["جملة اسمية", "جملة فعلية", "شبه جملة", "أسلوب نداء"],
      correct: 1,
      explanation: "الجملة بدأت بفعل مضارع: يراجع، لذلك فهي جملة فعلية.",
    },
    {
      question: "ما ضد كلمة: صعب؟",
      options: ["يسير", "بعيد", "كبير", "قديم"],
      correct: 0,
      explanation: "ضد صعب هو يسير أو سهل.",
    },
  ],
  "اللغة الفرنسية": [
    {
      question: "Quelle phrase est correcte ?",
      options: ["Je suis élève.", "Je être élève.", "Je est élève.", "Je sommes élève."],
      correct: 0,
      explanation: "Avec « je », on utilise « suis » au présent du verbe être.",
    },
    {
      question: "Quel est le pluriel de « un livre » ?",
      options: ["des livre", "des livres", "un livres", "les livre"],
      correct: 1,
      explanation: "Au pluriel, on écrit « des livres » avec s.",
    },
  ],
  "الاجتماعيات": [
    {
      question: "ما المكون الذي يدرس أحداث الماضي؟",
      options: ["الجغرافيا", "التاريخ", "التربية على المواطنة", "الرياضيات"],
      correct: 1,
      explanation: "التاريخ يهتم بدراسة أحداث الماضي وتطور المجتمعات.",
    },
    {
      question: "ما المقصود بالمواطنة؟",
      options: ["العيش بدون قوانين", "التمتع بالحقوق والقيام بالواجبات", "الهجرة فقط", "دراسة الخرائط"],
      correct: 1,
      explanation: "المواطنة تجمع بين الحقوق والواجبات داخل المجتمع.",
    },
  ],
};

function fallbackQuestions(subject: string, count: number): Question[] {
  const base = FALLBACK_QUESTIONS[subject] ?? FALLBACK_QUESTIONS["الرياضيات"];
  return base.slice(0, Math.min(count, base.length));
}

export async function POST(req: NextRequest) {
  let requestedSubject = "الرياضيات";
  let requestedCount = 10;

  try {
    const { subject, level, count = 10 } = await req.json();
    requestedSubject = subject || requestedSubject;
    requestedCount = count;

    if (!subject || !level) {
      return NextResponse.json({ error: "المادة والمستوى مطلوبان" }, { status: 400 });
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ questions: fallbackQuestions(subject, count) });
    }

    const levelLabel =
      level === "1ere" ? "أولى إعدادي" :
      level === "2eme" ? "ثانية إعدادي" :
      "ثالثة إعدادي";

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `اكتب ${count} أسئلة اختيار من متعدد في مادة "${subject}" لمستوى "${levelLabel}".
يجب أن تكون الأسئلة متنوعة وتغطي مختلف محاور المادة.
أجب بـ JSON فقط.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 4000,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error("No content from Groq");

    const data = JSON.parse(content);

    // Validate structure
    if (!data.questions || !Array.isArray(data.questions)) {
      throw new Error("Invalid questions format");
    }

    const validated = data.questions.map((q: {
      question: string;
      options: string[];
      correct: string | number;
      explanation: string;
    }) => {
      const options = Array.isArray(q.options) ? q.options.slice(0, 4) : ["أ", "ب", "ج", "د"];
      const parsedCorrect = typeof q.correct === "number" ? q.correct : parseInt(q.correct) || 0;
      const correct = Math.min(Math.max(parsedCorrect, 0), Math.max(options.length - 1, 0));

      return {
        question: q.question || "",
        options,
        correct,
        explanation: q.explanation || "",
      };
    });

    return NextResponse.json({ questions: validated });
  } catch (error) {
    console.error("Exam generation error:", error);
    return NextResponse.json({ questions: fallbackQuestions(requestedSubject, requestedCount) });
  }
}
