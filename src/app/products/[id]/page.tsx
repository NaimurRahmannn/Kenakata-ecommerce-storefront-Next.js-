import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/shared/container";
import { ProductDetailsTabs } from "@/features/products/components/product-details-tabs";
import { ProductImageGallery } from "@/features/products/components/product-image-gallery";
import { ProductInfo } from "@/features/products/components/product-info";
import { RelatedProducts } from "@/features/products/components/related-products";
import { getProductById } from "@/lib/api";
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
          <ProductImageGallery images={product.images} title={product.title} />
          <ProductInfo product={product} />
        </section>

        <ProductDetailsTabs description={product.description} />

        <RelatedProducts
          currentProductId={product.id}
          categoryId={product.category?.id}
        />
      </Container>
    </div>
  );
}