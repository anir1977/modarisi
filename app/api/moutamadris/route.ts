/**
 * /api/moutamadris — internal curriculum catalog API
 *
 * Returns the Modarisi curriculum structure for a given niveau, enriched
 * with which lessons are already cached in Supabase (isCached flag). The
 * frontend uses this to show "instant" vs "will be generated" indicators.
 *
 * No external requests — everything comes from CURRICULUM + Supabase.
 */

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { CURRICULUM } from "@/lib/curriculum";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const niveau  = searchParams.get("niveau")  || "1ere";
  const matiere = searchParams.get("matiere") || "";

  const allSubjects = CURRICULUM[niveau] ?? [];
  const subjects    = matiere
    ? allSubjects.filter((s) => s.id === matiere)
    : allSubjects;

  // ── Query Supabase for cached lessons ────────────────────────────────────
  let cachedSet = new Set<string>();
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("cours_content")
      .select("matiere, chapitre, lecon")
      .eq("niveau", niveau);

    if (data) {
      cachedSet = new Set(data.map((r) => `${r.matiere}:${r.chapitre}:${r.lecon}`));
    }
  } catch {
    // Continue without cache status — non-fatal
  }

  // ── Build response ───────────────────────────────────────────────────────
  const result = subjects.map((subject) => {
    const totalLessons = subject.chapters.reduce((a, c) => a + c.lessons.length, 0);
    const cachedCount  = subject.chapters.reduce((a, ch) =>
      a + ch.lessons.filter((l) => cachedSet.has(`${subject.id}:${ch.id}:${l.id}`)).length, 0,
    );

    return {
      id:           subject.id,
      label:        subject.label,
      labelAr:      subject.labelAr,
      gradient:     subject.gradient,
      totalLessons,
      cachedCount,
      chapters: subject.chapters.map((ch) => ({
        id:    ch.id,
        title: ch.title,
        lessons: ch.lessons.map((l) => ({
          id:       l.id,
          title:    l.title,
          duration: l.duration,
          isFree:   l.isFree,
          isCached: cachedSet.has(`${subject.id}:${ch.id}:${l.id}`),
          href:     `/cours/${subject.id}/${niveau}/${ch.id}/${l.id}`,
        })),
      })),
    };
  });

  return NextResponse.json({ subjects: result, niveau });
}
