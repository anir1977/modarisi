import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, X, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Gratuit",
    nameAr: "مجاني",
    price: "0",
    period: "pour toujours",
    description: "Pour découvrir Modarisi sans engagement",
    badge: null,
    features: [
      { text: "5 questions par jour", included: true, highlight: false },
      { text: "7 matières · 1ère–3ème année collège", included: true, highlight: false },
      { text: "Darija + Français", included: true, highlight: false },
      { text: "Historique 7 jours", included: true, highlight: false },
      { text: "Application mobile", included: true, highlight: false },
      { text: "Dashboard parents", included: false, highlight: false },
      { text: "Questions illimitées", included: false, highlight: false },
      { text: "Exercices personnalisés", included: false, highlight: false },
      { text: "Rapports détaillés", included: false, highlight: false },
      { text: "Support WhatsApp", included: false, highlight: false },
    ],
    cta: "Commencer gratuitement",
    ctaAr: "ابدأ مجاناً",
    ctaHref: "/auth/register",
    variant: "outline" as const,
    highlighted: false,
    color: "border-gray-200",
  },
  {
    name: "Pro",
    nameAr: "برو",
    price: "99",
    period: "DH/mois",
    description: "Pour l'élève qui veut réussir",
    badge: "Le plus populaire · الأكثر شعبية",
    features: [
      { text: "Questions illimitées", included: true, highlight: true },
      { text: "7 matières · 1ère–3ème année collège", included: true, highlight: false },
      { text: "Darija + Français", included: true, highlight: false },
      { text: "Historique complet", included: true, highlight: false },
      { text: "Application mobile", included: true, highlight: false },
      { text: "Dashboard parents", included: true, highlight: true },
      { text: "Rapports hebdomadaires", included: true, highlight: true },
      { text: "Exercices personnalisés", included: true, highlight: true },
      { text: "Résumés de cours", included: true, highlight: false },
      { text: "Support email", included: true, highlight: false },
    ],
    cta: "Choisir Pro",
    ctaAr: "اختر برو",
    ctaHref: "/auth/register?plan=pro",
    variant: "default" as const,
    highlighted: true,
    color: "border-primary-600",
  },
  {
    name: "Famille",
    nameAr: "عائلي",
    price: "149",
    period: "DH/mois",
    description: "Pour toute la fratrie",
    badge: "Meilleure valeur · أفضل قيمة",
    features: [
      { text: "Jusqu'à 3 enfants", included: true, highlight: true },
      { text: "Questions illimitées (chaque enfant)", included: true, highlight: true },
      { text: "7 matières · 1ère–3ème année collège", included: true, highlight: false },
      { text: "Darija + Français", included: true, highlight: false },
      { text: "Application mobile", included: true, highlight: false },
      { text: "Dashboard parents avancé", included: true, highlight: true },
      { text: "Rapports comparatifs enfants", included: true, highlight: true },
      { text: "Exercices personnalisés", included: true, highlight: false },
      { text: "Résumés de cours", included: true, highlight: false },
      { text: "Support prioritaire WhatsApp", included: true, highlight: true },
    ],
    cta: "Choisir Famille",
    ctaAr: "اختر العائلي",
    ctaHref: "/auth/register?plan=famille",
    variant: "secondary" as const,
    highlighted: false,
    color: "border-secondary-500",
  },
];

const faqs = [
  {
    q: "Comment fonctionne le plan gratuit?",
    qAr: "كيف يعمل الخطة المجانية؟",
    a: "Avec le plan gratuit, vous avez droit à 5 questions par jour, renouvelées chaque jour à minuit. Pas de carte bancaire requise.",
  },
  {
    q: "Puis-je annuler à tout moment?",
    qAr: "هل يمكنني الإلغاء في أي وقت؟",
    a: "Oui, vous pouvez annuler votre abonnement à tout moment. Vous gardez l'accès jusqu'à la fin de la période payée.",
  },
  {
    q: "Quels moyens de paiement acceptez-vous?",
    qAr: "ما هي وسائل الدفع المقبولة؟",
    a: "Nous acceptons CMI, CIH Pay, Payzone, et les cartes bancaires marocaines Visa/Mastercard.",
  },
  {
    q: "Le contenu est-il adapté au programme marocain?",
    qAr: "هل المحتوى متوافق مع المنهج المغربي؟",
    a: "Oui ! Notre IA couvre le programme officiel du ministère de l'Éducation nationale marocain pour les 7 matières du collège (Mathématiques, Physique-Chimie, SVT, Français, Arabe, Éducation Islamique, Histoire-Géographie) pour les 3 années : 1ère, 2ème et 3ème année collège.",
  },
  {
    q: "Y a-t-il un essai gratuit pour les plans payants?",
    qAr: "هل هناك تجربة مجانية للخطط المدفوعة؟",
    a: "Vous pouvez commencer avec le plan gratuit et passer à Pro ou Famille à tout moment. Nous n'offrons pas de période d'essai spécifique pour les plans payants.",
  },
];

export default function PricingPage() {
  return (
    <main>
      <Navbar />

      <div className="pt-24 pb-16">
        {/* Hero */}
        <div className="bg-gradient-to-b from-primary-50 to-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="border-primary-200 bg-primary-50 text-primary-700 mb-4">
              الأسعار · Tarification
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              أسعار واضحة وبسيطة
            </h1>
            <p className="text-2xl text-gray-600 mb-3">
              Des prix transparents pour toutes les familles
            </p>
            <p className="text-gray-500 text-lg">
              Sans frais cachés · بدون رسوم خفية · Annulable à tout moment
            </p>
          </div>
        </div>

        {/* Plans */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={cn(
                  "relative border-2 transition-all duration-300",
                  plan.highlighted
                    ? "shadow-2xl shadow-primary-100 scale-105 border-primary-600"
                    : `${plan.color} hover:shadow-lg hover:-translate-y-1`
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

                <CardHeader className="pt-8 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-xl font-bold text-gray-900">
                        {plan.name}
                      </span>
                      <span className="text-gray-400 text-sm font-arabic mr-2">
                        · {plan.nameAr}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-1 my-2">
                    <span className="text-5xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    {plan.price !== "0" && (
                      <span className="text-xl font-semibold text-gray-500">
                        DH
                      </span>
                    )}
                    <span className="text-gray-400 text-sm ml-1">
                      /{plan.period}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500">{plan.description}</p>

                  <Button
                    variant={plan.variant}
                    className="w-full mt-4"
                    size="lg"
                    asChild
                  >
                    <Link href={plan.ctaHref}>
                      {plan.cta} · {plan.ctaAr}
                    </Link>
                  </Button>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      Ce qui est inclus · المميزات
                    </p>
                    <ul className="space-y-2.5">
                      {plan.features.map((feature) => (
                        <li
                          key={feature.text}
                          className="flex items-start gap-2.5"
                        >
                          {feature.included ? (
                            <CheckCircle2
                              className={cn(
                                "w-4 h-4 shrink-0 mt-0.5",
                                feature.highlight
                                  ? "text-primary-600"
                                  : "text-secondary-500"
                              )}
                            />
                          ) : (
                            <X className="w-4 h-4 text-gray-200 shrink-0 mt-0.5" />
                          )}
                          <span
                            className={cn(
                              "text-sm",
                              !feature.included
                                ? "text-gray-300"
                                : feature.highlight
                                ? "text-gray-900 font-medium"
                                : "text-gray-600"
                            )}
                          >
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            💳 Paiement sécurisé · CMI · CIH Pay · Payzone · Visa/Mastercard
          </p>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              الأسئلة الشائعة
            </h2>
            <p className="text-xl text-gray-500">
              Foire aux questions · FAQ
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-primary-200 transition-colors"
              >
                <div className="flex gap-3">
                  <HelpCircle className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">{faq.q}</p>
                    <p className="text-xs text-gray-400 font-arabic mb-3">
                      {faq.qAr}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
