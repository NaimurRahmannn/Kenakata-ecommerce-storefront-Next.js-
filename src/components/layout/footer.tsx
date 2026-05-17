import Link from "next/link";

import { Container } from "@/components/shared/container";

const footerLinks = [
  { href: "/products", label: "Products" },
  { href: "/cart", label: "Cart" },
  { href: "/login", label: "Login" },
];

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <Container className="py-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-md">
            <Link
              href="/"
              className="text-lg font-bold tracking-tight text-zinc-950 transition-colors hover:text-zinc-700 dark:text-white dark:hover:text-zinc-300"
            >
              KenaKata
            </Link>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              A modern e-commerce storefront built with Next.js.
            </p>
          </div>

          <nav className="flex flex-wrap gap-4" aria-label="Footer navigation">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="mt-8 text-sm text-zinc-500 dark:text-zinc-500">
          © 2026 KenaKata. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
