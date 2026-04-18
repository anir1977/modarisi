"use client";

import React from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function CoursError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="text-center max-w-sm p-6">
        <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-6 h-6 text-red-400" />
        </div>
        <h2 className="text-white font-bold text-lg mb-2">Erreur de chargement</h2>
        <p className="text-gray-500 text-sm mb-5">Les cours n&apos;ont pas pu se charger.</p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-colors">
            Réessayer
          </button>
          <Link href="/" className="px-5 py-2.5 bg-white/5 text-gray-300 text-sm font-semibold rounded-xl hover:bg-white/10 transition-colors">
            Accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
