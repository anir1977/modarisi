// Pure calculation helpers for the Moroccan baccalaureate (no React, easy to test).

export type WeightedGrade = { grade: number; coef: number };

export const clampGrade = (g: number) => Math.min(20, Math.max(0, Number.isFinite(g) ? g : 0));

/** Weighted average of the national exam subjects. */
export function nationalAverage(subjects: WeightedGrade[]): number {
  let points = 0;
  let coefs = 0;
  for (const s of subjects) {
    points += clampGrade(s.grade) * s.coef;
    coefs += s.coef;
  }
  return coefs > 0 ? points / coefs : 0;
}

/** General bac average for regular (scolarisé) candidates: 25% regional + 25% continuous assessment + 50% national. */
export function bacAverage(regional: number, continuous: number, national: number): number {
  return clampGrade(regional) * 0.25 + clampGrade(continuous) * 0.25 + clampGrade(national) * 0.5;
}

/** Selection score commonly used by post-bac schools: 75% national + 25% regional. Not universal. */
export function selectionScore(regional: number, national: number): number {
  return clampGrade(national) * 0.75 + clampGrade(regional) * 0.25;
}

export type Mention = { key: "tb" | "b" | "ab" | "p" | "fail"; label: string; short: string };

export function mentionFor(avg: number): Mention {
  if (avg >= 16) return { key: "tb", label: "ميزة حسن جداً (Très Bien)", short: "حسن جداً 🏆" };
  if (avg >= 14) return { key: "b", label: "ميزة حسن (Bien)", short: "حسن 🌟" };
  if (avg >= 12) return { key: "ab", label: "ميزة مستحسن (Assez Bien)", short: "مستحسن 👍" };
  if (avg >= 10) return { key: "p", label: "ميزة مقبول (Passable)", short: "ناجح 🎓" };
  return { key: "fail", label: "أقل من 10 : راجع شروط الدورة الاستدراكية", short: "أقل من 10 ⚠️" };
}

/**
 * General average for candidats libres: no continuous assessment; regional and national
 * exams count as one exam, each subject weighted by its coefficient.
 */
export function libreAverage(subjects: WeightedGrade[]): number {
  return nationalAverage(subjects);
}
