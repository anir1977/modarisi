import React from "react";
import {
  MessageCircle,
  Brain,
  BarChart3,
  Clock,
  Globe2,
  Zap,
  BookOpen,
  CheckSquare,
} from "lucide-react";
import { useTranslations } from "next-intl";

const featureKeys = [
  { key: "darija",     icon: MessageCircle, gradient: "from-blue-500 to-cyan-500",    glow: "group-hover:shadow-blue-100",    size: "large" },
  { key: "program",   icon: Globe2,        gradient: "from-violet-500 to-purple-500", glow: "group-hover:shadow-violet-100", size: "small" },
  { key: "available", icon: Clock,         gradient: "from-sky-500 to-blue-500",      glow: "group-hover:shadow-sky-100",    size: "small" },
  { key: "subjects",  icon: Brain,         gradient: "from-emerald-500 to-teal-500",  glow: "group-hover:shadow-emerald-100",size: "small" },
  { key: "steps",     icon: Zap,           gradient: "from-fuchsia-500 to-pink-500",  glow: "group-hover:shadow-fuchsia-100",size: "small" },
  { key: "affordable",icon: BarChart3,     gradient: "from-amber-500 to-orange-500",  glow: "group-hover:shadow-amber-100",  size: "small" },
  { key: "courses",   icon: BookOpen,      gradient: "from-indigo-500 to-violet-500", glow: "group-hover:shadow-indigo-100", size: "small" },
  { key: "correction",icon: CheckSquare,   gradient: "from-rose-500 to-pink-500",     glow: "group-hover:shadow-rose-100",   size: "small" },
] as const;

type FeatureDef = {
  key: string;
  icon: React.ElementType;
  gradient: string;
  glow: string;
  size: "large" | "small";
  title: string;
  desc: string;
};

function FeatureCard({ feature }: { feature: FeatureDef }) {
  const Icon = feature.icon;
  return (
    <div
      className={`group relative bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-default transition-all duration-300 hover:border-gray-200 hover:shadow-xl ${feature.glow} ${
        feature.size === "large" ? "p-8" : "p-6"
      }`}
    >
      {/* top accent line */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-md transition-transform duration-300 group-hover:scale-110`}
      >
        <Icon className="w-5 h-5 text-white" />
      </div>

      <h3 className={`font-bold text-gray-900 mb-2 ${feature.size === "large" ? "text-xl" : "text-base"}`}>
        {feature.title}
      </h3>
      <p className={`text-gray-500 leading-relaxed ${feature.size === "large" ? "text-base" : "text-sm"}`}>
        {feature.desc}
      </p>

      {feature.size === "large" && (
        <div className="mt-6 flex flex-wrap gap-2">
          {["Maths", "SVT", "Physique", "Français", "Arabe"].map((s) => (
            <span key={s} className="px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-full text-xs text-gray-500">
              {s}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Features() {
  const t = useTranslations("features");

  const features: FeatureDef[] = featureKeys.map((f) => ({
    ...f,
    title: t(`items.${f.key}.title`),
    desc: t(`items.${f.key}.desc`),
  }));

  const [large, ...small] = features;

  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-blue-600 font-semibold text-xs uppercase tracking-[0.2em] mb-3">
            {t("badge")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t("title")}
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1 lg:row-span-2">
            <FeatureCard feature={large} />
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {small.map((f) => (
              <FeatureCard key={f.key} feature={f} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
