// National & regional exam coefficients for the scientific, mathematical and economics tracks.
// Cross-checked (Oct 2026) between tawjih.info (diplomebaccaleaureat) and 9rayti.com (programme-bac-libre-maroc).
// Coefficients can change; the UI always asks users to confirm with the official notice.

import type { ExamSubject } from "@/lib/tracks-lsh";

export type SciTrack = {
  id: string;
  nameAr: string;
  shortAr: string;
  national: ExamSubject[];
};

export const SCI_TRACKS: SciTrack[] = [
  {
    id: "pc",
    nameAr: "مسلك العلوم الفيزيائية",
    shortAr: "علوم فيزيائية",
    national: [
      { id: "math", name: "الرياضيات", coef: 7 },
      { id: "pc", name: "الفيزياء والكيمياء", coef: 7 },
      { id: "svt", name: "علوم الحياة والأرض", coef: 5 },
      { id: "philo", name: "الفلسفة", coef: 2 },
      { id: "en", name: "اللغة الأجنبية الثانية", coef: 2 },
    ],
  },
  {
    id: "svt",
    nameAr: "مسلك علوم الحياة والأرض",
    shortAr: "علوم الحياة والأرض",
    national: [
      { id: "math", name: "الرياضيات", coef: 7 },
      { id: "pc", name: "الفيزياء والكيمياء", coef: 5 },
      { id: "svt", name: "علوم الحياة والأرض", coef: 7 },
      { id: "philo", name: "الفلسفة", coef: 2 },
      { id: "en", name: "اللغة الأجنبية الثانية", coef: 2 },
    ],
  },
  {
    id: "sm-a",
    nameAr: "شعبة العلوم الرياضية (أ)",
    shortAr: "علوم رياضية أ",
    national: [
      { id: "math", name: "الرياضيات", coef: 9 },
      { id: "pc", name: "الفيزياء والكيمياء", coef: 7 },
      { id: "svt", name: "علوم الحياة والأرض", coef: 3 },
      { id: "philo", name: "الفلسفة", coef: 2 },
      { id: "en", name: "اللغة الأجنبية الثانية", coef: 2 },
    ],
  },
  {
    id: "sm-b",
    nameAr: "شعبة العلوم الرياضية (ب)",
    shortAr: "علوم رياضية ب",
    national: [
      { id: "math", name: "الرياضيات", coef: 9 },
      { id: "pc", name: "الفيزياء والكيمياء", coef: 7 },
      { id: "si", name: "علوم المهندس", coef: 3 },
      { id: "philo", name: "الفلسفة", coef: 2 },
      { id: "en", name: "اللغة الأجنبية الثانية", coef: 2 },
    ],
  },
  {
    id: "eco",
    nameAr: "مسلك العلوم الاقتصادية",
    shortAr: "علوم اقتصادية",
    national: [
      { id: "ecostat", name: "الاقتصاد العام والإحصاء", coef: 6 },
      { id: "compta", name: "المحاسبة والرياضيات المالية", coef: 4 },
      { id: "math", name: "الرياضيات", coef: 4 },
      { id: "eoae", name: "الاقتصاد والتنظيم الإداري للمقاولات", coef: 3 },
      { id: "philo", name: "الفلسفة", coef: 2 },
      { id: "en", name: "اللغة الأجنبية الثانية", coef: 2 },
    ],
  },
  {
    id: "sgc",
    nameAr: "مسلك علوم التدبير المحاسباتي",
    shortAr: "تدبير محاسباتي",
    national: [
      { id: "compta", name: "المحاسبة والرياضيات المالية", coef: 6 },
      { id: "eoae", name: "الاقتصاد والتنظيم الإداري للمقاولات", coef: 6 },
      { id: "math", name: "الرياضيات", coef: 4 },
      { id: "ecostat", name: "الاقتصاد العام والإحصاء", coef: 3 },
      { id: "philo", name: "الفلسفة", coef: 2 },
      { id: "en", name: "اللغة الأجنبية الثانية", coef: 2 },
    ],
  },
];

/** Regional exam (1ère bac) for regular candidates. */
export const SCI_REGIONAL: ExamSubject[] = [
  { id: "fr", name: "اللغة الفرنسية", coef: 4 },
  { id: "ar", name: "اللغة العربية", coef: 2 },
  { id: "hg", name: "التاريخ والجغرافيا", coef: 2 },
  { id: "islamic", name: "التربية الإسلامية", coef: 2 },
];

export const ECO_REGIONAL: ExamSubject[] = [
  { id: "fr", name: "اللغة الفرنسية", coef: 3 },
  { id: "hg", name: "التاريخ والجغرافيا", coef: 3 },
  { id: "ar", name: "اللغة العربية", coef: 2 },
  { id: "islamic", name: "التربية الإسلامية", coef: 2 },
];
