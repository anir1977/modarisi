import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BacCalculator } from "@/components/bac-calculator";

export const metadata: Metadata = {
  title: "حاسبة معدل الباكالوريا والميزات والمدارس العليا | مدرسي modarisi.ma",
  description: "احسب معدلك النهائي في البكالوريا وفق صيغة وزارة التربية الوطنية بالمغرب (25% جهوي + 25% مراقبة مستمرة + 50% وطني)، وتعرف على ميزتك والمدارس العليا المتاحة.",
};

export default function CalculateurPage() {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <BacCalculator />
      </main>
      <Footer />
    </div>
  );
}
