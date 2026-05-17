import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp, Search, SlidersHorizontal } from "lucide-react";

import { Container } from "@/components/shared/container";
import { ProductGrid } from "@/features/products/components/product-grid";
import { getProducts } from "@/lib/api";
import type { Product } from "@/types/product";

const filterSections = [
  {
    title: "Categories",
    items: ["Electronics", "Fashion", "Home & Living", "Beauty"],
  },
  {
    title: "Price Range",
    items: ["$10", "$500+"],
  },
  {
    title: "Brand",
    items: ["Apple", "Samsung", "Sony", "Nike"],
  },
  {
    title: "Rating",
    items: ["5 stars", "4 stars", "3 stars", "2 stars & up"],
  },
];

export default async function ProductsPage() {
  let products: Product[] = [];

  try {
    products = (await getProducts()).slice(0, 50);
  } catch {
    products = [];
  }

  return (
    <div className="bg-[#fffdf8] text-zinc-950">
      <Container className="py-8 sm:py-9 lg:py-10">
        <section aria-labelledby="shop-title">
           <h1
            id="shop-title"
            className="mt-4 text-5xl font-medium tracking-tight text-zinc-950 sm:text-6xl"
          >
            Shop
          </h1>
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
            <span className="font-medium text-[#9a763d]">Shop</span>
          </nav>
        </section>

        <section className="relative mt-6 overflow-hidden rounded-lg border border-[#e8dfd3] bg-[#faf7f1] shadow-sm">
          <Image
            src="/images/hero-img.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 object-cover object-[78%_center]"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#faf7f1] via-[#faf7f1]/92 to-[#faf7f1]/8" />

          <div className="relative flex min-h-44 items-center p-6 sm:p-8 lg:min-h-46 lg:p-9">
            <div className="max-w-xl">
              <p className="text-sm font-medium text-zinc-950">
                Discover our premium collection
              </p>
              <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-zinc-950 sm:text-5xl">
                Quality. Style. Value.
              </h2>
              <p className="mt-3 text-base leading-7 text-zinc-600">
                Handpicked products, just for you.
              </p>
            </div>
          </div>
        </section>

        <section
          className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr]"
          aria-label="Shop content"
        >
          <aside className="h-fit overflow-hidden rounded-lg border border-[#e8dfd3] bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-[#eee5d8] px-4 py-3">
              <h2 className="inline-flex items-center gap-2 text-base font-semibold text-zinc-950">
                <SlidersHorizontal className="h-4 w-4 text-[#9a763d]" />
                Filters
              </h2>
              <span className="text-sm text-zinc-500">Clear all</span>
            </div>

            <div>
              {filterSections.map((section, sectionIndex) => (
                <div
                  key={section.title}
                  className="border-b border-[#eee5d8] px-4 py-4 last:border-b-0"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-zinc-950">
                      {section.title}
                    </h3>
                    {sectionIndex === 0 ? (
                      <ChevronUp className="h-4 w-4 text-zinc-500" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-zinc-500" />
                    )}
                  </div>
                  <div className="mt-3 space-y-2.5">
                    {section.items.map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <span className="h-3.5 w-3.5 rounded border border-[#d6cbbc] bg-[#fffdf8]" />
                        <span className="text-sm text-zinc-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <div>
            <div className="grid gap-3 md:grid-cols-[1fr_auto_auto] md:items-center">
              <div className="flex items-center gap-3 rounded-lg border border-[#ded4c5] bg-white px-4 py-3 text-sm text-zinc-400 shadow-sm">
                <Search className="h-5 w-5 text-zinc-950" />
                Search products...
              </div>
              <div className="flex min-w-44 items-center justify-between gap-6 rounded-lg border border-[#ded4c5] bg-white px-4 py-3 text-sm text-zinc-700 shadow-sm">
                <span>
                  Sort by: <span className="font-medium text-zinc-950">Newest</span>
                </span>
                <ChevronDown className="h-4 w-4 text-zinc-500" />
              </div>
              <div className="flex min-w-36 items-center justify-between gap-6 rounded-lg border border-[#ded4c5] bg-white px-4 py-3 text-sm text-zinc-700 shadow-sm">
                <span>
                  Show: <span className="font-medium text-zinc-950">12</span>
                </span>
                <ChevronDown className="h-4 w-4 text-zinc-500" />
              </div>
            </div>

            <div className="mt-5">
              <ProductGrid products={products} />
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
