import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";

export default function TashihLoading() {
  return (
    <div className="min-h-screen bg-gray-950">
      <div className="h-16 border-b border-white/5" />
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-8">
        <div className="text-center space-y-3">
          <Skeleton className="h-5 w-40 mx-auto" rounded="full" />
          <Skeleton className="h-10 w-96 mx-auto" />
          <Skeleton className="h-4 w-72 mx-auto" />
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <Skeleton className="lg:w-[250px] h-[500px]" rounded="2xl" />
          <Skeleton className="flex-1 h-[500px]" rounded="2xl" />
          <Skeleton className="lg:w-[400px] h-[500px]" rounded="2xl" />
        </div>
      </div>
    </div>
  );
}
