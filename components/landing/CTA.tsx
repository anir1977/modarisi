import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle } from "lucide-react";

const guarantees = [
  "Sans carte bancaire",
  "5 questions gratuites par jour",
  "Annuler à tout moment",
  "Aligné programme MEN 🇲🇦",
];

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Deep gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0d1f3c] to-[#0a1628]" />
      {/* Glow orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-600/15 rounded-full blur-[100px] pointer-events-none" />
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Darija headline */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-3 tracking-tight leading-tight">
          Nour kaytwaqlak{" "}
          <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            daba
          </span>{" "}
          🎓
        </h2>

        {/* French subtitle */}
        <p className="text-gray-300 text-xl mb-2 font-medium">
          Ton tuteur IA t'attend — commence gratuitement maintenant
        </p>
        <p className="text-gray-500 text-sm mb-10">
          5 questions/jour gratuitement · Pro à{" "}
          <span className="text-emerald-400 font-semibold">99 DH/mois</span>
          <span className="text-gray-600 ml-1">(3.30 DH/jour)</span>
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <Link
            href="/auth/register"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold px-8 py-4 rounded-2xl shadow-2xl shadow-blue-900/50 transition-all text-base hover:scale-[1.02] active:scale-[0.98]"
          >
            Commencer gratuitement
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/programme"
            className="inline-flex items-center justify-center gap-2 bg-white/8 hover:bg-white/12 border border-white/15 text-white font-semibold px-8 py-4 rounded-2xl transition-all text-base backdrop-blur-sm"
          >
            <BookOpen className="w-4 h-4 text-blue-400" />
            Voir les cours
          </Link>
        </div>

        {/* Guarantees */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {guarantees.map((g) => (
            <span key={g} className="flex items-center gap-1.5 text-gray-400 text-sm">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
              {g}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
