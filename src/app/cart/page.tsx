import Link from "next/link";

import { Container } from "@/components/shared/container";
import { CartPageContent } from "@/features/cart/components/cart-page-content";
import { getProducts } from "@/lib/api";
import type { Product } from "@/types/product";

export default async function CartPage() {
  let products: Product[] = [];

  try {
    products = await getProducts(60, { cache: "no-store" });
  } catch {
    products = [];
  }

  return (
    <div className="bg-[#fffdf8] text-zinc-950 dark:bg-[#0f0e0c] dark:text-zinc-100">
      <Container className="py-8 sm:py-10 lg:py-12">
        <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
          <Link
            href="/"
            className="text-zinc-500 transition-colors hover:text-[#9a763d] dark:text-zinc-400 dark:hover:text-[#d6b36a]"
          >
            Home
          </Link>
          <span className="text-[#9a763d] dark:text-[#d6b36a]" aria-hidden="true">
            &gt;
          </span>
          <span className="font-medium text-[#9a763d] dark:text-[#d6b36a]">
            Cart
          </span>
        </nav>

        <div className="mt-6 flex flex-col gap-2">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl dark:text-zinc-100">
            Your Cart
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Review your selections before checkout.
          </p>
        </div>

        <CartPageContent products={products} />
      </Container>
    </div>
  );
}
