import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Heart, Star } from "lucide-react";

import { Container } from "@/components/shared/container";
import { getProductById } from "@/lib/api";
import { formatCurrency, safeImage } from "@/lib/utils";
import type { Product } from "@/types/product";

interface ProductDetailsPageProps {
  params:
    | {
        id: string;
      }
    | Promise<{
        id: string;
      }>;
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const productId = Number.parseInt(resolvedParams.id, 10);

  if (Number.isNaN(productId)) {
    notFound();
  }

  let product: Product;

  try {
    product = await getProductById(productId);
  } catch {
    notFound();
  }

  if (!product) {
    notFound();
  }

  const images = product.images?.filter(Boolean) ?? [];
  const mainImage = safeImage(images[0]);
  const thumbnails = images.slice(0, 4);

  return (
    <div className="bg-[#fffdf8] text-zinc-950">
      <Container className="py-8 sm:py-10 lg:py-12">
        <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
          <Link
            href="/"
            className="text-zinc-500 transition-colors hover:text-[#9a763d]"
          >
            Home
          </Link>
          <span className="text-[#9a763d]" aria-hidden="true">
            &gt;
          </span>
          <Link
            href="/products"
            className="text-zinc-500 transition-colors hover:text-[#9a763d]"
          >
            Shop
          </Link>
          <span className="text-[#9a763d]" aria-hidden="true">
            &gt;
          </span>
          <span className="font-medium text-[#9a763d]">{product.title}</span>
        </nav>

        <section className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-xl border border-[#e8dfd3] bg-[#faf7f1] p-6 shadow-sm">
              <div className="relative aspect-[4/5]">
                <Image
                  src={mainImage}
                  alt={product.title}
                  fill
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>

            {thumbnails.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {thumbnails.map((image, index) => (
                  <div
                    key={`${image}-${index}`}
                    className={`relative h-20 w-20 overflow-hidden rounded-lg border bg-[#faf7f1] ${
                      index === 0
                        ? "border-[#c3a06a]"
                        : "border-[#e8dfd3]"
                    }`}
                  >
                    <Image
                      src={safeImage(image)}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-contain p-2"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {product.title}
              </h1>
              <p className="mt-3 text-2xl font-semibold text-zinc-950">
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
                <span className="text-sm text-zinc-500">(128 reviews)</span>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-zinc-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                In Stock
              </div>
            </div>

            <p className="text-base leading-7 text-zinc-600">
              {product.description}
            </p>

            <ul className="space-y-2 text-sm text-zinc-700">
              <li>Premium Quality</li>
              <li>Fast Delivery</li>
              <li>Secure Checkout</li>
              <li>Easy Returns</li>
            </ul>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center rounded-lg border border-[#e8dfd3] bg-white">
                  <button
                    type="button"
                    className="px-3 py-2 text-zinc-500"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-4 text-sm font-semibold">1</span>
                  <button
                    type="button"
                    className="px-3 py-2 text-zinc-500"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  className="rounded-lg bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-900"
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-[#c3a06a] bg-[#f3eadc] px-6 py-3 text-sm font-semibold text-[#9a763d] transition-colors hover:bg-[#eadcc7]"
                >
                  Buy Now
                </button>
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-[#9a763d]"
              >
                <Heart className="h-4 w-4" aria-hidden="true" />
                Add to Wishlist
              </button>
            </div>
          </div>
        </section>

        <section className="mt-12 rounded-xl border border-[#e8dfd3] bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-6 border-b border-[#eee5d8] pb-3 text-sm font-medium text-zinc-600">
            <span className="border-b-2 border-[#c3a06a] pb-2 text-zinc-950">
              Description
            </span>
            <span>Reviews</span>
            <span>Shipping &amp; Returns</span>
          </div>
          <p className="mt-4 text-sm leading-7 text-zinc-600">
            {product.description}
          </p>
        </section>
      </Container>
    </div>
  );
}