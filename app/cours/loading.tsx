import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";

export default function CoursLoading() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Navbar skeleton */}
      <div className="h-16 border-b border-white/5 flex items-center px-8 gap-8">
        <Skeleton className="h-7 w-28" />
        <div className="flex gap-6 ml-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-16" />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-10">
        {/* Hero */}
        <div className="text-center space-y-4">
          <Skeleton className="h-5 w-40 mx-auto" rounded="full" />
          <Skeleton className="h-12 w-80 mx-auto" />
          <Skeleton className="h-5 w-64 mx-auto" />
        </div>

        {/* Level tabs */}
        <div className="flex gap-2 mx-auto w-fit">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-28" rounded="xl" />
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="bg-white/3 border border-white/8 rounded-2xl p-6 space-y-4">
              <Skeleton className="w-12 h-12" rounded="xl" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-1.5 w-full" rounded="full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
