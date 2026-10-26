import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ExamSimulator } from "@/components/exam-simulator";

export const metadata: Metadata = {
  title: "محاكي الامتحان الوطني الموحد مع المؤقت والتلميحات | مدرسي modarisi.ma",
  description: "تدرب على تمارين نموذجية في ظروف قريبة من الامتحان الوطني مع عداد زمني، تلميحات بيداغوجية، وتصحيح مقترح.",
  alternates: { canonical: "/simulateur" },
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
