"use client";

import { useState, useEffect } from "react";
import { GraduationCap, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import PricingSection from "@/components/landing/PricingSection";
import Testimonials from "@/components/landing/Testimonials";
import CTA from "@/components/landing/CTA";

const PASSWORD = "modarisi2025";
const SESSION_KEY = "mdrs_admin_preview";

export default function AdminPreviewPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);

  // Persist unlock state in sessionStorage so refresh doesn't log out
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "1") setUnlocked(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      setInput("");
    }
  };

  if (unlocked) {
    return (
      <>
        {/* Admin banner */}
        <div className="fixed top-0 left-0 right-0 z-[999] bg-amber-400 text-amber-900 text-xs font-bold text-center py-1.5 flex items-center justify-center gap-2 shadow-md">
          <ShieldCheck className="w-3.5 h-3.5" />
          MODE APERÇU ADMIN — Non visible par les visiteurs
          <button
            onClick={() => {
              sessionStorage.removeItem(SESSION_KEY);
              setUnlocked(false);
            }}
            className="ml-4 underline hover:no-underline"
          >
            Verrouiller
          </button>
        </div>
        <div className="pt-6">
          <Navbar />
          <Hero />
          <Features />
          <Testimonials />
          <PricingSection />
          <CTA />
          <Footer />
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div
        className={`relative z-10 w-full max-w-sm transition-transform ${
          shaking ? "animate-[shake_0.4s_ease]" : ""
        }`}
      >
        {/* Lock card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/50 mb-3">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <p className="text-white font-bold text-xl tracking-tight">
              Modarisi<span className="text-blue-400">.</span>
            </p>
            <p className="text-slate-400 text-xs mt-1 tracking-widest uppercase">
              Admin Preview
            </p>
          </div>

          {/* Lock icon */}
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-slate-700/60 rounded-full flex items-center justify-center border border-slate-600">
              <Lock className="w-5 h-5 text-slate-300" />
            </div>
          </div>

          <p className="text-center text-slate-300 text-sm mb-6">
            Entrez le mot de passe pour accéder à l'aperçu de la landing page.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                autoFocus
                type={showPassword ? "text" : "password"}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setError(false);
                }}
                placeholder="Mot de passe"
                className={`w-full h-12 bg-slate-800 border rounded-xl px-4 pr-11 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 transition-all ${
                  error
                    ? "border-red-500 focus:ring-red-500/30"
                    : "border-slate-600 focus:ring-blue-500/30 focus:border-blue-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            {error && (
              <p className="text-red-400 text-xs text-center flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" />
                Mot de passe incorrect. Réessayez.
              </p>
            )}

            <button
              type="submit"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-900/40 transition-all"
            >
              Accéder à l'aperçu
            </button>
          </form>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          Accès réservé à l'équipe Modarisi
        </p>
      </div>

      {/* Shake keyframe */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-8px); }
          40%       { transform: translateX(8px); }
          60%       { transform: translateX(-6px); }
          80%       { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}
