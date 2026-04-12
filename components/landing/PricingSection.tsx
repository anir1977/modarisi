import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, X } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Gratuit",
    price: "0",
    period: "pour toujours",
    description: "Pour découvrir Modarisi",
    badge: null,
    features: [
      { text: "5 questions par jour", included: true },
      { text: "7 matières du collège (1ère–3ème)", included: true },
      { text: "Darija + Français", included: true },
      { text: "Historique 7 jours", included: true },
      { text: "Dashboard parents", included: false },
      { text: "Questions illimitées", included: false },
      { text: "Exercices personnalisés", included: false },
      { text: "Rapports détaillés", included: false },
    ],
    cta: "Commencer gratuitement",
    ctaHref: "/auth/register",
    variant: "outline" as const,
    highlighted: false,
  },
  {
    name: "Pro",
    price: "99",
    period: "DH/mois",
    description: "Pour l'élève qui veut réussir",
    badge: "Le plus populaire",
    features: [
      { text: "Questions illimitées", included: true },
      { text: "7 matières du collège (1ère–3ème)", included: true },
      { text: "Darija + Français", included: true },
      { text: "Historique complet", included: true },
      { text: "Dashboard parents", included: true },
      { text: "Exercices personnalisés", included: true },
      { text: "Rapports hebdomadaires", included: true },
      { text: "Support email", included: false },
    ],
    cta: "Choisir Pro",
    ctaHref: "/auth/register?plan=pro",
    variant: "default" as const,
    highlighted: true,
  },
  {
    name: "Famille",
    price: "149",
    period: "DH/mois",
    description: "Pour toute la fratrie",
    badge: "Meilleure valeur",
    features: [
      { text: "Jusqu'à 3 enfants", included: true },
      { text: "Questions illimitées", included: true },
      { text: "7 matières du collège (1ère–3ème)", included: true },
      { text: "Darija + Français", included: true },
      { text: "Dashboard parents avancé", included: true },
      { text: "Exercices personnalisés", included: true },
      { text: "Rapports détaillés", included: true },
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

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "relative border-2 transition-all duration-300 hover:-translate-y-1",
                plan.highlighted
                  ? "border-primary-600 shadow-xl shadow-primary-100 scale-105"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-lg"
              )}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <Badge
                    variant={plan.highlighted ? "default" : "secondary"}
                    className="px-4 py-1 text-xs"
                  >
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <CardHeader className="pt-8">
                <div className="mb-2">
                  <span className="text-lg font-bold text-gray-900">
                    {plan.name}
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  {plan.price !== "0" && (
                    <span className="text-lg font-semibold text-gray-500">DH</span>
                  )}
                  <span className="text-gray-500 text-sm">/{plan.period}</span>
                </div>
                <p className="text-sm text-gray-500">{plan.description}</p>
              </CardHeader>

              <CardContent>
                <Button
                  variant={plan.variant}
                  className="w-full mb-6"
                  asChild
                >
                  <Link href={plan.ctaHref}>{plan.cta}</Link>
                </Button>

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature.text}
                      className="flex items-center gap-2.5 text-sm"
                    >
                      {feature.included ? (
                        <CheckCircle2 className="w-4 h-4 text-secondary-500 shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-gray-300 shrink-0" />
                      )}
                      <span
                        className={
                          feature.included ? "text-gray-700" : "text-gray-400"
                        }
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          Paiement sécurisé · CMI, CIH Pay, Payzone, Visa/Mastercard
        </p>
      </div>
    </section>
  );
}
