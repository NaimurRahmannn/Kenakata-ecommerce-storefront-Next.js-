import { create } from "zustand";
import {
  createJSONStorage,
  persist,
  type StateStorage,
} from "zustand/middleware";

import type { AuthTokens, AuthUser } from "@/types/auth";

interface AuthStore {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setAuth: (tokens: AuthTokens, user: AuthUser) => void;
  logout: () => void;
}

const memoryStorage: StateStorage = {
  getItem: () => null,
  setItem: (_key, _value) => {},
  removeItem: (_key) => {},
};

const storage =
  typeof window === "undefined"
    ? createJSONStorage(() => memoryStorage)
    : createJSONStorage(() => localStorage);

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      setAuth: (tokens, user) =>
        set({
          user,
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
          isAuthenticated: true,
        }),
      logout: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "kenakata-auth",
      storage,
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
