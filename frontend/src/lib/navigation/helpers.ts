import type { NavigationEntry } from './stack';

export type PageView =
  | { kind: 'empty' }
  | { kind: 'loading'; address: string }
  | { kind: 'page'; address: string; title: string; html: string }
  | { kind: 'nowhere'; address: string };

export function entryToView(entry: NavigationEntry): PageView {
  if (!entry.found) {
    return { kind: 'nowhere', address: entry.address };
  }
  return {
    kind: 'page',
    address: entry.address,
    title: entry.title,
    html: entry.html,
  };
}

export function normalizeAddress(address: string): string {
  return address.trim().toLowerCase();
}
