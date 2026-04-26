import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "ترتيب المتصدرين | موديريسي",
  description: "صفحة ترتيب المتصدرين في موديريسي، ميزة قادمة لتشجيع التلاميذ على المراجعة المنتظمة.",
  alternates: { canonical: "/leaderboard" },
};

const UPCOMING = [
  "ترتيب حسب النقاط المكتسبة من التمارين",
  "تصنيف حسب المستوى الدراسي",
  "شارات تشجيعية للتلاميذ النشطين",
  "عرض يحترم خصوصية التلميذ وبياناته",
];

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 md:pb-6">
      <Navbar />

      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=1600&q=80"
            alt="ترتيب المتصدرين"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-amber-900/90 via-orange-900/85 to-[#F8FAFC]" />
        </div>
        <div className="relative max-w-2xl mx-auto px-4 pt-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-sm font-semibold px-4 py-1.5 rounded-full mb-5 backdrop-blur-sm">
            <span>🏆</span>
            <span>ميزة قادمة</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight">
            ترتيب المتصدرين
          </h1>
          <p className="text-amber-100/90 text-base leading-7">
            نعمل على إعداد ترتيب واضح وعادل يشجع التلاميذ على المراجعة، مع احترام الخصوصية وعدم عرض بيانات غير ضرورية.
          </p>
        </div>
      </section>

      <main className="max-w-3xl mx-auto px-4 pb-12">
        <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7">
          <h2 className="text-2xl font-black text-[#1E293B] mb-4">ما الذي سيظهر هنا؟</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {UPCOMING.map((item) => (
              <div key={item} className="flex items-start gap-3 bg-slate-50 rounded-xl p-4">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-sm shrink-0">✓</span>
                <p className="text-slate-600 text-sm leading-7">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <Link href="/exercises" className="inline-flex items-center justify-center bg-blue-600 text-white font-bold px-5 py-3 rounded-xl hover:bg-blue-700 transition-colors">
              تدرب على التمارين
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center border border-slate-200 text-slate-700 font-bold px-5 py-3 rounded-xl hover:bg-slate-50 transition-colors">
              أرسل ملاحظتك
            </Link>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
