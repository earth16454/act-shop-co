import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import type { Color } from "./api/facets";
import { Button } from "@/components/ui/Button";

interface ColorsSectionProps {
  colors: Color[];
  selectedIds: string[];
  isPending: boolean;
  error?: Error;
  onToggle: (id: string) => void;
  onRetry: () => void;
}

const usesDarkCheckmark = (hex: string) => {
  const normalized = hex.replace("#", "");
  const value =
    normalized.length === 3
      ? normalized
          .split("")
          .map((part) => `${part}${part}`)
          .join("")
      : normalized;
  const red = Number.parseInt(value.slice(0, 2), 16);
  const green = Number.parseInt(value.slice(2, 4), 16);
  const blue = Number.parseInt(value.slice(4, 6), 16);

  return red * 0.299 + green * 0.587 + blue * 0.114 > 170;
};

const ColorsSection: React.FC<ColorsSectionProps> = ({
  colors,
  selectedIds,
  isPending,
  error,
  onToggle,
  onRetry,
}) => {
  return (
    <Accordion type="single" collapsible defaultValue="filter-colors">
      <AccordionItem value="filter-colors" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          Colors
        </AccordionTrigger>
        <AccordionContent className="pt-4 pb-0">
          {isPending ? (
            <div
              className="grid grid-cols-5 gap-2.5"
              aria-label="Loading colors"
            >
              {Array.from({ length: 10 }, (_, index) => (
                <span
                  key={index}
                  className="size-10 animate-pulse rounded-full bg-black/10"
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
            <div className="grid grid-cols-5 gap-2.5">
              {colors.map((color) => (
                <button
                  key={color.id}
                  type="button"
                  aria-label={color.name}
                  aria-pressed={selectedIds.includes(color.id)}
                  className={cn(
                    "rounded-full w-9 sm:w-10 h-9 sm:h-10 flex items-center justify-center border border-black/20",
                  )}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => onToggle(color.id)}
                >
                  {selectedIds.includes(color.id) && (
                    <CheckIcon
                      size="1rem"
                      className={
                        usesDarkCheckmark(color.hex)
                          ? "text-black"
                          : "text-white"
                      }
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ColorsSection;
