import Link from "next/link";
import { whatsappUrl } from "@/lib/contact";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 py-12 mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-white font-black text-lg mb-3">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 text-white flex items-center justify-center text-xl font-black">
                م
              </span>
              <span>موديريسي</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              منصة تعليمية لتلاميذ الإعدادي المغربي — دروس، تمارين، امتحانات موحدة، ومساعد تعليمي.
            </p>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm">الصفحات</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/lessons", label: "الدروس" },
                { href: "/exercises", label: "التمارين" },
                { href: "/exam-simulator", label: "الامتحانات" },
                { href: "/leaderboard", label: "المتصدرون" },
                { href: "/faq", label: "أسئلة شائعة" },
                { href: "/contact", label: "تواصل معنا" },
                { href: "/about", label: "من نحن" },
                { href: "/sources", label: "مصادر المحتوى" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm">الحساب</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/auth/register", label: "إنشاء حساب" },
                { href: "/auth/login", label: "تسجيل الدخول" },
                { href: "/pricing", label: "الاشتراك" },
                { href: "/dashboard", label: "لوحة التحكم" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm">تواصل معنا</h3>
            <p className="text-sm text-slate-400 mb-2">للاشتراك أو الاستفسار:</p>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors"
            >
              <span>💬</span> WhatsApp
            </a>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500">
          <p>© 2026 موديريسي — جميع الحقوق محفوظة</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">سياسة الخصوصية</Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">شروط الاستخدام</Link>
            <span>·</span>
            <span>🇲🇦 صنع في المغرب</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
