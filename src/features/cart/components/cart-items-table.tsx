"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { formatCurrency, safeImage } from "@/lib/utils";
import { useHydrated } from "@/lib/use-hydrated";
import { useCartStore } from "@/store/cart-store";

interface CartItemsTableProps {
  allItemsSelected: boolean;
  selectedItemIds: number[];
  someItemsSelected: boolean;
  onToggleAll: () => void;
  onToggleItem: (productId: number) => void;
}

export function CartItemsTable({
  allItemsSelected,
  selectedItemIds,
  someItemsSelected,
  onToggleAll,
  onToggleItem,
}: CartItemsTableProps) {
  const items = useCartStore((state) => state.items);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const mounted = useHydrated();
  const selectAllRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate =
        someItemsSelected && !allItemsSelected;
    }
  }, [allItemsSelected, someItemsSelected]);

  if (!mounted) {
    return (
      <div className="rounded-xl border border-[#e8dfd3] bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-[#141310]">
        <div className="h-6 w-40 rounded-md bg-[#f5efe5] dark:bg-[#1f1b14]" />
        <div className="mt-4 space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-20 w-full rounded-lg bg-[#faf7f1] dark:bg-[#1a1916]"
            />
          ))}
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        description="Looks like you have not added anything to your cart yet."
        actionLabel="Continue Shopping"
        actionHref="/products"
        className="border-[#eadfce] bg-[#fffdf8] text-zinc-950 dark:border-zinc-800 dark:bg-[#141310] dark:text-zinc-100"
      />
    );
  }

  return (
    <div className="rounded-xl border border-[#e8dfd3] bg-white shadow-sm dark:border-zinc-800 dark:bg-[#141310]">
      <div className="hidden grid-cols-[0.35fr_2.2fr_0.9fr_1fr_0.8fr_0.4fr] gap-4 border-b border-[#eee5d8] px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 lg:grid dark:border-zinc-800 dark:text-zinc-400">
        <label className="flex items-center">
          <span className="sr-only">Select all products</span>
          <input
            ref={selectAllRef}
            type="checkbox"
            checked={allItemsSelected}
            onChange={onToggleAll}
            className="h-4 w-4 rounded border-[#c3a06a] accent-[#9a763d] dark:border-[#d6b36a] dark:accent-[#d6b36a]"
          />
        </label>
        <span>Product</span>
        <span>Price</span>
        <span>Quantity</span>
        <span>Total</span>
        <span>Remove</span>
      </div>

      <div className="divide-y divide-[#eee5d8] dark:divide-zinc-800">
        {items.map((item) => (
          <div
            key={item.id}
            className="grid gap-4 px-6 py-5 lg:grid-cols-[0.35fr_2.2fr_0.9fr_1fr_0.8fr_0.4fr] lg:items-center"
          >
            <label className="flex items-center">
              <span className="sr-only">Select {item.title}</span>
              <input
                type="checkbox"
                checked={selectedItemIds.includes(item.id)}
                onChange={() => onToggleItem(item.id)}
                className="h-4 w-4 rounded border-[#c3a06a] accent-[#9a763d] dark:border-[#d6b36a] dark:accent-[#d6b36a]"
              />
            </label>
            <div className="flex items-start gap-4">
              <div className="relative h-20 w-20 overflow-hidden rounded-lg border border-[#e8dfd3] bg-[#faf7f1] dark:border-zinc-800 dark:bg-[#1a1916]">
                <Image
                  src={safeImage(item.image)}
                  alt={item.title}
                  fill
                  sizes="80px"
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-100">
                  <Link
                    href={`/products/${item.id}`}
                    className="transition-colors hover:text-[#9a763d] dark:hover:text-[#d6b36a]"
                  >
                    {item.title}
                  </Link>
                </p>
                {item.categoryName && (
                  <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                    {item.categoryName}
                  </p>
                )}
                <div className="mt-2 flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  In Stock
                </div>
              </div>
            </div>
            <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-100">
              {formatCurrency(item.price)}
            </p>
            <div className="flex items-center rounded-lg border border-[#e8dfd3] bg-[#fffdf8] dark:border-zinc-800 dark:bg-[#141310]">
              <button
                type="button"
                className="px-3 py-2 text-zinc-500 dark:text-zinc-400"
                aria-label="Decrease quantity"
                onClick={() => decreaseQuantity(item.id)}
              >
                -
              </button>
              <span className="px-4 text-sm font-semibold">
                {item.quantity}
              </span>
              <button
                type="button"
                className="px-3 py-2 text-zinc-500 dark:text-zinc-400"
                aria-label="Increase quantity"
                onClick={() => increaseQuantity(item.id)}
              >
                +
              </button>
            </div>
            <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-100">
              {formatCurrency(item.price * item.quantity)}
            </p>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#eadfce] text-zinc-500 transition-colors hover:border-[#c3a06a] hover:text-[#9a763d] dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-[#d6b36a] dark:hover:text-[#d6b36a]"
              aria-label="Remove item"
              onClick={() => removeItem(item.id)}
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#eee5d8] px-6 py-4 dark:border-zinc-800">
        <Link
          href="/products"
          className="text-sm font-semibold text-zinc-950 underline decoration-[#c3a06a] decoration-2 underline-offset-8 transition-colors hover:text-[#9a763d] dark:text-zinc-100 dark:hover:text-[#d6b36a]"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
