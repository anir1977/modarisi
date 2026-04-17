"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronRight, ChevronLeft, BookOpen, Sparkles, CheckCircle,
  Lock, Target, Lightbulb, BookMarked, MessageCircle, FileText,
  Calculator, Atom, FlaskConical, Globe, Landmark,
} from "lucide-react";
import {
  CURRICULUM, LEVEL_LABELS, getSubject, getChapter, getLesson,
  type Subject, type Chapter, type Lesson,
} from "@/lib/curriculum";
import { createClient } from "@/lib/supabase/client";
import Navbar from "@/components/Navbar";

const SUBJECT_ICONS: Record<string, React.ElementType> = {
  maths: Calculator, pc: Atom, svt: FlaskConical,
  francais: BookMarked, arabe: BookOpen, islam: Landmark, hg: Globe,
};

// ── Types ─────────────────────────────────────────────────────────────────────

type LessonContent = {
  objectives: string[];
  introduction: string;
  sections: { title: string; content: string; formula: string | null }[];
  examples: { problem: string; steps: string[]; answer: string }[];
  keyPoints: string[];
  vocabulary: { term: string; definition: string }[];
};

// ── Content Loader ────────────────────────────────────────────────────────────

function useLesson(matiere: string, niveau: string, chapitre: string, lecon: string) {
  const [content, setContent] = useState<LessonContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setContent(null);

    fetch("/api/cours/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ matiere, niveau, chapitre, lecon }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setContent(data.content as LessonContent);
      })
      .catch((e) => setError(e.message ?? "Erreur inconnue"))
      .finally(() => setLoading(false));
  }, [matiere, niveau, chapitre, lecon]);

  return { content, loading, error };
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function LessonPage() {
  const params = useParams<{ matiere: string; niveau: string; chapitre: string; lecon: string }>();
  const { matiere, niveau, chapitre, lecon } = params;
  const router = useRouter();

  const [plan, setPlan] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [markingDone, setMarkingDone] = useState(false);

  const subject = getSubject(niveau, matiere);
  const chapter = getChapter(niveau, matiere, chapitre);
  const lessonMeta = getLesson(niveau, matiere, chapitre, lecon);
  const { content, loading, error } = useLesson(matiere, niveau, chapitre, lecon);

  // Auth check and progress fetch
  useEffect(() => {
    const supabase = createClient();
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [{ data: profile }, { data: prog }] = await Promise.all([
        supabase.from("profiles").select("plan").eq("id", user.id).single(),
        supabase.from("user_progress")
          .select("id")
          .eq("user_id", user.id)
          .eq("matiere", matiere)
          .eq("niveau", niveau)
          .eq("chapitre", chapitre)
          .eq("lecon", lecon)
          .maybeSingle(),
      ]);

      if (profile?.plan) setPlan(profile.plan);
      if (prog) setCompleted(true);
    }
    load();
  }, [matiere, niveau, chapitre, lecon]);

  const markCompleted = useCallback(async () => {
    if (completed || markingDone) return;
    setMarkingDone(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setMarkingDone(false); return; }

    await supabase.from("user_progress").upsert({
      user_id: user.id,
      matiere,
      niveau,
      chapitre,
      lecon,
    }, { onConflict: "user_id,matiere,niveau,chapitre,lecon" });

    setCompleted(true);
    setMarkingDone(false);
  }, [completed, markingDone, matiere, niveau, chapitre, lecon]);

  if (!subject || !chapter || !lessonMeta) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-xl font-bold mb-2">Leçon introuvable</p>
          <Link href="/cours" className="text-blue-400 hover:underline">← Retour aux cours</Link>
        </div>
      </div>
    );
  }

  const isPro = plan === "pro" || plan === "famille";
  const isLocked = !lessonMeta.isFree && !isPro;

  // Navigation between lessons
  const chapterIdx = parseInt(chapitre) - 1;
  const lessonIdx = parseInt(lecon) - 1;
  const prevLesson = lessonIdx > 0
    ? { chapitre, lecon: String(lessonIdx) }
    : chapterIdx > 0
    ? (() => {
        const prevCh = subject.chapters[chapterIdx - 1];
        return { chapitre: prevCh.id, lecon: prevCh.lessons[prevCh.lessons.length - 1].id };
      })()
    : null;
  const nextLesson = lessonIdx < chapter.lessons.length - 1
    ? { chapitre, lecon: String(lessonIdx + 2) }
    : chapterIdx < subject.chapters.length - 1
    ? { chapitre: subject.chapters[chapterIdx + 1].id, lecon: "1" }
    : null;

  const niveauLabel = LEVEL_LABELS[niveau] ?? niveau;
  const Icon = SUBJECT_ICONS[subject.id] ?? BookOpen;

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-8 flex-wrap">
          <Link href="/cours" className="hover:text-white transition-colors">Cours</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/cours/${matiere}/${niveau}`} className="hover:text-white transition-colors">{subject.label}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-400">{chapter.title}</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-300">{lessonMeta.title}</span>
        </nav>

        <div className="grid lg:grid-cols-[1fr_300px] gap-8">
          {/* ── Main content ── */}
          <div>
            {/* Lesson header */}
            <div className="mb-8">
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${subject.gradient} flex items-center justify-center shadow-lg shrink-0`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-500 text-xs mb-1">{niveauLabel} · {subject.label} · Ch. {chapitre}</p>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">{lessonMeta.title}</h1>
                  <p className="text-gray-500 text-sm mt-1">{lessonMeta.duration}</p>
                </div>
                {completed && (
                  <div className="flex items-center gap-1.5 text-emerald-400 text-sm font-semibold bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1.5 shrink-0">
                    <CheckCircle className="w-4 h-4" />
                    Complétée
                  </div>
                )}
              </div>

              {/* Chapter progress bar */}
              <div className="bg-white/3 border border-white/8 rounded-xl p-3 flex items-center gap-3">
                <span className="text-gray-500 text-xs shrink-0">Chapitre {chapitre}/{subject.chapters.length}</span>
                <div className="flex-1 flex gap-1">
                  {subject.chapters.map((ch, i) => (
                    <div
                      key={ch.id}
                      className={`h-1.5 rounded-full flex-1 transition-all ${
                        i < chapterIdx ? `bg-gradient-to-r ${subject.gradient}`
                        : i === chapterIdx ? "bg-blue-400"
                        : "bg-white/10"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-500 text-xs shrink-0">
                  Leçon {lecon}/{chapter.lessons.length}
                </span>
              </div>
            </div>

            {/* Locked state */}
            {isLocked ? (
              <div className="bg-white/3 border border-white/8 rounded-2xl p-12 text-center">
                <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-amber-500" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Leçon Pro</h2>
                <p className="text-gray-400 mb-6 max-w-sm mx-auto">
                  Cette leçon est disponible avec le Plan Pro. Débloquez toutes les leçons pour 99 DH/mois.
                </p>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg shadow-blue-900/30 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  Passer au Plan Pro — 99 DH/mois
                </Link>
                <p className="text-gray-600 text-xs mt-3">3.30 DH/jour · Annulable à tout moment</p>
              </div>
            ) : loading ? (
              /* Loading skeleton */
              <div className="space-y-4">
                <div className="h-32 bg-white/3 border border-white/5 rounded-2xl animate-pulse" />
                <div className="h-48 bg-white/3 border border-white/5 rounded-2xl animate-pulse" />
                <div className="h-48 bg-white/3 border border-white/5 rounded-2xl animate-pulse" />
                <p className="text-center text-gray-500 text-sm mt-6 flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                  Nour génère votre leçon…
                </p>
              </div>
            ) : error ? (
              <div className="bg-red-900/20 border border-red-500/20 rounded-2xl p-8 text-center">
                <p className="text-red-400 mb-4">Erreur lors du chargement de la leçon.</p>
                <button
                  onClick={() => router.refresh()}
                  className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-xl text-sm transition-all"
                >
                  Réessayer
                </button>
              </div>
            ) : content ? (
              <div className="space-y-6">
                {/* Objectives */}
                <div className="bg-blue-900/20 border border-blue-500/20 rounded-2xl p-6">
                  <h2 className="flex items-center gap-2 text-blue-300 font-semibold mb-4 text-sm uppercase tracking-wider">
                    <Target className="w-4 h-4" />
                    Objectifs de la leçon
                  </h2>
                  <ul className="space-y-2">
                    {content.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-gray-300 text-sm">
                        <CheckCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Introduction */}
                <div className="bg-white/3 border border-white/8 rounded-2xl p-6">
                  <p className="text-gray-300 leading-relaxed">{content.introduction}</p>
                </div>

                {/* Course sections */}
                {content.sections.map((section, i) => (
                  <div key={i} className="bg-white/3 border border-white/8 rounded-2xl p-6">
                    <h2 className="text-lg font-bold text-white mb-3">{section.title}</h2>
                    <p className="text-gray-300 leading-relaxed text-sm whitespace-pre-line mb-4">{section.content}</p>
                    {section.formula && (
                      <div className="bg-blue-950/60 border border-blue-500/25 rounded-xl p-4 mt-4">
                        <p className="text-blue-200 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <BookMarked className="w-3.5 h-3.5" />
                          Formule / Règle importante
                        </p>
                        <p className="text-blue-100 font-mono text-base text-center font-bold">{section.formula}</p>
                      </div>
                    )}
                  </div>
                ))}

                {/* Examples */}
                {content.examples.length > 0 && (
                  <div className="bg-white/3 border border-white/8 rounded-2xl p-6">
                    <h2 className="flex items-center gap-2 text-white font-bold mb-5">
                      <Lightbulb className="w-5 h-5 text-amber-400" />
                      Exemples résolus
                    </h2>
                    <div className="space-y-6">
                      {content.examples.map((ex, i) => (
                        <div key={i} className="bg-gray-900/50 border border-white/5 rounded-xl p-5">
                          <p className="text-gray-300 font-semibold mb-4 text-sm">
                            Exemple {i + 1} — {ex.problem}
                          </p>
                          <div className="space-y-2 mb-4">
                            {ex.steps.map((step, si) => (
                              <div key={si} className="flex items-start gap-3">
                                <span className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 text-xs font-bold shrink-0">
                                  {si + 1}
                                </span>
                                <p className="text-gray-300 text-sm leading-relaxed">{step}</p>
                              </div>
                            ))}
                          </div>
                          <div className="bg-emerald-900/30 border border-emerald-500/20 rounded-lg p-3">
                            <p className="text-emerald-300 text-sm font-semibold">
                              ✅ Réponse : {ex.answer}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key points */}
                <div className="bg-emerald-900/15 border border-emerald-500/20 rounded-2xl p-6">
                  <h2 className="flex items-center gap-2 text-emerald-300 font-semibold mb-4 text-sm uppercase tracking-wider">
                    <CheckCircle className="w-4 h-4" />
                    Points clés à retenir
                  </h2>
                  <ul className="space-y-2">
                    {content.keyPoints.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-gray-300 text-sm">
                        <span className="text-emerald-400 font-bold shrink-0">·</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Vocabulary */}
                {content.vocabulary.length > 0 && (
                  <div className="bg-white/3 border border-white/8 rounded-2xl p-6">
                    <h2 className="flex items-center gap-2 text-white font-bold mb-4">
                      <BookOpen className="w-4 h-4 text-violet-400" />
                      Vocabulaire clé
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {content.vocabulary.map((v, i) => (
                        <div key={i} className="bg-gray-900/50 border border-white/5 rounded-xl p-3">
                          <p className="text-violet-300 font-semibold text-sm mb-1">{v.term}</p>
                          <p className="text-gray-400 text-xs leading-relaxed">{v.definition}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Mark completed button */}
                {!completed && (
                  <button
                    onClick={markCompleted}
                    disabled={markingDone}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-900/30 transition-all disabled:opacity-60"
                  >
                    <CheckCircle className="w-5 h-5" />
                    {markingDone ? "Enregistrement…" : "Marquer comme complétée ✓"}
                  </button>
                )}
              </div>
            ) : null}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 gap-4">
              {prevLesson ? (
                <Link
                  href={`/cours/${matiere}/${niveau}/${prevLesson.chapitre}/${prevLesson.lecon}`}
                  className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-medium px-5 py-3 rounded-xl transition-all text-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Leçon précédente
                </Link>
              ) : <div />}

              {nextLesson && (
                <Link
                  href={`/cours/${matiere}/${niveau}/${nextLesson.chapitre}/${nextLesson.lecon}`}
                  className={`flex items-center gap-2 bg-gradient-to-r ${subject.gradient} text-white font-semibold px-5 py-3 rounded-xl transition-all text-sm`}
                >
                  Leçon suivante
                  <ChevronRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            {/* Chapter mini-list */}
            <div className="bg-white/3 border border-white/8 rounded-2xl p-4">
              <h3 className="text-white font-semibold text-sm mb-3">Leçons de ce chapitre</h3>
              <div className="space-y-1">
                {chapter.lessons.map((l) => {
                  const isCurrent = l.id === lecon;
                  const isLessLocked = !l.isFree && !isPro;
                  return (
                    <div key={l.id}>
                      {isLessLocked ? (
                        <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs text-gray-600">
                          <Lock className="w-3 h-3 shrink-0" />
                          <span className="line-clamp-1">{l.title}</span>
                        </div>
                      ) : (
                        <Link
                          href={`/cours/${matiere}/${niveau}/${chapitre}/${l.id}`}
                          className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-colors ${
                            isCurrent
                              ? "bg-blue-500/20 text-blue-300 font-semibold"
                              : "text-gray-400 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${isCurrent ? "bg-blue-400" : "bg-gray-700"}`} />
                          <span className="line-clamp-1">{l.title}</span>
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Ask Nour */}
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/10 border border-blue-500/20 rounded-2xl p-4">
              <h3 className="text-white font-semibold text-sm mb-1 flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-blue-400" />
                Poser une question
              </h3>
              <p className="text-gray-500 text-xs mb-3">
                Nour t'explique cette leçon en Darija
              </p>
              <Link
                href={`/chat?subject=${encodeURIComponent(subject.label)}&chapter=${encodeURIComponent(chapter.title)}&lesson=${encodeURIComponent(lessonMeta.title)}&level=${niveau}`}
                className="inline-flex items-center gap-1.5 bg-blue-600/40 hover:bg-blue-600/60 border border-blue-500/30 text-blue-300 text-xs font-semibold px-3 py-2 rounded-lg transition-all w-full justify-center"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Demander à Nour
              </Link>
            </div>

            {/* Exercises */}
            <div className="bg-gradient-to-br from-emerald-900/20 to-emerald-900/5 border border-emerald-500/15 rounded-2xl p-4">
              <h3 className="text-white font-semibold text-sm mb-1 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                Faire des exercices
              </h3>
              <p className="text-gray-500 text-xs mb-3">
                Upload ton exercice pour correction IA
              </p>
              <Link
                href={`/tashih?matiere=${encodeURIComponent(subject.label)}&chapitre=${encodeURIComponent(chapter.title)}`}
                className="inline-flex items-center gap-1.5 bg-emerald-600/20 hover:bg-emerald-600/40 border border-emerald-500/20 text-emerald-300 text-xs font-semibold px-3 py-2 rounded-lg transition-all w-full justify-center"
              >
                Corriger mon exercice
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
