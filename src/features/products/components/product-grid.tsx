import { EmptyState } from "@/components/shared/empty-state";
import { ProductCard } from "@/features/products/components/product-card";
import type { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <EmptyState
        title="No products available"
        description="Please check back soon for our latest collection."
        actionLabel="Back to home"
        actionHref="/"
        className="min-h-96 border-[#eadfce] bg-[#faf7f1] text-zinc-950"
      />
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
