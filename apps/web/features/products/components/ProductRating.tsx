import React from "react";
import Rating from "@/components/ui/Rating";

interface ProductRatingProps {
  rating: number;
}

export const ProductRating: React.FC<ProductRatingProps> = ({ rating }) => {
  return (
    <div
      className="flex items-end gap-3"
      aria-label={`${rating.toFixed(1)} out of 5 stars`}
    >
      <Rating
        initialValue={rating}
        allowFraction
        SVGclassName="inline-block"
        emptyClassName="fill-gray-50"
        size={20}
        readonly
      />

      <span className="text-black text-xs xl:text-sm  pb-0.5 xl:pb-0">
        {rating.toFixed(1)}
        <span className="text-black/60">/5</span>
      </span>
    </div>
  );
};
