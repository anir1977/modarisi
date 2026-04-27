import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "أسعار الاشتراك في موديريسي",
  description: "تعرف على خطط موديريسي الحالية: استعمال مجاني، وخطة بلوس بتفعيل يدوي عبر WhatsApp إلى حين إضافة الدفع الإلكتروني.",
  alternates: { canonical: "/pricing" },
};

const PLANS = [
  {
    name: "مجاني",
    price: "0",
    period: "دائماً",
    color: "border-slate-200",
    badge: null,
    desc: "للبداية والتجربة",
    features: [
      { label: "تصفح الدروس المتاحة", included: true },
      { label: "الفروض والتمارين المنشورة", included: true },
      { label: "نماذج الامتحانات المتاحة", included: true },
      { label: "صفحة مصادر المحتوى وحالة التحقق", included: true },
      { label: "دعم مباشر عبر WhatsApp", included: false },
      { label: "تتبع خاص للتلميذ", included: false },
      { label: "دعم أولوية", included: false },
    ],
    cta: { label: "ابدأ مجاناً", href: "/auth/register", style: "border-2 border-slate-200 text-slate-700 hover:bg-slate-50" },
  },
  {
    name: "بلوس",
    price: "29",
    period: "درهم / شهر",
    color: "border-blue-500 ring-4 ring-blue-100",
    badge: "تفعيل يدوي",
    desc: "لمن يريد دعماً أوضح عبر WhatsApp",
    features: [
      { label: "كل ما في الخطة المجانية", included: true },
      { label: "توجيه عبر WhatsApp لاختيار المواد والموارد", included: true },
      { label: "تنبيه عند إضافة فروض أو امتحانات جديدة", included: true },
      { label: "مساعدة في التسجيل واستعمال المنصة", included: true },
      { label: "تقرير تلقائي داخل المنصة", included: false },
      { label: "جلسات مباشرة", included: false },
    ],
    cta: { label: "اشترك في بلوس", href: "#whatsapp", style: "bg-blue-600 text-white hover:bg-blue-700" },
  },
  {
    name: "بريميوم",
    price: "قريباً",
    period: "",
    color: "border-amber-400 ring-4 ring-amber-50",
    badge: "قريباً",
    desc: "للعائلات بعد اكتمال الميزات",
    features: [
      { label: "حسابات متعددة للعائلة", included: false },
      { label: "تقارير تقدم أوضح للأولياء", included: false },
      { label: "لوحة متابعة عائلية", included: false },
      { label: "دعم أولوية", included: false },
      { label: "لن يتم بيعها حتى تكتمل الميزات", included: true },
    ],
    cta: { label: "أخبرني عند الإطلاق", href: "#whatsapp", style: "bg-amber-500 text-white hover:bg-amber-600" },
  },
];

const FAQ = [
  {
    q: "كيف يمكنني الاشتراك؟",
    a: "حالياً يتم تفعيل بلوس يدوياً عبر WhatsApp فقط. نوضح لك الخطة والمدة قبل أي أداء، وسيتم إضافة الدفع الإلكتروني لاحقاً.",
  },
  {
    q: "هل يمكنني إلغاء الاشتراك في أي وقت؟",
    a: "نعم، يمكنك إلغاء الاشتراك في أي وقت بإرسال رسالة واتساب. لا التزامات ولا رسوم مخفية.",
  },
  {
    q: "هل النسخة المجانية كافية للمراجعة؟",
    a: "نعم، النسخة المجانية مناسبة للبداية وتصفح الموارد المتاحة. بلوس موجه لمن يريد دعماً مباشراً وتوجيهاً عبر WhatsApp.",
  },
  {
    q: "ما الفرق بين بلوس وبريميوم؟",
    a: "بلوس متاح حالياً بتفعيل يدوي. بريميوم مازال قيد الإعداد ولن نبيعه حتى تكتمل ميزاته فعلياً.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 md:pb-0">
      <Navbar />

      {/* ── Compact hero ──────────────────── */}
      <section className="relative pt-20 pb-8 bg-gradient-to-b from-emerald-700 via-teal-700 to-emerald-600 overflow-hidden">
        {/* Subtle geometric pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 30%, white 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }} />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 backdrop-blur-sm">
            <span>💰</span>
            <span>أسعار واضحة بدون مفاجآت</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white mb-2 leading-tight">
            اختر الخطة
            <span className="text-amber-300"> المناسبة لك</span>
          </h1>
          <p className="text-emerald-50/90 text-sm">
            ابدأ مجاناً — لا حاجة إلى بطاقة بنكية
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl border-2 ${plan.color} p-7 flex flex-col`}
            >
              {plan.badge && (
                <span className="absolute -top-3.5 right-1/2 translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap shadow">
                  {plan.badge}
                </span>
              )}

              <div className="mb-6">
                <h2 className="text-xl font-black text-[#1E293B]">{plan.name}</h2>
                <p className="text-slate-400 text-sm mt-0.5">{plan.desc}</p>
                <div className="flex items-baseline gap-1 mt-3">
                  <span className="text-5xl font-black text-[#1E293B] ltr-num">{plan.price}</span>
                  <span className="text-slate-400 text-sm">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-7 flex-1">
                {plan.features.map((f) => (
                  <li key={f.label} className="flex items-start gap-2.5 text-sm">
                    <span className={`mt-0.5 font-bold ${f.included ? "text-emerald-500" : "text-slate-300"}`}>
                      {f.included ? "✓" : "✗"}
                    </span>
                    <span className={f.included ? "text-slate-700" : "text-slate-300"}>
                      {f.label}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.cta.href}
                className={`block text-center px-4 py-3 rounded-xl font-bold text-sm transition-all ${plan.cta.style}`}
              >
                {plan.cta.label}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section id="whatsapp" className="bg-emerald-50 border-y border-emerald-100 py-12 px-4">
        <div className="max-w-xl mx-auto text-center">
          <span className="text-4xl mb-4 block">💬</span>
          <h2 className="text-2xl font-black text-[#1E293B] mb-3">للاشتراك تواصل معنا</h2>
          <p className="text-slate-500 mb-6">
            يتم تفعيل بلوس حالياً عبر WhatsApp فقط. سنوضح لك الخطة، المدة، وما هو متاح فعلياً قبل أي أداء. سيتم إضافة الدفع الإلكتروني المباشر لاحقاً.
          </p>
          <a
            href="https://wa.me/212708025467?text=مرحباً، أريد الاشتراك في موديريسي"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-emerald-200"
          >
            <span className="text-xl">💬</span>
            تواصل عبر WhatsApp: <span className="ltr-num">0708025467</span>
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-black text-center text-[#1E293B] mb-8">أسئلة شائعة</h2>
        <div className="space-y-4">
          {FAQ.map((item) => (
            <div key={item.q} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h3 className="font-bold text-[#1E293B] mb-2">{item.q}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <BottomNav />
    </div>
  );
}
