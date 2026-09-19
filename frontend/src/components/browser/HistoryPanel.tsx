'use client';

import type { Visit } from '@/types/domain';

type Props = {
  visits: Visit[];
  loading: boolean;
  onJump: (address: string) => void;
};

export function HistoryPanel({ visits, loading, onJump }: Props) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          padding: '8px 10px',
          borderBottom: '1px solid var(--line)',
          fontWeight: 600,
        }}
      >
        History
      </div>
      <div style={{ flex: 1, overflow: 'auto' }}>
        {loading && <p style={{ padding: 10, color: 'var(--muted)' }}>loading...</p>}
        {!loading && visits.length === 0 && (
          <p style={{ padding: 10, color: 'var(--muted)' }}>no visits yet</p>
        )}
        {visits.map((v) => (
          <button
            key={v._id}
            type="button"
            onClick={() => onJump(v.address)}
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
            <span className="mono" style={{ color: 'var(--link)' }}>
              {v.address}
            </span>
            <span
              style={{
                display: 'block',
                marginTop: 2,
                fontSize: 12,
                color: 'var(--muted)',
              }}
            >
              {v.how}
              {!v.found ? ' · missing' : ''}
              {' · '}
              {new Date(v.visitedAt).toLocaleString()}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
