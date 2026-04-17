"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Shield, CheckCircle } from "lucide-react";

const TYPING_SEQUENCE = [
  { role: "user", text: "شرح ليا قانون نيوتن الثاني بالدارجة 🙏" },
  { role: "ai", text: "واه! قانون نيوتن الثاني كيقول:\n\nF = m × a\n\nالقوة = الكتلة × التسارع\n\nمثلاً: إلا دفعتي كرة فيها كتلة أكبر، خاصك تدير قوة أكبر باش تعطيها نفس التسارع 💪" },
  { role: "user", text: "3tini exercice nta7kmo fiha" },
  { role: "ai", text: "بالراحة! 🎓\n\nسيارة كتلتها 1000 kg، تسارعها 2 m/s²\nاحسب القوة المطبقة عليها:\n\nF = 1000 × 2 = 2000 N\n\nLa réponse: F = 2000 Newtons ✅" },
];

const STATS = [
  { value: 5000, suffix: "+", label: "élèves actifs" },
  { value: 150, suffix: "K+", label: "questions répondues" },
  { value: 7, suffix: "", label: "matières couvertes" },
  { value: 24, suffix: "/7", label: "disponible" },
];

function useCountUp(target: number, duration = 1500, started: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started]);
  return count;
}

function StatItem({ value, suffix, label, started }: { value: number; suffix: string; label: string; started: boolean }) {
  const count = useCountUp(value, 1200, started);
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums">
        {count.toLocaleString()}{suffix}
      </span>
      <span className="text-gray-500 text-xs font-medium">{label}</span>
    </div>
  );
}

function TypingDemo() {
  const [displayedMessages, setDisplayedMessages] = useState<{ role: string; text: string }[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (msgIndex >= TYPING_SEQUENCE.length) {
      // restart after pause
      const t = setTimeout(() => {
        setDisplayedMessages([]);
        setCurrentText("");
        setMsgIndex(0);
        setCharIndex(0);
      }, 3000);
      return () => clearTimeout(t);
    }

    const msg = TYPING_SEQUENCE[msgIndex];
    setIsTyping(true);

    if (charIndex < msg.text.length) {
      const speed = msg.role === "user" ? 40 : 25;
      const t = setTimeout(() => {
        setCurrentText((prev) => prev + msg.text[charIndex]);
        setCharIndex((c) => c + 1);
      }, speed);
      return () => clearTimeout(t);
    } else {
      // message complete
      const t = setTimeout(() => {
        setDisplayedMessages((prev) => [...prev, { role: msg.role, text: msg.text }]);
        setCurrentText("");
        setCharIndex(0);
        setMsgIndex((i) => i + 1);
        setIsTyping(false);
      }, 600);
      return () => clearTimeout(t);
    }
  }, [msgIndex, charIndex]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedMessages, currentText]);

  const currentMsg = msgIndex < TYPING_SEQUENCE.length ? TYPING_SEQUENCE[msgIndex] : null;

  return (
    <div className="relative hidden lg:block">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-emerald-600/10 rounded-3xl blur-2xl scale-105 pointer-events-none" />
      <div className="relative bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5 bg-white/3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
          </div>
          <div className="flex-1 flex items-center justify-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-xs">🎓</div>
            <span className="text-white/70 text-sm font-medium">Nour · Modarisi AI</span>
            <span className="flex items-center gap-1 text-emerald-400 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
              En ligne
            </span>
          </div>
        </div>

        {/* Messages */}
        <div ref={containerRef} className="p-5 space-y-4 h-72 overflow-y-auto scroll-smooth" style={{ scrollbarWidth: "none" }}>
          {displayedMessages.map((msg, i) => (
            <div key={i} className={msg.role === "user" ? "flex justify-end" : "flex gap-2.5"}>
              {msg.role === "ai" && (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center shrink-0 text-sm">🎓</div>
              )}
              <div
                className={
                  msg.role === "user"
                    ? "bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[78%] text-sm shadow-lg"
                    : "bg-white/5 border border-white/8 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[78%] text-sm text-gray-200 whitespace-pre-line"
                }
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Currently typing */}
          {currentMsg && currentText && (
            <div className={currentMsg.role === "user" ? "flex justify-end" : "flex gap-2.5"}>
              {currentMsg.role === "ai" && (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center shrink-0 text-sm">🎓</div>
              )}
              <div
                className={
                  currentMsg.role === "user"
                    ? "bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[78%] text-sm shadow-lg"
                    : "bg-white/5 border border-white/8 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[78%] text-sm text-gray-200 whitespace-pre-line"
                }
              >
                {currentText}
                <span className="inline-block w-0.5 h-4 bg-current ml-0.5 animate-pulse align-middle" />
              </div>
            </div>
          )}

          {/* Thinking dots */}
          {isTyping && !currentText && currentMsg?.role === "ai" && (
            <div className="flex gap-2.5 items-end">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center shrink-0 text-sm">🎓</div>
              <div className="bg-white/5 border border-white/8 rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1.5 items-center">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="w-2 h-2 rounded-full bg-blue-400 animate-bounce inline-block" style={{ animationDelay: `${i * 0.18}s` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="px-5 pb-5">
          <div className="flex gap-2 bg-white/5 border border-white/10 rounded-xl p-2 backdrop-blur-sm">
            <input
              readOnly
              placeholder="Pose ta question en Darija ou français…"
              className="flex-1 bg-transparent text-sm text-gray-500 outline-none px-2 placeholder:text-gray-600"
            />
            <button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-lg px-4 py-1.5 text-xs font-semibold transition-colors">
              Envoyer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsStarted, setStatsStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsStarted(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#0a0f1e] min-h-screen flex flex-col">
      {/* Animated mesh gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px] animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] animate-[pulse_10s_ease-in-out_infinite_2s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-blue-900/8 rounded-full blur-[200px]" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="pt-24 pb-4" />

      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Left */}
            <div>
              {/* Trust badge MEN */}
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-gray-300 text-xs font-medium mb-4 backdrop-blur-sm">
                <Shield className="w-3.5 h-3.5 text-blue-400" />
                Aligné sur le programme officiel MEN Maroc 🇲🇦
              </div>

              {/* Price hook */}
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-emerald-400 text-xs font-semibold mb-6 ml-2">
                <Sparkles className="w-3.5 h-3.5" />
                Dès 3.30 DH/jour seulement
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-white leading-[1.1] mb-5 tracking-tight">
                Le tuteur IA{" "}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
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
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 hover:bg-white/10 hover:border-white/20 transition-all cursor-default"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Link
                  href="/auth/register"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-semibold px-7 py-3.5 rounded-2xl shadow-lg shadow-blue-900/40 transition-all text-base"
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

              {/* Guarantees */}
              <div className="flex flex-wrap gap-4 text-gray-500 text-sm">
                {["Sans carte bancaire", "5 questions gratuites", "Annuler à tout moment"].map((g) => (
                  <span key={g} className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    {g}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Typing Demo */}
            <TypingDemo />
          </div>
        </div>
      </div>

      {/* Animated Stats Bar */}
      <div ref={statsRef} className="relative z-10 border-t border-white/5 bg-white/2 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-0 sm:divide-x sm:divide-white/5">
            {STATS.map((stat) => (
              <StatItem key={stat.label} {...stat} started={statsStarted} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
