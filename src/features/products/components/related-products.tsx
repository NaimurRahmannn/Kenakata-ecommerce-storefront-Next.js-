import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";

import { getProducts } from "@/lib/api";
import { formatCurrency, safeImage } from "@/lib/utils";
import type { Product } from "@/types/product";

interface RelatedProductsProps {
  currentProductId: number;
  categoryId?: number;
}

const MAX_RELATED = 4;

export async function RelatedProducts({
  currentProductId,
  categoryId,
}: RelatedProductsProps) {
  let products: Product[] = [];

  try {
    products = await getProducts(60, { cache: "no-store" });
  } catch {
    products = [];
  }

  const availableProducts = products.filter(
    (product) => product.id !== currentProductId
  );
  const sameCategory = categoryId
    ? availableProducts.filter((product) => product.category?.id === categoryId)
    : [];
  const sameCategoryIds = new Set(sameCategory.map((product) => product.id));
  const otherProducts = availableProducts.filter(
    (product) => !sameCategoryIds.has(product.id)
  );

  const related = [...sameCategory, ...otherProducts].slice(0, MAX_RELATED);

  if (related.length === 0) {
    return null;
  }

  return (
    <section className="mt-12" aria-labelledby="related-products">
      <div className="flex items-center justify-between">
        <h2
          id="related-products"
          className="text-2xl font-Medium tracking-tight text-zinc-950"
        >
          Related Products
        </h2>
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {related.map((product) => (
          <article
            key={product.id}
            className="group overflow-hidden rounded-lg border border-[#e8dfd3] bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c3a06a] hover:shadow-lg hover:shadow-zinc-900/10"
          >
            <div className="relative h-44 bg-[#faf7f1]">
              <Link href={`/products/${product.id}`} aria-label={product.title}>
                <Image
                  src={safeImage(product.images?.[0])}
                  alt={product.title}
                  fill
                  sizes="(min-width: 1024px) 20vw, 100vw"
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
              <h3 className="line-clamp-1 text-base font-semibold leading-6 text-zinc-950">
                <Link
                  href={`/products/${product.id}`}
                  className="transition-colors hover:text-[#9a763d]"
                >
                  {product.title}
                </Link>
              </h3>
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
                <span className="text-xs text-zinc-500">(128)</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
