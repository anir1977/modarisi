import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function CTA() {
  const t = useTranslations("cta");

  const guarantees = [
    t("guarantee_1"),
    t("guarantee_2"),
    t("guarantee_3"),
    t("guarantee_4"),
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-emerald-600">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-300/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-1.5 text-white text-xs font-semibold mb-6">
          {t("badge")}
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-3 tracking-tight leading-tight">
          {t("title")}{" "}
          <span className="text-emerald-200">
            {t("title_highlight")}
          </span>{" "}
          🎓
        </h2>

        <p className="text-blue-100 text-xl mb-2 font-medium">{t("subtitle")}</p>
        <p className="text-blue-200/80 text-sm mb-10">
          🎉 الموقع مجاني بالكامل · Site 100% gratuit
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <Link
            href="/auth/register"
            className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 hover:bg-blue-50 font-bold px-8 py-4 rounded-2xl shadow-2xl transition-all text-base hover:scale-[1.02] active:scale-[0.98]"
          >
            {t("button")}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/cours"
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold px-8 py-4 rounded-2xl transition-all text-base"
          >
            <BookOpen className="w-4 h-4" />
            Voir les cours
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {guarantees.map((g) => (
            <span key={g} className="flex items-center gap-1.5 text-blue-100 text-sm">
              <CheckCircle className="w-4 h-4 text-emerald-300 shrink-0" />
              {g}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
