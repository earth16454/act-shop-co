"use client";

import React, { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { SlidersVerticalIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import PriceSection from "./PriceSection";
import ColorsSection from "./ColorsSection";
import SizeSection from "./SizeSection";
import { colorsQueryOptions, sizesQueryOptions } from "./api/facets";
import {
  productFiltersUrl,
  type ProductFilters,
} from "./lib/product-filter-params";

type FacetDraft = Pick<
  ProductFilters,
  "minPrice" | "maxPrice" | "colorIds" | "sizeIds"
>;

interface FilterBarProps {
  appliedFilters: ProductFilters;
}

const toDraft = (filters: ProductFilters): FacetDraft => ({
  minPrice: filters.minPrice,
  maxPrice: filters.maxPrice,
  colorIds: filters.colorIds,
  sizeIds: filters.sizeIds,
});

const toggleId = (ids: string[], id: string) =>
  ids.includes(id) ? ids.filter((currentId) => currentId !== id) : [...ids, id];

const FilterBar: React.FC<FilterBarProps> = ({ appliedFilters }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isApplying, startApplying] = useTransition();
  const [draft, setDraft] = useState<FacetDraft>(() => toDraft(appliedFilters));
  const colorsQuery = useQuery(colorsQueryOptions());
  const sizesQuery = useQuery(sizesQueryOptions());

  useEffect(() => {
    setDraft(toDraft(appliedFilters));
  }, [appliedFilters]);

  const applyFilters = () => {
    startApplying(() => {
      router.replace(
        productFiltersUrl(pathname, { ...appliedFilters, ...draft }),
        { scroll: false },
      );
    });
  };

  return (
    <div className="hidden md:block min-w-75 max-w-75 border border-black/10 rounded-[20px] px-5 md:px-6 py-5 space-y-5 md:space-y-6">
      <div className="flex items-center justify-between">
        <span className="font-bold text-black text-xl">Filters</span>
        <SlidersVerticalIcon
          size="1.5rem"
          className="text-black/40"
          aria-hidden="true"
        />
      </div>

      <hr className="border-t-black/10" />
      <PriceSection
        value={[draft.minPrice, draft.maxPrice]}
        onChange={([minPrice, maxPrice]) =>
          setDraft((current) => ({ ...current, minPrice, maxPrice }))
        }
      />
      <hr className="border-t-black/10" />
      <ColorsSection
        colors={colorsQuery.data ?? []}
        selectedIds={draft.colorIds}
        isPending={colorsQuery.isPending}
        error={colorsQuery.error ?? undefined}
        onToggle={(id) =>
          setDraft((current) => ({
            ...current,
            colorIds: toggleId(current.colorIds, id),
          }))
        }
        onRetry={() => void colorsQuery.refetch()}
      />
      <hr className="border-t-black/10" />
      <SizeSection
        sizes={sizesQuery.data ?? []}
        selectedIds={draft.sizeIds}
        isPending={sizesQuery.isPending}
        error={sizesQuery.error ?? undefined}
        onToggle={(id) =>
          setDraft((current) => ({
            ...current,
            sizeIds: toggleId(current.sizeIds, id),
          }))
        }
        onRetry={() => void sizesQuery.refetch()}
      />
      <Button
        type="button"
        block
        className="py-4 h-12"
        onClick={applyFilters}
        disabled={isApplying}
      >
        {isApplying ? "Applying…" : "Apply Filter"}
      </Button>
    </div>
  );
};

export default FilterBar;
