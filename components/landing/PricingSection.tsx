import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, X } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Pro",
    nameAr: "برو",
    price: "99",
    period: "DH/mois",
    description: "Pour l'élève qui veut réussir",
    badge: "Le plus populaire · الأكثر شعبية",
    features: [
      { text: "Questions illimitées", included: true },
      { text: "7 matières du collège (1ère–3ème)", included: true },
      { text: "Darija + Français", included: true },
      { text: "Historique complet", included: true },
      { text: "Dashboard parents", included: true },
      { text: "Exercices personnalisés", included: true },
      { text: "Rapports hebdomadaires", included: true },
      { text: "Support email", included: true },
    ],
    cta: "Choisir Pro",
    ctaHref: "/auth/register?plan=pro",
    variant: "default" as const,
    highlighted: true,
  },
  {
    name: "Famille",
    nameAr: "عائلي",
    price: "149",
    period: "DH/mois",
    description: "Pour toute la fratrie — jusqu'à 3 enfants",
    badge: "Meilleure valeur · أفضل قيمة",
    features: [
      { text: "Jusqu'à 3 enfants inclus", included: true },
      { text: "Questions illimitées (chaque enfant)", included: true },
      { text: "7 matières du collège (1ère–3ème)", included: true },
      { text: "Darija + Français", included: true },
      { text: "Dashboard parents avancé", included: true },
      { text: "Exercices personnalisés", included: true },
      { text: "Rapports comparatifs enfants", included: true },
      { text: "Support prioritaire WhatsApp", included: true },
    ],
    cta: "Choisir Famille",
    ctaHref: "/auth/register?plan=famille",
    variant: "secondary" as const,
    highlighted: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-3">
            Tarification
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Des prix accessibles pour toutes les familles
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Sans frais cachés, annulable à tout moment
          </p>
        </div>

        {/* Plans grid — 2 centred cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "relative border-2 transition-all duration-300",
                plan.highlighted
                  ? "border-primary-600 shadow-2xl shadow-primary-100 scale-[1.03] hover:scale-[1.05]"
                  : "border-emerald-400 shadow-lg hover:shadow-xl hover:-translate-y-1"
              )}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <Badge
                    variant={plan.highlighted ? "default" : "secondary"}
                    className="px-4 py-1 text-xs shadow-md"
                  >
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <CardHeader className="pt-10 pb-4">
                <div className="mb-3">
                  <span className="text-2xl font-bold text-gray-900">{plan.name}</span>
                  <span className="text-gray-400 text-sm ml-2">· {plan.nameAr}</span>
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-xl font-semibold text-gray-500">DH</span>
                  <span className="text-gray-400 text-sm ml-1">/{plan.period}</span>
                </div>
                <p className="text-sm text-gray-500">{plan.description}</p>
              </CardHeader>

              <CardContent className="pt-0">
                <Button variant={plan.variant} className="w-full mb-6" size="lg" asChild>
                  <Link href={plan.ctaHref}>{plan.cta} · {plan.nameAr}</Link>
                </Button>

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature.text} className="flex items-center gap-2.5 text-sm">
                      <CheckCircle2 className={cn("w-4 h-4 shrink-0", plan.highlighted ? "text-primary-600" : "text-emerald-500")} />
                      <span className="text-gray-700 font-medium">{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 mt-10">
          🏦 Paiement par virement bancaire · Attijariwafa Bank · Activation sous 1h
        </p>
      </div>
    </section>
  );
}
