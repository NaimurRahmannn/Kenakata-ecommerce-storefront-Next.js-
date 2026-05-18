import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface WishlistItem {
  id: number;
  title: string;
  price: number;
  image: string;
  categoryName?: string;
}

interface WishlistItemInput {
  id: number;
  title: string;
  price: number;
  image?: string;
  images?: string[];
  categoryName?: string;
  category?: {
    name?: string;
  };
}

interface WishlistStore {
  items: WishlistItem[];
  addItem: (product: WishlistItemInput) => void;
  removeItem: (productId: number) => void;
  toggleItem: (product: WishlistItemInput) => void;
  clearWishlist: () => void;
  hasItem: (productId: number) => boolean;
  getTotalItems: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        set((state) => {
          const exists = state.items.some((item) => item.id === product.id);

          if (exists) {
            return state;
          }

          const image = product.image ?? product.images?.[0] ?? "";
          const categoryName =
            product.categoryName ?? product.category?.name;

          return {
            items: [
              ...state.items,
              {
                id: product.id,
                title: product.title,
                price: product.price,
                image,
                categoryName,
              },
            ],
          };
        });
      },
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),
      toggleItem: (product) => {
        const exists = get().items.some((item) => item.id === product.id);

        if (exists) {
          get().removeItem(product.id);
          return;
        }

        get().addItem(product);
      },
      clearWishlist: () => set({ items: [] }),
      hasItem: (productId) =>
        get().items.some((item) => item.id === productId),
      getTotalItems: () => get().items.length,
    }),
    {
      name: "kenakata-wishlist",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
