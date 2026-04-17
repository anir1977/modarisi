import React from "react";
import Link from "next/link";
import { UserPlus, BookOpen, Upload, Star, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Inscris-toi gratuitement",
    desc: "Inscription en moins de 2 minutes. Aucune carte bancaire requise. 5 questions gratuites dès le premier jour.",
    gradient: "from-blue-500 to-cyan-500",
    glow: "shadow-blue-500/25",
    detail: "Sans engagement · Annulable à tout moment",
  },
  {
    number: "02",
    icon: BookOpen,
    title: "Choisis ta matière et ton niveau",
    desc: "Sélectionne ta matière (Maths, Physique, SVT…) et ton année (1ère, 2ème ou 3ème collège). Nour s'adapte à ton programme.",
    gradient: "from-violet-500 to-purple-500",
    glow: "shadow-violet-500/25",
    detail: "7 matières · 3 niveaux",
  },
  {
    number: "03",
    icon: Upload,
    title: "Pose tes questions ou upload ton exercice",
    desc: "Écris en Darija, en français, ou les deux. Tu peux aussi uploader une photo de ton exercice pour une correction immédiate.",
    gradient: "from-emerald-500 to-teal-500",
    glow: "shadow-emerald-500/25",
    detail: "Darija · Français · Photo upload",
  },
  {
    number: "04",
    icon: Star,
    title: "Reçois une explication personnalisée",
    desc: "Nour te répond étape par étape avec des exemples concrets du programme marocain. Correction détaillée + conseils pour progresser.",
    gradient: "from-amber-500 to-orange-500",
    glow: "shadow-amber-500/25",
    detail: "Réponse en < 2 secondes",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-gray-950 relative overflow-hidden">
      {/* Grid bg */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-blue-400 font-semibold text-xs uppercase tracking-[0.2em] mb-3">
            Comment ça marche
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            En 4 étapes simples
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            De l'inscription à ta première explication personnalisée en moins de 5 minutes
          </p>
        </div>

        {/* Vertical timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 sm:left-10 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/40 via-emerald-500/20 to-transparent" />

          <div className="space-y-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="relative flex gap-6 sm:gap-8 group"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  {/* Icon node on the line */}
                  <div className="shrink-0 flex flex-col items-center">
                    <div
                      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-xl ${step.glow} transition-transform duration-300 group-hover:scale-105 z-10`}
                    >
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <div className="bg-white/3 border border-white/8 rounded-2xl p-6 group-hover:bg-white/5 group-hover:border-white/15 transition-all duration-300">
                      {/* Step number */}
                      <span className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em] mb-2 block">
                        Étape {step.number}
                      </span>
                      <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-3">{step.desc}</p>
                      <div className={`inline-flex items-center gap-1.5 text-xs font-medium bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}>
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${step.gradient}`} />
                        {step.detail}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-blue-900/30 transition-all text-base"
          >
            Commencer maintenant — c'est gratuit
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-gray-600 text-sm mt-3">Sans carte bancaire · 5 questions gratuites</p>
        </div>
      </div>
    </section>
  );
}
