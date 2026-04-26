import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "التمارين | موديريسي",
  description: "صفحة التمارين في موديريسي. نعمل على إعداد بنك تمارين مناسب للمقرر الحالي مع موارد منظمة حسب المادة والمستوى.",
  alternates: { canonical: "/exercises" },
};

const SUBJECTS = [
  {
    name: "الرياضيات",
    emoji: "🔢",
    color: "from-blue-600 to-cyan-600",
    available: "الثالثة إعدادي",
    href: "/lessons/maths/3eme",
  },
  {
    name: "الفيزياء والكيمياء",
    emoji: "⚗️",
    color: "from-violet-600 to-purple-600",
    available: "الثالثة إعدادي",
    href: "/lessons/physique/3eme",
  },
  {
    name: "علوم الحياة والأرض",
    emoji: "🌱",
    color: "from-emerald-600 to-teal-600",
    available: "الثالثة إعدادي",
    href: "/lessons/svt/3eme",
  },
  {
    name: "اللغة العربية",
    emoji: "📖",
    color: "from-amber-500 to-orange-500",
    available: "الثالثة إعدادي",
    href: "/lessons/arabe/3eme",
  },
  {
    name: "اللغة الفرنسية",
    emoji: "🇫🇷",
    color: "from-rose-500 to-pink-600",
    available: "الثالثة إعدادي",
    href: "/lessons/francais/3eme",
  },
  {
    name: "الاجتماعيات",
    emoji: "🌍",
    color: "from-sky-500 to-blue-600",
    available: "الثالثة إعدادي",
    href: "/lessons/social/3eme",
  },
];

const STEPS = [
  "مطابقة التمارين مع المقرر الحالي قبل النشر",
  "تقسيم التمارين حسب المادة والمستوى والصعوبة",
  "إضافة تصحيح مبسط وشرح للخطوات الأساسية",
  "تجنب نشر تمارين قديمة أو غير مناسبة للمقرر",
];

export default function ExercisesPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 md:pb-6">
      <Navbar />

      <section className="relative pt-16 pb-14 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1600&q=80"
            alt="تمارين ومراجعة"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-amber-950/90 via-orange-900/85 to-[#F8FAFC]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 pt-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-sm font-semibold px-4 py-1.5 rounded-full mb-5 backdrop-blur-sm">
            <span>✏️</span>
            <span>بنك التمارين قيد الإعداد</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight">
            التمارين
            <span className="text-amber-300"> المنظمة</span>
          </h1>
          <p className="text-amber-100/90 text-base max-w-2xl leading-8">
            نعمل على إعداد تمارين مناسبة للمقرر الحالي قبل نشرها. إلى حين اكتمال بنك التمارين، يمكنك استعمال الدروس والمساعد الذكي والامتحان التجريبي للمراجعة.
          </p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 -mt-4">
        <section className="bg-white rounded-3xl shadow-md border border-slate-100 p-5 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-[#1E293B] mb-1">ماذا سيتوفر هنا؟</h2>
              <p className="text-slate-500 text-sm leading-7">
                تمارين قصيرة، تمارين تطبيقية، وتصحيحات مبسطة حسب المادة والمستوى.
              </p>
            </div>
            <span className="coming-soon-badge self-start md:self-center text-sm font-black text-amber-900 bg-amber-300 border border-amber-500 px-4 py-2 rounded-full shadow-sm">
              قريباً
            </span>
          </div>
        </section>

        <section className="grid lg:grid-cols-[1fr_0.8fr] gap-6 mb-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5">
            <h2 className="text-lg font-black text-[#1E293B] mb-4">المواد</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {SUBJECTS.map((subject) => (
                <div key={subject.name} className="rounded-2xl border border-slate-100 bg-slate-50 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-l ${subject.color}`} />
                  <div className="p-4">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{subject.emoji}</span>
                        <div>
                          <h3 className="font-black text-[#1E293B] text-sm">{subject.name}</h3>
                          <p className="text-slate-400 text-xs">التمارين قيد التحضير</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-black text-amber-900 bg-amber-200 border border-amber-300 px-2 py-1 rounded-full">
                        قريباً
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-3">
                      الموارد المتاحة حالياً للمراجعة: {subject.available}
                    </p>
                    <Link
                      href={subject.href}
                      className="inline-flex items-center justify-center w-full text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 rounded-xl px-3 py-2 hover:bg-blue-100 transition-colors"
                    >
                      مراجعة الدروس أولاً
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5">
              <h2 className="text-lg font-black text-[#1E293B] mb-4">طريقة الإعداد</h2>
              <div className="space-y-3">
                {STEPS.map((step, index) => (
                  <div key={step} className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-black shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-slate-600 text-sm leading-7">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-3xl p-5">
              <h2 className="text-lg font-black text-blue-900 mb-2">تحتاج مساعدة في تمرين؟</h2>
              <p className="text-blue-700 text-sm leading-7 mb-4">
                يمكنك طرح التمرين على المساعد الذكي ليشرح لك طريقة الحل خطوة بخطوة.
              </p>
              <Link href="/chat" className="inline-flex items-center justify-center w-full bg-blue-600 text-white font-bold px-4 py-3 rounded-xl hover:bg-blue-700 transition-colors">
                اسأل نور
              </Link>
            </div>
          </aside>
        </section>

        <section className="bg-slate-900 rounded-3xl p-6 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black mb-2">هل تريد اختباراً فورياً؟</h2>
            <p className="text-slate-300 text-sm leading-7">
              استعمل الامتحان التجريبي لاختيار المادة والمستوى والحصول على أسئلة تدريبية.
            </p>
          </div>
          <Link href="/exam-simulator" className="inline-flex items-center justify-center bg-amber-400 text-slate-950 font-black px-5 py-3 rounded-xl hover:bg-amber-300 transition-colors">
            فتح الامتحان التجريبي
          </Link>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
