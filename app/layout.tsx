import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "katex/dist/katex.min.css";
import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0f1e",
};

export const metadata: Metadata = {
  title: "Modarisi - Tuteur IA pour collégiens marocains | مدرسي",
  description:
    "Modarisi est le tuteur IA pour les collégiens marocains. Pose tes questions en Darija ou en français — Maths, Physique, SVT, Français, Arabe et plus. Gratuit, disponible 24h/7j. | مدرسي هو المساعد الذكي لتلاميذ الإعدادي المغاربة.",
  keywords: [
    "tuteur IA Maroc", "modarisi", "collège marocain", "aide scolaire Maroc",
    "Darija", "maths collège", "SVT collège", "intelligence artificielle éducation",
    "تعليم", "مدرسي", "الذكاء الاصطناعي", "المغرب", "إعدادي",
  ],
  openGraph: {
    title: "Modarisi — Tuteur IA pour Collégiens Marocains | مدرسي",
    description: "Pose tes questions en Darija ou en français. Maths, Physique, SVT, Français, Arabe — disponible 24h/7j.",
    siteName: "Modarisi",
    locale: "fr_MA",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const isRTL = locale === "ar";

  return (
    <html
      lang={locale}
      dir={isRTL ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body className={`${inter.variable} font-sans antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
