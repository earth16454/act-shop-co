import React from "react";
import Link from "next/link";

import type { Product } from "../api/products";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <>
      <div className="grid w-full grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {products.map((product, index) => (
          <Link
            key={product.id}
            href={`/product/${product.id}/${product.name.split(" ").join("-")}`}
          >
            <ProductCard product={product} priority={index === 0} />
          </Link>
        ))}
      </div>
    </>
  );
};
