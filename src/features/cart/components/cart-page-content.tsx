"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Truck } from "lucide-react";

import { formatCurrency } from "@/lib/utils";
import { useHydrated } from "@/lib/use-hydrated";
import { useCartStore } from "@/store/cart-store";
import { CartItemsTable } from "./cart-items-table";

const FREE_SHIPPING_THRESHOLD = 99;
const TAX_RATE = 0.08;
const STANDARD_SHIPPING = 9.99;

const paymentBadges = [
  "Visa",
  "Mastercard",
  "Amex",
  "Apple Pay",
  "PayPal",
];

export function CartPageContent() {
  const items = useCartStore((state) => state.items);
  const mounted = useHydrated();
  const [deselectedItemIds, setDeselectedItemIds] = useState<number[]>([]);
  const deselectedIdSet = useMemo(
    () => new Set(deselectedItemIds),
    [deselectedItemIds]
  );
  const effectiveSelectedItemIds = useMemo(
    () =>
      items
        .filter((item) => !deselectedIdSet.has(item.id))
        .map((item) => item.id),
    [deselectedIdSet, items]
  );
  const selectedIdSet = useMemo(
    () => new Set(effectiveSelectedItemIds),
    [effectiveSelectedItemIds]
  );

  const selectedItems = useMemo(
    () => items.filter((item) => selectedIdSet.has(item.id)),
    [items, selectedIdSet]
  );

  const selectedQuantity = selectedItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const subtotal = selectedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping =
    selectedItems.length === 0 || subtotal >= FREE_SHIPPING_THRESHOLD
      ? 0
      : STANDARD_SHIPPING;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;
  const remainingForFreeShipping = Math.max(
    FREE_SHIPPING_THRESHOLD - subtotal,
    0
  );
  const freeShippingProgress = Math.min(
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100,
    100
  );
  const allItemsSelected =
    items.length > 0 && effectiveSelectedItemIds.length === items.length;
  const someItemsSelected = effectiveSelectedItemIds.length > 0;

  const toggleItemSelection = (productId: number) => {
    setDeselectedItemIds((currentIds) => {
      if (currentIds.includes(productId)) {
        return currentIds.filter((itemId) => itemId !== productId);
      }

      return [...currentIds, productId];
    });
  };

  const toggleAllSelection = () => {
    setDeselectedItemIds(
      allItemsSelected ? items.map((item) => item.id) : []
    );
  };

  if (!mounted) {
    return (
      <section className="mt-8 grid gap-6 lg:grid-cols-[1.65fr_1fr]">
        <CartItemsTable
          allItemsSelected={false}
          selectedItemIds={[]}
          someItemsSelected={false}
          onToggleAll={() => undefined}
          onToggleItem={() => undefined}
        />

        <aside className="h-fit rounded-xl border border-[#e8dfd3] bg-white p-6 shadow-sm">
          <div className="h-6 w-36 rounded-md bg-[#f5efe5]" />
          <div className="mt-5 space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-5 w-full rounded-md bg-[#faf7f1]"
              />
            ))}
          </div>
        </aside>
      </section>
    );
  }

  return (
    <>
      <section className="mt-6 rounded-xl border border-[#e8dfd3] bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f4eddf] text-[#9a763d]">
            <Truck className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-zinc-950">
              {selectedItems.length === 0
                ? "Select products to see free shipping progress."
                : remainingForFreeShipping > 0
                  ? `You're ${formatCurrency(
                      remainingForFreeShipping
                    )} away from free shipping!`
                  : "You've unlocked free shipping!"}
            </p>
            <div className="mt-2 h-2 w-full rounded-full bg-[#f5efe5]">
              <div
                className="h-2 rounded-full bg-[#c3a06a]"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>
          <p className="text-sm font-semibold text-zinc-950">
            {formatCurrency(subtotal)} / {formatCurrency(FREE_SHIPPING_THRESHOLD)}
          </p>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.65fr_1fr]">
        <CartItemsTable
          allItemsSelected={allItemsSelected}
          selectedItemIds={effectiveSelectedItemIds}
          someItemsSelected={someItemsSelected}
          onToggleAll={toggleAllSelection}
          onToggleItem={toggleItemSelection}
        />

        <aside className="h-fit rounded-xl border border-[#e8dfd3] bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-zinc-950">Order Summary</h2>
          <div className="mt-5 space-y-3 text-sm text-zinc-600">
            <div className="flex items-center justify-between">
              <span>
                Subtotal ({selectedQuantity}{" "}
                {selectedQuantity === 1 ? "item" : "items"})
              </span>
              <span className="font-semibold text-zinc-950">
                {formatCurrency(subtotal)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span className="font-semibold text-zinc-950">
                {formatCurrency(shipping)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Tax (estimated)</span>
              <span className="font-semibold text-zinc-950">
                {formatCurrency(tax)}
              </span>
            </div>
          </div>

          <div className="mt-5">
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Discount code
            </label>
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                placeholder="Enter code 123"
                className="w-full rounded-lg border border-[#e8dfd3] bg-[#fffdf8] px-3 py-2 text-sm text-zinc-700 outline-none focus:border-[#c3a06a]"
              />
              <button
                type="button"
                className="rounded-lg border border-[#c3a06a] px-4 py-2 text-sm font-semibold text-[#9a763d] transition-colors hover:bg-[#f4eddf]"
              >
                Apply
              </button>
            </div>
          </div>

          <div className="mt-6 border-t border-[#eee5d8] pt-4">
            <div className="flex items-center justify-between text-base font-semibold text-zinc-950">
              <span>Total</span>
              <span>USD {formatCurrency(total)}</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {selectedItems.length > 0 ? (
              <Link
                href="/checkout"
                className="block rounded-lg bg-zinc-950 px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-zinc-900"
              >
                Proceed to Checkout
              </Link>
            ) : (
              <button
                type="button"
                disabled
                className="block w-full rounded-lg bg-zinc-300 px-4 py-3 text-center text-sm font-semibold text-zinc-600"
              >
                Proceed to Checkout
              </button>
            )}
            <Link
              href="/products"
              className="block rounded-lg border border-[#c3a06a] bg-[#f3eadc] px-4 py-3 text-center text-sm font-semibold text-[#9a763d] transition-colors hover:bg-[#eadcc7]"
            >
              Continue Shopping
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 text-xs text-zinc-500">
            {paymentBadges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-[#e8dfd3] px-3 py-1"
              >
                {badge}
              </span>
            ))}
          </div>
        </aside>
      </section>
    </>
  );
}
