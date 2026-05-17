import { Container } from "@/components/shared/container";
import { ButtonLink } from "@/components/ui/button";

const sellingPoints = ["Fast delivery", "Secure checkout", "Fresh products"];

export function HeroSection() {
  return (
    <section className="bg-white py-16 dark:bg-zinc-950 sm:py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              New season collection
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-950 dark:text-white sm:text-5xl lg:text-6xl">
              Shop smarter with KenaKata
            </h1>
            <p className="mt-6 text-base leading-8 text-zinc-600 dark:text-zinc-400 sm:text-lg">
              Discover quality products, simple checkout, and a smooth shopping
              experience built with modern Next.js.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/products" size="lg">
                Browse Products
              </ButtonLink>
              <ButtonLink href="/cart" variant="outline" size="lg">
                View Cart
              </ButtonLink>
            </div>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
            <div className="rounded-lg bg-white p-5 shadow-sm dark:bg-zinc-950">
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                KenaKata benefits
              </p>
              <div className="mt-6 space-y-4">
                {sellingPoints.map((point) => (
                  <div
                    key={point}
                    className="flex items-center justify-between rounded-lg border border-zinc-200 px-4 py-3 dark:border-zinc-800"
                  >
                    <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                      {point}
                    </span>
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-950 dark:bg-white" />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-white p-4 dark:bg-zinc-950">
                <p className="text-2xl font-bold text-zinc-950 dark:text-white">
                  24/7
                </p>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  Shopping access
                </p>
              </div>
              <div className="rounded-lg bg-white p-4 dark:bg-zinc-950">
                <p className="text-2xl font-bold text-zinc-950 dark:text-white">
                  Easy
                </p>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  Checkout flow
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
