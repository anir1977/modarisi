import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ExamBank } from "@/components/exam-bank";
import { Award, CheckCircle2, ShieldCheck, Download, Search, FileText } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "بنك الامتحانات الوطنية والجهوية الموحدة مع التصحيح وسلم التنقيط | مدرسي modarisi.ma",
  description: "نماذج تدريبية على شاكلة الامتحانات الوطنية والجهوية للباكالوريا بالمغرب، مع تصحيح منهجي مفصل خطوة بخطوة.",
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
              <span>نماذج تدريبية للامتحانات الإشهادية 🇲🇦</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              بنك الامتحانات الوطنية والجهوية
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-l from-blue-400 via-teal-300 to-emerald-200">
                المصححة بسلم التنقيط وعناصر الإجابة
              </span>
            </h1>

            <p className="text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed font-normal">
              تصفح مواضيع الدورة العادية والدورة الاستدراكية من سنة 2012 إلى 2024 لجميع الشعب. تصحيحات نموذجية مفصلة مع التركيز على المنهجية التي تمنحك النقطة الكاملة في الامتحان الوطني.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-5 text-xs font-bold text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-400" />
                <span>تصحيح منهجي مقترح</span>
              </span>
              <span className="flex items-center gap-1.5">
                <FileText size={16} className="text-blue-400" />
                <span>سلم التنقيط المفصل لكل تمرين</span>
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-amber-400" />
                <span>شعب العلوم الرياضية والتجريبية والاقتصاد</span>
              </span>
            </div>
          </div>
        </section>

        {/* Existing High-End Exam Bank Component */}
        <ExamBank />
      </main>

      <Footer />
    </div>
  );
}
