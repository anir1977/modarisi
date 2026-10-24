"use client";
import Link from "next/link";
import { GraduationCap, Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs sm:text-sm border-t border-slate-800 pt-20 pb-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Col 1: Brand */}
          <div className="space-y-5 md:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <GraduationCap size={22} className="text-emerald-200" />
              </div>
              <span className="font-black text-2xl tracking-tight text-white">modarisi.ma</span>
            </Link>
            <p className="text-slate-400 leading-relaxed text-xs sm:text-sm font-semibold">
              منصة مغربية للتحضير للباكالوريا: حاسبة المعدل، نماذج تدريبية للامتحانات، وأستاذ افتراضي مدعوم بالذكاء الاصطناعي.
            </p>
            <div className="text-xs text-emerald-400 font-bold flex items-center gap-2">
              <span>🇲🇦 منصة وطنية مغربية · الدار البيضاء، المملكة المغربية</span>
            </div>
          </div>

          {/* Col 2: Filières */}
          <div className="space-y-4">
            <strong className="text-white font-black text-sm block uppercase tracking-wider">
              الشعب والمستويات الدراسية
            </strong>
            <ul className="space-y-2.5 text-xs sm:text-sm font-semibold">
              <li><a href="/filieres" className="hover:text-emerald-400 transition-colors">الثانية باكالوريا علوم رياضية (أ / ب)</a></li>
              <li><a href="/filieres" className="hover:text-emerald-400 transition-colors">الثانية باكالوريا علوم فيزيائية (PC)</a></li>
              <li><a href="/filieres" className="hover:text-emerald-400 transition-colors">الثانية باكالوريا علوم الحياة والأرض (SVT)</a></li>
              <li><a href="/filieres" className="hover:text-emerald-400 transition-colors">الثانية باكالوريا علوم اقتصادية وتدبير</a></li>
              <li><a href="/filieres" className="hover:text-emerald-400 transition-colors">الأولى باكالوريا - الامتحان الجهوي الموحد</a></li>
              <li><a href="/filieres" className="hover:text-emerald-400 transition-colors">الثالثة إعدادي (شهادة التعليم الإعدادي)</a></li>
            </ul>
          </div>

          {/* Col 3: Features */}
          <div className="space-y-4">
            <strong className="text-white font-black text-sm block uppercase tracking-wider">
              الأدوات والخدمات التعليمية
            </strong>
            <ul className="space-y-2.5 text-xs sm:text-sm font-semibold">
              <li><a href="/calculateur" className="hover:text-emerald-400 transition-colors">حاسبة معدل الباكالوريا</a></li>
              <li><a href="/simulateur" className="hover:text-emerald-400 transition-colors">محاكي الامتحان الوطني</a></li>
              <li><a href="/examens" className="hover:text-emerald-400 transition-colors">نماذج الامتحانات مع التصحيح</a></li>
              <li><a href="/tuteur" className="hover:text-emerald-400 transition-colors">الأستاذ الافتراضي</a></li>
              <li><a href="/coefficients" className="hover:text-emerald-400 transition-colors">معاملات الباكالوريا</a></li>
              <li><a href="/maraji3" className="hover:text-emerald-400 transition-colors">دليل المراجع</a></li>
            </ul>
          </div>

          {/* Col 4: Contact & Support */}
          <div className="space-y-4">
            <strong className="text-white font-black text-sm block uppercase tracking-wider">
              المساعدة والتواصل
            </strong>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-semibold">
              فريق منصة مدرسي رهن إشارة التلميذات والتلاميذ وأولياء الأمور للإجابة عن التساؤلات والمرافقة الأكاديمية.
            </p>
            <div className="space-y-2 text-xs sm:text-sm font-semibold">
              <div className="text-slate-300">📧 البريد الإلكتروني : contact@modarisi.ma</div>
              <div className="text-slate-300"><a href="/contact" className="hover:text-emerald-400">صفحة الاتصال</a></div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-semibold">
          <div>
            © {new Date().getFullYear()} modarisi.ma · جميع الحقوق محفوظة لمنصة مدرسي المغربية.
          </div>
          <nav className="flex flex-wrap items-center gap-4" aria-label="روابط قانونية">
            <Link href="/about" className="hover:text-emerald-400">من نحن</Link>
            <Link href="/contact" className="hover:text-emerald-400">اتصل بنا</Link>
            <Link href="/privacy" className="hover:text-emerald-400">سياسة الخصوصية</Link>
            <Link href="/terms" className="hover:text-emerald-400">شروط الاستخدام</Link>
          </nav>
          <div className="flex items-center gap-1.5">
            <span>منصة مصممة ومطورة لخدمة التعليم والارتقاء بالتلاميذ في المملكة المغربية</span>
            <span className="text-red-500">🇲🇦</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
