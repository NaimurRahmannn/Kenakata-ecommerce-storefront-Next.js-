import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";

import { formatCurrency, safeImage } from "@/lib/utils";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

function getReviewCount(productId: number) {
  return 40 + (productId % 90);
}

export function ProductCard({ product }: ProductCardProps) {
  const productHref = `/products/${product.id}`;

  return (
    <article className="group overflow-hidden rounded-lg border border-[#e8dfd3] bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c3a06a] hover:shadow-lg hover:shadow-zinc-900/10">
      <div className="relative h-44 bg-[#faf7f1] sm:h-48">
        <Link href={productHref} aria-label={product.title}>
          <Image
            src={safeImage(product.images?.[0])}
            alt={product.title}
            fill
            sizes="(min-width: 1536px) 18vw, (min-width: 1024px) 24vw, (min-width: 640px) 45vw, 100vw"
            className="object-contain p-5 transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
        </Link>

        <button
          type="button"
          aria-label={`Add ${product.title} to wishlist`}
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-zinc-600 transition-colors hover:bg-white/80 hover:text-[#9a763d]"
        >
          <Heart className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div className="border-t border-[#eee5d8] p-4">
        <h2 className="line-clamp-1 text-base font-semibold leading-6 text-zinc-950">
          <Link href={productHref} className="transition-colors hover:text-[#9a763d]">
            {product.title}
          </Link>
        </h2>

        <p className="mt-1 text-sm font-semibold text-zinc-950">
          {formatCurrency(product.price)}
        </p>

        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center gap-0.5 text-[#b88a39]">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className="h-3.5 w-3.5 fill-current"
                aria-hidden="true"
              />
            ))}
          </div>
          <span className="text-xs text-zinc-500">
            ({getReviewCount(product.id)})
          </span>
        </div>
      </div>
    </article>
  );
}
