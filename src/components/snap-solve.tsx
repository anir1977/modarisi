"use client";
import { useState } from "react";
import { Camera, Upload, Sparkles, CheckCircle2, ChevronRight, FileQuestion, ArrowRight } from "lucide-react";

const SAMPLE_EXERCISES = [
  {
    title: "تمرين الماط : حساب التكامل وتأطير المتتاليات (باك علوم فيزيائية)",
    subject: "Mathématiques",
    preview: "Soit (Un) la suite définie par U0 = 1 et U(n+1) = ln(2 + Un)...",
    solutionSteps: [
      "المرحلة 1 : التحقق بالترجع (Récurrence) أن 1 <= Un <= 2 لجميع قيم n في N.",
      "المرحلة 2 : دراسة إشارة الفرق U(n+1) - Un باستخدام رتابة الدالة المرفقة f(x) = ln(2 + x).",
      "المرحلة 3 : الاستنتاج أن المتتالية تزايدية ومكبرة إذن متقاربة، وتحديد النهاية L = ln(2 + L).",
      "💡 نصيحة المصحح : في الامتحان الوطني، لا تنس كتابة 'متقاربة لأنها تزايدية ومكبرة' للحصول على 0.5 نقطة كاملة.",
    ],
  },
  {
    title: "تمرين الفيزياء : الدارة RLC المتذبذبة وحساب شبه الدور T",
    subject: "Physique-Chimie",
    preview: "À t=0 on ferme l'interrupteur K, le condensateur de capacité C=10µF se décharge...",
    solutionSteps: [
      "المرحلة 1 : تطبيق قانون إضافية التوترات : Uc(t) + Ur(t) + UL(t) = 0.",
      "المرحلة 2 : إيجاد المعادلة التفاضلية التي يحققها التوتر Uc : d²Uc/dt² + (R/L)·dUc/dt + Uc/(LC) = 0.",
      "المرحلة 3 : تحديد شبه الدور T0 = 2π√(L·C) مبيانياً من المنحنى وحساب معامل التحريض L.",
      "💡 نصيحة المصحح : احرص على تحويل الميكروفاراد (µF) إلى الفاراد (×10⁻⁶) لتجنب ضياع الحساب العددي.",
    ],
  },
  {
    title: "الامتحان الجهوي للفرنسية : استخراج وتحليل Figures de style",
    subject: "Français",
    preview: "Extrait de 'Le Dernier Jour d'un Condamné' : 'Une idée terrible, une idée de plomb me pesait...'",
    solutionSteps: [
      "المرحلة 1 : تحديد الصورة البيانية الأولى : 'Une idée de plomb' = Métaphore (استعارة مكنية).",
      "المرحلة 2 : تحليل الأثر البلاغي (L'effet produit) : تبيان ثقل الهاجس النفسي للمحكوم عليه بالإعدام.",
      "المرحلة 3 : صياغة الجواب المنهجي بالفرنسية للحصول على نقطة التحليل الكاملة في الجهوي.",
    ],
  },
];

export function SnapSolve() {
  const [activeSample, setActiveSample] = useState(0);
  const [customSolving, setCustomSolving] = useState(false);

  return (
    <section id="snap" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Column Left */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-100 group">
              <img
                src="watermarked_img_3119753226099982101.jpg"
                alt="تلميذ مغربي يصور تمرين الرياضيات بالهاتف عبر منصة مدرسي"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex items-end p-6">
                <div className="text-white">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-600/90 text-white text-xs font-bold mb-2">
                    <Camera size={14} /> خاصية Snap & Solve الذكية
                  </div>
                  <h3 className="text-lg font-bold">صور أي تمرين من الدفتر أو السلسلة</h3>
                  <p className="text-xs text-slate-300 mt-1">الذكاء الاصطناعي كيقرا خط اليد والمعادلات وكيشرح ليك منهجية الحل فـ ثواني.</p>
                </div>
              </div>
            </div>

            {/* Quick Feature Badges */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="block text-emerald-800 font-extrabold text-sm">2 ثواني</strong>
                <span className="text-slate-500 text-[11px]">سرعة التحليل</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="block text-blue-800 font-extrabold text-sm">خط اليد</strong>
                <span className="text-slate-500 text-[11px]">قراءة الكتابة الورقية</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="block text-amber-800 font-extrabold text-sm">بيداغوجي</strong>
                <span className="text-slate-500 text-[11px]">خطوات مع التعليل</span>
              </div>
            </div>
          </div>

          {/* Interactive Demo Column Right */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-extrabold mb-3">
                <Sparkles size={14} />
                <span>جرّب دابا نماذج من تمارين الباك الحقيقية</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                وحلتي فـ شي تمرين ؟ صور بالكاميرا وشوف الشرح التفاعلي
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                اختر نموذج من التمارين أسفله باش تشوف كيفاش الأستاذ الذكي كيشرح للتلميذ خطوة بخطوة بالتعليل العلمي:
              </p>
            </div>

            {/* Sample Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {SAMPLE_EXERCISES.map((ex, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveSample(i)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeSample === i
                      ? "bg-slate-900 text-white shadow-md"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {ex.subject}
                </button>
              ))}
            </div>

            {/* Active Exercise Card & Solution Box */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <FileQuestion size={18} className="text-emerald-700" />
                  <strong className="text-sm text-slate-900 font-extrabold">
                    {SAMPLE_EXERCISES[activeSample].title}
                  </strong>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                  محلول بالتفصيل
                </span>
              </div>

              {/* Problem Preview */}
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 font-mono">
                {SAMPLE_EXERCISES[activeSample].preview}
              </div>

              {/* Step by Step Breakdown */}
              <div className="space-y-2.5 pt-1">
                {SAMPLE_EXERCISES[activeSample].solutionSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white rounded-xl border border-slate-100 shadow-xs flex items-start gap-3 text-xs leading-relaxed text-slate-800"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>{step}</div>
                  </div>
                ))}
              </div>

              {/* Upload CTA box */}
              <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-slate-500 font-semibold">
                  باغي تحط تمرين ديالك خاص دابا ؟
                </span>
                <a
                  href="#tuteur"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-sm transition-all"
                >
                  <Camera size={14} />
                  <span>صور التمرين ديالك الآن</span>
                  <ArrowRight size={12} />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
