import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SCI_SUBJECTS, lessonsOf, subjectBySlug } from "@/lib/sciences";

type Params = { subject: string };

export function generateStaticParams(): Params[] {
  return SCI_SUBJECTS.map((s) => ({ subject: s.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { subject } = await params;
  const s = subjectBySlug(subject);
  if (!s) return {};
  const title = `دروس ${s.name} الثانية باكالوريا (${s.tracks}) | مدرسي`;
  return {
    title,
    description: s.about,
    alternates: { canonical: `/dourous/${s.slug}` },
    openGraph: { title, description: s.about, url: `/dourous/${s.slug}`, type: "website", locale: "ar_MA" },
  };
}

export default async function SubjectPage({ params }: { params: Promise<Params> }) {
  const { subject } = await params;
  const s = subjectBySlug(subject);
  if (!s) notFound();
  const lessons = lessonsOf(s.id);

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 text-right space-y-12">
          <header className="space-y-4">
            <nav aria-label="مسار الصفحة" className="text-sm text-slate-500">
              <Link href="/dourous" className="hover:text-emerald-700">الدروس</Link>
              <span className="mx-2">/</span>
              <span>{s.name}</span>
            </nav>
            <h1 className="text-3xl sm:text-5xl text-slate-900 leading-tight">{s.name} · الثانية باكالوريا</h1>
            <p className="text-sm font-bold text-emerald-800">{s.tracks}</p>
            <p className="text-lg text-slate-600 leading-relaxed">{s.about}</p>
          </header>

          {s.parts.map((part) => {
            const items = lessons.filter((l) => l.part === part);
            if (!items.length) return null;
            return (
              <section key={part} className="space-y-4">
                <h2 className="text-2xl font-black text-slate-900">{part}</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {items.map((l) => (
                    <Link
                      key={l.slug}
                      href={`/dourous/${s.slug}/${l.slug}`}
                      className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:border-emerald-400 hover:bg-white transition-all"
                    >
                      <div className="text-xs font-bold text-emerald-700">الدرس {l.order}</div>
                      <div className="font-black text-slate-900 mt-1 leading-snug">{l.title}</div>
                      <div className="text-sm text-slate-600 mt-1 line-clamp-2">{l.intro.replace(/\$[^$]*\$/g, "…")}</div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}

          <section className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 space-y-2">
            <h2 className="font-black text-emerald-950">عندك تمرين ما فهمتيهش؟</h2>
            <p className="text-emerald-900">
              اكتبو{" "}
              <Link href="/tuteur" className="font-black underline">للأستاذ الافتراضي</Link>
              {" "}وغادي يشرح ليك القاعدة ثم الحل خطوة بخطوة.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
