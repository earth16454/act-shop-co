import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { Slider } from "@/components/ui/Slider";
import {
  MAX_PRODUCT_PRICE,
  MIN_PRODUCT_PRICE,
} from "./lib/product-filter-params";

interface PriceSectionProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

const PriceSection: React.FC<PriceSectionProps> = ({ value, onChange }) => {
  return (
    <Accordion type="single" collapsible defaultValue="filter-price">
      <AccordionItem value="filter-price" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          Price
        </AccordionTrigger>
        <AccordionContent className="pt-4" contentClassName="overflow-visible">
          <Slider
            value={value}
            min={MIN_PRODUCT_PRICE}
            max={MAX_PRODUCT_PRICE}
            step={1}
            label="$"
            onValueChange={(nextValue) => {
              if (nextValue[0] !== undefined && nextValue[1] !== undefined) {
                onChange([nextValue[0], nextValue[1]]);
              }
            }}
          />
          <div className="mb-3" />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PriceSection;
