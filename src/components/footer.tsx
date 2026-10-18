"use client";
import Link from "next/link";
import { GraduationCap, Heart, Shield, BookOpen, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-850 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                <GraduationCap size={18} className="text-emerald-200" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">modarisi.ma</span>
            </Link>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              المنصة الذكية الأولى للدعم والتعليم المدرسي فـ المغرب. أستاذ خصوصي بالذكاء الاصطناعي كيشرح ليك دروسك وتمارينك 24/24 ساعة.
            </p>
            <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5">
              <span>🇲🇦 100% مغربي · الدار البيضاء، المغرب</span>
            </div>
          </div>

          {/* Col 2: Filières */}
          <div className="space-y-3">
            <strong className="text-white font-extrabold text-xs block uppercase tracking-wider">
              الشعب والمستويات
            </strong>
            <ul className="space-y-2 text-[11px]">
              <li><a href="#filieres" className="hover:text-emerald-400 transition-colors">2ème Bac Sciences Maths (A/B)</a></li>
              <li><a href="#filieres" className="hover:text-emerald-400 transition-colors">2ème Bac Sciences Physiques (PC)</a></li>
              <li><a href="#filieres" className="hover:text-emerald-400 transition-colors">2ème Bac SVT &amp; Sciences de la Vie</a></li>
              <li><a href="#filieres" className="hover:text-emerald-400 transition-colors">2ème Bac Sciences Économiques</a></li>
              <li><a href="#filieres" className="hover:text-emerald-400 transition-colors">1ère Bac - الجهوي (Français &amp; التربية الإسلامية)</a></li>
              <li><a href="#filieres" className="hover:text-emerald-400 transition-colors">الثالثة إعدادي (3AC Brevet)</a></li>
            </ul>
          </div>

          {/* Col 3: Features */}
          <div className="space-y-3">
            <strong className="text-white font-extrabold text-xs block uppercase tracking-wider">
              الأدوات والخدمات
            </strong>
            <ul className="space-y-2 text-[11px]">
              <li><a href="#tuteur" className="hover:text-emerald-400 transition-colors">الأستاذ الذكي بالدارجة والفرنسية</a></li>
              <li><a href="#snap" className="hover:text-emerald-400 transition-colors">Snap &amp; Solve (صور تمرينك)</a></li>
              <li><a href="#examens" className="hover:text-emerald-400 transition-colors">امتحانات الباك الرسمية 2010 - 2024</a></li>
              <li><a href="#tarifs" className="hover:text-emerald-400 transition-colors">اشتراك Modarisi VIP (49 DH)</a></li>
              <li><a href="#tuteur" className="hover:text-emerald-400 transition-colors">دليل التوجيه للمدارس العليا</a></li>
            </ul>
          </div>

          {/* Col 4: Contact & Legal */}
          <div className="space-y-3">
            <strong className="text-white font-extrabold text-xs block uppercase tracking-wider">
              المساعدة والتواصل
            </strong>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              فريق مدرسي رهن إشارة التلاميذ وأولياء الأمور لجميع الاستفسارات والتوجيه الدراسي.
            </p>
            <div className="space-y-1.5 text-[11px]">
              <div className="text-slate-300">📧 contact@modarisi.ma</div>
              <div className="text-slate-300">💬 الدعم عبر الواتساب: متاح للطلبة</div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} modarisi.ma · جميع الحقوق محفوظة لـ مدرسي المغرب.
          </div>
          <div className="flex items-center gap-1">
            <span>صُنع بشغف لخدمة التعليم في المملكة المغربية</span>
            <span className="text-red-500">🇲🇦</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
