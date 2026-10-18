"use client";
import Link from "next/link";
import { GraduationCap, Sparkles, BookOpen, Camera, Award, ArrowLeft, FileText, CheckCircle2 } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      {/* Top Ministry Bar */}
      <div className="bg-slate-900 text-slate-300 text-[11px] sm:text-xs py-1.5 px-4 sm:px-6 lg:px-8 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-white">المقرر الرسمي لوزارة التربية الوطنية والتعليم الأولي والرياضة 🇲🇦</span>
          <span className="hidden md:inline text-slate-400">· الأطر المرجعية المحينة 2024-2025</span>
        </div>
        <div className="flex items-center gap-4 font-semibold text-emerald-400">
          <span>الدار البيضاء · الرباط · مراكش · فاس · طنجة</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Institutional Title */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-800 to-teal-950 text-white flex items-center justify-center font-bold text-2xl shadow-md group-hover:scale-105 transition-transform border border-emerald-600/30">
            <GraduationCap size={28} className="text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-2xl sm:text-3xl tracking-tight text-slate-950">مدرسي</span>
              <span className="text-emerald-700 font-black text-lg sm:text-xl font-sans tracking-tight">modarisi.ma</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-900 font-extrabold border border-emerald-200">
                منصة وطنية 🇲🇦
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-semibold mt-0.5 hidden sm:block">
              المنصة الأكاديمية المغربية للتحضير المتفوق للباكالوريا
            </p>
          </div>
        </Link>

        {/* Navigation Links with accredited references and curriculum */}
        <nav className="hidden lg:flex items-center gap-1.5 text-sm font-bold text-slate-700">
          <a
            href="#maraji3"
            className="px-3.5 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-900 transition-colors flex items-center gap-1.5 text-emerald-900 bg-emerald-50/50"
          >
            <BookOpen size={16} className="text-emerald-700" />
            المراجع المعتمدة
          </a>
          <a
            href="#filieres"
            className="px-3.5 py-2 rounded-xl hover:bg-slate-100 hover:text-emerald-800 transition-colors flex items-center gap-1.5"
          >
            <FileText size={16} className="text-slate-600" />
            الشعب والمسالك
          </a>
          <a
            href="#tuteur"
            className="px-3.5 py-2 rounded-xl hover:bg-slate-100 hover:text-emerald-800 transition-colors flex items-center gap-1.5"
          >
            <Sparkles size={16} className="text-emerald-700" />
            الأستاذ الافتراضي
          </a>
          <a
            href="#snap"
            className="px-3.5 py-2 rounded-xl hover:bg-slate-100 hover:text-emerald-800 transition-colors flex items-center gap-1.5"
          >
            <Camera size={16} className="text-teal-700" />
            مختبر التمارين المصورة
          </a>
          <a
            href="#examens"
            className="px-3.5 py-2 rounded-xl hover:bg-slate-100 hover:text-emerald-800 transition-colors flex items-center gap-1.5"
          >
            <Award size={16} className="text-blue-700" />
            الامتحانات الوطنية
          </a>
          <a
            href="#tarifs"
            className="px-3.5 py-2 rounded-xl hover:bg-slate-100 hover:text-emerald-800 transition-colors text-amber-900 font-extrabold"
          >
            الباقات
          </a>
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3">
          <a
            href="#tuteur"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            <Sparkles size={16} className="text-emerald-300" />
            <span>ابدأ المراجعة الآن</span>
            <ArrowLeft size={14} className="hidden sm:inline" />
          </a>
        </div>

      </div>
    </header>
  );
}
