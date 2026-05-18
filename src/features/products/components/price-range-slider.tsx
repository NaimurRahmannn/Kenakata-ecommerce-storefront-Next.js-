"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { formatCurrency } from "@/lib/utils";

interface PriceRangeSliderProps {
  min: number;
  max: number;
  step?: number;
  valueMin: number;
  valueMax: number;
}

export function PriceRangeSlider({
  min,
  max,
  step = 1,
  valueMin,
  valueMax,
}: PriceRangeSliderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [minValue, setMinValue] = useState(valueMin);
  const [maxValue, setMaxValue] = useState(valueMax);
  const minGap = Math.max(step, 1);

  useEffect(() => {
    setMinValue(valueMin);
  }, [valueMin]);

  useEffect(() => {
    setMaxValue(valueMax);
  }, [valueMax]);

  const minPercent = useMemo(() => {
    if (max === min) {
      return 0;
    }

    return ((minValue - min) / (max - min)) * 100;
  }, [max, min, minValue]);

  const maxPercent = useMemo(() => {
    if (max === min) {
      return 100;
    }

    return ((maxValue - min) / (max - min)) * 100;
  }, [max, min, maxValue]);

  const handleMinChange = (value: number) => {
    const nextValue = Math.min(value, maxValue - minGap);
    setMinValue(nextValue);
  };

  const handleMaxChange = (value: number) => {
    const nextValue = Math.max(value, minValue + minGap);
    setMaxValue(nextValue);
  };

  const commitRange = () => {
    if (minValue === valueMin && maxValue === valueMax) {
      return;
    }

    const params = new URLSearchParams(searchParams?.toString());
    const hasRange = minValue > min || maxValue < max;

    if (hasRange) {
      params.set("min", String(minValue));
      params.set("max", String(maxValue));
    } else {
      params.delete("min");
      params.delete("max");
    }

    params.set("page", "1");
    const queryString = params.toString();
    router.push(queryString ? `/products?${queryString}` : "/products");
  };

  const trackStyle = {
    background: `linear-gradient(to right, #faf7f1 0%, #faf7f1 ${minPercent}%, #c3a06a ${minPercent}%, #c3a06a ${maxPercent}%, #faf7f1 ${maxPercent}%, #faf7f1 100%)`,
  };

  return (
    <div className="space-y-3">
      <div className="relative h-2">
        <div className="price-range-track" style={trackStyle} />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minValue}
          onChange={(event) => handleMinChange(Number(event.target.value))}
          onMouseUp={commitRange}
          onTouchEnd={commitRange}
          aria-label="Minimum price"
          className="price-range-input price-range-input--min"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxValue}
          onChange={(event) => handleMaxChange(Number(event.target.value))}
          onMouseUp={commitRange}
          onTouchEnd={commitRange}
          aria-label="Maximum price"
          className="price-range-input price-range-input--max"
        />
      </div>
      <div className="flex items-center justify-between text-xs text-zinc-600">
        <span>{formatCurrency(minValue)}</span>
        <span>{formatCurrency(maxValue)}</span>
      </div>
    </div>
  );
}
