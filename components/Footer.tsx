import React from "react";
import Link from "next/link";
import { GraduationCap, Mail, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";

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
  { href: "https://instagram.com/modarisi.ma", icon: InstagramIcon, label: "Instagram" },
  { href: "https://youtube.com/@modarisi",     icon: YouTubeIcon,   label: "YouTube" },
  { href: "https://wa.me/212663275760",        icon: WhatsAppIcon,  label: "WhatsApp" },
];

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 text-gray-600 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                Modarisi<span className="text-blue-500">.</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed mb-5">
              {t("tagline")}
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Produit */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4 text-sm uppercase tracking-wider">{t("product")}</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/cours",         label: t("courses") },
                { href: "/pricing",       label: t("pricing") },
                { href: "/chat",          label: t("chat") },
                { href: "/auth/register", label: t("register") },
                { href: "/tashih",        label: t("correction") },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-500 hover:text-gray-900 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Aide */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4 text-sm uppercase tracking-wider">{t("help")}</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/faq",     label: t("faq") },
                { href: "/guide",   label: t("guide") },
                { href: "/contact", label: t("contact") },
                { href: "/blog",    label: t("blog") },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-500 hover:text-gray-900 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal + Contact */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4 text-sm uppercase tracking-wider">{t("legal")}</h4>
            <ul className="space-y-2.5 text-sm mb-6">
              {[
                { href: "/privacy", label: t("privacy") },
                { href: "/terms",   label: t("terms") },
                { href: "/cookies", label: t("cookies") },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-500 hover:text-gray-900 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="space-y-2 text-sm">
              <a href="mailto:contact@modarisi.ma" className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors">
                <Mail className="w-4 h-4 shrink-0" />
                contact@modarisi.ma
              </a>
              <span className="flex items-start gap-2 text-gray-500">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                Casablanca, Maroc 🇲🇦
              </span>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-200" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p>© {year} Modarisi. {t("rights")}.</p>
          <p className="flex items-center gap-1.5">
            {t("made_with")} ❤️ {t("for_students")}
          </p>
        </div>
      </div>
    </footer>
  );
}
