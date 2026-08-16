import React from "react";
import FilterBar from "@/features/filters";
import { ProductList } from "@/features/products/components/ProductList";
import {
  parseProductFilters,
  productFiltersToQuery,
} from "@/features/filters/lib/product-filter-params";

interface HomePageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const HomePage = async ({ searchParams }: HomePageProps) => {
  const filters = parseProductFilters(await searchParams);
  const productsQuery = productFiltersToQuery(filters);

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-px border-t-black/10 mb-5 sm:mb-6" />

        <div className="flex md:space-x-5 items-start">
          <FilterBar appliedFilters={filters} />

          <div className="w-full">
            <h1 className="mb-5 text-2xl font-bold tracking-tight sm:mb-6 sm:text-3xl">
              Clothes
            </h1>
            <ProductList query={productsQuery} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
