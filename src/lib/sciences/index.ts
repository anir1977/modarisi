import type { SciLesson, SciSubject } from "./types";
import { MATH_LESSONS } from "./math";

export const SCI_SUBJECTS: SciSubject[] = [
  {
    id: "math",
    slug: "riyadiyat",
    name: "الرياضيات",
    tracks: "علوم فيزيائية · علوم الحياة والأرض · علوم زراعية",
    about: "ملخصات دروس الرياضيات الثانية باكالوريا علوم تجريبية: التحليل (النهايات، الاشتقاق، المتتاليات، ln، exp، التكامل) والجبر والهندسة (الأعداد العقدية، الهندسة الفضائية، الاحتمالات).",
    parts: ["التحليل", "الجبر والهندسة"],
  },
];

export const SCI_LESSONS: SciLesson[] = [...MATH_LESSONS];

export const subjectBySlug = (slug: string) => SCI_SUBJECTS.find((s) => s.slug === slug);
export const lessonsOf = (id: SciSubject["id"]) =>
  SCI_LESSONS.filter((l) => l.subject === id).sort((a, b) => a.order - b.order);
export const sciLesson = (subjectSlug: string, slug: string) => {
  const s = subjectBySlug(subjectSlug);
  return s ? SCI_LESSONS.find((l) => l.subject === s.id && l.slug === slug) : undefined;
};
