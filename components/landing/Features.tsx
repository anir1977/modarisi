"use client";

import React from "react";
import {
  MessageCircle,
  Brain,
  BarChart3,
  Clock,
  Globe2,
  Shield,
  Zap,
  BookMarked,
} from "lucide-react";

const features = [
  {
    icon: MessageCircle,
    title: "Darija & Français",
    desc: "Pose tes questions dans la langue que tu préfères. Nour comprend le mélange naturellement.",
    gradient: "from-blue-500 to-cyan-500",
    glow: "rgba(59,130,246,0.3)",
  },
  {
    icon: Brain,
    title: "IA Pédagogique",
    desc: "Explications adaptées au programme marocain pour les 3 années du collège, matière par matière.",
    gradient: "from-violet-500 to-purple-500",
    glow: "rgba(139,92,246,0.3)",
  },
  {
    icon: BarChart3,
    title: "Dashboard Parents",
    desc: "Suivez la progression de votre enfant, les matières travaillées et le temps d'étude.",
    gradient: "from-emerald-500 to-teal-500",
    glow: "rgba(16,185,129,0.3)",
  },
  {
    icon: Clock,
    title: "Disponible 24h/7j",
    desc: "Votre tuteur IA est là à minuit avant un examen. Pas besoin d'attendre.",
    gradient: "from-amber-500 to-orange-500",
    glow: "rgba(245,158,11,0.3)",
  },
  {
    icon: Globe2,
    title: "Programme Officiel",
    desc: "Aligné sur le programme du ministère de l'Éducation nationale marocain.",
    gradient: "from-rose-500 to-pink-500",
    glow: "rgba(244,63,94,0.3)",
  },
  {
    icon: Zap,
    title: "Réponses Instantanées",
    desc: "Moins de 2 secondes. Explications étape par étape avec exemples pratiques.",
    gradient: "from-indigo-500 to-blue-500",
    glow: "rgba(99,102,241,0.3)",
  },
  {
    icon: BookMarked,
    title: "Exercices & Révisions",
    desc: "QCM, résumés de cours, exercices supplémentaires — tout pour réviser efficacement.",
    gradient: "from-teal-500 to-emerald-500",
    glow: "rgba(20,184,166,0.3)",
  },
  {
    icon: Shield,
    title: "Sécurisé & RGPD",
    desc: "Données protégées, contenu filtré pour mineurs. La confiance des parents est notre priorité.",
    gradient: "from-slate-400 to-gray-500",
    glow: "rgba(100,116,139,0.3)",
  },
];

export default function Features() {
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative bg-white/3 border border-white/8 rounded-2xl p-6 overflow-hidden cursor-default transition-all duration-300 hover:bg-white/5"
              style={{
                /* animated gradient border on hover via box-shadow trick */
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                style={{ boxShadow: `inset 0 0 30px 0 ${f.glow}` }}
              />
              {/* Gradient border top line */}
              <div
                className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${f.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                <f.icon className="w-5 h-5 text-white" />
              </div>

              <h3 className="font-bold text-white mb-2 text-sm">{f.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
