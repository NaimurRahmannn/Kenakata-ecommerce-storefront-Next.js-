import { create } from "zustand";

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
  ownerKey: string;
  setOwner: (ownerKey: string) => void;
  addItem: (product: WishlistItemInput) => void;
  removeItem: (productId: number) => void;
  toggleItem: (product: WishlistItemInput) => void;
  clearWishlist: () => void;
  hasItem: (productId: number) => boolean;
  isInWishlist: (productId: number) => boolean;
  getTotalItems: () => number;
}

const WISHLIST_STORAGE_PREFIX = "wishlist-storage";
const isBrowser = typeof window !== "undefined";

const getWishlistStorageKey = (ownerKey: string) =>
  `${WISHLIST_STORAGE_PREFIX}:${ownerKey}`;

const loadWishlistItems = (ownerKey: string): WishlistItem[] => {
  if (!isBrowser) {
    return [];
  }

  const stored = window.localStorage.getItem(
    getWishlistStorageKey(ownerKey)
  );
  if (!stored) {
    return [];
  }

  try {
    const parsed = JSON.parse(stored) as WishlistItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveWishlistItems = (ownerKey: string, items: WishlistItem[]) => {
  if (!isBrowser) {
    return;
  }

  try {
    window.localStorage.setItem(
      getWishlistStorageKey(ownerKey),
      JSON.stringify(items)
    );
  } catch {
    // Ignore storage errors.
  }
};

const initialOwnerKey = "guest";
const initialItems = loadWishlistItems(initialOwnerKey);

export const useWishlistStore = create<WishlistStore>()((set, get) => ({
  items: initialItems,
  ownerKey: initialOwnerKey,
  setOwner: (nextOwnerKey) => {
    const currentOwnerKey = get().ownerKey;

    if (currentOwnerKey === nextOwnerKey) {
      return;
    }

    saveWishlistItems(currentOwnerKey, get().items);
    const nextItems = loadWishlistItems(nextOwnerKey);

    set({ ownerKey: nextOwnerKey, items: nextItems });
  },
  addItem: (product) => {
    set((state) => {
      const exists = state.items.some((item) => item.id === product.id);

      if (exists) {
        return state;
      }

      const image = product.image ?? product.images?.[0] ?? "";
      const categoryName = product.categoryName ?? product.category?.name;

      const items = [
        ...state.items,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image,
          categoryName,
        },
      ];

      saveWishlistItems(state.ownerKey, items);
      return { items };
    });
  },
  removeItem: (productId) =>
    set((state) => {
      const items = state.items.filter((item) => item.id !== productId);
      saveWishlistItems(state.ownerKey, items);
      return { items };
    }),
  toggleItem: (product) => {
    const exists = get().items.some((item) => item.id === product.id);

    if (exists) {
      get().removeItem(product.id);
      return;
    }

    get().addItem(product);
  },
  clearWishlist: () =>
    set((state) => {
      saveWishlistItems(state.ownerKey, []);
      return { items: [] };
    }),
  hasItem: (productId) =>
    get().items.some((item) => item.id === productId),
  isInWishlist: (productId) =>
    get().items.some((item) => item.id === productId),
  getTotalItems: () => get().items.length,
}));
