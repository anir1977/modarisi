import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export const metadata: Metadata = {
  metadataBase: new URL("https://www.modarisi.ma"),
  title: "modarisi.ma · أستاذك الخصوصي بالذكاء الاصطناعي 24/7 | الباكالوريا والمقرر المغربي",
  description: "منصة مغربية مجانية للتحضير للباكالوريا والدعم المدرسي. حاسبات معدل الباكالوريا للشعب العلمية والأدبية والأحرار، نماذج امتحانات مع التصحيح، وأستاذ افتراضي يشرح الدروس بالدارجة والفرنسية.",
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
    description: "حاسبات معدل الباكالوريا، نماذج امتحانات مع التصحيح، وأستاذ افتراضي يشرح الدروس بالدارجة والفرنسية.",
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
        {ADSENSE_CLIENT && (
          <Script
            id="adsense"
            async
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          />
        )}
      </body>
    </html>
  );
}
