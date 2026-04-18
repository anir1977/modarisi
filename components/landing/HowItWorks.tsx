import React from "react";
import Link from "next/link";
import { UserPlus, BookOpen, Upload, Star, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

const stepMeta = [
  { key: "signup",   icon: UserPlus, gradient: "from-blue-500 to-cyan-500",    glow: "shadow-blue-500/25" },
  { key: "choose",   icon: BookOpen, gradient: "from-violet-500 to-purple-500", glow: "shadow-violet-500/25" },
  { key: "ask",      icon: Upload,   gradient: "from-emerald-500 to-teal-500",  glow: "shadow-emerald-500/25" },
  { key: "progress", icon: Star,     gradient: "from-amber-500 to-orange-500",  glow: "shadow-amber-500/25" },
] as const;

export default function HowItWorks() {
  const t = useTranslations("howItWorks");

  return (
    <section className="py-24 bg-gray-950 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-blue-400 font-semibold text-xs uppercase tracking-[0.2em] mb-3">
            {t("badge")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-8 sm:left-10 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/40 via-emerald-500/20 to-transparent" />

          <div className="space-y-8">
            {stepMeta.map((step, i) => {
              const Icon = step.icon;
              const num = String(i + 1).padStart(2, "0");
              return (
                <div
                  key={step.key}
                  className="relative flex gap-6 sm:gap-8 group"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <div className="shrink-0 flex flex-col items-center">
                    <div
                      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-xl ${step.glow} transition-transform duration-300 group-hover:scale-105 z-10`}
                    >
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                  </div>

                  <div className="flex-1 pb-8">
                    <div className="bg-white/3 border border-white/8 rounded-2xl p-6 group-hover:bg-white/5 group-hover:border-white/15 transition-all duration-300">
                      <span className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em] mb-2 block">
                        {num}
                      </span>
                      <h3 className="text-lg font-bold text-white mb-2">
                        {t(`steps.${step.key}.title`)}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {t(`steps.${step.key}.desc`)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-blue-900/30 transition-all text-base"
          >
            {t("steps.signup.title")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
