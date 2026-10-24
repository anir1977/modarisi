"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  Camera,
  Award,
  ArrowLeft,
  FileText,
  Menu,
  X,
  ChevronDown,
  Calculator,
  Timer,
  Compass,
} from "lucide-react";
import { TRACKS } from "@/lib/curriculum";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(null);
  }, [pathname]);

  const navLinks = [
    {
      label: "الرئيسية",
      href: "/",
      isHome: true,
    },
    {
      label: "الأدوات التفاعلية",
      href: "/simulateur",
      badge: "تفاعلي ⚡",
      dropdown: [
        { title: "محاكي الامتحان الوطني الموحد", href: "/simulateur", desc: "تمارين نموذجية مع عداد زمني وتلميحات" },
        { title: "حاسبة معدل الباكالوريا (الشعب العلمية)", href: "/calculateur", desc: "25% جهوي + 25% مراقبة + 50% وطني، ونقطة الانتقاء" },
        { title: "حاسبة معدل الآداب والعلوم الإنسانية", href: "/calculateur/lettres-sciences-humaines", desc: "مسلك الآداب ومسلك العلوم الإنسانية" },
        { title: "حاسبة معدل الباك الحر (الأحرار)", href: "/calculateur/bac-libre", desc: "بدون مراقبة مستمرة: الجهوي والوطني بالمعاملات" },
        { title: "الأستاذ الافتراضي الذكي", href: "/tuteur", desc: "شرح الدروس وحل التمارين خطوة بخطوة" },
      ],
    },
    {
      label: "الدروس",
      href: "/dourous",
      dropdown: [
        { title: "دروس الفلسفة", href: "/dourous/falsafa", desc: "12 مفهوماً بالمحاور ومواقف الفلاسفة" },
        { title: "دروس التاريخ", href: "/dourous/tarikh-jughrafiya", desc: "15 درساً مع التواريخ والمفاهيم" },
        { title: "كل المواد", href: "/dourous", desc: "العربية والإنجليزية قريباً" },
      ],
    },
    {
      label: "المراجع والامتحانات",
      href: "/maraji3",
      dropdown: [
        { title: "معاملات الباكالوريا لجميع الشعب", href: "/coefficients", desc: "جداول الجهوي والوطني لكل شعبة" },
        { title: "دليل المراجع والكتب المدرسية", href: "/maraji3", desc: "المراجع الأكثر استعمالاً حسب المادة" },
        { title: "بنية الامتحانات", href: "/maraji3#cadres", desc: "توزيع تقريبي للمجالات والنقط حسب المادة" },
        { title: "نماذج الامتحانات", href: "/examens", desc: "نماذج تدريبية مع تصحيح منهجي" },
      ],
    },
    {
      label: "الشعب والمسالك",
      href: "/filieres",
      dropdown: TRACKS.map((t) => ({
        title: t.nameAr,
        href: `/filieres#${t.id}`,
        desc: t.name,
      })),
    },
    {
      label: "الأستاذ الذكي",
      href: "/tuteur",
      highlight: true,
    },
    {
      label: "بنك الامتحانات",
      href: "/examens",
    },
    {
      label: "الميثاق البيداغوجي",
      href: "/charte",
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      {/* Official Ministry Announcement Strip */}
      <div className="bg-slate-900 text-slate-300 text-[11px] sm:text-xs py-1.5 px-4 sm:px-6 lg:px-8 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="font-bold text-white">منصة مدرسي للتحضير للباكالوريا وفق المقرر الدراسي المغربي 🇲🇦</span>
        </div>
        <div className="flex items-center gap-4 font-semibold text-emerald-400 text-[11px]">
          <Link href="/simulateur" className="hover:underline flex items-center gap-1">
            <Timer size={12} />
            <span>محاكي الوطني الموحد</span>
          </Link>
          <Link href="/calculateur" className="hover:underline flex items-center gap-1 text-amber-400">
            <Calculator size={12} />
            <span>حاسبة الباك</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Title */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-800 to-teal-950 text-white flex items-center justify-center font-bold text-2xl shadow-md group-hover:scale-105 transition-transform border border-emerald-600/30">
            <GraduationCap size={28} className="text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-2xl sm:text-3xl tracking-tight text-slate-950">مدرسي</span>
              <span className="text-emerald-700 font-black text-lg sm:text-xl font-sans tracking-tight">modarisi.ma</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-900 font-extrabold border border-emerald-200">
                المغرب 🇲🇦
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-semibold mt-0.5 hidden sm:block">
              المنصة الأكاديمية المغربية للتحضير المتفوق للباكالوريا
            </p>
          </div>
        </Link>

        {/* Desktop Professional Menu Navigation */}
        <nav className="hidden xl:flex items-center gap-1 text-sm font-bold text-slate-700">
          {navLinks.map((item, idx) => {
            const isActive = pathname === item.href;

            if (item.dropdown) {
              return (
                <div
                  key={idx}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(item.label)}
                  onMouseLeave={() => setDropdownOpen(null)}
                >
                  <Link
                    href={item.href}
                    className={`px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 ${
                      isActive
                        ? "bg-emerald-50 text-emerald-900 font-black"
                        : "hover:bg-slate-100 hover:text-emerald-900"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 font-black">
                        {item.badge}
                      </span>
                    )}
                    <ChevronDown size={14} className="text-slate-400 group-hover:text-slate-600" />
                  </Link>

                  {/* Mega Dropdown */}
                  {dropdownOpen === item.label && (
                    <div className="absolute top-full right-0 w-80 pt-2 z-50">
                      <div className="p-3 bg-white rounded-2xl shadow-2xl border border-slate-200/90 space-y-1 text-right">
                        {item.dropdown.map((sub, sIdx) => (
                          <Link
                            key={sIdx}
                            href={sub.href}
                            className="block p-2.5 rounded-xl hover:bg-emerald-50/70 hover:text-emerald-950 transition-colors group"
                          >
                            <div className="font-black text-xs text-slate-900 group-hover:text-emerald-900 leading-snug">
                              {sub.title}
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5 font-normal leading-tight">
                              {sub.desc}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={idx}
                href={item.href}
                className={`px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  isActive
                    ? "bg-emerald-800 text-white font-black shadow-xs"
                    : item.highlight
                    ? "bg-emerald-50 text-emerald-900 hover:bg-emerald-100 font-extrabold"
                    : "hover:bg-slate-100 hover:text-emerald-900"
                }`}
              >
                {item.highlight && <Sparkles size={15} className="text-emerald-600" />}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Action Button & Mobile Menu Trigger */}
        <div className="flex items-center gap-3">
          <Link
            href="/simulateur"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-800 to-teal-900 hover:from-emerald-900 hover:to-teal-950 text-white font-black text-xs sm:text-sm shadow-md transition-all transform hover:-translate-y-0.5"
          >
            <Timer size={16} className="text-emerald-300" />
            <span>محاكي الوطني ⏱️</span>
            <ArrowLeft size={14} className="hidden md:inline" />
          </Link>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="فتح القائمة الرئيسية"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white/98 backdrop-blur-xl px-4 pt-4 pb-8 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto">
          <div className="space-y-1">
            {navLinks.map((item, idx) => {
              const isActive = pathname === item.href;
              return (
                <div key={idx} className="space-y-1">
                  <Link
                    href={item.href}
                    className={`flex items-center justify-between p-3 rounded-xl text-sm font-black transition-all ${
                      isActive
                        ? "bg-emerald-800 text-white"
                        : "text-slate-800 hover:bg-slate-100"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 font-extrabold">
                        {item.badge}
                      </span>
                    )}
                  </Link>

                  {item.dropdown && (
                    <div className="pr-4 pl-2 space-y-1 border-r-2 border-emerald-200 mb-2">
                      {item.dropdown.slice(0, 4).map((sub, sIdx) => (
                        <Link
                          key={sIdx}
                          href={sub.href}
                          className="block py-1.5 px-3 rounded-lg text-xs font-semibold text-slate-600 hover:text-emerald-900 hover:bg-emerald-50/50"
                        >
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-2">
            <Link
              href="/simulateur"
              className="w-full py-3 px-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-black text-sm shadow-md flex items-center justify-center gap-2"
            >
              <Timer size={16} />
              <span>محاكي الامتحان الوطني مع المؤقت</span>
            </Link>
            <Link
              href="/calculateur"
              className="w-full py-3 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-black text-sm shadow-md flex items-center justify-center gap-2"
            >
              <Calculator size={16} />
              <span>حاسبة معدل الباكالوريا والميزات</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
