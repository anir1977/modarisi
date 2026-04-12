"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  MessageCircle,
  Star,
  CheckCircle2,
} from "lucide-react";

const stats = [
  { value: "+5 000", label: "Étudiants actifs" },
  { value: "98%", label: "Taux de satisfaction" },
  { value: "24/7", label: "Disponible" },
];

const levels = ["1ère année collège", "2ème année collège", "3ème année collège"];

const subjects = [
  "Mathématiques",
  "Physique-Chimie",
  "SVT",
  "Français",
  "Arabe",
  "Éducation Islamique",
  "Histoire-Géographie",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero -z-10" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl -z-10 animate-float" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary-100/40 rounded-full blur-3xl -z-10" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] -z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="animate-fade-in-up">
            <Badge
              variant="outline"
              className="mb-6 border-primary-200 bg-primary-50 text-primary-700 gap-1.5 px-3 py-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Propulsé par l'Intelligence Artificielle
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Le tuteur IA
              <br />
              <span className="text-primary-600">pour collégiens</span>
              <br />
              <span className="text-3xl sm:text-4xl font-semibold text-gray-600">
                marocains
              </span>
            </h1>

            <p className="text-lg text-gray-600 mb-6 leading-relaxed max-w-lg">
              Posez vos questions en Darija ou en français — Modarisi vous
              répond instantanément pour toutes les matières du collège.
            </p>

            {/* Level pills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {levels.map((level) => (
                <span
                  key={level}
                  className="px-3 py-1 bg-primary-600 text-white rounded-full text-xs font-medium shadow-sm"
                >
                  {level}
                </span>
              ))}
            </div>

            {/* Subject pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {subjects.map((subject) => (
                <span
                  key={subject}
                  className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 border border-gray-200 shadow-sm"
                >
                  {subject}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Button size="xl" asChild className="animate-pulse-glow">
                <Link href="/auth/register">
                  Commencer gratuitement
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link href="/chat">
                  <MessageCircle className="w-5 h-5" />
                  Essayer le chat IA
                </Link>
              </Button>
            </div>

            {/* Trust badge */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CheckCircle2 className="w-4 h-4 text-secondary-500" />
              <span>Gratuit · 5 questions/jour · Sans carte bancaire</span>
            </div>
          </div>

          {/* Right: Chat Demo */}
          <div className="relative lg:flex justify-center hidden">
            <div className="w-full max-w-md">
              {/* Floating stats */}
              <div className="absolute -top-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 z-10">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {["A", "B", "C"].map((l) => (
                      <div
                        key={l}
                        className="w-7 h-7 rounded-full bg-primary-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                      >
                        {l}
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">+5 000</p>
                    <p className="text-xs text-gray-500">étudiants</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 z-10">
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">4.9/5</p>
                    <p className="text-xs text-gray-500">satisfaction</p>
                  </div>
                </div>
              </div>

              {/* Chat window */}
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                {/* Chat header */}
                <div className="bg-primary-600 p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Modarisi AI</p>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <p className="text-primary-100 text-xs">En ligne</p>
                    </div>
                  </div>
                </div>

                {/* Chat messages */}
                <div className="p-4 space-y-4 min-h-[280px] bg-gray-50/50">
                  {/* Student message */}
                  <div className="flex justify-end">
                    <div className="bg-primary-600 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[80%] text-sm shadow-sm">
                      <p>C'est quoi la 2ème loi de Newton ?</p>
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="flex gap-2">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4 text-primary-600" />
                    </div>
                    <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%] text-sm shadow-sm border border-gray-100">
                      <p className="text-gray-800 mb-2">
                        La deuxième loi de Newton :
                      </p>
                      <div className="bg-primary-50 rounded-lg p-2 text-center font-mono font-bold text-primary-700 text-base">
                        F = m × a
                      </div>
                      <p className="text-gray-600 text-xs mt-2">
                        F = force (N), m = masse (kg), a = accélération (m/s²)
                      </p>
                    </div>
                  </div>

                  {/* Student follow-up */}
                  <div className="flex justify-end">
                    <div className="bg-primary-600 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[80%] text-sm shadow-sm">
                      <p>Donne-moi un exemple concret</p>
                    </div>
                  </div>

                  {/* Typing indicator */}
                  <div className="flex gap-2 items-center">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4 text-primary-600" />
                    </div>
                    <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100">
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            className="w-2 h-2 bg-primary-400 rounded-full typing-dot"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Input */}
                <div className="p-4 bg-white border-t border-gray-100">
                  <div className="flex gap-2 bg-gray-50 rounded-xl p-2">
                    <input
                      readOnly
                      value="Posez votre question..."
                      className="flex-1 bg-transparent text-sm text-gray-400 outline-none px-2"
                    />
                    <button className="bg-primary-600 text-white rounded-lg px-3 py-1.5 text-xs font-medium">
                      Envoyer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto lg:mx-0">
          {stats.map((stat) => (
            <div key={stat.value} className="text-center lg:text-left">
              <p className="text-3xl font-bold text-primary-600">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
