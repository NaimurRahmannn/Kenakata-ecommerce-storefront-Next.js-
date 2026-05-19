import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";

import { AuthStateSync } from "@/components/auth/auth-state-sync";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Suspense } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "KenaKata - Storefront",
    template: "%s | KenaKata",
  },
  description: "Discover amazing products at KenaKata. Shop now!",
  keywords: ["ecommerce", "shopping", "products", "store"],
  authors: [{ name: "KenaKata Team" }],
  icons: {
    icon: "/images/kenakata-logo.png",
    shortcut: "/images/kenakata-logo.png",
    apple: "/images/kenakata-logo.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider>
          <AuthStateSync />

          <Suspense fallback={null}>
            <Header />
          </Suspense>

          {children}

          <Footer />
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
