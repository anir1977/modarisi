import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export function StaticPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-white">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-right space-y-6 text-slate-700 leading-loose [&_h2]:text-xl [&_h2]:font-black [&_h2]:text-slate-900 [&_h2]:pt-4 [&_ul]:list-disc [&_ul]:pr-6 [&_ul]:space-y-1 [&_a]:text-emerald-700 [&_a]:underline">
          <header className="space-y-2 border-b border-slate-200 pb-6">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900">{title}</h1>
            {updated && <p className="text-sm text-slate-500">آخر تحديث : {updated}</p>}
          </header>
          {children}
        </article>
      </main>
      <Footer />
    </div>
  );
}

export const CONTACT_EMAIL = "contact@modarisi.ma";
