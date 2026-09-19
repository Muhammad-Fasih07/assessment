'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { api } from '@/lib/api/client';
import {
  entryToView,
  normalizeAddress,
  type PageView,
} from '@/lib/navigation/helpers';
import {
  canGoBack,
  canGoForward,
  createNavigationState,
  currentEntry,
  goBack,
  goForward,
  navigateTo,
  type NavigationEntry,
  type NavigationState,
} from '@/lib/navigation/stack';
import type { Person, Visit, VisitHow } from '@/types/domain';
import { HistoryPanel } from './HistoryPanel';
import { PersonPicker } from './PersonPicker';
import { PublishPanel } from './PublishPanel';
import { SearchPanel } from './SearchPanel';
import { Toolbar } from './Toolbar';
import { Viewport } from './Viewport';

type Panel = 'history' | 'search' | 'publish';

export function BrowserApp() {
  const [people, setPeople] = useState<Person[]>([]);
  const [personId, setPersonId] = useState<string | null>(null);
  const [addressInput, setAddressInput] = useState('');
  const [nav, setNav] = useState<NavigationState>(createNavigationState());
  const [view, setView] = useState<PageView>({ kind: 'empty' });
  const [loading, setLoading] = useState(false);
  const [panel, setPanel] = useState<Panel>('history');
  const [visits, setVisits] = useState<Visit[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [bootError, setBootError] = useState<string | null>(null);

  const navRef = useRef(nav);
  navRef.current = nav;
  const personRef = useRef(personId);
  personRef.current = personId;

  useEffect(() => {
    api
      .getPeople()
      .then(setPeople)
      .catch((err) =>
        setBootError(err instanceof Error ? err.message : 'could not load people'),
      );
  }, []);

  const refreshHistory = useCallback(async (id: string) => {
    setHistoryLoading(true);
    try {
      setVisits(await api.getHistory(id));
    } catch {
      setVisits([]);
    } finally {
      setHistoryLoading(false);
    }
  }, []);

  useEffect(() => {
    if (personId) refreshHistory(personId);
    else setVisits([]);
  }, [personId, refreshHistory]);

  async function logVisit(address: string, how: VisitHow, found: boolean) {
    const id = personRef.current;
    if (!id) return;
    try {
      await api.recordVisit({ personId: id, address, how, found });
      await refreshHistory(id);
    } catch {
      // ignore
    }
  }

  function showEntry(entry: NavigationEntry) {
    setAddressInput(entry.address);
    setView(entryToView(entry));
  }

  function restoreFromStack(how: 'back' | 'forward') {
    const current = navRef.current;
    const next = how === 'back' ? goBack(current) : goForward(current);
    if (next.index === current.index) return;
    const entry = currentEntry(next);
    if (!entry) return;
    setNav(next);
    showEntry(entry);
    void logVisit(entry.address, how, entry.found);
  }

  async function openAddress(address: string, how: VisitHow) {
    const clean = normalizeAddress(address);
    if (!clean) return;

    if (!personRef.current) {
      setBootError('pick someone to browse as first');
      return;
    }

    setLoading(true);
    setAddressInput(clean);
    setView({ kind: 'loading', address: clean });
    setBootError(null);

    let entry: NavigationEntry;
    try {
      const site = await api.getSite(clean);
      entry = {
        address: clean,
        title: site.title,
        found: true,
        html: site.html,
      };
    } catch {
      entry = {
        address: clean,
        title: clean,
        found: false,
        html: '',
      };
    }

    setNav((prev) => navigateTo(prev, entry));
    showEntry(entry);
    setLoading(false);
    await logVisit(clean, how, entry.found);
  }

  const tabBtn = (name: Panel) => ({
    flex: 1,
    border: 0,
    borderBottom: panel === name ? '2px solid var(--text)' : '2px solid transparent',
    background: 'transparent',
    padding: '8px 6px',
    cursor: 'pointer',
    color: panel === name ? 'var(--text)' : 'var(--muted)',
    fontWeight: panel === name ? 600 : 400,
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        background: 'var(--bg)',
      }}
    >
      <header
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          padding: '8px 12px',
          background: 'var(--bar)',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <div>
          <strong>small web</strong>
          <span style={{ marginLeft: 8, color: 'var(--muted)', fontSize: 12 }}>
            {nav.stack.length > 0
              ? `${nav.index + 1}/${nav.stack.length}`
              : 'browser'}
          </span>
        </div>
        <PersonPicker
          people={people}
          personId={personId}
          onChange={(id) => {
            setPersonId(id);
            setNav(createNavigationState());
            setView({ kind: 'empty' });
            setAddressInput('');
            setBootError(null);
          }}
        />
      </header>

      <Toolbar
        address={addressInput}
        canBack={canGoBack(nav)}
        canForward={canGoForward(nav)}
        loading={loading}
        onAddressChange={setAddressInput}
        onGo={() => void openAddress(addressInput, 'typed')}
        onBack={() => restoreFromStack('back')}
        onForward={() => restoreFromStack('forward')}
      />

      {bootError && (
        <div
          style={{
            padding: '8px 12px',
            background: '#fde8ec',
            color: 'var(--bad)',
            borderBottom: '1px solid var(--line)',
          }}
        >
          {bootError}
        </div>
      )}

      <div
        className="browser-main"
        style={{ display: 'flex', flex: 1, minHeight: 0 }}
      >
        <main
          style={{
            flex: 1,
            minWidth: 0,
            background: '#fff',
            borderRight: '1px solid var(--line)',
          }}
        >
          <Viewport
            view={view}
            onNavigate={(address) => void openAddress(address, 'link')}
          />
        </main>

        <aside
          className="browser-side"
          style={{
            width: 320,
            maxWidth: '100%',
            background: 'var(--panel)',
            display: 'flex',
            flexDirection: 'column',
            borderLeft: '1px solid var(--line)',
          }}
        >
          <div style={{ display: 'flex', borderBottom: '1px solid var(--line)' }}>
            {(['history', 'search', 'publish'] as Panel[]).map((name) => (
              <button
                key={name}
                type="button"
                style={tabBtn(name)}
                onClick={() => setPanel(name)}
              >
                {name}
              </button>
            ))}
          </div>
          <div style={{ position: 'relative', flex: 1, minHeight: 0 }}>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: panel === 'history' ? 'block' : 'none',
              }}
            >
              <HistoryPanel
                visits={visits}
                loading={historyLoading}
                onJump={(address) => void openAddress(address, 'history')}
              />
            </div>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: panel === 'search' ? 'block' : 'none',
              }}
            >
              <SearchPanel
                onOpen={(address) => void openAddress(address, 'search')}
              />
            </div>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: panel === 'publish' ? 'block' : 'none',
              }}
            >
              <PublishPanel
                authorId={personId}
                authorName={people.find((p) => p._id === personId)?.name}
                onPublished={(address) => void openAddress(address, 'typed')}
              />
            </div>
          </div>
        </aside>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .browser-main { flex-direction: column; }
          .browser-side { width: 100% !important; height: 40vh; border-left: 0 !important; border-top: 1px solid var(--line); }
        }
      `}</style>
    </div>
  );
}
