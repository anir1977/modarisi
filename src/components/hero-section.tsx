"use client";
import { useState } from "react";
import Image from "next/image";
import { TRACKS } from "@/lib/curriculum";
import { Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Zap, BookOpen, Star } from "lucide-react";

export function HeroSection({
  selectedTrack,
  onSelectTrack,
}: {
  selectedTrack: string;
  onSelectTrack: (trackId: string) => void;
}) {
  const current = TRACKS.find((t) => t.id === selectedTrack) || TRACKS[0];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      <div className="hero-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left / Main Text Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* National Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-wide shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>مطابق 100% لمقرر وزارة التربية الوطنية (منظومة مسار) 🇲🇦</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              أستاذك الخصوصي بالذكاء الاصطناعي{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-teal-700 to-blue-800">
                24/24 ساعة
              </span>
            </h1>

            {/* Sub-headline bilingual */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
              المنصة التعليمية الأولى فـ المغرب لي كتشرح ليك دروسك وتمارينك خطوة بخطوة بالدارجة والفرنسية. صور أي تمرين من الدفتر، ووجد للامتحان الوطني والجهوي مع تصحيح رسمي دقيق.
            </p>

            {/* Interactive Track Selector */}
            <div className="pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                <BookOpen size={14} className="text-emerald-700" />
                <span>اختر شعبتك ومستواك الدراسي :</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {TRACKS.map((track) => {
                  const isSelected = track.id === selectedTrack;
                  return (
                    <button
                      key={track.id}
                      type="button"
                      onClick={() => onSelectTrack(track.id)}
                      className={`text-right p-3 rounded-xl border text-xs font-bold transition-all ${
                        isSelected
                          ? "bg-emerald-900 text-white border-emerald-950 shadow-md transform scale-[1.02]"
                          : "bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50"
                      }`}
                    >
                      <div className="font-extrabold truncate">{track.nameAr}</div>
                      <div className={`text-[10px] mt-0.5 truncate ${isSelected ? "text-emerald-200" : "text-slate-500"}`}>
                        {track.name}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Track Details Preview */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900">المواد المشمولة:</span>
                <span className="text-slate-600">{current.subjects.join(" · ")}</span>
              </div>
              <a
                href="#tuteur"
                className="text-emerald-800 hover:text-emerald-900 font-bold inline-flex items-center gap-1"
              >
                اطرح سؤالك على الأستاذ الآن ←
              </a>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#tuteur"
                className="px-6 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2.5"
              >
                <Sparkles size={18} className="text-emerald-300" />
                <span>ابدأ الشرح المباشر (مجاناً)</span>
              </a>
              <a
                href="#snap"
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-200 shadow-sm transition-all flex items-center gap-2"
              >
                <span>📸 صور تمرينك وافهم الحل</span>
              </a>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-6 pt-3 text-xs text-slate-500 font-semibold border-t border-slate-200">
              <div className="flex items-center gap-1.5 text-emerald-800">
                <CheckCircle2 size={16} />
                <span>شرح مبسط بدون حفظ أعمى</span>
              </div>
              <div className="flex items-center gap-1.5 text-blue-800">
                <ShieldCheck size={16} />
                <span>امتحانات الباك من 2010 إلى 2024</span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-800 hidden sm:flex">
                <Star size={16} className="fill-amber-500 text-amber-500" />
                <span>تقييم 4.9/5 عند التلاميذ</span>
              </div>
            </div>

          </div>

          {/* Right Column / Hero Visual Graphic */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Classroom Visual Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900">
                <img
                  src="watermarked_img_11074505251821027519.jpg"
                  alt="قاعة درس مغربية حديثة في الدار البيضاء مع أستاذة وتلاميذ الباكالوريا"
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                />

                {/* Overlay Badge Bottom */}
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-emerald-300">قسم مغربي تفاعلي</div>
                      <div className="text-sm font-extrabold">التحضير للامتحان الوطني والجهوي</div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-700/80 text-white font-bold text-[10px] backdrop-blur-xs">
                      Casablanca 🇲🇦
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Interactive Card 1: Math Solution */}
              <div className="absolute -top-6 -left-6 bg-white p-3.5 rounded-xl shadow-xl border border-slate-100 max-w-[210px] hidden sm:block animate-bounce-subtle">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                    f&apos;(x)
                  </div>
                  <strong className="text-xs text-slate-800">حساب المشتقة</strong>
                </div>
                <p className="text-[10px] text-slate-600 leading-tight">
                  &quot;Rappel : (e^u)&apos; = u&apos; · e^u. الحل خطوة بخطوة بالتعليل.&quot;
                </p>
                <div className="mt-1 text-[9px] text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 size={10} /> تصحيح معتمد
                </div>
              </div>

              {/* Floating Interactive Card 2: 24/7 Availability */}
              <div className="absolute -bottom-6 -right-6 bg-white p-3.5 rounded-xl shadow-xl border border-slate-100 hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-800 text-white flex items-center justify-center font-black text-sm">
                    24h
                  </div>
                  <div>
                    <strong className="block text-xs text-slate-900">سول فـ أي وقت</strong>
                    <span className="text-[10px] text-slate-500">حتى فـ 12 دالليل قبل الامتحان</span>
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
