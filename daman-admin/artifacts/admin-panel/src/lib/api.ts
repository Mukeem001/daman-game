// Always use relative URLs so Vite dev proxy handles them (avoids CORS issues)
const API_BASE_URL = "";

export class ApiError extends Error {
  constructor(
    public status: number,
    public data: any,
    message?: string
  ) {
    super(message || `API Error: ${status}`);
    this.name = "ApiError";
  }
}

export async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {},
  headerType: 'bearer' | 'admin-token' = 'bearer'
): Promise<T> {
  const url = `${API_BASE_URL}/api${endpoint}`;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (headerType === 'admin-token') {
    // Only use token from login (stored in localStorage as "token")
    const adminToken = localStorage.getItem("token");
    console.log('[API] admin-token lookup:', adminToken ? 'found (' + adminToken.slice(0, 10) + '...)' : 'NOT FOUND');
    if (adminToken) {
      headers["admin-token"] = adminToken;
    }
  } else {
    const token = localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  console.log('[API-v2] Request URL:', url, '| Method:', options.method || 'GET', '| Headers:', Object.keys(headers));

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new ApiError(response.status, data, data.message || "API Error");
  }

  return response.json();
}

export async function get<T>(endpoint: string, headerType: 'bearer' | 'admin-token' = 'bearer'): Promise<T> {
  return apiCall<T>(endpoint, { method: "GET" }, headerType);
}

export async function post<T>(endpoint: string, data?: any, headerType: 'bearer' | 'admin-token' = 'bearer'): Promise<T> {
  return apiCall<T>(endpoint, {
    method: "POST",
    body: data ? JSON.stringify(data) : undefined,
  }, headerType);
}

export async function put<T>(endpoint: string, data?: any, headerType: 'bearer' | 'admin-token' = 'bearer'): Promise<T> {
  return apiCall<T>(endpoint, {
    method: "PUT",
    body: data ? JSON.stringify(data) : undefined,
  }, headerType);
}

export async function patch<T>(endpoint: string, data?: any, headerType: 'bearer' | 'admin-token' = 'bearer'): Promise<T> {
  return apiCall<T>(endpoint, {
    method: "PATCH",
    body: data ? JSON.stringify(data) : undefined,
  }, headerType);
}

export async function del<T>(endpoint: string, headerType: 'bearer' | 'admin-token' = 'bearer'): Promise<T> {
  return apiCall<T>(endpoint, { method: "DELETE" }, headerType);
}
