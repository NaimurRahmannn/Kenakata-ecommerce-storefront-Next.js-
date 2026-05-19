import { create } from "zustand";

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
  ownerKey: string;
  setOwner: (ownerKey: string) => void;
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

const CART_STORAGE_PREFIX = "cart-storage";
const isBrowser = typeof window !== "undefined";

const getCartStorageKey = (ownerKey: string) =>
  `${CART_STORAGE_PREFIX}:${ownerKey}`;

const loadCartItems = (ownerKey: string): CartItem[] => {
  if (!isBrowser) {
    return [];
  }

  const stored = window.localStorage.getItem(getCartStorageKey(ownerKey));
  if (!stored) {
    return [];
  }

  try {
    const parsed = JSON.parse(stored) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveCartItems = (ownerKey: string, items: CartItem[]) => {
  if (!isBrowser) {
    return;
  }

  try {
    window.localStorage.setItem(
      getCartStorageKey(ownerKey),
      JSON.stringify(items)
    );
  } catch {
    // Ignore storage errors.
  }
};

const initialOwnerKey = "guest";
const initialItems = loadCartItems(initialOwnerKey);

export const useCartStore = create<CartStore>()((set, get) => ({
  items: initialItems,
  ownerKey: initialOwnerKey,
  setOwner: (nextOwnerKey) => {
    const currentOwnerKey = get().ownerKey;

    if (currentOwnerKey === nextOwnerKey) {
      return;
    }

    saveCartItems(currentOwnerKey, get().items);
    const nextItems = loadCartItems(nextOwnerKey);

    set({ ownerKey: nextOwnerKey, items: nextItems });
  },
  addItem: (product, quantity = 1) => {
    const nextQuantity = toQuantity(quantity);

    set((state) => {
      const existingIndex = state.items.findIndex(
        (item) => item.id === product.id
      );

      let items: CartItem[];

      if (existingIndex >= 0) {
        items = state.items.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + nextQuantity }
            : item
        );
      } else {
        const image = product.image ?? product.images?.[0] ?? "";
        const categoryName = product.categoryName ?? product.category?.name;

        items = [
          ...state.items,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            image,
            categoryName,
            quantity: nextQuantity,
          },
        ];
      }

      saveCartItems(state.ownerKey, items);
      return { items };
    });
  },
  removeItem: (productId) =>
    set((state) => {
      const items = state.items.filter((item) => item.id !== productId);
      saveCartItems(state.ownerKey, items);
      return { items };
    }),
  increaseQuantity: (productId) =>
    set((state) => {
      const items = state.items.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      saveCartItems(state.ownerKey, items);
      return { items };
    }),
  decreaseQuantity: (productId) =>
    set((state) => {
      const items = state.items.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      );
      saveCartItems(state.ownerKey, items);
      return { items };
    }),
  updateQuantity: (productId, quantity) => {
    const nextQuantity = toQuantity(quantity);

    set((state) => {
      const items = state.items.map((item) =>
        item.id === productId
          ? { ...item, quantity: nextQuantity }
          : item
      );
      saveCartItems(state.ownerKey, items);
      return { items };
    });
  },
  clearCart: () =>
    set((state) => {
      saveCartItems(state.ownerKey, []);
      return { items: [] };
    }),
  getTotalItems: () =>
    get().items.reduce((total, item) => total + item.quantity, 0),
  getSubtotal: () =>
    get().items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ),
}));
