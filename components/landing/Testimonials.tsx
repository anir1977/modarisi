import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Fatima Ez-zahra",
    role: "Élève, 3ème collège · Casablanca",
    avatar: "FE",
    rating: 5,
    comment:
      "Modarisi a complètement changé ma façon d'étudier ! J'avais peur des maths, maintenant j'ai confiance et mes notes s'améliorent chaque semaine.",
  },
  {
    name: "Mohammed Benali",
    role: "Parent · Rabat",
    avatar: "MB",
    rating: 5,
    comment:
      "En tant que père, j'étais inquiet pour mon fils en physique. Avec Modarisi, j'ai vu une grande amélioration en seulement deux mois. Le dashboard parent est très pratique.",
  },
  {
    name: "Houda Ait Ali",
    role: "Mère de 2 élèves · Fès",
    avatar: "HA",
    rating: 5,
    comment:
      "Mes deux enfants utilisent la plateforme tous les jours. Les prix sont très raisonnables et le service est excellent. Je recommande à tous les parents !",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-3">
            Témoignages
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ce que disent nos utilisateurs
          </h2>
          <p className="text-xl text-gray-500">
            Des familles marocaines qui nous font confiance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <Card key={t.name} className="card-hover border border-gray-100">
              <CardContent className="p-6">
                <Quote className="w-8 h-8 text-primary-200 mb-4" />

                <div className="flex mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                <p className="text-gray-700 text-sm leading-relaxed mb-5">
                  &quot;{t.comment}&quot;
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {t.name}
                    </p>
                    <p className="text-gray-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
