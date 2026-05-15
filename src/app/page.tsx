import { Container } from "@/components/shared/container";
import { ButtonLink } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="flex flex-1 items-center justify-center">
        <Container className="flex flex-col gap-8 py-16 sm:py-24 lg:py-32">
          {/* Hero section */}
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                Welcome to
              </p>
              <h1 className="text-5xl font-bold tracking-tight text-zinc-950 dark:text-white sm:text-6xl">
                KenaKata
              </h1>
            </div>
            <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl">
              Discover amazing products at unbeatable prices. Your one-stop
              online store for everything you need.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3">
            <ButtonLink variant="default" href="/products">
              Browse Products
            </ButtonLink>
            <ButtonLink variant="outline" href="/cart">
              View Cart
            </ButtonLink>
            <ButtonLink variant="ghost" href="/login">
              Sign In
            </ButtonLink>
          </div>

          {/* Info section */}
          <div className="grid grid-cols-1 gap-6 pt-8 sm:grid-cols-3">
            <div className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="font-semibold text-zinc-950 dark:text-white">
                Fast Shipping
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Get your orders delivered quickly.
              </p>
            </div>
            <div className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="font-semibold text-zinc-950 dark:text-white">
                Secure Checkout
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Shop with confidence and peace of mind.
              </p>
            </div>
            <div className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="font-semibold text-zinc-950 dark:text-white">
                Great Support
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                We&apos;re here to help you 24/7.
              </p>
            </div>
          </div>
        </Container>
      </div>
    </main>
  );
}

