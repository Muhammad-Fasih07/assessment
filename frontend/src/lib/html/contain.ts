// keep untrusted page html from breaking out of the viewport

const BLOCKED_TAGS = [
  'script',
  'iframe',
  'object',
  'embed',
  'link',
  'meta',
  'base',
  'form',
];

export function containHtml(html: string): string {
  if (typeof window === 'undefined') return html;

  const doc = new DOMParser().parseFromString(
    `<div id="root">${html}</div>`,
    'text/html',
  );
  const root = doc.getElementById('root');
  if (!root) return '';

  for (const tag of BLOCKED_TAGS) {
    root.querySelectorAll(tag).forEach((el) => el.remove());
  }

  root.querySelectorAll('*').forEach((el) => {
    for (const attr of Array.from(el.attributes)) {
      const name = attr.name.toLowerCase();
      if (name.startsWith('on')) {
        el.removeAttribute(attr.name);
      }
      if (
        (name === 'href' || name === 'src' || name === 'xlink:href') &&
        /^\s*javascript:/i.test(attr.value)
      ) {
        el.removeAttribute(attr.name);
      }
    }
  });

  return root.innerHTML;
}

// turn an <a href> into a small-web address, or null if we should ignore it
export function hrefToAddress(href: string | null): string | null {
  if (!href) return null;

  const raw = href.trim();
  if (!raw || raw.startsWith('#')) return null;
  if (/^\s*javascript:/i.test(raw)) return null;
  if (/^\s*mailto:/i.test(raw)) return null;

  try {
    if (/^https?:\/\//i.test(raw)) {
      const url = new URL(raw);
      const host = url.hostname.toLowerCase();
      if (host && host.includes('.')) return host;
      return null;
    }
  } catch {
    return null;
  }

  // tidepool.zz or /tidepool.zz
  return raw.replace(/^\//, '').toLowerCase();
}

export function buildSrcDoc(bodyHtml: string): string {
  const safe = containHtml(bodyHtml);
  return `<!DOCTYPE html><html><head><meta charset="utf-8" />
<style>
  body { font-family: system-ui, sans-serif; line-height: 1.5; padding: 20px; color: #222; max-width: 700px; margin: 0; }
  a { color: #1a5fb4; }
</style>
</head><body>${safe}</body></html>`;
}
