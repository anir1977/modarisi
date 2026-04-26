import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#2563EB",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://modarisi.ma"),
  title: "موديريسي — منصة التعلم للإعدادي المغربي",
  description:
    "موديريسي هي منصة التعلم الذكية لتلاميذ الإعدادي في المغرب. تمارين، امتحانات تجريبية، ومساعد ذكاء اصطناعي يجيب بالدارجة والعربية والفرنسية.",
  keywords: [
    "موديريسي", "تعليم", "إعدادي", "المغرب", "ذكاء اصطناعي",
    "تمارين", "امتحانات", "رياضيات", "علوم", "دارجة",
    "modarisi", "collège marocain", "aide scolaire", "IA éducation",
  ],
  openGraph: {
    title: "موديريسي — منصة التعلم للإعدادي المغربي",
    description: "تمارين ذكية، امتحانات تجريبية، ومساعد ذكاء اصطناعي — كل هذا مجاناً للتلاميذ المغاربة.",
    siteName: "موديريسي",
    locale: "ar_MA",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "موديريسي — منصة التعلم للإعدادي المغربي",
    description: "تمارين ذكية، امتحانات تجريبية، ومساعد ذكاء اصطناعي.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className="font-cairo antialiased bg-[#F8FAFC] text-[#1E293B]">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
