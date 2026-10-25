// Shared shape for science lessons (math, physics-chemistry, SVT).
// Section bodies are Markdown with LaTeX ($...$ inline, $$...$$ display), rendered server-side with KaTeX.

export type SciSubjectId = "math" | "pc" | "svt";

export type SciLesson = {
  slug: string;
  subject: SciSubjectId;
  order: number;
  /** Sub-part shown as a group on the subject page, e.g. "التحليل", "الفيزياء", "الكيمياء". */
  part: string;
  title: string;
  /** Tracks this lesson is in, as shown to students. */
  tracks?: string;
  intro: string;
  sections: { heading: string; body: string }[];
  /** Must-know formulas: label + LaTeX (no $). */
  formulas?: { label: string; tex: string }[];
  /** Exam method tips. */
  method?: string[];
};

export type SciSubject = {
  id: SciSubjectId;
  slug: string;
  name: string;
  tracks: string;
  about: string;
  parts: string[];
};
