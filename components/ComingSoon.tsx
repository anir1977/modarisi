"use client";

import React, { useEffect, useState } from "react";
import { GraduationCap, Mail, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

// Launch date: 30 days from now (fixed so it doesn't reset on each render)
const LAUNCH_DATE = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

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
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center border border-blue-100">
          <span className="text-3xl sm:text-4xl font-bold text-blue-600 tabular-nums">
            {String(value).padStart(2, "0")}
          </span>
        </div>
      </div>
      <span className="text-xs sm:text-sm font-medium text-slate-500 uppercase tracking-wider">
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
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 px-4 py-16">

      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-200/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating dots */}
      {[
        "top-16 left-10",
        "top-32 right-16",
        "bottom-24 left-20",
        "bottom-16 right-10",
      ].map((pos, i) => (
        <div
          key={i}
          className={`absolute ${pos} w-3 h-3 rounded-full bg-blue-300/40`}
          style={{ animation: `float ${3 + i * 0.5}s ease-in-out infinite` }}
        />
      ))}

      <div className="relative z-10 max-w-2xl w-full flex flex-col items-center text-center gap-10">

        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center shadow-xl shadow-blue-200"
            style={{ animation: "float 3s ease-in-out infinite" }}
          >
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Modarisi<span className="text-blue-600">.</span>
            </h1>
            <p className="text-slate-500 text-sm mt-1 font-medium tracking-widest uppercase">
              modarisi.ma
            </p>
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-full px-4 py-1.5 text-sm font-semibold shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          Bientôt disponible
        </div>

        {/* Main message */}
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight text-balance">
            Nous préparons quelque chose
            <span className="text-blue-600"> d'exceptionnel </span>
            pour vos enfants
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed max-w-lg mx-auto">
            La plateforme de tutorat IA pensée pour les collégiens marocains —
            1ère, 2ème et 3ème année collège. Questions en Darija ou en français,
            réponses instantanées, 24h/7j.
          </p>
        </div>

        {/* Countdown */}
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
            Lancement dans
          </p>
          <div className="flex items-start justify-center gap-4 sm:gap-6">
            <CountdownUnit value={days} label="Jours" />
            <div className="text-3xl font-bold text-slate-300 mt-6">:</div>
            <CountdownUnit value={hours} label="Heures" />
            <div className="text-3xl font-bold text-slate-300 mt-6">:</div>
            <CountdownUnit value={minutes} label="Minutes" />
            <div className="text-3xl font-bold text-slate-300 mt-6">:</div>
            <CountdownUnit value={seconds} label="Secondes" />
          </div>
        </div>

        {/* Email form */}
        <div className="w-full max-w-md">
          {submitted ? (
            <div className="flex flex-col items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              <p className="font-semibold text-emerald-800 text-lg">
                Merci, vous êtes inscrit !
              </p>
              <p className="text-emerald-600 text-sm">
                Nous vous notifierons dès le lancement de Modarisi.ma
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <p className="text-sm font-semibold text-slate-600 mb-3">
                Soyez notifié dès le lancement 👇
              </p>
              <div className="flex gap-2 flex-col sm:flex-row">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="w-full h-12 pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="h-12 px-6 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-200 transition-all flex items-center gap-2 justify-center disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
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
              <p className="text-xs text-slate-400">
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
              className="bg-white/70 backdrop-blur-sm border border-white rounded-2xl p-4 flex flex-col items-center gap-2 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="text-2xl">{f.icon}</span>
              <p className="font-semibold text-slate-800 text-sm">{f.label}</p>
              <p className="text-slate-500 text-xs">{f.sub}</p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full border-t border-slate-200/80" />

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-sm text-slate-500">
          <span>Une question ?</span>
          <a
            href="mailto:contact@modarisi.ma"
            className="inline-flex items-center gap-1.5 text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            <Mail className="w-4 h-4" />
            contact@modarisi.ma
          </a>
          <span className="hidden sm:inline text-slate-300">·</span>
          <span>🇲🇦 Casablanca, Maroc</span>
        </div>

        <p className="text-xs text-slate-400">
          © 2025 Modarisi. Tous droits réservés.
        </p>
      </div>
    </div>
  );
}
