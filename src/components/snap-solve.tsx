"use client";
import { useState } from "react";
import { Camera, Sparkles, FileQuestion, ArrowLeft } from "lucide-react";

const SAMPLE_EXERCISES = [
  {
    title: "تمرين الرياضيات : حساب التكامل وتأطير المتتاليات العددية (شعبة العلوم التجريبية)",
    subject: "مادة الرياضيات",
    preview: "لتكن (Un) المتتالية العددية المعرفة بـ U0 = 1 و U(n+1) = ln(2 + Un)... أحسب النهاية وأثبت التقارب.",
    solutionSteps: [
      "المرحلة الأولى : البرهان بالترجع على أن 1 أصغر من أو يساوي Un أصغر من أو يساوي 2 لجميع الأعداد الصحيحة الطبيعية n.",
      "المرحلة الثانية : دراسة إشارة الفرق U(n+1) - Un وتوظيف رتابة الدالة المساعدة f(x) = ln(2 + x).",
      "المرحلة الثالثة : استنتاج أن المتتالية تزايدية ومكبورة بالعدد 2، وبالتالي فهي متقاربة نحو النهاية L = ln(2 + L).",
      "💡 توجيه الامتحان الوطني : لا تغفل كتابة التعليل المنهجي 'المتتالية متقاربة لكونها تزايدية ومكبورة' لضمان النقطة الكاملة في سلم التنقيط.",
    ],
  },
  {
    title: "تمرين الفيزياء : دراسة الدارة الكهربائية RLC المتذبذبة وحساب شبه الدور الذاتي",
    subject: "الفيزياء والكيمياء",
    preview: "عند اللحظة t=0 نغلق قاطع التيار K، فيفرغ المكثف ذو السعة C=10µF في الوشيعة ذات معامل التحريض L ومقاومة r...",
    solutionSteps: [
      "المرحلة الأولى : تطبيق قانون إضافية التوترات الكهربائية : Uc(t) + Ur(t) + UL(t) = 0.",
      "المرحلة الثانية : إثبات المعادلة التفاضلية التي يحققها التوتر بين مربطي المكثف Uc(t) مع تحديد المقادير الفيزيائية.",
      "المرحلة الثالثة : استخراج شبه الدور T0 = 2π√(L·C) مبيانياً من منحنى التذبذبات وحساب قيمة معامل التحريض L.",
      "💡 توجيه الامتحان الوطني : احرص على تحويل الميكروفاراد (µF) إلى الفاراد الدولي (الضرب في 10⁻⁶) لتفادي خطأ الحساب العددي.",
    ],
  },
  {
    title: "الامتحان الجهوي للفرنسية : استخراج وتحليل الصور البلاغية والإنشاء المنهجي",
    subject: "اللغة الفرنسية (الجهوي)",
    preview: "Extrait de 'Le Dernier Jour d'un Condamné' : 'Une idée terrible, une idée de plomb me pesait...'",
    solutionSteps: [
      "المرحلة الأولى : تحديد الصورة البيانية الأولى : 'Une idée de plomb' = Métaphore (استعارة توضح ثقل الهاجس النفسي للمحكوم).",
      "المرحلة الثانية : تحليل الأثر البلاغي والدرامي في النص وفق متطلبات الإطار المرجعي للامتحان الجهوي.",
      "المرحلة الثالثة : صياغة الإنشاء التحليلي وفق التصميم الجدلي (Thèse, Antithèse, Synthèse) بأسلوب فرنسي سليم.",
    ],
  },
];

export function SnapSolve() {
  const [activeSample, setActiveSample] = useState(0);

  return (
    <section id="snap" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Visual Column Left */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-100 group">
              <img
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80"
                alt="تلميذ مغربي يصور تمرين الرياضيات بالهاتف عبر منصة مدرسي"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex items-end p-6">
                <div className="text-white">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-700 text-white text-xs font-black mb-2 shadow-xs">
                    <Camera size={16} /> خاصية تصوير وحل التمارين الذكية
                  </div>
                  <h3 className="text-xl font-black">التقط صورة لأي تمرين من الدفتر أو السلسلة</h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 font-semibold leading-relaxed">
                    يتعرف الذكاء الاصطناعي على خط اليد والمعادلات والرموز فوراً، ويقدم لك خطوات الحل المنهجية.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs">
                <strong className="block text-emerald-800 font-black text-lg">ثانيتان</strong>
                <span className="text-slate-600 text-xs font-bold">سرعة التحليل الفوري</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs">
                <strong className="block text-blue-800 font-black text-lg">خط اليد</strong>
                <span className="text-slate-600 text-xs font-bold">قراءة الدفاتر والكتب</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs">
                <strong className="block text-amber-800 font-black text-lg">بيداغوجي</strong>
                <span className="text-slate-600 text-xs font-bold">شرح بالبرهان والتعليل</span>
              </div>
            </div>
          </div>

          {/* Interactive Demo Column Right */}
          <div className="lg:col-span-7 space-y-7">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-100 text-teal-900 text-xs sm:text-sm font-black mb-3">
                <Sparkles size={16} />
                <span>نماذج حية ومباشرة من امتحانات الباكالوريا</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
                هل استعصى عليك تمرين ؟ التقط صورة وتتبع الحل خطوة بخطوة
              </h2>
              <p className="text-slate-700 text-base sm:text-lg font-semibold mt-2 leading-relaxed">
                اختر نموذجاً من التمارين أسفله لتكتشف كيف يقوم الأستاذ الافتراضي بتفكيك المسألة وشرح طريقة البرهان العلمية :
              </p>
            </div>

            {/* Selector Tabs */}
            <div className="flex flex-wrap gap-2.5">
              {SAMPLE_EXERCISES.map((ex, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveSample(i)}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
                    activeSample === i
                      ? "bg-slate-950 text-white shadow-md transform scale-102"
                      : "bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200"
                  }`}
                >
                  {ex.subject}
                </button>
              ))}
            </div>

            {/* Active Exercise Box */}
            <div className="p-6 sm:p-7 rounded-3xl bg-slate-50 border border-slate-300 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <FileQuestion size={22} className="text-emerald-800" />
                  <strong className="text-base sm:text-lg text-slate-950 font-black">
                    {SAMPLE_EXERCISES[activeSample].title}
                  </strong>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black shrink-0">
                  محلول بالتفصيل
                </span>
              </div>

              {/* Preview */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200 text-sm text-slate-800 font-mono leading-relaxed">
                {SAMPLE_EXERCISES[activeSample].preview}
              </div>

              {/* Steps */}
              <div className="space-y-3">
                {SAMPLE_EXERCISES[activeSample].solutionSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs flex items-start gap-3.5 text-sm leading-relaxed text-slate-900 font-semibold"
                  >
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>{step}</div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs sm:text-sm text-slate-600 font-bold">
                  هل لديك تمرين من دفترك ترغب في تحليله الآن ؟
                </span>
                <a
                  href="#tuteur"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-black text-xs sm:text-sm shadow-md transition-all"
                >
                  <Camera size={16} />
                  <span>التقط صورة لتمرينك الآن</span>
                  <ArrowLeft size={14} />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
