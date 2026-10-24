import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PedagogicalCharter } from "@/components/pedagogical-charter";
import { ShieldCheck, Compass, CheckCircle2, Award, BookOpen, GraduationCap, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "الميثاق البيداغوجي والاعتماد الأكاديمي | مدرسي modarisi.ma",
  description: "الميثاق التربوي لمنصة مدرسي المغربية: شروحات منهجية تساعد على الفهم، الشفافية حول حدود الذكاء الاصطناعي، واحترام المقرر الدراسي المغربي.",
};

export default function ChartePage() {
  const commitments = [
    {
      title: "الالتزام بالنزاهة والديدكتيك الوطني",
      desc: "نرفض منطق تقديم الإجابات الجاهزة السطحية. دورنا هو مرافقة التلميذ في تفكيك الوضعية-المسألة واستحضار القاعدة المناسبة وبناء البرهان المنطقي المتماسك.",
    },
    {
      title: "مراعاة بنية الامتحانات",
      desc: "نصمم التمارين والنماذج على شاكلة الامتحانات الإشهادية، ونشير بوضوح إلى أنها نماذج تدريبية وليست مواضيع أو تصحيحات رسمية.",
    },
    {
      title: "الإنصاف وتكافؤ الفرص",
      desc: "توفير تعليم خصوصي ودعم دراسي عالي الجودة لجميع أبناء وبنات المغرب في مختلف الجهات، بتكلفة رمزية وشفافة، لسد الفجوات التعليمية وضمان التفوق للجميع.",
    },
    {
      title: "الحماية وسرية معطيات التلميذ",
      desc: "نحافظ على خصوصية التلميذ وصوره وتمارينه وفق أحكام القانون المغربي رقم 09-08 المتعلق بحماية الأشخاص الذاتيين تجاه معالجة المعطيات ذات الطابع الشخصي (CNDP).",
    },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Hero Header */}
        <section className="bg-[#2b2fb3] text-white py-16 lg:py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-black">
              <ShieldCheck size={16} />
              <span>المرجعية الأكاديمية والأخلاقية 🇲🇦</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              الميثاق البيداغوجي
              <span className="block mt-2 text-[#f2b233]">
                رؤية تربوية رصينة في خدمة التلميذ المغربي
              </span>
            </h1>

            <p className="text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed font-normal">
              تلتزم منصة «مدرسي» بتقديم مصاحبة تربوية ذات جودة علمية فائقة تنسجم مع أهداف الرؤية الاستراتيجية لإصلاح منظومة التربية والتكوين بالمملكة المغربية، والقانون الإطار 51-17.
            </p>
          </div>
        </section>

        {/* Core Pedagogical Charter Component */}
        <PedagogicalCharter />

        {/* 4 Pillars of Institutional Trust */}
        <section className="py-20 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-emerald-800 font-black text-xs">التزاماتنا المؤسساتية</span>
              <h3 className="text-2xl sm:text-4xl font-black text-slate-900">
                أربعة تعهدات بيداغوجية راسخة لكل تلميذ وولي أمر
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {commitments.map((comm, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow text-right space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-black text-base flex items-center justify-center">
                    0{idx + 1}
                  </div>
                  <h4 className="text-xl font-black text-slate-900 leading-snug">
                    {comm.title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    {comm.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Call to Action */}
            <div className="p-8 sm:p-10 rounded-3xl bg-emerald-900 text-white text-center space-y-6">
              <h4 className="text-2xl sm:text-3xl font-black">
                انضم إلى آلاف التلميذات والتلاميذ المتفوقين في الباكالوريا
              </h4>
              <p className="text-sm sm:text-base text-emerald-100 max-w-2xl mx-auto font-medium">
                ابدأ اليوم تجربتك المجانية واكتشف فارق المنهجية الأكاديمية مع الأستاذ الافتراضي الموجه.
              </p>
              <div>
                <Link
                  href="/tuteur"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white text-emerald-950 font-black text-sm shadow-xl hover:bg-emerald-50 transition-all"
                >
                  <span>ابدأ الشرح المباشر الآن</span>
                  <ArrowLeft size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
