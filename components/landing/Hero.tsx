"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Shield, BookOpen, Sparkles, Zap } from "lucide-react";

const trustItems = [
  { icon: Shield, label: "Sécurisé & RGPD" },
  { icon: BookOpen, label: "Programme officiel marocain" },
  { icon: Sparkles, label: "Réponses instantanées" },
  { icon: Zap, label: "Disponible 24h/7j" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0a0f1e] min-h-screen flex flex-col">
      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-600/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Top spacing */}
      <div className="pt-24 pb-4" />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Left */}
            <div>
              {/* Price hook */}
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-emerald-400 text-xs font-semibold mb-6">
                <Zap className="w-3.5 h-3.5" />
                Dès 3.30 DH/jour seulement
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-white leading-[1.1] mb-5 tracking-tight">
                Le tuteur IA{" "}
                <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                  pour collégiens
                </span>
                <br />
                <span className="text-white/80 font-semibold text-3xl sm:text-4xl">
                  marocains 🇲🇦
                </span>
              </h1>

              <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg">
                Pose tes questions en <span className="text-white font-medium">Darija</span> ou en{" "}
                <span className="text-white font-medium">français</span> — Nour t'explique toutes les matières
                du collège, étape par étape, instantanément.
              </p>

              {/* Subject pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                {["Maths", "Physique", "SVT", "Français", "Arabe", "Histoire-Géo", "Islam"].map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 hover:bg-white/10 transition-colors"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Link
                  href="/auth/register"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold px-7 py-3.5 rounded-2xl shadow-lg shadow-blue-900/40 transition-all text-base"
                >
                  Commencer gratuitement
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/chat"
                  className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold px-7 py-3.5 rounded-2xl transition-all text-base backdrop-blur-sm"
                >
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  Essayer sans inscription
                </Link>
              </div>

              {/* Pricing note */}
              <p className="text-gray-500 text-sm">
                Gratuit · 5 questions/jour · Sans carte bancaire{" "}
                <span className="text-gray-600 mx-1">·</span>
                <span className="text-emerald-500">Pro à 99 DH/mois</span>
                <span className="text-gray-600 text-xs ml-1">(3.30 DH/jour)</span>
              </p>
            </div>

            {/* Right: Chat Demo */}
            <div className="relative hidden lg:block">
              {/* Glow behind card */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-emerald-600/10 rounded-3xl blur-2xl scale-105" />

              <div className="relative bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                {/* Chat header */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5 bg-white/3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                  </div>
                  <div className="flex-1 flex items-center justify-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
                      <span className="text-xs">🎓</span>
                    </div>
                    <span className="text-white/70 text-sm font-medium">Nour · Modarisi AI</span>
                    <span className="flex items-center gap-1 text-emerald-400 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                      En ligne
                    </span>
                  </div>
                </div>

                {/* Messages */}
                <div className="p-5 space-y-4 min-h-[300px]">
                  {/* User */}
                  <div className="flex justify-end">
                    <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[78%] text-sm shadow-lg">
                      C'est quoi la 2ème loi de Newton ?
                    </div>
                  </div>

                  {/* AI */}
                  <div className="flex gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center shrink-0 text-sm">🎓</div>
                    <div className="bg-white/5 border border-white/8 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[78%] text-sm">
                      <p className="text-gray-200 mb-2">La deuxième loi de Newton :</p>
                      <div className="bg-blue-950/60 border border-blue-500/20 rounded-xl p-3 text-center font-mono font-bold text-blue-300 text-lg tracking-widest mb-2">
                        F = m × a
                      </div>
                      <p className="text-gray-400 text-xs">F = force (N) · m = masse (kg) · a = accélération (m/s²)</p>
                    </div>
                  </div>

                  {/* User follow-up */}
                  <div className="flex justify-end">
                    <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[78%] text-sm shadow-lg">
                      3tini mithalan men l7ayat l3amalia 🙏
                    </div>
                  </div>

                  {/* Typing */}
                  <div className="flex gap-2.5 items-end">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center shrink-0 text-sm">🎓</div>
                    <div className="bg-white/5 border border-white/8 rounded-2xl rounded-tl-sm px-4 py-3">
                      <div className="flex gap-1.5 items-center">
                        {[0, 1, 2].map((i) => (
                          <span
                            key={i}
                            className="w-2 h-2 rounded-full bg-blue-400 animate-bounce inline-block"
                            style={{ animationDelay: `${i * 0.18}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Input */}
                <div className="px-5 pb-5">
                  <div className="flex gap-2 bg-white/5 border border-white/10 rounded-xl p-2 backdrop-blur-sm">
                    <input
                      readOnly
                      placeholder="Pose ta question en Darija ou français…"
                      className="flex-1 bg-transparent text-sm text-gray-500 outline-none px-2 placeholder:text-gray-600"
                    />
                    <button className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-4 py-1.5 text-xs font-semibold transition-colors">
                      Envoyer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <div className="relative z-10 border-t border-white/5 bg-white/2 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {trustItems.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                <Icon className="w-3.5 h-3.5 text-gray-600" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
