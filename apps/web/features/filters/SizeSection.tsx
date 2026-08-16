import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import type { Size } from "./api/facets";

interface SizeSectionProps {
  sizes: Size[];
  selectedIds: string[];
  isPending: boolean;
  error?: Error;
  onToggle: (id: string) => void;
  onRetry: () => void;
}

const SizeSection: React.FC<SizeSectionProps> = ({
  sizes,
  selectedIds,
  isPending,
  error,
  onToggle,
  onRetry,
}) => {
  return (
    <Accordion type="single" collapsible defaultValue="filter-size">
      <AccordionItem value="filter-size" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          Size
        </AccordionTrigger>
        <AccordionContent className="pt-4 pb-0">
          {isPending ? (
            <div className="flex flex-wrap gap-2" aria-label="Loading sizes">
              {Array.from({ length: 9 }, (_, index) => (
                <span
                  key={index}
                  className="h-9 w-20 animate-pulse rounded-full bg-black/10"
                />
              ))}
            </div>
          ) : error ? (
            <div className="text-sm text-red-600" role="alert">
              <p>{error.message}</p>
              <Button
                variant="link"
                className="mt-1 h-auto p-0"
                onClick={onRetry}
              >
                Try again
              </Button>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-2">
              {sizes.map((size) => (
                <Button
                  key={size.id}
                  type="button"
                  aria-pressed={selectedIds.includes(size.id)}
                  variant={
                    selectedIds.includes(size.id) ? "default" : "outline"
                  }
                  className={cn(
                    "px-5 py-2.5",
                    !selectedIds.includes(size.id) && "bg-[#F0F0F0]",
                  )}
                  onClick={() => onToggle(size.id)}
                >
                  {size.name}
                </Button>
              ))}
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SizeSection;
