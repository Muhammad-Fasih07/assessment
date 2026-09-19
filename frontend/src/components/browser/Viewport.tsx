'use client';

import type { CSSProperties } from 'react';
import { useEffect, useRef } from 'react';
import { buildSrcDoc, hrefToAddress } from '@/lib/html/contain';
import type { PageView } from '@/lib/navigation/helpers';

type Props = {
  view: PageView;
  onNavigate?: (address: string) => void;
};

export function Viewport({ view, onNavigate }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const onNavigateRef = useRef(onNavigate);
  onNavigateRef.current = onNavigate;

  const pageKey =
    view.kind === 'page' ? `${view.address}::${view.html}` : view.kind;

  useEffect(() => {
    if (view.kind !== 'page') return;
    const iframe = iframeRef.current;
    if (!iframe) return;

    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const anchor = target?.closest?.('a');
      if (!anchor) return;
      event.preventDefault();
      event.stopPropagation();
      const address = hrefToAddress(anchor.getAttribute('href'));
      if (address) onNavigateRef.current?.(address);
    };

    const attach = () =>
      iframe.contentDocument?.addEventListener('click', onClick);
    const detach = () =>
      iframe.contentDocument?.removeEventListener('click', onClick);

    iframe.addEventListener('load', attach);
    attach();
    return () => {
      iframe.removeEventListener('load', attach);
      detach();
    };
  }, [pageKey, view.kind]);

  const wrap: CSSProperties = {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--muted)',
    padding: 24,
    textAlign: 'center',
  };

  if (view.kind === 'empty') {
    return <div style={wrap}>choose a person, then type an address</div>;
  }

  if (view.kind === 'loading') {
    return <div style={wrap}>loading {view.address}...</div>;
  }

  if (view.kind === 'nowhere') {
    return (
      <div style={wrap}>
        <div>
          <div style={{ fontSize: 22, color: 'var(--text)', marginBottom: 8 }}>
            Nowhere
          </div>
          <div>
            no site at <code>{view.address}</code>
          </div>
        </div>
      </div>
    );
  }

  return (
    <iframe
      ref={iframeRef}
      title={view.title}
      style={{ width: '100%', height: '100%', border: 0, background: '#fff' }}
      sandbox="allow-same-origin"
      srcDoc={buildSrcDoc(view.html)}
    />
  );
}
