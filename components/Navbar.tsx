"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpenText, Menu, Sparkles, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "الرئيسية" },
  { href: "/lessons", label: "الدروس" },
  { href: "/exercises", label: "التمارين" },
  { href: "/exam-simulator", label: "الامتحانات" },
  { href: "/leaderboard", label: "المتصدرون" },
  { href: "/pricing", label: "الاشتراك" },
  { href: "/about", label: "من نحن" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100" : "bg-white/90 backdrop-blur-md border-b border-slate-100/80"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 font-black text-xl text-slate-900">
          <span className="relative w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm bg-gradient-to-br from-blue-600 to-emerald-500 text-white">
            <BookOpenText size={21} strokeWidth={2.5} />
            <span className="absolute -top-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-amber-400 text-blue-950">
              <Sparkles size={11} strokeWidth={3} />
            </span>
          </span>
          <span className="leading-none">
            موديريسي
            <span className="block text-[10px] font-black tracking-normal text-blue-600">AI Study</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/auth/login"
            className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
          >
            تسجيل الدخول
          </Link>
          <Link
            href="/auth/register"
            className="px-4 py-2 rounded-xl text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
          >
            ابدأ مجاناً
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="القائمة"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-lg">
          <ul className="px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-4 pb-4 flex flex-col gap-2">
            <Link
              href="/auth/login"
              onClick={() => setOpen(false)}
              className="block text-center px-4 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
            >
              تسجيل الدخول
            </Link>
            <Link
              href="/auth/register"
              onClick={() => setOpen(false)}
              className="block text-center px-4 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              ابدأ مجاناً
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
