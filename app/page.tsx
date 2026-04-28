import Link from "next/link";
import Image from "next/image";
import { Camera, CheckCircle2, GraduationCap, Layers3, MessageCircle, Send, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WHATSAPP_NUMBER, whatsappUrl } from "@/lib/contact";

const BENEFITS = [
  {
    icon: Sparkles,
    title: "شرح الدروس بطريقة مبسطة",
    desc: "يفهم التلميذ الفكرة الأساسية بلغة واضحة، مع أمثلة قريبة من الدرس والمنهاج المغربي.",
  },
  {
    icon: CheckCircle2,
    title: "حل التمارين خطوة بخطوة",
    desc: "لا نعطي الجواب فقط، بل نشرح طريقة التفكير حتى يعرف التلميذ كيف يحل تمريناً مشابهاً.",
  },
  {
    icon: GraduationCap,
    title: "مناسب لتلاميذ الإعدادي والثانوي",
    desc: "التجربة موجهة للتلاميذ المغاربة حسب المستوى والمادة، مع تركيز أولي على الموارد المتحققة.",
  },
];

const HOW_IT_WORKS = [
  {
    icon: Send,
    title: "أرسل سؤالك أو صورة التمرين",
    desc: "اكتب السؤال مباشرة أو أرسل صورة واضحة للتمرين عندما تكون الخدمة متاحة.",
  },
  {
    icon: Layers3,
    title: "نحدد المستوى والمادة",
    desc: "نربط السؤال بالسياق الدراسي المناسب: المستوى، المادة، والدرس إن أمكن.",
  },
  {
    icon: CheckCircle2,
    title: "تحصل على شرح واضح حسب المنهاج المغربي",
    desc: "الجواب يكون منظماً، بسيطاً، ومبنياً على طريقة تعلم تناسب التلميذ المغربي.",
  },
];

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
  "مساعد AI قيد التحضير حسب المنهاج المغربي",
  "صفحات واضحة للخصوصية والتواصل وشروط الاستخدام",
  "تجربة WhatsApp قريباً بدون إضافة API حالياً",
];

const WHATSAPP_URL = whatsappUrl("مرحباً، أريد الانضمام لتجربة مساعد موديريسي الذكي عبر WhatsApp.");

const PLANS = [
  {
    name: "مجاني",
    price: "0",
    period: "دائماً",
    desc: "للتجربة والبداية",
    highlight: false,
    features: ["تصفح الدروس المتاحة", "الفروض والتمارين المنشورة", "نماذج امتحانات موحدة", "إنشاء حساب بدون بطاقة بنكية"],
    cta: "ابدأ مجاناً",
    href: "/auth/register",
  },
  {
    name: "بلوس",
    price: "29",
    period: "درهم / شهر",
    desc: "تفعيل يدوي عبر WhatsApp",
    highlight: true,
    features: ["كل ما في المجاني", "توجيه عبر WhatsApp", "تنبيه عند إضافة موارد جديدة", "مساعدة في استعمال المنصة"],
    cta: "اطلع على التفاصيل",
    href: "/pricing",
  },
  {
    name: "بريميوم",
    price: "قريباً",
    period: "",
    desc: "للعائلات بعد اكتمال الميزات",
    highlight: false,
    features: ["حسابات متعددة", "تقارير أوضح للأولياء", "لوحة متابعة عائلية", "لن يتم بيعها حتى تكتمل"],
    cta: "أخبرني عند الإطلاق",
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
              متاح حالياً: مراجعة الثالثة إعدادي
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.15] mb-6">
              مساعد ذكي للتلاميذ
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-yellow-200">
                حسب المنهاج المغربي
              </span>
            </h1>

            <p className="text-lg md:text-xl text-blue-100 leading-relaxed mb-10 max-w-xl">
              موديريسي يحضر تجربة مساعد AI للتلاميذ المغاربة: يشرح الدروس، يساعد في حل التمارين، ويرتب المراجعة حسب المستوى والمادة.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-7 py-4 rounded-2xl bg-white text-blue-700 font-black text-base hover:bg-blue-50 transition-all shadow-xl shadow-black/10"
              >
                <MessageCircle size={20} strokeWidth={2.4} className="ml-2" />
                جرّب قريباً عبر WhatsApp
              </a>
              <Link
                href="/lessons"
                className="inline-flex items-center justify-center px-7 py-4 rounded-2xl border border-white/30 bg-white/10 backdrop-blur text-white font-bold text-base hover:bg-white/20 transition-all"
              >
                تصفح الدروس الحالية
              </Link>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 mt-5 max-w-2xl">
              {[
                { label: "الدروس", href: "/lessons" },
                { label: "الفروض", href: "/exercises" },
                { label: "الامتحانات", href: "/exam-simulator" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-center text-sm font-black text-white backdrop-blur transition-colors hover:bg-white/20"
                >
                  {item.label}
                </Link>
              ))}
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
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="eyebrow">مساعد AI للتعلم</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#1E293B] mt-3 mb-4">
              لماذا سيحتاجه التلميذ؟
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto leading-7">
              الهدف هو مساعدة التلميذ على الفهم والمراجعة، وليس تعويض الأستاذ أو الكتاب المدرسي.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {BENEFITS.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="professional-card p-7">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-5">
                    <Icon size={22} strokeWidth={2.4} />
                  </div>
                  <h3 className="font-black text-[#1E293B] text-lg mb-3">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-7">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="eyebrow">كيف يعمل؟</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#1E293B] mt-3 mb-4">
              من السؤال إلى الشرح الواضح
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map((item, index) => {
              const Icon = item.icon;
              return (
              <div key={item.title} className="relative professional-card p-7 text-center">
                <div className="mx-auto mb-5 w-12 h-12 rounded-2xl bg-blue-600 text-white text-sm font-black flex items-center justify-center">
                  <Icon size={22} strokeWidth={2.4} />
                </div>
                <p className="text-xs font-black text-blue-600 mb-2">0{index + 1}</p>
                <h3 className="font-black text-[#1E293B] text-lg mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="eyebrow">المزايا</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#1E293B] mt-3 mb-4">
              ما الذي يقدمه موديريسي؟
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto">
              أدوات تعليمية عملية تساعد التلميذ على المراجعة دون تعقيد.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="professional-card p-6 group">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-xl mb-4 shadow-sm`}>
                  {f.icon}
                </div>
                <h3 className="font-black text-[#1E293B] text-lg mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-center bg-white border border-slate-100 rounded-3xl p-6 md:p-10 shadow-sm">
            <div>
              <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-800 px-3 py-1 text-xs font-black mb-4">
                قريباً
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-[#1E293B] mb-4">
                كن من أوائل من يجربون مساعد موديريسي
              </h2>
              <p className="text-slate-500 leading-8">
                سنفتح تجربة محدودة عبر WhatsApp للتلاميذ والأولياء. لا توجد API حقيقية مضافة الآن، فقط تسجيل اهتمام وانتظار الإطلاق.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-2xl bg-emerald-500 text-white flex items-center justify-center">
                  <Camera size={21} strokeWidth={2.4} />
                </div>
                <div>
                  <p className="font-black text-[#1E293B]">سؤال أو صورة تمرين</p>
                  <p className="text-xs text-slate-500">التجربة ستبدأ تدريجياً</p>
                </div>
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-4 text-sm font-black text-white transition-colors hover:bg-emerald-700"
              >
                <MessageCircle size={19} strokeWidth={2.4} />
                أريد أن أجرب الخدمة
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-l from-blue-700 to-indigo-800 relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
            <span className="text-amber-300 text-sm font-black">الدروس</span>
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
                className="inline-flex items-center justify-center bg-white hover:bg-blue-50 text-blue-700 font-black px-6 py-3 rounded-xl transition-all shadow-lg"
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
          <div className="text-center mb-10">
            <span className="eyebrow">المواد</span>
            <h2 className="text-3xl font-black text-[#1E293B] mt-3">المواد الدراسية المتاحة</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {SUBJECTS.map((s) => (
              <Link
                key={s.name}
                href="/lessons"
                className="professional-card p-5 flex items-center gap-4 group"
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
            <span className="eyebrow">الثقة والوضوح</span>
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
              <Link key={item.href} href={item.href} className="professional-card p-6">
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
            <span className="eyebrow">الأسعار</span>
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
                    ? "ring-2 ring-blue-500 shadow-xl shadow-blue-100"
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
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200"
                      : "border-2 border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-600"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-400 text-sm mt-8">
            للاشتراك في بلوس أو معرفة بريميوم: <span className="font-semibold text-slate-600">WhatsApp {WHATSAPP_NUMBER}</span>. سنوضح لك ما هو متاح فعلياً قبل أي أداء.
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
