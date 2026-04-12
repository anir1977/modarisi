import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-blue -z-10" />
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-32 -translate-y-32" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-48 translate-y-48" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <GraduationCap className="w-8 h-8 text-white" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Commencez votre parcours scolaire dès aujourd'hui
        </h2>
        <p className="text-primary-100 mb-10 max-w-xl mx-auto text-lg">
          Rejoignez plus de 5 000 élèves marocains qui utilisent Modarisi.
          Gratuit, sans carte bancaire.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="xl" variant="white" asChild>
            <Link href="/auth/register">
              Commencer gratuitement
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          <Button
            size="xl"
            variant="outline"
            className="border-white/40 text-white hover:bg-white/10 hover:text-white"
            asChild
          >
            <Link href="/pricing">Voir les tarifs</Link>
          </Button>
        </div>

        <p className="text-primary-200 text-sm mt-6">
          5 questions/jour gratuitement · Sans engagement · Annulable à tout moment
        </p>
      </div>
    </section>
  );
}
