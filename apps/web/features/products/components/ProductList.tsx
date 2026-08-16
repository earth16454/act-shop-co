"use client";

import React, { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { infiniteProductsQueryOptions } from "../api/products";
import { ProductGridSkeleton } from "./ProductGridSkeleton";
import { ProductGrid } from "./ProductGrid";
import { ErrorAlert } from "@/components/ui/ErrorAlert";
import { NotFoundAlert } from "@/components/ui/NotFoundAlert";

export const ProductList: React.FC = () => {
  const productsQuery = useInfiniteQuery(infiniteProductsQueryOptions());
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = productsQuery;
  const { ref: loadMoreRef, inView } = useInView({
    rootMargin: "400px 0px",
    skip: !hasNextPage,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

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

  const products = productsQuery.data.pages.flatMap((page) => page.items);

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
