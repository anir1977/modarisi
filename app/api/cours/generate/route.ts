import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { createClient } from "@/lib/supabase/server";
import {
  getSubject, getChapter, getLesson, LEVEL_LABELS,
  type Subject, type Chapter, type Lesson,
} from "@/lib/curriculum";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// ── Fallback (no AI needed) ───────────────────────────────────────────────────
function buildFallback(
  subject: Subject,
  chapterData: Chapter,
  lessonData: Lesson,
  niveauLabel: string,
) {
  const s  = subject.labelAr || subject.label;
  const ch = chapterData.titleAr || chapterData.title;
  const le = lessonData.titleAr  || lessonData.title;

  return {
    objectives: [
      `فهم المفاهيم الأساسية لـ: ${le}`,
      `تطبيق الأساليب والقواعد المتعلقة بالفصل: "${ch}"`,
      `القدرة على حل تمارين متعلقة بهذا الدرس`,
    ],
    introduction: `مرحباً بك في هذا الدرس من مادة ${s} للسنة ${niveauLabel}! سنتناول اليوم: "${le}"، وهو مفهوم أساسي من فصل "${ch}". تابع الشرح جيداً ولا تتردد في طرح أسئلتك على نور.`,
    sections: [
      {
        title: "محتوى البرنامج الرسمي",
        content: `هذا الدرس جزء من الفصل "${ch}" في مادة ${s} للسنة ${niveauLabel}.\nالمدة التقديرية: ${lessonData.duration}.\n\nراجع كتابك المدرسي للحصول على التعريفات الكاملة والبراهين المفصلة.`,
        formula: null,
      },
      {
        title: "النقاط الأساسية للإتقان",
        content: `لإتقان "${le}"، ركز على:\n• التعريفات الرئيسية للفصل\n• القواعد والصيغ المهمة\n• منهجية حل التمارين\n\nلقد قدّم لك أستاذك هذه العناصر في الفصل — هذا الدرس يعززها ويرسخها.`,
        formula: null,
      },
      {
        title: "كيفية دراسة هذا الدرس",
        content: "1. راجع ملاحظاتك من الفصل\n2. اقرأ الأمثلة الموجودة في كتابك\n3. جرب تمارين التطبيق\n4. اسأل نور إن لم يكن شيء واضحاً",
        formula: null,
      },
    ],
    examples: [
      {
        problem: `تمرين نموذجي حول "${le}" — راجع كتابك المدرسي للحصول على أمثلة كاملة.`,
        steps: [
          "اقرأ السؤال جيداً وحدد المعطيات",
          "اختر الطريقة أو الصيغة المناسبة",
          "طبّق المنهجية خطوة بخطوة",
        ],
        answer: "تحقق من إجابتك مع تصحيح الكتاب أو اسأل نور.",
      },
    ],
    keyPoints: [
      `أتقن تعريفات: ${le}`,
      `هذا الفصل أساسي لاستمرار دراسة مادة ${s}`,
      "تدرّب بانتظام على تمارين متنوعة",
      "نور متاحة 24 ساعة يومياً لمساعدتك",
    ],
    vocabulary: [
      { term: le,  definition: `مفهوم أساسي في الفصل "${ch}" من مادة ${s} — ${niveauLabel}` },
      { term: ch, definition: `فصل من البرنامج الرسمي المغربي لمادة ${s} — ${niveauLabel}` },
    ],
  };
}

// ── Route ─────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const { matiere, niveau, chapitre, lecon } = await req.json();

  if (!matiere || !niveau || !chapitre || !lecon) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const subject     = getSubject(niveau, matiere);
  const chapterData = getChapter(niveau, matiere, chapitre);
  const lessonData  = getLesson(niveau, matiere, chapitre, lecon);
  const niveauLabel = LEVEL_LABELS[niveau] ?? niveau;

  if (!subject || !chapterData || !lessonData) {
    return NextResponse.json({ error: "Course not found in curriculum" }, { status: 404 });
  }

  // ── Cache check ───────────────────────────────────────────────────────────
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
      if (typeof raw === "string") {
        try {
          return NextResponse.json({ content: JSON.parse(raw), format: "json", cached: true });
        } catch {
          return NextResponse.json({ content: raw, format: "markdown", cached: true });
        }
      }
      return NextResponse.json({ content: raw, format: "json", cached: true });
    }

    // ── Generate with Groq (free) ─────────────────────────────────────────
    const leAr = lessonData.titleAr  || lessonData.title;
    const chAr = chapterData.titleAr || chapterData.title;
    const sAr  = subject.labelAr     || subject.label;

    const systemPrompt = `أنت أستاذ خبير في المنهج الدراسي المغربي الرسمي لوزارة التربية الوطنية للمرحلة الإعدادية.
تولّد دروساً كاملة وتعليمية ومناسبة للتلاميذ المغاربة في السنة ${niveauLabel}.
أجب فقط بـ JSON صحيح بدون markdown أو أي نص قبله أو بعده.
يجب أن يتبع JSON هذا المخطط بالضبط:
{
  "objectives": ["string", "string", "string"],
  "introduction": "string (2-3 جمل تحفيزية بالعربية)",
  "sections": [
    {
      "title": "string",
      "content": "string (شرح واضح ومفصّل)",
      "formula": "string أو null (قاعدة أو صيغة مهمة، null إن لم توجد)"
    }
  ],
  "examples": [
    {
      "problem": "string (نص المسألة)",
      "steps": ["string", "string", "string"],
      "answer": "string (الجواب النهائي)"
    }
  ],
  "keyPoints": ["string", "string", "string"],
  "vocabulary": [
    { "term": "string", "definition": "string" }
  ]
}`;

    const userPrompt = `ولّد درساً كاملاً لـ:
- المادة: ${sAr}
- المستوى: ${niveauLabel}
- الفصل: ${chAr}
- الدرس: ${leAr}
- المدة التقديرية: ${lessonData.duration}

المتطلبات:
- 3 أهداف تعليمية واضحة وقابلة للقياس
- مقدمة تحفيزية (2-3 جمل)
- 3 إلى 4 أقسام بشرح تدريجي ومفصّل
- مثالان محلولان خطوة بخطوة (السياق المغربي إن أمكن)
- 3 إلى 4 نقاط رئيسية للحفظ
- 3 إلى 5 مصطلحات أساسية مع تعريفاتها
- محتوى متوافق مع البرنامج الرسمي المغربي
- شرح مناسب لمستوى تلميذ الإعدادي`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.4,
      max_tokens: 2500,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user",   content: userPrompt },
      ],
    });

    const rawText = completion.choices[0]?.message?.content ?? "";

    let content: Record<string, unknown>;
    try {
      const cleaned = rawText.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();
      content = JSON.parse(cleaned);
    } catch {
      console.error("[cours/generate] JSON parse failed, using fallback");
      return NextResponse.json({
        content: buildFallback(subject, chapterData, lessonData, niveauLabel),
        format: "json", cached: false, fallback: true,
      });
    }

    // ── Save to cache ─────────────────────────────────────────────────────
    await supabase.from("cours_content").upsert(
      { matiere, niveau, chapitre, lecon, content },
      { onConflict: "matiere,niveau,chapitre,lecon" },
    );

    return NextResponse.json({ content, format: "json", cached: false });

  } catch (err: unknown) {
    const msg = (err as { error?: { message?: string }; message?: string })
      ?.error?.message ?? (err as Error)?.message ?? "";

    console.warn("[cours/generate] error, returning fallback:", msg);
    return NextResponse.json({
      content: buildFallback(subject, chapterData, lessonData, niveauLabel),
      format: "json", cached: false, fallback: true,
    });
  }
}
