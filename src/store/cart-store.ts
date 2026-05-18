import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  categoryName?: string;
  quantity: number;
}

interface CartItemInput {
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

interface CartStore {
  items: CartItem[];
  addItem: (product: CartItemInput, quantity?: number) => void;
  removeItem: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
}

const toQuantity = (quantity?: number) => {
  if (!Number.isFinite(quantity)) {
    return 1;
  }

  return Math.max(1, Math.floor(quantity ?? 1));
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1) => {
        const nextQuantity = toQuantity(quantity);

        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.id === product.id
          );

          if (existingIndex >= 0) {
            const items = [...state.items];
            const existing = items[existingIndex];
            items[existingIndex] = {
              ...existing,
              quantity: existing.quantity + nextQuantity,
            };
            return { items };
          }

          const image =
            product.image ?? product.images?.[0] ?? "";
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
                quantity: nextQuantity,
              },
            ],
          };
        });
      },
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),
      increaseQuantity: (productId) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),
      decreaseQuantity: (productId) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId
              ? { ...item, quantity: Math.max(1, item.quantity - 1) }
              : item
          ),
        })),
      updateQuantity: (productId, quantity) => {
        const nextQuantity = toQuantity(quantity);

        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId
              ? { ...item, quantity: nextQuantity }
              : item
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),
      getSubtotal: () =>
        get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
    }),
    {
      name: "kenakata-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
