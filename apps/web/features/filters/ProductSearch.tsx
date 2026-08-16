"use client";

import {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { LoaderCircleIcon, SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import InputGroup from "@/components/ui/InputGroup";
import {
  parseProductFilters,
  productFiltersUrl,
} from "./lib/product-filter-params";

const SEARCH_DEBOUNCE_MS = 400;

export const ProductSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const appliedQuery = parseProductFilters(searchParams).q ?? "";
  const [query, setQuery] = useState(appliedQuery);
  const [isSearching, startSearching] = useTransition();
  const lastSubmittedQueryRef = useRef(appliedQuery);

  useEffect(() => {
    if (query.trim() === lastSubmittedQueryRef.current) {
      lastSubmittedQueryRef.current = appliedQuery;
      setQuery(appliedQuery);
    }
  }, [appliedQuery, query]);

  const updateSearch = useCallback(
    (nextQuery: string) => {
      const filters = parseProductFilters(searchParams);
      const normalizedQuery = nextQuery.trim();
      const q = normalizedQuery || undefined;
      lastSubmittedQueryRef.current = normalizedQuery;

      startSearching(() => {
        router.replace(productFiltersUrl(pathname, { ...filters, q }), {
          scroll: false,
        });
      });
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    if (query.trim() === appliedQuery) return;

    const timeout = window.setTimeout(() => {
      updateSearch(query);
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timeout);
  }, [appliedQuery, query, updateSearch]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateSearch(query);
  };

  return (
    <form
      className="order-3 w-full basis-full sm:order-0 sm:w-auto sm:basis-auto sm:flex-1"
      role="search"
      aria-label="Search products"
      onSubmit={handleSubmit}
    >
      <InputGroup className="bg-[#F0F0F0]">
        <button
          type="submit"
          className="mr-3 text-black/50 transition-colors hover:text-black"
          aria-label="Submit product search"
        >
          {isSearching ? (
            <LoaderCircleIcon
              size={20}
              className="animate-spin"
              aria-hidden="true"
            />
          ) : (
            <SearchIcon size={20} aria-hidden="true" />
          )}
        </button>
        <InputGroup.Input
          type="search"
          name="q"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              event.currentTarget.form?.requestSubmit();
            }
          }}
          placeholder="Search for products..."
          aria-label="Search for products"
          aria-busy={isSearching}
        />
      </InputGroup>
    </form>
  );
};

export const ProductSearchFallback = () => (
  <div
    className="order-3 h-12 w-full basis-full animate-pulse rounded-full bg-[#F0F0F0] sm:order-0 sm:w-auto sm:basis-auto sm:flex-1"
    aria-hidden="true"
  />
);
