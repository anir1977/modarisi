"use client";

import React, { useEffect, useState } from "react";
import { GraduationCap, Mail, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

// Fixed launch date — must not use Date.now() at module level to avoid SSR mismatch
const LAUNCH_DATE = new Date("2026-06-01T00:00:00Z");

function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };
  // Start with zeros to match SSR; populate on mount to avoid hydration mismatch
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    setTime(calc());
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 sm:gap-2">
      {/* Card: 64×64 on mobile → 96×96 on sm+ */}
      <div className="w-16 h-16 sm:w-24 sm:h-24 bg-white/15 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg flex items-center justify-center border border-white/20 ring-1 ring-white/5">
        <span suppressHydrationWarning className="text-2xl sm:text-4xl font-bold text-white tabular-nums drop-shadow">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      {/* Label: tighter on mobile so "SECONDES" fits under 64px */}
      <span className="text-[9px] sm:text-sm font-medium text-white/50 uppercase tracking-tight sm:tracking-wider">
        {label}
      </span>
    </div>
  );
}

export default function ComingSoon() {
  const { days, hours, minutes, seconds } = useCountdown(LAUNCH_DATE);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-16">

      {/* ── Full-screen background photo ── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920&q=80')",
        }}
      />

      {/* ── Dark overlay (opacity 0.6) ── */}
      <div className="absolute inset-0 bg-black/60" />

      {/* ── Subtle color tint on top of overlay for brand warmth ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-emerald-900/20" />

      {/* Floating dots */}
      {[
        "top-16 left-10",
        "top-32 right-16",
        "bottom-24 left-20",
        "bottom-16 right-10",
      ].map((pos, i) => (
        <div
          key={i}
          className={`absolute ${pos} w-3 h-3 rounded-full bg-white/20`}
          style={{ animation: `float ${3 + i * 0.5}s ease-in-out infinite` }}
        />
      ))}

      <div className="relative z-10 max-w-2xl w-full flex flex-col items-center text-center gap-10">

        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-20 h-20 bg-blue-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/30 ring-4 ring-white/10"
            style={{ animation: "float 3s ease-in-out infinite" }}
          >
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight drop-shadow-lg">
              Modarisi<span className="text-blue-400">.</span>
            </h1>
            <p className="text-blue-200 text-sm mt-1 font-medium tracking-widest uppercase">
              modarisi.ma
            </p>
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-blue-200 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-semibold shadow-lg">
          <Sparkles className="w-3.5 h-3.5" />
          Bientôt disponible
        </div>

        {/* Main message */}
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight text-balance drop-shadow-md">
            Nous préparons quelque chose
            <span className="text-blue-400"> d'exceptionnel </span>
            pour vos enfants
          </h2>
          <p className="text-white/75 text-lg leading-relaxed max-w-lg mx-auto">
            La plateforme de tutorat IA pensée pour les collégiens marocains —
            1ère, 2ème et 3ème année collège. Questions en Darija ou en français,
            réponses instantanées, 24h/7j.
          </p>
        </div>

        {/* Countdown */}
        <div>
          <p className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-5">
            Lancement dans
          </p>
          <div className="flex items-start justify-center gap-2 sm:gap-5">
            <CountdownUnit value={days} label="Jours" />
            <div className="text-lg sm:text-3xl font-bold text-white/30 mt-4 sm:mt-6">:</div>
            <CountdownUnit value={hours} label="Heures" />
            <div className="text-lg sm:text-3xl font-bold text-white/30 mt-4 sm:mt-6">:</div>
            <CountdownUnit value={minutes} label="Minutes" />
            <div className="text-lg sm:text-3xl font-bold text-white/30 mt-4 sm:mt-6">:</div>
            <CountdownUnit value={seconds} label="Secondes" />
          </div>
        </div>

        {/* Email form */}
        <div className="w-full max-w-md">
          {submitted ? (
            <div className="flex flex-col items-center gap-3 bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm rounded-2xl p-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              <p className="font-semibold text-white text-lg">
                Merci, vous êtes inscrit !
              </p>
              <p className="text-emerald-300 text-sm">
                Nous vous notifierons dès le lancement de Modarisi.ma
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <p className="text-sm font-semibold text-white/80 mb-3">
                Soyez notifié dès le lancement 👇
              </p>
              <div className="flex gap-2 flex-col sm:flex-row">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="w-full h-12 pl-10 pr-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="h-12 px-6 bg-blue-500 hover:bg-blue-400 active:scale-[0.98] text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2 justify-center disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {loading ? (
                    <span className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="w-1.5 h-1.5 bg-white rounded-full typing-dot"
                        />
                      ))}
                    </span>
                  ) : (
                    <>
                      Me notifier
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-white/40">
                Pas de spam. Juste un email le jour du lancement.
              </p>
            </form>
          )}
        </div>

        {/* Features preview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          {[
            { icon: "📐", label: "7 matières du collège", sub: "Maths, SVT, Physique…" },
            { icon: "🤖", label: "IA conversationnelle", sub: "Darija & Français" },
            { icon: "📊", label: "Suivi parental", sub: "Dashboard en temps réel" },
          ].map((f) => (
            <div
              key={f.label}
              className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-4 flex flex-col items-center gap-2 shadow-lg hover:bg-white/15 transition-colors"
            >
              <span className="text-2xl">{f.icon}</span>
              <p className="font-semibold text-white text-sm">{f.label}</p>
              <p className="text-white/60 text-xs">{f.sub}</p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full border-t border-white/15" />

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-sm text-white/50">
          <span>Une question ?</span>
          <a
            href="mailto:contact@modarisi.ma"
            className="inline-flex items-center gap-1.5 text-blue-300 font-medium hover:text-blue-200 transition-colors"
          >
            <Mail className="w-4 h-4" />
            contact@modarisi.ma
          </a>
          <span className="hidden sm:inline text-white/20">·</span>
          <span>🇲🇦 Casablanca, Maroc</span>
        </div>

        <p className="text-xs text-white/30">
          © 2026 Modarisi. Tous droits réservés.
        </p>
      </div>
    </div>
  );
}
