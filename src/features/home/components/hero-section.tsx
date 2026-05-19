import Image from "next/image";
import {
  ArrowRight,
  Headphones,
  RefreshCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";

import { Container } from "@/components/shared/container";
import { ButtonLink } from "@/components/ui/button";

const benefits = [
  {
    title: "Free Shipping",
    description: "On orders over $99",
    icon: Truck,
  },
  {
    title: "Secure Payment",
    description: "100% secure checkout",
    icon: ShieldCheck,
  },
  {
    title: "24/7 Support",
    description: "We're here to help",
    icon: Headphones,
  },
  {
    title: "Easy Returns",
    description: "30-day return policy",
    icon: RefreshCcw,
  },
];

export function HeroSection() {
  return (
    <section className="bg-[#fffdf8] text-zinc-950 dark:bg-[#11100e] dark:text-zinc-100">
      <div className="relative isolate overflow-hidden border-b border-[#e8dfd3] dark:border-zinc-800">
        <Image
          src="/images/hero-img.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-[62%_center]"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-[#fffdf8] via-[#fffdf8]/88 to-[#fffdf8]/10 sm:via-[#fffdf8]/78 lg:via-[#fffdf8]/42 dark:from-[#11100e] dark:via-[#11100e]/88 dark:to-[#11100e]/10" />
        <div className="absolute inset-y-0 left-0 -z-10 w-1/2 bg-[#fffdf8]/55 blur-3xl dark:bg-[#11100e]/55" />

        <Container className="flex min-h-140 items-center py-16 sm:min-h-155 sm:py-20 lg:min-h-130 lg:py-24">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#a77a2d] sm:text-sm">
              New season collection
            </p>
            <h1 className="mt-5 text-5xl font-semibold leading-[0.95] tracking-normal text-zinc-950 sm:text-6xl lg:text-7xl dark:text-zinc-100">
              Shop Smarter with KenaKata
            </h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-zinc-700 sm:text-lg dark:text-zinc-300">
              Discover quality products, effortless checkout, and a seamless
              shopping experience.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href="/products"
                size="lg"
                className="gap-3 rounded-md bg-zinc-950 px-8 text-xs font-semibold uppercase tracking-[0.22em] text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                Shop Now
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink
                href="/products"
                variant="outline"
                size="lg"
                className="rounded-md border-[#cfc4b4] bg-white/55 px-8 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-950 backdrop-blur hover:bg-white dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-100 dark:hover:bg-zinc-900"
              >
                View Collection
              </ButtonLink>
            </div>
          </div>
        </Container>
      </div>

      <div className="border-b border-[#e8dfd3] bg-[#fffdf8] dark:border-zinc-800 dark:bg-[#11100e]">
        <Container className="grid gap-6 py-7 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div key={benefit.title} className="flex items-center gap-4">
                <Icon
                  className="h-8 w-8 shrink-0 text-zinc-950 dark:text-zinc-100"
                  aria-hidden="true"
                />
                <div>
                  <h2 className="text-sm font-semibold text-zinc-950 dark:text-zinc-100">
                    {benefit.title}
                  </h2>
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </Container>
      </div>
    </section>
  );
}
