import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const FEATURES = [
  {
    icon: "🤖",
    title: "مساعد تعليمي ذكي",
    desc: "يساعد التلميذ على فهم الدروس وحل التمارين خطوة بخطوة باللغة العربية، مع دعم الفرنسية عند الحاجة.",
    gradient: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50",
  },
  {
    icon: "📺",
    title: "دروس منظمة",
    desc: "فيديوهات تعليمية مرتبة حسب المستوى والمادة لتسهيل المراجعة اليومية والاستعداد للامتحانات.",
    gradient: "from-rose-500 to-pink-600",
    bg: "bg-rose-50",
  },
  {
    icon: "📝",
    title: "امتحانات موحدة",
    desc: "نماذج امتحانات حقيقية مع التصحيح تساعد التلميذ على فهم صيغة الامتحان وطريقة التنقيط.",
    gradient: "from-amber-500 to-orange-600",
    bg: "bg-amber-50",
  },
  {
    icon: "✏️",
    title: "تمارين تفاعلية",
    desc: "تمارين قصيرة ومنظمة حسب المواد والمستويات، مع تجربة مناسبة للمراجعة المستمرة.",
    gradient: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
  },
  {
    icon: "📊",
    title: "متابعة التقدم",
    desc: "واجهة تساعد التلميذ وولي الأمر على تتبع النشاط، النتائج، وما يحتاج إلى مراجعة إضافية.",
    gradient: "from-purple-500 to-violet-600",
    bg: "bg-purple-50",
  },
  {
    icon: "👨‍👩‍👧",
    title: "دعم للأولياء",
    desc: "إمكانية متابعة تقدم التلميذ والحصول على إرشادات واضحة حول الاشتراك والدعم عبر WhatsApp.",
    gradient: "from-cyan-500 to-sky-600",
    bg: "bg-cyan-50",
  },
];

const SUBJECTS = [
  { emoji: "🔢", name: "الرياضيات" },
  { emoji: "⚗️", name: "الفيزياء والكيمياء" },
  { emoji: "🌱", name: "علوم الحياة والأرض" },
  { emoji: "📖", name: "اللغة العربية" },
  { emoji: "🇫🇷", name: "اللغة الفرنسية" },
  { emoji: "🌍", name: "الاجتماعيات" },
];

const TRUST_POINTS = [
  "تسجيل مجاني بدون بطاقة بنكية",
  "محتوى موجه لتلاميذ الإعدادي المغربي",
  "صفحات واضحة للخصوصية والتواصل وشروط الاستخدام",
  "اشتراك عبر WhatsApp إلى حين إضافة الدفع الإلكتروني",
];

const PLANS = [
  {
    name: "مجاني",
    price: "0",
    period: "دائماً",
    desc: "للتجربة والبداية",
    highlight: false,
    features: ["دروس فيديو مجانية", "تمارين يومية محدودة", "أسئلة ذكاء اصطناعي محدودة", "إنشاء حساب بدون بطاقة بنكية"],
    cta: "ابدأ مجاناً",
    href: "/auth/register",
  },
  {
    name: "بلوس",
    price: "29",
    period: "درهم / شهر",
    desc: "للمراجعة المنتظمة",
    highlight: true,
    features: ["أسئلة مساعدة غير محدودة", "جميع الدروس والتمارين", "نماذج امتحانات موحدة", "تقارير أسبوعية للأولياء"],
    cta: "اطلع على التفاصيل",
    href: "/pricing",
  },
  {
    name: "بريميوم",
    price: "79",
    period: "درهم / شهر",
    desc: "للعائلات",
    highlight: false,
    features: ["كل مزايا بلوس", "حتى 4 تلاميذ في الحساب", "تقارير تفصيلية", "دعم مباشر عبر WhatsApp"],
    cta: "مناسب للعائلات",
    href: "/pricing",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />

      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&q=80"
            alt="تلاميذ يراجعون دروسهم"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-l from-blue-950/95 via-blue-900/85 to-blue-800/70" />
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#F8FAFC] to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 pt-24 pb-16 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              منصة تعليمية مغربية لتلاميذ الإعدادي
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6">
              تعلّم بوضوح،
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-yellow-200">
                وراجع بثقة
              </span>
            </h1>

            <p className="text-lg md:text-xl text-blue-100 leading-relaxed mb-10 max-w-xl">
              موديريسي منصة تعليمية تساعد تلاميذ الإعدادي المغربي على مراجعة الدروس، حل التمارين، والاستعداد للامتحانات الموحدة بطريقة منظمة.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-l from-amber-400 to-yellow-300 text-blue-950 font-black text-base hover:from-amber-300 hover:to-yellow-200 transition-all shadow-xl shadow-amber-500/30"
              >
                ابدأ مجاناً الآن
              </Link>
              <Link
                href="/lessons"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border-2 border-white/30 bg-white/10 backdrop-blur text-white font-bold text-base hover:bg-white/20 transition-all"
              >
                تصفح الدروس
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mt-8 max-w-xl">
              {TRUST_POINTS.map((point) => (
                <div key={point} className="flex items-center gap-2 text-blue-100 text-sm">
                  <span className="w-5 h-5 rounded-full bg-white/15 text-emerald-300 flex items-center justify-center text-xs">✓</span>
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-blue-600 text-sm font-bold uppercase tracking-widest">طريقة العمل</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#1E293B] mt-3 mb-4">
              تجربة بسيطة من التسجيل إلى المراجعة
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "01", icon: "📋", title: "إنشاء حساب", desc: "يسجل ولي الأمر أو التلميذ مجاناً ويختار المستوى الدراسي المناسب." },
              { step: "02", icon: "📚", title: "اختيار المادة", desc: "ينتقل التلميذ إلى الدروس أو التمارين حسب المادة والمستوى." },
              { step: "03", icon: "📈", title: "المراجعة والتحسن", desc: "يتابع التلميذ تقدمه ويستفيد من المساعد الذكي ونماذج الامتحانات الموحدة." },
            ].map((item) => (
              <div key={item.step} className="relative bg-white rounded-2xl p-7 shadow-sm border border-slate-100 text-center">
                <div className="absolute -top-4 right-1/2 translate-x-1/2 bg-blue-600 text-white text-xs font-black px-3 py-1 rounded-full">
                  {item.step}
                </div>
                <div className="text-5xl mb-4 mt-2">{item.icon}</div>
                <h3 className="font-black text-[#1E293B] text-lg mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-blue-600 text-sm font-bold uppercase tracking-widest">المزايا</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#1E293B] mt-3 mb-4">
              ما الذي يقدمه موديريسي؟
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto">
              أدوات تعليمية عملية تساعد التلميذ على المراجعة دون تعقيد.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className={`${f.bg} rounded-2xl p-6 border border-white shadow-sm group hover:shadow-md transition-all`}>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-2xl mb-4 shadow-lg`}>
                  {f.icon}
                </div>
                <h3 className="font-black text-[#1E293B] text-lg mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-l from-blue-700 to-indigo-800 relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-amber-300 text-sm font-bold uppercase tracking-widest">الدروس</span>
              <h2 className="text-3xl md:text-4xl font-black text-white mt-3 mb-5">
                محتوى مرتب حسب مواد الإعدادي
              </h2>
              <p className="text-blue-100 leading-relaxed mb-6">
                تجمع المنصة روابط ودروساً تعليمية منظمة حسب المواد والمستويات، حتى يجد التلميذ ما يحتاج إليه بسرعة أثناء المراجعة.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {["الرياضيات", "الفيزياء والكيمياء", "علوم الحياة والأرض"].map((s) => (
                  <span key={s} className="bg-white/10 border border-white/20 text-white text-sm font-semibold px-3 py-1.5 rounded-full">
                    {s}
                  </span>
                ))}
              </div>
              <Link
                href="/lessons"
                className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-blue-950 font-black px-6 py-3 rounded-xl transition-all shadow-lg"
              >
                تصفح الدروس
              </Link>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
                <div className="bg-white/5 px-4 py-3 flex items-center gap-2 border-b border-white/10">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                  </div>
                  <span className="text-white/50 text-xs mx-auto">modarisi.ma/lessons/maths/3eme</span>
                </div>
                <div className="relative aspect-video bg-slate-800">
                  <Image
                    src="https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=600&q=80"
                    alt="درس تعليمي"
                    fill
                    className="object-cover opacity-60"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white text-sm font-bold">دروس منظمة حسب المادة والمستوى</p>
                    <p className="text-slate-300 text-xs">مراجعة مبسطة لتلاميذ الإعدادي</p>
                  </div>
                </div>
                <div className="p-4 flex gap-2">
                  {["الدورة الأولى", "الدورة الثانية", "الامتحانات"].map((t) => (
                    <span key={t} className="text-xs text-white/70 border border-white/20 px-2.5 py-1 rounded-lg">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-black text-center text-[#1E293B] mb-10">
            المواد الدراسية المتاحة
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {SUBJECTS.map((s) => (
              <Link
                key={s.name}
                href="/lessons"
                className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4 hover:border-blue-300 hover:shadow-md transition-all group"
              >
                <span className="text-3xl">{s.emoji}</span>
                <p className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">{s.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-blue-600 text-sm font-bold uppercase tracking-widest">الثقة والوضوح</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#1E293B] mt-3 mb-3">
              معلومات واضحة قبل التسجيل
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              نحرص على أن يعرف المستخدم ما الذي تقدمه المنصة، وكيف يتم الاشتراك، وكيف يمكن التواصل أو طلب حذف البيانات.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "من نحن", desc: "تعرف على هدف موديريسي والفئة التي تخدمها المنصة.", href: "/about" },
              { title: "شروط الاستخدام", desc: "اطلع على القواعد الأساسية لاستخدام الحسابات والمحتوى.", href: "/terms" },
              { title: "سياسة الخصوصية", desc: "تعرف على البيانات التي نجمعها وكيف نحميها.", href: "/privacy" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:border-blue-200 hover:shadow-md transition-all">
                <h3 className="font-black text-[#1E293B] mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-7">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-blue-600 text-sm font-bold uppercase tracking-widest">الأسعار</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#1E293B] mt-3 mb-3">
              خطط بسيطة وواضحة
            </h2>
            <p className="text-slate-500">يمكنك البدء مجاناً، ثم اختيار الخطة المناسبة عند الحاجة.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white rounded-2xl p-7 flex flex-col transition-all ${
                  plan.highlight
                    ? "ring-2 ring-blue-500 shadow-xl shadow-blue-100 scale-[1.02]"
                    : "border border-slate-200 shadow-sm"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 right-1/2 translate-x-1/2 bg-gradient-to-l from-blue-600 to-indigo-600 text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                    الأكثر اختياراً
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-black text-[#1E293B] text-xl">{plan.name}</h3>
                  <p className="text-slate-400 text-sm mt-0.5">{plan.desc}</p>
                  <div className="flex items-baseline gap-1 mt-4">
                    <span className="text-5xl font-black text-[#1E293B] ltr-num">{plan.price}</span>
                    <span className="text-slate-400 text-sm">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-7 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-slate-700">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`block text-center px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                    plan.highlight
                      ? "bg-gradient-to-l from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-200"
                      : "border-2 border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-600"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-400 text-sm mt-8">
            للاشتراك في الخطط المدفوعة: <span className="font-semibold text-slate-600">WhatsApp 0708025467</span>. سيتم توجيهك إلى خطوات التفعيل بوضوح.
          </p>
        </div>
      </section>

      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1600&q=80"
            alt="تلاميذ في القسم"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-blue-950/95 via-blue-900/90 to-indigo-900/80" />
        </div>
        <div className="relative max-w-2xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
            ابدأ المراجعة
            <span className="text-amber-300"> بطريقة منظمة</span>
          </h2>
          <p className="text-blue-200 mb-10 text-lg">
            أنشئ حساباً مجانياً وابدأ بتصفح الدروس والتمارين المناسبة لمستواك.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/auth/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-l from-amber-400 to-yellow-300 text-blue-950 font-black text-lg hover:from-amber-300 hover:to-yellow-200 transition-all shadow-xl shadow-amber-500/30"
            >
              إنشاء حساب مجاني
            </Link>
            <Link
              href="/lessons"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border-2 border-white/30 bg-white/10 text-white font-bold text-base hover:bg-white/20 transition-all"
            >
              تصفح الدروس أولاً
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
