"use client";
import { CheckCircle2, Shield, Compass, BookOpen, Sparkles, Award } from "lucide-react";

export function PedagogicalCharter() {
  const pillars = [
    {
      icon: Compass,
      title: "التدرج الديدكتيكي وبناء البرهان الرياضي",
      description: "لا نقتصر على تقديم النتيجة النهائية المجردة، بل نسترشد بمراحل البرهان المنهجي (Hypothèse, Démonstration, Conclusion)، مع تبيان كيفية تنظيم ورقة التحرير لحصد النقطة الكاملة.",
      tag: "المنهجية العلمية",
      color: "emerald",
    },
    {
      icon: Shield,
      title: "المطابقة الصارمة للأطر المرجعية المحينة",
      description: "تعتمد خوارزميات التوجيه لدينا على القرارات والمذكرات الوزارية الصادرة عن وزارة التربية الوطنية، مع مراعاة المعاملات الرسمية ومستويات الكفايات المستهدفة في كل مادة.",
      tag: "مرجعية رسمية",
      color: "blue",
    },
    {
      icon: BookOpen,
      title: "المصاحبة اللغوية المزدوجة (مسالك دولية BIOF)",
      description: "استخدام المصطلحات العلمية باللغة الفرنسية المعتمدة رسمياً في الامتحانات الوطنية، مصحوبة بشروحات توضيحية مبسطة بالدارجة المغربية التربوية لتسهيل الفهم واستيعاب الإشكال.",
      tag: "خيار فرنسية وعربية",
      color: "teal",
    },
    {
      icon: Award,
      title: "التقويم التكويني ومعالجة التعثرات الشائعة",
      description: "التنبيه التلقائي للأخطاء الكلاسيكية التي يسقط فيها المترشحون في الامتحانات الإشهادية (إغفال مجموعة التعريف، عدم تعليل تقارب المتتاليات، نسيان الوحدات في الفيزياء والكيمياء).",
      tag: "تفادي الفخاخ",
      color: "amber",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-slate-900 text-white relative overflow-hidden">
      {/* Background glow and subtle accent shapes */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-black">
            <Sparkles size={16} />
            <span>الميثاق البيداغوجي لمدارسي 🇲🇦</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            تعليم أكاديمي رصين يرتكز على
            <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-l from-emerald-400 via-teal-300 to-amber-200">
              معايير التميز والديدكتيك المغربي
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed">
            تم تصميم منصة «مدرسي» تحت إشراف وتوجيه أطر تربوية وأساتذة ممارسين لمواد الباكالوريا، لضمان مرافقة بيداغوجية حقيقية تتجاوز الشروحات الآلية السطحية.
          </p>
        </div>

        {/* 4 Pillars Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-slate-800/70 border border-slate-700 hover:border-emerald-500/50 hover:bg-slate-800 transition-all space-y-5 text-right relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-black">
                    {pillar.tag}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                    <Icon size={24} />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                  {pillar.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
                  {pillar.description}
                </p>

                <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400 font-bold">
                  <CheckCircle2 size={16} />
                  <span>معتمد في كافة مسارات المنصة</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quote / Institutional Trust Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-950 to-teal-950 border border-emerald-500/30 text-center max-w-4xl mx-auto space-y-4">
          <p className="text-base sm:text-xl font-bold text-slate-200 leading-relaxed italic">
            «هدفنا ليس إعطاء التلميذ إجابة جاهزة ينسخها في ورقة، بل تمكينه من امتلاك آليات التفكير النقدي الرياضي والفيزياء التحليلية ليواجه الامتحان الوطني بثقة وتفوق تامين.»
          </p>
          <div className="text-xs text-emerald-400 font-black tracking-wide uppercase">
            ـ الفريق البيداغوجي لمنصة مدرسي بالمملكة المغربية
          </div>
        </div>

      </div>
    </section>
  );
}
