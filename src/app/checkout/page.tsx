import Link from "next/link";

import { CheckoutContent } from "@/features/checkout/components/checkout-content";

export default function CheckoutPage() {
  return (
    <main className="bg-white dark:bg-[#0f0e0c] dark:text-zinc-100">
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-zinc-400">
          <Link
            href="/"
            className="hover:text-neutral-900 dark:hover:text-zinc-100"
          >
            Home
          </Link>
          <span>&gt;</span>
          <Link
            href="/cart"
            className="hover:text-neutral-900 dark:hover:text-zinc-100"
          >
            Cart
          </Link>
          <span>&gt;</span>
          <span className="font-medium text-neutral-700 dark:text-zinc-300">
            Checkout
          </span>
        </div>

        <h1 className="mt-4 font-serif text-4xl font-semibold text-neutral-950 md:text-5xl dark:text-zinc-100">
          Checkout
        </h1>

        {/* Steps */}
        <div className="mt-6 flex max-w-3xl items-center">
          <CheckoutStep number="1" title="Shipping" active />
          <div className="h-px flex-1 bg-[#c98a24] dark:bg-[#d6b36a]" />
          <CheckoutStep number="2" title="Payment" />
          <div className="h-px flex-1 bg-neutral-200 dark:bg-zinc-700" />
          <CheckoutStep number="3" title="Review" />
        </div>

        <CheckoutContent />
      </section>
    </main>
  );
}

function CheckoutStep({
  number,
  title,
  active = false,
}: {
  number: string;
  title: string;
  active?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold ${
          active
            ? "border-[#c98a24] bg-[#c98a24] text-white dark:border-[#d6b36a] dark:bg-[#d6b36a] dark:text-[#0f0e0c]"
            : "border-neutral-200 bg-white text-neutral-950 dark:border-zinc-700 dark:bg-[#141310] dark:text-zinc-100"
        }`}
      >
        {number}
      </span>
      <span
        className={`text-sm font-medium ${
          active
            ? "text-[#c98a24] dark:text-[#d6b36a]"
            : "text-neutral-700 dark:text-zinc-400"
        }`}
      >
        {title}
      </span>
    </div>
  );
}
