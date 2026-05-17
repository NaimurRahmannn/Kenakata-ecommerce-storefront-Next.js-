import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";

import { Container } from "@/components/shared/container";
import { EmptyState } from "@/components/shared/empty-state";
import { SectionTitle } from "@/components/shared/section-title";
import { ButtonLink } from "@/components/ui/button";
import { getProducts } from "@/lib/api";
import { formatCurrency, safeImage } from "@/lib/utils";
import type { Product } from "@/types/product";

function getReviewCount(productId: number) {
  return 96 + (productId % 54);
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-[#eadfce] bg-[#fffdf8] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c3a06a] hover:shadow-xl hover:shadow-zinc-900/10">
      <div className="relative h-72 bg-[#f3ede3]">
        <Link href={`/products/${product.id}`} aria-label={product.title}>
          <Image
            src={safeImage(product.images?.[0])}
            alt={product.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
        </Link>
        <button
          type="button"
          aria-label={`Add ${product.title} to wishlist`}
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#eadfce] bg-white/90 text-zinc-800 shadow-sm transition-colors hover:border-[#b08d57] hover:text-[#9a763d]"
        >
          <Heart className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="flex min-h-64 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9a763d]">
          {product.category?.name ?? "Collection"}
        </p>

        <h3 className="mt-3 line-clamp-2 min-h-12 text-lg font-semibold leading-6 text-zinc-950">
          <Link
            href={`/products/${product.id}`}
            className="transition-colors hover:text-[#9a763d]"
          >
            {product.title}
          </Link>
        </h3>

        <div className="mt-4 flex items-center gap-2">
          <div className="flex items-center gap-0.5 text-[#b08d57]">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className="h-4 w-4 fill-current"
                aria-hidden="true"
              />
            ))}
          </div>
          <span className="text-sm text-zinc-500">
            ({getReviewCount(product.id)})
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <p className="text-lg font-semibold text-zinc-950">
            {formatCurrency(product.price)}
          </p>
          <ButtonLink
            href={`/products/${product.id}`}
            variant="outline"
            size="sm"
            className="border-[#c3a06a] text-zinc-950 hover:bg-[#f6efe4]"
          >
            View Details
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}

export async function FeaturedProducts() {
  let products: Product[] = [];

  try {
    products = (await getProducts()).slice(0, 4);
  } catch {
    products = [];
  }

  return (
    <section className="bg-[#faf7f1] pb-16 pt-8 sm:pb-20 sm:pt-10 lg:pb-24 lg:pt-10">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#9a763d]">
              FEATURED PRODUCTS
            </p>
            <SectionTitle
              title="Shop Our Bestsellers"
              className="mt-3 [&_h2]:text-zinc-950"
            />
          </div>

          <Link
            href="/products"
            className="text-sm font-semibold text-zinc-950 underline decoration-[#c3a06a] decoration-2 underline-offset-8 transition-colors hover:text-[#9a763d]"
          >
            View all
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No featured products available"
            description="Please check back soon for our latest bestsellers."
            actionLabel="Browse products"
            actionHref="/products"
            className="mt-10 border-[#eadfce] bg-[#fffdf8] text-zinc-950"
          />
        )}
      </Container>
    </section>
  );
}
