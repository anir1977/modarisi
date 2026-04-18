"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Calculator, Atom, FlaskConical, BookMarked, BookOpen,
  Landmark, Globe, ChevronRight, Sparkles,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Skeleton } from "@/components/ui/Skeleton";
import { CURRICULUM, LEVELS } from "@/lib/curriculum";

const SUBJECT_ICONS: Record<string, React.ElementType> = {
  maths: Calculator, pc: Atom, svt: FlaskConical,
  francais: BookMarked, arabe: BookOpen, islam: Landmark, hg: Globe,
};

export default function DashboardCoursPage() {
  const router = useRouter();
  const [niveau, setNiveau] = useState("1ere");
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/auth/login"); return; }

      const [childRes, progressRes] = await Promise.all([
        supabase.from("children").select("level").eq("parent_id", user.id).single(),
        supabase.from("user_progress").select("matiere, niveau").eq("user_id", user.id),
      ]);

      setNiveau(childRes.data?.level ?? "1ere");

      const counts: Record<string, number> = {};
      for (const row of (progressRes.data ?? [])) {
        const key = `${row.niveau}-${row.matiere}`;
        counts[key] = (counts[key] ?? 0) + 1;
      }
      setProgress(counts);
      setLoading(false);
    }
    load();
  }, [router]);

  const subjects = CURRICULUM[niveau] ?? [];
  const niveauLabel = LEVELS.find(l => l.id === niveau)?.label ?? niveau;

  if (loading) {
    return (
      <div className="p-6 grid grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 7 }).map((_, i) => <Skeleton key={i} className="h-40" rounded="2xl" />)}
      </div>
    );
  }

  return (
    <div className="p-5 lg:p-8 space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-extrabold text-white">📚 Mes cours</h1>
        <p className="text-gray-500 text-sm mt-1">{niveauLabel}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {subjects.map(subject => {
          const Icon = SUBJECT_ICONS[subject.id] ?? BookOpen;
          const total = subject.chapters.reduce((a, c) => a + c.lessons.length, 0);
          const completed = progress[`${niveau}-${subject.label}`] ?? 0;
          const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

          return (
            <Link
              key={subject.id}
              href={`/cours/${subject.id}/${niveau}`}
              className="group bg-white/3 border border-white/8 rounded-2xl p-5 hover:bg-white/6 hover:border-white/20 transition-all"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${subject.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold text-sm mb-0.5">{subject.label}</h3>
              <p className="text-gray-600 text-xs mb-3">{subject.chapters.length} chapitres</p>

              {pct > 0 ? (
                <>
                  <ProgressBar value={pct} gradient={subject.gradient} size="sm" animated />
                  <p className="text-xs text-gray-600 mt-1.5">{completed}/{total} leçons</p>
                </>
              ) : (
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Sparkles className="w-3 h-3 text-blue-500" />
                  Commencer
                </div>
              )}

              <ChevronRight className="absolute top-5 right-4 w-4 h-4 text-gray-700 group-hover:text-gray-400 transition-colors" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
