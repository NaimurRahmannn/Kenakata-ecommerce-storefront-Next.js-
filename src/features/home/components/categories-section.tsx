import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/shared/container";
import { EmptyState } from "@/components/shared/empty-state";
import { getCategories } from "@/lib/api";
import { safeImage } from "@/lib/utils";
import type { Category } from "@/types/category";

function getCategoryHref(category: Category) {
  const categoryValue = category.slug ?? String(category.id);

  return `/products?category=${encodeURIComponent(categoryValue)}`;
}

function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={getCategoryHref(category)}
      className="group flex flex-col items-center text-center"
    >
      <span className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-[#eadfce] bg-[#f3ede3] shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#c3a06a] group-hover:shadow-md group-hover:shadow-zinc-900/10 sm:h-18 sm:w-18">
        <Image
          src={safeImage(category.image)}
          alt={category.name}
          fill
          sizes="72px"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          unoptimized
        />
      </span>
      <span className="mt-3 text-xs font-medium text-zinc-950 transition-colors group-hover:text-[#9a763d] sm:text-sm">
        {category.name}
      </span>
    </Link>
  );
}

export async function CategoriesSection() {
  let categories: Category[] = [];

  try {
    categories = (await getCategories()).slice(0, 8);
  } catch {
    categories = [];
  }

  return (
    <section className="border-y border-[#e8dfd3] bg-[#fffdf8] pb-8 pt-6 sm:pb-9 sm:pt-7 lg:pb-10 lg:pt-8">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#9a763d] sm:text-sm">
          BROWSE CATEGORIES
        </p>

        {categories.length > 0 ? (
          <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-7 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 lg:gap-x-8">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No categories available"
            description="Please check back soon for new collections."
            actionLabel="Browse products"
            actionHref="/products"
            className="mt-6 border-[#eadfce] bg-[#faf7f1] text-zinc-950"
          />
        )}
      </Container>
    </section>
  );
}
