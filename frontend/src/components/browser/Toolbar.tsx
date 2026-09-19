'use client';

import type { CSSProperties, FormEvent } from 'react';

type Props = {
  address: string;
  canBack: boolean;
  canForward: boolean;
  loading: boolean;
  onAddressChange: (value: string) => void;
  onGo: () => void;
  onBack: () => void;
  onForward: () => void;
};

const btn: CSSProperties = {
  border: '1px solid var(--line)',
  background: '#fff',
  padding: '4px 10px',
  cursor: 'pointer',
};

export function Toolbar({
  address,
  canBack,
  canForward,
  loading,
  onAddressChange,
  onGo,
  onBack,
  onForward,
}: Props) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 8,
        alignItems: 'center',
        padding: '8px 10px',
        background: 'var(--bar)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <button type="button" style={btn} disabled={!canBack || loading} onClick={onBack}>
        Back
      </button>
      <button
        type="button"
        style={btn}
        disabled={!canForward || loading}
        onClick={onForward}
      >
        Forward
      </button>

      <form
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          onGo();
        }}
        style={{ display: 'flex', flex: 1, gap: 8, minWidth: 0 }}
      >
        <input
          value={address}
          onChange={(e) => onAddressChange(e.target.value)}
          placeholder="address (tidepool.zz)"
          spellCheck={false}
          className="mono"
          style={{
            flex: 1,
            minWidth: 0,
            border: '1px solid var(--line)',
            padding: '6px 8px',
            background: '#fff',
          }}
        />
        <button
          type="submit"
          style={{
            ...btn,
            background: 'var(--text)',
            color: '#fff',
            borderColor: 'var(--text)',
          }}
          disabled={loading || !address.trim()}
        >
          {loading ? '...' : 'Go'}
        </button>
      </form>
    </div>
  );
}
