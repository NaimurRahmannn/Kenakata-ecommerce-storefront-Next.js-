import type { CartItem } from "@/store/cart-store";

export const FREE_SHIPPING_THRESHOLD = 99;
export const STANDARD_SHIPPING = 9.99;
export const TAX_RATE = 0.08;

export function getCartSummary(items: CartItem[]) {
  const quantity = items.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping =
    items.length === 0 || subtotal >= FREE_SHIPPING_THRESHOLD
      ? 0
      : STANDARD_SHIPPING;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;
  const remainingForFreeShipping = Math.max(
    FREE_SHIPPING_THRESHOLD - subtotal,
    0
  );
  const freeShippingProgress = Math.min(
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100,
    100
  );

  return {
    quantity,
    subtotal,
    shipping,
    tax,
    total,
    remainingForFreeShipping,
    freeShippingProgress,
  };
}
