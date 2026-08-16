import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import {
  DEFAULT_PRODUCTS_QUERY,
  infiniteProductsQueryOptions,
  type ProductsQuery,
  type Product,
} from "../api/products";

export const useProducts = (query: ProductsQuery = DEFAULT_PRODUCTS_QUERY) => {
  const productsQuery = useInfiniteQuery(infiniteProductsQueryOptions(query));
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = productsQuery;

  const { ref: loadMoreRef, inView } = useInView({
    rootMargin: "400px 0px",
    skip: !hasNextPage || isFetchNextPageError,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isFetchNextPageError) {
      void fetchNextPage();
    }
  }, [
    inView,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
    fetchNextPage,
  ]);

  const products: Product[] =
    productsQuery.data?.pages.flatMap((page) => page.items) ?? [];

  return {
    products,
    productsQuery,
    loadMoreRef,
  };
};
