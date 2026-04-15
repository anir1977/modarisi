import Link from "next/link";
import { GraduationCap, ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Qu'est-ce que Modarisi ?",
    a: "Modarisi est une plateforme de tutorat par intelligence artificielle conçue spécialement pour les collégiens marocains (1ère, 2ème et 3ème année collège). Tu peux poser tes questions en Darija ou en français et recevoir des explications instantanées.",
  },
  {
    q: "Quelles matières sont couvertes ?",
    a: "Maths, Physique-Chimie, SVT, Français, Arabe, Éducation Islamique et Histoire-Géographie. Toutes les matières du programme marocain du collège.",
  },
  {
    q: "Puis-je poser des questions en Darija ?",
    a: "Oui ! Modarisi comprend le Darija marocain. Tu peux poser tes questions dans la langue avec laquelle tu te sens le plus à l'aise.",
  },
  {
    q: "C'est quoi la différence entre le plan Gratuit et Pro ?",
    a: "Le plan Gratuit te donne 5 questions par jour. Le plan Pro te donne un accès illimité, des réponses plus détaillées et une assistance prioritaire.",
  },
  {
    q: "Comment activer le plan Pro ?",
    a: "Va sur la page Tarifs, choisis ton plan et effectue un virement bancaire. L'équipe Modarisi activera ton compte dans les 24h.",
  },
  {
    q: "Mes données sont-elles sécurisées ?",
    a: "Oui. Toutes tes données sont chiffrées et stockées de façon sécurisée. Nous ne partageons jamais tes informations avec des tiers.",
  },
  {
    q: "Comment contacter le support ?",
    a: "Tu peux nous joindre via WhatsApp au +212663275760 ou par email à contact@modarisi.ma. Nous répondons sous 24h.",
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900">Modarisi</span>
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Questions fréquentes</h1>
          <p className="text-gray-500">Tout ce que tu dois savoir sur Modarisi</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-4 cursor-pointer">
              <summary className="flex items-center justify-between font-semibold text-gray-900 list-none">
                {faq.q}
                <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform shrink-0 ml-3" />
              </summary>
              <p className="mt-3 text-gray-600 text-sm leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm mb-4">Tu n'as pas trouvé ta réponse ?</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Nous contacter
          </Link>
        </div>
      </main>
    </div>
  );
}
