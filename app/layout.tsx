import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Modarisi — Tuteur IA pour Collégiens Marocains | Darija & Français",
  description:
    "Modarisi est le tuteur IA pour les collégiens marocains. Pose tes questions en Darija ou en français — Maths, Physique, SVT, Français, Arabe et plus. Gratuit, disponible 24h/7j.",
  keywords: [
    "tuteur IA Maroc", "modarisi", "collège marocain", "aide scolaire Maroc",
    "Darija", "maths collège", "SVT collège", "intelligence artificielle éducation",
    "تعليم", "مدرسي", "الذكاء الاصطناعي", "المغرب",
  ],
  openGraph: {
    title: "Modarisi — Tuteur IA pour Collégiens Marocains",
    description: "Pose tes questions en Darija ou en français. Maths, Physique, SVT, Français, Arabe — disponible 24h/7j.",
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
