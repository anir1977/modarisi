export type FaqItem = { q: string; a: string };

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function FaqSection({ items, children }: { items: FaqItem[]; children?: React.ReactNode }) {
  return (
    <section className="bg-white border-t border-slate-200 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-10 text-right">
        {children}
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">أسئلة شائعة</h2>
          <div className="space-y-3">
            {items.map((f) => (
              <details key={f.q} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 open:bg-white">
                <summary className="cursor-pointer font-black text-slate-900">{f.q}</summary>
                <p className="mt-3 text-slate-700 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(items)) }} />
    </section>
  );
}
