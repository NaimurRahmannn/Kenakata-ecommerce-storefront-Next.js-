"use client";

import { useEffect } from "react";

import { useAuthStore } from "@/store/auth-store";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";

export function AuthStateSync() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    const ownerKey =
      isAuthenticated && user?.id ? `user:${user.id}` : "guest";

    useCartStore.getState().setOwner(ownerKey);
    useWishlistStore.getState().setOwner(ownerKey);
  }, [isAuthenticated, user?.id]);

  return null;
}
