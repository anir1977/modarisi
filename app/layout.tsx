import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Modarisi - مدرسي | AI Tutoring for Moroccan Students",
  description:
    "منصة تعليمية بالذكاء الاصطناعي للطلاب المغاربة في المرحلة الإعدادية. Plateforme de tutorat IA pour les collégiens marocains.",
  keywords: ["تعليم", "مغرب", "ذكاء اصطناعي", "مدرسي", "collège", "Maroc", "IA"],
  openGraph: {
    title: "Modarisi - مدرسي",
    description: "AI Tutoring Platform for Moroccan Middle School Students",
    siteName: "Modarisi",
    locale: "fr_MA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
