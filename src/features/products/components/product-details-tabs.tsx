"use client";

import { useState } from "react";
import { Star } from "lucide-react";

type TabKey = "description" | "reviews" | "shipping";

interface ProductDetailsTabsProps {
  description: string;
}

const tabs: { key: TabKey; label: string }[] = [
  { key: "description", label: "Description" },
  { key: "reviews", label: "Reviews" },
  { key: "shipping", label: "Shipping & Returns" },
];

export function ProductDetailsTabs({ description }: ProductDetailsTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("description");

  return (
    <section className="mt-12 rounded-xl border border-[#e8dfd3] bg-white p-6 shadow-sm">
      <div
        role="tablist"
        aria-label="Product details tabs"
        className="flex flex-wrap items-center gap-6 border-b border-[#eee5d8] pb-3 text-sm font-medium"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-2 transition-colors ${
                isActive
                  ? "border-b-2 border-[#c3a06a] text-zinc-950"
                  : "text-zinc-500 hover:text-[#9a763d]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" className="mt-5">
        {activeTab === "description" && (
          <div className="space-y-4">
            <p className="text-sm leading-7 text-zinc-600">{description}</p>

            <ul className="space-y-2 text-sm text-zinc-700">
              <li>• Crafted with premium materials</li>
              <li>• Designed for everyday comfort</li>
              <li>• Quality checked before shipping</li>
            </ul>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-semibold text-zinc-950">
                  4.8 out of 5
                </p>
                <div className="flex text-[#b88a39]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className="h-4 w-4 fill-current"
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
              <p className="mt-1 text-sm text-zinc-500">
                Based on 128 customer reviews
              </p>
            </div>

            <div className="space-y-4">
              <article className="rounded-lg border border-[#eee5d8] bg-[#fffdf8] p-4">
                <div className="mb-1 flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-zinc-950">
                    Ayesha Rahman
                  </h3>
                  <span className="text-sm text-[#b88a39]">★★★★★</span>
                </div>
                <p className="text-sm leading-6 text-zinc-600">
                  Beautiful product and the quality feels premium.
                </p>
              </article>

              <article className="rounded-lg border border-[#eee5d8] bg-[#fffdf8] p-4">
                <div className="mb-1 flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-zinc-950">
                    Tanvir Hasan
                  </h3>
                  <span className="text-sm text-[#b88a39]">★★★★★</span>
                </div>
                <p className="text-sm leading-6 text-zinc-600">
                  Fast delivery and exactly as described.
                </p>
              </article>
            </div>
          </div>
        )}

        {activeTab === "shipping" && (
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-base font-semibold text-zinc-950">
                Shipping Information
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-600">
                <li>• Standard delivery: 3-5 business days</li>
                <li>• Express delivery: 1-2 business days</li>
                <li>• Free delivery on orders over $100</li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-semibold text-zinc-950">
                Return Policy
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-600">
                <li>• Easy returns within 7 days</li>
                <li>• Items must be unused and in original packaging</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}