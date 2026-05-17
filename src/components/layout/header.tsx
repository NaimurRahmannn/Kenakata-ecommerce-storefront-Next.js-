import Link from "next/link";

import { Container } from "@/components/shared/container";
import { ButtonLink } from "@/components/ui/button";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/cart", label: "Cart" },
];

export function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white/95 dark:border-zinc-800 dark:bg-zinc-950/95">
      <Container className="py-4">
        <nav
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-zinc-950 transition-colors hover:text-zinc-700 dark:text-white dark:hover:text-zinc-300"
          >
            KenaKata
          </Link>

          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-white dark:focus-visible:ring-white"
              >
                {link.label}
              </Link>
            ))}
            <ButtonLink href="/login" variant="outline" size="sm">
              Login
            </ButtonLink>
          </div>
        </nav>
      </Container>
    </header>
  );
}
