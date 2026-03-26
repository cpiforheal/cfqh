export function formatDateTime(value: unknown) {
  if (!value) return '-';
  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

export function toStringArray(value: unknown) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item)).filter(Boolean);
  }
  if (typeof value === 'string') {
    return value
      .split(/\n|,|，/)
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

export function toMultilineText(value: unknown) {
  return toStringArray(value).join('\n');
}

export function safeObjectEntries(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return [];
  }
  return Object.entries(value as Record<string, unknown>);
}

export function paginate<T>(items: T[], current = 1, pageSize = 10) {
  const start = Math.max(0, (current - 1) * pageSize);
  return items.slice(start, start + pageSize);
}

export function stringifyRecord(value: unknown) {
  try {
    return JSON.stringify(value, null, 2);
  } catch (error) {
    return String(value);
  }
}

export function normalizeKeyword(value: unknown) {
  return String(value || '').trim().toLowerCase();
}

export function matchesKeyword(record: Record<string, unknown>, keyword: string, fields: string[]) {
  if (!keyword) return true;
  return fields.some((field) => String(record[field] || '').toLowerCase().includes(keyword));
}

export function compactSearchParams(
  currentParams: URLSearchParams,
  patch: Record<string, string | number | undefined | null>
) {
  const next = new URLSearchParams(currentParams);
  for (const [key, value] of Object.entries(patch)) {
    if (value === undefined || value === null || value === '') {
      next.delete(key);
      continue;
    }
    next.set(key, String(value));
  }
  return next;
}

type IdleWindow = Window &
  typeof globalThis & {
    requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
    cancelIdleCallback?: (handle: number) => void;
  };

export function scheduleIdleTask(task: () => void, timeout = 800) {
  if (typeof window === 'undefined') {
    return () => undefined;
  }

  const idleWindow = window as IdleWindow;
  if (idleWindow.requestIdleCallback) {
    const handle = idleWindow.requestIdleCallback(task, { timeout });
    return () => idleWindow.cancelIdleCallback?.(handle);
  }

  const handle = window.setTimeout(task, Math.min(timeout, 250));
  return () => window.clearTimeout(handle);
}

export function stableRowKey(record: Record<string, unknown>, candidates: string[]) {
  for (const key of candidates) {
    const value = record[key];
    if (value !== undefined && value !== null && value !== '') {
      return String(value);
    }
  }

  return stringifyRecord(record);
}
