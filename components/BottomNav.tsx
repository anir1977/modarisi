"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/dashboard", icon: "🏠", label: "الرئيسية" },
  { href: "/lessons", icon: "📚", label: "الدروس" },
  { href: "/exercises", icon: "✏️", label: "التمارين" },
  { href: "/chat", icon: "🤖", label: "المساعد" },
  { href: "/dashboard/profile", icon: "👤", label: "حسابي" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-white border-t border-slate-200 md:hidden safe-bottom">
      <div className="grid grid-cols-5 h-16">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 transition-colors ${
                active ? "text-blue-600" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <span className="text-xl leading-none">{item.icon}</span>
              <span className={`text-[10px] font-semibold ${active ? "text-blue-600" : ""}`}>
                {item.label}
              </span>
              {active && (
                <span className="absolute bottom-0 w-8 h-0.5 bg-blue-600 rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
