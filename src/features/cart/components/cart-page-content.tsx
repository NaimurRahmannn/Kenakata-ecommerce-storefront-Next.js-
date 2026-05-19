"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Truck } from "lucide-react";

import { paymentMethods } from "@/constants/payment-methods";
import {
  FREE_SHIPPING_THRESHOLD,
  getCartSummary,
} from "@/features/cart/lib/cart-summary";
import { ProductCard } from "@/features/products/components/product-card";
import { formatCurrency } from "@/lib/utils";
import { useHydrated } from "@/lib/use-hydrated";
import { useCartStore } from "@/store/cart-store";
import type { Product } from "@/types/product";
import { CartItemsTable } from "./cart-items-table";
const MAX_RECOMMENDATIONS = 4;

interface CartPageContentProps {
  products: Product[];
}

function normalizeCategoryName(categoryName?: string) {
  return categoryName?.trim().toLowerCase() ?? "";
}

export function CartPageContent({ products }: CartPageContentProps) {
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
  const recommendedProducts = useMemo(() => {
    const cartItemIds = new Set(items.map((item) => item.id));
    const recommendationBaseItems =
      selectedItems.length > 0 ? selectedItems : items;
    const preferredCategoryNames = new Set(
      recommendationBaseItems
        .map((item) => normalizeCategoryName(item.categoryName))
        .filter(Boolean)
    );
    const availableProducts = products.filter(
      (product) => !cartItemIds.has(product.id)
    );

    if (preferredCategoryNames.size === 0) {
      return availableProducts.slice(0, MAX_RECOMMENDATIONS);
    }

    const sameCategoryProducts = availableProducts.filter((product) =>
      preferredCategoryNames.has(normalizeCategoryName(product.category?.name))
    );
    const sameCategoryProductIds = new Set(
      sameCategoryProducts.map((product) => product.id)
    );
    const fallbackProducts = availableProducts.filter(
      (product) => !sameCategoryProductIds.has(product.id)
    );

    return [...sameCategoryProducts, ...fallbackProducts].slice(
      0,
      MAX_RECOMMENDATIONS
    );
  }, [items, products, selectedItems]);

  const {
    quantity: selectedQuantity,
    subtotal,
    shipping,
    tax,
    total,
    remainingForFreeShipping,
    freeShippingProgress,
  } = getCartSummary(selectedItems);
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

          <div className="mt-6 flex flex-wrap gap-2">
            {paymentMethods.map((method) => (
              <span
                key={method.label}
                className="inline-flex h-8 min-w-12 items-center justify-center rounded border border-[#e8dfd3] bg-white px-2 shadow-sm"
              >
                <Image
                  src={method.src}
                  alt={method.label}
                  width={method.width}
                  height={method.height}
                  unoptimized
                  className="max-h-5 w-auto object-contain"
                />
              </span>
            ))}
          </div>
        </aside>
      </section>

      {recommendedProducts.length > 0 && (
        <section className="mt-12" aria-labelledby="cart-recommendations">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2
              id="cart-recommendations"
              className="text-2xl font-semibold text-zinc-950"
            >
              You may also like
            </h2>
            <Link
              href="/products"
              className="text-sm font-semibold text-zinc-950 underline decoration-[#c3a06a] decoration-2 underline-offset-8 transition-colors hover:text-[#9a763d]"
            >
              View all
            </Link>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {recommendedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
