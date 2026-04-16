import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 bg-gray-950 relative overflow-hidden">
      {/* Glow orbs */}
      <div className="absolute top-0 left-1/3 w-[400px] h-[400px] bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-[300px] h-[300px] bg-emerald-600/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 text-emerald-400 text-xs font-semibold mb-8">
          <Sparkles className="w-3.5 h-3.5" />
          Plus de 1 000 familles marocaines nous font confiance
        </div>

        {/* Headline — Darija tagline */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
          Nour kayntwaq lik daba 🎓
        </h2>
        <p className="text-gray-400 text-lg mb-3">
          Ton tuteur IA t'attend — commence gratuitement maintenant
        </p>
        <p className="text-gray-600 text-sm mb-10">
          5 questions/jour gratuitement · Pro à{" "}
          <span className="text-emerald-500 font-semibold">99 DH/mois</span>
          <span className="text-gray-700 ml-1">(3.30 DH/jour)</span>
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link
            href="/auth/register"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-blue-900/40 transition-all text-base"
          >
            Commencer gratuitement
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-4 rounded-2xl transition-all text-base"
          >
            Voir les tarifs
          </Link>
        </div>

        {/* Anthropic attribution */}
        <p className="text-gray-700 text-xs flex items-center justify-center gap-1.5">
          <Sparkles className="w-3 h-3" />
          Propulsé par Claude · Anthropic · Sans engagement · Annulable à tout moment
        </p>
      </div>
    </section>
  );
}
