"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Headphones,
  Info,
  Lock,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";

import { paymentMethods } from "@/constants/payment-methods";
import { getCartSummary } from "@/features/cart/lib/cart-summary";
import { useHydrated } from "@/lib/use-hydrated";
import { formatCurrency, safeImage } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";

type CheckoutOrderSummaryProps = {
  shippingPrice: number;
  shippingDescription?: string;
  formId: string;
  isSubmitting: boolean;
};

export function CheckoutOrderSummary({
  shippingPrice,
  shippingDescription = "Standard Shipping (3-5 business days)",
  formId,
  isSubmitting,
}: CheckoutOrderSummaryProps) {
  const items = useCartStore((state) => state.items);
  const mounted = useHydrated();

  if (!mounted) {
    return (
      <aside className="h-fit rounded-xl border border-neutral-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
        <div className="h-6 w-36 rounded-md bg-[#f5efe5]" />
        <div className="mt-5 space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-5 w-full rounded-md bg-[#faf7f1]"
            />
          ))}
        </div>
      </aside>
    );
  }

  const { quantity, subtotal, tax } = getCartSummary(items);
  const hasItems = items.length > 0;
  const effectiveShipping = hasItems ? shippingPrice : 0;
  const shippingLabel =
    effectiveShipping === 0
      ? "FREE"
      : formatCurrency(effectiveShipping);
  const total = subtotal + tax + effectiveShipping;

  return (
    <aside className="h-fit rounded-xl border border-neutral-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
      <h2 className="font-serif text-2xl font-semibold text-neutral-950">
        Order Summary
      </h2>

      {hasItems ? (
        <div className="mt-5 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-neutral-100">
                <Image
                  src={safeImage(item.image)}
                  alt={item.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              <div className="flex-1">
                <h3 className="font-serif text-base font-semibold text-neutral-950">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-neutral-500">
                  Qty: {item.quantity}
                </p>
              </div>

              <p className="font-semibold text-neutral-950">
                {formatCurrency(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-lg border border-neutral-200 bg-[#faf7f1] p-4 text-sm text-neutral-600">
          Your cart is empty. {" "}
          <Link href="/products" className="font-semibold text-[#a46d1e]">
            Browse products
          </Link>
        </div>
      )}

      <div className="mt-6 border-t border-neutral-200 pt-5">
        <SummaryRow
          label={`Subtotal (${quantity} ${quantity === 1 ? "item" : "items"})`}
          value={formatCurrency(subtotal)}
        />
        <div className="mt-3">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1 text-neutral-700">
              Shipping <Info className="h-3.5 w-3.5" />
            </span>
            <span
              className={`font-semibold ${
                effectiveShipping === 0
                  ? "text-green-700"
                  : "text-neutral-950"
              }`}
            >
              {shippingLabel}
            </span>
          </div>
          <p
            className={`mt-1 text-sm ${
              effectiveShipping === 0
                ? "text-green-700"
                : "text-neutral-500"
            }`}
          >
            {shippingDescription}
          </p>
        </div>
        <SummaryRow
          label="Tax (estimated)"
          value={formatCurrency(tax)}
          info
        />
      </div>

      <div className="mt-5 border-t border-neutral-200 pt-5">
        <p className="text-sm text-neutral-700">Have a discount code?</p>
        <div className="mt-2 flex gap-3">
          <input
            type="text"
            placeholder="Enter code"
            className="h-11 flex-1 rounded-lg border border-neutral-300 px-4 text-sm outline-none focus:border-neutral-900"
          />
          <button className="h-11 rounded-lg bg-[#ead8c3] px-7 text-sm font-semibold text-neutral-950 transition hover:bg-[#dfc4a6]">
            Apply
          </button>
        </div>
      </div>

      <div className="mt-5 border-t border-neutral-200 pt-5">
        <div className="flex items-end justify-between">
          <span className="font-serif text-2xl font-semibold">Total</span>
          <div className="text-right">
            <span className="mr-2 text-sm text-neutral-500">USD</span>
            <span className="text-3xl font-bold text-neutral-950">
              {formatCurrency(total)}
            </span>
          </div>
        </div>

        <button
          type="submit"
          form={formId}
          disabled={!hasItems || isSubmitting}
          className={`mt-5 flex h-12 w-full items-center justify-center gap-3 rounded-lg text-sm font-semibold transition ${
            !hasItems || isSubmitting
              ? "cursor-not-allowed bg-neutral-200 text-neutral-500"
              : "bg-neutral-950 text-white hover:bg-neutral-800"
          }`}
        >
          <Lock className="h-4 w-4" />
          {isSubmitting ? "Placing order..." : "Place Order"}
        </button>

        <div className="mt-4 text-center">
          <div className="flex items-center justify-center gap-2 text-sm font-medium text-neutral-800">
            <ShieldCheck className="h-4 w-4" />
            Secure Checkout
          </div>
          <p className="mt-1 text-sm text-neutral-500">
            Your information is encrypted and safe.
          </p>
        </div>

        <div className="mt-5 grid grid-cols-3 rounded-lg border border-neutral-200 py-4 text-center">
          <MiniFeature
            icon={<RefreshCcw className="h-5 w-5" />}
            title="Free Returns"
            text="30-day return policy"
          />
          <MiniFeature
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Secure Payment"
            text="100% secure checkout"
          />
          <MiniFeature
            icon={<Headphones className="h-5 w-5" />}
            title="Customer Support"
            text="24/7 dedicated support"
          />
        </div>

        <div className="mt-5">
          <p className="text-sm text-neutral-600">We accept</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {paymentMethods.map((method) => (
              <span
                key={method.label}
                className="inline-flex h-8 min-w-12 items-center justify-center rounded border border-neutral-200 bg-white px-2 shadow-sm"
              >
                <Image
                  src={method.src}
                  alt={method.label}
                  width={method.width}
                  height={method.height}
                  unoptimized
                  className="max-h-5 w-auto object-contain"
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

function SummaryRow({
  label,
  value,
  info = false,
}: {
  label: string;
  value: string;
  info?: boolean;
}) {
  return (
    <div className="mt-3 flex items-center justify-between text-sm">
      <span className="flex items-center gap-1 text-neutral-700">
        {label}
        {info && <Info className="h-3.5 w-3.5" />}
      </span>
      <span className="font-semibold text-neutral-950">{value}</span>
    </div>
  );
}

function MiniFeature({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="border-r border-neutral-200 px-2 last:border-r-0">
      <div className="mx-auto flex justify-center text-[#c17a1c]">
        {icon}
      </div>
      <h4 className="mt-2 text-xs font-semibold text-neutral-950">{title}</h4>
      <p className="mt-1 text-[11px] text-neutral-500">{text}</p>
    </div>
  );
}
