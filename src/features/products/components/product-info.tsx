"use client";

import { useState } from "react";
import { Heart, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import type { Product } from "@/types/product";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggleItem);
  const isWishlisted = useWishlistStore((state) =>
    state.items.some((item) => item.id === product.id)
  );
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const handleIncrease = () => {
    setQuantity((current) => current + 1);
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success("Added to cart");
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    router.push("/checkout");
  };

  const handleWishlistToggle = () => {
    toggleWishlist(product);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl dark:text-zinc-100">
          {product.title}
        </h1>
        <p className="mt-3 text-2xl font-semibold text-zinc-950 dark:text-zinc-100">
          {formatCurrency(product.price)}
        </p>
        <div className="mt-3 flex items-center gap-2">
          <div className="flex items-center gap-0.5 text-[#b88a39]">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className="h-4 w-4 fill-current"
                aria-hidden="true"
              />
            ))}
          </div>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            (128 reviews)
          </span>
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          In Stock
        </div>
      </div>

      <p className="text-base leading-7 text-zinc-600 dark:text-zinc-300">
        {product.description}
      </p>

      <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
        <li>Premium Quality</li>
        <li>Fast Delivery</li>
        <li>Secure Checkout</li>
        <li>Easy Returns</li>
      </ul>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center rounded-lg border border-[#e8dfd3] bg-white dark:border-zinc-800 dark:bg-[#141310]">
            <button
              type="button"
              className="px-3 py-2 text-zinc-500 dark:text-zinc-400"
              aria-label="Decrease quantity"
              onClick={handleDecrease}
            >
              -
            </button>
            <span className="px-4 text-sm font-semibold">{quantity}</span>
            <button
              type="button"
              className="px-3 py-2 text-zinc-500 dark:text-zinc-400"
              aria-label="Increase quantity"
              onClick={handleIncrease}
            >
              +
            </button>
          </div>
          <button
            type="button"
            onClick={handleAddToCart}
            className="rounded-lg bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-900 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            Add to Cart
          </button>
          <button
            type="button"
            onClick={handleBuyNow}
            className="rounded-lg border border-[#c3a06a] bg-[#f3eadc] px-6 py-3 text-sm font-semibold text-[#9a763d] transition-colors hover:bg-[#eadcc7] dark:border-[#d6b36a] dark:bg-[#201b14] dark:text-[#d6b36a] dark:hover:bg-[#2a241a]"
          >
            Buy Now
          </button>
        </div>

        <button
          type="button"
          onClick={handleWishlistToggle}
          className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${
            isWishlisted
              ? "text-[#9a763d] dark:text-[#d6b36a]"
              : "text-zinc-600 dark:text-zinc-400"
          } hover:text-[#9a763d] dark:hover:text-[#d6b36a]`}
        >
          <Heart
            className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`}
            aria-hidden="true"
          />
          {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
        </button>
      </div>
    </div>
  );
}
