import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Sparkles } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { RichText } from "@/components/rich-text";
import { SCI_LESSONS, SCI_SUBJECTS, levelOf, lessonsOf, sciLesson, subjectBySlug } from "@/lib/sciences";

type Params = { subject: string; slug: string };

export function generateStaticParams(): Params[] {
  return SCI_LESSONS.map((l) => ({ subject: SCI_SUBJECTS.find((s) => s.id === l.subject)!.slug, slug: l.slug }));
}
export const dynamicParams = false;

const plain = (t: string) => t.replace(/\$[^$]*\$/g, "").replace(/\s+/g, " ").trim();

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { subject, slug } = await params;
  const s = subjectBySlug(subject);
  const l = sciLesson(subject, slug);
  if (!s || !l) return {};
  const title = s.dir === "ltr" ? `${l.title} · ${s.name} ${levelOf(s)} | مدرسي` : `درس ${l.title} · ${s.name} ${levelOf(s)} | مدرسي`;
  const description = `ملخص درس ${l.title} (${s.name}، ${levelOf(s)}): ${l.sections.map((x) => x.heading).join("، ")}. ${plain(l.intro)}`.slice(0, 300);
  return {
    title,
    description,
    alternates: { canonical: `/dourous/${s.slug}/${l.slug}` },
    openGraph: { title, description, url: `/dourous/${s.slug}/${l.slug}`, type: "article", locale: "ar_MA" },
  };
}

export default async function SciLessonPage({ params }: { params: Promise<Params> }) {
  const { subject, slug } = await params;
  const s = subjectBySlug(subject);
  const l = sciLesson(subject, slug);
  if (!s || !l) notFound();

  const all = lessonsOf(s.id);
  const idx = all.findIndex((x) => x.slug === l.slug);
  const prev = all[idx - 1];
  const next = all[idx + 1];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: `درس ${l.title}`,
    inLanguage: "ar",
    educationalLevel: levelOf(s),
    about: s.name,
    isAccessibleForFree: true,
    publisher: { "@type": "Organization", name: "modarisi.ma" },
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-white overflow-x-clip">
        <article dir={s.dir ?? "rtl"} className={`max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-10 ${s.dir === "ltr" ? "text-left" : "text-right"}`}>
          <nav aria-label="مسار الصفحة" dir="rtl" className="text-sm text-slate-500 text-right">
            <Link href="/dourous" className="hover:text-emerald-700">الدروس</Link>
            <span className="mx-2">/</span>
            <Link href={`/dourous/${s.slug}`} className="hover:text-emerald-700">{s.name}</Link>
            <span className="mx-2">/</span>
            <span>{l.part}</span>
          </nav>

          <header className="space-y-3">
            <div className="text-sm font-bold text-emerald-800">
              {s.name} · {l.part} · الدرس {l.order}
            </div>
            <h1 className="text-3xl sm:text-4xl text-slate-900 leading-tight">{l.title}</h1>
            {l.tracks && <p className="text-sm text-slate-500">{l.tracks}</p>}
            <RichText className="text-lg text-slate-700">{l.intro}</RichText>
          </header>

          {l.sections.length > 2 && (
            <nav aria-label="محتوى الدرس" className="flex flex-wrap gap-2">
              {l.sections.map((x, i) => (
                <a key={x.heading} href={`#s${i + 1}`} className="px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-sm font-bold hover:border-emerald-400">
                  {i + 1}. {x.heading}
                </a>
              ))}
            </nav>
          )}

          {l.sections.map((x, i) => (
            <section key={x.heading} id={`s${i + 1}`} className="space-y-3 scroll-mt-24">
              <h2 className="text-2xl font-black text-slate-900">
                <span className="text-emerald-700">{i + 1}.</span> {x.heading}
              </h2>
              <RichText>{x.body}</RichText>
            </section>
          ))}

          {l.formulas && (
            <section className="p-6 rounded-3xl bg-slate-950 text-white space-y-4">
              <h2 className="text-xl font-black">صيغ لازم تحفظها</h2>
              <dl className="grid sm:grid-cols-2 gap-3">
                {l.formulas.map((f) => (
                  <div key={f.label} className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <dt className="text-xs font-bold text-amber-300">{f.label}</dt>
                    <dd dir="ltr" className="mt-1">
                      <RichText className="text-white [&_.katex]:text-white">{`$$${f.tex}$$`}</RichText>
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {l.method && (
            <section className="p-6 rounded-3xl bg-amber-50 border border-amber-200 space-y-3">
              <h2 className="text-xl font-black text-amber-950">نصائح منهجية للامتحان</h2>
              <ul className="space-y-2 text-amber-950">
                {l.method.map((m) => (
                  <li key={m} className="flex gap-2">
                    <span aria-hidden="true">✦</span>
                    <RichText className="text-amber-950">{m}</RichText>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <Link
            href={`/tuteur?q=${encodeURIComponent(`اشرح لي درس ${l.title} (${s.name} ${levelOf(s)}) مع مثال محلول`)}`}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-black text-sm"
          >
            <Sparkles size={16} /> اسأل الأستاذ الافتراضي عن هذا الدرس
          </Link>

          <nav aria-label="دروس أخرى" className="grid sm:grid-cols-2 gap-3 border-t border-slate-200 pt-8">
            {prev ? (
              <Link href={`/dourous/${s.slug}/${prev.slug}`} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:border-emerald-400">
                <div className="text-xs font-bold text-slate-500">→ الدرس السابق</div>
                <div className="font-black text-slate-900 mt-1">{prev.title}</div>
              </Link>
            ) : <span />}
            {next && (
              <Link href={`/dourous/${s.slug}/${next.slug}`} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:border-emerald-400 sm:text-left">
                <div className="text-xs font-bold text-slate-500">الدرس الموالي ←</div>
                <div className="font-black text-slate-900 mt-1">{next.title}</div>
              </Link>
            )}
          </nav>
        </article>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
