import {
  DEFAULT_PRODUCTS_QUERY,
  type ProductsQuery,
} from "@/features/products/api/products";

export const MIN_PRODUCT_PRICE = 0;
export const MAX_PRODUCT_PRICE = 300;

export interface ProductFilters {
  q?: string;
  minPrice: number;
  maxPrice: number;
  colorIds: string[];
  sizeIds: string[];
}

type SearchParamsInput =
  | URLSearchParams
  | Readonly<Pick<URLSearchParams, "get">>
  | Record<string, string | string[] | undefined>;

const readParam = (params: SearchParamsInput, key: string) => {
  const get = (params as { get?: unknown }).get;
  if (typeof get === "function") {
    return (get.call(params, key) as string | null) ?? undefined;
  }

  const value = (params as Record<string, string | string[] | undefined>)[key];
  return Array.isArray(value) ? value[0] : value;
};

const parseIds = (value: string | undefined) =>
  Array.from(
    new Set(
      (value ?? "")
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean),
    ),
  );

const parsePrice = (value: string | undefined, fallback: number) => {
  if (!value?.trim()) return fallback;

  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;

  return Math.min(MAX_PRODUCT_PRICE, Math.max(MIN_PRODUCT_PRICE, parsed));
};

export const parseProductFilters = (
  params: SearchParamsInput,
): ProductFilters => {
  const q = readParam(params, "q")?.trim() || undefined;
  const firstPrice = parsePrice(
    readParam(params, "minPrice"),
    MIN_PRODUCT_PRICE,
  );
  const secondPrice = parsePrice(
    readParam(params, "maxPrice"),
    MAX_PRODUCT_PRICE,
  );

  return {
    q,
    minPrice: Math.min(firstPrice, secondPrice),
    maxPrice: Math.max(firstPrice, secondPrice),
    colorIds: parseIds(readParam(params, "colorIds")),
    sizeIds: parseIds(readParam(params, "sizeIds")),
  };
};

export const productFiltersToQuery = (
  filters: ProductFilters,
): ProductsQuery => ({
  ...DEFAULT_PRODUCTS_QUERY,
  q: filters.q,
  minPrice: filters.minPrice,
  maxPrice: filters.maxPrice,
  colorIds: filters.colorIds.length > 0 ? filters.colorIds : undefined,
  sizeIds: filters.sizeIds.length > 0 ? filters.sizeIds : undefined,
});

export const productFiltersToSearchParams = (filters: ProductFilters) => {
  const params = new URLSearchParams();

  if (filters.q) params.set("q", filters.q);
  if (filters.minPrice !== MIN_PRODUCT_PRICE) {
    params.set("minPrice", String(filters.minPrice));
  }
  if (filters.maxPrice !== MAX_PRODUCT_PRICE) {
    params.set("maxPrice", String(filters.maxPrice));
  }
  if (filters.colorIds.length > 0) {
    params.set("colorIds", filters.colorIds.join(","));
  }
  if (filters.sizeIds.length > 0) {
    params.set("sizeIds", filters.sizeIds.join(","));
  }

  return params;
};

export const productFiltersUrl = (
  pathname: string,
  filters: ProductFilters,
) => {
  const query = productFiltersToSearchParams(filters).toString();
  return query ? `${pathname}?${query}` : pathname;
};
