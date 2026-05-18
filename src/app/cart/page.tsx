import Image from "next/image";
import Link from "next/link";
import { Trash2, Truck } from "lucide-react";

import { Container } from "@/components/shared/container";

const cartItems = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "Noise cancelling over-ear",
    price: "$179.99",
    total: "$179.99",
  },
  {
    id: 2,
    name: "Classic Watch",
    description: "Gold plated case",
    price: "$129.99",
    total: "$129.99",
  },
  {
    id: 3,
    name: "Leather Handbag",
    description: "Italian leather finish",
    price: "$169.99",
    total: "$169.99",
  },
];

const paymentBadges = [
  "Visa",
  "Mastercard",
  "Amex",
  "Apple Pay",
  "PayPal",
  "Shop",
];

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

        <section className="mt-6 rounded-xl border border-[#e8dfd3] bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center gap-4">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f4eddf] text-[#9a763d]">
              <Truck className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-zinc-950">
                You&apos;re $29.03 away from free shipping!
              </p>
              <div className="mt-2 h-2 w-full rounded-full bg-[#f5efe5]">
                <div className="h-2 w-[70%] rounded-full bg-[#c3a06a]" />
              </div>
            </div>
            <p className="text-sm font-semibold text-zinc-950">
              $69.97 / $99
            </p>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.65fr_1fr]">
          <div className="rounded-xl border border-[#e8dfd3] bg-white shadow-sm">
            <div className="hidden grid-cols-[2.2fr_0.9fr_1fr_0.8fr_0.4fr] gap-4 border-b border-[#eee5d8] px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 lg:grid">
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Total</span>
              <span>Remove</span>
            </div>

            <div className="divide-y divide-[#eee5d8]">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="grid gap-4 px-6 py-5 lg:grid-cols-[2.2fr_0.9fr_1fr_0.8fr_0.4fr] lg:items-center"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative h-20 w-20 overflow-hidden rounded-lg border border-[#e8dfd3] bg-[#faf7f1]">
                      <Image
                        src="/images/hero-img.png"
                        alt=""
                        fill
                        sizes="80px"
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-950">
                        {item.name}
                      </p>
                      <p className="mt-1 text-xs text-zinc-600">
                        {item.description}
                      </p>
                      <div className="mt-2 flex items-center gap-2 text-xs text-zinc-600">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        In Stock
                      </div>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-zinc-950">
                    {item.price}
                  </p>
                  <div className="flex items-center rounded-lg border border-[#e8dfd3] bg-[#fffdf8]">
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
                  <p className="text-sm font-semibold text-zinc-950">
                    {item.total}
                  </p>
                  <button
                    type="button"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#eadfce] text-zinc-500 transition-colors hover:border-[#c3a06a] hover:text-[#9a763d]"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#eee5d8] px-6 py-4">
              <Link
                href="/products"
                className="text-sm font-semibold text-zinc-950 underline decoration-[#c3a06a] decoration-2 underline-offset-8 transition-colors hover:text-[#9a763d]"
              >
                Continue Shopping
              </Link>
            </div>
          </div>

          <aside className="h-fit rounded-xl border border-[#e8dfd3] bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-zinc-950">Order Summary</h2>
            <div className="mt-5 space-y-3 text-sm text-zinc-600">
              <div className="flex items-center justify-between">
                <span>Subtotal (3 items)</span>
                <span className="font-semibold text-zinc-950">$479.97</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span className="font-semibold text-zinc-950">$0.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Tax (estimated)</span>
                <span className="font-semibold text-zinc-950">$38.40</span>
              </div>
            </div>

            <div className="mt-5">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Discount code
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code 123"
                  className="w-full rounded-lg border border-[#e8dfd3] bg-[#fffdf8] px-3 py-2 text-sm text-zinc-700 outline-none focus:border-[#c3a06a]"
                />
                <button
                  type="button"
                  className="rounded-lg border border-[#c3a06a] px-4 py-2 text-sm font-semibold text-[#9a763d] transition-colors hover:bg-[#f4eddf]"
                >
                  Apply
                </button>
              </div>
            </div>

            <div className="mt-6 border-t border-[#eee5d8] pt-4">
              <div className="flex items-center justify-between text-base font-semibold text-zinc-950">
                <span>Total</span>
                <span>USD $518.37</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Link
                href="/checkout"
                className="block rounded-lg bg-zinc-950 px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-zinc-900"
              >
                Proceed to Checkout
              </Link>
              <Link
                href="/products"
                className="block rounded-lg border border-[#c3a06a] bg-[#f3eadc] px-4 py-3 text-center text-sm font-semibold text-[#9a763d] transition-colors hover:bg-[#eadcc7]"
              >
                Continue Shopping
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 text-xs text-zinc-500">
              {paymentBadges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-[#e8dfd3] px-3 py-1"
                >
                  {badge}
                </span>
              ))}
            </div>
          </aside>
        </section>

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