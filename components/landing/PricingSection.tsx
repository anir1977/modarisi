import React from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

const plans = [
  {
    name: "Pro",
    nameAr: "برو",
    price: "99",
    perDay: "3,3",
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
    highlighted: true,
  },
  {
    name: "Famille",
    nameAr: "عائلي",
    price: "149",
    perDay: "4,9",
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
    highlighted: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-[#060a14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-blue-400 font-semibold text-sm uppercase tracking-wider mb-3">
            Tarification
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Des prix accessibles pour toutes les familles
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Sans frais cachés, annulable à tout moment
          </p>
        </div>

        {/* Plans grid — 2 centred cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Pro plan */}
          <div className="relative bg-blue-600/10 border border-blue-500/50 rounded-3xl p-8 pt-10 shadow-[0_0_40px_rgba(59,130,246,0.08)] hover:shadow-[0_0_60px_rgba(59,130,246,0.14)] transition-shadow duration-300">
            {/* Badge */}
            <div className="absolute -top-4 left-0 right-0 flex justify-center">
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-md">
                {plans[0].badge}
              </span>
            </div>

            {/* Name */}
            <div className="mb-4">
              <span className="text-2xl font-bold text-white">{plans[0].name}</span>
              <span className="text-gray-400 text-sm ml-2">· {plans[0].nameAr}</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-5xl font-bold text-white">{plans[0].price}</span>
              <span className="text-xl font-semibold text-gray-400">DH</span>
              <span className="text-gray-500 text-sm ml-1">/mois</span>
            </div>
            <p className="text-sm text-gray-500 mb-2">≈ {plans[0].perDay} DH par jour</p>
            <p className="text-sm text-gray-400 mb-6">{plans[0].description}</p>

            {/* CTA */}
            <Link
              href={plans[0].ctaHref}
              className="block w-full text-center bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold py-3 rounded-2xl mb-6 hover:from-blue-500 hover:to-blue-400 transition-all duration-200"
            >
              {plans[0].cta} · {plans[0].nameAr}
            </Link>

            {/* Features */}
            <ul className="space-y-3">
              {plans[0].features.map((feature) => (
                <li key={feature.text} className="flex items-center gap-2.5 text-sm">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-blue-400" />
                  <span className="text-gray-300 font-medium">{feature.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Famille plan */}
          <div className="relative bg-white/3 border border-emerald-500/30 rounded-3xl p-8 pt-10 hover:border-emerald-500/50 transition-colors duration-300">
            {/* Badge */}
            <div className="absolute -top-4 left-0 right-0 flex justify-center">
              <span className="bg-gradient-to-r from-emerald-600 to-emerald-400 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-md">
                {plans[1].badge}
              </span>
            </div>

            {/* Name */}
            <div className="mb-4">
              <span className="text-2xl font-bold text-white">{plans[1].name}</span>
              <span className="text-gray-400 text-sm ml-2">· {plans[1].nameAr}</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-5xl font-bold text-white">{plans[1].price}</span>
              <span className="text-xl font-semibold text-gray-400">DH</span>
              <span className="text-gray-500 text-sm ml-1">/mois</span>
            </div>
            <p className="text-sm text-gray-500 mb-2">≈ {plans[1].perDay} DH par jour</p>
            <p className="text-sm text-gray-400 mb-6">{plans[1].description}</p>

            {/* CTA */}
            <Link
              href={plans[1].ctaHref}
              className="block w-full text-center bg-white/5 border border-white/10 text-white font-semibold py-3 rounded-2xl mb-6 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
            >
              {plans[1].cta} · {plans[1].nameAr}
            </Link>

            {/* Features */}
            <ul className="space-y-3">
              {plans[1].features.map((feature) => (
                <li key={feature.text} className="flex items-center gap-2.5 text-sm">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span className="text-gray-300 font-medium">{feature.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-10">
          🏦 Paiement par virement bancaire · Attijariwafa Bank · Activation sous 1h
        </p>
      </div>
    </section>
  );
}
