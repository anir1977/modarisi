"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  TrendingUp, BookOpen, PenLine, MessageCircle,
  Target, Calendar,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Skeleton } from "@/components/ui/Skeleton";
import { CURRICULUM } from "@/lib/curriculum";

// ── Types ──────────────────────────────────────────────────────────────────────

type DailyActivity = { date: string; lessons: number; corrections: number; questions: number };

// ── Helpers ────────────────────────────────────────────────────────────────────

function getLast7Days() {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().slice(0, 10);
  });
}

function getLast12Weeks() {
  return Array.from({ length: 12 * 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (12 * 7 - 1 - i));
    return d.toISOString().slice(0, 10);
  });
}

function dayLabel(iso: string) {
  return new Date(iso).toLocaleDateString("fr-MA", { weekday: "short" });
}

function intensity(count: number) {
  if (count === 0) return "bg-white/5 border-white/8";
  if (count <= 1)  return "bg-emerald-900/60 border-emerald-700/40";
  if (count <= 3)  return "bg-emerald-700/70 border-emerald-600/40";
  if (count <= 5)  return "bg-emerald-500/80 border-emerald-400/40";
  return "bg-emerald-400 border-emerald-300/40";
}

// ── SVG Bar Chart ──────────────────────────────────────────────────────────────

function WeeklyBarChart({ data }: { data: { date: string; total: number }[] }) {
  const maxVal = Math.max(...data.map(d => d.total), 1);
  const chartH = 100;

  return (
    <svg viewBox={`0 0 ${data.length * 36} ${chartH + 30}`} className="w-full" preserveAspectRatio="none">
      {data.map((d, i) => {
        const barH = Math.max(4, (d.total / maxVal) * chartH);
        const x = i * 36 + 6;
        const y = chartH - barH;
        return (
          <g key={d.date}>
            {/* Bar */}
            <rect
              x={x} y={y} width={24} height={barH}
              rx={4} ry={4}
              fill={d.total > 0 ? "url(#barGrad)" : "rgba(255,255,255,0.04)"}
            />
            {/* Value label */}
            {d.total > 0 && (
              <text
                x={x + 12} y={y - 4}
                textAnchor="middle"
                className="fill-white/50 text-[8px]"
                style={{ fontSize: 8 }}
              >
                {d.total}
              </text>
            )}
            {/* Day label */}
            <text
              x={x + 12} y={chartH + 16}
              textAnchor="middle"
              className="fill-gray-500"
              style={{ fontSize: 9 }}
            >
              {dayLabel(d.date)}
            </text>
          </g>
        );
      })}
      <defs>
        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ── GitHub-style contribution calendar ────────────────────────────────────────

function ActivityCalendar({ data }: { data: Record<string, number> }) {
  const days = getLast12Weeks();

  // Group into weeks (7-day columns)
  const weeks: string[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-1 min-w-fit">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map(day => (
              <div
                key={day}
                title={`${day}: ${data[day] ?? 0} action(s)`}
                className={`w-3 h-3 rounded-sm border ${intensity(data[day] ?? 0)} transition-colors cursor-default`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 mt-3">
        <span className="text-xs text-gray-600">Moins</span>
        {["bg-white/5", "bg-emerald-900/60", "bg-emerald-700/70", "bg-emerald-500/80", "bg-emerald-400"].map(c => (
          <div key={c} className={`w-3 h-3 rounded-sm ${c}`} />
        ))}
        <span className="text-xs text-gray-600">Plus</span>
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────

export default function ProgressionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [niveau, setNiveau] = useState("1ere");
  const [weeklyData, setWeeklyData] = useState<{ date: string; total: number }[]>([]);
  const [calendarData, setCalendarData] = useState<Record<string, number>>({});
  const [subjectProgress, setSubjectProgress] = useState<{ label: string; gradient: string; pct: number; completed: number; total: number }[]>([]);
  const [stats, setStats] = useState({ questions: 0, lessons: 0, corrections: 0, streak: 0 });
  const [weeklyGoal, setWeeklyGoal] = useState({ done: 0, target: 5 });

  useEffect(() => {
    const supabase = createClient();

    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/auth/login"); return; }

      const [childRes, lessonsRes, correctionsRes, msgsRes] = await Promise.all([
        supabase.from("children").select("level").eq("parent_id", user.id).single(),
        supabase.from("user_progress").select("matiere, niveau, completed_at").eq("user_id", user.id),
        supabase.from("tashih_corrections").select("created_at").eq("user_id", user.id),
        supabase.from("messages").select("created_at").eq("user_id", user.id).eq("role", "user"),
      ]);

      const niv = childRes.data?.level ?? "1ere";
      setNiveau(niv);

      const lessons = (lessonsRes.data as { matiere: string; niveau: string; completed_at: string }[]) ?? [];
      const corrections = (correctionsRes.data as { created_at: string }[]) ?? [];
      const msgs = (msgsRes.data as { created_at: string }[]) ?? [];

      // ── Calendar data (last 12 weeks)
      const calMap: Record<string, number> = {};
      for (const l of lessons)     calMap[l.completed_at.slice(0, 10)] = (calMap[l.completed_at.slice(0, 10)] ?? 0) + 1;
      for (const c of corrections) calMap[c.created_at.slice(0, 10)]  = (calMap[c.created_at.slice(0, 10)] ?? 0) + 1;
      for (const m of msgs)        calMap[m.created_at.slice(0, 10)]  = (calMap[m.created_at.slice(0, 10)] ?? 0) + 1;
      setCalendarData(calMap);

      // ── Weekly chart (last 7 days)
      const last7 = getLast7Days();
      const weekly = last7.map(date => ({
        date,
        total: (calMap[date] ?? 0),
      }));
      setWeeklyData(weekly);

      // ── Weekly goal
      const thisWeekTotal = weekly.reduce((a, b) => a + b.total, 0);
      setWeeklyGoal({ done: thisWeekTotal, target: 5 });

      // ── Streak
      const allDates = new Set(Object.keys(calMap));
      let streak = 0;
      const today = new Date();
      for (let i = 0; i < 60; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const key = d.toISOString().slice(0, 10);
        if (allDates.has(key)) streak++;
        else if (i > 0) break;
      }

      setStats({ questions: msgs.length, lessons: lessons.length, corrections: corrections.length, streak });

      // ── Subject progress
      const subjects = CURRICULUM[niv] ?? [];
      const lessonCountByMatiere: Record<string, number> = {};
      for (const l of lessons.filter(l => l.niveau === niv)) {
        lessonCountByMatiere[l.matiere] = (lessonCountByMatiere[l.matiere] ?? 0) + 1;
      }

      const sp = subjects.map(s => {
        const total = s.chapters.reduce((a, c) => a + c.lessons.length, 0);
        const completed = lessonCountByMatiere[s.label] ?? 0;
        return {
          label: s.label,
          gradient: s.gradient,
          pct: total > 0 ? Math.round((completed / total) * 100) : 0,
          completed,
          total,
        };
      });
      setSubjectProgress(sp);

      setLoading(false);
    }

    load();
  }, [router]);

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20" rounded="2xl" />)}
        </div>
        <Skeleton className="h-48" rounded="2xl" />
        <Skeleton className="h-64" rounded="2xl" />
      </div>
    );
  }

  const weeklyPct = Math.min(100, Math.round((weeklyGoal.done / weeklyGoal.target) * 100));

  return (
    <div className="p-5 lg:p-8 space-y-7 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-white">📊 Progression</h1>
        <p className="text-gray-500 text-sm mt-1">Suis ton évolution semaine après semaine</p>
      </div>

      {/* ── Global stats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Questions",    value: stats.questions,   icon: MessageCircle, color: "text-purple-400", bg: "bg-purple-500/10" },
          { label: "Leçons",       value: stats.lessons,     icon: BookOpen,      color: "text-blue-400",   bg: "bg-blue-500/10" },
          { label: "Corrections",  value: stats.corrections, icon: PenLine,       color: "text-emerald-400",bg: "bg-emerald-500/10" },
          { label: "Jours streak", value: stats.streak,      icon: TrendingUp,    color: "text-orange-400", bg: "bg-orange-500/10" },
        ].map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white/3 border border-white/8 rounded-2xl p-4 flex items-center gap-3">
              <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center shrink-0`}>
                <Icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-white leading-none">{s.value}</p>
                <p className="text-gray-500 text-xs mt-0.5">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Weekly chart + goal ── */}
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white/3 border border-white/8 rounded-2xl p-5">
          <h2 className="text-white font-semibold text-sm mb-4">Activité des 7 derniers jours</h2>
          <WeeklyBarChart data={weeklyData} />
        </div>

        <div className="bg-white/3 border border-white/8 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-4 h-4 text-blue-400" />
            <h2 className="text-white font-semibold text-sm">Objectif hebdo</h2>
          </div>

          <div className="flex items-center justify-center my-4">
            {/* Circular progress */}
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                <circle
                  cx="32" cy="32" r="26" fill="none"
                  stroke={weeklyPct >= 100 ? "#10b981" : "#3b82f6"}
                  strokeWidth="6"
                  strokeDasharray={`${(weeklyPct / 100) * 2 * Math.PI * 26} ${2 * Math.PI * 26}`}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dasharray 0.7s ease" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-white font-bold text-lg leading-none">{weeklyPct}%</span>
                <span className="text-gray-600 text-xs">complété</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-center">
            <p className="text-white text-2xl font-extrabold">{weeklyGoal.done}</p>
            <p className="text-gray-500 text-xs">sur {weeklyGoal.target} actions cette semaine</p>
          </div>

          {weeklyPct >= 100 && (
            <div className="mt-3 text-center text-emerald-400 text-xs font-semibold">
              🎉 Objectif atteint !
            </div>
          )}
        </div>
      </div>

      {/* ── Subject progress bars ── */}
      <div className="bg-white/3 border border-white/8 rounded-2xl p-5">
        <h2 className="text-white font-semibold text-sm mb-5 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-400" />
          Progression par matière
        </h2>
        <div className="space-y-4">
          {subjectProgress.map(s => (
            <div key={s.label}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-gray-300 text-xs font-medium">{s.label}</span>
                <span className="text-xs text-gray-500">{s.completed}/{s.total} leçons</span>
              </div>
              <ProgressBar
                value={s.pct}
                gradient={s.gradient}
                size="md"
                showValue
                animated
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Activity calendar ── */}
      <div className="bg-white/3 border border-white/8 rounded-2xl p-5">
        <h2 className="text-white font-semibold text-sm mb-5 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-emerald-400" />
          Calendrier d'activité · 12 semaines
        </h2>
        <ActivityCalendar data={calendarData} />
      </div>
    </div>
  );
}
