"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Calculator,
  Sparkles,
  FileText,
  ArrowLeft,
  CheckCircle2,
  Play,
  Pause,
  MessageSquare,
  Timer,
  Award,
} from "lucide-react";

type LevelKey = "2bac" | "1bac" | "libre";

const LEVEL_DATA: Record<
  LevelKey,
  {
    label: string;
    badge: string;
    title: string;
    subtitle: string;
    subjects: { name: string; coef: string }[];
    quickQ: { q: string; subject: string; step1: string; step2: string }[];
    exams: { title: string; meta: string; href: string }[];
  }
> = {
  "2bac": {
    label: "الثانية باك",
    badge: "الوطني 50%",
    title: "الامتحان الوطني الموحد",
    subtitle: "علوم فيزيائية · علوم الحياة والأرض · علوم رياضية · اقتصاد · آداب",
    subjects: [
      { name: "الرياضيات", coef: "معامل 7/9" },
      { name: "الفيزياء", coef: "معامل 7/5" },
      { name: "SVT", coef: "معامل 7/5" },
      { name: "الفلسفة", coef: "معامل 2" },
    ],
    quickQ: [
      {
        q: "كيف نبين أن المستقيم (Δ) مقارب مائل؟",
        subject: "الرياضيات · الدوال",
        step1: "نحسب النهاية lim [f(x) - (ax + b)] بجوار ∞.",
        step2: "إذا ساوت 0 فالمستقيم مقارب مائل، وندرس إشارة الفرق للوضع النسبي.",
      },
      {
        q: "المعادلة التفاضلية لدارة RC أثناء الشحن؟",
        subject: "الفيزياء · الكهرباء",
        step1: "حسب قانون إضافية التوترات: u_R + u_C = E.",
        step2: "نعوض i = C·du_C/dt فنحصل على: R·C·(du_C/dt) + u_C = E.",
      },
      {
        q: "خطوات مقدمة القولة الفلسفية بالسلم؟",
        subject: "الفلسفة · المنهجية",
        step1: "تأطير المجزوءة والمفهوم المركزي ثم إبراز المفارقة.",
        step2: "صياغة الإشكال وأسئلة التحليل والمناقشة (4 نقط في الوطني).",
      },
    ],
    exams: [
      { title: "الوطني 2024 · الرياضيات والفيزياء (PC/SVT)", meta: "الدورة العادية والاستدراكية + التصحيح", href: "/examens" },
      { title: "محاكي الامتحان الوطني بالمؤقت الزمني", meta: "تدرب في ظروف الامتحان الحقيقية", href: "/simulateur" },
    ],
  },
  "1bac": {
    label: "الأولى باك",
    badge: "الجهوي 25%",
    title: "الامتحان الجهوي الموحد",
    subtitle: "اللغة الفرنسية · التربية الإسلامية · التاريخ والجغرافيا · العربية",
    subjects: [
      { name: "الفرنسية (Œuvres)", coef: "معامل 4" },
      { name: "التربية الإسلامية", coef: "معامل 2" },
      { name: "الاجتماعيات", coef: "معامل 2" },
      { name: "العربية", coef: "معامل 2" },
    ],
    quickQ: [
      {
        q: "كيف أكتب Situation de passage في Antigone؟",
        subject: "الفرنسية · المؤلفات",
        step1: "ذكر الكاتب (Jean Anouilh) ونوع المسرحية (Tragédie moderne).",
        step2: "تحديد الحدث السابق مباشرة للمقطع بدقة دون حرق النهاية (1 نقطة).",
      },
      {
        q: "كيف أستثمر سورة يوسف في الوضعية المشكلة؟",
        subject: "التربية الإسلامية",
        step1: "تحديد الإشكال واستخراج القيم المركزية (الصبر، العفة، التخطيط).",
        step2: "الاستدلال بالآية المناسبة من سورة يوسف مع بيان وجه الدلالة.",
      },
      {
        q: "متى نختار مبيان المنحنى أو الأعمدة في الجغرافيا؟",
        subject: "الاجتماعيات · المبيان",
        step1: "المنحنى للتطور عبر الزمن المتصل، والأعمدة للمقارنة بين معطيات.",
        step2: "تذكر كتابة العنوان، المفتاح، المقياس، والمصدر لحصد 3 نقط كاملة.",
      },
    ],
    exams: [
      { title: "الامتحانات الجهوية الموحدة · جميع الجهات 12", meta: "الفرنسية، التربية الإسلامية، والاجتماعيات", href: "/examens" },
      { title: "ملخصات مؤلفات الفرنسية الثلاثة والمنهجية", meta: "La Boîte à Merveilles · Antigone · Condamné", href: "/dourous" },
    ],
  },
  libre: {
    label: "باك حر",
    badge: "الأحرار 100%",
    title: "مسار المترشحين الأحرار",
    subtitle: "برنامج مكثف يجمع مواد الجهوي والوطني بدون مراقبة مستمرة",
    subjects: [
      { name: "مواد الوطني", coef: "وزن 65%" },
      { name: "مواد الجهوي", coef: "وزن 35%" },
      { name: "الفلسفة واللغات", coef: "معامل 2-4" },
      { name: "التربية البدنية", coef: "معامل 1" },
    ],
    quickQ: [
      {
        q: "كيف أقسم وقتي بين الجهوي والوطني في باك حر؟",
        subject: "منهجية الأحرار",
        step1: "خصّص 65% للمواد ذات المعاملات الكبرى في الوطني (التخصص).",
        step2: "خصّص 35% لمواد الجهوي بالاشتغال المباشر على الامتحانات المصححة.",
      },
      {
        q: "كيف يُحسب معدل الباك حر بدون مراقبة مستمرة؟",
        subject: "حساب نقط الأحرار",
        step1: "مجموع نقط مواد الجهوي والوطني مضروبة في معاملاتها الرسمية.",
        step2: "قسمة المجموع على مجموع المعاملات الكلي للمسلك المختار.",
      },
      {
        q: "ما هي الدروس الأكثر تكراراً لضمان النجاح بميزة؟",
        subject: "الأطر المرجعية",
        step1: "التركيز على الدوال والمتتاليات والعقدية في الرياضيات والموجات والكهرباء.",
        step2: "إتقان منهجية النص والسؤال والقولة في الفلسفة ومؤلفات الفرنسية.",
      },
    ],
    exams: [
      { title: "حاسبة معدل الباك حر والانتقاء للمدارس", meta: "حساب خاص بالمترشحين الأحرار", href: "/calculateur?track=libre" },
      { title: "أرشيف الامتحانات الوطنية والجهوية بالسلم", meta: "نماذج رسمية مع عناصر الإجابة", href: "/examens" },
    ],
  },
};

export function HeroPhotoSlider() {
  const [level, setLevel] = useState<LevelKey>("2bac");
  const [activeCardTab, setActiveCardTab] = useState<"calc" | "tutor" | "exams">("calc");
  const [paused, setPaused] = useState(false);

  // Interactive Mini Calculator State
  const [regScore, setRegScore] = useState(14.5);
  const [ccScore, setCcScore] = useState(15.5);
  const [natScore, setNatScore] = useState(15.25);

  // Interactive Tutor Question Index
  const [qIdx, setQIdx] = useState(0);

  const cycleTabs = useCallback(() => {
    setActiveCardTab((prev) => (prev === "calc" ? "tutor" : prev === "tutor" ? "exams" : "calc"));
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(cycleTabs, 6500);
    return () => clearInterval(t);
  }, [paused, cycleTabs]);

  const currentLevel = LEVEL_DATA[level];
  const currentQ = currentLevel.quickQ[qIdx] || currentLevel.quickQ[0];

  const bacAvg =
    level === "libre"
      ? +(regScore * 0.35 + natScore * 0.65).toFixed(2)
      : +(regScore * 0.25 + ccScore * 0.25 + natScore * 0.5).toFixed(2);

  const seuilScore = +(regScore * 0.25 + natScore * 0.75).toFixed(2);

  const mention =
    bacAvg >= 16
      ? "حسن جداً 🌟"
      : bacAvg >= 14
      ? "حسن 🏆"
      : bacAvg >= 12
      ? "مستحسن ✓"
      : bacAvg >= 10
      ? "مقبول"
      : "استدراكية";

  return (
    <div
      dir="rtl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="w-full rounded-[28px] bg-[#12142b]/95 border-2 border-white/15 shadow-[0_24px_60px_rgba(0,0,0,0.38)] p-4 sm:p-5 text-white space-y-3.5 backdrop-blur-xl"
    >
      {/* 1. Top Segmented Track Switcher (2Bac · 1Bac · Bac Libre) */}
      <div className="flex items-center justify-between gap-2 bg-[#1b1e3d] p-1.5 rounded-2xl border border-white/10">
        <div className="grid grid-cols-3 gap-1.5 flex-1">
          {(["2bac", "1bac", "libre"] as LevelKey[]).map((k) => {
            const item = LEVEL_DATA[k];
            const isSelected = level === k;
            return (
              <button
                key={k}
                type="button"
                onClick={() => {
                  setLevel(k);
                  setQIdx(0);
                }}
                className={`px-2.5 py-2 rounded-xl text-right transition-all flex items-center justify-between gap-1.5 ${
                  isSelected
                    ? "bg-[#f2b233] text-[#121322] font-extrabold shadow-md"
                    : "text-white/80 hover:bg-white/10 hover:text-white font-semibold"
                }`}
              >
                <span className="text-xs sm:text-sm truncate">{item.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold shrink-0 ${
                    isSelected ? "bg-[#121322] text-[#f2b233]" : "bg-white/10 text-white/80"
                  }`}
                >
                  {item.badge}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setPaused(!paused)}
          title={paused ? "تشغيل التبديل التلقائي" : "إيقاف مؤقت"}
          className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 shrink-0"
        >
          {paused ? <Play size={13} /> : <Pause size={13} />}
        </button>
      </div>

      {/* 2. Bento Top Card: Active Track Overview & Subject Coefficient Pills */}
      <div className="p-4 rounded-2xl bg-gradient-to-l from-[#2b2fb3] to-[#1d1f8f] border border-white/15 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="text-[11px] font-bold text-[#f2b233] flex items-center gap-1.5">
              <Sparkles size={13} />
              <span>مسار مخصص حسب الإطار المرجعي الرسمي 🇲🇦</span>
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-white mt-0.5">
              {currentLevel.title}
            </h3>
          </div>
          <Link
            href="/dourous"
            className="px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-xs font-bold text-white flex items-center gap-1 shrink-0 transition-colors"
          >
            <span>الدروس</span>
            <ArrowLeft size={12} />
          </Link>
        </div>

        <p className="text-xs text-white/85 leading-relaxed">{currentLevel.subtitle}</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-0.5">
          {currentLevel.subjects.map((sub, idx) => (
            <div
              key={idx}
              className="px-2.5 py-1.5 rounded-xl bg-[#12142b]/65 border border-white/10 flex items-center justify-between gap-1 text-[11px]"
            >
              <span className="font-bold text-white truncate">{sub.name}</span>
              <span className="text-[10px] font-extrabold text-[#f2b233] shrink-0">{sub.coef}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Interactive Bento Mode Selector (Calculator · AI Tutor · Exam Bank) */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { id: "calc", label: "حاسبة المعدل الحية", icon: Calculator, badge: `${bacAvg}/20` },
          { id: "tutor", label: "الأستاذ الافتراضي", icon: MessageSquare, badge: "خطوة بخطوة" },
          { id: "exams", label: "الامتحانات والمحاكي", icon: FileText, badge: "+30 نموذج" },
        ].map((tab) => {
          const Icon = tab.icon;
          const isOn = activeCardTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCardTab(tab.id as "calc" | "tutor" | "exams")}
              className={`p-2.5 rounded-2xl border text-right transition-all flex flex-col justify-between gap-1 ${
                isOn
                  ? "bg-white text-[#121322] border-[#f2b233] shadow-lg"
                  : "bg-[#1b1e3d]/80 text-white/85 border-white/10 hover:bg-[#1b1e3d]"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <Icon size={15} className={isOn ? "text-[#2b2fb3]" : "text-[#f2b233]"} />
                <span
                  className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-md ${
                    isOn ? "bg-[#f2b233] text-[#121322]" : "bg-white/10 text-white/75"
                  }`}
                >
                  {tab.badge}
                </span>
              </div>
              <div className="text-xs font-extrabold truncate mt-0.5">{tab.label}</div>
            </button>
          );
        })}
      </div>

      {/* 4. Dynamic Interactive Bento Workspace Panel */}
      <div className="p-4 rounded-2xl bg-[#1b1e3d] border border-white/12 min-h-[225px] flex flex-col justify-between">
        {activeCardTab === "calc" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-white flex items-center gap-1.5">
                <Calculator size={14} className="text-[#f2b233]" />
                <span>جرب تغيير النقط لحساب معدلك وعتبة الانتقاء فوراً:</span>
              </span>
              <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                {mention}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3 text-xs bg-[#12142b] px-3 py-2 rounded-xl border border-white/10">
                <span className="font-bold text-white/90 w-28 shrink-0">
                  {level === "libre" ? "الجهوي (35%)" : "الجهوي (25%)"}
                </span>
                <input
                  type="range"
                  min={5}
                  max={20}
                  step={0.25}
                  value={regScore}
                  onChange={(e) => setRegScore(parseFloat(e.target.value))}
                  className="w-full accent-[#f2b233] cursor-pointer h-1.5"
                />
                <span className="font-extrabold text-[#f2b233] w-12 text-left font-sans">
                  {regScore.toFixed(2)}
                </span>
              </div>

              {level !== "libre" && (
                <div className="flex items-center justify-between gap-3 text-xs bg-[#12142b] px-3 py-2 rounded-xl border border-white/10">
                  <span className="font-bold text-white/90 w-28 shrink-0">المراقبة (25%)</span>
                  <input
                    type="range"
                    min={5}
                    max={20}
                    step={0.25}
                    value={ccScore}
                    onChange={(e) => setCcScore(parseFloat(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer h-1.5"
                  />
                  <span className="font-extrabold text-emerald-300 w-12 text-left font-sans">
                    {ccScore.toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between gap-3 text-xs bg-[#12142b] px-3 py-2 rounded-xl border border-white/10">
                <span className="font-bold text-white/90 w-28 shrink-0">
                  {level === "libre" ? "الوطني (65%)" : "الوطني (50%)"}
                </span>
                <input
                  type="range"
                  min={5}
                  max={20}
                  step={0.25}
                  value={natScore}
                  onChange={(e) => setNatScore(parseFloat(e.target.value))}
                  className="w-full accent-sky-400 cursor-pointer h-1.5"
                />
                <span className="font-extrabold text-sky-300 w-12 text-left font-sans">
                  {natScore.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="p-2.5 rounded-xl bg-[#12142b] border border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-white/75">المعدل العام:</span>
                <span className="text-base font-extrabold text-white font-sans">{bacAvg.toFixed(2)} / 20</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#12142b] border border-[#f2b233]/40 flex items-center justify-between">
                <span className="text-[11px] text-white/75">عتبة الانتقاء (75%):</span>
                <span className="text-base font-extrabold text-[#f2b233] font-sans">{seuilScore.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        {activeCardTab === "tutor" && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-white flex items-center gap-1.5">
                <MessageSquare size={14} className="text-[#f2b233]" />
                <span>اضغط على سؤال لمعاينة الشرح المنهجي:</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                متصل الآن 🟢
              </span>
            </div>

            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {currentLevel.quickQ.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setQIdx(idx)}
                  className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold shrink-0 border transition-all ${
                    qIdx === idx
                      ? "bg-[#f2b233] text-[#121322] border-[#f2b233]"
                      : "bg-[#12142b] text-white/80 border-white/10 hover:text-white"
                  }`}
                >
                  {item.subject}
                </button>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-[#12142b] border border-white/10 space-y-2 text-xs">
              <div className="font-extrabold text-[#f2b233]">{currentQ.q}</div>
              <div className="text-white/90 leading-relaxed">
                <strong className="text-emerald-300">1. القاعدة: </strong>
                {currentQ.step1}
              </div>
              <div className="text-white/90 leading-relaxed">
                <strong className="text-sky-300">2. التطبيق: </strong>
                {currentQ.step2}
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                href="/tuteur"
                className="text-xs font-extrabold text-[#f2b233] hover:underline flex items-center gap-1"
              >
                <span>اسأل الأستاذ الافتراضي عن أي تمرين آخر</span>
                <ArrowLeft size={13} />
              </Link>
            </div>
          </div>
        )}

        {activeCardTab === "exams" && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-white flex items-center gap-1.5">
                <Award size={14} className="text-[#f2b233]" />
                <span>الامتحانات الرسمية المصححة ({currentLevel.label}):</span>
              </span>
              <span className="text-[10px] font-bold text-[#f2b233]">مرفقة بعناصر الإجابة</span>
            </div>

            <div className="space-y-2">
              {currentLevel.exams.map((ex, i) => (
                <Link
                  key={i}
                  href={ex.href}
                  className="p-3 rounded-xl bg-[#12142b] hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-between gap-2 block"
                >
                  <div>
                    <div className="text-xs font-extrabold text-white">{ex.title}</div>
                    <div className="text-[11px] text-white/65 mt-0.5">{ex.meta}</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-[#f2b233] text-[#121322] text-[10px] font-extrabold shrink-0 flex items-center gap-1">
                    <span>فتح</span>
                    <ArrowLeft size={11} />
                  </span>
                </Link>
              ))}
            </div>

            <div className="flex items-center justify-between pt-1 text-[11px] text-white/75">
              <span className="flex items-center gap-1">
                <CheckCircle2 size={13} className="text-emerald-400" />
                <span>تصحيح مفصل سؤالاً بسؤال</span>
              </span>
              <Link href="/examens" className="font-extrabold text-[#f2b233] hover:underline">
                كل الامتحانات ←
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
