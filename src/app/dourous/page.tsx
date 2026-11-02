import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "دروس الثانية باكالوريا: ملخصات منظمة حسب المادة | مدرسي",
  description: "ملخصات دروس الثانية باكالوريا بالمغرب: الرياضيات، الفلسفة، التاريخ والجغرافيا، مرتبطة بالامتحانات الوطنية المصححة.",
  alternates: { canonical: "/dourous" },
};

const SUBJECTS = [
  { name: "علوم الحياة والأرض", href: "/dourous/ulum-al-hayat-wa-al-ard", status: "علوم", about: "14 درساً: الطاقة، الوراثة، المناعة، الجيولوجيا والبيئة" },
  { name: "الفيزياء والكيمياء", href: "/dourous/fizyae-kimyae", status: "علوم تجريبية", about: "19 درساً: الموجات، النووي، الكهرباء، الميكانيك والكيمياء" },
  { name: "الرياضيات", href: "/dourous/riyadiyat", status: "علوم تجريبية", about: "11 درساً: التحليل، الأعداد العقدية، الهندسة الفضائية والاحتمالات" },
  { name: "الفلسفة", href: "/dourous/falsafa", status: "جميع الشعب", about: "4 مجزوءات · 12 مفهوماً · 36 محوراً" },
  { name: "التاريخ والجغرافيا", href: "/dourous/tarikh-jughrafiya", status: "آداب وعلوم إنسانية", about: "15 درساً في التاريخ و13 درساً في الجغرافيا مع التواريخ والمفاهيم" },
  { name: "اللغة العربية", href: "/dourous/al-arabiya", status: "آداب وعلوم إنسانية", about: "الشعر العربي الحديث، ظاهرة الشعر الحديث، ومنهجية التحليل" },
  { name: "الفرنسية · الأولى باك", href: "/dourous/francais-1bac", status: "الامتحان الجهوي", about: "Les trois œuvres du programme et la méthodologie" },
  { name: "اللغة الإنجليزية", href: "/dourous/anglais", status: "جميع الشعب", about: "Grammar, functions, vocabulary and writing" },
];

export default function LessonsHub() {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-white">
        <div className="bg-[#2b2fb3] text-white">
          <div className="max-w-[1240px] mx-auto px-5 py-14 text-right space-y-3">
            <h1 className="font-display text-5xl sm:text-6xl leading-tight">دروس الثانية باكالوريا</h1>
            <p className="text-lg text-white/85 max-w-2xl">
              ملخصات أصلية ومنظمة، كل درس مرتبط بمواضيع الامتحان الوطني المصححة. نضيف المواد تدريجياً.
            </p>
          </div>
        </div>
        <div className="max-w-[1240px] mx-auto px-5 py-12 text-right">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SUBJECTS.map((s) => (
              <Link
                key={s.name}
                href={s.href}
                className="group flex flex-col gap-2 p-6 rounded-2xl border-2 border-[#121322] bg-white hover:bg-[#f2b233]/25 transition-colors"
              >
                <span className="self-start px-3 py-1 rounded-full bg-[#2b2fb3]/10 text-[#2b2fb3] text-xs font-bold">{s.status}</span>
                <span className="text-2xl font-bold text-[#121322]">{s.name}</span>
                <span className="text-sm text-[#4a4c63] leading-relaxed">{s.about}</span>
                <ArrowLeft size={20} className="mt-auto pt-1 text-[#2b2fb3] transition-transform group-hover:-translate-x-1" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
