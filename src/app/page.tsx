import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ZelligeStar3D } from "@/components/zellige-star";
import { NATIONAL_EXAMS } from "@/lib/exams";
import { CONCEPTS, MODULES } from "@/lib/philo";
import { HG_LESSONS } from "@/lib/hg";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const TRACKS = [
  { name: "العلوم الفيزيائية", href: "/calculateur" },
  { name: "علوم الحياة والأرض", href: "/calculateur" },
  { name: "العلوم الرياضية", href: "/calculateur" },
  { name: "الاقتصاد والتدبير", href: "/calculateur" },
  { name: "الآداب والعلوم الإنسانية", href: "/calculateur/lettres-sciences-humaines" },
  { name: "الباك الحر", href: "/calculateur/bac-libre" },
];

export default function HomePage() {
  const exams = [...NATIONAL_EXAMS].sort((a, b) => b.year - a.year || a.subject.localeCompare(b.subject, "ar"));
  const history = HG_LESSONS.filter((l) => l.branch === "history").slice(0, 6);

  return (
    <div className="flex min-h-screen flex-1 flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[var(--line)]">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.15fr_1fr] md:py-24">
            <div className="space-y-6 text-right">
              <h1 className="font-display text-4xl font-black leading-[1.2] text-[var(--chalk)] sm:text-6xl">
                راجع للباكالوريا
                <br />
                بدروس واضحة وامتحانات مصححة
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-[var(--chalk-2)]">
                ملخصات الدروس، امتحانات وطنية حقيقية بتصحيح مفصل، وحاسبة معدل لكل شعبة. مجاناً وبدون تسجيل.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/examens"
                  className="rounded-xl bg-[var(--mint)] px-6 py-3 font-display text-base font-black text-[var(--ink)] hover:bg-[var(--mint-text)]"
                >
                  تصفح الامتحانات المصححة
                </Link>
                <Link
                  href="/calculateur"
                  className="rounded-xl border border-[var(--line-2)] px-6 py-3 font-display text-base font-black text-[var(--chalk)] hover:border-[var(--mint-line)]"
                >
                  احسب معدلك
                </Link>
              </div>
            </div>
            <ZelligeStar3D />
          </div>
        </section>

        {/* Pick a track */}
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <h2 className="font-display text-2xl font-black text-[var(--chalk)]">احسب معدلك حسب شعبتك</h2>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {TRACKS.map((t) => (
              <li key={t.name}>
                <Link
                  href={t.href}
                  className="lift inline-block rounded-full border border-[var(--line)] bg-[var(--board)] px-4 py-2 font-bold text-[var(--chalk-2)] hover:text-[var(--chalk)]"
                >
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Exams */}
        <section className="border-y border-[var(--line)] bg-[var(--board)]">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-3xl font-black text-[var(--chalk)]">الامتحانات الوطنية المصححة</h2>
                <p className="mt-2 text-[var(--chalk-2)]">مواضيع حقيقية، وتصحيح منهجي كتبه فريق مدرسي.</p>
              </div>
              <Link href="/examens" className="font-bold text-[var(--mint-text)] hover:underline">
                كل الامتحانات
              </Link>
            </div>
            <ul className="mt-8 divide-y divide-[var(--line)] rounded-2xl border border-[var(--line)] bg-[var(--ink)]">
              {exams.map((e) => (
                <li key={e.slug}>
                  <Link
                    href={`/examens/${e.slug}`}
                    className="grid grid-cols-[4.5rem_1fr] items-center gap-x-4 gap-y-1 px-5 py-4 hover:bg-[var(--board-2)] sm:grid-cols-[4.5rem_12rem_1fr]"
                  >
                    <span className="font-display text-2xl font-black text-[var(--saffron)]">{e.year}</span>
                    <span className="font-display text-lg font-black text-[var(--chalk)]">{e.subject}</span>
                    <span className="col-start-2 text-sm text-[var(--mute)] sm:col-start-auto">
                      {e.trackAr}، الدورة {e.session}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Lessons */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl font-black text-[var(--chalk)]">الدروس</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="rounded-3xl border border-[var(--line)] bg-[var(--board)] p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-2xl font-black text-[var(--chalk)]">الفلسفة</h3>
                <Link href="/dourous/falsafa" className="text-sm font-bold text-[var(--mint-text)] hover:underline">
                  كل المفاهيم
                </Link>
              </div>
              <div className="mt-5 space-y-4">
                {MODULES.map((m) => (
                  <div key={m.id}>
                    <div className="text-sm font-bold text-[var(--mute)]">{m.name}</div>
                    <div className="mt-1.5 flex flex-wrap gap-2">
                      {CONCEPTS.filter((c) => c.module === m.name).map((c) => (
                        <Link
                          key={c.slug}
                          href={`/dourous/falsafa/${c.slug}`}
                          className="rounded-lg bg-[var(--board-2)] px-3 py-1.5 font-bold text-[var(--chalk)] hover:text-[var(--mint-text)]"
                        >
                          {c.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-[var(--line)] bg-[var(--board)] p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-2xl font-black text-[var(--chalk)]">التاريخ</h3>
                <Link href="/dourous/tarikh-jughrafiya" className="text-sm font-bold text-[var(--mint-text)] hover:underline">
                  كل الدروس
                </Link>
              </div>
              <ol className="mt-5 space-y-1">
                {history.map((l) => (
                  <li key={l.slug}>
                    <Link
                      href={`/dourous/tarikh-jughrafiya/${l.slug}`}
                      className="flex gap-3 rounded-lg px-2 py-2 hover:bg-[var(--board-2)]"
                    >
                      <span className="w-6 shrink-0 font-display font-black text-[var(--saffron)]">{l.order}</span>
                      <span className="font-bold text-[var(--chalk)]">{l.title}</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Tutor */}
        <section className="border-t border-[var(--line)]">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center">
            <div>
              <h2 className="font-display text-3xl font-black text-[var(--chalk)]">عالق في تمرين؟</h2>
              <p className="mt-2 max-w-xl text-[var(--chalk-2)]">
                اكتب السؤال للأستاذ الافتراضي، يشرح لك القاعدة ثم الحل خطوة بخطوة، بالدارجة أو الفرنسية.
              </p>
            </div>
            <Link
              href="/tuteur"
              className="rounded-xl bg-[var(--mint)] px-6 py-3 font-display font-black text-[var(--ink)] hover:bg-[var(--mint-text)]"
            >
              اسأل الأستاذ الافتراضي
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
