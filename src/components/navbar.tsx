"use client";
import Link from "next/link";
import { GraduationCap, Sparkles, BookOpen, Camera, Award, ArrowUpRight } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-800 to-teal-900 text-white flex items-center justify-center font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
            <GraduationCap size={24} className="text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-2xl tracking-tight text-slate-900">modarisi</span>
              <span className="text-emerald-700 font-extrabold text-2xl">.ma</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200 ml-1">
                مدرسي 🇲🇦
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium -mt-1 hidden sm:block">
              المنصة الذكية للتعليم والدعم المدرسي فـ المغرب
            </p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-semibold text-slate-600">
          <a href="#filieres" className="px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors flex items-center gap-1.5">
            <BookOpen size={16} className="text-emerald-600" />
            الشعب والمقررات
          </a>
          <a href="#tuteur" className="px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors flex items-center gap-1.5">
            <Sparkles size={16} className="text-emerald-600" />
            الأستاذ الذكي
          </a>
          <a href="#snap" className="px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors flex items-center gap-1.5">
            <Camera size={16} className="text-teal-600" />
            صور وحل (Snap)
          </a>
          <a href="#examens" className="px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors flex items-center gap-1.5">
            <Award size={16} className="text-blue-600" />
            امتحانات وطنية
          </a>
          <a href="#tarifs" className="px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors text-amber-700 font-bold">
            الاشتراكات VIP
          </a>
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3">
          <a
            href="#tuteur"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-800 to-teal-900 text-white font-bold text-sm shadow-md hover:shadow-lg hover:from-emerald-900 hover:to-teal-950 transition-all transform hover:-translate-y-0.5"
          >
            <Sparkles size={16} className="text-emerald-300" />
            <span>جرب مجاناً</span>
            <ArrowUpRight size={14} className="hidden sm:inline" />
          </a>
        </div>
      </div>
    </header>
  );
}
