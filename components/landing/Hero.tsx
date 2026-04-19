"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Shield, CheckCircle, Star, BookOpen, Brain } from "lucide-react";
import { useTranslations } from "next-intl";

function useCountUp(target: number, duration = 1500, started: boolean = false) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
  const [count, setCount] = useState(isMobile ? target : 0);
  useEffect(() => {
    if (isMobile) { setCount(target); return; }
    if (!started) return;
    let start = 0;
    const step = target / (duration / 32);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 30);
    return () => clearInterval(timer);
  }, [target, duration, started, isMobile]);
  return count;
}

function StatItem({ value, suffix, label, started }: { value: number; suffix: string; label: string; started: boolean }) {
  const count = useCountUp(value, 1200, started);
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 tabular-nums">
        {count.toLocaleString()}{suffix}
      </span>
      <span className="text-gray-500 text-sm font-medium">{label}</span>
    </div>
  );
}

/* ── Floating card: AI chat preview ─────────────────────────────────────────── */
function FloatingChatCard() {
  return (
    <div
      className="absolute -left-6 lg:-left-10 top-[22%] bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 w-52 z-20"
      style={{ animation: "float 4s ease-in-out infinite" }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center shrink-0">
          <span className="text-sm">🎓</span>
        </div>
        <div className="flex-1">
          <p className="text-xs font-bold text-gray-900 leading-none">Nour AI</p>
          <p className="text-[10px] text-emerald-500 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block animate-pulse" />
            En ligne
          </p>
        </div>
      </div>
      <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-xl p-3 border border-blue-100">
        <p className="text-xs text-gray-500 mb-1">F = m × a</p>
        <p className="text-sm font-bold text-gray-900">F = 1000 × 2</p>
        <p className="text-sm font-black text-emerald-600">= 2000 N ✅</p>
      </div>
    </div>
  );
}

/* ── Floating card: rating ──────────────────────────────────────────────────── */
function FloatingRatingCard() {
  return (
    <div
      className="absolute -right-4 lg:-right-8 bottom-[20%] bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-20"
      style={{ animation: "float 5s ease-in-out infinite 1s" }}
    >
      <div className="flex gap-0.5 mb-2">
        {[1,2,3,4,5].map(i => (
          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="text-3xl font-black text-gray-900 leading-none">5000+</p>
      <p className="text-xs text-gray-500 mt-1">تلميذ يثق بنور</p>
      <p className="text-xs text-gray-400">élèves font confiance</p>
    </div>
  );
}

/* ── Floating card: subject badge ───────────────────────────────────────────── */
function FloatingSubjectCard() {
  return (
    <div
      className="absolute right-4 top-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white p-3 z-20"
      style={{ animation: "float 6s ease-in-out infinite 2s" }}
    >
      <div className="flex items-center gap-2 mb-1">
        <Brain className="w-4 h-4 text-violet-500" />
        <p className="text-xs font-bold text-gray-900">7 مواد دراسية</p>
      </div>
      <p className="text-[10px] text-gray-500">1ère · 2ème · 3ème collège</p>
    </div>
  );
}

export default function Hero() {
  const t = useTranslations("hero");
  const tCta = useTranslations("cta");
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsStarted, setStatsStarted] = useState(false);

  const STATS = [
    { value: 5000, suffix: "+", label: t("stat_students") },
    { value: 150,  suffix: "K+", label: t("stat_questions") },
    { value: 7,    suffix: "", label: t("stat_subjects") },
    { value: 24,   suffix: "/7", label: t("stat_available") },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsStarted(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden min-h-screen flex flex-col bg-white">

      {/* ── CSS Animations ────────────────────────────────────────────────────── */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.7s ease-out both; }
        .fade-up-1 { animation-delay: 0.1s; }
        .fade-up-2 { animation-delay: 0.25s; }
        .fade-up-3 { animation-delay: 0.4s; }
        .fade-up-4 { animation-delay: 0.55s; }
      `}</style>

      {/* ── Background gradient ───────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-bl from-blue-100/70 via-violet-50/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-emerald-100/50 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-radial from-blue-50/40 to-transparent hidden lg:block" />
      </div>

      <div className="pt-20" />

      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* ── LEFT: Text content ──────────────────────────────────────────── */}
            <div className="order-2 lg:order-1">

              {/* Badges */}
              <div className="fade-up fade-up-1 flex flex-wrap gap-2 mb-8">
                <span className="inline-flex items-center gap-2 bg-white border border-gray-200 shadow-sm rounded-full px-4 py-2 text-gray-600 text-sm font-medium">
                  <Shield className="w-4 h-4 text-blue-500" />
                  {t("badge")}
                </span>
                <span className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-2 text-emerald-700 text-sm font-bold">
                  <Sparkles className="w-4 h-4" />
                  100% مجاني · Gratuit 🎉
                </span>
              </div>

              {/* Main heading — BIG */}
              <h1 className="fade-up fade-up-2 text-5xl sm:text-6xl lg:text-6xl xl:text-7xl font-black text-gray-900 leading-[1.05] tracking-tight mb-6">
                {t("title_line1")}{" "}
                <span className="bg-gradient-to-r from-blue-600 via-violet-500 to-emerald-500 bg-clip-text text-transparent">
                  {t("title_highlight")}
                </span>
                <br />
                <span className="text-gray-500 font-bold text-3xl sm:text-4xl lg:text-4xl">
                  {t("title_line2")} 🇲🇦
                </span>
              </h1>

              {/* Subtitle */}
              <p className="fade-up fade-up-2 text-xl text-gray-600 leading-relaxed mb-8 max-w-lg">
                {t("subtitle")}
              </p>

              {/* Subject pills */}
              <div className="fade-up fade-up-3 flex flex-wrap gap-2 mb-10">
                {[
                  { label: "Maths",        emoji: "📐" },
                  { label: "Physique",     emoji: "⚗️" },
                  { label: "SVT",          emoji: "🔬" },
                  { label: "Français",     emoji: "📖" },
                  { label: "Arabe",        emoji: "✍️" },
                  { label: "Histoire-Géo", emoji: "🌍" },
                  { label: "Islam",        emoji: "🕌" },
                ].map((s) => (
                  <span
                    key={s.label}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 font-medium hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-all cursor-default shadow-sm"
                  >
                    <span>{s.emoji}</span> {s.label}
                  </span>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="fade-up fade-up-3 flex flex-col sm:flex-row gap-4 mb-10">
                <Link
                  href="/auth/register"
                  className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-blue-200/60 transition-all text-lg hover:scale-[1.02] active:scale-[0.98]"
                >
                  {t("cta_primary")}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/cours"
                  className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 font-semibold px-8 py-4 rounded-2xl transition-all text-lg shadow-sm"
                >
                  <BookOpen className="w-5 h-5 text-blue-500" />
                  {t("cta_secondary")}
                </Link>
              </div>

              {/* Guarantees */}
              <div className="fade-up fade-up-4 flex flex-wrap gap-x-6 gap-y-2">
                {[tCta("guarantee_1"), tCta("guarantee_2"), tCta("guarantee_3")].map((g) => (
                  <span key={g} className="flex items-center gap-2 text-gray-500 text-base">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                    {g}
                  </span>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Photo + floating 3D cards ─────────────────────────────── */}
            <div className="order-1 lg:order-2 relative flex items-center justify-center">

              {/* Glow behind photo */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200/40 via-violet-100/30 to-emerald-200/40 rounded-3xl blur-3xl scale-95 pointer-events-none" />

              {/* Main photo */}
              <div className="relative w-full max-w-lg mx-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&h=780&fit=crop&crop=faces&q=85"
                  alt="Élèves marocains étudiant avec Modarisi AI"
                  className="w-full rounded-3xl shadow-2xl shadow-blue-200/50 object-cover"
                  style={{ maxHeight: "560px" }}
                />

                {/* Dark gradient overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent rounded-b-3xl" />

                {/* Floating: AI chat card */}
                <FloatingChatCard />

                {/* Floating: Rating/count card */}
                <FloatingRatingCard />

                {/* Floating: Subject info */}
                <FloatingSubjectCard />

                {/* Decoration: colored ring around photo */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-blue-400/20 via-violet-300/10 to-emerald-400/20 -z-10" />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Stats bar ─────────────────────────────────────────────────────────── */}
      <div ref={statsRef} className="relative z-10 border-t border-gray-100 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-0 sm:divide-x sm:divide-gray-100">
            {STATS.map((stat) => (
              <StatItem key={stat.label} {...stat} started={statsStarted} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
