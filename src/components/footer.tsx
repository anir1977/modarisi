import Link from "next/link";
import { ZelligeMark } from "@/components/zellige-star";

const COLS = [
  {
    title: "الدروس",
    links: [
      { label: "الفلسفة", href: "/dourous/falsafa" },
      { label: "التاريخ", href: "/dourous/tarikh-jughrafiya" },
      { label: "كل المواد", href: "/dourous" },
    ],
  },
  {
    title: "الامتحانات",
    links: [
      { label: "الامتحانات المصححة", href: "/examens" },
      { label: "محاكي الامتحان", href: "/simulateur" },
      { label: "معاملات الباكالوريا", href: "/coefficients" },
    ],
  },
  {
    title: "الأدوات",
    links: [
      { label: "حساب معدل الباك", href: "/calculateur" },
      { label: "حاسبة الآداب والعلوم الإنسانية", href: "/calculateur/lettres-sciences-humaines" },
      { label: "حاسبة الباك الحر", href: "/calculateur/bac-libre" },
      { label: "الأستاذ الافتراضي", href: "/tuteur" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--line)] bg-[var(--deep)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="space-y-3">
          <Link href="/" className="flex items-center gap-2.5 text-[var(--mint)]">
            <ZelligeMark size={28} />
            <span className="font-display text-xl font-black text-[var(--chalk)]">مدرسي</span>
          </Link>
          <p className="text-sm leading-relaxed text-[var(--mute)]">
            موقع مغربي مستقل ومجاني للتحضير للباكالوريا. غير تابع لوزارة التربية الوطنية.
          </p>
        </div>
        {COLS.map((col) => (
          <div key={col.title}>
            <h2 className="mb-3 font-display text-base font-black text-[var(--chalk)]">{col.title}</h2>
            <ul className="space-y-2 text-sm">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[var(--chalk-2)] hover:text-[var(--mint-text)]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-[var(--line)]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 text-sm text-[var(--mute)] sm:flex-row sm:px-6">
          <span>© {new Date().getFullYear()} modarisi.ma</span>
          <nav aria-label="روابط قانونية" className="flex flex-wrap gap-4">
            <Link href="/about" className="hover:text-[var(--chalk)]">من نحن</Link>
            <Link href="/contact" className="hover:text-[var(--chalk)]">اتصل بنا</Link>
            <Link href="/privacy" className="hover:text-[var(--chalk)]">سياسة الخصوصية</Link>
            <Link href="/terms" className="hover:text-[var(--chalk)]">شروط الاستخدام</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
