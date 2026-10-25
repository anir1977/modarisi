import type { MetadataRoute } from "next";
import { NATIONAL_EXAMS } from "@/lib/exams";
import { CONCEPTS } from "@/lib/philo";
import { HG_LESSONS } from "@/lib/hg";
import { SCI_LESSONS, SCI_SUBJECTS } from "@/lib/sciences";

const BASE = "https://www.modarisi.ma";

const ROUTES: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/calculateur", priority: 0.9, changeFrequency: "monthly" },
  { path: "/calculateur/lettres-sciences-humaines", priority: 0.9, changeFrequency: "monthly" },
  { path: "/calculateur/bac-libre", priority: 0.9, changeFrequency: "monthly" },
  { path: "/coefficients", priority: 0.9, changeFrequency: "monthly" },
  { path: "/simulateur", priority: 0.8, changeFrequency: "monthly" },
  { path: "/examens", priority: 0.8, changeFrequency: "weekly" },
  { path: "/tuteur", priority: 0.7, changeFrequency: "monthly" },
  { path: "/filieres", priority: 0.6, changeFrequency: "monthly" },
  { path: "/maraji3", priority: 0.5, changeFrequency: "monthly" },
  { path: "/charte", priority: 0.3, changeFrequency: "yearly" },
  { path: "/about", priority: 0.3, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const exams = NATIONAL_EXAMS.map((e) => ({ path: `/examens/${e.slug}`, priority: 0.8, changeFrequency: "yearly" as const }));
  const lessons = [
    { path: "/dourous", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/dourous/falsafa", priority: 0.8, changeFrequency: "monthly" as const },
    ...CONCEPTS.map((c) => ({ path: `/dourous/falsafa/${c.slug}`, priority: 0.8, changeFrequency: "yearly" as const })),
    { path: "/dourous/tarikh-jughrafiya", priority: 0.8, changeFrequency: "monthly" as const },
    ...HG_LESSONS.map((l) => ({ path: `/dourous/tarikh-jughrafiya/${l.slug}`, priority: 0.7, changeFrequency: "yearly" as const })),
    ...SCI_SUBJECTS.map((s) => ({ path: `/dourous/${s.slug}`, priority: 0.8, changeFrequency: "monthly" as const })),
    ...SCI_LESSONS.map((l) => ({
      path: `/dourous/${SCI_SUBJECTS.find((s) => s.id === l.subject)!.slug}/${l.slug}`,
      priority: 0.7,
      changeFrequency: "yearly" as const,
    })),
  ];
  return [...ROUTES, ...exams, ...lessons].map((r) => ({
    url: `${BASE}${r.path}`,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
