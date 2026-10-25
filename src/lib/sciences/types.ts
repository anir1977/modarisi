// Shared shape for science lessons (math, physics-chemistry, SVT).
// Section bodies are Markdown with LaTeX ($...$ inline, $$...$$ display), rendered server-side with KaTeX.

export type SciSubjectId = "math" | "pc" | "svt" | "ar" | "en" | "fr";

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
  /** Worked examples: statement + full step-by-step solution (Markdown + LaTeX). */
  examples?: { title: string; problem: string; solution: string }[];
  /** Practice exercises; the solution is hidden until the student opens it. */
  exercises?: { level: "سهل" | "متوسط" | "صعب"; statement: string; solution: string }[];
  /** Frequent student mistakes. */
  mistakes?: string[];
};

export type SciSubject = {
  id: SciSubjectId;
  slug: string;
  name: string;
  tracks: string;
  about: string;
  parts: string[];
  /** Content direction for lesson bodies (English lessons are LTR). */
  dir?: "rtl" | "ltr";
  /** School level label; defaults to the 2nd year bac. */
  level?: string;
};
