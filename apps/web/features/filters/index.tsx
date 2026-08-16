import React from "react";
import { SlidersVerticalIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import PriceSection from "./PriceSection";
import ColorsSection from "./ColorsSection";
import SizeSection from "./SizeSection";

const FilterBar: React.FC = () => {
  return (
    <div className="hidden md:block min-w-75 max-w-75 border border-black/10 rounded-[20px] px-5 md:px-6 py-5 space-y-5 md:space-y-6">
      <div className="flex items-center justify-between">
        <span className="font-bold text-black text-xl">Filters</span>
        <Button variant={"ghost"} size={"icon"}>
          <SlidersVerticalIcon size={"1.5rem"} className="text-black/40" />
        </Button>
      </div>

      <hr className="border-t-black/10" />
      <PriceSection />
      <hr className="border-t-black/10" />
      <ColorsSection />
      <hr className="border-t-black/10" />
      <SizeSection />
      <Button
        type="button"
        className="bg-black w-full rounded-full text-sm font-medium py-4 h-12"
      >
        Apply Filter
      </Button>
    </div>
  );
};

export default FilterBar;
