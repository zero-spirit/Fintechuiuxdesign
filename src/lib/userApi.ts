// Unified API client — tries Express backend (MongoDB) first, falls back to Supabase edge cache.
// If both are unreachable, reads/writes localStorage only.

const EXPRESS_BASE = 'http://localhost:3001/api/user';

// Supabase edge function base URL derived from project info
const SUPABASE_BASE = 'https://qtsshrodxtzcrxvpoczf.supabase.co/functions/v1/make-server-59e47c35/user';

export interface UserProfile {
  userId: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  riskProfile: 'conservative' | 'moderate' | 'aggressive';
  investmentGoal: string;
  monthlyInvestment: number;
  darkMode: boolean;
  notifications: boolean;
}

export interface UserSnapshot {
  profile: UserProfile | null;
  watchlist: { stocks: { symbol: string; addedAt: string }[] };
  baskets: { subscribedBaskets: string[] };
  ipoAlerts: { watchedIPOs: string[] };
}

// ─── Device user ID ──────────────────────────────────────────────────────────
export function getOrCreateUserId(): string {
  let id = localStorage.getItem('ani_user_id');
  if (!id) {
    id = 'user_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem('ani_user_id', id);
  }
  return id;
}

// ─── Internal helpers ─────────────────────────────────────────────────────────
async function expressGet<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${EXPRESS_BASE}${path}`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? json;
  } catch { return null; }
}

async function expressPut<T>(path: string, body: unknown): Promise<T | null> {
  try {
    const res = await fetch(`${EXPRESS_BASE}${path}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? json;
  } catch { return null; }
}

async function supabaseGet<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${SUPABASE_BASE}${path}`, { signal: AbortSignal.timeout(4000) });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch { return null; }
}

async function supabasePut<T>(path: string, body: unknown): Promise<T | null> {
  try {
    const res = await fetch(`${SUPABASE_BASE}${path}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch { return null; }
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function fetchSnapshot(userId: string): Promise<UserSnapshot> {
  // 1. Try Express (MongoDB + KV cache)
  const expressResult = await expressGet<UserSnapshot>(`/${userId}/snapshot`);
  if (expressResult) return expressResult;

  // 2. Try Supabase edge cache directly
  try {
    const res = await fetch(`${SUPABASE_BASE}/${userId}/snapshot`, { signal: AbortSignal.timeout(4000) });
    if (res.ok) {
      const json = await res.json();
      if (json.profile || json.watchlist) return json as UserSnapshot;
    }
  } catch { /* ignore */ }

  // 3. Fallback to localStorage
  return {
    profile: JSON.parse(localStorage.getItem('ani_profile') ?? 'null'),
    watchlist: JSON.parse(localStorage.getItem('ani_watchlist') ?? '{"stocks":[]}'),
    baskets: JSON.parse(localStorage.getItem('ani_baskets') ?? '{"subscribedBaskets":[]}'),
    ipoAlerts: JSON.parse(localStorage.getItem('ani_ipo_alerts') ?? '{"watchedIPOs":[]}'),
  };
}

export async function saveProfile(userId: string, profile: Partial<UserProfile>): Promise<void> {
  localStorage.setItem('ani_profile', JSON.stringify({ ...profile, userId }));
  const result = await expressPut(`/${userId}`, profile) ?? await supabasePut(`/${userId}/profile`, profile);
  if (!result) console.warn('Profile saved to localStorage only');
}

export async function saveWatchlist(userId: string, stocks: string[]): Promise<void> {
  const payload = { stocks: stocks.map(s => ({ symbol: s, addedAt: new Date().toISOString() })) };
  // Write to both keys so old code and new code can read it
  localStorage.setItem('ani_watchlist', JSON.stringify(payload));
  localStorage.setItem('watchlist', JSON.stringify(stocks));
  const result = await expressPut(`/${userId}/watchlist`, { stocks }) ?? await supabasePut(`/${userId}/watchlist`, { stocks });
  if (!result) console.warn('Watchlist saved to localStorage only');
}

export async function saveBaskets(userId: string, subscribedBaskets: string[]): Promise<void> {
  localStorage.setItem('ani_baskets', JSON.stringify({ subscribedBaskets }));
  const result = await expressPut(`/${userId}/baskets`, { subscribedBaskets }) ?? await supabasePut(`/${userId}/baskets`, { subscribedBaskets });
  if (!result) console.warn('Baskets saved to localStorage only');
}

export async function saveIPOAlerts(userId: string, watchedIPOs: string[]): Promise<void> {
  localStorage.setItem('ani_ipo_alerts', JSON.stringify({ watchedIPOs }));
  const result = await expressPut(`/${userId}/ipo-alerts`, { watchedIPOs }) ?? await supabasePut(`/${userId}/ipo-alerts`, { watchedIPOs });
  if (!result) console.warn('IPO alerts saved to localStorage only');
}
