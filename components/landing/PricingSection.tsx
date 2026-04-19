import React from "react";
import Link from "next/link";
import { CheckCircle2, MessageSquare, BookOpen, Pencil, GraduationCap } from "lucide-react";

const freeFeatures = [
  {
    icon: MessageSquare,
    gradient: "from-blue-500 to-cyan-500",
    title: "Chat مع نور",
    titleFr: "Chat avec Nour",
    desc: "5 أسئلة مجانية يومياً",
    descFr: "5 questions gratuites par jour",
  },
  {
    icon: BookOpen,
    gradient: "from-emerald-500 to-teal-500",
    title: "الدروس الكاملة",
    titleFr: "Cours complets",
    desc: "جميع الدروس بدون حد",
    descFr: "Tous les cours, sans limite",
  },
  {
    icon: Pencil,
    gradient: "from-violet-500 to-purple-500",
    title: "تصحيح التمارين",
    titleFr: "Correction d'exercices",
    desc: "3 تصحيحات مجانية يومياً",
    descFr: "3 corrections gratuites par jour",
  },
  {
    icon: GraduationCap,
    gradient: "from-amber-500 to-orange-500",
    title: "جميع المواد",
    titleFr: "Toutes les matières",
    desc: "7 مواد للإعدادي 1 — 2 — 3",
    descFr: "7 matières pour le collège",
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-1.5 text-emerald-700 text-sm font-semibold mb-4">
            🎉 100% مجاني · 100% Gratuit
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            مجاني للجميع، بدون استثناء
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Gratuit pour tous les élèves — sans abonnement, sans carte bancaire
          </p>
        </div>

        {/* Big free card */}
        <div className="bg-white border-2 border-emerald-200 rounded-3xl p-10 shadow-xl shadow-emerald-50 mb-10 relative overflow-hidden">
          {/* background accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="relative">
            {/* Price */}
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-7xl font-extrabold text-gray-900">0</span>
              <span className="text-3xl font-bold text-gray-400">DH</span>
            </div>
            <p className="text-emerald-600 font-semibold text-lg mb-8">مجاناً للأبد · Gratuit pour toujours</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {freeFeatures.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="flex items-start gap-3 bg-gray-50 rounded-2xl p-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center shrink-0 shadow-md`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <p className="font-bold text-gray-900 text-sm">{f.title}</p>
                      </div>
                      <p className="text-sm text-gray-700">{f.desc}</p>
                      <p className="text-xs text-gray-400">{f.descFr}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/auth/register"
                className="flex-1 text-center bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200/60 transition-all text-base"
              >
                ابدأ مجاناً الآن · Commencer gratuitement
              </Link>
              <Link
                href="/cours"
                className="flex-1 text-center bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-semibold py-4 rounded-2xl transition-all text-base"
              >
                تصفح الدروس · Voir les cours
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <p className="text-center text-sm text-gray-400">
          الأسئلة تتجدد كل يوم عند منتصف الليل · Les questions se renouvellent chaque jour à minuit 🌙
        </p>
      </div>
    </section>
  );
}
