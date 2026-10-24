import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HG_LESSONS } from "@/lib/hg";

const TITLE = "دروس التاريخ والجغرافيا الثانية باكالوريا آداب وعلوم إنسانية | مدرسي";
const DESCRIPTION =
  "ملخصات دروس التاريخ الثانية باكالوريا بالمغرب: الحربان العالميتان، أزمة 1929، المغرب تحت الحماية والاستقلال، الحرب الباردة، القضية الفلسطينية، مع التواريخ والمفاهيم.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/dourous/tarikh-jughrafiya" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/dourous/tarikh-jughrafiya", type: "website", locale: "ar_MA" },
};

export default function HgIndex() {
  const history = HG_LESSONS.filter((l) => l.branch === "history");
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 text-right space-y-12">
          <header className="space-y-4">
            <nav aria-label="مسار الصفحة" className="text-sm text-slate-500">
              <Link href="/dourous" className="hover:text-emerald-700">الدروس</Link>
              <span className="mx-2">/</span>
              <span>التاريخ والجغرافيا</span>
            </nav>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">التاريخ والجغرافيا · الثانية باكالوريا</h1>
            <p className="text-lg text-slate-600 font-semibold leading-relaxed">
              ملخص كل درس مع أهم التواريخ والمفاهيم التي يُطلب تعريفها في الامتحان الوطني. حسب ترتيب المقرر لشعبة الآداب
              والعلوم الإنسانية.
            </p>
          </header>

          {[1, 2].map((sem) => (
            <section key={sem} className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900">التاريخ · الدورة {sem === 1 ? "الأولى" : "الثانية"}</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {history
                  .filter((l) => l.semester === sem)
                  .map((l) => (
                    <Link
                      key={l.slug}
                      href={`/dourous/tarikh-jughrafiya/${l.slug}`}
                      className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:border-emerald-400 hover:bg-white transition-all"
                    >
                      <div className="text-xs font-bold text-emerald-700">الدرس {l.order}</div>
                      <div className="font-black text-slate-900 mt-1 leading-snug">{l.title}</div>
                    </Link>
                  ))}
              </div>
            </section>
          ))}

          <section className="p-6 rounded-3xl border border-dashed border-slate-300 space-y-2">
            <h2 className="text-xl font-black text-slate-700">الجغرافيا</h2>
            <p className="text-slate-500">دروس الجغرافيا (العولمة، التكتلات، القوى الاقتصادية) قريباً.</p>
          </section>

          <section className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200">
            <p className="text-emerald-900">
              طبّق على{" "}
              <Link href="/examens/histoire-geographie-sciences-humaines-2024-normale" className="font-black underline">
                امتحان التاريخ والجغرافيا 2024 المصحح
              </Link>
              .
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
