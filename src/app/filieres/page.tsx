import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { TRACKS } from "@/lib/curriculum";
import { BookOpen, Award, GraduationCap, ArrowLeft, CheckCircle2, Compass, School } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "دليل الشعب والمسالك الدراسية وآفاق ما بعد الباكالوريا | مدرسي modarisi.ma",
  description: "دليل شامل لشعب ومسالك الباكالوريا بالمغرب: العلوم الرياضية، العلوم التجريبية، العلوم الاقتصادية، مع معاملات المواد والآفاق الجامعية والمدارس العليا.",
  alternates: { canonical: "/filieres" },
};

export default function FilieresPage() {
  const horizons: Record<string, string[]> = {
    "2bac-sm": [
      "الأقسام التحضيرية للمدارس العليا للمهندسين (CPGE MPSI / PCSI)",
      "كليات الطب والصيدلة وطب الأسنان (FMP / FMD)",
      "المعهد الوطني للبريد والمواصلات (INPT)",
      "المدرسة الوطنية العليا للمعادن بالرباط (Mines Rabat)",
      "المدارس الوطنية للعلوم التطبيقية (ENSA) والمدارس الوطنية للفنون والمهن (ENSAM)",
      "جامعة محمد السادس متعددة التخصصات التقنية (UM6P)",
    ],
    "2bac-pc": [
      "كليات الطب والصيدلة وطب الأسنان (FMP / FMD)",
      "المدارس الوطنية للعلوم التطبيقية (ENSA Maroc)",
      "المدرسة الوطنية العليا للفنون والمهن (ENSAM)",
      "الأقسام التحضيرية للمدارس العليا (CPGE PCSI)",
      "معهد الحسن الثاني للزراعة والبيطرة (IAV Hassan II)",
      "المدرسة الوطنية للهندسة المعمارية (ENA)",
      "المعاهد العليا للمهن التمريضية وتقنيات الصحة (ISPITS)",
    ],
    "2bac-svt": [
      "كليات الطب والصيدلة وطب الأسنان (FMP / FMD)",
      "المعاهد العليا للمهن التمريضية وتقنيات الصحة (ISPITS)",
      "معهد الحسن الثاني للزراعة والبيطرة (IAV)",
      "المدرسة الوطنية للفلاحة بمكناس (ENA Meknès)",
      "كليات العلوم والتقنيات (FST - تقنيات الصحة والبيولوجيا)",
      "المدارس الوطنية للعلوم التطبيقية (ENSA)",
    ],
    "2bac-eco": [
      "المدارس الوطنية للتجارة والتسيير (ENCG Maroc)",
      "الأقسام التحضيرية الاقتصادية والتجارية (CPGE ECT)",
      "المعهد العالي للتجارة وإدارة المقاولات (ISCAE)",
      "كليات العلوم القانونية والاقتصادية والاجتماعية (FSJES)",
      "المدارس العليا للتكنولوجيا (EST - Finance / Management)",
    ],
    "1bac-reg": [
      "تأهيل التلميذ(ة) لاجتياز الامتحان الجهوي بنقطة متفوقة (تضمن 25% من معدل البكالوريا العام)",
      "تحديد مسلك الثانية باكالوريا بناء على النتائج والميول الأكاديمي",
    ],
    "college-3ac": [
      "التوجيه نحو الجذوع المشتركة: العلمي، التكنولوجي، أو الأدبي والعلوم الإنسانية",
      "التحضير للامتحان الجهوي الموحد لنيل شهادة السلك الإعدادي",
    ],
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Hero Header */}
        <section className="bg-[#2b2fb3] text-white py-16 lg:py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-black">
              <Compass size={16} />
              <span>دليل التوجيه المدرسي والمسارات الأكاديمية بالمغرب 🇲🇦</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              الشعب والمسالك الدراسية
              <span className="block mt-2 text-[#f2b233]">
                المعاملات الرسمية وآفاق ما بعد الباكالوريا
              </span>
            </h1>

            <p className="text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed font-normal">
              تعرف على خصوصيات كل مسلك دراسي، أوزان المواد المقررة في الامتحان الإشهادي، والمعاهد والمدارس العليا والجامعات التي تفتح أبوابها بعد الحصول على شهادة الباكالوريا بميزة مشرفة.
            </p>
          </div>
        </section>

        {/* Tracks Detailed Catalog */}
        <section className="py-16 lg:py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            <div className="space-y-10">
              {TRACKS.map((track) => (
                <div
                  key={track.id}
                  id={track.id}
                  className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-md hover:shadow-xl transition-all space-y-6 text-right"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                    <div>
                      <span className={`inline-block text-xs font-black px-3 py-1 rounded-md border ${track.badgeColor}`}>
                        {track.level === "2bac" ? "الثانية باكالوريا" : track.level === "1bac" ? "الأولى باكالوريا" : "السلك الإعدادي"}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 leading-tight">
                        {track.nameAr}
                      </h2>
                      <div className="text-xs text-slate-500 font-sans mt-0.5">{track.name}</div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link
                        href={`/tuteur?track=${track.id}`}
                        className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-black text-xs shadow-md transition-all flex items-center gap-1.5"
                      >
                        <span>مراجعة هذا المسلك مع الأستاذ</span>
                        <ArrowLeft size={14} />
                      </Link>
                    </div>
                  </div>

                  {/* Curriculum Details */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left: Subjects & Scope */}
                    <div className="lg:col-span-6 space-y-4">
                      <h4 className="font-black text-sm text-slate-800 flex items-center gap-2">
                        <BookOpen size={18} className="text-emerald-700" />
                        <span>المواد المقررة ومعاملات الامتحان الوطني / الجهوي :</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {track.subjects.map((subj, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800"
                          >
                            {subj}
                          </span>
                        ))}
                      </div>

                      <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs text-slate-700 leading-relaxed">
                        <strong className="block text-emerald-950 font-black mb-1">المحاور البيداغوجية الأساسية :</strong>
                        {track.description}
                      </div>
                    </div>

                    {/* Right: Post-Bac Horizons */}
                    <div className="lg:col-span-6 space-y-4">
                      <h4 className="font-black text-sm text-slate-800 flex items-center gap-2">
                        <GraduationCap size={18} className="text-blue-700" />
                        <span>الآفاق الدراسية والمدارس العليا المتاحة :</span>
                      </h4>
                      <ul className="space-y-2">
                        {(horizons[track.id] || []).map((horizon, hIdx) => (
                          <li
                            key={hIdx}
                            className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700 flex items-center gap-2.5"
                          >
                            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                            <span>{horizon}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
