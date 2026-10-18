"use client";
import { Check, Sparkles, Shield, Zap, CreditCard, Banknote } from "lucide-react";

export function PricingSection() {
  return (
    <section id="tarifs" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-extrabold">
            <Sparkles size={14} />
            <span>اشتراكات بسيطة ومناسبة لجميع الأسر المغربية 🇲🇦</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            تعليم ودعم عالي الجودة بثمن أقل من حصة سوايع واحدة
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            بلا ما تخسر آلاف الدراهم شهرياً؛ أستاذ خصوصي ذكي متاح فـ جيبك ليل ونهار فـ جميع المواد.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* Plan 1: Gratuit */}
          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block">
                الباقة المجانية
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900">0</span>
                <span className="text-sm font-bold text-slate-500">درهم / دائماً</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                مثالية للتجربة وطرح بعض الأسئلة السريعة قبل الفروض والامتحانات.
              </p>
              
              <ul className="space-y-3 pt-4 border-t border-slate-200 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-700 shrink-0" />
                  <span>5 أسئلة أو شروحات فـ النهار</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-700 shrink-0" />
                  <span>الوصول لملخصات الدروس الأساسية</span>
                </li>
                <li className="flex items-center gap-2 text-slate-400">
                  <span>صور التمارين بالكاميرا (محدودة)</span>
                </li>
                <li className="flex items-center gap-2 text-slate-400">
                  <span>امتحانات الباك المصححة بالتفصيل</span>
                </li>
              </ul>
            </div>

            <a
              href="#tuteur"
              className="w-full py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs text-center border border-slate-300 transition-all block"
            >
              ابدأ مجاناً الآن
            </a>
          </div>

          {/* Plan 2: VIP Mensuel (Most Popular) */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-emerald-900 via-emerald-950 to-slate-950 text-white shadow-2xl border-2 border-emerald-500 flex flex-col justify-between space-y-6 relative transform md:-translate-y-3">
            <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-500 text-slate-950 font-black text-[11px] tracking-wide shadow-md">
              الأكثر طلباً عند تلاميذ الباك 🔥
            </div>

            <div className="space-y-4">
              <span className="text-xs font-extrabold text-emerald-300 uppercase tracking-wider block">
                Pass Modarisi VIP الشهري
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black text-white">49</span>
                <span className="text-sm font-bold text-emerald-300">درهم / شهر</span>
              </div>
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                أستاذك الشخصي 24/24 ساعة بدون انقطاع، حل التمارين بالصور وتحضير الامتحانات.
              </p>
              
              <ul className="space-y-3 pt-4 border-t border-emerald-800 text-xs text-emerald-50">
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-400 shrink-0" />
                  <strong className="font-bold">أسئلة وشروحات غير محدودة</strong>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-400 shrink-0" />
                  <span>حل وتفسير التمارين بالصور 24/7 (Snap & Solve)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-400 shrink-0" />
                  <span>جميع الامتحانات الوطنية والجهوية من 2010 إلى 2024</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-400 shrink-0" />
                  <span>منهجية الحصول على ميزة في الباكالوريا</span>
                </li>
              </ul>
            </div>

            <a
              href="#tuteur"
              className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm text-center shadow-lg transition-all block"
            >
              اشترك الآن بـ 49 درهم 🚀
            </a>
          </div>

          {/* Plan 3: Pass Annuel Bac */}
          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-extrabold text-blue-700 uppercase tracking-wider block">
                Pass النجاح السنوي (عام كامل)
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900">199</span>
                <span className="text-sm font-bold text-slate-500">درهم / سنة كاملة</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                دعم مستمر طيلة الموسم الدراسي حتى الدورة العادية والاستدراكية مع توجيه المدارس العليا.
              </p>
              
              <ul className="space-y-3 pt-4 border-t border-slate-200 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-700 shrink-0" />
                  <span>كل مميزات باقة VIP بدون قيود</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-700 shrink-0" />
                  <span>توفير أكثر من 60% مقارنة بالدفع الشهري</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-700 shrink-0" />
                  <span>نماذج مباريات المدارس والمعاهد العليا (CPGE, ENSA, ENCG, FMP)</span>
                </li>
              </ul>
            </div>

            <a
              href="#tuteur"
              className="w-full py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs text-center shadow-sm transition-all block"
            >
              اختر العرض السنوي
            </a>
          </div>

        </div>

        {/* Moroccan Payment Methods Notice */}
        <div className="mt-14 max-w-2xl mx-auto p-4 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-600 space-y-2">
          <div className="font-extrabold text-slate-900 flex items-center justify-center gap-2">
            <Shield size={16} className="text-emerald-700" />
            <span>طرق الدفع المتوفرة في المغرب 🇲🇦</span>
          </div>
          <p className="text-[11px] text-slate-500">
            أداء ساهل ومؤمن عبر: البطاقة البنكية المغربية (CMI)، التحويل البنكي (CIH Bank، التجاري وفا بنك)، أو نقداً عبر وكالات CashPlus و Wafacash.
          </p>
        </div>

      </div>
    </section>
  );
}
