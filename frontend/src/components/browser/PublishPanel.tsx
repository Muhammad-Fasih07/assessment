'use client';

import type { CSSProperties, FormEvent } from 'react';
import { useState } from 'react';
import { api } from '@/lib/api/client';
import { isValidAddress } from '@/lib/sites/format';

type Props = {
  authorId: string | null;
  authorName?: string;
  onPublished: (address: string) => void;
};

const DEFAULT_HTML = '<h1>hello</h1>\n<p>my new page</p>';

const field: CSSProperties = {
  display: 'block',
  width: '100%',
  border: '1px solid var(--line)',
  padding: '6px 8px',
  marginTop: 4,
};

export function PublishPanel({ authorId, authorName, onPublished }: Props) {
  const [address, setAddress] = useState('');
  const [title, setTitle] = useState('');
  const [html, setHtml] = useState(DEFAULT_HTML);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setOk(null);

    if (!authorId) {
      setError('pick a person first');
      return;
    }

    const cleanAddress = address.trim().toLowerCase();
    if (!isValidAddress(cleanAddress)) {
      setError('use something like my-page.zz');
      return;
    }
    if (!title.trim() || !html.trim()) {
      setError('title and html are required');
      return;
    }

    setBusy(true);
    setError(null);
    try {
      const site = await api.publishSite({
        address: cleanAddress,
        title: title.trim(),
        html,
        authorId,
      });
      setAddress('');
      setTitle('');
      setHtml(DEFAULT_HTML);
      setOk(`published ${site.address}`);
      onPublished(site.address);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'publish failed');
    } finally {
      setBusy(false);
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
        Publish
      </div>
      <form
        onSubmit={submit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          padding: 10,
          flex: 1,
          overflow: 'auto',
        }}
      >
        <div style={{ fontSize: 12, color: 'var(--muted)' }}>
          {authorName ? `as ${authorName}` : 'pick someone in the header'}
        </div>

        <label>
          address
          <input
            className="mono"
            style={field}
            placeholder="my-page.zz"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              setOk(null);
            }}
            required
          />
        </label>

        <label>
          title
          <input
            style={field}
            placeholder="My page"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setOk(null);
            }}
            required
          />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          html
          <textarea
            className="mono"
            style={{ ...field, flex: 1, minHeight: 140, resize: 'vertical' }}
            value={html}
            onChange={(e) => {
              setHtml(e.target.value);
              setOk(null);
            }}
            required
          />
        </label>

        {error && <div style={{ color: 'var(--bad)' }}>{error}</div>}
        {ok && <div style={{ color: 'var(--ok)' }}>{ok}</div>}

        <button
          type="submit"
          disabled={busy || !authorId}
          style={{
            border: '1px solid var(--text)',
            background: 'var(--text)',
            color: '#fff',
            padding: '8px 10px',
            cursor: 'pointer',
          }}
        >
          {busy ? 'publishing...' : 'publish'}
        </button>
      </form>
    </div>
  );
}
