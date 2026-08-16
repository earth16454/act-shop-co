import React from "react";
import type { Product } from "../api/products";
import { ProductRating } from "./ProductRating";
import { ProductImage } from "./ProductImage";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  action?: React.ReactNode;
}

const formatPrice = (price: number) => `$${price.toLocaleString("en-US")}`;

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  priority = false,
  action,
}) => {
  const isDiscounted = product.percentageDiscount > 0;

  return (
    <article className="flex h-full min-w-0 flex-col">
      <div className="relative">
        <ProductImage
          src={product.imageUrl}
          alt={product.name}
          priority={priority}
        />

        {action ? (
          <div className="absolute right-3 bottom-3 z-10 sm:right-4 sm:bottom-4">
            {action}
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <h2 className="line-clamp-2 text-base font-bold tracking-tight sm:text-lg">
          {product.name}
        </h2>

        <ProductRating rating={product.rating} />

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xl font-bold xl:text-2xl">
            {formatPrice(product.discountedPrice)}
          </span>
          {isDiscounted ? (
            <>
              <span className="text-xl font-bold text-neutral-400 line-through">
                {formatPrice(product.price)}
              </span>
              <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-500">
                -{product.percentageDiscount}%
              </span>
            </>
          ) : null}
        </div>
      </div>
    </article>
  );
};
