import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calculator, FileText, MessageCircleQuestion, TriangleAlert } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { LSH_REGIONAL, LSH_TRACKS } from "@/lib/tracks-lsh";
import { OG_IMAGES } from "@/lib/seo";

const TITLE = "الباك الحر بالمغرب: المواد والمعاملات وخطة المراجعة | مدرسي";
const DESCRIPTION =
  "دليل المترشحين الأحرار لشعبة الآداب والعلوم الإنسانية: مواد الجهوي والوطني، المعاملات، الدروس، الامتحانات المصححة، وخطة مراجعة من 16 أسبوعاً.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/bac-libre" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/bac-libre", type: "website", locale: "ar_MA", images: OG_IMAGES },
};

const LESSONS = [
  { name: "الفلسفة", href: "/dourous/falsafa", about: "12 مفهوماً بالمحاور والمواقف" },
  { name: "التاريخ والجغرافيا", href: "/dourous/tarikh-jughrafiya", about: "الدروس والتواريخ والمفاهيم" },
  { name: "اللغة العربية", href: "/dourous/al-arabiya", about: "الشعر الحديث ومنهجية التحليل" },
  { name: "اللغة الإنجليزية", href: "/dourous/anglais", about: "Grammar, vocabulary and writing" },
  { name: "اللغة الفرنسية", href: "/dourous/francais-1bac", about: "Les œuvres et la méthodologie" },
];

const PLAN = [
  { weeks: "الأسابيع 1 - 2", title: "ابدأ بالصورة الكاملة", text: "تأكد من شعبتك ومواد امتحانك، واجمع الدروس، وحل امتحاناً واحداً لتعرف مستواك." },
  { weeks: "الأسابيع 3 - 8", title: "ادرس المواد ذات المعامل الأكبر", text: "خصص أغلب الوقت لمواد الوطني، وادرس درساً أو درسين في اليوم مع تلخيص بكلماتك." },
  { weeks: "الأسابيع 9 - 12", title: "أكمل مواد الجهوي", text: "راجع الفرنسية والتربية الإسلامية والرياضيات، ولا تتوقف عن مراجعة ما درسته سابقاً." },
  { weeks: "الأسابيع 13 - 15", title: "تدرب بشروط الامتحان", text: "حل مواضيع كاملة في الوقت المحدد، ثم قارن إجابتك بالتصحيح واكتب أخطاءك المتكررة." },
  { weeks: "الأسبوع 16", title: "راجع بهدوء", text: "ركز على الملخصات والأخطاء المتكررة، ونظم نومك، وتأكد من وثائق يوم الامتحان." },
];

export default function BacLibreHub() {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-white">
        <div className="bg-[#2b2fb3] text-white">
          <div className="max-w-[1240px] mx-auto px-5 py-14 text-right space-y-4">
            <h1 className="font-display text-5xl sm:text-6xl leading-tight">الباك الحر</h1>
            <p className="text-lg text-white/85 max-w-2xl">
              كل ما يحتاجه المترشح الحر في شعبة الآداب والعلوم الإنسانية: المواد، المعاملات، الدروس، الامتحانات وخطة مراجعة.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/calculateur/bac-libre" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#f2b233] !text-[#121322] font-bold">
                <Calculator size={18} aria-hidden="true" /> احسب معدلك
              </Link>
              <Link href="/examens" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white !text-[#2b2fb3] font-bold">
                <FileText size={18} aria-hidden="true" /> الامتحانات المصححة
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-[1240px] mx-auto px-5 py-12 space-y-14 text-right">
          <aside className="flex gap-3 p-5 rounded-2xl bg-[#f2b233]/20 text-[#121322]">
            <TriangleAlert size={22} className="shrink-0 mt-0.5" aria-hidden="true" />
            <p className="leading-relaxed">
              <strong>قبل التسجيل:</strong> تتغير الآجال والوثائق من دورة إلى أخرى. لا نذكر هنا مواعيد التسجيل حتى لا نضللك، لذلك تأكد منها في{" "}
              <a href="https://www.men.gov.ma" target="_blank" rel="noopener noreferrer" className="underline font-bold">موقع وزارة التربية الوطنية</a>{" "}
              ولدى مديريتك الإقليمية، وتأكد كذلك من المواد والمعاملات المعتمدة لدورتك.
            </p>
          </aside>

          <section aria-labelledby="exam" className="space-y-5">
            <header className="space-y-2">
              <h2 id="exam" className="font-display text-4xl text-[#121322]">المواد والمعاملات</h2>
              <p className="text-[#4a4c63] leading-relaxed max-w-3xl">
                المترشح الحر غير معني بالمراقبة المستمرة، ويجتاز مواد الجهوي والوطني في الدورة نفسها، ويحسب معدله العام بجمع النقط مضروبة في المعاملات.
              </p>
            </header>
            <div className="grid lg:grid-cols-3 gap-4">
              <ExamCard title="مواد الجهوي" note="للمسلكين معاً" subjects={LSH_REGIONAL} />
              {LSH_TRACKS.map((track) => (
                <ExamCard key={track.id} title={track.nameAr} note="مواد الوطني" subjects={track.national} />
              ))}
            </div>
          </section>

          <section aria-labelledby="lessons" className="space-y-5">
            <h2 id="lessons" className="font-display text-4xl text-[#121322]">الدروس المتوفرة</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {LESSONS.map((l) => (
                <Link key={l.href} href={l.href} className="group flex items-center justify-between gap-3 p-5 rounded-2xl border-2 border-[#121322] hover:bg-[#f2b233]/25 transition-colors">
                  <span>
                    <span className="block text-xl font-bold text-[#121322]">{l.name}</span>
                    <span className="block text-sm text-[#4a4c63] mt-1">{l.about}</span>
                  </span>
                  <ArrowLeft size={20} className="shrink-0 text-[#2b2fb3] transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                </Link>
              ))}
            </div>
            <p className="text-sm text-[#4a4c63]">دروس التربية الإسلامية والرياضيات الخاصة بهذه الشعبة قيد الإعداد.</p>
          </section>

          <section aria-labelledby="plan" className="space-y-5">
            <header className="space-y-2">
              <h2 id="plan" className="font-display text-4xl text-[#121322]">خطة مراجعة من 16 أسبوعاً</h2>
              <p className="text-[#4a4c63]">خطة مقترحة يمكنك تعديلها حسب وقتك ومستواك.</p>
            </header>
            <ol className="grid md:grid-cols-2 gap-4">
              {PLAN.map((step) => (
                <li key={step.weeks} className="p-5 rounded-2xl bg-slate-50">
                  <span className="text-sm font-bold text-[#2b2fb3]">{step.weeks}</span>
                  <h3 className="text-xl font-bold text-[#121322] mt-1">{step.title}</h3>
                  <p className="text-[#4a4c63] leading-relaxed mt-1">{step.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-[#121322] text-white">
            <div>
              <h2 className="text-2xl font-bold">عالق في درس؟</h2>
              <p className="text-white/80 mt-1">اسأل الأستاذ الافتراضي، وراجع جوابه مع الدرس لأنه قد يخطئ.</p>
            </div>
            <Link href="/tuteur" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#f2b233] !text-[#121322] font-bold">
              <MessageCircleQuestion size={18} aria-hidden="true" /> اسأل الأستاذ
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ExamCard({ title, note, subjects }: { title: string; note: string; subjects: { id: string; name: string; coef: number }[] }) {
  return (
    <div className="p-5 rounded-2xl border-2 border-[#121322]">
      <span className="text-sm font-bold text-[#2b2fb3]">{note}</span>
      <h3 className="text-xl font-bold text-[#121322] mb-3">{title}</h3>
      <ul className="divide-y divide-slate-200">
        {subjects.map((s) => (
          <li key={s.id} className="flex items-center justify-between gap-3 py-2.5">
            <span className="text-[#121322]">{s.name}</span>
            <span className="shrink-0 text-sm font-bold text-[#4a4c63]">معامل {s.coef}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
