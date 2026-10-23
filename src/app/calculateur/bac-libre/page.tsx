import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { LshCalculator } from "@/components/lsh-calculator";
import { FaqSection, type FaqItem } from "@/components/faq-section";

const TITLE = "حساب معدل الباك الحر (الأحرار) بالمغرب: الآداب والعلوم الإنسانية | مدرسي";
const DESCRIPTION =
  "احسب معدلك العام في البكالوريا الحرة: الجهوي والوطني بالمعاملات، بدون مراقبة مستمرة، لمسلك الآداب ومسلك العلوم الإنسانية، مع نقطة الانتقاء.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/calculateur/bac-libre" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/calculateur/bac-libre", type: "website", locale: "ar_MA" },
};

const FAQ: FaqItem[] = [
  {
    q: "كيف يُحسب المعدل العام للمترشحين الأحرار؟",
    a: "المترشحون الأحرار غير معنيين بالمراقبة المستمرة، ويجتازون الامتحان الجهوي والوطني في نفس الدورة، فيُعتبران امتحاناً واحداً. تُضرب نقطة كل مادة في معاملها، ثم يُقسم المجموع على مجموع المعاملات.",
  },
  {
    q: "ما هي مواد الامتحان الجهوي لشعبة الآداب والعلوم الإنسانية؟",
    a: "اللغة الفرنسية (معامل 4)، التربية الإسلامية (معامل 2)، والرياضيات (معامل 1).",
  },
  {
    q: "ما الفرق بين معاملات مسلك الآداب ومسلك العلوم الإنسانية في الوطني؟",
    a: "في مسلك الآداب: العربية 4، الإنجليزية 4، التاريخ والجغرافيا 3، الفلسفة 3. في مسلك العلوم الإنسانية: العربية 3، الإنجليزية 3، التاريخ والجغرافيا 4، الفلسفة 4.",
  },
  {
    q: "هل التربية البدنية إجبارية للأحرار؟",
    a: "يمكن للمترشح الحر اجتياز اختبار التربية البدنية (معامل 1) أو تقديم شهادة إعفاء ضمن ملف الترشيح. إذا اجتزته، فعّل الخانة في الحاسبة لتحتسب نقطته.",
  },
  {
    q: "هل يوجد ميزة للأحرار؟",
    a: "نعم، الميزات نفسها: مقبول من 10، مستحسن من 12، حسن من 14، وحسن جداً من 16.",
  },
];

export default function BacLibrePage() {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <LshCalculator mode="libre" />
        <FaqSection items={FAQ}>
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">مثال على حساب معدل الباك الحر</h2>
            <p className="text-slate-700 leading-relaxed">
              مترشح حر في مسلك العلوم الإنسانية حصل في الجهوي على: الفرنسية 11، التربية الإسلامية 14، الرياضيات 8، وفي
              الوطني على: العربية 12، الإنجليزية 13، التاريخ والجغرافيا 14، الفلسفة 11.
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-700 leading-loose font-sans">
              (11×4 + 14×2 + 8×1 + 12×3 + 13×3 + 14×4 + 11×4) ÷ (4+2+1+3+3+4+4) = 255 ÷ 21 = 12.14 ← ميزة مستحسن
            </div>
            <p className="text-sm text-slate-500">
              مترشح رسمي؟ استعمل{" "}
              <Link href="/calculateur/lettres-sciences-humaines" className="text-emerald-700 font-bold underline">
                حاسبة الآداب والعلوم الإنسانية للرسميين
              </Link>
              .
            </p>
          </div>
        </FaqSection>
      </main>
      <Footer />
    </div>
  );
}
