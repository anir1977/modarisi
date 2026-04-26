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

export async function POST(req: NextRequest) {
  try {
    const { subject, level, count = 10 } = await req.json();

    if (!subject || !level) {
      return NextResponse.json({ error: "المادة والمستوى مطلوبان" }, { status: 400 });
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
    }) => ({
      question: q.question || "",
      options: Array.isArray(q.options) ? q.options.slice(0, 4) : ["أ", "ب", "ج", "د"],
      correct: typeof q.correct === "number" ? q.correct : parseInt(q.correct) || 0,
      explanation: q.explanation || "",
    }));

    return NextResponse.json({ questions: validated });
  } catch (error) {
    console.error("Exam generation error:", error);
    return NextResponse.json(
      { error: "فشل توليد الأسئلة" },
      { status: 500 }
    );
  }
}
