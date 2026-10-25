import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { TeacherDashboard } from "@/components/teacher-dashboard";

export const metadata: Metadata = {
  title: "فضاء الأستاذ · سجّل وبرمج حصصك المباشرة | مدرسي",
  description: "سجّل كأستاذ على مدرسي، أنشئ صفحتك، وبرمج حصص دعم مباشرة للتلاميذ.",
  robots: { index: false },
};

export default function Page() {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-slate-50 overflow-x-clip">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 text-right">
          <TeacherDashboard />
        </div>
      </main>
      <Footer />
    </div>
  );
}
