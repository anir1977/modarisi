import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FaqSection, type FaqItem } from "@/components/faq-section";
import { SCI_TRACKS, SCI_REGIONAL, ECO_REGIONAL } from "@/lib/tracks-sci";
import { LSH_TRACKS, LSH_REGIONAL, type ExamSubject } from "@/lib/tracks-lsh";
import { OG_IMAGES } from "@/lib/seo";

const TITLE = "معاملات الباكالوريا بالمغرب لجميع الشعب: الجهوي والوطني | مدرسي";
const DESCRIPTION =
  "جداول معاملات مواد الامتحان الوطني والجهوي للباكالوريا بالمغرب: العلوم الفيزيائية، علوم الحياة والأرض، العلوم الرياضية أ و ب، العلوم الاقتصادية، التدبير المحاسباتي، الآداب والعلوم الإنسانية.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/coefficients" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/coefficients", type: "article", locale: "ar_MA", images: OG_IMAGES },
};

const sum = (l: ExamSubject[]) => l.reduce((a, s) => a + s.coef, 0);

function CoefTable({ title, subjects, id }: { title: string; subjects: ExamSubject[]; id?: string }) {
  return (
    <div id={id} className="rounded-2xl border border-slate-200 overflow-hidden scroll-mt-28">
      <h3 className="px-4 py-3 bg-slate-900 text-white font-black text-base">{title}</h3>
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-slate-600">
          <tr>
            <th scope="col" className="text-right px-4 py-2 font-bold">المادة</th>
            <th scope="col" className="text-center px-4 py-2 font-bold w-24">المعامل</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((s) => (
            <tr key={s.id} className="border-t border-slate-100">
              <td className="px-4 py-2 text-slate-900 font-semibold">{s.name}</td>
              <td className="px-4 py-2 text-center font-sans font-black text-emerald-800">{s.coef}</td>
            </tr>
          ))}
          <tr className="border-t border-slate-200 bg-slate-50">
            <td className="px-4 py-2 font-black text-slate-700">المجموع</td>
            <td className="px-4 py-2 text-center font-sans font-black">{sum(subjects)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const FAQ: FaqItem[] = [
  {
    q: "ما الفرق بين معامل المراقبة المستمرة ومعامل الامتحان؟",
    a: "لكل مادة معامل داخل المراقبة المستمرة ومعامل داخل الامتحان (الجهوي أو الوطني). هذه المعاملات تُستعمل لحساب معدل كل مكون على حدة، ثم تُجمع المكونات بالنسب: 25% جهوي، 25% مراقبة مستمرة، 50% وطني بالنسبة للرسميين.",
  },
  {
    q: "ما هي المادة الأعلى معاملاً في شعبة العلوم الرياضية؟",
    a: "الرياضيات بمعامل 9 في الامتحان الوطني، تليها الفيزياء والكيمياء بمعامل 7.",
  },
  {
    q: "ما الفرق بين العلوم الرياضية أ والعلوم الرياضية ب؟",
    a: "في الامتحان الوطني، شعبة العلوم الرياضية (أ) تجتاز مادة علوم الحياة والأرض بمعامل 3، بينما شعبة العلوم الرياضية (ب) تجتاز مادة علوم المهندس بمعامل 3. باقي المعاملات متشابهة.",
  },
  {
    q: "هل المعاملات نفسها للمترشحين الأحرار؟",
    a: "معاملات الامتحان الوطني هي نفسها. لكن الأحرار لا تُحتسب لهم المراقبة المستمرة، وقد يجتازون في الجهوي مواد إضافية (مثل الترجمة في الشعب العلمية). راجع دليل الترشيح الرسمي لسنتك.",
  },
  {
    q: "هل يمكن أن تتغير هذه المعاملات؟",
    a: "نعم، قد تتغير مع الإصلاحات أو المذكرات الجديدة. هذه الجداول مبنية على آخر المصادر التي اطلعنا عليها (أكتوبر 2026). إذا لاحظت اختلافاً مع مذكرة رسمية، راسلنا لنصححه.",
  },
];

export default function CoefficientsPage() {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-white">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-14 text-right space-y-12">
          <header className="space-y-4">
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
              معاملات الباكالوريا بالمغرب لجميع الشعب
            </h1>
            <p className="text-lg text-slate-600 font-semibold leading-relaxed">
              جداول معاملات مواد الامتحان الجهوي (الأولى باكالوريا) والامتحان الوطني (الثانية باكالوريا)، مع مجموع
              المعاملات لكل شعبة. آخر مراجعة: أكتوبر 2026.
            </p>
            <nav aria-label="الشعب" className="flex flex-wrap gap-2 text-sm font-bold">
              {[...SCI_TRACKS, ...LSH_TRACKS].map((t) => (
                <a
                  key={t.id}
                  href={`#${t.id}`}
                  className="px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 hover:border-emerald-400 text-slate-800"
                >
                  {t.nameAr}
                </a>
              ))}
            </nav>
          </header>

          <section className="space-y-5">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">الامتحان الوطني (الثانية باكالوريا)</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {SCI_TRACKS.map((t) => (
                <CoefTable key={t.id} id={t.id} title={t.nameAr} subjects={t.national} />
              ))}
              {LSH_TRACKS.map((t) => (
                <CoefTable key={t.id} id={t.id} title={t.nameAr} subjects={t.national} />
              ))}
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">الامتحان الجهوي (الأولى باكالوريا)</h2>
            <p className="text-slate-600 leading-relaxed">
              هذه مواد الجهوي للمترشحين الرسميين. المترشحون الأحرار قد يجتازون مواد إضافية حسب الشعبة.
            </p>
            <div className="grid sm:grid-cols-3 gap-5">
              <CoefTable title="الشعب العلمية والرياضية" subjects={SCI_REGIONAL} />
              <CoefTable title="العلوم الاقتصادية والتدبير" subjects={ECO_REGIONAL} />
              <CoefTable title="الآداب والعلوم الإنسانية" subjects={LSH_REGIONAL} />
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">احسب معدلك بهذه المعاملات</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              <Link href="/calculateur" className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:border-emerald-400 font-bold text-slate-900">
                الشعب العلمية والاقتصادية ←
              </Link>
              <Link href="/calculateur/lettres-sciences-humaines" className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:border-emerald-400 font-bold text-slate-900">
                الآداب والعلوم الإنسانية ←
              </Link>
              <Link href="/calculateur/bac-libre" className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:border-emerald-400 font-bold text-slate-900">
                الباك الحر (الأحرار) ←
              </Link>
            </div>
          </section>

          <p className="text-sm text-slate-500 leading-relaxed border-t border-slate-200 pt-6">
            المصادر: جداول تنظيم امتحانات البكالوريا المنشورة على tawjih.info، ودليل مواد الامتحان الوطني والجهوي على
            9rayti.com، ورؤوس مواضيع امتحانات وطنية سابقة. تأكد دائماً من المذكرة الرسمية لوزارة التربية الوطنية.
          </p>
        </article>

        <FaqSection items={FAQ} />
      </main>
      <Footer />
    </div>
  );
}
