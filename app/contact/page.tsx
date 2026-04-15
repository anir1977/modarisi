import Link from "next/link";
import { GraduationCap, Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export default function ContactPage() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Nous contacter</h1>
          <p className="text-gray-500">Notre équipe répond sous 24h</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {/* WhatsApp */}
          <a
            href="https://wa.me/212663275760"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:border-emerald-200 hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
              <MessageCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">WhatsApp</p>
              <p className="text-sm text-gray-500">+212 663 275 760</p>
              <p className="text-xs text-emerald-600 mt-0.5">Réponse rapide</p>
            </div>
          </a>

          {/* Email */}
          <a
            href="mailto:contact@modarisi.ma"
            className="flex items-center gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:border-blue-200 hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Email</p>
              <p className="text-sm text-gray-500">contact@modarisi.ma</p>
              <p className="text-xs text-blue-600 mt-0.5">Sous 24h</p>
            </div>
          </a>
        </div>

        {/* Address */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="w-5 h-5 text-gray-400" />
            <span className="font-semibold text-gray-900">Adresse</span>
          </div>
          <p className="text-gray-500 text-sm ml-8">Casablanca, Maroc 🇲🇦</p>
        </div>

        {/* Hours */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center">
          <h2 className="font-semibold text-gray-900 mb-2">Horaires de support</h2>
          <p className="text-gray-600 text-sm">Lundi – Vendredi : 9h00 – 18h00</p>
          <p className="text-gray-600 text-sm">Samedi : 10h00 – 14h00</p>
          <p className="text-gray-400 text-xs mt-2">Nour (l'IA) est disponible 24h/7j</p>
        </div>
      </main>
    </div>
  );
}
