import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BacCalculator } from "@/components/bac-calculator";

const TITLE = "حساب معدل الباكالوريا بالمغرب ونقطة الانتقاء | مدرسي modarisi.ma";
const DESCRIPTION =
  "احسب معدلك العام في الباكالوريا بالمغرب (25% جهوي + 25% مراقبة مستمرة + 50% وطني)، وميزتك التقديرية، ونقطة الانتقاء للمدارس العليا (75% وطني + 25% جهوي).";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/calculateur" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/calculateur", type: "website", locale: "ar_MA" },
};

const FAQ = [
  {
    q: "كيف يُحسب المعدل العام للباكالوريا بالنسبة للمترشحين الرسميين؟",
    a: "يُحسب المعدل العام بجمع 25% من معدل الامتحان الجهوي (الأولى باكالوريا)، و25% من معدل المراقبة المستمرة للسنة الثانية، و50% من معدل الامتحان الوطني. معدل الامتحان الوطني نفسه هو معدل موزون بمعاملات مواد الشعبة.",
  },
  {
    q: "ما هي نقطة الانتقاء ولماذا تختلف عن المعدل العام؟",
    a: "تعتمد كثير من المدارس والمعاهد بعد الباكالوريا في الانتقاء الأولي على صيغة لا تحتسب المراقبة المستمرة: 75% من معدل الامتحان الوطني و25% من معدل الامتحان الجهوي. بعض المدارس تعتمد صيغة مختلفة، لذلك يجب دائماً قراءة إعلان المباراة.",
  },
  {
    q: "ما هي الميزات في الباكالوريا المغربية؟",
    a: "مقبول من 10 إلى أقل من 12، مستحسن من 12 إلى أقل من 14، حسن من 14 إلى أقل من 16، وحسن جداً من 16 فما فوق.",
  },
  {
    q: "هل هذه الحاسبة صالحة للمترشحين الأحرار؟",
    a: "لا. المترشحون الأحرار لا تُحتسب لهم المراقبة المستمرة، وطريقة الحساب مختلفة. سنضيف حاسبة خاصة بالأحرار قريباً.",
  },
  {
    q: "هل النتيجة رسمية؟",
    a: "لا. النتيجة تقديرية للمساعدة على التخطيط فقط. المعدل الرسمي هو الذي تعلنه وزارة التربية الوطنية. تأكد أيضاً من معاملات شعبتك لهذه السنة لأنها قد تتغير.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function CalculateurPage() {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <BacCalculator />

        <section className="bg-white border-t border-slate-200 py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-10 text-right">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">طريقة حساب معدل الباكالوريا خطوة بخطوة</h2>
              <ol className="list-decimal pr-6 space-y-2 text-slate-700 leading-relaxed font-medium">
                <li>
                  احسب معدل الامتحان الوطني: اضرب نقطة كل مادة في معاملها، اجمع النتائج، ثم اقسم على مجموع المعاملات.
                </li>
                <li>خذ نصف معدل الامتحان الوطني (50%).</li>
                <li>أضف ربع معدل الامتحان الجهوي (25%) وربع معدل المراقبة المستمرة (25%).</li>
                <li>النتيجة هي معدلك العام. إذا كان 10 أو أكثر فأنت ناجح.</li>
              </ol>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-700 leading-relaxed">
                <strong className="block mb-1 text-slate-900">مثال :</strong>
                جهوي 14.50، مراقبة مستمرة 15.00، وطني 14.37 ← المعدل العام = (14.50 × 0.25) + (15.00 × 0.25) + (14.37 × 0.5) = 14.56، أي ميزة «حسن».
                <br />
                نقطة الانتقاء لنفس التلميذ = (14.37 × 0.75) + (14.50 × 0.25) = 14.40.
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">أسئلة شائعة</h2>
              <div className="space-y-3">
                {FAQ.map((f) => (
                  <details key={f.q} className="group p-4 rounded-2xl border border-slate-200 bg-slate-50 open:bg-white">
                    <summary className="cursor-pointer font-black text-slate-900">{f.q}</summary>
                    <p className="mt-3 text-slate-700 leading-relaxed">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>

            <p className="text-sm text-slate-500">
              تريد التدرب على الامتحان الوطني؟ جرب{" "}
              <Link href="/simulateur" className="text-emerald-700 font-bold underline">
                محاكي الامتحان الوطني
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
