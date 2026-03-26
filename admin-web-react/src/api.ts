export type AuthState = {
  authenticated: boolean;
  bootstrapRequired: boolean;
  cloudReady: boolean;
  mode: string;
  modeLabel: string;
  writeTarget?: string;
  writeTargetLabel?: string;
  writeNotice?: string;
  user: Record<string, unknown> | null;
  permissions: {
    canRead: boolean;
    canWrite: boolean;
    canPublish: boolean;
    canManageUsers: boolean;
    canReset: boolean;
  };
};

export type MetaPayload = {
  pageOptions: Array<{ key: string; label: string }>;
  listOptions: Array<{ key: string; label: string }>;
  mode: string;
  previewUrls: string[];
  currentUser: Record<string, unknown> | null;
  permissions: AuthState['permissions'];
};

export type HealthPayload = {
  port: number;
  mode: string;
  modeLabel: string;
  cloudReady: boolean;
  writeEnabled: boolean;
  writeTarget: string;
  writeTargetLabel: string;
  writeNotice: string;
  urls: string[];
  previewUrls: string[];
  config: Record<string, unknown>;
  limits: Record<string, number>;
};

class ApiError extends Error {
  statusCode: number;
  code: string;
  data: unknown;

  constructor(message: string, statusCode = 500, code = '', data: unknown = null) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.code = code;
    this.data = data;
  }
}

type ApiEnvelope<T> = {
  ok: boolean;
  message?: string;
  code?: string;
  data?: T;
};

async function request<T>(pathname: string, init?: RequestInit): Promise<T> {
  const response = await fetch(pathname, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {})
    },
    ...init
  });

  const payload = (await response.json().catch(() => ({}))) as ApiEnvelope<T>;
  if (!response.ok || payload.ok === false) {
    throw new ApiError(payload.message || '请求失败', response.status, payload.code || '', payload.data);
  }

  return (payload.data ?? payload) as T;
}

export { ApiError };

export const api = {
  getAuthStatus() {
    return request<AuthState>('/api/auth/status');
  },
  bootstrap(payload: { name: string; loginAccount: string; password: string }) {
    return request<{ authenticated: boolean }>('/api/auth/bootstrap', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },
  login(payload: { loginAccount: string; password: string }) {
    return request<{ authenticated: boolean }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },
  logout() {
    return request<{ ok: boolean }>('/api/auth/logout', {
      method: 'POST',
      body: JSON.stringify({})
    });
  },
  getMeta() {
    return request<MetaPayload>('/api/meta');
  },
  getHealth() {
    return request<HealthPayload>('/api/health');
  },
  getPage(pageKey: string) {
    return request<Record<string, unknown> | null>(`/api/page/${pageKey}`);
  },
  updatePage(pageKey: string, payload: Record<string, unknown>) {
    return request<Record<string, unknown>>(`/api/page/${pageKey}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
  },
  getCollectionTemplate(collectionKey: string) {
    return request<Record<string, unknown>>(`/api/template/${collectionKey}`);
  },
  listCollection(collectionKey: string) {
    return request<Array<Record<string, unknown>>>(`/api/collection/${collectionKey}`);
  },
  getCollectionItem(collectionKey: string, itemId: string) {
    return request<Record<string, unknown> | null>(`/api/collection/${collectionKey}/${itemId}`);
  },
  createCollectionItem(collectionKey: string, payload: Record<string, unknown>) {
    return request<Record<string, unknown>>(`/api/collection/${collectionKey}`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },
  updateCollectionItem(collectionKey: string, itemId: string, payload: Record<string, unknown>) {
    return request<Record<string, unknown>>(`/api/collection/${collectionKey}/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
  },
  deleteCollectionItem(collectionKey: string, itemId: string) {
    return request<{ ok: boolean }>(`/api/collection/${collectionKey}/${itemId}`, {
      method: 'DELETE'
    });
  }
};
