import { API_BASE_URL, API_ENDPOINTS } from "@/constants/api";
import type { AuthTokens, AuthUser, LoginCredentials } from "@/types/auth";

type ApiErrorResponse = {
  message?: string | string[];
};

const getErrorMessage = async (
  response: Response,
  fallbackMessage: string
) => {
  try {
    const data = (await response.json()) as ApiErrorResponse;

    if (Array.isArray(data?.message)) {
      return data.message.join(", ");
    }

    if (typeof data?.message === "string" && data.message.trim().length > 0) {
      return data.message;
    }
  } catch {
    // Ignore JSON parsing failures.
  }

  return fallbackMessage;
};

export async function loginUser(
  credentials: LoginCredentials
): Promise<AuthTokens> {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.auth.login}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      "Login failed. Please check your credentials."
    );
    throw new Error(message);
  }

  return (await response.json()) as AuthTokens;
}

export async function getAuthProfile(
  accessToken: string
): Promise<AuthUser> {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.auth.profile}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      "Failed to fetch your profile."
    );
    throw new Error(message);
  }

  return (await response.json()) as AuthUser;
}
