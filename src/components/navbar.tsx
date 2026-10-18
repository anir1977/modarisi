"use client";
import Link from "next/link";
import { GraduationCap, Sparkles, BookOpen, Camera, Award, ArrowLeft } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Title */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-800 to-teal-900 text-white flex items-center justify-center font-bold text-2xl shadow-md group-hover:scale-105 transition-transform">
            <GraduationCap size={28} className="text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-2xl sm:text-3xl tracking-tight text-slate-900">مدرسي</span>
              <span className="text-emerald-700 font-black text-xl sm:text-2xl font-sans tracking-tight">modarisi.ma</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-extrabold border border-emerald-200">
                المغرب 🇲🇦
              </span>
            </div>
            <p className="text-xs text-slate-500 font-semibold mt-0.5 hidden sm:block">
              المنصة التعليمية الأولى للتحضير للباكالوريا والمقرر المغربي
            </p>
          </div>
        </Link>

        {/* Navigation Links in Pure Arabic with Large Readable Text */}
        <nav className="hidden lg:flex items-center gap-2 text-base font-bold text-slate-700">
          <a href="#filieres" className="px-4 py-2.5 rounded-xl hover:bg-slate-100 hover:text-emerald-800 transition-colors flex items-center gap-2">
            <BookOpen size={18} className="text-emerald-700" />
            الشعب الدراسية
          </a>
          <a href="#tuteur" className="px-4 py-2.5 rounded-xl hover:bg-slate-100 hover:text-emerald-800 transition-colors flex items-center gap-2">
            <Sparkles size={18} className="text-emerald-700" />
            الأستاذ الذكي
          </a>
          <a href="#snap" className="px-4 py-2.5 rounded-xl hover:bg-slate-100 hover:text-emerald-800 transition-colors flex items-center gap-2">
            <Camera size={18} className="text-teal-700" />
            حل التمارين بالصور
          </a>
          <a href="#examens" className="px-4 py-2.5 rounded-xl hover:bg-slate-100 hover:text-emerald-800 transition-colors flex items-center gap-2">
            <Award size={18} className="text-blue-700" />
            الامتحانات الوطنية
          </a>
          <a href="#tarifs" className="px-4 py-2.5 rounded-xl hover:bg-slate-100 hover:text-emerald-800 transition-colors text-amber-800 font-extrabold">
            باقات الاشتراك
          </a>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <a
            href="#tuteur"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-800 to-teal-900 text-white font-extrabold text-sm sm:text-base shadow-md hover:shadow-lg hover:from-emerald-900 hover:to-teal-950 transition-all transform hover:-translate-y-0.5"
          >
            <Sparkles size={18} className="text-emerald-300" />
            <span>ابدأ الآن مجاناً</span>
            <ArrowLeft size={16} className="hidden sm:inline" />
          </a>
        </div>

      </div>
    </header>
  );
}
