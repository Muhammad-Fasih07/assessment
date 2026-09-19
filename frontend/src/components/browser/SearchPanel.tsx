'use client';

import { useState, type FormEvent } from 'react';
import { api } from '@/lib/api/client';
import { snippetFromHtml } from '@/lib/sites/format';
import type { Site } from '@/types/domain';

type Props = {
  onOpen: (address: string) => void;
};

export function SearchPanel({ onOpen }: Props) {
  const [q, setQ] = useState('');
  const [lastQuery, setLastQuery] = useState<string | null>(null);
  const [results, setResults] = useState<Site[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function runSearch(e: FormEvent) {
    e.preventDefault();
    const query = q.trim();
    if (!query) {
      setError('type something to search');
      return;
    }

    setLoading(true);
    setError(null);
    setLastQuery(query);
    try {
      setResults(await api.searchSites(query));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'search failed');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          padding: '8px 10px',
          borderBottom: '1px solid var(--line)',
          fontWeight: 600,
        }}
      >
        Search
      </div>
      <form
        onSubmit={runSearch}
        style={{
          display: 'flex',
          gap: 8,
          padding: 10,
          borderBottom: '1px solid var(--line)',
        }}
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="search page text"
          style={{
            flex: 1,
            border: '1px solid var(--line)',
            padding: '6px 8px',
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            border: '1px solid var(--line)',
            background: '#fff',
            padding: '4px 10px',
            cursor: 'pointer',
          }}
        >
          find
        </button>
      </form>
      <div style={{ flex: 1, overflow: 'auto' }}>
        {error && (
          <p style={{ padding: 10, color: 'var(--bad)' }}>{error}</p>
        )}
        {loading && <p style={{ padding: 10, color: 'var(--muted)' }}>searching...</p>}
        {!loading && lastQuery === null && !error && (
          <p style={{ padding: 10, color: 'var(--muted)' }}>
            searches titles and body text
          </p>
        )}
        {!loading && lastQuery !== null && results.length === 0 && !error && (
          <p style={{ padding: 10, color: 'var(--muted)' }}>
            nothing for &quot;{lastQuery}&quot;
          </p>
        )}
        {!loading && results.length > 0 && (
          <p
            style={{
              padding: '8px 10px',
              borderBottom: '1px solid var(--line)',
              fontSize: 12,
              color: 'var(--muted)',
            }}
          >
            {results.length} hit{results.length === 1 ? '' : 's'} for &quot;
            {lastQuery}&quot;
          </p>
        )}
        {results.map((s) => (
          <button
            key={s._id}
            type="button"
            onClick={() => onOpen(s.address)}
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'left',
              border: 0,
              borderBottom: '1px solid var(--line)',
              background: 'transparent',
              padding: '8px 10px',
              cursor: 'pointer',
            }}
          >
            <div style={{ fontWeight: 600 }}>{s.title}</div>
            <div className="mono" style={{ color: 'var(--link)', fontSize: 12 }}>
              {s.address}
            </div>
            <div style={{ marginTop: 4, fontSize: 12, color: 'var(--muted)' }}>
              {snippetFromHtml(s.html)}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
