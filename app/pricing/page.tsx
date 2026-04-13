"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, X, HelpCircle, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

// ── Bank details ─────────────────────────────────────────────────────────────
const BANK_NAME = "Attijariwafa Bank";
const BANK_CODE = "007";
const BANK_RIB  = "007780001251100030066193";
const BANK_SWIFT = "BCMAMAMC";
const WHATSAPP  = "+212 6 XX XX XX XX"; // ← remplace par ton vrai numéro

// ─────────────────────────────────────────────────────────────────────────────

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
    paid: false,
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
    ctaHref: null,
    variant: "default" as const,
    highlighted: true,
    color: "border-primary-600",
    paid: true,
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
    ctaHref: null,
    variant: "secondary" as const,
    highlighted: false,
    color: "border-secondary-500",
    paid: true,
  },
];

const faqs = [
  {
    q: "Comment fonctionne le plan gratuit?",
    qAr: "كيف تعمل الخطة المجانية؟",
    a: "Avec le plan gratuit, vous avez droit à 5 questions par jour, renouvelées chaque jour à minuit. Pas de carte bancaire requise.",
  },
  {
    q: "Comment payer par virement?",
    qAr: "كيف أدفع بالتحويل البنكي؟",
    a: "Cliquez sur « Choisir Pro » ou « Choisir Famille », suivez les instructions de virement, puis envoyez la confirmation sur WhatsApp. L'équipe activera votre compte sous 24h.",
  },
  {
    q: "Puis-je annuler à tout moment?",
    qAr: "هل يمكنني الإلغاء في أي وقت؟",
    a: "Oui, vous pouvez annuler votre abonnement à tout moment en nous contactant sur WhatsApp. Vous gardez l'accès jusqu'à la fin de la période payée.",
  },
  {
    q: "Le contenu est-il adapté au programme marocain?",
    qAr: "هل المحتوى متوافق مع المنهج المغربي؟",
    a: "Oui ! Notre IA couvre le programme officiel du ministère de l'Éducation nationale marocain pour les 7 matières du collège pour les 3 années : 1ère, 2ème et 3ème année collège.",
  },
  {
    q: "Y a-t-il un essai gratuit pour les plans payants?",
    qAr: "هل هناك تجربة مجانية للخطط المدفوعة؟",
    a: "Vous pouvez commencer avec le plan gratuit (5 questions/jour) et passer à Pro ou Famille à tout moment.",
  },
];

type ModalPlan = { name: string; price: string } | null;

async function saveVirementRequest(
  userId: string | undefined,
  email: string,
  planName: string,
  amount: string
) {
  if (!userId) return;
  const supabase = createClient();
  await supabase.from("virement_requests").insert({
    user_id: userId,
    email,
    plan: planName,
    amount,
  });
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="ml-2 p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-primary-600 transition-colors"
      title="Copier"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

export default function PricingPage() {
  const [modalPlan, setModalPlan] = useState<ModalPlan>(null);
  const [virementDone, setVirementDone] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user?.email) setUserEmail(user.email);
      if (user?.id) setUserId(user.id);
    });
  }, []);

  const openModal = (plan: typeof plans[0]) => {
    setVirementDone(false);
    setModalPlan({ name: plan.name, price: plan.price });
  };

  const handleVirementDone = async () => {
    if (!modalPlan) return;
    setSaving(true);
    await saveVirementRequest(
      userId,
      userEmail ?? "inconnu",
      modalPlan.name,
      `${modalPlan.price} DH`
    );
    setSaving(false);
    setVirementDone(true);
  };

  const closeModal = () => {
    setModalPlan(null);
    setVirementDone(false);
  };

  return (
    <main>
      <Navbar />

      {/* ── Virement modal ──────────────────────────────────────────────────── */}
      {modalPlan && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Paiement par virement
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Plan {modalPlan.name} — {modalPlan.price} DH/mois
                </p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {virementDone ? (
              /* ── Thank you screen ─────────────────────────────────────────── */
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Merci pour votre virement !
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  Notre équipe activera votre compte <strong>Plan {modalPlan.name}</strong> dans les 24h après réception du virement.
                </p>
                <p className="text-xs text-gray-400 mb-6">
                  Vous recevrez un email de confirmation dès que votre compte est activé.
                </p>
                <div className="bg-primary-50 border border-primary-100 rounded-xl p-4 text-sm text-primary-700 mb-6">
                  En cas de question, contactez-nous sur WhatsApp :<br />
                  <strong>{WHATSAPP}</strong>
                </div>
                <Button className="w-full" onClick={closeModal}>
                  Fermer
                </Button>
              </div>
            ) : (
              /* ── Payment instructions ─────────────────────────────────────── */
              <div className="p-6 space-y-5">
                <p className="text-sm text-gray-600">
                  Effectuez un virement bancaire avec les informations suivantes, puis confirmez sur WhatsApp pour activer votre abonnement.
                </p>

                {/* Instructions grid */}
                {/* ⚡ Instant virement note */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <p className="text-sm font-semibold text-blue-800 mb-1">
                    ⚡ Virement instantané recommandé
                  </p>
                  <p className="text-xs text-blue-700 leading-relaxed">
                    Pour une activation <strong>immédiate</strong> de votre compte, effectuez un
                    virement instantané depuis votre application bancaire.<br />
                    Les virements normaux peuvent prendre 24–48h.
                  </p>
                </div>

                {/* Bank details rows */}
                <div className="space-y-2">
                  {[
                    { label: "Banque",              value: BANK_NAME,                    copyable: false },
                    { label: "Code Banque",          value: BANK_CODE,                    copyable: false },
                    { label: "RIB",                  value: BANK_RIB,                     copyable: true  },
                    { label: "SWIFT / BIC",          value: BANK_SWIFT,                   copyable: true  },
                    { label: "Montant",              value: `${modalPlan.price} DH/mois`, copyable: false },
                    {
                      label: "Référence (obligatoire)",
                      value: userEmail ?? "Votre adresse email",
                      copyable: !!userEmail,
                      note: "Entrez votre adresse email exactement comme référence",
                    },
                  ].map((row) => (
                    <div key={row.label} className="bg-gray-50 rounded-xl px-4 py-3">
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                        {row.label}
                      </p>
                      <div className="flex items-center gap-1">
                        <p className="font-semibold text-gray-900 text-sm flex-1 font-mono">
                          {row.value}
                        </p>
                        {row.copyable && <CopyButton text={row.value} />}
                      </div>
                      {row.note && (
                        <p className="text-[10px] text-amber-600 mt-0.5">{row.note}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* WhatsApp confirmation */}
                <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                  <p className="text-sm font-semibold text-green-800 mb-1">
                    📲 Confirmation WhatsApp
                  </p>
                  <p className="text-xs text-green-700 leading-relaxed">
                    Après le paiement, envoyez le reçu sur WhatsApp :{" "}
                    <span className="font-bold">{WHATSAPP}</span>
                    <br />
                    Votre compte sera activé dans <strong>l'heure</strong> qui suit.
                  </p>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  disabled={saving}
                  onClick={handleVirementDone}
                >
                  {saving ? "Enregistrement…" : "J'ai effectué le virement ✓"}
                </Button>

                <button
                  onClick={closeModal}
                  className="w-full text-sm text-gray-400 hover:text-gray-600 transition-colors py-1"
                >
                  Annuler
                </button>
              </div>
            )}
          </div>
        </div>
      )}

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
                      <span className="text-xl font-bold text-gray-900">{plan.name}</span>
                      <span className="text-gray-400 text-sm font-arabic mr-2"> · {plan.nameAr}</span>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-1 my-2">
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    {plan.price !== "0" && (
                      <span className="text-xl font-semibold text-gray-500">DH</span>
                    )}
                    <span className="text-gray-400 text-sm ml-1">/{plan.period}</span>
                  </div>

                  <p className="text-sm text-gray-500">{plan.description}</p>

                  {plan.paid ? (
                    <Button
                      variant={plan.variant}
                      className="w-full mt-4"
                      size="lg"
                      onClick={() => openModal(plan)}
                    >
                      {plan.cta} · {plan.ctaAr}
                    </Button>
                  ) : (
                    <Button
                      variant={plan.variant}
                      className="w-full mt-4"
                      size="lg"
                      asChild
                    >
                      <Link href={plan.ctaHref!}>
                        {plan.cta} · {plan.ctaAr}
                      </Link>
                    </Button>
                  )}
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      Ce qui est inclus · المميزات
                    </p>
                    <ul className="space-y-2.5">
                      {plan.features.map((feature) => (
                        <li key={feature.text} className="flex items-start gap-2.5">
                          {feature.included ? (
                            <CheckCircle2
                              className={cn(
                                "w-4 h-4 shrink-0 mt-0.5",
                                feature.highlight ? "text-primary-600" : "text-secondary-500"
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
            🏦 Paiement par virement bancaire · Activation sous 24h
          </p>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">الأسئلة الشائعة</h2>
            <p className="text-xl text-gray-500">Foire aux questions · FAQ</p>
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
                    <p className="text-xs text-gray-400 font-arabic mb-3">{faq.qAr}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
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
