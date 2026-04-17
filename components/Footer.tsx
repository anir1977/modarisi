import React from "react";
import Link from "next/link";
import { GraduationCap, Mail, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.2 2.8 12 2.8 12 2.8s-4.2 0-6.8.1c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.2.7 11.4v2c0 2.2.3 4.4.3 4.4s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.5 22 12 22 12 22s4.2 0 6.8-.2c.6-.1 1.9-.1 3-1.2.9-.8 1.2-2.8 1.2-2.8s.3-2.2.3-4.4v-2C23.3 9.2 23 7 23 7zM9.7 15.5V8.4l8.1 3.6-8.1 3.5z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const socialLinks = [
  {
    href: "https://instagram.com/modarisi.ma",
    icon: InstagramIcon,
    label: "Instagram",
  },
  {
    href: "https://youtube.com/@modarisi",
    icon: YouTubeIcon,
    label: "YouTube",
  },
  {
    href: "https://wa.me/212663275760",
    icon: WhatsAppIcon,
    label: "WhatsApp",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-300 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Modarisi<span className="text-blue-400">.</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              La plateforme de tutorat par IA pour les collégiens marocains.
              Posez vos questions en Darija ou en français.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/8 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/15 transition-all"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Produit */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Produit</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/programme", label: "Cours par matière" },
                { href: "/pricing", label: "Tarifs" },
                { href: "/chat", label: "Essayer le Chat IA" },
                { href: "/auth/register", label: "S'inscrire gratuitement" },
                { href: "/tashih", label: "Correction d'exercices" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-400 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Aide */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Aide</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/faq", label: "FAQ" },
                { href: "/guide", label: "Guide d'utilisation" },
                { href: "/contact", label: "Nous contacter" },
                { href: "/blog", label: "Blog" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-400 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal + Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Légal</h4>
            <ul className="space-y-2.5 text-sm mb-6">
              {[
                { href: "/privacy", label: "Politique de confidentialité" },
                { href: "/terms", label: "Conditions d'utilisation" },
                { href: "/cookies", label: "Cookies" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-400 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="space-y-2 text-sm">
              <a href="mailto:contact@modarisi.ma" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4 shrink-0" />
                contact@modarisi.ma
              </a>
              <span className="flex items-start gap-2 text-gray-400">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                Casablanca, Maroc 🇲🇦
              </span>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-white/8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <p>© {year} Modarisi. Tous droits réservés.</p>
          <p className="flex items-center gap-1.5">
            Conçu avec ❤️ pour les collégiens marocains
          </p>
        </div>
      </div>
    </footer>
  );
}
