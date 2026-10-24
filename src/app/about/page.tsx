import type { Metadata } from "next";
import Link from "next/link";
import { StaticPage, CONTACT_EMAIL } from "@/components/static-page";

export const metadata: Metadata = {
  title: "من نحن | مدرسي modarisi.ma",
  description: "تعرف على منصة مدرسي: أدوات مجانية لتلاميذ الباكالوريا بالمغرب لحساب المعدل والتدرب على الامتحانات.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <StaticPage title="من نحن">
      <p>
        «مدرسي» (modarisi.ma) منصة مغربية مستقلة، طورها مطور ويب من الدار البيضاء، هدفها مساعدة تلاميذ الباكالوريا
        والإعدادي على الاستعداد للامتحانات بأدوات بسيطة ومجانية.
      </p>

      <h2>ماذا نقدم؟</h2>
      <ul>
        <li>
          <Link href="/calculateur">حاسبة معدل الباكالوريا</Link> ونقطة الانتقاء للمدارس العليا.
        </li>
        <li>
          <Link href="/simulateur">محاكي الامتحان الوطني</Link> بعداد زمني وتمارين نموذجية.
        </li>
        <li>
          <Link href="/examens">نماذج تدريبية</Link> مع تصحيح منهجي.
        </li>
        <li>
          <Link href="/tuteur">أستاذ افتراضي</Link> مدعوم بالذكاء الاصطناعي لشرح الدروس والتمارين.
        </li>
      </ul>

      <h2>ما يجب أن تعرفه</h2>
      <ul>
        <li>«مدرسي» ليست تابعة لوزارة التربية الوطنية ولا لأي جهة رسمية.</li>
        <li>نتائج الحاسبات تقديرية، والمعدل الرسمي هو الذي تعلنه الوزارة.</li>
        <li>التمارين المعروضة نماذج تدريبية، وليست مواضيع أو تصحيحات رسمية إلا إذا أشرنا إلى ذلك صراحة.</li>
        <li>الأستاذ الافتراضي يعتمد على الذكاء الاصطناعي وقد يخطئ، لذا تحقق من الأجوبة مع أستاذك.</li>
      </ul>

      <h2>تواصل معنا</h2>
      <p>
        لأي ملاحظة أو خطأ في المعلومات، راسلنا على <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> أو عبر{" "}
        <Link href="/contact">صفحة الاتصال</Link>.
      </p>
    </StaticPage>
  );
}
