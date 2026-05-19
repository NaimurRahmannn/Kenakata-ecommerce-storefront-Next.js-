"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Share2,
  ShoppingBag,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { EmptyState } from "@/components/shared/empty-state";
import { useHydrated } from "@/lib/use-hydrated";
import { formatCurrency, safeImage } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";

const getReviewCount = (productId: number) => 40 + (productId % 90);

export function WishlistContent() {
  const mounted = useHydrated();
  const items = useWishlistStore((state) => state.items);
  const removeItem = useWishlistStore((state) => state.removeItem);
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);
  const addToCart = useCartStore((state) => state.addItem);

  const displayItems = mounted ? items : [];
  const itemCount = mounted ? items.length : 0;

  const handleAddToCart = (item: (typeof items)[number]) => {
    addToCart(item, 1);
    toast.success("Added to cart");
  };

  const handleMoveToBag = (item: (typeof items)[number]) => {
    addToCart(item, 1);
    removeItem(item.id);
    toast.success("Moved to cart");
  };

  const handleRemove = (itemId: number) => {
    removeItem(itemId);
    toast.success("Removed from wishlist");
  };

  const handleClear = () => {
    clearWishlist();
    toast.success("Wishlist cleared");
  };

  return (
    <main className="bg-white">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {/* Top */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="font-serif text-2xl font-medium tracking-tight text-neutral-950 md:text-6xl">
              My Wishlist
            </h1>
            <p className="mt-3 text-lg text-neutral-600">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-6 text-sm font-semibold text-neutral-900 transition hover:border-neutral-900 hover:bg-neutral-50"
            >
              <Share2 className="h-4 w-4" />
              Share Wishlist
            </button>

            <button
              type="button"
              disabled={itemCount === 0}
              onClick={handleClear}
              className={`inline-flex h-12 items-center justify-center gap-2 rounded-lg px-6 text-sm font-semibold transition ${
                itemCount === 0
                  ? "cursor-not-allowed bg-neutral-200 text-neutral-500"
                  : "bg-neutral-950 text-white hover:bg-neutral-800"
              }`}
            >
              <Trash2 className="h-4 w-4" />
              Clear Wishlist
            </button>
          </div>
        </div>

        {!mounted ? (
          <div className="mt-10 overflow-hidden rounded-2xl border border-neutral-200">
            <div className="h-16 border-b border-neutral-200 bg-white" />
            <div className="divide-y divide-neutral-200">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="px-6 py-6">
                  <div className="h-24 w-full rounded-xl bg-[#f7f4ef]" />
                </div>
              ))}
            </div>
          </div>
        ) : displayItems.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              title="Your wishlist is empty"
              description="Save your favorite items for quick access later."
              actionLabel="Browse products"
              actionHref="/products"
              className="border-neutral-200 bg-white text-neutral-950"
            />
          </div>
        ) : (
          <div className="mt-10 overflow-hidden rounded-2xl border border-neutral-200">
            {/* Header */}
            <div className="hidden grid-cols-[56px_1.8fr_0.7fr_0.8fr_1fr] items-center border-b border-neutral-200 bg-white px-6 py-5 text-sm font-medium text-neutral-600 md:grid">
              <div />
              <div>Product</div>
              <div>Price</div>
              <div>Stock Status</div>
              <div className="text-right">Actions</div>
            </div>

            {/* Items */}
            <div className="divide-y divide-neutral-200">
              {displayItems.map((item) => (
                <div
                  key={item.id}
                  className="grid gap-5 px-4 py-5 sm:px-6 md:grid-cols-[56px_1.8fr_0.7fr_0.8fr_1fr] md:items-center md:gap-6 md:py-6"
                >
                  {/* Checkbox */}
                  <div className="flex items-start md:items-center">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-neutral-300 accent-neutral-900"
                    />
                  </div>

                  {/* Product */}
                  <div className="flex gap-4 sm:gap-5">
                    <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-xl bg-[#f7f4ef] sm:h-32 sm:w-32">
                      <Image
                        src={safeImage(item.image)}
                        alt={item.title}
                        fill
                        className="object-contain p-3"
                        unoptimized
                      />
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col justify-center">
                      <Link
                        href={`/products/${item.id}`}
                        className="font-serif text-2xl font-semibold text-neutral-950 transition hover:text-[#b8822e]"
                      >
                        {item.title}
                      </Link>

                      <div className="mt-3 flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            className="h-4 w-4 fill-[#d89b2b] text-[#d89b2b]"
                          />
                        ))}
                        <span className="ml-2 text-sm text-neutral-600">
                          ({getReviewCount(item.id)})
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-neutral-500">
                        {item.categoryName ?? "Curated selection"}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="md:block">
                    <p className="text-sm text-neutral-500 md:hidden">Price</p>
                    <p className="mt-1 text-2xl font-semibold text-neutral-950 md:mt-0 md:text-xl">
                      {formatCurrency(item.price)}
                    </p>
                  </div>

                  {/* Stock */}
                  <div>
                    <p className="text-sm text-neutral-500 md:hidden">
                      Stock Status
                    </p>
                    <div className="mt-1 flex items-center gap-2 md:mt-0">
                      <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                      <span className="text-base font-medium text-green-600">
                        In Stock
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col items-start gap-3 md:items-end">
                    <button
                      type="button"
                      onClick={() => handleAddToCart(item)}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#ead8c3] px-6 text-sm font-semibold text-neutral-900 transition hover:bg-[#dfc4a6]"
                    >
                      Add to Cart
                      <ShoppingBag className="h-4 w-4" />
                    </button>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleMoveToBag(item)}
                        className="inline-flex h-11 items-center justify-center rounded-lg border border-neutral-300 bg-white px-6 text-sm font-medium text-neutral-900 transition hover:border-neutral-900 hover:bg-neutral-50"
                      >
                        Move to Bag
                      </button>

                      <button
                        type="button"
                        onClick={() => handleRemove(item.id)}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-950"
                        aria-label={`Remove ${item.title}`}
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
