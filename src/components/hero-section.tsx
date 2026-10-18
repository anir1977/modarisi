"use client";
import { useState } from "react";
import { TRACKS } from "@/lib/curriculum";
import { Sparkles, CheckCircle2, ShieldCheck, BookOpen, Star, ArrowLeft } from "lucide-react";

export function HeroSection({
  selectedTrack,
  onSelectTrack,
}: {
  selectedTrack: string;
  onSelectTrack: (trackId: string) => void;
}) {
  const current = TRACKS.find((t) => t.id === selectedTrack) || TRACKS[0];

  return (
    <section className="relative overflow-hidden pt-10 pb-20 lg:pt-16 lg:pb-28">
      <div className="hero-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Main Content Column */}
          <div className="lg:col-span-7 space-y-7">
            
            {/* Ministry Official Curriculum Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs sm:text-sm font-black shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>منهاج معتمد ومطابق 100% لمقرر وزارة التربية الوطنية والتعليم الأولي والرياضة 🇲🇦</span>
            </div>

            {/* Giant Arabic Headline (Large Bold Typography) */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-950 tracking-tight leading-[1.2]">
              أستاذك الخصوصي بالذكاء الاصطناعي{" "}
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-teal-800 to-blue-900">
                على مدار 24 ساعة
              </span>
            </h1>

            {/* Clear Formal Arabic Description */}
            <p className="text-lg sm:text-xl text-slate-700 leading-relaxed font-semibold max-w-2xl">
              المنصة التعليمية الأولى بالمملكة المغربية لمرافقة تلميذات وتلاميذ الباكالوريا والتعليم الإعدادي. شروحات منهجية مفصلة، حل التمارين المصورة خطوة بخطوة، ونماذج امتحانات وطنية مصححة بدقة.
            </p>

            {/* Track Selector with Large Readable Cards */}
            <div id="filieres" className="pt-2 space-y-3">
              <div className="text-sm font-black text-slate-700 flex items-center gap-2">
                <BookOpen size={18} className="text-emerald-800" />
                <span>اختر مستواك وشعبتك الدراسية لتخصيص الشروحات :</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {TRACKS.map((track) => {
                  const isSelected = track.id === selectedTrack;
                  return (
                    <button
                      key={track.id}
                      type="button"
                      onClick={() => onSelectTrack(track.id)}
                      className={`text-right p-4 rounded-2xl border transition-all ${
                        isSelected
                          ? "bg-gradient-to-br from-emerald-900 to-teal-950 text-white border-emerald-950 shadow-xl transform scale-[1.02]"
                          : "bg-white text-slate-800 border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/40 shadow-xs"
                      }`}
                    >
                      <div className="font-black text-sm sm:text-base leading-snug">{track.nameAr}</div>
                      <div className={`text-xs mt-1 font-sans ${isSelected ? "text-emerald-200" : "text-slate-500"}`}>
                        {track.name}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Track Subjects Strip */}
            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-wrap items-center justify-between gap-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-black text-emerald-950">المواد المتاحة :</span>
                <span className="text-emerald-900 font-semibold">{current.subjects.join(" · ")}</span>
              </div>
              <a
                href="#tuteur"
                className="text-emerald-900 hover:text-emerald-950 font-black inline-flex items-center gap-1.5 underline underline-offset-4"
              >
                <span>اطرح سؤالك على الأستاذ</span>
                <ArrowLeft size={16} />
              </a>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <a
                href="#tuteur"
                className="px-8 py-4 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-black text-base shadow-lg hover:shadow-xl transition-all flex items-center gap-3 transform hover:-translate-y-0.5"
              >
                <Sparkles size={20} className="text-emerald-300" />
                <span>ابدأ الشرح المباشر مجاناً</span>
              </a>
              <a
                href="#snap"
                className="px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-black text-base border-2 border-slate-300 shadow-xs transition-all flex items-center gap-2.5"
              >
                <span>📸 التقاط صورة لتمرين وحله</span>
              </a>
            </div>

            {/* Trust Highlights */}
            <div className="flex flex-wrap items-center gap-8 pt-4 text-sm text-slate-600 font-bold border-t border-slate-200">
              <div className="flex items-center gap-2 text-emerald-900">
                <CheckCircle2 size={18} className="text-emerald-700" />
                <span>شرح مبسط وممنهج بدون حفظ أعمى</span>
              </div>
              <div className="flex items-center gap-2 text-blue-900">
                <ShieldCheck size={18} className="text-blue-700" />
                <span>امتحانات الباكالوريا من 2010 إلى 2024</span>
              </div>
              <div className="flex items-center gap-2 text-amber-900">
                <Star size={18} className="fill-amber-500 text-amber-500" />
                <span>تقييم تفوق 4.9/5 لدى التلاميذ وأولياء الأمور</span>
              </div>
            </div>

          </div>

          {/* Classroom Visual Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Main Classroom Photography Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-950">
                <img
                  src="watermarked_img_11074505251821027519.jpg"
                  alt="قاعة درس مغربية حديثة في الدار البيضاء مع أستاذة وتلاميذ الباكالوريا"
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-emerald-300">بيئة تعليمية مغربية تفاعلية</div>
                      <div className="text-base font-black">التحضير المتفوق للامتحانات الإشهادية</div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-700 text-white font-extrabold text-xs backdrop-blur-xs">
                      الدار البيضاء 🇲🇦
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Pill: 24/7 Availability */}
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-200 hidden sm:block">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-black text-lg">
                    24h
                  </div>
                  <div>
                    <strong className="block text-sm text-slate-900 font-black">متاح في أي لحظة</strong>
                    <span className="text-xs text-slate-500 font-semibold">استفسر في أي ساعة طيلة أيام الأسبوع</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
