import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PricingSection } from "@/components/pricing-section";
import { ShieldCheck, CheckCircle2, HelpCircle, CreditCard, Sparkles, PhoneCall } from "lucide-react";

export const metadata: Metadata = {
  title: "باقات الاشتراك وعروض الدعم المدرسي | مدرسي modarisi.ma",
  description: "باقات اشتراك مرنة وشفافة بالدرهم المغربي للتحضير المتفوق للباكالوريا. استفد من الأستاذ الافتراضي وحل التمارين بالصور وبنك الامتحانات المصححة.",
};

export default function TarifsPage() {
  const faqs = [
    {
      q: "هل يمكنني تجربة المنصة مجاناً قبل الاشتراك؟",
      a: "نعم بكل تأكيد. تتيح باقة «الانطلاق المجانية» لجميع التلميذات والتلاميذ تصفح المراجع والكتب المدرسية المعتمدة، وبنك الامتحانات الوطنية، وطرح أسئلة استكشافية يومية على الأستاذ الافتراضي دون الحاجة لأي بطاقة بنكية.",
    },
    {
      q: "ما هي طرق الأداء المتاحة بالمغرب؟",
      a: "نوفر جميع وسائل الأداء الآمنة بالمملكة: الأداء بالبطاقة البنكية المغربية (Centre Monétique Interbancaire - CMI / Visa / Mastercard)، التحويل البنكي المباشر (CIH Bank، التجاري وفا بنك، بريد بنك)، أو الأداء نقداً عبر وكالات كاش بلوس (Cash Plus) ووفاكاش (Wafacash).",
    },
    {
      q: "هل شروحات المنصة مطابقة للمقرر المغربي فعلاً؟",
      a: "مطابقة 100%. تم تدريب وضبط خوارزميات المنصة بالكامل استناداً إلى المنهاج التربوي الرسمي لوزارة التربية الوطنية بالمغرب، والأطر المرجعية المحينة للامتحانات الإشهادية، وكتب «المفيد» و«في رحاب» و«النجاح».",
    },
    {
      q: "هل تغطي المنصة مسالك خيار فرنسية (BIOF) وخيار عربية؟",
      a: "نعم، النظام مصمم خصيصاً للتعامل مع الازدواجية اللغوية: المصطلحات العلمية والرموز الرياضية والفيزيائية تُشرح بالفرنسية المعتمدة في الامتحان الوطني، مدعومة بتوضيحات بيداغوجية بالدارجة المغربية السلسة لتيسير الفهم.",
    },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Hero Header */}
        <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white py-16 lg:py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-black mx-auto">
              <Sparkles size={16} />
              <span>استثمار دراسي ذكي بنصف تكلفة الساعات الإضافية 🇲🇦</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto">
              باقات مرنة وشفافة بالدرهم المغربي
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-l from-emerald-400 via-teal-300 to-amber-200">
                لمرافقتك خطوة بخطوة حتى يوم الامتحان
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
              اختر الخطة المناسبة لاحتياجاتك الدراسية واستفد من مصاحبة بيداغوجية على مدار 24 ساعة لجميع المواد والشعب.
            </p>
          </div>
        </section>

        {/* Existing Pricing Section */}
        <PricingSection />

        {/* FAQ Section */}
        <section className="py-20 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 text-emerald-800 font-black text-xs">
                <HelpCircle size={16} />
                <span>الأسئلة الأكثر تداولاً</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-black text-slate-900">
                كل ما تحتاج معرفته عن باقات مدرسي
              </h3>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-colors text-right space-y-2"
                >
                  <h4 className="font-black text-base sm:text-lg text-slate-900 flex items-center justify-between gap-4">
                    <span>{faq.q}</span>
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black flex items-center justify-center shrink-0">
                      ؟
                    </span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>

            {/* Assistance Banner */}
            <div className="p-6 rounded-2xl bg-slate-900 text-white text-center space-y-3">
              <h4 className="font-black text-base text-white">هل لديك استفسار خاص أو ترغب في مساعدة في تفعيل حسابك؟</h4>
              <p className="text-xs text-slate-300 font-normal">
                فريق الدعم التربوي والتقني لمدرسي رهن إشارتك طيلة أيام الأسبوع عبر واتساب والهاتف.
              </p>
              <div className="pt-2">
                <a
                  href="https://wa.me/212600000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-black text-xs shadow-md transition-all"
                >
                  <PhoneCall size={14} />
                  <span>تواصل مع مستشار التوجيه عبر واتساب</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
