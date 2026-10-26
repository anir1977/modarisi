import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CONCEPTS, MODULES } from "@/lib/philo";
import { OG_IMAGES } from "@/lib/seo";

const TITLE = "دروس الفلسفة الثانية باكالوريا: المجزوءات والمفاهيم والمواقف | مدرسي";
const DESCRIPTION =
  "ملخصات دروس الفلسفة للثانية باكالوريا بالمغرب: الوضع البشري، المعرفة، السياسة، الأخلاق. 12 مفهوماً و36 محوراً مع مواقف الفلاسفة والإشكالات.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/dourous/falsafa" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/dourous/falsafa", type: "website", locale: "ar_MA", images: OG_IMAGES },
};

export default function PhiloIndex() {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 text-right space-y-12">
          <header className="space-y-4">
            <nav aria-label="مسار الصفحة" className="text-sm text-slate-500">
              <Link href="/dourous" className="hover:text-emerald-700">الدروس</Link>
              <span className="mx-2">/</span>
              <span>الفلسفة</span>
            </nav>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">دروس الفلسفة · الثانية باكالوريا</h1>
            <p className="text-lg text-slate-600 font-semibold leading-relaxed">
              ملخصات منظمة لكل مفهوم: التعريف، الإشكال العام، المحاور الثلاثة، ومواقف الفلاسفة. كل درس مرتبط بمواضيع الامتحان
              الوطني التي تناولته.
            </p>
          </header>

          {MODULES.map((m) => (
            <section key={m.id} className="space-y-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900">{m.name}</h2>
                <p className="text-slate-600">{m.about}</p>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {CONCEPTS.filter((c) => c.module === m.name).map((c) => (
                  <Link
                    key={c.slug}
                    href={`/dourous/falsafa/${c.slug}`}
                    className="p-5 rounded-3xl border border-slate-200 bg-slate-50 hover:border-emerald-400 hover:bg-white transition-all space-y-2"
                  >
                    <div className="text-xl font-black text-slate-900">مفهوم {c.name}</div>
                    <ul className="text-sm text-slate-600 space-y-1">
                      {c.axes.map((a) => (
                        <li key={a.title}>· {a.title}</li>
                      ))}
                    </ul>
                  </Link>
                ))}
              </div>
            </section>
          ))}

          <section className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 space-y-3">
            <h2 className="text-xl font-black text-emerald-950">طبق ما تعلمته</h2>
            <p className="text-emerald-900">
              تدرب على مواضيع الامتحان الوطني المصححة (السؤال، القولة، النص) في{" "}
              <Link href="/examens" className="font-black underline">صفحة الامتحانات</Link>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
