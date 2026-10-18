"use client";
import { useState, useEffect, useCallback } from "react";
import { ChevronRight, ChevronLeft, BookOpen, Award, CheckCircle2, ShieldCheck, Sparkles, GraduationCap } from "lucide-react";

type Slide = {
  id: string;
  badge: string;
  badgeIcon: string;
  title: string;
  highlight: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  tag: string;
  stats: { label: string; value: string };
};

const SLIDES: Slide[] = [
  {
    id: "slide-1",
    badge: "المقرر الرسمي المعتمد 2024-2025 بالمملكة المغربية 🇲🇦",
    badgeIcon: "وزارة التربية الوطنية",
    title: "مواكبة بيداغوجية دقيقة للباكالوريا",
    highlight: "وفق المنهاج الوطني المغربي",
    description: "شروحات منهجية وتأطير علمي رصين لكافة الشعب والمسالك: العلوم الرياضية، العلوم الفيزيائية، علوم الحياة والأرض، والعلوم الاقتصادية، مع احترام تام لتوزيع المعاملات والأطر المرجعية.",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "طلبة مغاربة يراجعون باجتهاد في مكتبة جامعية متطورة",
    tag: "التحضير للامتحان الوطني الموحد",
    stats: { label: "نسبة مطابقة المنهاج الوزاري", value: "100%" },
  },
  {
    id: "slide-2",
    badge: "المكتبة الرقمية للكتب المدرسية المصادق عليها",
    badgeIcon: "المراجع الرسمية",
    title: "المراجع المعتمدة والأطر المرجعية",
    highlight: "تحت سقف بيداغوجي واحد",
    description: "فهارس تفصيلية لكتب «المفيد» و«النجاح» و«في رحاب» مع عناصر الإجابة الرسمية، وتوزيع نسب المجالات المهارية والمضامينية الصادرة عن المفتشية العامة للشؤون التربوية.",
    imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "مراجع وكتب مدرسية معتمدة وأدوات دراسية وهندسة رياضية",
    tag: "أطر مرجعية وسلم التنقيط الرسمي",
    stats: { label: "الكتب والمراجع المعتمدة", value: "+24 مرجع" },
  },
  {
    id: "slide-3",
    badge: "المصاحبة الفردية والتصحيح خطوة بخطوة",
    badgeIcon: "الأستاذ الموجه",
    title: "أستاذك الافتراضي المتخصص",
    highlight: "يسهر على تفوقك الأكاديمي 24/7",
    description: "لا يقدم حلولاً جاهزة ومجردة، بل يبني معك البرهان خطوة بخطوة، ينبهك إلى الفخاخ المنهجية الشائعة في ورقة الامتحان، ويشرح المصطلحات العلمية باللغة المناسبة لمسلكك.",
    imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "أستاذ يشرح المفاهيم العلمية والرياضية في قاعة درس تفاعلية",
    tag: "تصحيح بيداغوجي تفاعلي",
    stats: { label: "ساعات المصاحبة الأكاديمية", value: "24/24" },
  },
  {
    id: "slide-4",
    badge: "حل التمارين والوضعيات التقويمية بالصور",
    badgeIcon: "المختبر البيداغوجي",
    title: "التقط صورة لتمرينك المستعصي",
    highlight: "واحصل على التحليل والتعليل",
    description: "صور نص التمرين أو المسألة من دفترك أو كتابك المدرسي، وسيتولى النظام تفكيك المعطيات، وتذكيرك بالقاعدة الرياضية أو الفيزيائية المناسبة، وتأطير النتيجة النهائية بدقة.",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "تلميذة تحلل تمرينا تطبيقيا مع شروحات علمية دقيقة",
    tag: "تحليل ذكي للمعادلات والرسوم البيانية",
    stats: { label: "أرشيف الامتحانات المصححة", value: "2010 - 2024" },
  },
];

export function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  const current = SLIDES[currentIndex];

  return (
    <div
      className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-950 group select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image with Dynamic Transitions */}
      <div className="relative h-[480px] sm:h-[560px] lg:h-[620px] w-full overflow-hidden">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <img
              src={slide.imageUrl}
              alt={slide.imageAlt}
              className="w-full h-full object-cover transform scale-105 transition-transform duration-10000 ease-linear"
            />
            {/* Multi-layered cinematic gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/40 via-transparent to-slate-950/60" />
          </div>
        ))}

        {/* Content Overlay */}
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-10 lg:p-12 text-white">
          
          {/* Top Bar: Official Badge & Indicator */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-900/90 border border-emerald-400/40 text-emerald-100 text-xs sm:text-sm font-bold backdrop-blur-md shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{current.badge}</span>
            </div>

            <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs font-semibold backdrop-blur-md">
              <GraduationCap size={16} className="text-emerald-400" />
              <span>منصة مدرسي البيداغوجية</span>
            </div>
          </div>

          {/* Center / Bottom: Narrative Content */}
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-amber-300 bg-amber-950/60 border border-amber-500/30 px-3 py-1 rounded-lg backdrop-blur-xs">
              <Sparkles size={14} className="text-amber-400" />
              <span>{current.tag}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-md">
              {current.title}
              <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-l from-emerald-300 via-teal-200 to-amber-200">
                {current.highlight}
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium drop-shadow-xs line-clamp-3 sm:line-clamp-none">
              {current.description}
            </p>

            {/* Actions & Mini Stats */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#maraji3"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-extrabold text-sm shadow-lg hover:shadow-emerald-900/40 transition-all flex items-center gap-2"
              >
                <BookOpen size={18} />
                <span>تصفح المراجع المعتمدة</span>
              </a>

              <a
                href="#tuteur"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 backdrop-blur-md transition-all flex items-center gap-2"
              >
                <Sparkles size={18} className="text-amber-300" />
                <span>جلسة دعم مع الأستاذ</span>
              </a>

              <div className="mr-auto hidden md:flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-900/80 border border-white/10 backdrop-blur-md">
                <div className="text-right">
                  <div className="text-xs text-slate-400 font-semibold">{current.stats.label}</div>
                  <div className="text-base font-black text-emerald-300">{current.stats.value}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Slider Controls & Indicator Bars */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            {/* Slide Indicators */}
            <div className="flex items-center gap-2 sm:gap-3">
              {SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "w-8 sm:w-12 bg-emerald-400 shadow-sm shadow-emerald-400/50"
                      : "w-2.5 bg-white/30 hover:bg-white/60"
                  }`}
                  aria-label={`الانتقال إلى الشريحة ${idx + 1}`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white transition-all backdrop-blur-md"
                aria-label="الشريحة السابقة"
              >
                <ChevronRight size={20} />
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white transition-all backdrop-blur-md"
                aria-label="الشريحة التالية"
              >
                <ChevronLeft size={20} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
