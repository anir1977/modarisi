"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import {
  Calculator, Atom, FlaskConical, BookMarked,
  BookOpen, Landmark, Globe, ExternalLink, Search,
  ChevronLeft, ChevronRight, Loader2, GraduationCap,
  BookOpenCheck, RefreshCw, LayoutGrid,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ── Types ──────────────────────────────────────────────────────────────────────
interface Course {
  id: number;
  title: string;
  excerpt: string;
  link: string;
  slug: string;
  date: string;
}

interface ApiResponse {
  courses: Course[];
  totalPages: number;
  total: number;
  error?: string;
}

// ── Static config ──────────────────────────────────────────────────────────────
const LEVELS = [
  { id: "1ere", label: "1ère Collège",  labelAr: "السنة الأولى" },
  { id: "2eme", label: "2ème Collège",  labelAr: "السنة الثانية" },
  { id: "3eme", label: "3ème Collège",  labelAr: "السنة الثالثة" },
];

const SUBJECTS = [
  { id: "",         label: "Toutes",      labelAr: "الكل",          icon: LayoutGrid,   gradient: "from-gray-500 to-gray-400",     ring: "ring-gray-500/40"   },
  { id: "maths",    label: "Maths",       labelAr: "رياضيات",       icon: Calculator,   gradient: "from-blue-500 to-cyan-500",     ring: "ring-blue-500/40"   },
  { id: "pc",       label: "Physique",    labelAr: "فيزياء",        icon: Atom,         gradient: "from-violet-500 to-purple-500", ring: "ring-violet-500/40" },
  { id: "svt",      label: "SVT",         labelAr: "علوم الحياة",   icon: FlaskConical, gradient: "from-emerald-500 to-teal-500",  ring: "ring-emerald-500/40"},
  { id: "francais", label: "Français",    labelAr: "الفرنسية",      icon: BookMarked,   gradient: "from-amber-500 to-orange-500",  ring: "ring-amber-500/40"  },
  { id: "arabe",    label: "Arabe",       labelAr: "العربية",       icon: BookOpen,     gradient: "from-rose-500 to-pink-500",     ring: "ring-rose-500/40"   },
  { id: "hg",       label: "Histoire-Géo",labelAr: "تاريخ وجغرافيا",icon: Globe,        gradient: "from-sky-500 to-blue-500",      ring: "ring-sky-500/40"    },
  { id: "islam",    label: "Islam",       labelAr: "التربية الإسلامية",icon: Landmark,  gradient: "from-fuchsia-500 to-pink-500",  ring: "ring-fuchsia-500/40"},
];

function subjectById(id: string) {
  return SUBJECTS.find((s) => s.id === id) ?? SUBJECTS[0];
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("fr-MA", { day: "2-digit", month: "short", year: "numeric" });
  } catch {
    return "";
  }
}

// ── Skeleton card ──────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white/3 border border-white/8 rounded-2xl p-6 flex flex-col gap-3 animate-pulse">
      <div className="h-3 w-1/3 bg-white/8 rounded-full" />
      <div className="h-5 w-4/5 bg-white/10 rounded-lg" />
      <div className="h-4 w-full bg-white/6 rounded-lg" />
      <div className="h-4 w-3/4 bg-white/6 rounded-lg" />
      <div className="mt-auto h-9 w-32 bg-white/8 rounded-xl" />
    </div>
  );
}

// ── Course card ────────────────────────────────────────────────────────────────
function CourseCard({ course, matiere }: { course: Course; matiere: string }) {
  const subj = subjectById(matiere);
  const Icon = subj.icon;

  return (
    <article className="group relative bg-white/3 border border-white/8 rounded-2xl p-6 flex flex-col gap-3 overflow-hidden hover:bg-white/[0.06] hover:border-white/18 hover:shadow-xl transition-all duration-300">
      {/* Top gradient line */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${subj.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      {/* Subject + date */}
      <div className="flex items-center justify-between gap-2">
        <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-gradient-to-r ${subj.gradient} bg-opacity-15 text-white/80`}>
          <Icon className="w-3 h-3" />
          {subj.label !== "Toutes" ? subj.label : "Cours"}
        </span>
        <span className="text-gray-600 text-[11px]">{formatDate(course.date)}</span>
      </div>

      {/* Title */}
      <h3 className="font-bold text-white text-sm leading-snug line-clamp-2 group-hover:text-blue-100 transition-colors">
        {course.title}
      </h3>

      {/* Excerpt */}
      {course.excerpt && (
        <p className="text-gray-500 text-xs leading-relaxed line-clamp-3 flex-1">
          {course.excerpt}
        </p>
      )}

      {/* CTA */}
      <a
        href={course.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-auto inline-flex items-center gap-2 self-start text-xs font-semibold px-4 py-2 rounded-xl bg-gradient-to-r ${subj.gradient} text-white shadow-md opacity-90 hover:opacity-100 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200`}
        onClick={(e) => e.stopPropagation()}
      >
        <BookOpenCheck className="w-3.5 h-3.5" />
        Voir le cours
        <ExternalLink className="w-3 h-3 opacity-70" />
      </a>
    </article>
  );
}

// ── Empty state ────────────────────────────────────────────────────────────────
function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 gap-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl">
        📚
      </div>
      <p className="text-white font-semibold text-lg">Aucun cours trouvé</p>
      <p className="text-gray-500 text-sm max-w-xs">
        Essaie un autre niveau ou une autre matière — ou consulte directement moutamadris.ma
      </p>
      <button
        onClick={onReset}
        className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        Réinitialiser les filtres
      </button>
    </div>
  );
}

// ── Pagination ─────────────────────────────────────────────────────────────────
function Pagination({
  page, totalPages, onChange,
}: { page: number; totalPages: number; onChange: (p: number) => void }) {
  if (totalPages <= 1) return null;

  const pages: (number | "…")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push("…");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
    if (page < totalPages - 2) pages.push("…");
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-center gap-1.5 mt-12">
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="p-2 rounded-xl bg-white/5 border border-white/8 text-gray-400 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`ellipsis-${i}`} className="px-2 text-gray-600 text-sm select-none">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p as number)}
            className={`min-w-[36px] h-9 px-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
              p === page
                ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-900/30"
                : "bg-white/5 border border-white/8 text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="p-2 rounded-xl bg-white/5 border border-white/8 text-gray-400 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function CoursPage() {
  const [activeLevel,   setActiveLevel]   = useState("1ere");
  const [activeSubject, setActiveSubject] = useState("");
  const [searchQuery,   setSearchQuery]   = useState("");
  const [page,          setPage]          = useState(1);

  const [data,    setData]    = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(false);

  const filtersRef  = useRef<HTMLDivElement>(null);
  const abortRef    = useRef<AbortController | null>(null);

  const fetchCourses = useCallback(
    async (level: string, subject: string, p: number) => {
      // Cancel in-flight request
      abortRef.current?.abort();
      const ctrl = new AbortController();
      abortRef.current = ctrl;

      setLoading(true);
      setError(false);

      try {
        const params = new URLSearchParams({ niveau: level, matiere: subject, page: String(p) });
        const res = await fetch(`/api/moutamadris?${params}`, { signal: ctrl.signal });
        if (!res.ok) throw new Error("api_error");
        const json: ApiResponse = await res.json();
        setData(json);
        setError(!!(json.error && json.courses.length === 0));
      } catch (err: unknown) {
        if ((err as { name?: string }).name !== "AbortError") setError(true);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // Fetch whenever filters change
  useEffect(() => {
    fetchCourses(activeLevel, activeSubject, page);
  }, [activeLevel, activeSubject, page, fetchCourses]);

  function handleLevel(id: string) {
    setActiveLevel(id);
    setPage(1);
    setData(null);
  }
  function handleSubject(id: string) {
    setActiveSubject(id);
    setPage(1);
    setData(null);
  }
  function handlePage(p: number) {
    setPage(p);
    filtersRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function handleReset() {
    setActiveLevel("1ere");
    setActiveSubject("");
    setPage(1);
    setData(null);
  }

  const courses = data?.courses ?? [];
  const totalPages = data?.totalPages ?? 0;
  const total = data?.total ?? 0;

  // Client-side search filter
  const filtered = searchQuery.trim()
    ? courses.filter((c) =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.excerpt.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : courses;

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden pt-28 pb-14">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none hidden lg:block" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-600/8 rounded-full blur-[100px] pointer-events-none hidden lg:block" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 text-blue-400 text-xs font-semibold mb-5">
            <GraduationCap className="w-3.5 h-3.5" />
            Programme officiel marocain
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3 tracking-tight">
            Cours &{" "}
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Ressources
            </span>
          </h1>
          <p className="text-gray-400 text-base mb-6">
            Tous les cours du programme marocain · كل دروس البرنامج المغربي
          </p>

          {/* Source badge */}
          <a
            href="https://moutamadris.ma"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/4 border border-white/10 hover:border-white/20 rounded-full px-4 py-2 text-xs text-gray-400 hover:text-gray-200 transition-all"
          >
            <span className="text-base">📚</span>
            <span>Contenu officiel · moutamadris.ma</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
        </div>
      </div>

      {/* ── Sticky filters ───────────────────────────────────────────────────── */}
      <div
        ref={filtersRef}
        className="sticky top-14 z-30 bg-gray-950/90 backdrop-blur-md border-b border-white/6 py-3 px-4"
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-3">
          {/* Level tabs */}
          <div className="flex gap-2 flex-wrap">
            {LEVELS.map((lvl) => (
              <button
                key={lvl.id}
                onClick={() => handleLevel(lvl.id)}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeLevel === lvl.id
                    ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-900/30"
                    : "bg-white/5 border border-white/8 text-gray-400 hover:text-white hover:bg-white/8"
                }`}
              >
                {lvl.label}
                <span className="ml-1.5 text-[10px] opacity-60">{lvl.labelAr}</span>
              </button>
            ))}
          </div>

          {/* Subject chips + search */}
          <div className="flex items-center gap-2 flex-wrap">
            {SUBJECTS.map((subj) => {
              const Icon = subj.icon;
              const active = activeSubject === subj.id;
              return (
                <button
                  key={subj.id}
                  onClick={() => handleSubject(subj.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
                    active
                      ? `bg-gradient-to-r ${subj.gradient} text-white border-transparent shadow-md`
                      : `bg-white/4 border-white/8 text-gray-400 hover:text-white hover:border-white/15`
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {subj.label}
                </button>
              );
            })}

            {/* Search input — pushed to the right on lg */}
            <div className="ml-auto flex items-center gap-2 bg-white/5 border border-white/8 rounded-xl px-3 py-1.5 w-full sm:w-56 focus-within:border-white/20 transition-colors">
              <Search className="w-3.5 h-3.5 text-gray-500 shrink-0" />
              <input
                type="search"
                placeholder="Rechercher…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-xs text-gray-300 placeholder:text-gray-600 outline-none min-w-0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Results info ─────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="flex items-center justify-between text-xs text-gray-600">
          {loading ? (
            <span className="flex items-center gap-1.5">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              Chargement…
            </span>
          ) : (
            <span>
              {total > 0
                ? `${total} cours trouvés${searchQuery ? ` · "${searchQuery}"` : ""}`
                : data
                  ? "Aucun résultat"
                  : ""}
            </span>
          )}
          {total > 0 && (
            <span>
              Page {page} / {totalPages}
            </span>
          )}
        </div>
      </div>

      {/* ── Grid ─────────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Loading skeletons */}
          {loading && !data && Array.from({ length: 9 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}

          {/* Overlay spinner when reloading existing data */}
          {loading && data && courses.map((c) => (
            <div key={c.id} className="opacity-50 pointer-events-none">
              <CourseCard course={c} matiere={activeSubject} />
            </div>
          ))}

          {/* Real cards */}
          {!loading && filtered.map((course) => (
            <CourseCard key={course.id} course={course} matiere={activeSubject} />
          ))}

          {/* Empty */}
          {!loading && !error && filtered.length === 0 && data && (
            <EmptyState onReset={handleReset} />
          )}

          {/* Error */}
          {!loading && error && (
            <div className="col-span-full flex flex-col items-center justify-center py-20 gap-4 text-center">
              <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-2xl">⚠️</div>
              <p className="text-white font-semibold">Impossible de charger les cours</p>
              <p className="text-gray-500 text-sm">Vérifie ta connexion ou essaie dans quelques instants.</p>
              <button
                onClick={() => fetchCourses(activeLevel, activeSubject, page)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Réessayer
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {!loading && !error && filtered.length > 0 && (
          <Pagination page={page} totalPages={totalPages} onChange={handlePage} />
        )}

        {/* Ask Nour banner */}
        <div className="mt-16 bg-gradient-to-r from-blue-900/20 to-emerald-900/10 border border-blue-500/15 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center shrink-0 text-xl">
            🎓
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="text-white font-semibold mb-1">Tu n&apos;as pas compris un cours ?</p>
            <p className="text-gray-400 text-sm">
              Demande à Nour — notre IA explique en Darija, Français ou Arabe, 24h/7j.
            </p>
          </div>
          <Link
            href="/chat"
            className="shrink-0 inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold px-6 py-2.5 rounded-xl text-sm hover:from-blue-500 hover:to-emerald-500 transition-all"
          >
            <GraduationCap className="w-4 h-4" />
            Demander à Nour
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
