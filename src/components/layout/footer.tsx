import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, RefreshCcw, ShieldCheck, Truck } from "lucide-react";

import { Container } from "@/components/shared/container";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/products", label: "Categories" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

const customerCareLinks = [
  { href: "/faq", label: "FAQ" },
  { href: "/shipping", label: "Shipping & Delivery" },
  { href: "/returns", label: "Returns" },
  { href: "/track-order", label: "Track Order" },
  { href: "/privacy", label: "Privacy Policy" },
];

const socialLinks = [
  {
    href: "/",
    label: "Instagram",
    src: "/images/Instagram_Glyph_White.png",
  },
  {
    href: "/",
    label: "Facebook",
    src: "/images/Facebook_Logo_Secondary.png",
  },
  {
    href: "/",
    label: "Threads",
    src: "/images/threads-logo-white.png",
  },
  {
    href: "/",
    label: "X",
    src: "/images/Xlogo-white.png",
  },
];

const serviceHighlights = [
  {
    title: "Secure Payment",
    description: "100% secure checkout",
    icon: ShieldCheck,
  },
  {
    title: "Fast Delivery",
    description: "Reliable & on-time",
    icon: Truck,
  },
  {
    title: "Easy Returns",
    description: "30-day return policy",
    icon: RefreshCcw,
  },
];

const paymentMethods = [
  {
    label: "Mastercard",
    src: "/images/ma_symbol_opt_73_3x.png",
    width: 38,
    height: 24,
  },
  {
    label: "American Express",
    src: "/images/AXP_BlueBoxLogo_Alternate_REGULARscale_RGB_DIGITAL_700x700.png",
    width: 30,
    height: 24,
  },
  {
    label: "PayPal",
    src: "/images/PayPal-Monogram-FullColor-RGB.png",
    width: 30,
    height: 24,
  },
  {
    label: "Apple Pay",
    src: "/images/Apple_Pay_Mark_RGB_041619.svg",
    width: 44,
    height: 18,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[#e8dfd3] bg-[#fbf7ef] text-zinc-950">
      <Container className="py-5 lg:py-6">
        <div className="grid gap-5 lg:grid-cols-[1.35fr_1fr_1fr_1.55fr] lg:gap-7">
          <div>
            <Link href="/" className="inline-flex" aria-label="KenaKata home">
              <Image
                src="/images/kenakata-logo-transparent.png"
                alt="KenaKata"
                width={150}
                height={90}
                unoptimized
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="mt-2 max-w-xs text-xs leading-5 text-zinc-600">
              Curated essentials for modern living. Premium quality, timeless
              style, and seamless shopping.
            </p>

            <div className="mt-3 flex items-center gap-2.5">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={`${social.label} social link`}
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 transition-colors hover:bg-[#9a763d]"
                >
                  <Image
                    src={social.src}
                    alt=""
                    width={16}
                    height={16}
                    unoptimized
                    className="h-3 w-3 object-contain"
                  />
                </Link>
              ))}
            </div>
          </div>

          <nav
            className="border-[#e4dacb] lg:border-l lg:pl-7"
            aria-label="Quick links"
          >
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em]">
              Quick Links
            </h2>
            <ul className="mt-3 space-y-1.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-zinc-600 transition-colors hover:text-[#9a763d]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav
            className="border-[#e4dacb] lg:border-l lg:pl-7"
            aria-label="Customer care"
          >
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em]">
              Customer Care
            </h2>
            <ul className="mt-3 space-y-1.5">
              {customerCareLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-zinc-600 transition-colors hover:text-[#9a763d]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-[#e4dacb] lg:border-l lg:pl-7">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em]">
              Stay Updated
            </h2>
            <p className="mt-3 max-w-sm text-xs leading-5 text-zinc-600">
              Subscribe to get special offers, free giveaways, and
              once-in-a-lifetime deals.
            </p>

            <form className="mt-3 flex max-w-sm overflow-hidden rounded-md border border-[#d8cfc2] bg-white">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="Enter your email"
                className="min-w-0 flex-1 bg-transparent px-3 py-2 text-xs outline-none placeholder:text-zinc-400"
              />
              <button
                type="submit"
                className="bg-zinc-950 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-zinc-800"
              >
                Subscribe
              </button>
            </form>

            <div className="mt-3 flex flex-col gap-1.5 text-xs text-zinc-600 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="mailto:hello@kenakata.com"
                className="inline-flex items-center gap-2 transition-colors hover:text-[#9a763d]"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                hello@kenakata.com
              </Link>
              <Link
                href="tel:+15551234567"
                className="inline-flex items-center gap-2 transition-colors hover:text-[#9a763d]"
              >
                <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                +1 (555) 123-4567
              </Link>
            </div>
          </div>
        </div>
      </Container>

      <div className="border-y border-[#e8dfd3] bg-[#f8f2e9]">
        <Container className="grid gap-3 py-2.5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="grid gap-3 sm:grid-cols-3">
            {serviceHighlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex items-center gap-2.5 border-[#e0d5c6] sm:border-r sm:last:border-r-0 sm:last:pr-0 sm:pr-4"
                >
                  <Icon className="h-5 w-5 shrink-0 text-[#9a763d]" />
                  <div>
                    <h3 className="text-xs font-semibold">{item.title}</h3>
                    <p className="text-xs text-zinc-500">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-2.5 lg:justify-end">
            <span className="text-xs text-zinc-500">We Accept</span>
            {paymentMethods.map((method) => (
              <span
                key={method.label}
                className="inline-flex h-6 min-w-11 items-center justify-center rounded border border-[#d8cfc2] bg-white px-1.5 shadow-sm"
              >
                <Image
                  src={method.src}
                  alt={method.label}
                  width={method.width}
                  height={method.height}
                  unoptimized
                  className="max-h-4 w-auto object-contain"
                />
              </span>
            ))}
          </div>
        </Container>
      </div>

      <Container className="flex flex-col gap-2 py-2.5 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; 2026 KenaKata. All rights reserved.</p>
        <nav className="flex gap-6" aria-label="Legal links">
          <Link href="/terms" className="transition-colors hover:text-[#9a763d]">
            Terms
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-[#9a763d]">
            Privacy
          </Link>
          <Link href="/cookies" className="transition-colors hover:text-[#9a763d]">
            Cookies
          </Link>
        </nav>
      </Container>
    </footer>
  );
}
