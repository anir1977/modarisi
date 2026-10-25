import Link from "next/link";
import { StarMark } from "./navbar";

const COLS = [
  {
    title: "الدروس",
    links: [
      { href: "/dourous/riyadiyat", label: "دروس الرياضيات" },
      { href: "/dourous/falsafa", label: "دروس الفلسفة" },
      { href: "/dourous/tarikh-jughrafiya", label: "دروس التاريخ والجغرافيا" },
      { href: "/dourous", label: "كل المواد" },
    ],
  },
  {
    title: "الامتحانات",
    links: [
      { href: "/examens", label: "امتحانات وطنية مصححة" },
      { href: "/simulateur", label: "محاكي الامتحان" },
      { href: "/maraji3", label: "دليل المراجع" },
    ],
  },
  {
    title: "الأدوات",
    links: [
      { href: "/calculateur", label: "حاسبة المعدل" },
      { href: "/calculateur/lettres-sciences-humaines", label: "حاسبة الآداب والعلوم الإنسانية" },
      { href: "/calculateur/bac-libre", label: "حاسبة الباك الحر" },
      { href: "/coefficients", label: "معاملات الباكالوريا" },
      { href: "/tuteur", label: "الأستاذ الافتراضي" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-[#2b2fb3] text-[#e3e4ff]">
      <div className="h-3 bg-[#f2b233]" />
      <div className="max-w-[1240px] mx-auto px-5 py-14 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2.5 text-white">
            <StarMark size={34} />
            <span className="font-display text-4xl leading-none">مدرسي</span>
          </Link>
          <p className="mt-4 leading-relaxed max-w-sm">
            موقع مغربي مستقل للتحضير للباكالوريا: دروس ملخصة، امتحانات وطنية مصححة، وحاسبات معدل. غير تابع لوزارة التربية الوطنية.
          </p>
        </div>
        {COLS.map((c) => (
          <div key={c.title}>
            <h2 className="font-display text-2xl text-white">{c.title}</h2>
            <ul className="mt-3 space-y-2">
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-[#f2b233] transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/15">
        <div className="max-w-[1240px] mx-auto px-5 py-5 flex flex-wrap justify-between gap-4 text-sm">
          <span>© {new Date().getFullYear()} modarisi.ma</span>
          <nav className="flex flex-wrap gap-5" aria-label="روابط قانونية">
            <Link href="/about" className="hover:text-[#f2b233]">من نحن</Link>
            <Link href="/contact" className="hover:text-[#f2b233]">اتصل بنا</Link>
            <Link href="/privacy" className="hover:text-[#f2b233]">سياسة الخصوصية</Link>
            <Link href="/terms" className="hover:text-[#f2b233]">شروط الاستخدام</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
