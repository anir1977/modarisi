import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CYCLES } from "@/lib/levels";

export const metadata: Metadata = {
  title: "المستويات الدراسية: من الابتدائي إلى الباكالوريا | مدرسي",
  description: "اختر مستواك الدراسي في المقرر المغربي: الابتدائي، الإعدادي، الجذع المشترك والباكالوريا.",
  alternates: { canonical: "/mustawayat" },
};

export default function LevelsHub() {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-white">
        <div className="bg-[#2b2fb3] text-white">
          <div className="max-w-[1240px] mx-auto px-5 py-14 text-right space-y-3">
            <h1 className="font-display text-5xl sm:text-6xl leading-tight">اختر مستواك</h1>
            <p className="text-lg text-white/85 max-w-2xl">
              مقرر مغربي منظم حسب المستوى. نضيف المستويات تدريجياً بعد مراجعة دروسها.
            </p>
          </div>
        </div>

        <div className="max-w-[1240px] mx-auto px-5 py-12 space-y-12 text-right">
          {CYCLES.map((cycle) => (
            <section key={cycle.id} aria-labelledby={`cycle-${cycle.id}`} className="space-y-5">
              <header className="space-y-1">
                <h2 id={`cycle-${cycle.id}`} className="font-display text-3xl text-[#121322]">{cycle.name}</h2>
                <p className="text-[#4a4c63]">{cycle.about}</p>
              </header>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cycle.levels.map((level) =>
                  level.href ? (
                    <Link
                      key={level.id}
                      href={level.href}
                      className="group flex items-center justify-between gap-3 p-6 rounded-2xl border-2 border-[#121322] bg-white hover:bg-[#f2b233]/25 transition-colors"
                    >
                      <span>
                        <span className="block text-xl font-bold text-[#121322]">{level.name}</span>
                        <span className="block text-sm text-[#4a4c63] mt-1">{level.note}</span>
                      </span>
                      <ArrowLeft size={22} className="shrink-0 text-[#2b2fb3] transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                    </Link>
                  ) : (
                    <div key={level.id} className="p-6 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50">
                      <span className="block text-xl font-bold text-slate-600">{level.name}</span>
                      <span className="block text-sm text-slate-500 mt-1">قريباً</span>
                    </div>
                  )
                )}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
