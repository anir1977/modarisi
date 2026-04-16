import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    avatar: "FZ",
    name: "Fatima Ez-zahra",
    role: "Élève · 3ème collège · Casablanca",
    rating: 5,
    comment: "Nour 3awnetni f les maths, daba fhamt kolchi! Kant khasra, daba ana l'meilleure f la classe 💪",
    darija: true,
    color: "from-blue-500 to-cyan-500",
  },
  {
    avatar: "MB",
    name: "Mohammed Benali",
    role: "Parent · Rabat",
    rating: 5,
    comment: "Wldti kaytswel Nour kola nhar, notes dyalha thasnat bzzaf. L'meilleur investissement dertoh l wlditi!",
    darija: true,
    color: "from-emerald-500 to-teal-500",
  },
  {
    avatar: "HA",
    name: "Houda Ait Ali",
    role: "Mère de 2 élèves · Fès",
    rating: 5,
    comment: "Arkhass men prof particulier o mzyano bzzaf! Wladi tzaw kaydiro les devoirs m3a Nour kol nhar.",
    darija: true,
    color: "from-violet-500 to-purple-500",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#060a14] relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-blue-400 font-semibold text-xs uppercase tracking-[0.2em] mb-3">
            Témoignages
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ce que disent les familles marocaines
          </h2>
          <p className="text-gray-500 text-lg">En Darija — parce que c'est ça, le Maroc authentique</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="group bg-white/3 border border-white/8 rounded-3xl p-7 hover:bg-white/5 hover:border-white/12 transition-all duration-300 flex flex-col"
            >
              {/* Top accent line */}
              <div className={`h-px w-12 bg-gradient-to-r ${t.color} mb-6 group-hover:w-20 transition-all duration-500`} />

              <Stars count={t.rating} />

              <blockquote className="text-gray-300 text-sm leading-relaxed mt-4 mb-6 flex-1 italic">
                &ldquo;{t.comment}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-xs shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{t.name}</p>
                  <p className="text-gray-600 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
