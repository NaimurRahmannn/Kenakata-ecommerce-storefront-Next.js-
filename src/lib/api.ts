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

  try {
    const response = await fetch(url, {
      next: { revalidate: options.revalidate ?? 3600 },
      ...options,
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
export async function getProducts(limit?: number): Promise<Product[]> {
  const endpoint = limit
    ? `${API_ENDPOINTS.products}?limit=${limit}`
    : API_ENDPOINTS.products;

  return fetcher<Product[]>(endpoint, {
    revalidate: 3600, // 1 hour
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
