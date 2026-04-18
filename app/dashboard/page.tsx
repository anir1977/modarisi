"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MessageCircle, BookOpen, PenLine, ChevronRight,
  Flame, Sparkles, TrendingUp, Award, PlayCircle,
  Calculator, Atom, FlaskConical, BookMarked, Landmark, Globe,
  Star, Zap, Clock,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Skeleton } from "@/components/ui/Skeleton";
import { CURRICULUM } from "@/lib/curriculum";
import { useTranslations } from "next-intl";

// ── Types ──────────────────────────────────────────────────────────────────────

type RecentLesson = {
  matiere: string; niveau: string; chapitre: string; lecon: string; completed_at: string;
};

type ActivityItem = {
  type: "lesson" | "chat" | "correction";
  label: string;
  sub: string;
  time: string;
  icon: React.ElementType;
  color: string;
};

// ── Static data ────────────────────────────────────────────────────────────────

const SUBJECT_META: Record<string, { icon: React.ElementType; gradient: string; id: string }> = {
  "Mathématiques":       { icon: Calculator,  gradient: "from-blue-500 to-cyan-500",    id: "maths" },
  "Physique-Chimie":     { icon: Atom,        gradient: "from-violet-500 to-purple-500", id: "pc" },
  "SVT":                 { icon: FlaskConical,gradient: "from-emerald-500 to-teal-500", id: "svt" },
  "Français":            { icon: BookMarked,  gradient: "from-rose-500 to-pink-500",    id: "francais" },
  "Langue Arabe":        { icon: BookOpen,    gradient: "from-amber-500 to-orange-500", id: "arabe" },
  "Éducation Islamique": { icon: Landmark,    gradient: "from-sky-500 to-blue-500",     id: "islam" },
  "Histoire-Géo":        { icon: Globe,       gradient: "from-indigo-500 to-violet-500",id: "hg" },
};

const LEVEL_LABELS: Record<string, string> = {
  "1ere": "1ère année collège",
  "2eme": "2ème année collège",
  "3eme": "3ème année collège",
};

const XP_LEVELS = [
  { level: 1, label: "Débutant",      min: 0,    max: 200  },
  { level: 2, label: "Intermédiaire", min: 200,  max: 600  },
  { level: 3, label: "Avancé",        min: 600,  max: 1200 },
  { level: 4, label: "Expert",        min: 1200, max: 2000 },
  { level: 5, label: "Maître",        min: 2000, max: 99999 },
];

function getLevelInfo(xp: number) {
  return XP_LEVELS.find(l => xp >= l.min && xp < l.max) ?? XP_LEVELS[XP_LEVELS.length - 1];
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function getGreeting(firstName: string, t: (k: string) => string) {
  const h = new Date().getHours();
  const greet = h < 5
    ? t("greeting_night")
    : h < 12
    ? t("greeting_morning")
    : h < 18
    ? t("greeting_afternoon")
    : t("greeting_evening");
  return `${greet}${firstName ? ` ${firstName}` : ""}`;
}

function formatRelativeTime(iso: string) {
  const diffMins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (diffMins < 1) return "À l'instant";
  if (diffMins < 60) return `Il y a ${diffMins} min`;
  const h = Math.floor(diffMins / 60);
  if (h < 24) return `Il y a ${h}h`;
  const d = Math.floor(h / 24);
  return d === 1 ? "Hier" : `Il y a ${d}j`;
}

// ── Badge definitions ──────────────────────────────────────────────────────────

function computeBadges(stats: {
  questionsTotal: number;
  lessonsTotal: number;
  correctionsTotal: number;
  avgNote: number;
}) {
  const badges = [
    { id: "first_question", label: "Première question", emoji: "🎤", unlocked: stats.questionsTotal >= 1 },
    { id: "curious",        label: "Curieux",           emoji: "🔍", unlocked: stats.questionsTotal >= 10 },
    { id: "first_lesson",   label: "Premier cours",     emoji: "📖", unlocked: stats.lessonsTotal >= 1 },
    { id: "ten_lessons",    label: "10 cours complétés",emoji: "🏅", unlocked: stats.lessonsTotal >= 10 },
    { id: "first_correct",  label: "Première correction",emoji: "✏️", unlocked: stats.correctionsTotal >= 1 },
    { id: "perfect_note",   label: "Note parfaite",     emoji: "💯", unlocked: stats.avgNote >= 18 },
  ];
  return badges;
}

// ── Main ───────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const t = useTranslations("dashboard");
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName]           = useState("");
  const [plan, setPlan]                     = useState("free");
  const [niveau, setNiveau]                 = useState("1ere");
  const [streak, setStreak]                 = useState(0);
  const [questionsTotal, setQuestionsTotal] = useState(0);
  const [lessonsTotal, setLessonsTotal]     = useState(0);
  const [correctionsTotal, setCorrectionsTotal] = useState(0);
  const [avgNote, setAvgNote]               = useState(0);
  const [xp, setXp]                         = useState(0);
  const [recentLessons, setRecentLessons]   = useState<RecentLesson[]>([]);
  const [activity, setActivity]             = useState<ActivityItem[]>([]);
  const [lessonProgress, setLessonProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    const supabase = createClient();

    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/auth/login"); return; }

      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);

      const [
        profileRes, childRes,
        msgTotalRes, lessonsRes,
        correctionsRes, avgNoteRes,
        recentMsgsRes,
      ] = await Promise.all([
        supabase.from("profiles").select("full_name, plan").eq("id", user.id).single(),
        supabase.from("children").select("level").eq("parent_id", user.id).single(),
        supabase.from("messages").select("id", { count: "exact", head: true }).eq("user_id", user.id).eq("role", "user"),
        supabase.from("user_progress").select("matiere, niveau, chapitre, lecon, completed_at").eq("user_id", user.id).order("completed_at", { ascending: false }).limit(50),
        supabase.from("tashih_corrections").select("id, note, created_at, matiere").eq("user_id", user.id).order("created_at", { ascending: false }).limit(20),
        supabase.from("tashih_corrections").select("note").eq("user_id", user.id),
        supabase.from("messages").select("content, created_at").eq("user_id", user.id).eq("role", "user").order("created_at", { ascending: false }).limit(5),
      ]);

      // Basic profile
      const fullName = profileRes.data?.full_name ?? user.user_metadata?.full_name ?? user.email ?? "";
      setFirstName(fullName.split(" ")[0] || "");
      setPlan(profileRes.data?.plan ?? "free");
      setNiveau(childRes.data?.level ?? "1ere");

      // Stats
      const qTotal = (msgTotalRes as unknown as { count: number } | null)?.count ?? 0;
      setQuestionsTotal(qTotal);

      const allLessons = (lessonsRes.data as RecentLesson[]) ?? [];
      setLessonsTotal(allLessons.length);
      setRecentLessons(allLessons.slice(0, 3));

      // Lesson progress per matiere
      const counts: Record<string, number> = {};
      for (const r of allLessons) {
        const key = `${r.niveau}-${r.matiere}`;
        counts[key] = (counts[key] ?? 0) + 1;
      }
      setLessonProgress(counts);

      const allCorr = (correctionsRes.data as { id: string; note: number; created_at: string; matiere: string }[]) ?? [];
      setCorrectionsTotal(allCorr.length);

      const notes = (avgNoteRes.data as { note: number }[] ?? []).map(r => r.note).filter(n => n > 0);
      const avg = notes.length ? Math.round(notes.reduce((a, b) => a + b, 0) / notes.length) : 0;
      setAvgNote(avg);

      // XP
      const totalXp = qTotal * 10 + allLessons.length * 50 + allCorr.length * 30;
      setXp(totalXp);

      // Streak: count consecutive days with activity (simplified: count distinct days in last 30)
      const allDates = new Set([
        ...allLessons.map(l => l.completed_at.slice(0, 10)),
        ...allCorr.map(c => c.created_at.slice(0, 10)),
        ...(recentMsgsRes.data as { content: string; created_at: string }[] ?? []).map(m => m.created_at.slice(0, 10)),
      ]);
      // Count consecutive days ending today
      let s = 0;
      const today = new Date();
      for (let i = 0; i < 30; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const key = d.toISOString().slice(0, 10);
        if (allDates.has(key)) s++;
        else if (i > 0) break;
      }
      setStreak(s);

      // Activity feed — merge lessons + corrections + messages, sort by time
      const activityItems: ActivityItem[] = [];

      for (const l of allLessons.slice(0, 3)) {
        const meta = Object.values(SUBJECT_META).find(m => l.matiere.includes(m.id.slice(0, 4))) ??
          { icon: BookOpen, gradient: "from-blue-500 to-cyan-500", id: "" };
        activityItems.push({
          type: "lesson",
          label: `Leçon · ${l.matiere}`,
          sub: `Chapitre ${l.chapitre}, Leçon ${l.lecon}`,
          time: l.completed_at,
          icon: meta.icon,
          color: "text-blue-400",
        });
      }
      for (const c of allCorr.slice(0, 2)) {
        activityItems.push({
          type: "correction",
          label: `Correction · ${c.matiere}`,
          sub: `Note: ${c.note}/20`,
          time: c.created_at,
          icon: PenLine,
          color: "text-emerald-400",
        });
      }
      for (const m of (recentMsgsRes.data as { content: string; created_at: string }[] ?? []).slice(0, 2)) {
        activityItems.push({
          type: "chat",
          label: "Question à Nour",
          sub: m.content.slice(0, 50) + (m.content.length > 50 ? "…" : ""),
          time: m.created_at,
          icon: MessageCircle,
          color: "text-purple-400",
        });
      }
      activityItems.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
      setActivity(activityItems.slice(0, 5));

      setLoading(false);
    }

    load();
  }, [router]);

  const isPro = plan === "pro" || plan === "famille";
  const lvlInfo = getLevelInfo(xp);
  const xpInLevel = xp - lvlInfo.min;
  const xpToNext = lvlInfo.max - lvlInfo.min;
  const xpPct = Math.min(100, Math.round((xpInLevel / xpToNext) * 100));

  const badges = computeBadges({ questionsTotal, lessonsTotal, correctionsTotal, avgNote });
  const unlockedBadges = badges.filter(b => b.unlocked);

  // Recommended lessons: take subjects not yet started
  const subjects = CURRICULUM[niveau] ?? [];
  const recommended = subjects
    .filter(s => !lessonProgress[`${niveau}-${s.label}`])
    .slice(0, 3)
    .map(s => ({
      subject: s,
      chapter: s.chapters[0],
      lesson: s.chapters[0]?.lessons[0],
    }))
    .filter(r => r.chapter && r.lesson);

  if (loading) {
    return (
      <div className="p-6 space-y-6 max-w-5xl">
        <div className="space-y-2">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-4 w-36" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24" rounded="2xl" />
          ))}
        </div>
        <div className="grid lg:grid-cols-2 gap-4">
          <Skeleton className="h-48" rounded="2xl" />
          <Skeleton className="h-48" rounded="2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 lg:p-8 max-w-5xl space-y-7">

      {/* ── Greeting ── */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white">
            {getGreeting(firstName, t)} 👋
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {LEVEL_LABELS[niveau]} · {new Date().toLocaleDateString("fr-MA", { weekday: "long", day: "numeric", month: "long" })}
          </p>
        </div>
        {/* Streak */}
        {streak > 0 && (
          <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-2xl px-4 py-2.5">
            <Flame className="w-5 h-5 text-orange-400" />
            <div>
              <p className="text-orange-400 font-bold text-lg leading-none">{streak}</p>
              <p className="text-orange-400/60 text-xs">{streak === 1 ? t("streak_day") : t("streak_days")}</p>
            </div>
          </div>
        )}
      </div>

      {/* ── XP / Level bar ── */}
      <div className="bg-white/3 border border-white/8 rounded-2xl p-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center shrink-0">
            <Star className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-semibold text-white">
                Niveau {lvlInfo.level} · {lvlInfo.label}
              </span>
              <span className="text-xs text-blue-400 font-bold">{xp} XP</span>
            </div>
            <ProgressBar
              value={xpPct}
              gradient="from-blue-500 to-emerald-500"
              size="md"
              animated
            />
            <p className="text-xs text-gray-600 mt-1">
              {xpInLevel} / {xpToNext} XP pour le niveau {Math.min(lvlInfo.level + 1, 5)}
            </p>
          </div>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: t("stats.questions"),   value: questionsTotal,                         icon: MessageCircle, color: "text-purple-400", bg: "bg-purple-500/10" },
          { label: t("stats.courses"),     value: lessonsTotal,                           icon: BookOpen,      color: "text-blue-400",   bg: "bg-blue-500/10"   },
          { label: t("stats.corrections"), value: correctionsTotal,                       icon: PenLine,       color: "text-emerald-400",bg: "bg-emerald-500/10"},
          { label: t("stats.avg_note"),    value: avgNote > 0 ? `${avgNote}/20` : "—",   icon: TrendingUp,    color: "text-amber-400",  bg: "bg-amber-500/10"  },
        ].map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white/3 border border-white/8 rounded-2xl p-4">
              <div className={`w-9 h-9 ${s.bg} rounded-xl flex items-center justify-center mb-3`}>
                <Icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <p className="text-2xl font-extrabold text-white leading-none">{s.value}</p>
              <p className="text-gray-500 text-xs mt-1">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* ── Continuer / Recommandé ── */}
      <div className="grid lg:grid-cols-2 gap-5">

        {/* Dernières leçons */}
        <div className="bg-white/3 border border-white/8 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold text-sm flex items-center gap-2">
              <PlayCircle className="w-4 h-4 text-blue-400" />
              {t("continue")}
            </h2>
            <Link href="/dashboard/cours" className="text-xs text-gray-500 hover:text-white transition-colors">
              Tout voir →
            </Link>
          </div>

          {recentLessons.length === 0 ? (
            <div className="text-center py-6">
              <BookOpen className="w-8 h-8 text-gray-700 mx-auto mb-2" />
              <p className="text-gray-600 text-sm">{t("no_lessons")}</p>
              <Link
                href="/cours"
                className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
              >
                {t("browse_courses")} <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {recentLessons.map((l, i) => {
                const meta = Object.entries(SUBJECT_META).find(([k]) => l.matiere === k)?.[1]
                  ?? Object.values(SUBJECT_META)[0];
                const Icon = meta.icon;
                return (
                  <Link
                    key={i}
                    href={`/cours/${meta.id}/${l.niveau}/${l.chapitre}/${l.lecon}`}
                    className="flex items-center gap-3 p-3 bg-white/3 hover:bg-white/6 border border-white/8 rounded-xl transition-colors group"
                  >
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${meta.gradient} flex items-center justify-center shrink-0`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-semibold truncate">{l.matiere}</p>
                      <p className="text-gray-500 text-xs">Ch. {l.chapitre} · Leçon {l.lecon}</p>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-white transition-colors shrink-0" />
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Recommandé */}
        <div className="bg-white/3 border border-white/8 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              {t("recommended")}
            </h2>
          </div>

          {recommended.length === 0 ? (
            <div className="text-center py-6">
              <Award className="w-8 h-8 text-amber-400/50 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">Tu as tout commencé 🎉</p>
            </div>
          ) : (
            <div className="space-y-2">
              {recommended.map((r, i) => {
                const meta = SUBJECT_META[r.subject.label] ?? Object.values(SUBJECT_META)[0];
                const Icon = meta.icon;
                return (
                  <Link
                    key={i}
                    href={`/cours/${meta.id}/${niveau}/1/1`}
                    className="flex items-center gap-3 p-3 bg-white/3 hover:bg-white/6 border border-white/8 rounded-xl transition-colors group"
                  >
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${meta.gradient} flex items-center justify-center shrink-0`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-semibold">{r.subject.label}</p>
                      <p className="text-gray-500 text-xs truncate">{r.chapter.title}</p>
                    </div>
                    <span className="shrink-0 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-0.5">
                      Gratuit
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── Activity + Badges ── */}
      <div className="grid lg:grid-cols-2 gap-5">

        {/* Activité récente */}
        <div className="bg-white/3 border border-white/8 rounded-2xl p-5">
          <h2 className="text-white font-semibold text-sm flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-gray-400" />
            {t("activity")}
          </h2>

          {activity.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-600 text-sm">Aucune activité pour l'instant</p>
              <Link href="/chat" className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold text-blue-400">
                Poser ma première question →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {activity.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-7 h-7 bg-white/5 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-medium">{item.label}</p>
                      <p className="text-gray-600 text-xs truncate">{item.sub}</p>
                    </div>
                    <span className="text-gray-600 text-xs shrink-0">{formatRelativeTime(item.time)}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Badges */}
        <div className="bg-white/3 border border-white/8 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold text-sm flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              {t("badges")}
            </h2>
            <span className="text-xs text-gray-500">{unlockedBadges.length}/{badges.length}</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {badges.map(b => (
              <div
                key={b.id}
                className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border text-center transition-all ${
                  b.unlocked
                    ? "bg-amber-500/10 border-amber-500/20"
                    : "bg-white/3 border-white/8 opacity-40 grayscale"
                }`}
              >
                <span className="text-2xl leading-none">{b.emoji}</span>
                <span className={`text-xs font-medium leading-snug ${b.unlocked ? "text-amber-300" : "text-gray-600"}`}>
                  {b.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Quick actions ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Link
          href="/chat"
          className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-900/30 to-blue-900/10 border border-blue-500/20 rounded-2xl hover:border-blue-500/40 transition-all group"
        >
          <div className="w-10 h-10 bg-blue-500/15 rounded-xl flex items-center justify-center shrink-0">
            <MessageCircle className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <p className="text-white text-sm font-semibold">{t("ask_nour")}</p>
            <p className="text-blue-400/60 text-xs">Nour répond en Darija</p>
          </div>
          <ChevronRight className="ml-auto w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
        </Link>

        <Link
          href="/tashih"
          className="flex items-center gap-3 p-4 bg-gradient-to-br from-emerald-900/30 to-emerald-900/10 border border-emerald-500/20 rounded-2xl hover:border-emerald-500/40 transition-all group"
        >
          <div className="w-10 h-10 bg-emerald-500/15 rounded-xl flex items-center justify-center shrink-0">
            <PenLine className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <p className="text-white text-sm font-semibold">{t("correct_exercise")}</p>
            <p className="text-emerald-400/60 text-xs">Note + correction IA</p>
          </div>
          <ChevronRight className="ml-auto w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
        </Link>

        <Link
          href="/cours"
          className="flex items-center gap-3 p-4 bg-gradient-to-br from-violet-900/30 to-violet-900/10 border border-violet-500/20 rounded-2xl hover:border-violet-500/40 transition-all group"
        >
          <div className="w-10 h-10 bg-violet-500/15 rounded-xl flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <p className="text-white text-sm font-semibold">{t("explore_courses")}</p>
            <p className="text-violet-400/60 text-xs">7 matières · 550+ leçons</p>
          </div>
          <ChevronRight className="ml-auto w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
        </Link>
      </div>
    </div>
  );
}
