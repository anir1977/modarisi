"use client";

import React, { Suspense, useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Calculator, Atom, FlaskConical, BookMarked, BookOpen,
  Landmark, Globe, Upload, X, FileText,
  Sparkles, CheckCircle, AlertTriangle, ChevronDown,
  BookOpen as BookOpenIcon, MessageSquare, RotateCcw, Save,
  Star, Loader2, Camera,
} from "lucide-react";
import { CURRICULUM, LEVELS } from "@/lib/curriculum";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { TashihResult } from "@/app/api/tashih/route";
import { useTranslations, useLocale } from "next-intl";

// ── Constants ──────────────────────────────────────────────────────────────────

const SUBJECTS = [
  { id: "maths",    label: "Mathématiques",       labelAr: "الرياضيات",          icon: Calculator,   gradient: "from-blue-500 to-cyan-500" },
  { id: "pc",       label: "Physique-Chimie",      labelAr: "الفيزياء والكيمياء", icon: Atom,         gradient: "from-violet-500 to-purple-500" },
  { id: "svt",      label: "SVT",                  labelAr: "علوم الحياة",        icon: FlaskConical, gradient: "from-emerald-500 to-teal-500" },
  { id: "francais", label: "Français",             labelAr: "الفرنسية",           icon: BookMarked,   gradient: "from-rose-500 to-pink-500" },
  { id: "arabe",    label: "Langue Arabe",         labelAr: "اللغة العربية",      icon: BookOpen,     gradient: "from-amber-500 to-orange-500" },
  { id: "islam",    label: "Éd. Islamique",        labelAr: "التربية الإسلامية",  icon: Landmark,     gradient: "from-sky-500 to-blue-500" },
  { id: "hg",       label: "Histoire-Géo",         labelAr: "التاريخ والجغرافيا", icon: Globe,        gradient: "from-indigo-500 to-violet-500" },
];

const EXERCISE_TYPES = [
  { id: "calcul",    label: "Calcul",           labelAr: "حساب",            emoji: "🔢" },
  { id: "probleme",  label: "Problème",         labelAr: "مسألة",           emoji: "🧩" },
  { id: "qcm",       label: "QCM",              labelAr: "اختيار متعدد",    emoji: "☑️" },
  { id: "redaction", label: "Rédaction",        labelAr: "إنشاء",           emoji: "✍️" },
  { id: "cours",     label: "Question de cours",labelAr: "سؤال درس",        emoji: "📖" },
];

const BADGE_CONFIG: Record<string, { color: string; bg: string; border: string; icon: string }> = {
  "Excellent":   { color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", icon: "🏆" },
  "Bien":        { color: "text-blue-400",    bg: "bg-blue-500/10",    border: "border-blue-500/30",    icon: "👍" },
  "À améliorer": { color: "text-amber-400",   bg: "bg-amber-500/10",   border: "border-amber-500/30",   icon: "📈" },
  "À reprendre": { color: "text-red-400",     bg: "bg-red-500/10",     border: "border-red-500/30",     icon: "🔄" },
};

// ── Markdown renderer ──────────────────────────────────────────────────────────

function MarkdownBlock({ content }: { content: string }) {
  const lines = content.split("\n");
  return (
    <div className="text-sm text-gray-300 leading-relaxed space-y-2">
      {lines.map((line, i) => {
        if (line.startsWith("## ")) return <h3 key={i} className="text-white font-semibold text-sm mt-4 mb-1">{line.slice(3)}</h3>;
        if (line.startsWith("# "))  return <h2 key={i} className="text-white font-bold text-base mt-4 mb-1">{line.slice(2)}</h2>;
        if (line.startsWith("> "))  return <blockquote key={i} className="border-l-2 border-blue-500/50 pl-3 text-blue-300/80 italic text-xs">{line.slice(2)}</blockquote>;
        if (line.trim() === "")     return <div key={i} className="h-1" />;
        const parts = line.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
        return (
          <p key={i} className="leading-relaxed">
            {parts.map((part, j) => {
              if (part.startsWith("**") && part.endsWith("**")) return <strong key={j} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
              if (part.startsWith("`") && part.endsWith("`"))   return <code key={j} className="bg-white/10 text-blue-300 px-1 py-0.5 rounded text-xs font-mono">{part.slice(1, -1)}</code>;
              return part;
            })}
          </p>
        );
      })}
    </div>
  );
}

// ── Score circle ───────────────────────────────────────────────────────────────

function ScoreCircle({ note, noteMax }: { note: number; noteMax: number }) {
  const pct   = note / noteMax;
  const color = pct >= 0.9 ? "#10b981" : pct >= 0.7 ? "#3b82f6" : pct >= 0.5 ? "#f59e0b" : "#ef4444";
  const r = 28, circ = 2 * Math.PI * r, dash = circ * pct;
  return (
    <div className="relative w-20 h-20 shrink-0">
      <svg className="w-20 h-20 -rotate-90" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
        <circle cx="32" cy="32" r={r} fill="none" stroke={color} strokeWidth="6"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          style={{ transition: "stroke-dasharray 0.8s ease" }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-white font-bold text-lg leading-none">{note}</span>
        <span className="text-gray-500 text-xs">/{noteMax}</span>
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────

export default function TashihPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-950" />}>
      <TashihContent />
    </Suspense>
  );
}

function TashihContent() {
  const t      = useTranslations("tashih");
  const locale = useLocale();
  const isAr   = locale === "ar";

  const [isGuest, setIsGuest] = useState(false);
  const searchParams = useSearchParams();

  const [selectedMatiere, setSelectedMatiere] = useState(
    searchParams.get("matiere")
      ? SUBJECTS.find(s => s.label === searchParams.get("matiere"))?.id ?? "maths"
      : "maths"
  );
  const [selectedNiveau,   setSelectedNiveau]   = useState("1ere");
  const [selectedChapitre, setSelectedChapitre] = useState("");
  const [selectedType,     setSelectedType]     = useState("calcul");

  const [activeTab,     setActiveTab]     = useState<"texte" | "image">("texte");
  const [exerciceText,  setExerciceText]  = useState("");
  const [reponseText,   setReponseText]   = useState("");
  const [imageFile,     setImageFile]     = useState<File | null>(null);
  const [imagePreview,  setImagePreview]  = useState<string | null>(null);
  const [imageContext,  setImageContext]  = useState("");
  const [isDragging,    setIsDragging]    = useState(false);

  const [loading, setLoading] = useState(false);
  const [result,  setResult]  = useState<TashihResult | null>(null);
  const [error,   setError]   = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("@/lib/supabase/client").then(({ createClient }) => {
      createClient().auth.getUser().then(({ data: { user } }) => {
        if (!user) setIsGuest(true);
      });
    });
  }, []);

  const chapters = (() => {
    const subjects = CURRICULUM[selectedNiveau] ?? [];
    return subjects.find(s => s.id === selectedMatiere)?.chapters ?? [];
  })();

  useEffect(() => { setSelectedChapitre(""); }, [selectedMatiere, selectedNiveau]);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleSubmit = async () => {
    if (activeTab === "texte" && !exerciceText.trim()) return;
    if (activeTab === "image" && !imagePreview) return;

    setLoading(true);
    setError(null);
    setResult(null);

    if (window.innerWidth < 1024 && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    try {
      const body: Record<string, string> = {
        exercice:       activeTab === "texte" ? exerciceText : imageContext,
        matiere:        SUBJECTS.find(s => s.id === selectedMatiere)?.label ?? selectedMatiere,
        niveau:         LEVELS.find(l => l.id === selectedNiveau)?.label ?? selectedNiveau,
        type_exercice:  EXERCISE_TYPES.find(tp => tp.id === selectedType)?.label ?? selectedType,
      };
      if (reponseText.trim())           body.reponse_eleve = reponseText;
      if (selectedChapitre)             body.chapitre      = selectedChapitre;
      if (activeTab === "image" && imagePreview) body.image_base64 = imagePreview;

      const res = await fetch("/api/tashih", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.status === 429) { setError(t("limit_reached")); return; }

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Erreur inconnue");
      }

      setResult(await res.json());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null); setError(null);
    setExerciceText(""); setReponseText("");
    setImageFile(null); setImagePreview(null); setImageContext("");
  };

  const subject   = SUBJECTS.find(s => s.id === selectedMatiere)!;
  const canSubmit = activeTab === "texte" ? !!exerciceText.trim() : !!imagePreview;

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      {/* ── Header ── */}
      <div className="relative overflow-hidden pt-24 pb-10 border-b border-white/5">
        <div className="absolute top-0 left-0 right-0 h-full"
          style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(16,185,129,0.07) 0%, transparent 70%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-emerald-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            {t("badge")}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight">
            {t("title")}{" "}
            <span className="text-gray-500 font-normal">·</span>{" "}
            <span className="text-2xl sm:text-3xl text-gray-400 font-bold">{t("title_ar")}</span>
          </h1>
          <p className="text-gray-400 text-base max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>
      </div>

      {/* ── 3-column layout ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ══ COL 1 — Context (250px) ══ */}
          <div className="lg:w-[250px] shrink-0 space-y-5">
            <div className="bg-white/3 border border-white/8 rounded-2xl p-4 space-y-4">

              {/* Matière */}
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
                  {t("label_subject")}
                </label>
                <div className="grid grid-cols-2 gap-1.5 lg:grid-cols-1">
                  {SUBJECTS.map(s => {
                    const Icon = s.icon;
                    const active = selectedMatiere === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setSelectedMatiere(s.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all text-left ${
                          active
                            ? `bg-gradient-to-r ${s.gradient} text-white shadow-lg`
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 shrink-0" />
                        <span className="line-clamp-1">{isAr ? s.labelAr : s.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Niveau */}
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
                  {t("label_level")}
                </label>
                <div className="flex flex-col gap-1">
                  {LEVELS.map(l => (
                    <button
                      key={l.id}
                      onClick={() => setSelectedNiveau(l.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium transition-all text-left ${
                        selectedNiveau === l.id
                          ? "bg-white/10 text-white border border-white/20"
                          : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chapitre */}
              {chapters.length > 0 && (
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
                    {t("label_chapter")}{" "}
                    <span className="text-gray-600 font-normal">{t("label_optional")}</span>
                  </label>
                  <div className="relative">
                    <select
                      value={selectedChapitre}
                      onChange={e => setSelectedChapitre(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-300 appearance-none focus:outline-none focus:border-white/25 pr-8"
                    >
                      <option value="">— {t("label_chapter")} —</option>
                      {chapters.map(ch => (
                        <option key={ch.id} value={ch.title}>{ch.title}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
                  </div>
                </div>
              )}

              {/* Type */}
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
                  {t("label_type")}
                </label>
                <div className="flex flex-col gap-1">
                  {EXERCISE_TYPES.map(tp => (
                    <button
                      key={tp.id}
                      onClick={() => setSelectedType(tp.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all text-left ${
                        selectedType === tp.id
                          ? "bg-white/10 text-white border border-white/20"
                          : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                      }`}
                    >
                      <span>{tp.emoji}</span>
                      {isAr ? tp.labelAr : tp.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ══ COL 2 — Input ══ */}
          <div className="flex-1 min-w-0">
            <div className="bg-white/3 border border-white/8 rounded-2xl overflow-hidden">

              {/* Tabs */}
              <div className="flex border-b border-white/8">
                {(["texte", "image"] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex items-center gap-2 px-5 py-3.5 text-sm font-semibold transition-colors ${
                      activeTab === tab
                        ? "text-white border-b-2 border-emerald-500"
                        : "text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    {tab === "texte" ? <><FileText className="w-4 h-4" />{t("tab_text")}</> : <><Camera className="w-4 h-4" />{t("tab_image")}</>}
                  </button>
                ))}
              </div>

              <div className="p-5">
                {activeTab === "texte" ? (
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-400 mb-2 block">
                        {t("label_exercise")} <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        value={exerciceText}
                        onChange={e => setExerciceText(e.target.value)}
                        placeholder={t("placeholder_exercise")}
                        rows={6}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-200 placeholder-gray-600 resize-none focus:outline-none focus:border-white/25 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-400 mb-2 block">
                        {t("label_answer")}{" "}
                        <span className="text-gray-600 font-normal">{t("answer_optional")}</span>
                      </label>
                      <textarea
                        value={reponseText}
                        onChange={e => setReponseText(e.target.value)}
                        placeholder={t("placeholder_answer")}
                        rows={5}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-200 placeholder-gray-600 resize-none focus:outline-none focus:border-white/25 transition-colors"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {!imagePreview ? (
                      <div
                        onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all ${
                          isDragging
                            ? "border-emerald-500/60 bg-emerald-500/5"
                            : "border-white/15 hover:border-white/30 hover:bg-white/3"
                        }`}
                      >
                        <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
                          onChange={e => { const file = e.target.files?.[0]; if (file) handleFile(file); }} />
                        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Upload className="w-6 h-6 text-gray-500" />
                        </div>
                        <p className="text-gray-300 font-semibold text-sm mb-1">{t("drop_zone")}</p>
                        <p className="text-gray-600 text-xs">{t("drop_hint")}</p>
                        <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-amber-400/80 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1.5">
                          <Camera className="w-3 h-3" />
                          {t("photo_tip")}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="relative rounded-2xl overflow-hidden border border-white/10">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={imagePreview} alt="Exercise preview" className="w-full max-h-64 object-contain bg-black/20" />
                          <button
                            onClick={() => { setImageFile(null); setImagePreview(null); }}
                            className="absolute top-2 right-2 w-8 h-8 bg-gray-900/90 hover:bg-red-600/80 rounded-full flex items-center justify-center transition-colors"
                          >
                            <X className="w-3.5 h-3.5 text-white" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-emerald-400">
                          <CheckCircle className="w-3.5 h-3.5" />
                          {imageFile?.name ?? "Image chargée"}
                        </div>
                      </div>
                    )}
                    <div>
                      <label className="text-xs font-semibold text-gray-400 mb-2 block">
                        {t("label_answer")}{" "}
                        <span className="text-gray-600 font-normal">{t("label_optional")}</span>
                      </label>
                      <textarea
                        value={imageContext}
                        onChange={e => setImageContext(e.target.value)}
                        placeholder={t("placeholder_context")}
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-200 placeholder-gray-600 resize-none focus:outline-none focus:border-white/25 transition-colors"
                      />
                    </div>
                  </div>
                )}

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit || loading}
                  className={`mt-5 w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-semibold text-sm transition-all ${
                    canSubmit && !loading
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-900/30 hover:shadow-emerald-900/50"
                      : "bg-white/5 text-gray-600 cursor-not-allowed"
                  }`}
                >
                  {loading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" />{t("loading")}</>
                  ) : (
                    <><Sparkles className="w-4 h-4" />{t("submit")}</>
                  )}
                </button>
              </div>
            </div>

            {/* Tips */}
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              {[
                { icon: "⚡", title: "Instantané", desc: "Correction en quelques secondes" },
                { icon: "📋", title: "Détaillé",   desc: "Étape par étape, comme un prof" },
                { icon: "🎯", title: "MEN Maroc",  desc: "Aligné sur le programme officiel" },
              ].map(tip => (
                <div key={tip.title} className="bg-white/3 border border-white/8 rounded-xl p-3">
                  <div className="text-lg mb-1">{tip.icon}</div>
                  <p className="text-white text-xs font-semibold">{tip.title}</p>
                  <p className="text-gray-600 text-xs mt-0.5">{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ══ COL 3 — Result (400px) ══ */}
          <div ref={resultRef} className="lg:w-[400px] shrink-0">
            <div className="lg:sticky lg:top-24">

              {/* Empty state */}
              {!loading && !result && !error && (
                <div className="bg-white/3 border border-white/8 rounded-2xl p-8 text-center">
                  <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-5 text-4xl">🎓</div>
                  <h3 className="text-white font-semibold text-base mb-2">{t("result_empty")}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {t("result_empty_sub")}{" "}
                    <strong className="text-gray-400">"{t("result_empty_cta")}"</strong>
                  </p>
                  <div className="mt-6 flex flex-col gap-2 text-xs text-gray-600">
                    {["Note estimée /20", "Points forts et points à corriger", "Correction complète étape par étape", "Conseil personnalisé de Nour"].map(l => (
                      <div key={l} className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500/50 shrink-0" />
                        {l}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Loading skeleton */}
              {loading && (
                <div className="bg-white/3 border border-white/8 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center animate-pulse">
                      <Sparkles className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <div className="h-4 bg-white/10 rounded w-40 mb-2 animate-pulse" />
                      <div className="h-3 bg-white/5 rounded w-28 animate-pulse" />
                    </div>
                  </div>
                  {[80, 60, 90, 50, 70].map((w, i) => (
                    <div key={i} className="h-3 bg-white/5 rounded animate-pulse" style={{ width: `${w}%` }} />
                  ))}
                  <p className="text-center text-emerald-400/60 text-xs pt-2 flex items-center justify-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    {t("loading")}
                  </p>
                </div>
              )}

              {/* Error */}
              {error && !loading && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-red-300 font-semibold text-sm mb-1">Erreur</p>
                      <p className="text-red-400/80 text-xs leading-relaxed">{error}</p>
                      {(error.includes("limite") || error.includes("حد")) && (
                        <Link
                          href="/pricing"
                          className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-xl px-3 py-2 hover:bg-amber-500/20 transition-colors"
                        >
                          <Star className="w-3 h-3" />
                          {isAr ? "الترقية إلى المدفوعة" : "Passer au Plan Pro →"}
                        </Link>
                      )}
                    </div>
                  </div>
                  <button onClick={() => setError(null)} className="mt-4 w-full text-xs text-gray-500 hover:text-gray-300 transition-colors">
                    {isAr ? "أعد المحاولة" : "Réessayer"}
                  </button>
                </div>
              )}

              {/* Result */}
              {result && !loading && (
                <div className="space-y-3">
                  <div className="bg-white/3 border border-white/8 rounded-2xl p-5">
                    <div className="flex items-center gap-4 mb-4">
                      <ScoreCircle note={result.note} noteMax={result.note_max} />
                      <div className="flex-1">
                        {(() => {
                          const cfg = BADGE_CONFIG[result.badge] ?? BADGE_CONFIG["Bien"];
                          return (
                            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-bold ${cfg.bg} ${cfg.border} ${cfg.color} mb-2`}>
                              <span>{cfg.icon}</span>
                              {result.badge}
                            </div>
                          );
                        })()}
                        <p className="text-gray-500 text-xs">
                          {isAr
                            ? SUBJECTS.find(s => s.id === selectedMatiere)?.labelAr
                            : SUBJECTS.find(s => s.id === selectedMatiere)?.label}{" "}
                          · {LEVELS.find(l => l.id === selectedNiveau)?.label}
                        </p>
                      </div>
                    </div>

                    {result.points_positifs.length > 0 && (
                      <div className="bg-emerald-500/8 border border-emerald-500/15 rounded-xl p-3 mb-3">
                        <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold mb-2">
                          <CheckCircle className="w-3.5 h-3.5" />
                          {t("points_positive")}
                        </div>
                        <ul className="space-y-1">
                          {result.points_positifs.map((p, i) => (
                            <li key={i} className="text-emerald-300/80 text-xs flex items-start gap-2">
                              <span className="text-emerald-500 mt-0.5">✓</span>{p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {result.points_corriger.length > 0 && (
                      <div className="bg-amber-500/8 border border-amber-500/15 rounded-xl p-3">
                        <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold mb-2">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          {t("points_fix")}
                        </div>
                        <ul className="space-y-1">
                          {result.points_corriger.map((p, i) => (
                            <li key={i} className="text-amber-300/80 text-xs flex items-start gap-2">
                              <span className="text-amber-500 mt-0.5">⚠</span>{p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="bg-white/3 border border-white/8 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <BookOpenIcon className="w-4 h-4 text-blue-400" />
                      <h3 className="text-white font-semibold text-sm">{t("full_correction")}</h3>
                    </div>
                    <MarkdownBlock content={result.correction_complete} />
                  </div>

                  {result.conseil && (
                    <div className="bg-gradient-to-br from-blue-900/20 to-blue-900/5 border border-blue-500/20 rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">💡</span>
                        <h3 className="text-blue-300 font-semibold text-sm">{t("conseil")}</h3>
                      </div>
                      <p className="text-blue-200/70 text-xs leading-relaxed">{result.conseil}</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={handleReset}
                      className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-gray-400 hover:text-white transition-all"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      {t("btn_next")}
                    </button>
                    <Link
                      href={`/chat?subject=${encodeURIComponent(SUBJECTS.find(s => s.id === selectedMatiere)?.label ?? "")}`}
                      className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/25 rounded-xl text-xs font-semibold text-blue-300 hover:text-blue-200 transition-all"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      {t("btn_question")}
                    </Link>
                  </div>

                  <div className="bg-gradient-to-r from-amber-900/20 to-amber-900/5 border border-amber-500/15 rounded-xl p-3 flex items-center gap-3">
                    <Save className="w-4 h-4 text-amber-400 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-amber-300 text-xs font-semibold">{isAr ? "احفظ تصحيحاتك" : "Sauvegarde tes corrections"}</p>
                      <p className="text-amber-400/60 text-xs">{isAr ? "تاريخ غير محدود مع الباقة المدفوعة" : "Historique illimité avec le Plan Pro"}</p>
                    </div>
                    <Link href="/pricing" className="shrink-0 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors whitespace-nowrap">
                      Pro →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
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
