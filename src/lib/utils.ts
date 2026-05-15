import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

/**
 * Returns a fallback image URL when API image is invalid or missing
 */
export function safeImage(imageUrl: string | undefined): string {
  // Check if URL is valid and accessible
  if (!imageUrl || typeof imageUrl !== "string") {
    return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect fill='%23e5e7eb' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-size='20' font-family='system-ui'%3ENo image%3C/text%3E%3C/svg%3E";
  }

  // Return the image URL as-is; Next.js Image will handle errors
  return imageUrl;
}