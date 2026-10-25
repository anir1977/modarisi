import type { SciLesson, SciSubject } from "./types";
import { MATH_LESSONS } from "./math";
import { PC_LESSONS } from "./pc";

export const SCI_SUBJECTS: SciSubject[] = [
  {
    id: "math",
    slug: "riyadiyat",
    name: "الرياضيات",
    tracks: "علوم فيزيائية · علوم الحياة والأرض · علوم زراعية",
    about: "ملخصات دروس الرياضيات الثانية باكالوريا علوم تجريبية: التحليل (النهايات، الاشتقاق، المتتاليات، ln، exp، التكامل) والجبر والهندسة (الأعداد العقدية، الهندسة الفضائية، الاحتمالات).",
    parts: ["التحليل", "الجبر والهندسة"],
  },
  {
    id: "pc",
    slug: "fizyae-kimyae",
    name: "الفيزياء والكيمياء",
    tracks: "علوم فيزيائية · علوم الحياة والأرض",
    about: "ملخصات دروس الفيزياء والكيمياء الثانية باكالوريا: الموجات، التحولات النووية، الكهرباء (RC، RL، RLC)، الميكانيك (نيوتن، السقوط، الأقمار، التذبذبات) والكيمياء (السرعة، التوازن، حمض-قاعدة، الأعمدة، الأسترة).",
    parts: ["الموجات", "التحولات النووية", "الكهرباء", "الميكانيك", "الكيمياء"],
  },
];

export const SCI_LESSONS: SciLesson[] = [...MATH_LESSONS, ...PC_LESSONS];

export const subjectBySlug = (slug: string) => SCI_SUBJECTS.find((s) => s.slug === slug);
export const lessonsOf = (id: SciSubject["id"]) =>
  SCI_LESSONS.filter((l) => l.subject === id).sort((a, b) => a.order - b.order);
export const sciLesson = (subjectSlug: string, slug: string) => {
  const s = subjectBySlug(subjectSlug);
  return s ? SCI_LESSONS.find((l) => l.subject === s.id && l.slug === slug) : undefined;
};
