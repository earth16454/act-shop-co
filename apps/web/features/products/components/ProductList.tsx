"use client";

import React from "react";
import { useProducts } from "../hooks/useProducts";
import { ProductGridSkeleton } from "./ProductGridSkeleton";
import { ProductGrid } from "./ProductGrid";
import { ErrorAlert } from "@/components/ui/ErrorAlert";
import { NotFoundAlert } from "@/components/ui/NotFoundAlert";

export const ProductList: React.FC = () => {
  const { products, productsQuery, loadMoreRef } = useProducts();

  if (productsQuery.isPending) return <ProductGridSkeleton />;

  if (productsQuery.isError && productsQuery.data === undefined) {
    return (
      <ErrorAlert
        title="Products are unavailable"
        description={productsQuery.error.message}
        onRetry={() => productsQuery.refetch()}
        isLoading={productsQuery.isFetching}
      />
    );
  }

  if (products.length === 0) {
    return (
      <NotFoundAlert
        title="No products found"
        description="There are no products to show right now."
      />
    );
  }

  return (
    <>
      <ProductGrid products={products} />

      {productsQuery.isFetchNextPageError ? (
        <div className="mt-8">
          <ErrorAlert
            title="More products couldn't be loaded"
            description={productsQuery.error.message}
            onRetry={() => productsQuery.fetchNextPage()}
            isLoading={productsQuery.isFetchingNextPage}
          />
        </div>
      ) : (
        <>
          <div ref={loadMoreRef} className="h-px" aria-hidden="true" />

          {productsQuery.isFetchingNextPage ? (
            <div
              className="py-10 text-center text-sm text-black/60"
              role="status"
            >
              Loading more products…
            </div>
          ) : null}
        </>
      )}
    </>
  );
};
