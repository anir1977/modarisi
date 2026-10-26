import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Sparkles } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CONCEPTS, conceptBySlug, lessonForConcept } from "@/lib/philo";
import { NATIONAL_EXAMS } from "@/lib/exams";
import { OG_IMAGES } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return CONCEPTS.map((c) => ({ slug: c.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const c = conceptBySlug(slug);
  if (!c) return {};
  const title = `درس مفهوم ${c.name} · الفلسفة الثانية باكالوريا (المحاور والمواقف) | مدرسي`;
  const description = `ملخص درس مفهوم ${c.name} (${c.module}): ${c.axes.map((a) => a.title).join("، ")}. الإشكالات ومواقف ${c.axes
    .flatMap((a) => a.positions.map((p) => p.who))
    .slice(0, 6)
    .join("، ")}.`;
  return {
    title,
    description,
    alternates: { canonical: `/dourous/falsafa/${c.slug}` },
    openGraph: { title, description, url: `/dourous/falsafa/${c.slug}`, type: "article", locale: "ar_MA", images: OG_IMAGES },
  };
}

export default async function ConceptPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const c = conceptBySlug(slug);
  if (!c) notFound();

  const relatedExams = NATIONAL_EXAMS.flatMap((e) =>
    e.parts
      .map((p, i) => ({ e, p, i }))
      .filter(({ p }) => lessonForConcept(p.concept)?.slug === c.slug)
  );
  const siblings = CONCEPTS.filter((x) => x.module === c.module && x.slug !== c.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: `درس مفهوم ${c.name}`,
    inLanguage: "ar",
    educationalLevel: "الثانية باكالوريا",
    about: "الفلسفة",
    isAccessibleForFree: true,
    publisher: { "@type": "Organization", name: "modarisi.ma" },
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-white">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 text-right space-y-10">
          <nav aria-label="مسار الصفحة" className="text-sm text-slate-500">
            <Link href="/dourous" className="hover:text-emerald-700">الدروس</Link>
            <span className="mx-2">/</span>
            <Link href="/dourous/falsafa" className="hover:text-emerald-700">الفلسفة</Link>
            <span className="mx-2">/</span>
            <span>{c.module}</span>
          </nav>

          <header className="space-y-4">
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">مفهوم {c.name}</h1>
            <p className="text-sm font-bold text-emerald-800">{c.module} · الثانية باكالوريا</p>
            <p className="text-lg text-slate-700 leading-loose">{c.intro}</p>
            <div className="p-5 rounded-2xl bg-slate-950 text-white">
              <div className="text-xs font-bold text-emerald-300 mb-1">الإشكال العام</div>
              <p className="text-lg font-bold leading-relaxed">{c.problem}</p>
            </div>
            <nav aria-label="المحاور" className="flex flex-wrap gap-2 text-sm font-bold">
              {c.axes.map((a, i) => (
                <a key={a.title} href={`#axis-${i + 1}`} className="px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 hover:border-emerald-400">
                  المحور {i + 1}: {a.title}
                </a>
              ))}
            </nav>
          </header>

          {c.axes.map((a, i) => (
            <section key={a.title} id={`axis-${i + 1}`} className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl font-black text-slate-900">
                المحور {i + 1}: {a.title}
              </h2>
              <p className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 font-bold leading-relaxed">
                الإشكال: {a.problem}
              </p>
              <ul className="space-y-3">
                {a.positions.map((p) => (
                  <li key={p.who} className="p-4 rounded-2xl border border-slate-200 bg-slate-50">
                    <div className="font-black text-emerald-900">{p.who}</div>
                    <p className="text-slate-700 leading-loose mt-1">{p.idea}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section className="space-y-3 p-5 rounded-3xl bg-emerald-50 border border-emerald-200">
            <h2 className="text-lg font-black text-emerald-950">نصيحة للإنشاء الفلسفي</h2>
            <p className="text-emerald-900 leading-relaxed">
              في الامتحان لا يكفي حفظ المواقف: حدد المحور المناسب للموضوع، ابنِ الإشكال، ثم وظف موقفاً مؤيداً وآخر معارضاً
              مع حججهما، وانتهِ بتركيب ورأي شخصي معلل.
            </p>
            <Link
              href={`/tuteur?q=${encodeURIComponent(`اشرح لي درس مفهوم ${c.name} في الفلسفة للثانية باكالوريا بمثال`)}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-black text-sm"
            >
              <Sparkles size={16} /> اسأل الأستاذ الافتراضي عن هذا الدرس
            </Link>
          </section>

          {relatedExams.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xl font-black text-slate-900">مواضيع الامتحان الوطني حول هذا المفهوم</h2>
              <ul className="space-y-2">
                {relatedExams.map(({ e, p, i }) => (
                  <li key={`${e.slug}-${i}`}>
                    <Link
                      href={`/examens/${e.slug}#part-${i + 1}`}
                      className="block p-4 rounded-2xl border border-slate-200 hover:border-emerald-400"
                    >
                      <div className="text-xs font-bold text-emerald-800">
                        {e.year} · {e.trackAr} · {p.label}
                      </div>
                      <div className="font-bold text-slate-900 mt-1">{p.prompt}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="space-y-3">
            <h2 className="text-xl font-black text-slate-900">مفاهيم أخرى في {c.module}</h2>
            <div className="flex flex-wrap gap-2">
              {siblings.map((s) => (
                <Link key={s.slug} href={`/dourous/falsafa/${s.slug}`} className="px-4 py-2 rounded-xl bg-slate-100 border border-slate-200 hover:border-emerald-400 font-bold">
                  مفهوم {s.name}
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
