import Image from "next/image";
import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";

import { Container } from "@/components/shared/container";
import { FiltersDrawer } from "@/features/products/components/filters-drawer";
import { FiltersPanel } from "@/features/products/components/filters-panel";
import { ProductGrid } from "@/features/products/components/product-grid";
import { SortSelect } from "@/features/products/components/sort-select";
import { getCategories, getProducts } from "@/lib/api";
import type { Category } from "@/types/category";
import type { Product } from "@/types/product";

export const dynamic = "force-dynamic";

const ITEMS_PER_PAGE = 12;
const TOTAL_PRODUCTS = 60;

interface ProductsPageProps {
  searchParams?:
    | {
        page?: string | string[];
        q?: string | string[];
        sort?: string | string[];
        min?: string | string[];
        max?: string | string[];
        category?: string | string[];
      }
    | Promise<{
        page?: string | string[];
        q?: string | string[];
        sort?: string | string[];
        min?: string | string[];
        max?: string | string[];
        category?: string | string[];
      }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const pageParam = Array.isArray(resolvedSearchParams?.page)
    ? resolvedSearchParams?.page[0]
    : resolvedSearchParams?.page;
  const queryParam = Array.isArray(resolvedSearchParams?.q)
    ? resolvedSearchParams?.q[0]
    : resolvedSearchParams?.q;
  const sortParam = Array.isArray(resolvedSearchParams?.sort)
    ? resolvedSearchParams?.sort[0]
    : resolvedSearchParams?.sort;
  const minParam = Array.isArray(resolvedSearchParams?.min)
    ? resolvedSearchParams?.min[0]
    : resolvedSearchParams?.min;
  const maxParam = Array.isArray(resolvedSearchParams?.max)
    ? resolvedSearchParams?.max[0]
    : resolvedSearchParams?.max;
  const categoryParam = Array.isArray(resolvedSearchParams?.category)
    ? resolvedSearchParams?.category[0]
    : resolvedSearchParams?.category;
  const parsedPage = Number.parseInt(pageParam ?? "1", 10);
  const safePage = Number.isNaN(parsedPage) ? 1 : parsedPage;
  const searchTerm = queryParam?.trim() ?? "";
  const normalizedSearch = searchTerm.toLowerCase();
  const parsedMinPrice = Number.parseFloat(minParam ?? "");
  const parsedMaxPrice = Number.parseFloat(maxParam ?? "");
  const selectedCategory = categoryParam?.trim() ?? "";
  const normalizedCategory = selectedCategory.toLowerCase();
  const sortValue =
    sortParam === "price-asc" || sortParam === "price-desc"
      ? sortParam
      : "newest";
  let totalProducts: Product[] = [];
  let categories: Category[] = [];

  const categorySlug = normalizedCategory.length > 0 ? normalizedCategory : undefined;

  try {
    totalProducts = await getProducts(
      { limit: TOTAL_PRODUCTS, categorySlug },
      { cache: "no-store" }
    );
  } catch {
    totalProducts = [];
  }

  try {
    categories = await getCategories();
  } catch {
    categories = [];
  }

  const categoryFilteredProducts = normalizedCategory
    ? totalProducts.filter((product) => {
        const productSlug = product.category?.slug?.toLowerCase();
        const productName = product.category?.name ?? "";
        const productNameSlug = productName
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-");

        return (
          productSlug === normalizedCategory ||
          productNameSlug === normalizedCategory
        );
      })
    : totalProducts;

  const priceValues = totalProducts
    .map((product) => product.price)
    .filter((price) => Number.isFinite(price));
  const minPrice = priceValues.length > 0 ? Math.min(...priceValues) : 0;
  const maxPrice = priceValues.length > 0 ? Math.max(...priceValues) : 0;
  const safeMinPrice = Number.isNaN(parsedMinPrice)
    ? minPrice
    : parsedMinPrice;
  const safeMaxPrice = Number.isNaN(parsedMaxPrice)
    ? maxPrice
    : parsedMaxPrice;
  const clampedMinPrice = Math.min(
    Math.max(safeMinPrice, minPrice),
    maxPrice
  );
  const clampedMaxPrice = Math.min(
    Math.max(safeMaxPrice, minPrice),
    maxPrice
  );
  const rangeMin = Math.min(clampedMinPrice, clampedMaxPrice);
  const rangeMax = Math.max(clampedMinPrice, clampedMaxPrice);
  const hasPriceFilter = rangeMin > minPrice || rangeMax < maxPrice;

  const filteredProducts = normalizedSearch
    ? categoryFilteredProducts.filter((product) => {
        const searchableText = [
          product.title,
          product.description,
          product.category?.name,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchableText.includes(normalizedSearch);
      })
    : categoryFilteredProducts;

  const priceFilteredProducts = filteredProducts.filter(
    (product) => product.price >= rangeMin && product.price <= rangeMax
  );

  const sortedProducts =
    sortValue === "price-asc"
      ? [...priceFilteredProducts].sort((a, b) => a.price - b.price)
      : sortValue === "price-desc"
        ? [...priceFilteredProducts].sort((a, b) => b.price - a.price)
        : priceFilteredProducts;

  const totalPages = Math.max(
    1,
    Math.ceil(sortedProducts.length / ITEMS_PER_PAGE)
  );
  const currentPage = Math.min(Math.max(safePage, 1), totalPages);
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const products = sortedProducts.slice(offset, offset + ITEMS_PER_PAGE);
  const searchQuery = searchTerm.length > 0 ? searchTerm : undefined;
  const categoryQuery = selectedCategory.length > 0 ? selectedCategory : undefined;
  const sortQuery = sortValue !== "newest" ? sortValue : undefined;
  const buildBaseParams = () => {
    const params = new URLSearchParams();

    if (searchQuery) {
      params.set("q", searchQuery);
    }

    if (sortQuery) {
      params.set("sort", sortQuery);
    }

    if (hasPriceFilter) {
      params.set("min", String(rangeMin));
      params.set("max", String(rangeMax));
    }

    return params;
  };

  const buildCategoryHref = (slug?: string) => {
    const params = buildBaseParams();

    if (slug) {
      params.set("category", slug);
    }

    params.set("page", "1");
    return `/products?${params.toString()}`;
  };

  const buildPageHref = (pageNumber: number) => {
    const params = buildBaseParams();

    if (categoryQuery) {
      params.set("category", categoryQuery);
    }

    params.set("page", String(pageNumber));
    return `/products?${params.toString()}`;
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  const filtersPanel = (
    <FiltersPanel
      categories={categories}
      categoryQuery={categoryQuery}
      normalizedCategory={normalizedCategory}
      buildCategoryHref={buildCategoryHref}
      minPrice={minPrice}
      maxPrice={maxPrice}
      rangeMin={rangeMin}
      rangeMax={rangeMax}
      step={5}
    />
  );

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
          <aside className="hidden h-fit overflow-hidden rounded-lg border border-[#e8dfd3] bg-white shadow-sm lg:block">
            <div className="flex items-center justify-between border-b border-[#eee5d8] px-4 py-3">
              <h2 className="inline-flex items-center gap-2 text-base font-semibold text-zinc-950">
                <SlidersHorizontal className="h-4 w-4 text-[#9a763d]" />
                Filters
              </h2>
              <span className="text-sm text-zinc-500">Clear all</span>
            </div>
            {filtersPanel}
          </aside>

          <div>
            <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
              <form
                action="/products"
                method="get"
                className="flex items-center gap-3 rounded-lg border border-[#ded4c5] bg-white px-4 py-3 text-sm text-zinc-700 shadow-sm"
              >
                {sortQuery && (
                  <input type="hidden" name="sort" value={sortQuery} />
                )}
                {categoryQuery && (
                  <input type="hidden" name="category" value={categoryQuery} />
                )}
                {hasPriceFilter && (
                  <>
                    <input type="hidden" name="min" value={rangeMin} />
                    <input type="hidden" name="max" value={rangeMax} />
                  </>
                )}
                <Search className="h-5 w-5 text-zinc-950" />
                <input
                  type="search"
                  name="q"
                  defaultValue={searchTerm}
                  placeholder="Search products..."
                  aria-label="Search products"
                  className="w-full bg-transparent text-sm text-zinc-950 placeholder:text-zinc-400 focus:outline-none"
                />
                <button type="submit" className="sr-only">
                  Search
                </button>
              </form>
              <SortSelect currentSort={sortValue} />
            </div>
            <FiltersDrawer showTrigger={false} openParam="filters">
              {filtersPanel}
            </FiltersDrawer>

            <div className="mt-5">
              <ProductGrid products={products} />
            </div>

            {totalPages > 1 && (
              <nav
                className="mt-8 flex flex-wrap items-center justify-center gap-2"
                aria-label="Pagination"
              >
                <Link
                  href={buildPageHref(Math.max(currentPage - 1, 1))}
                  aria-disabled={currentPage === 1}
                  className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                    currentPage === 1
                      ? "cursor-not-allowed border-[#e8dfd3] text-zinc-300"
                      : "border-[#ded4c5] text-zinc-700 hover:border-[#c3a06a] hover:text-[#9a763d]"
                  }`}
                >
                  Previous
                </Link>

                {pageNumbers.map((pageNumber) => (
                  <Link
                    key={pageNumber}
                    href={buildPageHref(pageNumber)}
                    aria-current={pageNumber === currentPage ? "page" : undefined}
                    className={`h-9 min-w-9 rounded-full border text-center text-sm font-medium leading-9 transition-colors ${
                      pageNumber === currentPage
                        ? "border-[#c3a06a] bg-[#f3eadc] text-[#9a763d]"
                        : "border-[#ded4c5] text-zinc-700 hover:border-[#c3a06a] hover:text-[#9a763d]"
                    }`}
                  >
                    {pageNumber}
                  </Link>
                ))}

                <Link
                  href={buildPageHref(Math.min(currentPage + 1, totalPages))}
                  aria-disabled={currentPage === totalPages}
                  className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                    currentPage === totalPages
                      ? "cursor-not-allowed border-[#e8dfd3] text-zinc-300"
                      : "border-[#ded4c5] text-zinc-700 hover:border-[#c3a06a] hover:text-[#9a763d]"
                  }`}
                >
                  Next
                </Link>
              </nav>
            )}
          </div>
        </section>
      </Container>
    </div>
  );
}