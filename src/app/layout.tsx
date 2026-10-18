import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "modarisi.ma · أستاذك الخصوصي بالذكاء الاصطناعي 24/7 | الباكالوريا والمقرر المغربي",
  description: "المنصة التعليمية الأولى فـ المغرب للدعم والتعليم المدرسي. شرح الدروس بالدارجة والفرنسية، تصوير التمارين وحلها بالخطوات، وامتحانات الباكالوريا المصححة لجميع الشعب (علوم رياضية، تجريبية، اقتصاد، وأداب).",
  keywords: [
    "modarisi",
    "modarisi.ma",
    "مدرسي",
    "الباكالوريا المغرب",
    "ساعات إضافية",
    "دعم مدرسي المغرب",
    "امتحانات وطنية مصححة",
    "الرياضيات ثانية باك",
    "الفيزياء والكيمياء باك",
    "الجهوي أولى باك",
    "Casablanca soutien scolaire",
  ],
  authors: [{ name: "Modarisi Maroc" }],
  openGraph: {
    title: "modarisi.ma · أستاذك الخصوصي بالذكاء الاصطناعي 24/7",
    description: "شرح الدروس بالدارجة والفرنسية، حل التمارين بالصور، والتحضير للامتحان الوطني والجهوي.",
    url: "https://modarisi.ma",
    siteName: "Modarisi",
    locale: "ar_MA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-emerald-200 selection:text-emerald-900">
        {children}
      </body>
    </html>
  );
}
