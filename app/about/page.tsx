import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "من نحن | موديريسي",
  description: "تعرف على موديريسي، منصة تعليمية مغربية تساعد تلاميذ الإعدادي على المراجعة المنظمة.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  {
    title: "وضوح في التعلم",
    desc: "نرتب الدروس والتمارين بطريقة بسيطة حتى يصل التلميذ بسرعة إلى ما يحتاجه.",
  },
  {
    title: "دعم للتلميذ والولي",
    desc: "نهتم بتجربة التلميذ، ونوفر للأولياء معلومات واضحة حول الاشتراك والتواصل وحماية البيانات.",
  },
  {
    title: "تطوير مستمر",
    desc: "نحسن المنصة تدريجياً حسب احتياجات التلاميذ وملاحظات الأسر.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 md:pb-0">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 pt-28 pb-16">
        <section className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-blue-600 font-bold text-sm mb-2">من نحن</p>
          <h1 className="text-3xl md:text-4xl font-black text-[#1E293B] mb-4">
            موديريسي منصة تعليمية لتلاميذ الإعدادي المغربي
          </h1>
          <p className="text-slate-600 leading-8">
            نهدف إلى مساعدة التلاميذ على مراجعة الدروس، حل التمارين، والاستعداد للامتحانات بطريقة منظمة وواضحة. تجمع المنصة بين الدروس، الفروض والتمارين، نماذج الامتحانات الموحدة، والمساعدة الذكية باللغة العربية والفرنسية.
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-5 mb-12">
          {VALUES.map((value) => (
            <div key={value.title} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <h2 className="font-black text-[#1E293B] mb-2">{value.title}</h2>
              <p className="text-slate-500 text-sm leading-7">{value.desc}</p>
            </div>
          ))}
        </section>

        <section className="bg-white border border-slate-100 rounded-2xl p-7 shadow-sm">
          <h2 className="text-xl font-black text-[#1E293B] mb-3">لمن صممت المنصة؟</h2>
          <p className="text-slate-600 text-sm leading-8 mb-4">
            صممت موديريسي لتلاميذ الإعدادي في المغرب، وللأسر التي تبحث عن طريقة منظمة لمتابعة المراجعة اليومية. يمكن للتلميذ استعمال النسخة المجانية للبداية، ثم اختيار خطة مدفوعة عند الحاجة إلى استعمال أوسع.
          </p>
          <p className="text-slate-600 text-sm leading-8">
            إذا كان لديك سؤال حول التسجيل أو الاشتراك أو حذف البيانات، يمكنك التواصل معنا عبر صفحة التواصل.
          </p>
        </section>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
