import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "مصادر المحتوى | موديريسي",
  description: "تعرف على طريقة اختيار مصادر الدروس والفروض والامتحانات في موديريسي وحالة التحقق من مطابقة الموارد للمقرر المغربي.",
  alternates: { canonical: "/sources" },
};

const RULES = [
  {
    title: "المصادر الرسمية أولاً",
    desc: "نعطي الأولوية للمصادر الرسمية والوثائق المعتمدة كلما توفرت، خصوصاً عند مراجعة المقرر والمحاور الدراسية.",
  },
  {
    title: "مصادر تعليمية موثوقة",
    desc: "يمكن استعمال مواقع تعليمية معروفة للفروض والامتحانات، مع إظهار المصدر والسنة الدراسية وحالة التحقق.",
  },
  {
    title: "لا نعتمد المحتوى المشكوك فيه",
    desc: "أي مورد لم تتم مراجعته يبقى موسوماً بوضوح كـ قيد المراجعة ولا نقدمه كمحتوى مؤكد.",
  },
];

export default function SourcesPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 md:pb-0">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 pt-28 pb-16">
        <section className="text-center max-w-3xl mx-auto mb-12">
          <p className="eyebrow mb-4">الثقة في المحتوى</p>
          <h1 className="text-3xl md:text-4xl font-black text-[#1E293B] mb-4">
            كيف نختار مصادر الدروس والفروض؟
          </h1>
          <p className="text-slate-600 leading-8">
            نعرض الموارد التعليمية بشفافية. كل مورد يجب أن يكون له مصدر واضح، مستوى دراسي، سنة أو تاريخ تحقق، وحالة تبين هل تمت مراجعته أم ما يزال قيد المراجعة.
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-5 mb-10">
          {RULES.map((rule) => (
            <div key={rule.title} className="professional-card p-6">
              <h2 className="font-black text-[#1E293B] mb-2">{rule.title}</h2>
              <p className="text-slate-500 text-sm leading-7">{rule.desc}</p>
            </div>
          ))}
        </section>

        <section className="surface-card p-7">
          <h2 className="text-xl font-black text-[#1E293B] mb-4">حالات التحقق</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
              <p className="font-black text-emerald-900 mb-1">متحقق منه</p>
              <p className="text-emerald-700 text-sm leading-7">
                مورد تمت مراجعته مع محاور المقرر أو مصدر رسمي/موثوق، ويمكن استعماله بثقة أكبر.
              </p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <p className="font-black text-amber-900 mb-1">قيد المراجعة</p>
              <p className="text-amber-700 text-sm leading-7">
                مورد مفيد للمراجعة، لكنه لم يعتمد بعد كمطابق للمقرر. نعرضه بشفافية إلى حين استكمال التحقق.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
