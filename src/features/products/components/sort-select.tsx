"use client";

import type { ChangeEvent } from "react";
import { ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
type SortValue = "newest" | "price-asc" | "price-desc";

interface SortSelectProps {
  currentSort: SortValue;
}

export function SortSelect({ currentSort }: SortSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextSort = event.target.value;
    const params = new URLSearchParams(searchParams?.toString());

    if (nextSort === "newest") {
      params.delete("sort");
    } else {
      params.set("sort", nextSort);
    }

    params.set("page", "1");
    const queryString = params.toString();
    router.push(queryString ? `/products?${queryString}` : "/products");
  };

  return (
    <div className="flex items-center gap-3 rounded-lg border border-[#ded4c5] bg-white px-4 py-3 text-sm text-zinc-700 shadow-sm w-fit dark:border-zinc-800 dark:bg-[#141310] dark:text-zinc-300">
      <label htmlFor="sort" className="whitespace-nowrap">
        Sort by:
      </label>
      <div className="relative">
        <select
          id="sort"
          name="sort"
          value={currentSort}
          onChange={handleChange}
          aria-label="Sort products"
          className="appearance-none bg-transparent pr-7 font-medium text-zinc-950 focus:outline-none dark:text-zinc-100"
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
        <ChevronDown className="pointer-events-none absolute right-1 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 dark:text-zinc-400" />
      </div>
    </div>
  );
}
