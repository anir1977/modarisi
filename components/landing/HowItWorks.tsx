import React from "react";
import Link from "next/link";
import { UserPlus, MessageCircle, TrendingUp, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Crée ton compte",
    titleAr: "سجل حسابك",
    desc: "Inscription gratuite en moins de 2 minutes. Aucune carte bancaire requise.",
    color: "from-blue-500 to-blue-600",
    glow: "shadow-blue-500/20",
  },
  {
    number: "02",
    icon: MessageCircle,
    title: "Pose ta question",
    titleAr: "اسأل سؤالك",
    desc: "En Darija, en français, ou les deux à la fois. Nour comprend tout.",
    color: "from-violet-500 to-purple-600",
    glow: "shadow-violet-500/20",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Progresse chaque jour",
    titleAr: "تقدم كل يوم",
    desc: "Explications claires, exercices pratiques, révisions avant les examens.",
    color: "from-emerald-500 to-teal-600",
    glow: "shadow-emerald-500/20",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-gray-950 relative overflow-hidden">
      {/* subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-blue-400 font-semibold text-xs uppercase tracking-[0.2em] mb-3">
            Comment ça marche
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Simple comme bonjour
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            3 étapes et votre enfant a son propre tuteur IA disponible 24h/7j
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {steps.map((step, i) => (
            <div key={step.number} className="relative group">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[calc(50%+3rem)] right-0 h-px bg-gradient-to-r from-white/10 to-transparent z-10" />
              )}

              <div className="bg-white/3 border border-white/8 rounded-3xl p-8 hover:bg-white/5 hover:border-white/15 transition-all duration-300 h-full">
                {/* Step number */}
                <p className="text-6xl font-black text-white/5 mb-4 leading-none select-none">{step.number}</p>

                {/* Icon */}
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-5 shadow-lg ${step.glow}`}>
                  <step.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                <p className="text-gray-600 text-xs mb-3 font-medium">{step.titleAr}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-8 py-3.5 rounded-2xl hover:bg-gray-100 transition-colors shadow-xl text-base"
          >
            Commencer maintenant
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-gray-600 text-sm mt-3">Gratuit · Sans engagement</p>
        </div>
      </div>
    </section>
  );
}
