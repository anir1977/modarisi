"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, X, LayoutDashboard, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const navLinks = [
  { href: "/", label: "Accueil", badge: null },
  { href: "/programme", label: "Cours", badge: "Nouveau" },
  { href: "/tashih", label: "Tashih", badge: null },
  { href: "/pricing", label: "Tarifs", badge: null },
  { href: "/contact", label: "Contact", badge: null },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

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
          ? "bg-gray-950/80 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-white/8 py-0"
          : "bg-transparent py-2"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn("flex items-center justify-between transition-all duration-300", isScrolled ? "h-14" : "h-16")}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-blue-500/30 group-hover:scale-105 transition-all duration-200">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Modarisi<span className="text-blue-400">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                {link.label}
                {link.badge && (
                  <span className="inline-flex items-center bg-gradient-to-r from-blue-500 to-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2">
            {loggedIn ? (
              <Button size="sm" asChild className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white border-0">
                <Link href="/dashboard" className="gap-2 flex items-center">
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="text-gray-300 hover:text-white hover:bg-white/8 border border-white/10"
                >
                  <Link href="/auth/login">Se connecter</Link>
                </Button>
                <Button
                  size="sm"
                  asChild
                  className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white border-0 shadow-lg shadow-blue-900/30"
                >
                  <Link href="/auth/register" className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Commencer
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Menu"
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isMobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="bg-gray-950/95 backdrop-blur-xl border-t border-white/8 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center justify-between py-2.5 px-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
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
          <div className="pt-3 flex flex-col gap-2 border-t border-white/8">
            {loggedIn ? (
              <Button asChild className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white border-0">
                <Link href="/dashboard" className="gap-2 flex items-center justify-center">
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
              </Button>
            ) : (
              <>
                <Button variant="outline" asChild className="border-white/15 text-gray-300">
                  <Link href="/auth/login">Se connecter</Link>
                </Button>
                <Button asChild className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white border-0">
                  <Link href="/auth/register">Commencer gratuitement</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
