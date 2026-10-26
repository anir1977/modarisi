import type { Metadata } from "next";

// page.tsx is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "الأستاذ الافتراضي بالذكاء الاصطناعي · اسأل وصوّر تمرينك | مدرسي modarisi.ma",
  description: "اطرح سؤالك أو صوّر تمرينك واحصل على شرح خطوة بخطوة حسب المقرر المغربي: الرياضيات، الفيزياء، علوم الحياة والأرض، الفلسفة والمزيد. مجاناً.",
  alternates: { canonical: "/tuteur" },
};

export default function TuteurLayout({ children }: { children: React.ReactNode }) {
  return children;
}
