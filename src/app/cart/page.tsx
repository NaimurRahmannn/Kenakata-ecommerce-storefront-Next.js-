import Link from "next/link";

import { Container } from "@/components/shared/container";
import { CartPageContent } from "@/features/cart/components/cart-page-content";

export default function CartPage() {
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
          <span className="font-medium text-[#9a763d]">Cart</span>
        </nav>

        <div className="mt-6 flex flex-col gap-2">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Your Cart
          </h1>
          <p className="text-sm text-zinc-600">
            Review your selections before checkout.
          </p>
        </div>

        <CartPageContent />

        <section className="mt-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-zinc-950">
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
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-64 rounded-xl border border-[#e8dfd3] bg-white shadow-sm"
              />
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
