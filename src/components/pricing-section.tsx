"use client";
import { Check, Sparkles, Shield } from "lucide-react";

export function PricingSection() {
  return (
    <section id="tarifs" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Large Bold Arabic Typography */}
        <div className="text-center max-w-3xl mx-auto mb-18 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs sm:text-sm font-black">
            <Sparkles size={16} />
            <span>اشتراكات مدروسة ومتاحة لجميع الأسر المغربية 🇲🇦</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            تعليم ودعم استثنائي بثمن يقل عن حصة ساعات إضافية واحدة
          </h2>
          <p className="text-slate-700 text-base sm:text-lg font-semibold leading-relaxed">
            دون الحاجة لدفع مبالغ باهظة شهرياً؛ أستاذك الخصوصي الذكي متاح في جيبك ليلاً ونهاراً في جميع المواد الدراسية.
          </p>
        </div>

        {/* Pricing Cards Grid with Generous Padding & Large Clear Text */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-stretch max-w-5xl mx-auto">
          
          {/* Plan 1: Gratuit */}
          <div className="p-8 sm:p-9 rounded-3xl bg-slate-50 border border-slate-300 shadow-sm flex flex-col justify-between space-y-7">
            <div className="space-y-5">
              <span className="text-xs font-black text-slate-500 uppercase tracking-wider block">
                الباقة المجانية التجريبية
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-5xl font-black text-slate-950">0</span>
                <span className="text-sm font-black text-slate-600">درهم / دائماً</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                مثالية للتجربة السريعة وطرح أسئلة منهجية قبل الفروض المحروسة والامتحانات.
              </p>
              
              <ul className="space-y-3.5 pt-5 border-t border-slate-200 text-xs sm:text-sm font-semibold text-slate-800">
                <li className="flex items-center gap-2.5">
                  <Check size={18} className="text-emerald-700 shrink-0" />
                  <span>5 أسئلة أو شروحات تفاعلية يومياً</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={18} className="text-emerald-700 shrink-0" />
                  <span>الاطلاع على ملخصات الدروس الأساسية</span>
                </li>
                <li className="flex items-center gap-2.5 text-slate-400">
                  <span>تصوير التمارين وتحليلها (محدود)</span>
                </li>
                <li className="flex items-center gap-2.5 text-slate-400">
                  <span>امتحانات الباكالوريا المصححة بالكامل</span>
                </li>
              </ul>
            </div>

            <a
              href="#tuteur"
              className="w-full py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-black text-sm text-center border-2 border-slate-300 shadow-xs transition-all block"
            >
              ابدأ الاستخدام المجاني
            </a>
          </div>

          {/* Plan 2: VIP Mensuel (Most Popular) */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-emerald-900 via-emerald-950 to-slate-950 text-white shadow-2xl border-2 border-emerald-400 flex flex-col justify-between space-y-7 relative transform md:-translate-y-4">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-5 py-1.5 rounded-full bg-emerald-400 text-slate-950 font-black text-xs tracking-wide shadow-md">
              الخيار الأكثر طلباً لدى تلاميذ الباكالوريا 🔥
            </div>

            <div className="space-y-5">
              <span className="text-xs font-black text-emerald-300 uppercase tracking-wider block">
                اشتراك مدرسي VIP الشهري
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-6xl font-black text-white">49</span>
                <span className="text-sm font-black text-emerald-300">درهم / شهرياً</span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-100/90 font-semibold leading-relaxed">
                أستاذك الشخصي 24/24 ساعة دون انقطاع، حل التمارين المصورة والتحضير المركز للامتحان الوطني.
              </p>
              
              <ul className="space-y-3.5 pt-5 border-t border-emerald-800 text-xs sm:text-sm text-emerald-50 font-semibold">
                <li className="flex items-center gap-2.5">
                  <Check size={18} className="text-emerald-400 shrink-0" />
                  <strong className="font-black">أسئلة وشروحات غير محدودة في جميع المواد</strong>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={18} className="text-emerald-400 shrink-0" />
                  <span>تصوير وحل التمارين فورياً (Snap &amp; Solve)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={18} className="text-emerald-400 shrink-0" />
                  <span>جميع الامتحانات الوطنية والجهوية من 2010 إلى 2024</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={18} className="text-emerald-400 shrink-0" />
                  <span>توجيهات منهجية مخصصة للحصول على ميزة تفوق</span>
                </li>
              </ul>
            </div>

            <a
              href="#tuteur"
              className="w-full py-4 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-base text-center shadow-lg transition-all block transform hover:scale-[1.02]"
            >
              اشترك الآن بـ 49 درهم فقط 🚀
            </a>
          </div>

          {/* Plan 3: Pass Annuel Bac */}
          <div className="p-8 sm:p-9 rounded-3xl bg-slate-50 border border-slate-300 shadow-sm flex flex-col justify-between space-y-7">
            <div className="space-y-5">
              <span className="text-xs font-black text-blue-800 uppercase tracking-wider block">
                اشتراك النجاح السنوي الكامل
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-5xl font-black text-slate-950">199</span>
                <span className="text-sm font-black text-slate-600">درهم / سنة دراسية كاملة</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                مرافقة مستمرة طيلة الموسم الدراسي حتى الدورة العادية والاستدراكية مع توجيه المدارس العليا.
              </p>
              
              <ul className="space-y-3.5 pt-5 border-t border-slate-200 text-xs sm:text-sm font-semibold text-slate-800">
                <li className="flex items-center gap-2.5">
                  <Check size={18} className="text-emerald-700 shrink-0" />
                  <span>كافة مزايا باقة VIP دون قيود</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={18} className="text-emerald-700 shrink-0" />
                  <span>توفير أكثر من 65% مقارنة بالدفع الشهري</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={18} className="text-emerald-700 shrink-0" />
                  <span>نماذج مباريات المدارس العليا (CPGE, ENSA, ENCG, FMP)</span>
                </li>
              </ul>
            </div>

            <a
              href="#tuteur"
              className="w-full py-4 rounded-2xl bg-blue-800 hover:bg-blue-900 text-white font-black text-sm text-center shadow-sm transition-all block"
            >
              اختر الاشتراك السنوي
            </a>
          </div>

        </div>

        {/* Moroccan Payment Methods Notice */}
        <div className="mt-16 max-w-2xl mx-auto p-5 rounded-2xl bg-slate-50 border border-slate-300 text-center text-xs sm:text-sm text-slate-700 space-y-2">
          <div className="font-black text-slate-950 flex items-center justify-center gap-2 text-base">
            <Shield size={18} className="text-emerald-800" />
            <span>طرق الدفع المحلية المعتمدة بالمملكة المغربية 🇲🇦</span>
          </div>
          <p className="text-slate-600 font-semibold leading-relaxed">
            أداء مؤمن وسهل عبر: التحويل البنكي الفوري (CIH Bank، التجاري وفا بنك)، الأداء نقداً عبر وكالات CashPlus و Wafacash، أو عبر البطاقة البنكية المغربية (CMI).
          </p>
        </div>

      </div>
    </section>
  );
}
