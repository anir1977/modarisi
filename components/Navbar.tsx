"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, X, LayoutDashboard, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useTranslations, useLocale } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(() => {
    if (typeof window === "undefined") return false;
    return document.cookie.includes("sb-");
  });

  const navLinks = [
    { href: "/",          label: t("home"),       badge: null },
    { href: "/cours",     label: t("courses"),    badge: t("badge_new") },
    { href: "/tashih",    label: t("correction"), badge: null },
    { href: "/pricing",   label: t("pricing"),    badge: null },
    { href: "/contact",   label: t("contact"),    badge: null },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setLoggedIn(!!user);
    });
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100 py-0"
          : "bg-white/80 backdrop-blur-sm py-2"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn("flex items-center justify-between transition-all duration-300", isScrolled ? "h-14" : "h-16")}>

          {/* Logo */}
          <Link href="/" className={cn("flex items-center gap-2 group shrink-0", isRTL && "flex-row-reverse")}>
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-blue-500/30 group-hover:scale-105 transition-all duration-200">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              Modarisi<span className="text-blue-500">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className={cn("hidden md:flex items-center gap-1", isRTL && "flex-row-reverse")}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100"
              >
                {link.label}
                {link.badge && (
                  <span className="inline-flex items-center bg-gradient-to-r from-blue-500 to-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTA + Switcher */}
          <div className={cn("hidden md:flex items-center gap-2", isRTL && "flex-row-reverse")}>
            <LanguageSwitcher />

            {loggedIn ? (
              <Button size="sm" asChild className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white border-0">
                <Link href="/dashboard" className="gap-2 flex items-center">
                  <LayoutDashboard className="w-4 h-4" />
                  {t("dashboard")}
                </Link>
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-200"
                >
                  <Link href="/auth/login">{t("signin")}</Link>
                </Button>
                <Button
                  size="sm"
                  asChild
                  className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white border-0 shadow-lg shadow-blue-200/50"
                >
                  <Link href="/auth/register" className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    {t("start")}
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile: switcher + burger */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Menu"
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isMobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className={cn("bg-white border-t border-gray-100 px-4 py-4 space-y-1 shadow-lg", isRTL && "text-right")}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center justify-between py-2.5 px-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors",
                isRTL && "flex-row-reverse"
              )}
              onClick={() => setIsMobileOpen(false)}
            >
              {link.label}
              {link.badge && (
                <span className="inline-flex items-center bg-gradient-to-r from-blue-500 to-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
          <div className="pt-3 flex flex-col gap-2 border-t border-gray-100">
            {loggedIn ? (
              <Button asChild className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white border-0">
                <Link href="/dashboard" className="gap-2 flex items-center justify-center">
                  <LayoutDashboard className="w-4 h-4" />
                  {t("dashboard")}
                </Link>
              </Button>
            ) : (
              <>
                <Button variant="outline" asChild className="border-gray-200 text-gray-700">
                  <Link href="/auth/login">{t("signin")}</Link>
                </Button>
                <Button asChild className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white border-0">
                  <Link href="/auth/register">{t("start")}</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
