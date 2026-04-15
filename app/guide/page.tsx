import Link from "next/link";
import { GraduationCap, MessageCircle, BookOpen, Star, Zap } from "lucide-react";

const steps = [
  {
    icon: <GraduationCap className="w-6 h-6 text-blue-600" />,
    title: "1. Crée ton compte",
    desc: "Inscris-toi gratuitement avec ton email. C'est rapide — moins de 2 minutes.",
  },
  {
    icon: <BookOpen className="w-6 h-6 text-emerald-600" />,
    title: "2. Choisis ta matière",
    desc: "Dans le chat, sélectionne la matière sur laquelle tu veux travailler : Maths, Physique, SVT, Français…",
  },
  {
    icon: <MessageCircle className="w-6 h-6 text-purple-600" />,
    title: "3. Pose ta question",
    desc: "Écris ta question en Darija ou en français. Décris ton problème ou colle l'énoncé de ton exercice.",
  },
  {
    icon: <Star className="w-6 h-6 text-amber-500" />,
    title: "4. Reçois une explication",
    desc: "Nour, ton tuteur IA, t'explique la solution étape par étape de façon claire et simple.",
  },
  {
    icon: <Zap className="w-6 h-6 text-rose-500" />,
    title: "5. Continue à apprendre",
    desc: "Pose autant de questions que tu veux. Passe au plan Pro pour un accès illimité.",
  },
];

const tips = [
  "Donne le maximum de détails dans ta question (niveau, matière, chapitre).",
  "Tu peux coller directement l'énoncé de ton exercice.",
  "Si tu n'as pas compris, demande à Nour d'expliquer différemment.",
  "Utilise le chat pour réviser avant les examens.",
];

export default function GuidePage() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Guide d'utilisation</h1>
          <p className="text-gray-500">Comment utiliser Modarisi pour progresser rapidement</p>
        </div>

        {/* Steps */}
        <div className="space-y-4 mb-12">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                {step.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 mb-10">
          <h2 className="font-bold text-gray-900 mb-4">💡 Conseils pour de meilleurs résultats</h2>
          <ul className="space-y-2">
            {tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center">
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Commencer gratuitement
          </Link>
        </div>
      </main>
    </div>
  );
}
