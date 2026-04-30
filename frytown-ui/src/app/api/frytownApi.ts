const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '/api').replace(/\/$/, '');

export class ApiError extends Error {
  readonly status: number;
  readonly details: unknown;

  constructor(message: string, status: number, details: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

export interface ApiMenuItem {
  id: number;
  name: string;
  description?: string | null;
  price?: number | null;
  basePrice?: number | null;
  largePrice?: number | null;
  image?: string | null;
  options?: string | null;
  mixingCharge?: number | null;
}

export interface ApiMenuCategory {
  id: number;
  name: string;
  description?: string | null;
  image?: string | null;
  items?: ApiMenuItem[] | null;
}

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  token?: string | null;
  refreshToken?: string | null;
  role?: string | null;
  emailVerified?: boolean | null;
}

export interface CartQuoteRequest {
  items: Array<{
    id: number;
    quantity: number;
    customizations?: {
      size?: string;
      style?: string;
      flavors?: string[];
    };
  }>;
}

export interface CartQuoteResponse {
  quoteId: number;
  total: number;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  });

  const contentType = response.headers.get('content-type') ?? '';
  const data: unknown = contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof data === 'object' &&
      data !== null &&
      'message' in data &&
      typeof data.message === 'string'
        ? data.message
        : `Request failed with status ${response.status}`;

    throw new ApiError(message, response.status, data);
  }

  return data as T;
}

export const frytownApi = {
  getMenu: () => request<ApiMenuCategory[]>('/menu'),
  register: (payload: RegisterRequest) =>
    request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  login: (payload: LoginRequest) =>
    request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  forgotPassword: (email: string) =>
    request<void>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),
  getCartQuote: (payload: CartQuoteRequest) =>
    request<CartQuoteResponse>('/cart/quote', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
};
