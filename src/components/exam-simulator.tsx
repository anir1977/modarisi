"use client";
import { useState, useEffect } from "react";
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  Award,
  CheckCircle2,
  HelpCircle,
  BookOpen,
  Sparkles,
  ChevronDown,
  ChevronUp,
  FileText,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import Link from "next/link";

type ExamQuestion = {
  id: string;
  part: string;
  question: string;
  points: number;
  hint: string;
  officialRule: string;
  solution: string;
  pitfall: string;
};

type ExamSection = {
  id: string;
  title: string;
  subject: string;
  durationSeconds: number;
  totalPoints: number;
  questions: ExamQuestion[];
};

const SIMULATED_EXAMS: ExamSection[] = [
  {
    id: "nat-2024-math-pc",
    title: "الامتحان الوطني الموحد 2024 - مادة الرياضيات (مسلك العلوم الفيزيائية)",
    subject: "الرياضيات",
    durationSeconds: 3 * 3600, // 3 hours
    totalPoints: 20,
    questions: [
      {
        id: "q1",
        part: "التمرين 1 : الأعداد العقدية (3 نقط)",
        question: "1. حل في مجموعة الأعداد العقدية C المعادلة: z² - 2√2 z + 4 = 0.\n2. اكتب الحلين على الشكل المثلثي ثم الأسي.",
        points: 1.0,
        hint: "احسب المميز المختصر Δ' أو المميز العادي Δ = b² - 4ac، وانتبه لإشارة الجزء التخيلي.",
        officialRule: "Δ = ( -2√2 )² - 4(1)(4) = 8 - 16 = -8 = ( 2i√2 )².\nالحلان مترافقان: z₁ = (2√2 + 2i√2)/2 = √2 + i√2 = 2(cos(π/4) + i sin(π/4)) = 2 e^(iπ/4).",
        solution: "لدينا المعادلة z² - 2√2 z + 4 = 0. المميز هو Δ = -8 = (2i√2)². بما أن Δ سالب قطعا فإن المعادلة تقبل حلين عقديين مترافقين هما z₁ = √2 + i√2 و z₂ = √2 - i√2. الشكل الأسي: z₁ = 2 e^(iπ/4) و z₂ = 2 e^(-iπ/4).",
        pitfall: "نسيان تأطير المعيار |z| والتأكد من أن الزاوية θ ∈ ]-π, π].",
      },
      {
        id: "q2",
        part: "التمرين 1 : الأعداد العقدية (3 نقط)",
        question: "نعتبر النقط A و B و C ذات الألحاق a = √2 + i√2 و b = √2 - i√2 و c = 2. بين أن المثلث ABC متساوي الساقين وقائم الزاوية في C.",
        points: 1.0,
        hint: "احسب النسبة (a - c)/(b - c) وحدد شكلها الجبري والمثلثي واستنتج العمدة والمسافة.",
        officialRule: "لحساب طبيعة المثلث نحدد معيار وعمدة النسبة (a-c)/(b-c). إذا كان المعيار = 1 والعمدة = ±π/2 فإن المثلث قائم الزاوية ومتساوي الساقين.",
        solution: "(a-c)/(b-c) = (√2-2 + i√2)/(√2-2 - i√2) = i. بما أن |(a-c)/(b-c)| = |i| = 1 فإن CA = CB. وبما أن arg((a-c)/(b-c)) ≡ π/2 [2π] فإن الزاوية (CB, CA) = π/2، وبالتالي المثلث ABC متساوي الساقين وقائم الزاوية في C.",
        pitfall: "الخلط بين رأس الزاوية القائمة ومركز الدوران.",
      },
      {
        id: "q3",
        part: "مسألة التحليل : دراسة دالة أسية (11 نقطة)",
        question: "نعتبر الدالة العديدة f المعرفة على R بما يلي: f(x) = (x - 1) e^(2x) + x. احسب نهاية f عند +∞ وعند -∞، وحدد الفروع اللانهائية لمنحنى الدالة (Cf).",
        points: 1.5,
        hint: "عند -∞ استعمل النهايات المرجعية lim x e^(2x) = 0، وعند +∞ بين اتجاه الفرع الشلجمي.",
        officialRule: "النهايات المرجعية لوزارة التربية الوطنية: lim_{x→-∞} x e^x = 0 و lim_{x→+∞} e^x/x = +∞.",
        solution: "1. عند -∞: لدينا lim (x-1)e^(2x) = lim (x e^(2x) - e^(2x)) = 0، إذن lim f(x) = -∞. ولدينا lim [f(x) - x] = 0، إذن المستقيم (D): y = x مقارب مائل لـ (Cf) بجوار -∞.\n2. عند +∞: lim f(x) = +∞، و lim f(x)/x = +∞، إذن (Cf) يقبل فرعاً شلجمياً في اتجاه محور الراتب بجوار +∞.",
        pitfall: "عدم كتابة الجملة الاستنتاجية الهندسية للمقارب (المصحح يمنح 0.5 على التعليل الهندسي).",
      },
      {
        id: "q4",
        part: "مسألة التحليل : دراسة دالة أسية (11 نقطة)",
        question: "بين أن الدالة المشتقة f'(x) = (2x - 1) e^(2x) + 1، ثم ضع جدول تغيرات الدالة f على R.",
        points: 1.5,
        hint: "طبق قاعدة اشتقاق الجداء (u·v)' = u'v + uv' حيث u(x) = x-1 و v(x) = e^(2x).",
        officialRule: "مشتقة e^(u(x)) هي u'(x) e^(u(x)). إذن (e^(2x))' = 2 e^(2x).",
        solution: "f'(x) = (x-1)' e^(2x) + (x-1)(e^(2x))' + (x)' = 1·e^(2x) + 2(x-1)e^(2x) + 1 = (2x - 1)e^(2x) + 1. إشارة f' موجبة قطعا على R لأنها تنعدم وتغير إشارتها بما يجعل f تزايدية قطعا على R.",
        pitfall: "نسيان اشتقاق الحد الخطي x الذي يعطي +1.",
      },
    ],
  },
];

export function ExamSimulator() {
  const [selectedExamIndex, setSelectedExamIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(SIMULATED_EXAMS[0].durationSeconds);
  const [timerRunning, setTimerRunning] = useState(false);
  const [expandedSolutions, setExpandedSolutions] = useState<Record<string, boolean>>({});
  const [expandedHints, setExpandedHints] = useState<Record<string, boolean>>({});
  const [scoredQuestions, setScoredQuestions] = useState<Record<string, boolean>>({});

  const currentExam = SIMULATED_EXAMS[selectedExamIndex];

  // Timer Countdown Effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timeLeft]);

  // Format Time: HH:MM:SS
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const toggleSolution = (qId: string) => {
    setExpandedSolutions((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const toggleHint = (qId: string) => {
    setExpandedHints((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const toggleScore = (qId: string) => {
    setScoredQuestions((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  // Calculate self-assessed total score
  const userScore = currentExam.questions.reduce((acc, q) => {
    return acc + (scoredQuestions[q.id] ? q.points : 0);
  }, 0);

  const resetExam = () => {
    setTimerRunning(false);
    setTimeLeft(currentExam.durationSeconds);
    setScoredQuestions({});
    setExpandedSolutions({});
    setExpandedHints({});
  };

  return (
    <section id="simulateur" className="py-20 lg:py-28 bg-white border-y border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-300 text-blue-950 text-xs sm:text-sm font-black shadow-xs">
            <Timer size={16} className="text-blue-700" />
            <span>محاكي الامتحان الوطني الموحد في ظروف الاختبار الحقيقية 🇲🇦</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            محاكي الامتحان الوطني الذكي
            <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-l from-blue-800 via-teal-800 to-emerald-900">
              مع المؤقت وسلم التنقيط والتلميحات
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-semibold">
            عش أجواء الامتحان الوطني الحقيقية مع عداد زمني رسمي، واختبر قدرتك على تدبير الوقت وحل التمارين وفق عناصر الإجابة وسلم التنقيط الوزاري.
          </p>
        </div>

        {/* Exam Dashboard & Controls */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 text-right">
            <span className="px-3 py-1 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              {currentExam.subject} · الدورة العادية
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {currentExam.title}
            </h3>
            <p className="text-xs text-slate-400">
              المدة الرسمية : 3 ساعات · مجموع النقط : 20 نقطة · معامل الامتحان : 7
            </p>
          </div>

          {/* Live Timer Widget */}
          <div className="flex flex-wrap items-center gap-4 bg-slate-800/90 p-4 rounded-2xl border border-slate-700">
            <div className="text-right">
              <div className="text-[10px] text-slate-400 font-bold">الوقت المتبقي :</div>
              <div className="text-3xl sm:text-4xl font-black font-sans text-emerald-400 tracking-wider">
                {formatTime(timeLeft)}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setTimerRunning(!timerRunning)}
                className={`p-3 rounded-xl font-black text-xs flex items-center gap-1.5 transition-all ${
                  timerRunning
                    ? "bg-amber-600 hover:bg-amber-500 text-white"
                    : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-900/40"
                }`}
              >
                {timerRunning ? <Pause size={16} /> : <Play size={16} />}
                <span>{timerRunning ? "إيقاف مؤقت" : "بدء الامتحان"}</span>
              </button>

              <button
                onClick={resetExam}
                className="p-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors"
                title="إعادة ضبط المؤقت"
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Live Score Tracker Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm font-black text-emerald-950">
          <div className="flex items-center gap-2">
            <Award size={20} className="text-emerald-700" />
            <span>نقطتك التقديرية الذاتية حتى الآن :</span>
            <span className="text-lg font-sans font-extrabold text-emerald-900">
              {userScore.toFixed(2)} / 5.00 نقطة مجربة
            </span>
          </div>

          <div className="text-xs text-slate-600 font-semibold">
            ضع علامة صح ✅ على كل سؤال أجبته بشكل صحيح لاحتساب نقطتك في الحين.
          </div>
        </div>

        {/* Questions Interactive List */}
        <div className="space-y-6">
          {currentExam.questions.map((q, idx) => {
            const hasSolution = !!expandedSolutions[q.id];
            const hasHint = !!expandedHints[q.id];
            const isScored = !!scoredQuestions[q.id];

            return (
              <div
                key={q.id}
                className={`p-6 sm:p-8 rounded-3xl border transition-all text-right space-y-5 ${
                  isScored
                    ? "bg-emerald-50/40 border-emerald-400 ring-2 ring-emerald-400/20 shadow-sm"
                    : "bg-white border-slate-200 shadow-xs hover:border-slate-300"
                }`}
              >
                {/* Question Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-slate-900 text-white font-sans font-black text-xs flex items-center justify-center">
                      0{idx + 1}
                    </span>
                    <span className="text-xs font-black text-slate-500">{q.part}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-lg">
                      السلم الوزاري: {q.points} نقطة
                    </span>

                    {/* Self scoring button */}
                    <button
                      onClick={() => toggleScore(q.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                        isScored
                          ? "bg-emerald-700 text-white shadow-xs"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                      }`}
                    >
                      <CheckCircle2 size={14} />
                      <span>{isScored ? "تم الإنجاز بنجاح ✓" : "تأكيد إنجازي"}</span>
                    </button>
                  </div>
                </div>

                {/* Question Text */}
                <div className="text-base sm:text-lg font-black text-slate-900 leading-relaxed whitespace-pre-line">
                  {q.question}
                </div>

                {/* Action Buttons: Hint / Rule / Solution */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => toggleHint(q.id)}
                    className="px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <HelpCircle size={15} className="text-amber-700" />
                    <span>{hasHint ? "إخفاء التلميح" : "كشف التلميح البيداغوجي"}</span>
                  </button>

                  <button
                    onClick={() => toggleSolution(q.id)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    {hasSolution ? <EyeOff size={15} /> : <Eye size={15} />}
                    <span>{hasSolution ? "إخفاء عناصر الإجابة" : "عرض التصحيح النموذجي وسلم التنقيط"}</span>
                  </button>
                </div>

                {/* Pedagogical Hint Box */}
                {hasHint && (
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1.5 animate-slide-down">
                    <div className="font-black flex items-center gap-1.5 text-amber-900">
                      <Sparkles size={14} className="text-amber-700" />
                      <span>تلميح منهجي لتوجيه تفكيرك دون حرق الجواب :</span>
                    </div>
                    <p className="font-semibold leading-relaxed">{q.hint}</p>
                    <div className="text-[11px] text-amber-800 font-normal">
                      <strong>القاعدة المعتمدة في المنهاج :</strong> {q.officialRule}
                    </div>
                  </div>
                )}

                {/* Detailed Official Solution & Rubric */}
                {hasSolution && (
                  <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 text-xs space-y-3 animate-slide-down">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="font-black text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 size={14} />
                        عناصر الإجابة الرسمية المعتمدة للامتحان الوطني
                      </span>
                      <span className="text-[11px] text-slate-400">سلم التنقيط : {q.points} / 20</span>
                    </div>

                    <div className="leading-relaxed font-sans text-slate-200 whitespace-pre-line text-sm">
                      {q.solution}
                    </div>

                    <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-200 text-xs">
                      <strong className="block text-rose-300 font-black mb-1">
                        ⚠️ الفخ المنهجي الأكثر شيوعاً في تصحيح الوزارة :
                      </strong>
                      {q.pitfall}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA to ask the AI Tutor */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-950 to-teal-950 text-white border border-emerald-500/30 text-center space-y-5">
          <h3 className="text-xl sm:text-2xl font-black">
            هل تحتاج لشرح مفصل خطوة بخطوة لأي سؤال من هذا الامتحان؟
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-normal">
            الأستاذ الافتراضي الموجه لمنصة مدرسي مبرمج وفق عناصر الإجابة الرسمية، ويمكنه تبسيط البرهان لك بكل وضوح.
          </p>
          <div>
            <Link
              href="/tuteur"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm shadow-lg transition-all"
            >
              <Sparkles size={16} />
              <span>ناقش هذا الامتحان مع الأستاذ الآن</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
