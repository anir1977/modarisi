import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MinistryResources } from "@/components/ministry-resources";
import { BookOpen, ShieldCheck, FileCheck, Award, ArrowLeft, Download } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "دليل المراجع والكتب المدرسية للباكالوريا | منصة مدرسي modarisi.ma",
  description: "دليل مبسط للمراجع والكتب المدرسية الأكثر استعمالاً في الباكالوريا بالمغرب، مع توزيع تقريبي لمجالات الامتحانات حسب المادة.",
  alternates: { canonical: "/maraji3" },
};

export default function Maraji3Page() {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Page Hero Header */}
        <section className="bg-[#2b2fb3] text-white py-16 lg:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#f2b233_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-black">
              <ShieldCheck size={16} />
              <span>وفق المقرر الدراسي المغربي 🇲🇦</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              دليل المراجع الدراسية
              <span className="block mt-2 text-[#f2b233]">
                والأطر المرجعية للامتحانات الإشهادية
              </span>
            </h1>

            <p className="text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed font-normal">
              دليل مبسط للمراجع الأكثر استعمالاً وتوزيع تقريبي لمجالات الامتحانات. للمعلومات الرسمية، راجع دائماً الأطر المرجعية الصادرة عن وزارة التربية الوطنية.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-bold text-slate-300">
              <span className="flex items-center gap-1.5">
                <FileCheck size={16} className="text-emerald-400" />
                <span>حسب المادة والمستوى</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Award size={16} className="text-blue-400" />
                <span>سلم التنقيط وعناصر الإجابة</span>
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen size={16} className="text-amber-400" />
                <span>لجميع الشعب والمسالك المغربية</span>
              </span>
            </div>
          </div>
        </section>

        {/* Detailed Ministry Resources Component */}
        <MinistryResources />

        {/* Quick Consultation Banner */}
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              هل تواجه صعوبة في فهم تمرين أو قاعدة من هذه المراجع؟
            </h3>
            <p className="text-sm sm:text-base text-slate-600 font-semibold max-w-2xl mx-auto">
              اطرح مسألتك على الأستاذ الافتراضي الذكي لمدرسي وسيقوم بشرح خطوات الحل والتذكير بالقاعدة من المقرر.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/tuteur"
                className="px-6 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-black text-sm shadow-md transition-all flex items-center gap-2"
              >
                <span>ابدأ الشرح المباشر مع الأستاذ</span>
                <ArrowLeft size={16} />
              </Link>
              <Link
                href="/examens"
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-black text-sm border border-slate-300 shadow-xs"
              >
                <span>الانتقال لبنك الامتحانات الوطنية</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
