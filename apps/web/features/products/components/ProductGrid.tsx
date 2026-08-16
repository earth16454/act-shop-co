"use client";

import React from "react";

import { ProductCartControl } from "@/features/cart/components/ProductCartControl";
import { useCart } from "@/features/cart/hooks/useCart";
import type { Product } from "../api/products";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const { data: cart } = useCart();

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
              item={cart?.items.find(
                (cartItem) => cartItem.productId === product.id,
              )}
            />
          }
        />
      ))}
    </div>
  );
};
