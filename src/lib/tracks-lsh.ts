// Subjects and exam coefficients for شعبة الآداب والعلوم الإنسانية.
// Sources checked (Oct 2026): tawjih.info (baclet1 / diplomebaccaleaureat), 9rayti.com (programme-bac-libre-maroc),
// header of the 2024 national philosophy exam (مسلك العلوم الإنسانية).
// Coefficients can change; the UI always tells users to confirm with the official notice.

export type ExamSubject = { id: string; name: string; coef: number };

export type LshTrack = {
  id: "lettres" | "sciences-humaines";
  nameAr: string;
  national: ExamSubject[];
};

/** Regional exam (1ère année bac) — shared by both مسالك. */
export const LSH_REGIONAL: ExamSubject[] = [
  { id: "fr", name: "اللغة الفرنسية", coef: 4 },
  { id: "islamic", name: "التربية الإسلامية", coef: 2 },
  { id: "math", name: "الرياضيات", coef: 1 },
];

export const LSH_TRACKS: LshTrack[] = [
  {
    id: "lettres",
    nameAr: "مسلك الآداب",
    national: [
      { id: "ar", name: "اللغة العربية وآدابها", coef: 4 },
      { id: "en", name: "اللغة الأجنبية الثانية (الإنجليزية)", coef: 4 },
      { id: "hg", name: "التاريخ والجغرافيا", coef: 3 },
      { id: "philo", name: "الفلسفة", coef: 3 },
    ],
  },
  {
    id: "sciences-humaines",
    nameAr: "مسلك العلوم الإنسانية",
    national: [
      { id: "ar", name: "اللغة العربية وآدابها", coef: 3 },
      { id: "en", name: "اللغة الأجنبية الثانية (الإنجليزية)", coef: 3 },
      { id: "hg", name: "التاريخ والجغرافيا", coef: 4 },
      { id: "philo", name: "الفلسفة", coef: 4 },
    ],
  },
];

/** Optional PE test for candidats libres. */
export const LIBRE_EPS: ExamSubject = { id: "eps", name: "التربية البدنية (اختياري)", coef: 1 };
