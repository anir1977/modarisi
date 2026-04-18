"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Calculator, Atom, FlaskConical, BookMarked, BookOpen,
  Landmark, Globe, ChevronDown, PlayCircle, Lock, Check,
  ChevronRight, BookOpen as BookOpenIcon, Sparkles,
} from "lucide-react";
import { CURRICULUM, LEVEL_LABELS, type Subject } from "@/lib/curriculum";
import { createClient } from "@/lib/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";

const SUBJECT_ICONS: Record<string, React.ElementType> = {
  maths: Calculator, pc: Atom, svt: FlaskConical,
  francais: BookMarked, arabe: BookOpen, islam: Landmark, hg: Globe,
};

export default function SubjectLevelPage() {
  const t = useTranslations("cours");
  const params = useParams<{ matiere: string; niveau: string }>();
  const { matiere, niveau } = params;

  const [openChapter, setOpenChapter] = useState<string | null>("1");
  const [plan, setPlan] = useState<string>("free");
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  const subjects = CURRICULUM[niveau] ?? [];
  const subject: Subject | undefined = subjects.find((s) => s.id === matiere);

  useEffect(() => {
    const supabase = createClient();
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [{ data: profile }, { data: progress }] = await Promise.all([
        supabase.from("profiles").select("plan").eq("id", user.id).single(),
        supabase.from("user_progress")
          .select("chapitre, lecon")
          .eq("user_id", user.id)
          .eq("matiere", matiere)
          .eq("niveau", niveau),
      ]);

      if (profile?.plan) setPlan(profile.plan);
      if (progress) {
        const ids = new Set(progress.map((r: { chapitre: string; lecon: string }) => `${r.chapitre}-${r.lecon}`));
        setCompletedLessons(ids);
      }
    }
    load();
  }, [matiere, niveau]);

  if (!subject) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-xl font-bold mb-2">Matière introuvable</p>
          <Link href="/cours" className="text-blue-400 hover:underline">← Retour aux cours</Link>
        </div>
      </div>
    );
  }

  const Icon = SUBJECT_ICONS[subject.id] ?? BookOpenIcon;
  const niveauLabel = LEVEL_LABELS[niveau] ?? niveau;
  const isPro = plan === "pro" || plan === "famille";

  const totalLessons = subject.chapters.reduce((a, c) => a + c.lessons.length, 0);
  const completedCount = completedLessons.size;
  const progressPct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      {/* Header */}
      <div className="relative overflow-hidden pt-24 pb-10 border-b border-white/5">
        <div className="absolute top-0 left-0 right-0 h-full" style={{ background: `radial-gradient(ellipse at 30% 50%, rgba(59,130,246,0.08) 0%, transparent 70%)` }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/cours" className="hover:text-white transition-colors">Cours</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-300">{subject.label}</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-400">{niveauLabel}</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${subject.gradient} flex items-center justify-center shadow-xl shrink-0`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-extrabold text-white mb-1">{subject.label}</h1>
              <p className="text-gray-400">{niveauLabel} · {subject.chapters.length} chapitres · {totalLessons} leçons</p>
            </div>
            {completedCount > 0 && (
              <div className="sm:text-right">
                <p className="text-emerald-400 font-bold text-lg">{progressPct}%</p>
                <p className="text-gray-500 text-sm">{completedCount}/{totalLessons} leçons</p>
              </div>
            )}
          </div>

          {/* Progress bar */}
          {completedCount > 0 && (
            <div className="mt-5 w-full bg-white/5 rounded-full h-1.5">
              <div
                className={`h-1.5 rounded-full bg-gradient-to-r ${subject.gradient} transition-all duration-500`}
                style={{ width: `${progressPct}%` }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Main content + Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Chapters accordion */}
          <div className="lg:col-span-2 space-y-3">
            {subject.chapters.map((chapter, ci) => {
              const isOpen = openChapter === chapter.id;
              const completedInChapter = chapter.lessons.filter(
                (l) => completedLessons.has(`${chapter.id}-${l.id}`)
              ).length;

              return (
                <div key={chapter.id} className="bg-white/3 border border-white/8 rounded-2xl overflow-hidden">
                  {/* Chapter header */}
                  <button
                    onClick={() => setOpenChapter(isOpen ? null : chapter.id)}
                    className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-white/5 transition-colors"
                  >
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${subject.gradient} flex items-center justify-center shrink-0 text-white font-bold text-sm`}>
                      {String(ci + 1).padStart(2, "0")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white text-sm leading-snug">{chapter.title}</p>
                      <p className="text-gray-500 text-xs mt-0.5">
                        {chapter.lessons.length} {t("lessons")}
                        {completedInChapter > 0 && (
                          <span className="text-emerald-400 ml-2">· {completedInChapter} ✓</span>
                        )}
                      </p>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* Lessons list */}
                  <div
                    style={{
                      maxHeight: isOpen ? `${chapter.lessons.length * 72}px` : "0px",
                      transition: "max-height 0.3s cubic-bezier(0.4,0,0.2,1)",
                      overflow: "hidden",
                    }}
                  >
                    <div className="border-t border-white/5">
                      {chapter.lessons.map((lesson, li) => {
                        const isCompleted = completedLessons.has(`${chapter.id}-${lesson.id}`);
                        const isLocked = !lesson.isFree && !isPro;

                        return (
                          <div key={lesson.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-white/3 transition-colors group">
                            {/* Status icon */}
                            <div className="shrink-0">
                              {isCompleted ? (
                                <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                </div>
                              ) : isLocked ? (
                                <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                  <Lock className="w-3.5 h-3.5 text-gray-600" />
                                </div>
                              ) : (
                                <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:border-blue-500/30 transition-colors">
                                  <PlayCircle className="w-3.5 h-3.5 text-gray-500 group-hover:text-blue-400 transition-colors" />
                                </div>
                              )}
                            </div>

                            {/* Lesson info */}
                            <div className="flex-1 min-w-0">
                              {isLocked ? (
                                <p className="text-sm text-gray-600 line-clamp-1">{lesson.title}</p>
                              ) : (
                                <Link
                                  href={`/cours/${matiere}/${niveau}/${chapter.id}/${lesson.id}`}
                                  className="text-sm text-gray-300 hover:text-white transition-colors line-clamp-1"
                                >
                                  {lesson.title}
                                </Link>
                              )}
                              <p className="text-xs text-gray-600 mt-0.5">{lesson.duration}</p>
                            </div>

                            {/* Badge */}
                            {isLocked ? (
                              <span className="shrink-0 inline-flex items-center gap-1 text-xs font-semibold text-amber-500 bg-amber-500/10 border border-amber-500/20 rounded-full px-2 py-0.5">
                                <Lock className="w-2.5 h-2.5" /> Pro
                              </span>
                            ) : lesson.isFree && li === 0 ? (
                              <span className="shrink-0 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-0.5">
                                {t("free_badge")}
                              </span>
                            ) : isCompleted ? (
                              <span className="shrink-0 text-xs font-semibold text-emerald-400">✓</span>
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sidebar */}
          <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            {/* Progress card */}
            <div className="bg-white/3 border border-white/8 rounded-2xl p-5">
              <h3 className="text-white font-semibold mb-4 text-sm">{t("progression")}</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">{completedCount}/{totalLessons} leçons</span>
                <span className={`font-bold text-lg ${progressPct > 0 ? "text-emerald-400" : "text-gray-600"}`}>
                  {progressPct}%
                </span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2 mb-4">
                <div
                  className={`h-2 rounded-full bg-gradient-to-r ${subject.gradient} transition-all duration-500`}
                  style={{ width: `${Math.max(progressPct, progressPct > 0 ? 2 : 0)}%` }}
                />
              </div>
              {!isPro && (
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-xs text-amber-400">
                  <Lock className="w-3.5 h-3.5 inline mr-1" />
                  {t("unlock_pro")}
                  <Link href="/pricing" className="block mt-2 font-semibold underline">
                    {t("upgrade_btn")}
                  </Link>
                </div>
              )}
            </div>

            {/* Ask Nour */}
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/10 border border-blue-500/20 rounded-2xl p-5">
              <div className="text-2xl mb-2">🎓</div>
              <h3 className="text-white font-semibold mb-1 text-sm">{t("ask_nour_title")}</h3>
              <p className="text-gray-400 text-xs mb-4">{t("ask_nour_desc")}</p>
              <Link
                href={`/chat?subject=${encodeURIComponent(subject.label)}&level=${niveau}`}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all w-full justify-center"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {t("ask_nour_btn")}
              </Link>
            </div>

            {/* Exercises */}
            <div className="bg-gradient-to-br from-emerald-900/20 to-emerald-900/5 border border-emerald-500/15 rounded-2xl p-5">
              <div className="text-2xl mb-2">📝</div>
              <h3 className="text-white font-semibold mb-1 text-sm">{t("exercises_title")}</h3>
              <p className="text-gray-400 text-xs mb-4">{t("exercises_desc")}</p>
              <Link
                href={`/tashih?matiere=${encodeURIComponent(subject.label)}`}
                className="inline-flex items-center gap-2 bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/30 text-emerald-300 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all w-full justify-center"
              >
                {t("exercises_btn")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
