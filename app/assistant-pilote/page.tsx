import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  BrainCircuit,
  CheckCircle2,
  CircleHelp,
  FunctionSquare,
  Lightbulb,
  ListChecks,
  MessageSquareText,
  Route,
  Sigma,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "تجربة المساعد الذكي للرياضيات | موديريسي",
  description:
    "تعرف على أول تجربة لمساعد موديريسي الذكي في مادة الرياضيات للثالثة إعدادي حسب المنهاج المغربي.",
  alternates: { canonical: "/assistant-pilote" },
};

const TOPICS = ["المعادلات", "المتراجحات", "الحساب العددي", "الهندسة", "الدوال", "الإحصاء"];

const QUESTION_TYPES = [
  "شرح درس لم أفهمه في القسم",
  "حل تمرين مع توضيح كل مرحلة",
  "تصحيح محاولة التلميذ وتحديد الخطأ",
  "اقتراح طريقة أبسط للمراجعة قبل الفرض",
];

const EXAMPLES = [
  "حل معادلة من الدرجة الأولى مع التحقق من النتيجة.",
  "تبسيط تعبير جبري واستعمال القواعد المناسبة.",
  "إثبات علاقة هندسية باستعمال المعطيات والرسم.",
  "قراءة جدول إحصائي وحساب المتوسط أو النسبة.",
];

const STEPS = [
  {
    title: "يفهم المطلوب",
    desc: "يقرأ السؤال أو صورة التمرين ويحدد هل المطلوب حساب، برهان، تفسير، أو اختيار طريقة حل.",
  },
  {
    title: "يربطه بالدرس المناسب",
    desc: "يربط التمرين بالمحور الدراسي: معادلات، هندسة، دوال، إحصاء، أو حساب عددي.",
  },
  {
    title: "يشرح الحل خطوة بخطوة",
    desc: "يعطي مراحل منظمة مع تذكير بالقانون أو الفكرة المستعملة في كل مرحلة.",
  },
  {
    title: "يتحقق من الجواب",
    desc: "ينبه التلميذ إلى طريقة التحقق من النتيجة وتجنب الأخطاء المتكررة.",
  },
];

export default function AssistantPilotePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 md:pb-0">
      <Navbar />

      <main>
        <section className="relative overflow-hidden pt-28 pb-20 bg-gradient-to-l from-blue-950 via-blue-800 to-indigo-800">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.22),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.18),transparent_30%)]" />
          <div className="relative max-w-6xl mx-auto px-4">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-black text-emerald-100 backdrop-blur">
                <BrainCircuit size={17} strokeWidth={2.4} />
                أول تجربة Pilot
              </span>
              <h1 className="mt-7 text-4xl md:text-6xl font-black leading-[1.15] text-white">
                مساعد الرياضيات
                <span className="block text-amber-300">للثالثة إعدادي</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-9 text-blue-100">
                أول تجربة لمساعد موديريسي الذكي ستركز على
                <strong className="mx-1 text-white">Mathématiques - 3ème année collège</strong>
                حسب المنهاج المغربي، قبل توسيعها لباقي المواد والمستويات.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/#waiting-list"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-7 py-4 text-base font-black text-white shadow-xl shadow-emerald-950/25 transition-colors hover:bg-emerald-400"
                >
                  أريد تجربة المساعد عند الإطلاق
                  <ArrowLeft size={18} strokeWidth={2.4} />
                </Link>
                <Link
                  href="/lessons"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/25 bg-white/10 px-7 py-4 text-base font-bold text-white backdrop-blur transition-colors hover:bg-white/20"
                >
                  تصفح دروس الرياضيات الحالية
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-18 bg-white">
          <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="mb-10 text-center">
              <span className="eyebrow">الدروس التي سيدعمها المساعد</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-black text-[#1E293B]">
                محاور الرياضيات في التجربة الأولى
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {TOPICS.map((topic) => (
                <div key={topic} className="professional-card p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                    <Sigma size={20} strokeWidth={2.4} />
                  </div>
                  <h3 className="font-black text-[#1E293B]">{topic}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-500">
                    دعم تدريجي بالشرح والأمثلة والتمارين المناسبة للمستوى.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#F8FAFC]">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="professional-card p-7">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <CircleHelp size={23} strokeWidth={2.4} />
                </div>
                <h2 className="text-2xl font-black text-[#1E293B] mb-5">أنواع الأسئلة التي يمكن طرحها</h2>
                <div className="space-y-3">
                  {QUESTION_TYPES.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                      <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={19} strokeWidth={2.4} />
                      <p className="text-sm font-bold leading-7 text-slate-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="professional-card p-7">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                  <MessageSquareText size={23} strokeWidth={2.4} />
                </div>
                <h2 className="text-2xl font-black text-[#1E293B] mb-5">أمثلة على تمارين يمكن إرسالها</h2>
                <div className="space-y-3">
                  {EXAMPLES.map((item) => (
                    <div key={item} className="rounded-2xl border border-slate-100 bg-white p-4">
                      <p className="text-sm font-bold leading-7 text-slate-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="mb-12 text-center">
              <span className="eyebrow">كيف سيشرح المساعد خطوة بخطوة</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-black text-[#1E293B]">
                طريقة شرح مبنية على الفهم لا الحفظ
              </h2>
            </div>
            <div className="grid md:grid-cols-4 gap-4">
              {STEPS.map((step, index) => (
                <div key={step.title} className="professional-card p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-black text-blue-600">0{index + 1}</span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                      {index === 0 && <Lightbulb size={20} strokeWidth={2.4} />}
                      {index === 1 && <FunctionSquare size={20} strokeWidth={2.4} />}
                      {index === 2 && <ListChecks size={20} strokeWidth={2.4} />}
                      {index === 3 && <Route size={20} strokeWidth={2.4} />}
                    </div>
                  </div>
                  <h3 className="font-black text-[#1E293B] mb-2">{step.title}</h3>
                  <p className="text-sm leading-7 text-slate-500">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-l from-blue-700 to-indigo-800">
          <div className="max-w-3xl mx-auto px-4 text-center text-white">
            <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-black text-emerald-100">
              بدون ربط API حالياً
            </span>
            <h2 className="mt-5 text-3xl md:text-4xl font-black">
              نجهز قاعدة المعرفة قبل إطلاق المساعد
            </h2>
            <p className="mt-4 text-blue-100 leading-8">
              هذه الصفحة توضح نطاق التجربة الأولى فقط. الربط الحقيقي مع WhatsApp أو أي API سيتم لاحقاً بعد اختبار المحتوى وطريقة الشرح.
            </p>
            <Link
              href="/#waiting-list"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-7 py-4 text-base font-black text-white transition-colors hover:bg-emerald-400"
            >
              أريد تجربة المساعد عند الإطلاق
              <ArrowLeft size={18} strokeWidth={2.4} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
