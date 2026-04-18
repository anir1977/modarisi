"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Calculator, Atom, FlaskConical, BookMarked,
  BookOpen, Landmark, Globe, ChevronRight, GraduationCap, Sparkles,
} from "lucide-react";
import { CURRICULUM, LEVELS } from "@/lib/curriculum";
import { createClient } from "@/lib/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslations, useLocale } from "next-intl";

const SUBJECT_ICONS: Record<string, React.ElementType> = {
  maths: Calculator,
  pc: Atom,
  svt: FlaskConical,
  francais: BookMarked,
  arabe: BookOpen,
  islam: Landmark,
  hg: Globe,
};

export default function CoursPage() {
  const t      = useTranslations("cours");
  const locale = useLocale();
  const isAr   = locale === "ar";

  const [activeLevel, setActiveLevel] = useState("1ere");
  const [userNiveau, setUserNiveau] = useState<string | null>(null);
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [isGuest, setIsGuest] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setIsGuest(true); return; }

      // Load child level to pre-select
      const { data: child } = await supabase
        .from("children")
        .select("level")
        .eq("parent_id", user.id)
        .single();

      if (child?.level) {
        setActiveLevel(child.level);
        setUserNiveau(child.level);
      }

      // Load progress counts per matiere for the active level
      const { data: prog } = await supabase
        .from("user_progress")
        .select("matiere, niveau")
        .eq("user_id", user.id);

      if (prog) {
        const counts: Record<string, number> = {};
        for (const row of prog) {
          const key = `${row.niveau}-${row.matiere}`;
          counts[key] = (counts[key] ?? 0) + 1;
        }
        setProgress(counts);
      }
    }
    loadData();
  }, []);

  const subjects = CURRICULUM[activeLevel] ?? [];

  function getProgressPct(matiereId: string, niveau: string) {
    const key = `${niveau}-${matiereId}`;
    const completed = progress[key] ?? 0;
    const subject = subjects.find((s) => s.id === matiereId);
    const total = subject?.chapters.reduce((acc, ch) => acc + ch.lessons.length, 0) ?? 0;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      {/* Hero */}
      <div className="relative overflow-hidden pt-24 pb-16">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-600/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 text-blue-400 text-xs font-semibold mb-5">
            <GraduationCap className="w-3.5 h-3.5" />
            {t("badge")}
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
            {t("title")}{" "}
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              {t("title_highlight")}
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-2">
            {t("subtitle")}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Level tabs */}
        <div className="flex gap-2 mb-10 bg-white/3 border border-white/8 rounded-2xl p-1.5 w-fit mx-auto">
          {LEVELS.map((level) => (
            <button
              key={level.id}
              onClick={() => setActiveLevel(level.id)}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeLevel === level.id
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-900/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {level.label}
            </button>
          ))}
        </div>

        {/* Subject grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {subjects.map((subject) => {
            const Icon = SUBJECT_ICONS[subject.id] ?? BookOpen;
            const pct = getProgressPct(subject.id, activeLevel);
            const totalLessons = subject.chapters.reduce((a, c) => a + c.lessons.length, 0);

            return (
              <Link
                key={subject.id}
                href={`/cours/${subject.id}/${activeLevel}`}
                className="group relative bg-white/3 border border-white/8 rounded-2xl p-6 overflow-hidden hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 hover:shadow-xl flex flex-col"
              >
                {/* Top gradient line */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${subject.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Icon */}
                <div className={`w-13 h-13 w-12 h-12 rounded-xl bg-gradient-to-br ${subject.gradient} flex items-center justify-center mb-4 shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Name */}
                <h3 className="font-bold text-white text-base mb-0.5 group-hover:text-white transition-colors">
                  {subject.label}
                </h3>
                <p className="text-gray-600 text-xs mb-4">{subject.labelAr}</p>

                {/* Stats */}
                <div className="flex items-center gap-3 mb-4 text-xs text-gray-500">
                  <span>{subject.chapters.length} {t("chapters")}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-700" />
                  <span>{totalLessons} {t("lessons")}</span>
                </div>

                {/* Progress */}
                {pct > 0 ? (
                  <div className="mt-auto">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-gray-500">{t("progression")}</span>
                      <span className="text-emerald-400 font-semibold">{pct}%</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full bg-gradient-to-r ${subject.gradient} transition-all duration-500`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="mt-auto">
                    <span className="inline-flex items-center gap-1 text-xs text-gray-600">
                      <Sparkles className="w-3 h-3 text-blue-500" />
                      {t("start")}
                    </span>
                  </div>
                )}

                {/* Arrow */}
                <ChevronRight className="absolute top-6 right-5 w-4 h-4 text-gray-700 group-hover:text-gray-400 transition-colors" />
              </Link>
            );
          })}
        </div>

        {/* Info banner */}
        <div className="mt-12 bg-gradient-to-r from-blue-900/20 to-emerald-900/10 border border-blue-500/15 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center shrink-0 text-xl">
            🎓
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="text-white font-semibold mb-1">{t("ask_nour_title")}</p>
            <p className="text-gray-400 text-sm">{t("ask_nour_desc")}</p>
          </div>
          <Link
            href="/chat"
            className="shrink-0 inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold px-6 py-2.5 rounded-xl text-sm hover:from-blue-500 hover:to-emerald-500 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            {t("ask_nour_btn")}
          </Link>
        </div>
      </div>

      <Footer />

      {/* ── Guest sticky CTA ── */}
      {isGuest && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-900/95 to-emerald-900/95 backdrop-blur-xl border-t border-white/10 px-4 py-3 sm:py-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <p className="text-white font-semibold text-sm">🎓 Tu aimes ce que tu vois ?</p>
              <p className="text-gray-300 text-xs">Inscris-toi gratuitement — 5 questions offertes, sans carte bancaire</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/auth/login"
                className="px-4 py-2 text-sm font-semibold text-white/80 hover:text-white border border-white/20 rounded-xl transition-colors"
              >
                Se connecter
              </Link>
              <Link
                href="/auth/register"
                className="px-5 py-2 text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-400 hover:to-emerald-400 rounded-xl shadow-lg transition-all"
              >
                Commencer gratuitement →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
