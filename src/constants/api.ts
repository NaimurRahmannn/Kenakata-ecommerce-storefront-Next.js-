export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.escuelajs.co/api/v1";

export const API_ENDPOINTS = {
  products: "/products",
  categories: "/categories",
  users: "/users",
  auth: {
    login: "/auth/login",
    profile: "/auth/profile",
  },
} as const;