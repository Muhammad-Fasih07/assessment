import type { Person, Site, Visit, VisitHow } from '@/types/domain';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

async function readError(response: Response): Promise<string> {
  const text = await response.text();
  try {
    const json = JSON.parse(text) as {
      message?: string | string[];
    };
    if (Array.isArray(json.message)) return json.message.join(', ');
    if (typeof json.message === 'string') return json.message;
  } catch {
    // not json
  }
  return text || `Request failed: ${response.status}`;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(await readError(response));
  }

  return response.json() as Promise<T>;
}

export const api = {
  getPeople: () => request<Person[]>('/people'),

  getSite: (address: string) =>
    request<Site>(`/sites/${encodeURIComponent(address)}`),

  searchSites: (q: string) =>
    request<Site[]>(`/sites/search?q=${encodeURIComponent(q)}`),

  getHistory: (personId: string) =>
    request<Visit[]>(`/people/${personId}/history`),

  publishSite: (body: {
    address: string;
    title: string;
    html: string;
    authorId: string;
  }) =>
    request<Site>('/sites', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  recordVisit: (body: {
    personId: string;
    address: string;
    how: VisitHow;
    found: boolean;
  }) =>
    request<Visit>('/visits', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
};

export { API_URL };
