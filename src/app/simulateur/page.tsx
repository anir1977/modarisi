import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ExamSimulator } from "@/components/exam-simulator";

export const metadata: Metadata = {
  title: "محاكي الامتحان الوطني الموحد مع المؤقت والتلميحات | مدرسي modarisi.ma",
  description: "عش ظروف الامتحان الوطني الحقيقية مع عداد زمني، تلميحات بيداغوجية، وعناصر الإجابة الرسمية وسلم التنقيط لوزارة التربية الوطنية.",
};

export default function SimulateurPage() {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <ExamSimulator />
      </main>
      <Footer />
    </div>
  );
}
