import { queryOptions } from "@tanstack/react-query";
import type { Treaty } from "@elysiajs/eden";

import { api } from "@/lib/eden";

type ProductsGetOptions = NonNullable<Parameters<typeof api.products.get>[0]>;

export type ProductsQuery = NonNullable<ProductsGetOptions["query"]>;
export type ProductsPage = Treaty.Data<typeof api.products.get>;
export type Product = ProductsPage["items"][number];

export const DEFAULT_PRODUCTS_QUERY = {
  limit: 12,
  offset: 0,
} satisfies ProductsQuery;

export const productKeys = {
  all: ["products"] as const,
  list: (query: ProductsQuery) => [...productKeys.all, "list", query] as const,
};

const errorMessage = (value: unknown) => {
  if (
    typeof value === "object" &&
    value !== null &&
    "message" in value &&
    typeof value.message === "string"
  ) {
    return value.message;
  }

  return "We couldn't load the products. Please try again.";
};

export const fetchProducts = async (
  query: ProductsQuery,
): Promise<ProductsPage> => {
  const { data, error } = await api.products.get({ query });

  if (error) throw new Error(errorMessage(error.value));

  return data;
};

export const productsQueryOptions = (
  query: ProductsQuery = DEFAULT_PRODUCTS_QUERY,
) =>
  queryOptions({
    queryKey: productKeys.list(query),
    queryFn: () => fetchProducts(query),
  });
