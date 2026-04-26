import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "أسئلة شائعة | موديريسي",
  description: "أجوبة على أكثر الأسئلة حول موديريسي: التسجيل، الاشتراك، الدروس، التمارين، الامتحانات، وتقارير الأولياء.",
  alternates: { canonical: "/faq" },
};

const FAQS = [
  {
    q: "شنو هي موديريسي؟",
    a: "موديريسي منصة تعليمية لتلاميذ الإعدادي المغربي كتجمع الدروس، التمارين، الامتحانات التجريبية، ومساعد ذكاء اصطناعي كيشرح بالعربية والدارجة والفرنسية.",
  },
  {
    q: "واش التسجيل مجاني؟",
    a: "نعم، يمكن للتلميذ يبدأ مجاناً بدون بطاقة بنكية. الخطة المجانية مناسبة للتجربة والبداية، والخطط المدفوعة كتفتح استعمالاً أوسع.",
  },
  {
    q: "كيفاش كنشترك فخطة بلوس أو بريميوم؟",
    a: "حالياً الاشتراك كيتم عبر WhatsApp. تواصل معنا، اختار الخطة، وغادي نرشدك للخطوات بسرعة. الدفع الإلكتروني المباشر غادي يتزاد لاحقاً.",
  },
  {
    q: "واش الدروس مناسبة للمنهج المغربي؟",
    a: "الدروس منظمة حسب مستويات الإعدادي المغربي والمواد الأساسية، مع فيديوهات وشروحات وتمارين تساعد التلميذ يراجع بطريقة مرتبة.",
  },
  {
    q: "واش ولي الأمر يقدر يتابع التقدم؟",
    a: "نعم، الخطط المدفوعة كتدعم تقارير للأولياء على WhatsApp باش يبقاو متابعين التقدم والنتائج ديال التلميذ.",
  },
  {
    q: "كيفاش نحذف الحساب أو البيانات ديالي؟",
    a: "يمكنك تطلب حذف الحساب والبيانات فاي وقت عبر صفحة التواصل أو WhatsApp، وغادي نعالجو الطلب في أقرب وقت.",
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 md:pb-0">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 pt-28 pb-16">
        <div className="text-center mb-10">
          <p className="text-blue-600 font-bold text-sm mb-2">مركز المساعدة</p>
          <h1 className="text-3xl md:text-4xl font-black text-[#1E293B] mb-3">أسئلة شائعة</h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            جمعنا هنا أهم الأسئلة اللي كتعاون التلميذ وولي الأمر يفهمو الخدمة قبل التسجيل أو الاشتراك.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((item) => (
            <section key={item.q} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-black text-[#1E293B] mb-2">{item.q}</h2>
              <p className="text-slate-600 text-sm leading-7">{item.a}</p>
            </section>
          ))}
        </div>

        <div className="mt-10 bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center">
          <h2 className="font-black text-[#1E293B] mb-2">ما لقيتيش الجواب؟</h2>
          <p className="text-slate-500 text-sm mb-4">تواصل معنا مباشرة وغادي نجاوبوك فـ WhatsApp.</p>
          <Link href="/contact" className="inline-flex items-center justify-center bg-blue-600 text-white font-bold px-5 py-3 rounded-xl hover:bg-blue-700 transition-colors">
            تواصل معنا
          </Link>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
