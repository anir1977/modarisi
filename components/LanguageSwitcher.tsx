"use client";

import React, { useTransition } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: string) {
    if (next === locale) return;
    // Set cookie then soft-refresh server components
    document.cookie = `locale=${next};path=/;max-age=31536000;SameSite=Lax`;
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <div className="flex items-center bg-white/6 border border-white/12 rounded-xl p-0.5 gap-0.5">
      <button
        onClick={() => switchTo("fr")}
        disabled={isPending}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-[9px] text-xs font-semibold transition-all ${
          locale === "fr"
            ? "bg-white/15 text-white shadow-sm"
            : "text-gray-500 hover:text-gray-300"
        }`}
        aria-label="Français"
      >
        🇫🇷 <span className="hidden sm:inline">FR</span>
      </button>
      <button
        onClick={() => switchTo("ar")}
        disabled={isPending}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-[9px] text-xs font-semibold transition-all ${
          locale === "ar"
            ? "bg-white/15 text-white shadow-sm"
            : "text-gray-500 hover:text-gray-300"
        }`}
        aria-label="العربية"
      >
        🇲🇦 <span className="hidden sm:inline">AR</span>
      </button>
    </div>
  );
}
