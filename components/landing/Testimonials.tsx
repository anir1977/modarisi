"use client";

import React from "react";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";

const testimonials = [
  {
    initials: "FZ",
    name: "Fatima Ez-zahra",
    location: "Casablanca",
    role: "Élève · 3ème collège",
    rating: 5,
    comment: "Nour 3awnetni f les maths, daba fhamt kolchi! Kant khasra, daba ana l'meilleure f la classe 💪",
    color: "from-blue-500 to-cyan-500",
  },
  {
    initials: "MB",
    name: "Mohammed Benali",
    location: "Rabat",
    role: "Parent",
    rating: 5,
    comment: "Wldti kaytswel Nour kola nhar, notes dyalha thasnat bzzaf. L'meilleur investissement dertoh l wlditi!",
    color: "from-emerald-500 to-teal-500",
  },
  {
    initials: "HA",
    name: "Houda Ait Ali",
    location: "Fès",
    role: "Mère de 2 élèves",
    rating: 5,
    comment: "Arkhass men prof particulier o mzyano bzzaf! Wladi tzaw kaydiro les devoirs m3a Nour kol nhar.",
    color: "from-violet-500 to-purple-500",
  },
  {
    initials: "YE",
    name: "Youssef El Idrissi",
    location: "Marrakech",
    role: "Élève · 2ème collège",
    rating: 5,
    comment: "Kayn shi app m3a Darija?! Hadi hiya! Nour kayfhemni mezyan, better men kol prof 😂",
    color: "from-amber-500 to-orange-500",
  },
  {
    initials: "SM",
    name: "Salma Mellouki",
    location: "Agadir",
    role: "Élève · 1ère collège",
    rating: 5,
    comment: "J'avais peur des SVT, maintenant j'adore grâce à Nour. Les explications sont super claires !",
    color: "from-rose-500 to-pink-500",
  },
  {
    initials: "KA",
    name: "Karim Amrani",
    location: "Tanger",
    role: "Parent · 2 enfants",
    rating: 5,
    comment: "Wladi kano kaykraho l3arabiya. M3a Nour, daba kayqraw b7al o 7al. Chokran Modarisi 🙏",
    color: "from-sky-500 to-blue-500",
  },
  {
    initials: "NB",
    name: "Nadia Boussaid",
    location: "Meknès",
    role: "Professeure",
    rating: 5,
    comment: "Je recommande Modarisi à tous mes élèves. C'est un vrai complément au cours, adapté au programme.",
    color: "from-indigo-500 to-violet-500",
  },
  {
    initials: "AO",
    name: "Amine Ouazzani",
    location: "Oujda",
    role: "Élève · 3ème collège",
    rating: 5,
    comment: "Bac l3am — 3awnetni Nour f revision o jat notes dyali 3la 20 f les maths. Incredible! 🔥",
    color: "from-fuchsia-500 to-pink-500",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <div className="flex-shrink-0 w-[340px] bg-white border border-gray-100 rounded-3xl p-6 flex flex-col gap-4 mx-3 shadow-sm hover:shadow-md transition-shadow">
      <Stars />
      <blockquote className="text-gray-600 text-base leading-relaxed italic flex-1">
        &ldquo;{t.comment}&rdquo;
      </blockquote>
      <div className="flex items-center gap-3">
        <div
          className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}
        >
          {t.initials}
        </div>
        <div>
          <p className="text-gray-900 text-sm font-bold leading-tight">{t.name}</p>
          <p className="text-gray-400 text-xs mt-0.5">
            {t.role} · {t.location}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <div className="text-center">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-[0.2em] mb-3">
            {t("badge")}
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {t("title")}
          </h2>
          <p className="text-gray-500 text-xl">{t("subtitle")}</p>

          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-gray-900 font-black text-2xl">4.9/5</span>
            <span className="text-gray-400 text-base">· {t("rating_count")}</span>
          </div>
        </div>
      </div>

      {/* Desktop: animated marquee */}
      <div className="relative w-full overflow-hidden hidden sm:block">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

        <div
          className="flex"
          style={{ animation: "marquee 40s linear infinite", width: "max-content" }}
        >
          {doubled.map((item, i) => (
            <TestimonialCard key={`${item.name}-${i}`} t={item} />
          ))}
        </div>
      </div>

      {/* Mobile: static grid */}
      <div className="sm:hidden grid grid-cols-1 gap-4 px-4">
        {testimonials.slice(0, 3).map((item) => (
          <TestimonialCard key={item.name} t={item} />
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .flex[style*="marquee"] { animation: none; }
        }
      `}</style>
    </section>
  );
}
