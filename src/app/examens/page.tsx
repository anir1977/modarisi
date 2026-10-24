import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ExamBank } from "@/components/exam-bank";
import { Award, CheckCircle2, ShieldCheck, Download, Search, FileText } from "lucide-react";
import Link from "next/link";
import { NATIONAL_EXAMS } from "@/lib/exams";

export const metadata: Metadata = {
  title: "الامتحانات الوطنية للباكالوريا مع التصحيح المنهجي | مدرسي modarisi.ma",
  description: "امتحانات وطنية حقيقية للباكالوريا بالمغرب مع تصحيح منهجي مفصل من مدرسي، ونماذج تدريبية.",
  alternates: { canonical: "/examens" },
};

export default function ExamensPage() {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Hero Header */}
        <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white py-16 lg:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950 border border-blue-500/40 text-blue-300 text-xs font-black">
              <Award size={16} />
              <span>الامتحانات الوطنية للباكالوريا 🇲🇦</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              الامتحانات الوطنية
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-l from-blue-400 via-teal-300 to-emerald-200">
                مع تصحيح منهجي خطوة بخطوة
              </span>
            </h1>

            <p className="text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed font-normal">
              امتحانات وطنية حقيقية مع تصحيح منهجي كتبه فريق مدرسي. نضيف امتحانات جديدة باستمرار، بدءاً بشعبة الآداب والعلوم الإنسانية.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-5 text-xs font-bold text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-400" />
                <span>تصحيح منهجي مقترح</span>
              </span>
              <span className="flex items-center gap-1.5">
                <FileText size={16} className="text-blue-400" />
                <span>نص التعليمات كما ورد في الامتحان</span>
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-amber-400" />
                <span>البداية: الآداب والعلوم الإنسانية</span>
              </span>
            </div>
          </div>
        </section>

        {/* Real national exams */}
        <section className="py-14 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6 text-right">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">الامتحانات الوطنية المصححة</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {NATIONAL_EXAMS.map((e) => (
                <Link
                  key={e.slug}
                  href={`/examens/${e.slug}`}
                  className="p-5 rounded-3xl border border-slate-200 bg-slate-50 hover:border-emerald-400 hover:bg-white transition-all space-y-2"
                >
                  <div className="text-xs font-bold text-emerald-800">
                    {e.trackAr} · الدورة {e.session}
                  </div>
                  <div className="text-xl font-black text-slate-900">
                    {e.subject} {e.year}
                  </div>
                  <div className="text-sm text-slate-600 line-clamp-2">{e.parts[0].prompt}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Training models */}
        <div className="border-t border-slate-200">
          <ExamBank />
        </div>
      </main>

      <Footer />
    </div>
  );
}
