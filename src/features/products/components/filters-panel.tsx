import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

import { PriceRangeSlider } from "@/features/products/components/price-range-slider";
import type { Category } from "@/types/category";

interface FiltersPanelProps {
  categories: Category[];
  categoryQuery?: string;
  normalizedCategory: string;
  buildCategoryHref: (slug?: string) => string;
  minPrice: number;
  maxPrice: number;
  rangeMin: number;
  rangeMax: number;
  step?: number;
}

export function FiltersPanel({
  categories,
  categoryQuery,
  normalizedCategory,
  buildCategoryHref,
  minPrice,
  maxPrice,
  rangeMin,
  rangeMax,
  step = 5,
}: FiltersPanelProps) {
  return (
    <div>
      <div className="border-b border-[#eee5d8] px-4 py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-zinc-950">Categories</h3>
          <ChevronUp className="h-4 w-4 text-zinc-500" />
        </div>
        <div className="mt-3 space-y-2.5">
          <Link
            href={buildCategoryHref()}
            className="flex items-center gap-2 text-sm text-zinc-700 transition-colors hover:text-[#9a763d]"
            aria-current={!categoryQuery ? "true" : undefined}
          >
            <span
              className={`h-3.5 w-3.5 rounded border ${
                !categoryQuery
                  ? "border-[#c3a06a] bg-[#f3eadc]"
                  : "border-[#d6cbbc] bg-[#fffdf8]"
              }`}
            />
            <span className={!categoryQuery ? "font-medium text-[#9a763d]" : ""}>
              All
            </span>
          </Link>
          {categories.map((category) => {
            const slug =
              category.slug ??
              category.name.toLowerCase().trim().replace(/\s+/g, "-");
            const isActive = slug === normalizedCategory;

            return (
              <Link
                key={category.id}
                href={buildCategoryHref(slug)}
                className="flex items-center gap-2 text-sm text-zinc-700 transition-colors hover:text-[#9a763d]"
                aria-current={isActive ? "true" : undefined}
              >
                <span
                  className={`h-3.5 w-3.5 rounded border ${
                    isActive
                      ? "border-[#c3a06a] bg-[#f3eadc]"
                      : "border-[#d6cbbc] bg-[#fffdf8]"
                  }`}
                />
                <span className={isActive ? "font-medium text-[#9a763d]" : ""}>
                  {category.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="border-b border-[#eee5d8] px-4 py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-zinc-950">Price Range</h3>
          <ChevronDown className="h-4 w-4 text-zinc-500" />
        </div>
        <div className="mt-3">
          <PriceRangeSlider
            min={minPrice}
            max={maxPrice}
            valueMin={rangeMin}
            valueMax={rangeMax}
            step={step}
          />
        </div>
      </div>
    </div>
  );
}
