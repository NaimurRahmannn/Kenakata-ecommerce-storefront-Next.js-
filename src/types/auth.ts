export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = {
  name: string;
  email: string;
  password: string;
  avatar?: string;
};

export type AuthTokens = {
  access_token: string;
  refresh_token: string;
};

export type AuthUser = {
  id: number;
  email: string;
  name: string;
  role: string;
  avatar?: string;
};
