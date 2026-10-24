import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertCircle, BookOpen, Clock, ExternalLink, Sparkles } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { EXAM_METHOD_NOTE, NATIONAL_EXAMS, examBySlug, type NationalExam } from "@/lib/exams";
import { lessonForConcept } from "@/lib/philo";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return NATIONAL_EXAMS.map((e) => ({ slug: e.slug }));
}

export const dynamicParams = false;

const titleOf = (e: NationalExam) =>
  `الامتحان الوطني ${e.subject} ${e.year} ${e.trackAr} الدورة ${e.session} مع التصحيح`;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const exam = examBySlug(slug);
  if (!exam) return {};
  const title = `${titleOf(exam)} | مدرسي`;
  const description = `تصحيح منهجي مفصل للامتحان الوطني الموحد في ${exam.subject}، ${exam.trackAr}، دورة ${exam.year} ${exam.session}: ${exam.parts
    .map((p) => p.prompt)
    .join(" · ")}`.slice(0, 300);
  return {
    title,
    description,
    alternates: { canonical: `/examens/${exam.slug}` },
    openGraph: { title, description, url: `/examens/${exam.slug}`, type: "article", locale: "ar_MA" },
  };
}

export default async function ExamPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const exam = examBySlug(slug);
  if (!exam) notFound();

  const others = NATIONAL_EXAMS.filter((e) => e.slug !== exam.slug && e.subject === exam.subject);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: titleOf(exam),
    inLanguage: "ar",
    educationalLevel: "الثانية باكالوريا",
    learningResourceType: "Exam correction",
    about: exam.subject,
    isAccessibleForFree: true,
    publisher: { "@type": "Organization", name: "modarisi.ma" },
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-white">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 text-right space-y-10">
          <nav aria-label="مسار الصفحة" className="text-sm text-slate-500">
            <Link href="/examens" className="hover:text-emerald-700">الامتحانات</Link>
            <span className="mx-2">/</span>
            <span>{exam.subject} · {exam.trackAr}</span>
          </nav>

          <header className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">{titleOf(exam)}</h1>
            <div className="flex flex-wrap gap-2 text-sm font-bold">
              <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200">الثانية باكالوريا · {exam.trackAr}</span>
              <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 inline-flex items-center gap-1">
                <Clock size={14} /> {exam.duration}
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900">المعامل {exam.coef}</span>
              <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200">الدورة {exam.session} {exam.year}</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              {exam.structure ??
                "يختار المترشح موضوعاً واحداً من بين المواضيع الثلاثة. أسفله نص التعليمات كما وردت في الامتحان، متبوعة بتصحيح منهجي مقترح لكل موضوع: الفهم، التحليل، المناقشة، والتركيب."}
            </p>
            <div className="flex gap-2 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-sm text-amber-900 leading-relaxed">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <p>{EXAM_METHOD_NOTE}</p>
            </div>
            {exam.caveat && (
              <p className="text-sm text-slate-500 leading-relaxed border-r-4 border-slate-300 pr-3">{exam.caveat}</p>
            )}
          </header>

          <nav aria-label="المواضيع" className="grid sm:grid-cols-3 gap-3">
            {exam.parts.map((p, i) => (
              <a key={p.label} href={`#part-${i + 1}`} className="p-3 rounded-2xl border border-slate-200 bg-slate-50 hover:border-emerald-400">
                <div className="text-xs font-bold text-emerald-800">{p.label}</div>
                <div className="text-sm font-black text-slate-900 mt-1 line-clamp-2">{p.concept.split("·")[0]}</div>
              </a>
            ))}
          </nav>

          {exam.parts.map((p, i) => (
            <section key={p.label} id={`part-${i + 1}`} dir={exam.contentDir ?? "rtl"} className={`space-y-6 scroll-mt-28 ${exam.contentDir === "ltr" ? "text-left" : ""}`}>
              <div className="p-6 rounded-3xl bg-slate-950 text-white space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-emerald-300">
                  <span>{p.label}</span>
                  {p.points && <span className="px-2 py-0.5 rounded-md bg-emerald-500/20">{p.points}</span>}
                  {p.optional && <span className="px-2 py-0.5 rounded-md bg-white/10 text-slate-200">اختياري</span>}
                </div>
                {p.quote && <blockquote className="text-lg font-black leading-relaxed">«{p.quote}»</blockquote>}
                {p.kind === "question" || p.kind === "essay" ? (
                  <h2 className="text-xl sm:text-2xl font-black leading-relaxed">{p.prompt}</h2>
                ) : (
                  <h2 className="text-base sm:text-lg font-bold leading-relaxed text-slate-200">{p.prompt}</h2>
                )}
                {p.documents && (
                  <ul className="space-y-2 text-sm text-slate-300">
                    {p.documents.map((d) => (
                      <li key={d.ref} className="p-3 rounded-xl bg-white/5">
                        <span className="font-bold text-slate-100">{d.ref}:</span> {d.about}
                        <span className="block text-xs text-slate-400 mt-0.5">المصدر: {d.source}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {p.items && (
                  <ul className="space-y-1.5 text-sm text-slate-100 leading-relaxed list-none">
                    {p.items.map((it) => (
                      <li key={it} className="ps-3 border-s-2 border-emerald-400/50">{it}</li>
                    ))}
                  </ul>
                )}
                {p.summary && (
                  <p className="text-sm text-slate-300 leading-relaxed">
                    <span className="font-bold text-slate-100">{exam.contentDir === "ltr" ? "Text summary (in our own words): " : `مضمون ${p.kind === "quote" ? "القولة" : p.kind === "essay" ? "المقتطف" : "النص"} (ملخص بتصرف): `}</span>
                    {p.summary}
                    {p.author && <span className="block mt-1 text-slate-400">— {p.author}</span>}
                  </p>
                )}
                <div className="flex flex-wrap gap-2 pt-1 text-xs font-bold">
                  <span className="px-2.5 py-1 rounded-lg bg-white/10">{p.module}</span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/10">{p.concept}</span>
                  {(() => {
                    const lesson = lessonForConcept(p.concept);
                    return lesson ? (
                      <Link href={`/dourous/falsafa/${lesson.slug}`} className="px-2.5 py-1 rounded-lg bg-emerald-500/30 text-emerald-100 hover:bg-emerald-500/50 underline">
                        راجع درس مفهوم {lesson.name} ←
                      </Link>
                    ) : null;
                  })()}
                </div>
              </div>

              <div className="space-y-5">
                <h3 className="text-xl font-black text-slate-900 inline-flex items-center gap-2">
                  <BookOpen size={20} className="text-emerald-700" /> {exam.contentDir === "ltr" ? "Suggested answers" : "التصحيح المنهجي المقترح"}
                </h3>
                {p.correction.map((c) => (
                  <div key={c.heading} className="space-y-2">
                    <h4 className="font-black text-emerald-900">{c.heading}</h4>
                    <ul className="list-disc ps-6 space-y-2 text-slate-700 leading-loose">
                      {c.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
                <Link
                  href={`/tuteur?q=${encodeURIComponent(`${exam.tutorPrefix ?? "ساعدني في كتابة إنشاء فلسفي حول:"} ${p.prompt}`)}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-black text-sm"
                >
                  <Sparkles size={16} /> اسأل الأستاذ الافتراضي عن هذا الموضوع
                </Link>
              </div>
            </section>
          ))}

          <section className="space-y-3 border-t border-slate-200 pt-8">
            <h2 className="text-lg font-black text-slate-900">الموضوع الكامل (PDF)</h2>
            <p className="text-sm text-slate-600">يمكنك الاطلاع على الموضوع الكامل بما فيه النصوص الأصلية في:</p>
            <ul className="flex flex-wrap gap-3">
              {exam.paperSources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener nofollow" className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-800 underline">
                    {s.label} <ExternalLink size={14} />
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-black text-slate-900">أدوات مفيدة</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <Link href="/calculateur/lettres-sciences-humaines" className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:border-emerald-400 font-bold">
                حاسبة معدل الآداب والعلوم الإنسانية ←
              </Link>
              <Link href="/calculateur/bac-libre" className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:border-emerald-400 font-bold">
                حاسبة الباك الحر ←
              </Link>
              {others.map((o) => (
                <Link key={o.slug} href={`/examens/${o.slug}`} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:border-emerald-400 font-bold">
                  {o.subject} {o.year} · {o.trackAr} ←
                </Link>
              ))}
            </div>
          </section>
        </article>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
