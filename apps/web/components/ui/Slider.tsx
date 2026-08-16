"use client";

import React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "../../lib/utils";

interface SliderProps extends React.ComponentPropsWithoutRef<
  typeof SliderPrimitive.Root
> {
  min: number;
  max: number;
  step?: number;
  defaultValue?: [number, number];
  label?: string;
}

const Slider = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  SliderProps
>(
  (
    {
      className,
      min,
      max,
      step = 1,
      defaultValue = [min, max],
      label,
      value,
      onValueChange,
      ...props
    },
    ref,
  ) => {
    const [internalValues, setInternalValues] =
      React.useState<[number, number]>(defaultValue);
    const values: [number, number] =
      value?.[0] !== undefined && value[1] !== undefined
        ? [value[0], value[1]]
        : internalValues;

    const handleValueChange = (newValues: number[]) => {
      if (newValues[0] !== undefined && newValues[1] !== undefined) {
        if (value === undefined) {
          setInternalValues([newValues[0], newValues[1]]);
        }
        onValueChange?.(newValues);
      }
    };

    return (
      <div className="w-full relative">
        <SliderPrimitive.Root
          ref={ref}
          className={cn(
            "relative flex w-full touch-none select-none items-center",
            className,
          )}
          min={min}
          max={max}
          step={step}
          value={values}
          onValueChange={handleValueChange}
          {...props}
        >
          <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
            <SliderPrimitive.Range className="absolute h-full bg-primary" />
          </SliderPrimitive.Track>

          {/* Thumb 1 with Label */}
          <div
            className="absolute -translate-x-1/2 -bottom-8 text-xs font-medium px-2 py-1 rounded z-10"
            style={{
              left: `${((values[0] - min) / (max - min)) * 100}%`,
            }}
          >
            {label}
            {values[0]}
          </div>
          <SliderPrimitive.Thumb
            aria-label="Minimum price"
            className="relative block h-4 w-4 rounded-full border border-primary/50 bg-black shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          />

          {/* Thumb 2 with Label */}
          <div
            className="absolute -translate-x-1/2 -bottom-8 text-xs font-medium px-2 py-1 rounded z-10"
            style={{
              left: `${((values[1] - min) / (max - min)) * 100}%`,
            }}
          >
            {label}
            {values[1]}
          </div>
          <SliderPrimitive.Thumb
            aria-label="Maximum price"
            className="relative block h-4 w-4 rounded-full border border-primary/50 bg-black shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          />
        </SliderPrimitive.Root>
      </div>
    );
  },
);
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
