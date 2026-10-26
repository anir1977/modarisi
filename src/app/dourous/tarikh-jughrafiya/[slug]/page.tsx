import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Sparkles } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HG_LESSONS, hgBySlug } from "@/lib/hg";
import { OG_IMAGES } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return HG_LESSONS.map((l) => ({ slug: l.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const l = hgBySlug(slug);
  if (!l) return {};
  const title = `درس ${l.title} · ${l.branch === "history" ? "التاريخ" : "الجغرافيا"} الثانية باكالوريا | مدرسي`;
  const description = `ملخص درس ${l.title}: ${l.sections.map((s) => s.heading).join("، ")}${l.dates ? "، مع أهم التواريخ" : ""}${l.terms ? " والمفاهيم" : ""}.`;
  return {
    title,
    description,
    alternates: { canonical: `/dourous/tarikh-jughrafiya/${l.slug}` },
    openGraph: { title, description, url: `/dourous/tarikh-jughrafiya/${l.slug}`, type: "article", locale: "ar_MA", images: OG_IMAGES },
  };
}

export default async function HgLessonPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const l = hgBySlug(slug);
  if (!l) notFound();

  const same = HG_LESSONS.filter((x) => x.branch === l.branch).sort((a, b) => a.order - b.order);
  const idx = same.findIndex((x) => x.slug === l.slug);
  const prev = same[idx - 1];
  const next = same[idx + 1];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: `درس ${l.title}`,
    inLanguage: "ar",
    educationalLevel: "الثانية باكالوريا",
    about: l.branch === "history" ? "التاريخ" : "الجغرافيا",
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
            <Link href="/dourous/tarikh-jughrafiya" className="hover:text-emerald-700">التاريخ والجغرافيا</Link>
          </nav>

          <header className="space-y-3">
            <p className="text-sm font-bold text-emerald-800">
              {l.branch === "history" ? "التاريخ" : "الجغرافيا"} · الدورة {l.semester === 1 ? "الأولى" : "الثانية"} · الدرس {l.order}
            </p>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">{l.title}</h1>
            <p className="text-lg text-slate-700 leading-loose">{l.intro}</p>
          </header>

          {l.sections.map((s) => (
            <section key={s.heading} className="space-y-3">
              <h2 className="text-2xl font-black text-slate-900">{s.heading}</h2>
              <ul className="list-disc ps-6 space-y-2 text-slate-700 leading-loose">
                {s.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </section>
          ))}

          {l.dates && (
            <section className="space-y-3">
              <h2 className="text-2xl font-black text-slate-900">أهم التواريخ</h2>
              <ol className="border-s-2 border-emerald-300 ps-5 space-y-3">
                {l.dates.map((d) => (
                  <li key={d.date + d.event}>
                    <span className="font-sans font-black text-emerald-800">{d.date}</span>
                    <span className="text-slate-700"> : {d.event}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {l.terms && (
            <section className="space-y-3">
              <h2 className="text-2xl font-black text-slate-900">مفاهيم يجب معرفتها</h2>
              <dl className="space-y-3">
                {l.terms.map((t) => (
                  <div key={t.term} className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <dt className="font-black text-slate-900">{t.term}</dt>
                    <dd className="text-slate-700 mt-1 leading-relaxed">{t.def}</dd>
                  </div>
                ))}
              </dl>
              <p className="text-sm text-slate-500">{l.branch === "history" ? "في الامتحان، التعريف التاريخي يتضمن: ماذا؟ متى؟ أين؟ ومن؟" : "في الموضوع المقالي، وظّف هذه المفاهيم في المقدمة والعرض بلغة جغرافية دقيقة."}</p>
            </section>
          )}

          <Link
            href={`/tuteur?q=${encodeURIComponent(`اشرح لي درس ${l.title} للثانية باكالوريا بطريقة مبسطة`)}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-black text-sm"
          >
            <Sparkles size={16} /> اسأل الأستاذ الافتراضي عن هذا الدرس
          </Link>

          <nav aria-label="الدروس المجاورة" className="grid sm:grid-cols-2 gap-3 border-t border-slate-200 pt-6">
            {prev ? (
              <Link href={`/dourous/tarikh-jughrafiya/${prev.slug}`} className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-400">
                <div className="text-xs text-slate-500">الدرس السابق</div>
                <div className="font-bold text-slate-900">{prev.title}</div>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link href={`/dourous/tarikh-jughrafiya/${next.slug}`} className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-400">
                <div className="text-xs text-slate-500">الدرس التالي</div>
                <div className="font-bold text-slate-900">{next.title}</div>
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
