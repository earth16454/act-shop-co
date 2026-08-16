"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const SIZE_OPTIONS = [
  "XX-Small",
  "X-Small",
  "Small",
  "Medium",
  "Large",
  "X-Large",
  "XX-Large",
  "3X-Large",
  "4X-Large",
] as const;

const SizeSection: React.FC = () => {
  const [selected, setSelected] = useState<string>("Large");

  const handleSelectSize = (size: string) => {
    setSelected(size);
  };

  return (
    <Accordion type="single" collapsible defaultValue="filter-size">
      <AccordionItem value="filter-size" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          Size
        </AccordionTrigger>
        <AccordionContent className="pt-4 pb-0">
          <div className="flex items-center flex-wrap gap-2">
            {SIZE_OPTIONS.map((size, index) => (
              <Button
                key={index}
                type="button"
                variant={selected === size ? "default" : "outline"}
                className={cn([
                  "px-5 py-2.5",
                  selected !== size && "bg-[#F0F0F0]",
                ])}
                onClick={() => handleSelectSize(size)}
              >
                {size}
              </Button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SizeSection;
