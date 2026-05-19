import Link from "next/link";

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
      <div className="border-b border-[#eee5d8] px-4 py-4 dark:border-zinc-800">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-zinc-950 dark:text-zinc-100">
            Categories
          </h3>
  
        </div>
        <div className="mt-3 space-y-2.5">
          <Link
            href={buildCategoryHref()}
            className="flex items-center gap-2 text-sm text-zinc-700 transition-colors hover:text-[#9a763d] dark:text-zinc-300 dark:hover:text-[#d6b36a]"
            aria-current={!categoryQuery ? "true" : undefined}
          >
            <span
              className={`h-3.5 w-3.5 rounded border ${
                !categoryQuery
                  ? "border-[#c3a06a] bg-[#f3eadc] dark:border-[#d6b36a] dark:bg-[#251f16]"
                  : "border-[#d6cbbc] bg-[#fffdf8] dark:border-zinc-700 dark:bg-[#141310]"
              }`}
            />
            <span
              className={
                !categoryQuery
                  ? "font-medium text-[#9a763d] dark:text-[#d6b36a]"
                  : ""
              }
            >
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
                className="flex items-center gap-2 text-sm text-zinc-700 transition-colors hover:text-[#9a763d] dark:text-zinc-300 dark:hover:text-[#d6b36a]"
                aria-current={isActive ? "true" : undefined}
              >
                <span
                  className={`h-3.5 w-3.5 rounded border ${
                    isActive
                      ? "border-[#c3a06a] bg-[#f3eadc] dark:border-[#d6b36a] dark:bg-[#251f16]"
                      : "border-[#d6cbbc] bg-[#fffdf8] dark:border-zinc-700 dark:bg-[#141310]"
                  }`}
                />
                <span
                  className={
                    isActive ? "font-medium text-[#9a763d] dark:text-[#d6b36a]" : ""
                  }
                >
                  {category.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="border-b border-[#eee5d8] px-4 py-4 dark:border-zinc-800">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-zinc-950 dark:text-zinc-100">
            Price Range
          </h3>
          
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
