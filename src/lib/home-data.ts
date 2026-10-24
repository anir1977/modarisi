import { NATIONAL_EXAMS } from "@/lib/exams";
import { CONCEPTS, MODULES } from "@/lib/philo";
import { HG_LESSONS } from "@/lib/hg";

// Real content listings used on the home page.
export const TRACKS = [
  { href: "/calculateur", label: "علوم فيزيائية" },
  { href: "/calculateur", label: "علوم الحياة والأرض" },
  { href: "/calculateur", label: "علوم رياضية" },
  { href: "/calculateur", label: "اقتصاد وتدبير" },
  { href: "/calculateur/lettres-sciences-humaines", label: "آداب وعلوم إنسانية" },
  { href: "/calculateur/bac-libre", label: "باك حر" },
];

export const EXAMS = [...NATIONAL_EXAMS]
  .sort((a, b) => b.year - a.year)
  .map((e) => ({
    href: `/examens/${e.slug}`,
    year: e.year,
    subject: e.subject,
    track: e.trackAr.replace(/^مسلك /, ""),
    session: e.session,
  }));

export const PHILO = MODULES.map((m) => ({
  name: m.name,
  short: m.name.replace("مجزوءة ", ""),
  concepts: CONCEPTS.filter((c) => c.module === m.name).map((c) => ({
    name: c.name,
    href: `/dourous/falsafa/${c.slug}`,
  })),
}));

export const HISTORY = HG_LESSONS.filter((l) => l.branch === "history")
  .sort((a, b) => a.order - b.order)
  .map((l) => ({ title: l.title, href: `/dourous/tarikh-jughrafiya/${l.slug}`, order: l.order }));

export const FEATURED = (() => {
  const exam = NATIONAL_EXAMS.find((e) => e.subject === "الفلسفة" && e.year === 2024) ?? NATIONAL_EXAMS[0];
  const part = exam.parts[0];
  return {
    href: `/examens/${exam.slug}#part-1`,
    label: `${part.label} · ${exam.subject} ${exam.year}`,
    prompt: part.prompt,
    note: part.correction[0]?.points[0] ?? "",
  };
})();

export const STATS = {
  exams: NATIONAL_EXAMS.length,
  concepts: CONCEPTS.length,
  history: HG_LESSONS.filter((l) => l.branch === "history").length,
};
