import type { SciLesson, SciSubject } from "./types";
import { MATH_LESSONS } from "./math";
import { PC_LESSONS } from "./pc";
import { SVT_LESSONS } from "./svt";
import { AR_LESSONS } from "./ar";
import { EN_LESSONS } from "./en";
import { FR_LESSONS } from "./fr";
import { MATH_DEEP_1 } from "./deep/math-1";
import { MATH_DEEP_2 } from "./deep/math-2";
import { MATH_DEEP_3 } from "./deep/math-3";
import { PC_DEEP_1 } from "./deep/pc-1";
import { PC_DEEP_2 } from "./deep/pc-2";
import { PC_DEEP_3 } from "./deep/pc-3";
import { PC_DEEP_4 } from "./deep/pc-4";
import { SVT_DEEP_1 } from "./deep/svt-1";
import { SVT_DEEP_2 } from "./deep/svt-2";
import { SVT_DEEP_3 } from "./deep/svt-3";

// Full lesson content (explanations, examples, exercises) merged over the summaries by slug.
const DEEP: Record<string, Partial<SciLesson>> = { ...MATH_DEEP_1, ...MATH_DEEP_2, ...MATH_DEEP_3, ...PC_DEEP_1, ...PC_DEEP_2, ...PC_DEEP_3, ...PC_DEEP_4, ...SVT_DEEP_1, ...SVT_DEEP_2, ...SVT_DEEP_3 };

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
  {
    id: "svt",
    slug: "ulum-al-hayat-wa-al-ard",
    name: "علوم الحياة والأرض",
    tracks: "مسلك علوم الحياة والأرض · مسلك العلوم الفيزيائية",
    about: "ملخصات دروس علوم الحياة والأرض الثانية باكالوريا: استهلاك المادة العضوية وتدفق الطاقة، الخبر الوراثي والهندسة الوراثية، قوانين الوراثة، علم وراثة الساكنة، علم المناعة، الجيولوجيا، والبيئة.",
    parts: ["استهلاك المادة العضوية وتدفق الطاقة", "الخبر الوراثي", "نقل الخبر الوراثي وقوانين الوراثة", "علم المناعة", "الجيولوجيا", "استعمال المواد العضوية وغير العضوية"],
  },
  {
    id: "ar",
    slug: "al-arabiya",
    name: "اللغة العربية",
    tracks: "مسلك الآداب · مسلك العلوم الإنسانية",
    about: "دروس اللغة العربية الثانية باكالوريا آداب وعلوم إنسانية: مراحل الشعر العربي الحديث (إحياء النموذج، سؤال الذات، تكسير البنية، تحديث الرؤيا)، مؤلف ظاهرة الشعر الحديث، ومنهجية تحليل النص الشعري.",
    parts: ["الشعر العربي الحديث", "المؤلفات: ظاهرة الشعر الحديث", "المنهجية"],
  },
  {
    id: "en",
    slug: "anglais",
    name: "اللغة الإنجليزية",
    tracks: "All tracks · جميع الشعب",
    about: "English lessons for the 2nd year bac (Morocco): conditionals, passive voice, reported speech, relative clauses, linking words, modals, functions, unit vocabulary and writing.",
    parts: ["Grammar", "Functions", "Vocabulary", "Writing"],
    dir: "ltr",
  },
  {
    id: "fr",
    slug: "francais-1bac",
    name: "اللغة الفرنسية",
    level: "الأولى باكالوريا",
    tracks: "1re année bac · examen régional · toutes les filières",
    about: "Cours de français 1re année bac (examen régional) : Le Dernier Jour d'un condamné, Antigone, Il était une fois un vieux couple heureux, et la méthodologie de l'examen.",
    parts: ["Les œuvres", "Méthodologie"],
    dir: "ltr",
  },
];

export const SCI_LESSONS: SciLesson[] = [...MATH_LESSONS, ...PC_LESSONS, ...SVT_LESSONS, ...AR_LESSONS, ...EN_LESSONS, ...FR_LESSONS].map(
  (l) => ({ ...l, ...(DEEP[l.slug] ?? {}) }),
);

export const subjectBySlug = (slug: string) => SCI_SUBJECTS.find((s) => s.slug === slug);
export const lessonsOf = (id: SciSubject["id"]) =>
  SCI_LESSONS.filter((l) => l.subject === id).sort((a, b) => a.order - b.order);
export const sciLesson = (subjectSlug: string, slug: string) => {
  const s = subjectBySlug(subjectSlug);
  return s ? SCI_LESSONS.find((l) => l.subject === s.id && l.slug === slug) : undefined;
};

export const levelOf = (s: SciSubject) => s.level ?? "الثانية باكالوريا";
