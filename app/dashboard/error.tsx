"use client";

import React from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <AlertTriangle className="w-7 h-7 text-red-400" />
        </div>
        <h2 className="text-white font-bold text-xl mb-2">Une erreur est survenue</h2>
        <p className="text-gray-400 text-sm mb-6">
          {error.message || "Le tableau de bord n'a pas pu se charger."}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            Réessayer
          </button>
          <Link
            href="/"
            className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 text-sm font-semibold rounded-xl transition-colors"
          >
            Accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
