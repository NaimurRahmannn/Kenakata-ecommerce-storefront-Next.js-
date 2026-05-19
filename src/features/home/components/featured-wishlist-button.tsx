"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";

import { useWishlistStore } from "@/store/wishlist-store";
import type { Product } from "@/types/product";

interface FeaturedWishlistButtonProps {
  product: Product;
}

export function FeaturedWishlistButton({ product }: FeaturedWishlistButtonProps) {
  const toggleWishlist = useWishlistStore((state) => state.toggleItem);
  const isWishlisted = useWishlistStore((state) =>
    state.items.some((item) => item.id === product.id)
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const displayWishlisted = mounted ? isWishlisted : false;

  const handleToggle = () => {
    toggleWishlist(product);
    toast.success(displayWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  return (
    <button
      type="button"
      aria-label={
        displayWishlisted
          ? `Remove ${product.title} from wishlist`
          : `Add ${product.title} to wishlist`
      }
      aria-pressed={displayWishlisted}
      onClick={handleToggle}
      className={`absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#eadfce] bg-white/90 text-zinc-800 shadow-sm transition-colors hover:border-[#b08d57] hover:text-[#9a763d] dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-200 dark:hover:border-[#d6b36a] dark:hover:text-[#d6b36a] ${
        displayWishlisted ? "text-[#9a763d] dark:text-[#d6b36a]" : ""
      }`}
    >
      <Heart
        className={`h-4 w-4 ${displayWishlisted ? "fill-current" : ""}`}
        aria-hidden="true"
      />
    </button>
  );
}
