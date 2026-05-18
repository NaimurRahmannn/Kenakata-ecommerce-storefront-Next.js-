"use client";

import { useEffect, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface FiltersDrawerProps {
  children: React.ReactNode;
  showTrigger?: boolean;
  openParam?: string;
}

export function FiltersDrawer({
  children,
  showTrigger = true,
  openParam = "filters",
}: FiltersDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams?.get(openParam) === "1") {
      setIsOpen(true);
    }
  }, [openParam, searchParams]);

  const closeDrawer = () => {
    setIsOpen(false);

    if (!searchParams) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    if (params.has(openParam)) {
      params.delete(openParam);
      const queryString = params.toString();
      const nextPath = queryString ? `${pathname}?${queryString}` : pathname;
      router.replace(nextPath);
    }
  };

  return (
    <div className="lg:hidden md:justify-self-end">
      {showTrigger && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 rounded-lg border border-[#ded4c5] bg-white px-3 py-3 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:border-[#c3a06a] hover:text-[#9a763d]"
          aria-expanded={isOpen}
          aria-controls="filters-drawer"
        >
          <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          Filters
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            className="absolute inset-0 bg-black/30"
            aria-label="Close filters"
            onClick={closeDrawer}
          />
          <div
            id="filters-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
            className="absolute right-0 top-0 h-full w-full max-w-sm overflow-y-auto bg-white shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-[#eee5d8] px-4 py-4">
              <h2 className="text-base font-semibold text-zinc-950">Filters</h2>
              <button
                type="button"
                onClick={closeDrawer}
                className="rounded-full p-1 text-zinc-500 transition-colors hover:text-[#9a763d]"
                aria-label="Close filters"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
