import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "شروط الاستخدام | موديريسي",
  description: "شروط استعمال منصة موديريسي، الحسابات، الاشتراكات، المحتوى التعليمي، وحماية المستخدمين.",
  alternates: { canonical: "/terms" },
};

const SECTIONS = [
  {
    title: "1. قبول الشروط",
    text: "باستخدام منصة موديريسي، يوافق المستخدم على هذه الشروط وعلى سياسة الخصوصية. إذا كنت لا توافق على الشروط، يرجى عدم استعمال المنصة.",
  },
  {
    title: "2. الحسابات",
    text: "يجب إدخال معلومات صحيحة عند إنشاء الحساب. يتحمل المستخدم مسؤولية الحفاظ على سرية كلمة المرور وعدم مشاركة الحساب بطريقة تضر بالمنصة أو بمستخدمين آخرين.",
  },
  {
    title: "3. المحتوى التعليمي",
    text: "المحتوى المقدم داخل المنصة مخصص للمساعدة على التعلم والمراجعة، ولا يغني عن متابعة الدروس الرسمية أو توجيهات الأساتذة والمؤسسات التعليمية.",
  },
  {
    title: "4. الاشتراكات",
    text: "تتوفر خطة مجانية وخطط مدفوعة. يتم تفعيل الاشتراكات المدفوعة حالياً عبر WhatsApp، مع توضيح الخطة والسعر ومدة التفعيل قبل الاشتراك.",
  },
  {
    title: "5. السلوك المقبول",
    text: "يمنع استعمال المنصة لنشر محتوى مسيء أو محاولة تعطيل الخدمة أو الوصول غير المصرح به إلى حسابات أو بيانات أخرى.",
  },
  {
    title: "6. حذف الحساب والبيانات",
    text: "يمكن للمستخدم طلب حذف الحساب أو البيانات عبر صفحة التواصل. سنعمل على معالجة الطلب في أقرب وقت ممكن وفق الإمكانات التقنية والقانونية.",
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 md:pb-0">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 pt-28 pb-16">
        <p className="text-blue-600 font-bold text-sm mb-2">الشروط القانونية</p>
        <h1 className="text-3xl md:text-4xl font-black text-[#1E293B] mb-3">شروط الاستخدام</h1>
        <p className="text-slate-500 mb-8">آخر تحديث: أبريل 2026</p>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7 space-y-7">
          {SECTIONS.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">{section.title}</h2>
              <p className="text-slate-600 text-sm leading-8">{section.text}</p>
            </section>
          ))}

          <section>
            <h2 className="text-xl font-bold text-[#1E293B] mb-3">7. التواصل</h2>
            <p className="text-slate-600 text-sm leading-8">
              لأي استفسار حول هذه الشروط، يمكنك التواصل معنا عبر{" "}
              <Link href="/contact" className="text-blue-600 hover:underline">صفحة التواصل</Link>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
