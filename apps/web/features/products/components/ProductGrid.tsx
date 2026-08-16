"use client";

import React, { useMemo } from "react";

import { ProductCartControl } from "@/features/cart/components/ProductCartControl";
import { useCart } from "@/features/cart/hooks/useCart";
import { ProductCard } from "./ProductCard";
import type { Product } from "../api/products";

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const cartQuery = useCart();

  const cartItemsByProductId = useMemo(() => {
    return new Map(
      cartQuery.data?.items.map((item) => [item.productId, item]) ?? [],
    );
  }, [cartQuery.data?.items]);

  const isCartUnavailable =
    cartQuery.isPending || (cartQuery.isError && cartQuery.data === undefined);

  return (
    <div className="grid w-full grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          priority={index === 0}
          action={
            <ProductCartControl
              productId={product.id}
              productName={product.name}
              item={cartItemsByProductId.get(product.id)}
              disabled={isCartUnavailable}
            />
          }
        />
      ))}
    </div>
  );
};
