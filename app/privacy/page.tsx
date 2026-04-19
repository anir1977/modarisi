import Link from "next/link";
import { GraduationCap } from "lucide-react";

const sections = [
  {
    title: "1. Données collectées",
    content: `Nous collectons les informations suivantes lors de votre inscription :
• Adresse email
• Nom complet
• Numéro de téléphone (optionnel)

Lors de l'utilisation du chat, nous enregistrons les messages échangés avec Nour afin d'améliorer le service.`,
  },
  {
    title: "2. Utilisation des données",
    content: `Vos données sont utilisées uniquement pour :
• Vous permettre d'accéder à votre compte
• Personnaliser votre expérience d'apprentissage
• Améliorer la qualité de notre service
• Vous envoyer des notifications importantes sur votre compte`,
  },
  {
    title: "3. Protection des données",
    content: `Toutes les données sont chiffrées en transit (HTTPS/TLS) et au repos. Nous utilisons Supabase, une infrastructure sécurisée conforme aux standards européens (hébergement en EU).

Vos données ne sont jamais vendues ni partagées avec des tiers à des fins commerciales.`,
  },
  {
    title: "4. Données des mineurs",
    content: `Modarisi est destiné aux collégiens. Conformément à la loi, nous prenons des précautions supplémentaires pour protéger les données des utilisateurs mineurs. L'inscription est autorisée avec le consentement parental.`,
  },
  {
    title: "5. Vos droits",
    content: `Vous disposez des droits suivants sur vos données :
• Droit d'accès : consulter vos données personnelles
• Droit de rectification : corriger vos données
• Droit à l'effacement : supprimer votre compte et vos données
• Droit à la portabilité : exporter vos données

Pour exercer ces droits, contactez-nous à : contact@modarisi.ma`,
  },
  {
    title: "6. Cookies et publicité",
    content: `Nous utilisons des cookies dans deux buts :

• Cookies essentiels : nécessaires au fonctionnement de la plateforme (session d'authentification, préférences de langue).

• Cookies publicitaires : Modarisi utilise Google AdSense pour afficher des publicités. Google peut utiliser des cookies pour afficher des annonces personnalisées selon les visites précédentes. Vous pouvez désactiver la personnalisation des annonces sur la page des paramètres de Google.

Les tiers fournisseurs, dont Google, utilisent des cookies pour diffuser des annonces basées sur les visites antérieures d'un internaute. Pour en savoir plus sur la façon dont Google utilise les données, consultez : policies.google.com/technologies/partner-sites`,
  },
  {
    title: "7. Contact",
    content: `Pour toute question relative à cette politique de confidentialité :
Email : contact@modarisi.ma
WhatsApp : +212 663 275 760`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
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
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Politique de confidentialité</h1>
          <p className="text-gray-400 text-sm">Dernière mise à jour : Avril 2026</p>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-8 text-sm text-blue-800">
          Nous prenons votre vie privée très au sérieux. Cette politique explique quelles données nous collectons, comment nous les utilisons et comment nous les protégeons.
        </div>

        <div className="space-y-6">
          {sections.map((section, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-bold text-gray-900 mb-3">{section.title}</h2>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{section.content}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
