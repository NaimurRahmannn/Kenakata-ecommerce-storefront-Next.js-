import { API_BASE_URL, API_ENDPOINTS } from "@/constants/api";
import type { Product } from "@/types/product";
import type { Category } from "@/types/category";

interface FetcherOptions extends RequestInit {
  revalidate?: number | false;
}

/**
 * Reusable fetcher for API calls with error handling and caching
 */
async function fetcher<T>(
  endpoint: string,
  options: FetcherOptions = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const { revalidate, ...requestInit } = options;
  const shouldUseNext = requestInit.cache !== "no-store" && revalidate !== false;
  const nextConfig = shouldUseNext ? { revalidate: revalidate ?? 3600 } : undefined;

  try {
    const response = await fetch(url, {
      ...(nextConfig ? { next: nextConfig } : {}),
      ...requestInit,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  } catch (error) {
    console.error(`Fetch error for ${url}:`, error);
    throw error;
  }
}

/**
 * Fetch all products from the API
 */
interface ProductsQuery {
  limit?: number;
  offset?: number;
  categorySlug?: string;
}

export async function getProducts(
  options?: number | ProductsQuery,
  fetchOptions: FetcherOptions = {}
): Promise<Product[]> {
  const query = typeof options === "number" ? { limit: options } : options;
  const searchParams = new URLSearchParams();

  if (query?.limit !== undefined) {
    searchParams.set("limit", String(query.limit));
  }

  if (query?.offset !== undefined) {
    searchParams.set("offset", String(query.offset));
  }

  if (query?.categorySlug) {
    searchParams.set("categorySlug", query.categorySlug);
  }

  const queryString = searchParams.toString();
  const endpoint = queryString
    ? `${API_ENDPOINTS.products}?${queryString}`
    : API_ENDPOINTS.products;

  return fetcher<Product[]>(endpoint, {
    revalidate: 3600, // 1 hour
    ...fetchOptions,
  });
}

/**
 * Fetch a single product by ID
 */
export async function getProductById(id: number): Promise<Product> {
  return fetcher<Product>(`${API_ENDPOINTS.products}/${id}`, {
    revalidate: 3600, // 1 hour
  });
}

/**
 * Fetch all categories
 */
export async function getCategories(): Promise<Category[]> {
  return fetcher<Category[]>(API_ENDPOINTS.categories, {
    revalidate: 86400, // 24 hours - categories change less frequently
  });
}
