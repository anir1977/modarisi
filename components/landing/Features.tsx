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
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: MessageCircle,
    title: "Chat en Darija & Français",
    description:
      "Posez vos questions dans la langue qui vous convient. Modarisi comprend le mélange Darija-Français naturellement.",
    color: "text-primary-600",
    bg: "bg-primary-50",
    border: "border-primary-100",
  },
  {
    icon: Brain,
    title: "IA Pédagogique Avancée",
    description:
      "Explications adaptées au programme marocain pour les 3 années du collège. Maths, SVT, Physique, Français, Arabe, Histoire-Géo et Éducation Islamique.",
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-100",
  },
  {
    icon: BarChart3,
    title: "Suivi de Progression",
    description:
      "Dashboard parents avec rapports détaillés. Suivez les matières, le temps d'étude et les points à améliorer.",
    color: "text-secondary-600",
    bg: "bg-secondary-50",
    border: "border-secondary-100",
  },
  {
    icon: Clock,
    title: "Disponible 24h/7j",
    description:
      "Pas besoin d'attendre. Votre tuteur IA est disponible à minuit pour réviser avant un examen.",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
  {
    icon: Globe2,
    title: "Programme Marocain",
    description:
      "Aligné sur le programme officiel du ministère de l'Éducation nationale marocain : 1ère, 2ème et 3ème année collège.",
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-100",
  },
  {
    icon: Zap,
    title: "Réponses Instantanées",
    description:
      "Moins de 2 secondes pour une réponse complète avec explications étape par étape et exemples pratiques.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-100",
  },
  {
    icon: BookMarked,
    title: "Exercices & Révisions",
    description:
      "Demandez des exercices supplémentaires, des QCM, ou des résumés de cours pour réviser efficacement.",
    color: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-100",
  },
  {
    icon: Shield,
    title: "Sécurisé & Adapté aux Mineurs",
    description:
      "Données protégées, contenu filtré et adapté aux mineurs. La confiance des parents est notre priorité.",
    color: "text-slate-600",
    bg: "bg-slate-50",
    border: "border-slate-100",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-3">
            Fonctionnalités
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Tout ce dont un collégien marocain a besoin
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Conçu pour les élèves de 1ère, 2ème et 3ème année collège au Maroc
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className={cn(
                "card-hover border-2 cursor-default",
                feature.border
              )}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CardContent className="p-6">
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                    feature.bg
                  )}
                >
                  <feature.icon className={cn("w-6 h-6", feature.color)} />
                </div>
                <h3 className="font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
