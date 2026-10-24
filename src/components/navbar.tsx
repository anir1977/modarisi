"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { ZelligeMark } from "@/components/zellige-star";

type NavItem = { label: string; href: string; children?: { title: string; href: string; desc: string }[] };

const NAV: NavItem[] = [
  {
    label: "الدروس",
    href: "/dourous",
    children: [
      { title: "الفلسفة", href: "/dourous/falsafa", desc: "12 مفهوماً بالمحاور ومواقف الفلاسفة" },
      { title: "التاريخ", href: "/dourous/tarikh-jughrafiya", desc: "15 درساً مع التواريخ والمفاهيم" },
      { title: "كل المواد", href: "/dourous", desc: "المواد المتوفرة والقادمة" },
    ],
  },
  {
    label: "الامتحانات",
    href: "/examens",
    children: [
      { title: "الامتحانات الوطنية المصححة", href: "/examens", desc: "مواضيع حقيقية بتصحيح مفصل" },
      { title: "محاكي الامتحان", href: "/simulateur", desc: "تدرّب بعداد زمني" },
      { title: "معاملات الباكالوريا", href: "/coefficients", desc: "الجهوي والوطني لكل شعبة" },
    ],
  },
  {
    label: "حساب المعدل",
    href: "/calculateur",
    children: [
      { title: "الشعب العلمية والاقتصادية", href: "/calculateur", desc: "مع نقطة الانتقاء" },
      { title: "الآداب والعلوم الإنسانية", href: "/calculateur/lettres-sciences-humaines", desc: "المسلكان معاً" },
      { title: "الباك الحر", href: "/calculateur/bac-libre", desc: "بدون مراقبة مستمرة" },
    ],
  },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[rgba(11,16,32,0.78)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 text-[var(--mint)]" aria-label="مدرسي، الصفحة الرئيسية">
          <ZelligeMark size={30} />
          <span className="font-display text-2xl font-black text-[var(--chalk)]">مدرسي</span>
        </Link>

        <nav aria-label="القائمة الرئيسية" className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <div key={item.href} className="group relative">
              <Link
                href={item.href}
                className={`flex items-center gap-1 rounded-lg px-3 py-2 font-display text-[15px] font-bold transition-colors ${
                  isActive(item.href) ? "text-[var(--mint-text)]" : "text-[var(--chalk-2)] hover:text-[var(--chalk)]"
                }`}
              >
                {item.label}
                {item.children && <ChevronDown size={14} className="opacity-60" />}
              </Link>
              {item.children && (
                <div className="invisible absolute right-0 top-full w-72 pt-2 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <ul className="rounded-2xl border border-[var(--line)] bg-[var(--board)] p-2 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)]">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link href={c.href} className="block rounded-xl px-3 py-2.5 hover:bg-[var(--board-2)]">
                          <span className="block font-bold text-[var(--chalk)]">{c.title}</span>
                          <span className="block text-sm text-[var(--mute)]">{c.desc}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/tuteur"
            className="hidden rounded-xl bg-[var(--mint)] px-4 py-2 font-display text-sm font-black text-[var(--ink)] hover:bg-[var(--mint-text)] sm:inline-block"
          >
            اسأل الأستاذ
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            className="rounded-lg p-2 text-[var(--chalk)] md:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="القائمة" className="border-t border-[var(--line)] bg-[var(--board)] px-4 pb-6 pt-2 md:hidden">
          {NAV.map((item) => (
            <div key={item.href} className="border-b border-[var(--line)] py-3">
              <Link href={item.href} className="font-display text-lg font-black text-[var(--chalk)]">
                {item.label}
              </Link>
              <ul className="mt-2 space-y-1">
                {item.children?.map((c) => (
                  <li key={c.href}>
                    <Link href={c.href} className="block py-1.5 text-[var(--chalk-2)]">
                      {c.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <Link href="/tuteur" className="mt-4 block rounded-xl bg-[var(--mint)] py-3 text-center font-display font-black text-[var(--ink)]">
            اسأل الأستاذ الافتراضي
          </Link>
        </nav>
      )}
    </header>
  );
}
