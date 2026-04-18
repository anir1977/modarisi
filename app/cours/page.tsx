"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calculator, Atom, FlaskConical, BookMarked,
  BookOpen, Landmark, Globe, ChevronRight,
  GraduationCap, Sparkles, PlayCircle, Lock,
  Zap, BookOpenCheck,
} from "lucide-react";
import { CURRICULUM, LEVELS, type Subject } from "@/lib/curriculum";
import { createClient } from "@/lib/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ── Icon map ───────────────────────────────────────────────────────────────────
const SUBJECT_ICONS: Record<string, React.ElementType> = {
  maths:    Calculator,
  pc:       Atom,
  svt:      FlaskConical,
  francais: BookMarked,
  arabe:    BookOpen,
  islam:    Landmark,
  hg:       Globe,
};

// ── Types ──────────────────────────────────────────────────────────────────────
type ProgressMap = Record<string, number>; // key = `${niveau}-${matiere}`, value = completed count

// ── Helpers ────────────────────────────────────────────────────────────────────
function getProgressPct(
  matiereId: string,
  niveau: string,
  subjects: Subject[],
  progress: ProgressMap,
): number {
  const key      = `${niveau}-${matiereId}`;
  const completed = progress[key] ?? 0;
  const subject  = subjects.find((s) => s.id === matiereId);
  const total    = subject?.chapters.reduce((a, c) => a + c.lessons.length, 0) ?? 0;
  return total > 0 ? Math.round((completed / total) * 100) : 0;
}

// ── Subject card ───────────────────────────────────────────────────────────────
function SubjectCard({
  subject,
  niveau,
  pct,
}: {
  subject: Subject;
  niveau: string;
  pct: number;
}) {
  const Icon = SUBJECT_ICONS[subject.id] ?? BookOpen;
  const totalLessons = subject.chapters.reduce((a, c) => a + c.lessons.length, 0);
  const firstFreeLesson = subject.chapters[0]?.lessons.find((l) => l.isFree);
  const firstLessonHref = firstFreeLesson
    ? `/cours/${subject.id}/${niveau}/1/${firstFreeLesson.id}`
    : `/cours/${subject.id}/${niveau}`;

  return (
    <Link
      href={`/cours/${subject.id}/${niveau}`}
      className="group relative bg-white/3 border border-white/8 rounded-2xl p-6 overflow-hidden hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 hover:shadow-xl flex flex-col"
    >
      {/* Top gradient reveal */}
      <div
        className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${subject.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />

      {/* Header row */}
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${subject.gradient} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        <ChevronRight className="w-4 h-4 text-gray-700 group-hover:text-gray-400 transition-colors mt-1" />
      </div>

      {/* Title */}
      <h3 className="font-bold text-white text-base mb-0.5 group-hover:text-white">
        {subject.label}
      </h3>
      <p className="text-gray-600 text-xs mb-4">{subject.labelAr}</p>

      {/* Stats row */}
      <div className="flex items-center gap-3 mb-4 text-xs text-gray-500">
        <span>{subject.chapters.length} chapitres</span>
        <span className="w-1 h-1 rounded-full bg-gray-700" />
        <span>{totalLessons} leçons</span>
        {firstFreeLesson && (
          <>
            <span className="w-1 h-1 rounded-full bg-gray-700" />
            <span className="text-emerald-500 font-semibold">1ère gratuite</span>
          </>
        )}
      </div>

      {/* Progress or CTA */}
      {pct > 0 ? (
        <div className="mt-auto">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-gray-500">Progression</span>
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
        <div className="mt-auto flex items-center justify-between">
          <span className="inline-flex items-center gap-1 text-xs text-gray-600">
            <Sparkles className="w-3 h-3 text-blue-500" />
            Commencer
          </span>
          <Link
            href={firstLessonHref}
            onClick={(e) => e.stopPropagation()}
            className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-gradient-to-r ${subject.gradient} text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
          >
            <PlayCircle className="w-3 h-3" />
            Leçon 1
          </Link>
        </div>
      )}
    </Link>
  );
}

// ── Chapter preview strip ──────────────────────────────────────────────────────
function ChapterStrip({
  subject,
  niveau,
}: {
  subject: Subject;
  niveau: string;
}) {
  const [open, setOpen] = useState(false);
  const previewChapters = subject.chapters.slice(0, 3);

  return (
    <div className="border-t border-white/5 pt-3 mt-3">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-400 transition-colors w-full text-left"
      >
        <ChevronRight className={`w-3 h-3 transition-transform ${open ? "rotate-90" : ""}`} />
        {open ? "Masquer les chapitres" : `Voir les ${subject.chapters.length} chapitres`}
      </button>

      {open && (
        <div className="mt-3 space-y-1.5">
          {previewChapters.map((ch) => (
            <Link
              key={ch.id}
              href={`/cours/${subject.id}/${niveau}/${ch.id}/1`}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors group/ch"
            >
              <div
                className={`w-5 h-5 rounded-md bg-gradient-to-br ${subject.gradient} flex items-center justify-center shrink-0 text-white text-[10px] font-bold`}
              >
                {ch.id}
              </div>
              <span className="text-xs text-gray-400 group-hover/ch:text-white transition-colors line-clamp-1">
                {ch.title}
              </span>
              <span className="ml-auto text-[10px] text-gray-700 shrink-0">
                {ch.lessons.length} leçons
              </span>
            </Link>
          ))}
          {subject.chapters.length > 3 && (
            <Link
              href={`/cours/${subject.id}/${niveau}`}
              className="flex items-center gap-1.5 px-2 py-1 text-xs text-blue-400 hover:text-blue-300 transition-colors"
            >
              + {subject.chapters.length - 3} chapitres de plus →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function CoursPage() {
  const [activeLevel, setActiveLevel] = useState("1ere");
  const [progress,    setProgress]    = useState<ProgressMap>({});
  const [isGuest,     setIsGuest]     = useState(false);
  const [showChapters, setShowChapters] = useState(false);

  // Load auth + progress
  useEffect(() => {
    const supabase = createClient();

    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setIsGuest(true); return; }

      // Pre-select user's registered level
      const { data: child } = await supabase
        .from("children")
        .select("level")
        .eq("parent_id", user.id)
        .single();

      if (child?.level) setActiveLevel(child.level);

      // Load progress across all levels/subjects
      const { data: prog } = await supabase
        .from("user_progress")
        .select("matiere, niveau")
        .eq("user_id", user.id);

      if (prog) {
        const counts: ProgressMap = {};
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
  const totalLessons = subjects.reduce(
    (a, s) => a + s.chapters.reduce((b, c) => b + c.lessons.length, 0), 0,
  );

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden pt-24 pb-12">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none hidden lg:block" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-600/8 rounded-full blur-[100px] pointer-events-none hidden lg:block" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 text-blue-400 text-xs font-semibold mb-5">
            <GraduationCap className="w-3.5 h-3.5" />
            Programme officiel marocain — 3 niveaux
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3 tracking-tight">
            Tous tes{" "}
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              cours du collège
            </span>
          </h1>
          <p className="text-gray-400 text-base mb-6 max-w-xl mx-auto">
            Leçons générées par IA · Expliquées en Darija et Français · Corrigées par Nour
          </p>

          {/* Stats pills */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { icon: BookOpenCheck, label: `${totalLessons}+ leçons`, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
              { icon: Zap,          label: "Générées par IA",           color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
              { icon: Lock,         label: "1ère leçon gratuite",        color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
            ].map(({ icon: Icon, label, color }) => (
              <span key={label} className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${color}`}>
                <Icon className="w-3 h-3" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">
        {/* ── Level tabs ──────────────────────────────────────────────────── */}
        <div className="flex gap-2 mb-8 bg-white/3 border border-white/8 rounded-2xl p-1.5 w-fit mx-auto">
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

        {/* ── Toggle chapter preview ───────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-gray-600 text-sm">
            {subjects.length} matières · {totalLessons} leçons
          </p>
          <button
            onClick={() => setShowChapters((v) => !v)}
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1.5"
          >
            <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showChapters ? "rotate-90" : ""}`} />
            {showChapters ? "Masquer les chapitres" : "Afficher les chapitres"}
          </button>
        </div>

        {/* ── Subject grid ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {subjects.map((subject) => {
            const pct = getProgressPct(subject.id, activeLevel, subjects, progress);
            return (
              <div key={subject.id} className="flex flex-col">
                <SubjectCard subject={subject} niveau={activeLevel} pct={pct} />
                {showChapters && (
                  <div className="bg-white/3 border border-t-0 border-white/8 rounded-b-2xl -mt-1 px-5 pb-4 pt-1">
                    <ChapterStrip subject={subject} niveau={activeLevel} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── How it works banner ──────────────────────────────────────────── */}
        <div className="mt-14 grid sm:grid-cols-3 gap-4">
          {[
            {
              step: "01",
              icon: BookOpenCheck,
              title: "Choisis ta matière",
              desc: "Sélectionne le niveau et la matière. Toutes les leçons du programme officiel sont disponibles.",
              gradient: "from-blue-500 to-cyan-500",
            },
            {
              step: "02",
              icon: Zap,
              title: "Nour génère ta leçon",
              desc: "L'IA génère un cours complet avec exemples, formules et points clés — adapté au programme marocain.",
              gradient: "from-violet-500 to-purple-500",
            },
            {
              step: "03",
              icon: Sparkles,
              title: "Pose tes questions",
              desc: "Tu n'as pas compris ? Demande à Nour en Darija ou en Français — disponible 24h/7j.",
              gradient: "from-emerald-500 to-teal-500",
            },
          ].map(({ step, icon: Icon, title, desc, gradient }) => (
            <div
              key={step}
              className="bg-white/3 border border-white/8 rounded-2xl p-5 flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700 text-xs font-bold tracking-widest">{step}</span>
              </div>
              <h3 className="text-white font-bold text-sm">{title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* ── Ask Nour CTA ─────────────────────────────────────────────────── */}
        <div className="mt-8 bg-gradient-to-r from-blue-900/20 to-emerald-900/10 border border-blue-500/15 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center shrink-0 text-xl">
            🎓
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="text-white font-semibold mb-1">Tu n&apos;as pas compris une leçon ?</p>
            <p className="text-gray-400 text-sm">
              Demande à Nour — explique en Darija, Français ou Arabe, avec des exemples tirés du quotidien marocain.
            </p>
          </div>
          <Link
            href="/chat"
            className="shrink-0 inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold px-6 py-2.5 rounded-xl text-sm hover:from-blue-500 hover:to-emerald-500 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            Demander à Nour
          </Link>
        </div>
      </div>

      <Footer />

      {/* ── Guest sticky CTA ─────────────────────────────────────────────────── */}
      {isGuest && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-900/95 to-emerald-900/95 backdrop-blur-xl border-t border-white/10 px-4 py-3 sm:py-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <p className="text-white font-semibold text-sm">🎓 Accède à toutes les leçons gratuitement</p>
              <p className="text-gray-300 text-xs">
                Inscris-toi en 30 secondes — 5 questions offertes, sans carte bancaire
              </p>
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
