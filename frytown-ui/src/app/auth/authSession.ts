export const AUTH_STORAGE_KEY = 'frytown-auth-v1';
export const AUTH_SESSION_CHANGED_EVENT = 'frytown-auth-session-changed';

export type AuthSession = {
  id?: number;
  name?: string;
  email?: string;
  phone?: string | null;
  token?: string | null;
  refreshToken?: string | null;
  role?: string | null;
  emailVerified?: boolean | null;
};

export function readAuthSession(): AuthSession | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const rawSession = window.localStorage.getItem(AUTH_STORAGE_KEY);

    if (!rawSession) {
      return null;
    }

    const parsedSession = JSON.parse(rawSession) as AuthSession;

    if (!isAuthSessionActive(parsedSession)) {
      return null;
    }

    return parsedSession;
  } catch {
    return null;
  }
}

export function isAuthSessionActive(session: AuthSession | null): boolean {
  return Boolean(session?.token || session?.email);
}

export function saveAuthSession(auth: AuthSession) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
  notifyAuthSessionChanged();
}

export function clearAuthSession() {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  notifyAuthSessionChanged();
}

export function subscribeToAuthSession(listener: () => void) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  window.addEventListener('storage', listener);
  window.addEventListener(AUTH_SESSION_CHANGED_EVENT, listener);

  return () => {
    window.removeEventListener('storage', listener);
    window.removeEventListener(AUTH_SESSION_CHANGED_EVENT, listener);
  };
}

function notifyAuthSessionChanged() {
  window.dispatchEvent(new Event(AUTH_SESSION_CHANGED_EVENT));
}
