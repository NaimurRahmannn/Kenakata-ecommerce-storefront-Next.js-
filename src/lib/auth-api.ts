import { API_BASE_URL, API_ENDPOINTS } from "@/constants/api";
import type {
  AuthTokens,
  AuthUser,
  LoginCredentials,
  RegisterCredentials,
} from "@/types/auth";

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

const DEFAULT_AVATAR_URL = "https://picsum.photos/800";

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

export async function registerUser(
  credentials: RegisterCredentials
): Promise<AuthUser> {
  const payload = {
    ...credentials,
    avatar: credentials.avatar?.trim() || DEFAULT_AVATAR_URL,
  };

  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.users}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let message = await getErrorMessage(
      response,
      "Registration failed. Please try again."
    );
    const normalized = message.toLowerCase();

    if (
      normalized.includes("email") &&
      (normalized.includes("exist") || normalized.includes("already"))
    ) {
      message = "Email already exists. Please use a different email.";
    }

    throw new Error(message);
  }

  return (await response.json()) as AuthUser;
}
