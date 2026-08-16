"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { productsQueryOptions } from "../api/products";
import { ProductGridSkeleton } from "./ProductGridSkeleton";
import { ProductGrid } from "./ProductGrid";
import { ErrorAlert } from "@/components/ui/ErrorAlert";
import { NotFoundAlert } from "@/components/ui/NotFoundAlert";

export const ProductList: React.FC = () => {
  const productsQuery = useQuery(productsQueryOptions());

  if (productsQuery.isPending) return <ProductGridSkeleton />;

  if (productsQuery.isError) {
    return (
      <ErrorAlert
        title="Products are unavailable"
        description={
          productsQuery.error ? productsQuery.error.message : "Unknown error"
        }
        onRetry={() => productsQuery.refetch()}
        isLoading={productsQuery.isFetching}
      />
    );
  }

  if (productsQuery.data.items.length === 0) {
    return (
      <NotFoundAlert
        title="No products found"
        description="There are no products to show right now."
      />
    );
  }

  return <ProductGrid products={productsQuery.data.items} />;
};
