import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "دروس الثانية باكالوريا: ملخصات منظمة حسب المادة | مدرسي",
  description: "ملخصات دروس الثانية باكالوريا بالمغرب: الرياضيات، الفلسفة، التاريخ والجغرافيا، مرتبطة بالامتحانات الوطنية المصححة.",
  alternates: { canonical: "/dourous" },
};

const SUBJECTS = [
  { name: "علوم الحياة والأرض", href: "/dourous/ulum-al-hayat-wa-al-ard", status: "متوفر", about: "14 درساً: الطاقة، الوراثة، المناعة، الجيولوجيا والبيئة" },
  { name: "الفيزياء والكيمياء", href: "/dourous/fizyae-kimyae", status: "متوفر · علوم تجريبية", about: "19 درساً: الموجات، النووي، الكهرباء، الميكانيك والكيمياء" },
  { name: "الرياضيات", href: "/dourous/riyadiyat", status: "متوفر · علوم تجريبية", about: "11 درساً: التحليل، الأعداد العقدية، الهندسة الفضائية والاحتمالات" },
  { name: "الفلسفة", href: "/dourous/falsafa", status: "متوفر", about: "4 مجزوءات · 12 مفهوماً · 36 محوراً" },
  { name: "التاريخ والجغرافيا", href: "/dourous/tarikh-jughrafiya", status: "متوفر", about: "15 درساً في التاريخ و13 درساً في الجغرافيا مع التواريخ والمفاهيم" },
  { name: "اللغة العربية", href: "/dourous/al-arabiya", status: "متوفر · آداب وعلوم إنسانية", about: "الشعر العربي الحديث، ظاهرة الشعر الحديث، ومنهجية التحليل" },
  { name: "الفرنسية · الأولى باك", href: "/dourous/francais-1bac", status: "متوفر · الامتحان الجهوي", about: "Les trois œuvres du programme et la méthodologie" },
  { name: "اللغة الإنجليزية", href: "/dourous/anglais", status: "متوفر · جميع الشعب", about: "Grammar, functions, vocabulary and writing" },
];

export default function LessonsHub() {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 text-right space-y-8">
          <header className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900">دروس الثانية باكالوريا</h1>
            <p className="text-lg text-slate-600 font-semibold">
              ملخصات أصلية ومنظمة، كل درس مرتبط بمواضيع الامتحان الوطني المصححة. نضيف المواد تدريجياً.
            </p>
          </header>
          <div className="grid sm:grid-cols-2 gap-4">
            {SUBJECTS.map((s) =>
              s.href ? (
                <Link key={s.name} href={s.href} className="p-6 rounded-3xl border border-slate-200 bg-slate-50 hover:border-emerald-400 hover:bg-white space-y-1">
                  <div className="text-xs font-bold text-emerald-700">{s.status}</div>
                  <div className="text-2xl font-black text-slate-900">{s.name}</div>
                  <div className="text-sm text-slate-600">{s.about}</div>
                </Link>
              ) : (
                <div key={s.name} className="p-6 rounded-3xl border border-dashed border-slate-300 bg-white space-y-1 opacity-70">
                  <div className="text-xs font-bold text-slate-500">{s.status}</div>
                  <div className="text-2xl font-black text-slate-700">{s.name}</div>
                  <div className="text-sm text-slate-500">{s.about}</div>
                </div>
              )
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
