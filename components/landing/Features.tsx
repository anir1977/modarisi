"use client";

import React from "react";
import {
  MessageCircle,
  Brain,
  BarChart3,
  Clock,
  Globe2,
  Zap,
  BookOpen,
  CheckSquare,
} from "lucide-react";

const features = [
  {
    icon: MessageCircle,
    title: "Darija & Français",
    desc: "Pose tes questions dans la langue que tu préfères. Nour comprend le mélange naturellement — code-switching inclus.",
    gradient: "from-blue-500 to-cyan-500",
    glow: "group-hover:shadow-blue-500/20",
    size: "large",
  },
  {
    icon: Brain,
    title: "IA Pédagogique",
    desc: "Explications adaptées au programme marocain, matière par matière.",
    gradient: "from-violet-500 to-purple-500",
    glow: "group-hover:shadow-violet-500/20",
    size: "small",
  },
  {
    icon: BarChart3,
    title: "Dashboard Parents",
    desc: "Suivez la progression et le temps d'étude de votre enfant.",
    gradient: "from-emerald-500 to-teal-500",
    glow: "group-hover:shadow-emerald-500/20",
    size: "small",
  },
  {
    icon: BookOpen,
    title: "Cours par chapitre",
    desc: "Cours structurés et fiches de révision par chapitre, alignés sur le programme officiel.",
    gradient: "from-amber-500 to-orange-500",
    glow: "group-hover:shadow-amber-500/20",
    size: "small",
  },
  {
    icon: CheckSquare,
    title: "Correction IA",
    desc: "Upload ton exercice, Nour le corrige et t'explique chaque étape.",
    gradient: "from-rose-500 to-pink-500",
    glow: "group-hover:shadow-rose-500/20",
    size: "small",
  },
  {
    icon: Clock,
    title: "Disponible 24h/7j",
    desc: "Là à minuit avant un examen. Jamais fatigué.",
    gradient: "from-sky-500 to-blue-500",
    glow: "group-hover:shadow-sky-500/20",
    size: "small",
  },
  {
    icon: Globe2,
    title: "Programme Officiel",
    desc: "Aligné sur le MEN — 1ère, 2ème et 3ème année collège.",
    gradient: "from-indigo-500 to-violet-500",
    glow: "group-hover:shadow-indigo-500/20",
    size: "small",
  },
  {
    icon: Zap,
    title: "Réponses Instantanées",
    desc: "Moins de 2 secondes. Étape par étape avec exemples.",
    gradient: "from-fuchsia-500 to-pink-500",
    glow: "group-hover:shadow-fuchsia-500/20",
    size: "small",
  },
];

function FeatureCard({ feature }: { feature: (typeof features)[number] }) {
  const Icon = feature.icon;
  return (
    <div
      className={`group relative bg-white/3 border border-white/8 rounded-2xl overflow-hidden cursor-default transition-all duration-300 hover:bg-white/[0.06] hover:border-white/15 hover:shadow-xl ${feature.glow} ${
        feature.size === "large" ? "p-8" : "p-6"
      }`}
    >
      {/* Top gradient line on hover */}
      <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg transition-transform duration-300 group-hover:scale-110`}
      >
        <Icon className="w-5 h-5 text-white" />
      </div>

      <h3 className={`font-bold text-white mb-2 ${feature.size === "large" ? "text-xl" : "text-base"}`}>
        {feature.title}
      </h3>
      <p className={`text-gray-400 leading-relaxed ${feature.size === "large" ? "text-base" : "text-sm"}`}>
        {feature.desc}
      </p>

      {feature.size === "large" && (
        <div className="mt-6 flex flex-wrap gap-2">
          {["Maths", "SVT", "Physique", "Français", "Arabe"].map((s) => (
            <span key={s} className="px-2.5 py-1 bg-white/5 border border-white/8 rounded-full text-xs text-gray-400">
              {s}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Features() {
  const [large, ...small] = features;

  return (
    <section id="features" className="py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-blue-400 font-semibold text-xs uppercase tracking-[0.2em] mb-3">
            Fonctionnalités
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Tout ce dont un collégien marocain a besoin
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Conçu pour les élèves de 1ère, 2ème et 3ème année collège au Maroc
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Large card — left column spanning 1 col, full height */}
          <div className="lg:col-span-1 lg:row-span-2">
            <FeatureCard feature={large} />
          </div>

          {/* Right grid: 2 cols × 2 rows */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {small.map((f) => (
              <FeatureCard key={f.title} feature={f} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
