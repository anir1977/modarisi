"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Shield, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";

const TYPING_SEQUENCE = [
  { role: "user", text: "شرح ليا قانون نيوتن الثاني بالدارجة 🙏" },
  { role: "ai", text: "واه! قانون نيوتن الثاني كيقول:\n\nF = m × a\n\nالقوة = الكتلة × التسارع\n\nمثلاً: إلا دفعتي كرة فيها كتلة أكبر، خاصك تدير قوة أكبر باش تعطيها نفس التسارع 💪" },
  { role: "user", text: "3tini exercice nta7kmo fiha" },
  { role: "ai", text: "بالراحة! 🎓\n\nسيارة كتلتها 1000 kg، تسارعها 2 m/s²\nاحسب القوة المطبقة عليها:\n\nF = 1000 × 2 = 2000 N\n\nLa réponse: F = 2000 Newtons ✅" },
];

function useCountUp(target: number, duration = 1500, started: boolean = false) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
  const [count, setCount] = useState(isMobile ? target : 0);
  useEffect(() => {
    if (isMobile) { setCount(target); return; }
    if (!started) return;
    let start = 0;
    const step = target / (duration / 32);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 30);
    return () => clearInterval(timer);
  }, [target, duration, started, isMobile]);
  return count;
}

function StatItem({ value, suffix, label, started }: { value: number; suffix: string; label: string; started: boolean }) {
  const count = useCountUp(value, 1200, started);
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 tabular-nums">
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
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200/40 to-emerald-200/30 rounded-3xl blur-2xl scale-105 pointer-events-none" />
      <div className="relative bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-2xl shadow-blue-100/50">
        {/* Title bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 bg-gray-50">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
          </div>
          <div className="flex-1 flex items-center justify-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-xs">🎓</div>
            <span className="text-gray-600 text-sm font-medium">Nour · Modarisi AI</span>
            <span className="flex items-center gap-1 text-emerald-500 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
              En ligne
            </span>
          </div>
        </div>

        <div ref={containerRef} className="p-5 space-y-4 h-72 overflow-y-auto scroll-smooth bg-gray-50/50" style={{ scrollbarWidth: "none" }}>
          {displayedMessages.map((msg, i) => (
            <div key={i} className={msg.role === "user" ? "flex justify-end" : "flex gap-2.5"}>
              {msg.role === "ai" && (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center shrink-0 text-sm">🎓</div>
              )}
              <div
                className={
                  msg.role === "user"
                    ? "bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[78%] text-sm shadow-md"
                    : "bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[78%] text-sm text-gray-700 whitespace-pre-line shadow-sm"
                }
              >
                {msg.text}
              </div>
            </div>
          ))}

          {currentMsg && currentText && (
            <div className={currentMsg.role === "user" ? "flex justify-end" : "flex gap-2.5"}>
              {currentMsg.role === "ai" && (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center shrink-0 text-sm">🎓</div>
              )}
              <div
                className={
                  currentMsg.role === "user"
                    ? "bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[78%] text-sm shadow-md"
                    : "bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[78%] text-sm text-gray-700 whitespace-pre-line shadow-sm"
                }
              >
                {currentText}
                <span className="inline-block w-0.5 h-4 bg-current ml-0.5 animate-pulse align-middle" />
              </div>
            </div>
          )}

          {isTyping && !currentText && currentMsg?.role === "ai" && (
            <div className="flex gap-2.5 items-end">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center shrink-0 text-sm">🎓</div>
              <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                <div className="flex gap-1.5 items-center">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="w-2 h-2 rounded-full bg-blue-400 animate-bounce inline-block" style={{ animationDelay: `${i * 0.18}s` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="px-5 pb-5 bg-white">
          <div className="flex gap-2 bg-gray-50 border border-gray-200 rounded-xl p-2">
            <input
              readOnly
              placeholder="Pose ta question en Darija ou français…"
              className="flex-1 bg-transparent text-sm text-gray-400 outline-none px-2 placeholder:text-gray-400"
            />
            <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg px-4 py-1.5 text-xs font-semibold">
              Envoyer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const t = useTranslations("hero");
  const tCta = useTranslations("cta");
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsStarted, setStatsStarted] = useState(false);

  const STATS = [
    { value: 5000, suffix: "+", label: t("stat_students") },
    { value: 150, suffix: "K+", label: t("stat_questions") },
    { value: 7, suffix: "", label: t("stat_subjects") },
    { value: 24, suffix: "/7", label: t("stat_available") },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsStarted(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-emerald-50 min-h-screen flex flex-col">
      {/* Soft background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-200/30 rounded-full blur-[140px] hidden lg:block" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-200/25 rounded-full blur-[120px] hidden lg:block" />
      </div>

      <div className="pt-24 pb-4" />

      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <div className="inline-flex items-center gap-2 bg-white border border-blue-100 shadow-sm rounded-full px-4 py-1.5 text-gray-600 text-xs font-medium">
                  <Shield className="w-3.5 h-3.5 text-blue-500" />
                  {t("badge")}
                </div>
                <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-1.5 text-emerald-700 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  100% مجاني · 100% Gratuit 🎉
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-gray-900 leading-[1.1] mb-5 tracking-tight">
                {t("title_line1")}{" "}
                <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
                  {t("title_highlight")}
                </span>
                <br />
                <span className="text-gray-700 font-semibold text-3xl sm:text-4xl">
                  {t("title_line2")} 🇲🇦
                </span>
              </h1>

              <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-lg">
                {t("subtitle")}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {["Maths", "Physique", "SVT", "Français", "Arabe", "Histoire-Géo", "Islam"].map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50 transition-all cursor-default shadow-sm"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Link
                  href="/auth/register"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-semibold px-7 py-3.5 rounded-2xl shadow-lg shadow-blue-200/60 transition-all text-base"
                >
                  {t("cta_primary")}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/chat"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-semibold px-7 py-3.5 rounded-2xl transition-all text-base shadow-sm"
                >
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                  {t("cta_secondary")}
                </Link>
              </div>

              <div className="flex flex-wrap gap-4 text-gray-500 text-sm">
                {[tCta("guarantee_1"), tCta("guarantee_2"), tCta("guarantee_3")].map((g) => (
                  <span key={g} className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    {g}
                  </span>
                ))}
              </div>
            </div>

            <TypingDemo />
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div ref={statsRef} className="relative z-10 border-t border-gray-100 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-0 sm:divide-x sm:divide-gray-100">
            {STATS.map((stat) => (
              <StatItem key={stat.label} {...stat} started={statsStarted} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
