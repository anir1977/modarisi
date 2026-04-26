import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ─────────────────────────────────────────────────────────────────── */

const STATS = [
  { n: "+5,000", label: "تلميذ نشيط" },
  { n: "+20,000", label: "تمرين محلول" },
  { n: "24/7", label: "متاح دائماً" },
  { n: "100%", label: "مجاني للبداية" },
];

const FEATURES = [
  {
    icon: "🤖",
    title: "مساعد ذكاء اصطناعي",
    desc: "اسأل بالدارجة أو العربية أو الفرنسية — يجيبك فوراً في الرياضيات والفيزياء والعلوم.",
    gradient: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50",
  },
  {
    icon: "📺",
    title: "دروس بصوت أستاذ حقيقي",
    desc: "فيديوهات من أساتذة مغاربة متمرسين — 9ismi.ma، Youssef Nejjari — منظمة حسب المستوى.",
    gradient: "from-rose-500 to-pink-600",
    bg: "bg-rose-50",
  },
  {
    icon: "📝",
    title: "امتحانات تجريبية",
    desc: "تدرب على امتحانات بصيغة الإعدادي المغربي مع تصحيح فوري وشرح لكل سؤال.",
    gradient: "from-amber-500 to-orange-600",
    bg: "bg-amber-50",
  },
  {
    icon: "✏️",
    title: "تمارين تفاعلية",
    desc: "آلاف التمارين المرتبة حسب المستوى والمادة مع تتبع التقدم في الوقت الحقيقي.",
    gradient: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
  },
  {
    icon: "🏆",
    title: "لوحة المتصدرين",
    desc: "تنافس مع تلاميذ المغرب وتصدّر الترتيب الوطني والجهوي.",
    gradient: "from-purple-500 to-violet-600",
    bg: "bg-purple-50",
  },
  {
    icon: "👨‍👩‍👧",
    title: "متابعة الأولياء",
    desc: "تقارير أسبوعية على WhatsApp تطلع الأهل على تقدم أبنائهم لحظة بلحظة.",
    gradient: "from-cyan-500 to-sky-600",
    bg: "bg-cyan-50",
  },
];

const SUBJECTS = [
  { emoji: "🔢", name: "الرياضيات", students: "1,840" },
  { emoji: "⚗️", name: "الفيزياء والكيمياء", students: "1,220" },
  { emoji: "🌱", name: "علوم الحياة والأرض", students: "980" },
  { emoji: "📖", name: "اللغة العربية", students: "760" },
  { emoji: "🇫🇷", name: "اللغة الفرنسية", students: "640" },
  { emoji: "🌍", name: "الاجتماعيات", students: "530" },
];

const TESTIMONIALS = [
  {
    name: "فاطمة الزهراء",
    level: "السنة الثالثة إعدادي · مراكش",
    text: "موديريسي ساعدني نفهم الرياضيات بطريقة ما كنت نفهمها قبل. الامتحانات التجريبية كانت عين عين على الامتحان الحقيقي!",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
    stars: 5,
  },
  {
    name: "أمين العلوي",
    level: "السنة الثانية إعدادي · الرباط",
    text: "كنقدر نسأل بالدارجة وكيجاوبني مباشرة. المساعد شرح لي المتطابقات اللي ما كنت فاهمها من أسابيع.",
    img: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=80&h=80&fit=crop&crop=face",
    stars: 5,
  },
  {
    name: "أم كريم",
    level: "ولية أمر · فاس",
    text: "كنتلقى تقرير كل أسبوع على واتساب. هذا الشيء ساعدني نتابع ابني وأنا مشغولة في الخدمة.",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face",
    stars: 5,
  },
];

const PLANS = [
  {
    name: "مجاني",
    price: "0",
    period: "دائماً",
    desc: "للبداية والتجربة",
    highlight: false,
    features: ["5 أسئلة AI / يوم", "دروس فيديو مجانية", "10 تمارين / يوم", "الترتيب الوطني"],
    missing: ["امتحانات غير محدودة", "تقارير الأولياء"],
    cta: "ابدأ مجاناً",
    href: "/auth/register",
  },
  {
    name: "بلوس",
    price: "29",
    period: "درهم / شهر",
    desc: "للتلميذ الجاد",
    highlight: true,
    features: ["AI غير محدود", "جميع الدروس والتمارين", "امتحانات غير محدودة", "تقارير أسبوعية للأولياء", "دعم أولوية"],
    missing: [],
    cta: "اشترك الآن",
    href: "/pricing",
  },
  {
    name: "بريميوم",
    price: "79",
    period: "درهم / شهر",
    desc: "حتى 4 تلاميذ",
    highlight: false,
    features: ["كل مزايا بلوس", "4 تلاميذ في حساب واحد", "جلسات مراجعة مخصصة", "دعم مباشر على WhatsApp"],
    missing: [],
    cta: "للعائلات",
    href: "/pricing",
  },
];

/* ─────────────────────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />

      {/* ══════════════════════════════════════════════════════ HERO */}
      <section className="relative min-h-screen flex items-center">
        {/* Background photo */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&q=80"
            alt="طلاب يدرسون"
            fill
            className="object-cover"
            priority
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-l from-blue-950/95 via-blue-900/85 to-blue-800/70" />
          {/* Bottom fade */}
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#F8FAFC] to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 pt-24 pb-16 w-full">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              جديد — الذكاء الاصطناعي يتكلم الدارجة المغربية 🇲🇦
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6">
              تعلّم بذكاء،
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-yellow-200">
                انجح بثقة
              </span>
            </h1>

            <p className="text-lg md:text-xl text-blue-100 leading-relaxed mb-10 max-w-xl">
              منصة موديريسي للإعدادي المغربي — دروس بصوت أستاذ حقيقي، مساعد ذكاء اصطناعي بالدارجة، وامتحانات تجريبية تحضّرك للنجاح.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-l from-amber-400 to-yellow-300 text-blue-950 font-black text-base hover:from-amber-300 hover:to-yellow-200 transition-all shadow-xl shadow-amber-500/30"
              >
                ابدأ مجاناً الآن 🚀
              </Link>
              <Link
                href="/lessons"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border-2 border-white/30 bg-white/10 backdrop-blur text-white font-bold text-base hover:bg-white/20 transition-all"
              >
                📺 شوف الدروس
              </Link>
            </div>

            <div className="flex items-center gap-6 mt-8">
              <div className="flex -space-x-2 space-x-reverse">
                {[
                  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=40&h=40&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=40&h=40&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=40&h=40&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
                ].map((src, i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-blue-900 overflow-hidden">
                    <Image src={src} alt="" width={36} height={36} className="object-cover" />
                  </div>
                ))}
              </div>
              <p className="text-blue-200 text-sm">
                <span className="text-white font-bold">+5,000</span> تلميذ مغربي يثقون بموديريسي
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════ STATS */}
      <section className="bg-[#1E293B] py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map((s) => (
              <div key={s.label} className="py-2">
                <div className="text-4xl font-black text-white ltr-num mb-1">{s.n}</div>
                <div className="text-slate-400 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════ HOW IT WORKS */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-blue-600 text-sm font-bold uppercase tracking-widest">كيف تعمل؟</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#1E293B] mt-3 mb-4">
              3 خطوات للنجاح
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 right-1/6 left-1/6 h-0.5 bg-gradient-to-l from-emerald-300 via-blue-300 to-transparent" />
            {[
              { step: "01", icon: "📋", title: "سجّل حسابك", desc: "أنشئ حساباً مجانياً في أقل من دقيقة — بدون بطاقة بنكية" },
              { step: "02", icon: "📺", title: "شاهد الدروس واسأل", desc: "شوف الفيديوهات من أساتذة حقيقيين، واسأل المساعد الذكي بالدارجة" },
              { step: "03", icon: "🏆", title: "تدرب وانجح", desc: "حل تمارين وامتحانات تجريبية، وتابع تقدمك حتى يوم الامتحان" },
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

      {/* ══════════════════════════════════════════════════════ FEATURES */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-blue-600 text-sm font-bold uppercase tracking-widest">المزايا</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#1E293B] mt-3 mb-4">
              لماذا موديريسي؟
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto">
              كل ما يحتاجه التلميذ المغربي في مكان واحد — مجاناً
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

      {/* ══════════════════════════════════════════════════════ REAL LESSONS BANNER */}
      <section className="py-20 bg-gradient-to-l from-blue-700 to-indigo-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-amber-300 blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-amber-300 text-sm font-bold uppercase tracking-widest">دروس حقيقية</span>
              <h2 className="text-3xl md:text-4xl font-black text-white mt-3 mb-5">
                فيديوهات من أساتذة مغاربة حقيقيين
              </h2>
              <p className="text-blue-100 leading-relaxed mb-6">
                مش محتوى AI — فيديوهات حقيقية من قنوات كـ <strong className="text-white">9ismi.ma</strong> و<strong className="text-white">Youssef Nejjari</strong>، منظمة حسب المادة والمستوى، بصوت أستاذ مغربي يشرح بأسلوب مفهوم.
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
                📺 شوف الدروس
              </Link>
            </div>

            {/* Video preview mockup */}
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
                    alt="درس رياضيات"
                    fill
                    className="object-cover opacity-60"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-xl">
                      <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[16px] border-r-white mr-[-3px]" style={{borderRight: '16px solid white', transform: 'rotate(180deg)'}} />
                    </div>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white text-sm font-bold">شرح درس المتطابقات — السنة الثالثة إعدادي</p>
                    <p className="text-slate-300 text-xs">9ismi.ma · 35 فيديو</p>
                  </div>
                </div>
                <div className="p-4 flex gap-2">
                  {["الدورة 1", "الدورة 2", "الامتحانات"].map((t) => (
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

      {/* ══════════════════════════════════════════════════════ SUBJECTS */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-black text-center text-[#1E293B] mb-10">
            جميع المواد الدراسية للإعدادي
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {SUBJECTS.map((s) => (
              <Link
                key={s.name}
                href="/lessons"
                className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4 hover:border-blue-300 hover:shadow-md transition-all group"
              >
                <span className="text-3xl">{s.emoji}</span>
                <div>
                  <p className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">{s.name}</p>
                  <p className="text-slate-400 text-xs mt-0.5">
                    <span className="ltr-num">{s.students}</span> تلميذ
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════ TESTIMONIALS */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-blue-600 text-sm font-bold uppercase tracking-widest">شهادات</span>
            <h2 className="text-3xl font-black text-[#1E293B] mt-3">
              ماذا قال مستخدمونا؟
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <span key={i} className="text-amber-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-5">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 ring-2 ring-blue-100">
                    <Image src={t.img} alt={t.name} width={40} height={40} className="object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1E293B] text-sm">{t.name}</p>
                    <p className="text-slate-400 text-xs">{t.level}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════ PRICING */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-blue-600 text-sm font-bold uppercase tracking-widest">الأسعار</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#1E293B] mt-3 mb-3">
              اشتراكات شفافة وبسيطة
            </h2>
            <p className="text-slate-500">ابدأ مجاناً — لا حاجة لبطاقة بنكية</p>
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
                    ⭐ الأكثر شيوعاً
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
                  {plan.missing.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-slate-300">
                      <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-300 flex items-center justify-center text-xs shrink-0">✗</span>
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
            💬 للاشتراك: <span className="font-semibold text-slate-600">WhatsApp 06XXXXXXXX</span> — قريباً نقبل الدفع الإلكتروني
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════ CTA FINAL */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1600&q=80"
            alt="تلاميذ"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-blue-950/95 via-blue-900/90 to-indigo-900/80" />
        </div>
        <div className="relative max-w-2xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
            جاهز تبدأ
            <span className="text-amber-300"> رحلة النجاح؟</span>
          </h2>
          <p className="text-blue-200 mb-10 text-lg">
            انضم لآلاف التلاميذ المغاربة الذين يتعلمون بطريقة أذكى
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/auth/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-l from-amber-400 to-yellow-300 text-blue-950 font-black text-lg hover:from-amber-300 hover:to-yellow-200 transition-all shadow-xl shadow-amber-500/30"
            >
              أنشئ حسابك مجاناً ✨
            </Link>
            <Link
              href="/lessons"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border-2 border-white/30 bg-white/10 text-white font-bold text-base hover:bg-white/20 transition-all"
            >
              📺 شوف الدروس أولاً
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
