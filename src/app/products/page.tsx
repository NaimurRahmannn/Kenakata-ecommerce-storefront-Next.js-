import Link from "next/link";

import { Container } from "@/components/shared/container";

const filterSections = ["Categories", "Price Range", "Brand", "Rating"];

export default function ProductsPage() {
  return (
    <div className="bg-[#fffdf8] text-zinc-950">
      <Container className="py-10 sm:py-12 lg:py-14">
        <section aria-labelledby="shop-title">
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

          <h1
            id="shop-title"
            className="mt-4 text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl"
          >
            Shop
          </h1>
        </section>

        <section className="mt-8 overflow-hidden rounded-2xl border border-[#e8dfd3] bg-[#faf7f1] shadow-sm">
          <div className="grid min-h-80 items-center gap-8 p-6 sm:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#9a763d]">
                Discover our premium collection
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-zinc-950 sm:text-5xl">
                Quality. Style. Value.
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                Handpicked products, just for you.
              </p>
            </div>

            <div className="relative hidden min-h-60 lg:block">
              <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-[#fffdf8] via-[#f2e8d7] to-[#d8c3a3]" />
              <div className="absolute bottom-8 left-12 h-7 w-64 rounded-full bg-zinc-950/10 blur-md" />
              <div className="absolute bottom-12 left-10 h-10 w-72 rounded-md bg-[#d8c3a3]" />
              <div className="absolute bottom-22 left-20 h-24 w-44 rounded-t-4xl rounded-b-lg border border-[#b88a39]/40 bg-[#fffdf8] shadow-xl shadow-zinc-900/10" />
              <div className="absolute bottom-36 left-32 h-14 w-20 rounded-t-full border-x border-t border-[#b88a39]/50" />
              <div className="absolute bottom-26.5 left-52 h-28 w-16 rounded-lg border border-[#d8c3a3] bg-white/70 shadow-lg" />
              <div className="absolute bottom-29 left-61 h-20 w-8 rounded-full bg-[#b88a39]/20" />
              <div className="absolute right-10 top-10 h-28 w-44 rounded-xl border border-white/70 bg-white/45 p-4 shadow-lg backdrop-blur-sm">
                <div className="h-3 w-20 rounded-full bg-[#b88a39]/50" />
                <div className="mt-4 h-2 w-32 rounded-full bg-zinc-950/15" />
                <div className="mt-2 h-2 w-24 rounded-full bg-zinc-950/10" />
                <div className="mt-6 h-8 w-24 rounded-md bg-zinc-950" />
              </div>
            </div>
          </div>
        </section>

        <section
          className="mt-10 grid gap-6 lg:grid-cols-[260px_1fr]"
          aria-label="Shop content"
        >
          <aside className="h-fit rounded-xl border border-[#e8dfd3] bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-950">Filters</h2>
            <div className="mt-5 space-y-4">
              {filterSections.map((section) => (
                <div
                  key={section}
                  className="border-t border-[#eee5d8] pt-4 first:border-t-0 first:pt-0"
                >
                  <h3 className="text-sm font-semibold text-zinc-950">
                    {section}
                  </h3>
                  <div className="mt-3 space-y-2">
                    <div className="h-2.5 w-4/5 rounded-full bg-[#efe6d7]" />
                    <div className="h-2.5 w-3/5 rounded-full bg-[#f5efe6]" />
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <div className="rounded-xl border border-[#e8dfd3] bg-white p-5 shadow-sm">
            <div className="grid gap-3 md:grid-cols-[1fr_auto_auto] md:items-center">
              <div className="rounded-md border border-[#ded4c5] bg-[#fffdf8] px-4 py-3 text-sm text-zinc-400">
                Search products...
              </div>
              <div className="rounded-md border border-[#ded4c5] bg-[#fffdf8] px-4 py-3 text-sm font-medium text-zinc-700">
                Sort by: Newest
              </div>
              <div className="rounded-md border border-[#ded4c5] bg-[#fffdf8] px-4 py-3 text-sm font-medium text-zinc-700">
                Show: 12
              </div>
            </div>

            <div className="mt-5 flex min-h-105 items-center justify-center rounded-xl border border-dashed border-[#d8c3a3] bg-[#faf7f1] px-6 text-center">
              <p className="text-sm font-medium text-zinc-600">
                Product grid will be added in the next step.
              </p>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
