"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";

type Item = { label: string; href: string; children?: { label: string; href: string; desc?: string }[] };

const NAV: Item[] = [
  {
    label: "الدروس",
    href: "/dourous",
    children: [
      { label: "دروس الرياضيات", href: "/dourous/riyadiyat", desc: "علوم تجريبية: من النهايات حتى الاحتمالات" },
      { label: "دروس الفلسفة", href: "/dourous/falsafa", desc: "12 مفهوماً بالمحاور ومواقف الفلاسفة" },
      { label: "دروس التاريخ والجغرافيا", href: "/dourous/tarikh-jughrafiya", desc: "28 درساً في التاريخ والجغرافيا" },
      { label: "كل المواد", href: "/dourous" },
    ],
  },
  {
    label: "الامتحانات",
    href: "/examens",
    children: [
      { label: "امتحانات وطنية مصححة", href: "/examens", desc: "مواضيع حقيقية مع تصحيح منهجي" },
      { label: "محاكي الامتحان", href: "/simulateur", desc: "تمارين مع عداد زمني" },
      { label: "دليل المراجع", href: "/maraji3" },
    ],
  },
  {
    label: "حساب المعدل",
    href: "/calculateur",
    children: [
      { label: "الشعب العلمية والاقتصادية", href: "/calculateur" },
      { label: "الآداب والعلوم الإنسانية", href: "/calculateur/lettres-sciences-humaines" },
      { label: "الباك الحر (الأحرار)", href: "/calculateur/bac-libre" },
      { label: "معاملات كل الشعب", href: "/coefficients" },
    ],
  },
  { label: "الشعب", href: "/filieres" },
];

export function StarMark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <g fill="#f2b233">
        <rect x="22" y="22" width="56" height="56" />
        <rect x="22" y="22" width="56" height="56" transform="rotate(45 50 50)" />
      </g>
    </svg>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState<string | null>(null);

  useEffect(() => {
    setOpen(false);
    setDrop(null);
  }, [pathname]);

  const active = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));

  return (
    <header className="mj-nav sticky top-0 z-50 bg-[#2b2fb3] text-white">
      <div className="max-w-[1240px] mx-auto px-5 h-[68px] flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="مدرسي - الصفحة الرئيسية">
          <StarMark />
          <span className="font-display text-[32px] leading-none">مدرسي</span>
        </Link>

        <nav aria-label="القائمة الرئيسية" className="hidden lg:flex items-center gap-1">
          {NAV.map((item) => (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() => item.children && setDrop(item.href)}
              onMouseLeave={() => setDrop(null)}
            >
              <Link
                href={item.href}
                className={`flex items-center gap-1 px-3.5 py-2 rounded-full font-medium transition-colors ${
                  active(item.href) ? "bg-white/15" : "hover:bg-white/10"
                }`}
              >
                {item.label}
                {item.children && <ChevronDown size={15} className="opacity-70" />}
              </Link>
              {item.children && drop === item.href && (
                <div className="absolute right-0 top-full pt-2">
                  <div className="w-72 bg-white text-[#121322] rounded-2xl shadow-2xl p-2 border-2 border-[#121322]">
                    {item.children.map((c) => (
                      <Link key={c.href + c.label} href={c.href} className="block px-4 py-2.5 rounded-xl hover:bg-[#f2b233]/25">
                        <span className="font-bold block">{c.label}</span>
                        {c.desc && <span className="text-sm text-[#4a4c63]">{c.desc}</span>}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/tuteur"
            className="hidden sm:inline-flex items-center px-5 py-2.5 rounded-full bg-[#f2b233] text-[#121322] font-bold hover:-translate-y-0.5 transition-transform"
          >
            اسأل الأستاذ
          </Link>
          <button
            type="button"
            className="lg:hidden p-2 rounded-full hover:bg-white/10"
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="القائمة" className="lg:hidden border-t border-white/15 bg-[#2b2fb3] max-h-[calc(100vh-68px)] overflow-y-auto">
          <div className="max-w-[1240px] mx-auto px-5 py-4 space-y-4">
            {NAV.map((item) => (
              <div key={item.href}>
                <Link href={item.href} className="font-display text-2xl block">{item.label}</Link>
                {item.children && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {item.children.map((c) => (
                      <Link key={c.href + c.label} href={c.href} className="px-3.5 py-1.5 rounded-full bg-white/12 text-sm font-medium" style={{ background: "rgba(255,255,255,0.12)" }}>
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link href="/tuteur" className="inline-flex px-5 py-3 rounded-full bg-[#f2b233] text-[#121322] font-bold">
              اسأل الأستاذ الافتراضي
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
