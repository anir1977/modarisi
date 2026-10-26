import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { LshCalculator } from "@/components/lsh-calculator";
import { FaqSection, type FaqItem } from "@/components/faq-section";
import { OG_IMAGES } from "@/lib/seo";

const TITLE = "حساب معدل الباكالوريا آداب وعلوم إنسانية بالمعاملات | مدرسي";
const DESCRIPTION =
  "حاسبة معدل الباكالوريا لمسلك الآداب ومسلك العلوم الإنسانية: الجهوي 25% والمراقبة المستمرة 25% والوطني 50%، بمعاملات كل مادة، مع الميزة ونقطة الانتقاء.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/calculateur/lettres-sciences-humaines" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/calculateur/lettres-sciences-humaines",
    type: "website",
    locale: "ar_MA",
    images: OG_IMAGES,
  },
};

const FAQ: FaqItem[] = [
  {
    q: "كيف يُحسب معدل الباكالوريا لشعبة الآداب والعلوم الإنسانية؟",
    a: "بالنسبة للمترشحين الرسميين: 25% من معدل الامتحان الجهوي + 25% من معدل المراقبة المستمرة + 50% من معدل الامتحان الوطني. كل معدل امتحان هو معدل موزون بمعاملات مواده.",
  },
  {
    q: "ما هي معاملات الامتحان الوطني لمسلك العلوم الإنسانية؟",
    a: "اللغة العربية 3، اللغة الأجنبية الثانية (الإنجليزية) 3، التاريخ والجغرافيا 4، الفلسفة 4.",
  },
  {
    q: "ما هي معاملات الامتحان الوطني لمسلك الآداب؟",
    a: "اللغة العربية 4، اللغة الأجنبية الثانية (الإنجليزية) 4، التاريخ والجغرافيا 3، الفلسفة 3.",
  },
  {
    q: "ما هي مواد الامتحان الجهوي؟",
    a: "في الأولى باكالوريا آداب وعلوم إنسانية: اللغة الفرنسية (معامل 4)، التربية الإسلامية (معامل 2)، الرياضيات (معامل 1).",
  },
  {
    q: "هل المعاملات ثابتة؟",
    a: "قد تتغير مع الإصلاحات. نحدث الحاسبة عند صدور مذكرة جديدة، لكن تأكد دائماً من الإعلان الرسمي.",
  },
];

export default function LshPage() {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <LshCalculator mode="regular" />
        <FaqSection items={FAQ}>
          <p className="text-sm text-slate-500">
            مترشح حر؟ استعمل{" "}
            <Link href="/calculateur/bac-libre" className="text-emerald-700 font-bold underline">
              حاسبة الباك الحر
            </Link>
            . شعبة علمية؟ استعمل{" "}
            <Link href="/calculateur" className="text-emerald-700 font-bold underline">
              حاسبة الشعب العلمية
            </Link>
            .
          </p>
        </FaqSection>
      </main>
      <Footer />
    </div>
  );
}
