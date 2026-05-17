import Image from "next/image";
import Link from "next/link";
import { Heart, Search, ShoppingCart, Truck, UserRound, X } from "lucide-react";

import { Container } from "@/components/shared/container";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/products", label: "Categories" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="border-b border-[#e8dfd3] bg-[#fffdf8] text-zinc-950">
      <div className="bg-zinc-950 px-4 py-2 text-center text-sm text-white">
        <div className="relative mx-auto max-w-7xl">
          <p className="flex items-center justify-center gap-2">
            <Truck className="h-4 w-4" color="#9a763d" aria-hidden="true" />
            Free shipping on orders over $99
          </p>
          <button
            type="button"
            aria-label="Dismiss shipping announcement"
            className="absolute right-0 top-1/2 hidden -translate-y-1/2 rounded-full p-1 text-white/80 transition-colors hover:text-white sm:inline-flex"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <Container className="py-3 sm:py-4">
        <nav
          className="flex flex-col gap-4 lg:grid lg:grid-cols-[220px_1fr_220px] lg:items-center lg:gap-5"
          aria-label="Main navigation"
        >
          <div className="flex items-center justify-between gap-3 lg:contents">
            <Link
              href="/"
              className="inline-flex w-fit shrink-0 lg:col-start-1 lg:row-start-1"
              aria-label="KenaKata home"
            >
              <Image
                src="/images/kenakata-logo-transparent.png"
                alt="KenaKata"
                width={154}
                height={92}
                priority
                unoptimized
                className="h-12 w-auto object-contain sm:h-14 lg:h-16"
              />
            </Link>

            <div className="flex items-center gap-1 sm:gap-2 lg:col-start-3 lg:row-start-1 lg:justify-end">
              <button
                type="button"
                aria-label="Search products"
                className="rounded-full p-2 text-zinc-900 transition-colors hover:bg-[#f4eddf] hover:text-[#a77a2d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a77a2d]"
              >
                <Search className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Wishlist"
                className="relative rounded-full p-2 text-zinc-900 transition-colors hover:bg-[#f4eddf] hover:text-[#a77a2d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a77a2d]"
              >
                <Heart className="h-5 w-5" aria-hidden="true" />
                <span className="absolute right-0 top-0 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[#b88a39] px-1 text-[10px] font-semibold leading-none text-white">
                  0
                </span>
              </button>
              <Link
                href="/cart"
                aria-label="View cart"
                className="relative rounded-full p-2 text-zinc-900 transition-colors hover:bg-[#f4eddf] hover:text-[#a77a2d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a77a2d]"
              >
                <ShoppingCart className="h-5 w-5" aria-hidden="true" />
                <span className="absolute right-0 top-0 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[#b88a39] px-1 text-[10px] font-semibold leading-none text-white">
                  0
                </span>
              </Link>
              <Link
                href="/login"
                aria-label="Login"
                className="rounded-full p-2 text-zinc-900 transition-colors hover:bg-[#f4eddf] hover:text-[#a77a2d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a77a2d]"
              >
                <UserRound className="h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 border-t border-[#eadfce] pt-3 sm:gap-x-7 md:justify-start lg:col-start-2 lg:row-start-1 lg:justify-center lg:gap-x-8 lg:border-t-0 lg:pt-0">
            {navigationLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="group relative text-sm font-medium text-zinc-800 transition-colors hover:text-[#a77a2d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a77a2d] focus-visible:ring-offset-4 focus-visible:ring-offset-[#fffdf8]"
              >
                {link.label}
                <span className="absolute -bottom-2 left-0 h-px w-0 bg-[#b88a39] transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>
        </nav>
      </Container>
    </header>
  );
}
