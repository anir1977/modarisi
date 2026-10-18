"use client";
import { TRACKS } from "@/lib/curriculum";
import { HeroSlider } from "@/components/hero-slider";
import { Sparkles, CheckCircle2, ShieldCheck, BookOpen, Star, ArrowLeft, GraduationCap } from "lucide-react";

export function HeroSection({
  selectedTrack,
  onSelectTrack,
}: {
  selectedTrack: string;
  onSelectTrack: (trackId: string) => void;
}) {
  const current = TRACKS.find((t) => t.id === selectedTrack) || TRACKS[0];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-24">
      <div className="hero-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Top Header & Institutional Accreditation Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-300/80 text-emerald-950 text-xs sm:text-sm font-black shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse shrink-0" />
            <span>منهاج معتمد ومطابق 100% للتوجيهات التربوية الرسمية لوزارة التربية الوطنية والتعليم الأولي والرياضة 🇲🇦</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-600 font-bold mr-auto">
            <span className="hidden md:inline-flex items-center gap-1.5 text-slate-800">
              <GraduationCap size={16} className="text-emerald-700" />
              <span>المقرر الدراسي المغربي المحين 2024-2025</span>
            </span>
            <span className="inline-flex items-center gap-1 text-emerald-800 font-extrabold bg-emerald-100/80 px-2.5 py-1 rounded-lg">
              الدار البيضاء · الرباط · فاس · مراكش · طنجة
            </span>
          </div>
        </div>

        {/* Dynamic Interactive Slider as Hero Centerpiece */}
        <div>
          <HeroSlider />
        </div>

        {/* Track Customizer & Pedagogical Dashboard Bar */}
        <div id="filieres" className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center gap-2 text-emerald-800 font-black text-sm">
                <BookOpen size={18} />
                <span>التوجيه والمسالك التعليمية المعتمدة</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                اختر شعبتك لتخصيص الشروحات والمراجع المقررة
              </h3>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
              <span>جميع الشعب العلمية والتقنية والأدبية</span>
            </div>
          </div>

          {/* Track Selector Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {TRACKS.map((track) => {
              const isSelected = track.id === selectedTrack;
              return (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => onSelectTrack(track.id)}
                  className={`text-right p-4 sm:p-5 rounded-2xl border transition-all ${
                    isSelected
                      ? "bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-950 text-white border-emerald-950 shadow-xl transform scale-[1.01]"
                      : "bg-slate-50/70 text-slate-800 border-slate-200 hover:border-emerald-300 hover:bg-white shadow-xs"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-black px-2 py-0.5 rounded-md ${
                      isSelected ? "bg-emerald-800 text-emerald-200" : "bg-slate-200 text-slate-700"
                    }`}>
                      {track.level === "2bac" ? "الثانية باك" : track.level === "1bac" ? "الأولى باك" : "الثالثة إعدادي"}
                    </span>
                    {isSelected && <span className="text-xs text-emerald-300 font-bold">المسلك النشط ✓</span>}
                  </div>
                  <div className="font-black text-sm sm:text-base leading-snug mt-2">{track.nameAr}</div>
                  <div className={`text-xs mt-1 font-sans ${isSelected ? "text-emerald-200" : "text-slate-500"}`}>
                    {track.name}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Track Overview & Direct Jump */}
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs sm:text-sm">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-black text-emerald-950">المواد ومعاملات الامتحان الوطني :</span>
                <span className="text-emerald-900 font-bold">{current.subjects.join(" · ")}</span>
              </div>
              <p className="text-slate-600 font-medium text-xs leading-relaxed max-w-3xl">
                {current.description}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href="#maraji3"
                className="px-4 py-2.5 rounded-xl bg-white border border-emerald-300 text-emerald-900 font-black text-xs hover:bg-emerald-100 transition-colors"
              >
                المراجع المعتمدة لهذا المسلك
              </a>
              <a
                href="#tuteur"
                className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-black text-xs shadow-md transition-colors flex items-center gap-1.5"
              >
                <span>ابدأ الشرح المباشر</span>
                <ArrowLeft size={14} />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
