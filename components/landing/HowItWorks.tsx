import React from "react";
import Link from "next/link";
import { UserPlus, BookOpen, MessageCircle, TrendingUp, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

const stepMeta = [
  { key: "signup",   icon: UserPlus,       gradient: "from-blue-500 to-cyan-500",    glow: "shadow-blue-200",    num: "01" },
  { key: "choose",   icon: BookOpen,       gradient: "from-violet-500 to-purple-500", glow: "shadow-violet-200",  num: "02" },
  { key: "ask",      icon: MessageCircle,  gradient: "from-emerald-500 to-teal-500",  glow: "shadow-emerald-200", num: "03" },
  { key: "progress", icon: TrendingUp,     gradient: "from-amber-500 to-orange-500",  glow: "shadow-amber-200",   num: "04" },
] as const;

export default function HowItWorks() {
  const t = useTranslations("howItWorks");

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-[0.2em] mb-3">
            {t("badge")}
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-5">
            {t("title")}
          </h2>
          <p className="text-gray-500 text-xl max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* 2-column layout: steps + photo */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Steps */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-200 via-emerald-200 to-amber-100" />

            <div className="space-y-6">
              {stepMeta.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.key} className="relative flex gap-6 group">
                    <div className="shrink-0">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-xl ${step.glow} transition-transform duration-300 group-hover:scale-105 z-10 relative`}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                    </div>

                    <div className="flex-1 pb-4">
                      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm group-hover:shadow-md group-hover:border-gray-200 transition-all duration-300">
                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] mb-1.5 block">
                          {step.num}
                        </span>
                        <h3 className="text-xl font-bold text-gray-900 mb-1.5">
                          {t(`steps.${step.key}.title`)}
                        </h3>
                        <p className="text-gray-500 text-base leading-relaxed">
                          {t(`steps.${step.key}.desc`)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 ml-22 pl-6">
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-blue-200/60 transition-all text-lg"
              >
                ابدأ مجاناً الآن
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Photo */}
          <div className="relative hidden lg:block">
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-emerald-100/40 rounded-3xl blur-3xl scale-95" />

            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-100/60">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&h=700&fit=crop&crop=center&q=85"
                alt="Étudiant marocain utilisant Modarisi"
                className="w-full object-cover"
                style={{ maxHeight: "560px" }}
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-transparent" />
            </div>

            {/* Floating progress card */}
            <div
              className="absolute -right-8 top-1/3 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-10"
              style={{ animation: "float2 5s ease-in-out infinite" }}
            >
              <p className="text-xs text-gray-500 mb-2 font-medium">📊 Progression</p>
              <div className="space-y-2 w-40">
                {[
                  { label: "Maths", pct: 85, color: "bg-blue-500" },
                  { label: "SVT",   pct: 70, color: "bg-emerald-500" },
                  { label: "Physique", pct: 60, color: "bg-violet-500" },
                ].map(b => (
                  <div key={b.label}>
                    <div className="flex justify-between text-[10px] text-gray-500 mb-0.5">
                      <span>{b.label}</span>
                      <span className="font-bold">{b.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${b.color} rounded-full`} style={{ width: `${b.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating success badge */}
            <div
              className="absolute -left-6 bottom-1/4 bg-emerald-500 text-white rounded-2xl shadow-xl p-3 z-10"
              style={{ animation: "float2 6s ease-in-out infinite 1.5s" }}
            >
              <p className="text-sm font-black">+12 points ⭐</p>
              <p className="text-xs text-emerald-100">ce mois-ci</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float2 {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  );
}
