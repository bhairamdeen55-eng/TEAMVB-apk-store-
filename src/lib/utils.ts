export function safeLower(value: string) {
  return value.trim().toLowerCase();
}

export function makeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function tsToMs(value: any) {
  if (!value) return 0;
  if (typeof value === 'string') return new Date(value).getTime();
  if (typeof value.toDate === 'function') return value.toDate().getTime();
  if (typeof value.seconds === 'number') return value.seconds * 1000;
  return 0;
}
