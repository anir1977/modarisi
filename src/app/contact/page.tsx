import type { Metadata } from "next";
import { StaticPage, CONTACT_EMAIL } from "@/components/static-page";

export const metadata: Metadata = {
  title: "اتصل بنا | مدرسي modarisi.ma",
  description: "تواصل مع فريق منصة مدرسي لأي سؤال أو ملاحظة أو تصحيح.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <StaticPage title="اتصل بنا">
      <p>يسعدنا تلقي أسئلتكم وملاحظاتكم، خصوصاً إذا لاحظتم خطأ في معامل أو صيغة حساب أو تمرين.</p>

      <h2>البريد الإلكتروني</h2>
      <p>
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
      <p>نحاول الرد في أقرب وقت، عادة خلال بضعة أيام.</p>

      <h2>عند مراسلتنا عن خطأ</h2>
      <ul>
        <li>اذكر الصفحة المعنية (مثلاً: حاسبة المعدل).</li>
        <li>اذكر الشعبة والمستوى الدراسي.</li>
        <li>إن أمكن، أرفق مصدراً رسمياً (مذكرة وزارية أو إعلان مباراة).</li>
      </ul>
    </StaticPage>
  );
}
