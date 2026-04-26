import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "تواصل معنا | موديريسي",
  description: "تواصل مع فريق موديريسي عبر WhatsApp للاستفسار حول التسجيل، الاشتراك، الدروس، أو دعم الحساب.",
  alternates: { canonical: "/contact" },
};

const WHATSAPP_URL = "https://wa.me/212708025467?text=مرحباً، أحتاج مساعدة بخصوص موديريسي";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 md:pb-0">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 pt-28 pb-16">
        <div className="grid lg:grid-cols-[1fr_0.9fr] gap-8 items-start">
          <section>
            <p className="text-emerald-600 font-bold text-sm mb-2">تواصل معنا</p>
            <h1 className="text-3xl md:text-4xl font-black text-[#1E293B] mb-4">
              هل تحتاج إلى مساعدة في التسجيل أو الاشتراك؟
            </h1>
            <p className="text-slate-500 leading-8 max-w-2xl">
              يساعدك فريق موديريسي على اختيار الخطة المناسبة، فهم طريقة الاستعمال، وحل أي مشكلة مرتبطة بالحساب أو الدروس.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                <span className="text-3xl block mb-3">💬</span>
                <h2 className="font-black text-[#1E293B] mb-1">WhatsApp</h2>
                <p className="text-slate-500 text-sm mb-4">أسرع طريقة للتواصل والاشتراك.</p>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold text-sm hover:underline">
                  0708025467
                </a>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                <span className="text-3xl block mb-3">⏱️</span>
                <h2 className="font-black text-[#1E293B] mb-1">وقت الجواب</h2>
                <p className="text-slate-500 text-sm leading-7">
                  نحاول الرد على الرسائل في نفس اليوم، خصوصاً طلبات الاشتراك والدعم.
                </p>
              </div>
            </div>
          </section>

          <aside className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-xl font-black text-[#1E293B] mb-3">قبل التواصل معنا</h2>
            <ul className="space-y-3 text-sm text-slate-600 leading-7">
              <li>اذكر هل تريد التسجيل المجاني أو الاشتراك في بلوس أو بريميوم.</li>
              <li>اذكر المستوى الدراسي للتلميذ: الأولى، الثانية، أو الثالثة إعدادي.</li>
              <li>إذا كانت المشكلة تقنية، أرسل صورة للشاشة حتى نساعدك بسرعة.</li>
            </ul>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-5 py-3 rounded-xl transition-colors"
            >
              <span>💬</span>
              تواصل معنا عبر WhatsApp
            </a>
          </aside>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
