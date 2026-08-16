import { Skeleton } from "@/components/ui/Skeleton";
import React from "react";

const SKELETON_ITEMS = 12;

export const ProductGridSkeleton: React.FC = () => {
  return (
    <div
      className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
      aria-label="Loading products"
      aria-busy="true"
    >
      {Array.from({ length: SKELETON_ITEMS }, (_, index) => (
        <div key={index} className="flex flex-col gap-3">
          <Skeleton className="aspect-3/4 rounded-2xl mb-2" />
          <Skeleton className="h-5 w-4/5" />
          <Skeleton className="h-4 w-3/5" />
          <Skeleton className="h-6 w-2/5" />
        </div>
      ))}
    </div>
  );
};
