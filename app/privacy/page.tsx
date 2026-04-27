import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { whatsappUrl } from "@/lib/contact";

export const metadata: Metadata = {
  title: "سياسة الخصوصية | موديريسي",
  description: "سياسة خصوصية موديريسي وطرق جمع واستخدام وحماية بيانات التلاميذ والأولياء.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 pt-28 pb-16">
        <h1 className="text-3xl font-black text-[#1E293B] mb-8">سياسة الخصوصية</h1>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 prose prose-slate max-w-none">
          <p className="text-slate-500 mb-6">آخر تحديث: أبريل 2026</p>

          <h2 className="text-xl font-bold text-[#1E293B] mb-3">1. جمع البيانات</h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-5">
            نجمع فقط المعلومات الضرورية لتقديم الخدمة: الاسم، البريد الإلكتروني، رقم الهاتف (اختياري)، والمستوى الدراسي. لا نبيع بياناتك لأي طرف ثالث.
          </p>

          <h2 className="text-xl font-bold text-[#1E293B] mb-3">2. استخدام البيانات</h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-5">
            نستخدم بياناتك لتخصيص تجربة التعلم، إرسال التقارير الأسبوعية (إذا وافقت)، وتحسين المنصة. لا نستخدم بياناتك لأغراض تجارية أخرى.
          </p>

          <h2 className="text-xl font-bold text-[#1E293B] mb-3">3. حماية البيانات</h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-5">
            نستخدم Supabase لتخزين البيانات بأمان عالٍ مع تشفير كامل. لا يمكن لأحد الوصول لبياناتك إلا بإذنك.
          </p>

          <h2 className="text-xl font-bold text-[#1E293B] mb-3">4. حقوقك</h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-5">
            يمكنك طلب حذف حسابك وجميع بياناتك في أي وقت عبر التواصل معنا على WhatsApp.
          </p>

          <h2 className="text-xl font-bold text-[#1E293B] mb-3">5. تواصل معنا</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            لأي استفسار حول الخصوصية: تواصل معنا عبر{" "}
            <a href={whatsappUrl("مرحباً، عندي سؤال حول خصوصية البيانات في موديريسي.")} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">WhatsApp</a>.
          </p>
        </div>

        <div className="text-center mt-8">
          <Link href="/" className="text-slate-400 hover:text-slate-600 text-sm transition-colors">
            ← العودة للرئيسية
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
