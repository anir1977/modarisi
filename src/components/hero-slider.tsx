"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Award,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  GraduationCap,
  ArrowLeft,
  Camera,
  Play,
  Pause,
} from "lucide-react";
import Link from "next/link";

type Slide = {
  id: string;
  badge: string;
  title: string;
  highlight: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  tag: string;
  shortTitle: string;
  iconName: string;
  stats: { label: string; value: string };
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  floatingBadge: { title: string; subtitle: string; icon: string };
};

const SLIDES: Slide[] = [
  {
    id: "slide-1",
    badge: "وفق المقرر الدراسي المغربي 🇲🇦",
    title: "مواكبة بيداغوجية دقيقة للباكالوريا",
    highlight: "وفق المنهاج الوطني والديدكتيك المغربي",
    description: "شروحات منهجية وتأطير علمي رصين لكافة الشعب والمسالك (العلوم الرياضية، العلوم التجريبية، والعلوم الاقتصادية)، مع مراعاة معاملات كل شعبة وبنية الامتحانات.",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "طلبة مغاربة يراجعون باجتهاد في مكتبة جامعية متطورة",
    tag: "التحضير للامتحان الوطني الموحد",
    shortTitle: "منهاج الباكالوريا",
    iconName: "mortarboard",
    stats: { label: "الشعب المغطاة", value: "4 شعب" },
    ctaPrimary: { label: "تصفح المراجع", href: "/maraji3" },
    ctaSecondary: { label: "دليل الشعب والمسالك", href: "/filieres" },
    floatingBadge: {
      title: "أطر مرجعية محينة",
      subtitle: "ملخصة ومبسطة",
      icon: "🇲🇦",
    },
  },
  {
    id: "slide-2",
    badge: "دليل المراجع والكتب المدرسية",
    title: "المراجع وبنية الامتحانات",
    highlight: "تحت سقف بيداغوجي واحد",
    description: "فهارس تفصيلية لكتب «المفيد في الرياضيات» و«النجاح» و«في رحاب العلوم الفيزيائية» ومؤلفات الفرنسية، مع تفصيل عناصر الإجابة وسلم التنقيط لضمان حصد النقطة الكاملة.",
    imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "كتب مدرسية وأدوات دراسية",
    tag: "مراجع وبنية الامتحانات",
    shortTitle: "المراجع المقررة",
    iconName: "book",
    stats: { label: "المواد المغطاة", value: "6 مواد" },
    ctaPrimary: { label: "المكتبة الرقمية للمراجع", href: "/maraji3" },
    ctaSecondary: { label: "بنك الامتحانات الوطنية", href: "/examens" },
    floatingBadge: {
      title: "المفيد وفي رحاب",
      subtitle: "حسب المادة والمستوى",
      icon: "📚",
    },
  },
  {
    id: "slide-3",
    badge: "المصاحبة الفردية والتصحيح خطوة بخطوة 24/7",
    title: "أستاذك الافتراضي المتخصص",
    highlight: "يسهر على تفوقك الأكاديمي على مدار الساعة",
    description: "لا يقدم حلولاً جاهزة مجردة، بل يبني معك البرهان خطوة بخطوة، ينبهك إلى الفخاخ المنهجية الشائعة في ورقة الامتحان، ويشرح المصطلحات العلمية باللغة المناسبة لمسلكك (BIOF).",
    imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "أستاذ يشرح المفاهيم العلمية والرياضية في قاعة درس تفاعلية",
    tag: "شرح بيداغوجي تفاعلي مستمر",
    shortTitle: "الأستاذ الذكي 24/7",
    iconName: "sparkles",
    stats: { label: "ساعات المصاحبة الأكاديمية", value: "24/24" },
    ctaPrimary: { label: "ابدأ جلسة مع الأستاذ", href: "/tuteur" },
    ctaSecondary: { label: "الميثاق البيداغوجي", href: "/charte" },
    floatingBadge: {
      title: "متصل الآن ومستعد 🟢",
      subtitle: "جاهز لشرح أي تمرين فوراً",
      icon: "⚡",
    },
  },
  {
    id: "slide-4",
    badge: "الأستاذ الافتراضي",
    title: "اكتب تمرينك المستعصي",
    highlight: "واحصل على التحليل والتعليل الرياضي",
    description: "اكتب نص التمرين أو سؤالك، وسيساعدك الأستاذ الافتراضي على تفكيك المعطيات وتذكيرك بالقاعدة المناسبة والوصول للحل خطوة بخطوة. (خاصية إرسال الصور قريباً)",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "تلميذة تحلل تمرينا تطبيقيا مع شروحات علمية دقيقة",
    tag: "تحليل ذكي للمعادلات والرسوم البيانية",
    shortTitle: "الأستاذ الافتراضي",
    iconName: "camera",
    stats: { label: "تصحيح التمارين", value: "خطوة بخطوة" },
    ctaPrimary: { label: "اسأل الأستاذ الافتراضي", href: "/tuteur" },
    ctaSecondary: { label: "حاسبة معدل الباك", href: "/calculateur" },
    floatingBadge: {
      title: "تصحيح بالخطوات",
      subtitle: "تعليل علمي مفصل",
      icon: "📸",
    },
  },
];

export function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const SLIDE_DURATION = 6500; // 6.5s per slide

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    setProgress(0);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setProgress(0);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  // Progress Bar timer
  useEffect(() => {
    if (isPaused) return;

    const intervalStep = 50; // update every 50ms
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + (intervalStep / SLIDE_DURATION) * 100;
      });
    }, intervalStep);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const current = SLIDES[currentIndex];

  return (
    <div
      className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-700/60 bg-slate-950 group select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Top Animated Progress Bar */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-slate-900/80 z-30 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 transition-[width] duration-75 ease-linear shadow-sm shadow-emerald-400/50"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Background Images with Crossfade and Ken Burns Zoom */}
      <div className="relative h-[540px] sm:h-[620px] lg:h-[680px] w-full overflow-hidden">
        {SLIDES.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <img
                src={slide.imageUrl}
                alt={slide.imageAlt}
                className={`w-full h-full object-cover transform ${
                  isActive ? "animate-ken-burns" : "scale-100"
                }`}
              />
              {/* Deep Cinematic Contrast Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40" />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/60 via-slate-950/30 to-slate-950/70" />
            </div>
          );
        })}

        {/* Floating Live Badge (Top Left) */}
        <div className="absolute top-6 left-6 z-25 hidden sm:block">
          <div className="animate-float-slow p-3.5 rounded-2xl bg-slate-900/90 border border-emerald-500/40 backdrop-blur-md shadow-2xl text-white flex items-center gap-3">
            <span className="text-2xl">{current.floatingBadge.icon}</span>
            <div className="text-right">
              <div className="text-xs font-black text-emerald-300 leading-tight">
                {current.floatingBadge.title}
              </div>
              <div className="text-[10px] text-slate-300 font-medium">
                {current.floatingBadge.subtitle}
              </div>
            </div>
          </div>
        </div>

        {/* Content Overlay with Key-triggered Cascading Motion */}
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-10 lg:p-14 text-white">
          
          {/* Top Row: Official Ministry Badge & Counter */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div
              key={`badge-${currentIndex}`}
              className="animate-slide-down inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-900/90 border border-emerald-400/40 text-emerald-100 text-xs sm:text-sm font-black backdrop-blur-md shadow-lg"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span>{current.badge}</span>
            </div>

            {/* Slide Index Counter & Pause State */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-xs text-slate-200 transition-colors backdrop-blur-md"
                title={isPaused ? "تشغيل الحركة التلقائية" : "إيقاف مؤقت"}
              >
                {isPaused ? <Play size={12} className="fill-white" /> : <Pause size={12} className="fill-white" />}
              </button>

              <div className="px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs font-black text-emerald-300 font-sans backdrop-blur-md">
                0{currentIndex + 1} <span className="text-slate-500">/</span> 0{SLIDES.length}
              </div>
            </div>
          </div>

          {/* Center Dynamic Animated Text Block */}
          <div key={`content-${currentIndex}`} className="max-w-3xl space-y-4 my-auto">
            
            {/* Tag / Category Badge with entrance */}
            <div className="animate-slide-right inline-flex items-center gap-2 text-xs sm:text-sm font-black text-amber-300 bg-amber-950/70 border border-amber-500/40 px-3.5 py-1 rounded-lg backdrop-blur-xs shadow-xs">
              <Sparkles size={14} className="text-amber-400" />
              <span>{current.tag}</span>
            </div>

            {/* Giant Arabic Title with Staggered Slide-Up */}
            <h2 className="animate-slide-up-1 text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.25] tracking-tight drop-shadow-md">
              {current.title}
            </h2>

            {/* Highlighted Gradient Punchline */}
            <div className="animate-slide-up-2 text-xl sm:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-l from-emerald-300 via-teal-200 to-amber-200 leading-tight">
              {current.highlight}
            </div>

            {/* Clear Formal Arabic Description */}
            <p className="animate-slide-up-3 text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed font-medium drop-shadow-xs max-w-2xl">
              {current.description}
            </p>

            {/* Primary & Secondary Call-to-Action Buttons */}
            <div className="animate-slide-up-4 pt-3 flex flex-wrap items-center gap-4">
              <Link
                href={current.ctaPrimary.href}
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 hover:from-emerald-500 hover:to-teal-700 text-white font-black text-sm shadow-xl hover:shadow-emerald-900/50 transition-all flex items-center gap-2.5 transform hover:-translate-y-0.5"
              >
                <BookOpen size={18} />
                <span>{current.ctaPrimary.label}</span>
                <ArrowLeft size={16} />
              </Link>

              <Link
                href={current.ctaSecondary.href}
                className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 backdrop-blur-md transition-all flex items-center gap-2 hover:border-white/40"
              >
                <span>{current.ctaSecondary.label}</span>
              </Link>

              {/* Mini Stats Card */}
              <div className="mr-auto hidden md:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-900/85 border border-white/15 backdrop-blur-md">
                <div className="text-right">
                  <div className="text-[11px] text-slate-400 font-semibold">{current.stats.label}</div>
                  <div className="text-base font-black text-emerald-300">{current.stats.value}</div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Interactive Thumbnail Selector Cards (Clickable) */}
          <div className="pt-4 border-t border-white/15">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {SLIDES.map((slide, idx) => {
                const isSelected = idx === currentIndex;
                return (
                  <button
                    key={slide.id}
                    onClick={() => goToSlide(idx)}
                    className={`text-right p-3 rounded-2xl border transition-all duration-300 flex items-center gap-2.5 ${
                      isSelected
                        ? "bg-emerald-900/80 border-emerald-400 shadow-lg ring-2 ring-emerald-400/30 backdrop-blur-md"
                        : "bg-slate-900/60 border-white/10 hover:bg-slate-900/80 hover:border-white/25 backdrop-blur-xs opacity-75 hover:opacity-100"
                    }`}
                  >
                    <span className={`w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center shrink-0 ${
                      isSelected ? "bg-emerald-400 text-slate-950 font-sans" : "bg-white/10 text-slate-300 font-sans"
                    }`}>
                      0{idx + 1}
                    </span>
                    <div className="truncate">
                      <div className={`text-xs font-black truncate ${isSelected ? "text-white" : "text-slate-300"}`}>
                        {slide.shortTitle}
                      </div>
                      <div className="text-[10px] text-emerald-400 font-medium truncate hidden sm:block">
                        {slide.stats.value}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Lateral Navigation Arrow Buttons */}
        <button
          onClick={prevSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-25 w-12 h-12 rounded-full bg-slate-900/70 hover:bg-emerald-800 border border-white/20 text-white flex items-center justify-center transition-all backdrop-blur-md shadow-xl hover:scale-105"
          aria-label="الشريحة السابقة"
        >
          <ChevronRight size={24} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-25 w-12 h-12 rounded-full bg-slate-900/70 hover:bg-emerald-800 border border-white/20 text-white flex items-center justify-center transition-all backdrop-blur-md shadow-xl hover:scale-105"
          aria-label="الشريحة التالية"
        >
          <ChevronLeft size={24} />
        </button>

      </div>
    </div>
  );
}
