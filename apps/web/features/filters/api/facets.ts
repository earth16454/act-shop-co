import { queryOptions } from "@tanstack/react-query";
import type { Treaty } from "@elysiajs/eden";

import { api } from "@/lib/eden";

export type Colors = Treaty.Data<typeof api.colors.get>;
export type Color = Colors[number];
export type Sizes = Treaty.Data<typeof api.sizes.get>;
export type Size = Sizes[number];

const facetKeys = {
  colors: ["facets", "colors"] as const,
  sizes: ["facets", "sizes"] as const,
};

const errorMessage = (value: unknown, facet: string) => {
  if (
    typeof value === "object" &&
    value !== null &&
    "message" in value &&
    typeof value.message === "string"
  ) {
    return value.message;
  }

  return `We couldn't load ${facet}. Please try again.`;
};

const fetchColors = async (): Promise<Colors> => {
  const { data, error } = await api.colors.get();
  if (error) throw new Error(errorMessage(error.value, "colors"));
  return data;
};

const fetchSizes = async (): Promise<Sizes> => {
  const { data, error } = await api.sizes.get();
  if (error) throw new Error(errorMessage(error.value, "sizes"));
  return data;
};

export const colorsQueryOptions = () =>
  queryOptions({
    queryKey: facetKeys.colors,
    queryFn: fetchColors,
    staleTime: Number.POSITIVE_INFINITY,
  });

export const sizesQueryOptions = () =>
  queryOptions({
    queryKey: facetKeys.sizes,
    queryFn: fetchSizes,
    staleTime: Number.POSITIVE_INFINITY,
  });
