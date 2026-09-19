export function isValidAddress(address: string): boolean {
  // e.g. tidepool.zz, my-page.zz
  return /^[a-z0-9][a-z0-9-]*\.[a-z0-9]{2,}$/i.test(address.trim());
}

export function snippetFromHtml(html: string, max = 120): string {
  const text = html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= max) return text;
  return `${text.slice(0, max)}…`;
}
