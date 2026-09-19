const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  health: () => request<{ status: string }>('/health'),
  getPeople: () => request('/people'),
  getSite: (address: string) =>
    request(`/sites/${encodeURIComponent(address)}`),
  searchSites: (q: string) =>
    request(`/sites/search?q=${encodeURIComponent(q)}`),
  getHistory: (personId: string) =>
    request(`/people/${personId}/history`),
};

export { API_URL };
