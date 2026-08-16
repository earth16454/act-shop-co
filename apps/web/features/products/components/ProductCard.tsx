import React from "react";
import Image from "next/image";
import type { Product } from "../api/products";
import { ProductRating } from "./ProductRating";

interface ProductCardProps {
  product: Product;
}

const formatPrice = (price: number) => `$${price.toLocaleString("en-US")}`;

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const isDiscounted = product.percentageDiscount > 0;

  return (
    <article className="min-w-0">
      <div className="relative aspect-3/4 w-full overflow-hidden rounded-2xl bg-primary/10">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 28vw, (min-width: 768px) 42vw, (min-width: 640px) 33vw, (min-width: 480px) 50vw, 100vw"
          className="object-cover transition-transform duration-400 hover:scale-[1.1]"
        />
      </div>

      <div className="pt-4">
        <h2 className="line-clamp-2 text-base font-bold tracking-tight sm:text-lg">
          {product.name}
        </h2>

        <ProductRating rating={product.rating} />

        <div className="mt-2 flex flex-wrap items-center gap-2">
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
