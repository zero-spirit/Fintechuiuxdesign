import { useState, useEffect, useCallback, useRef } from 'react';
import {
  fetchSnapshot,
  saveWatchlist,
  saveBaskets,
  saveIPOAlerts,
  saveProfile,
  getOrCreateUserId,
  type UserProfile,
} from '../lib/userApi';

interface UserDataState {
  userId: string;
  profile: UserProfile | null;
  watchlist: string[];
  subscribedBaskets: string[];
  watchedIPOs: string[];
  loading: boolean;
  synced: boolean;
}

interface UserDataActions {
  setWatchlist: (stocks: string[]) => Promise<void>;
  toggleWatchlist: (symbol: string) => Promise<void>;
  setSubscribedBaskets: (ids: string[]) => Promise<void>;
  toggleBasketSubscription: (id: string) => Promise<void>;
  setWatchedIPOs: (ids: string[]) => Promise<void>;
  toggleIPOAlert: (id: string) => Promise<void>;
  updateProfile: (patch: Partial<UserProfile>) => Promise<void>;
  refresh: () => Promise<void>;
}

export function useUserData(): UserDataState & UserDataActions {
  const userId = getOrCreateUserId();
  // Initialise synchronously from localStorage so the UI is correct before the async load completes.
  const [state, setState] = useState<Omit<UserDataState, 'userId'>>(() => {
    const migrateWatchlist = (): string[] => {
      // Support old key 'watchlist' (pre-MongoDB integration) as well as new key 'ani_watchlist'
      const raw = localStorage.getItem('ani_watchlist') ?? localStorage.getItem('watchlist');
      if (!raw) return [];
      try {
        const parsed = JSON.parse(raw);
        // Old format was string[], new format is { stocks: [{symbol}] }
        if (Array.isArray(parsed)) return parsed as string[];
        return parsed.stocks?.map((s: { symbol: string }) => s.symbol) ?? [];
      } catch { return []; }
    };
    const migrateBaskets = (): string[] => {
      const raw = localStorage.getItem('ani_baskets') ?? localStorage.getItem('subscribedBaskets');
      if (!raw) return [];
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed as string[];
        return parsed.subscribedBaskets ?? [];
      } catch { return []; }
    };
    const migrateIPOs = (): string[] => {
      const raw = localStorage.getItem('ani_ipo_alerts');
      if (!raw) return [];
      try {
        const parsed = JSON.parse(raw);
        return parsed.watchedIPOs ?? [];
      } catch { return []; }
    };
    return {
      profile: null,
      watchlist: migrateWatchlist(),
      subscribedBaskets: migrateBaskets(),
      watchedIPOs: migrateIPOs(),
      loading: true,
      synced: false,
    };
  });

  // Prevent stale closures in async callbacks
  const stateRef = useRef(state);
  stateRef.current = state;

  const load = useCallback(async () => {
    setState(s => ({ ...s, loading: true }));
    try {
      const snap = await fetchSnapshot(userId);
      const remoteWatchlist = snap.watchlist?.stocks?.map(s => s.symbol) ?? [];
      const remoteBaskets = snap.baskets?.subscribedBaskets ?? [];
      const remoteIPOs = snap.ipoAlerts?.watchedIPOs ?? [];
      setState(current => ({
        // Merge remote data with any local changes made while the fetch was in flight.
        // Prefer the longer list so we never silently drop a user's in-flight toggle.
        profile: snap.profile ?? current.profile,
        watchlist: remoteWatchlist.length >= current.watchlist.length ? remoteWatchlist : current.watchlist,
        subscribedBaskets: remoteBaskets.length >= current.subscribedBaskets.length ? remoteBaskets : current.subscribedBaskets,
        watchedIPOs: remoteIPOs.length >= current.watchedIPOs.length ? remoteIPOs : current.watchedIPOs,
        loading: false,
        synced: true,
      }));
    } catch {
      setState(s => ({ ...s, loading: false }));
    }
  }, [userId]);

  useEffect(() => { load(); }, [load]);

  const setWatchlist = useCallback(async (stocks: string[]) => {
    setState(s => ({ ...s, watchlist: stocks }));
    await saveWatchlist(userId, stocks);
  }, [userId]);

  const toggleWatchlist = useCallback(async (symbol: string) => {
    const curr = stateRef.current.watchlist;
    const next = curr.includes(symbol) ? curr.filter(s => s !== symbol) : [...curr, symbol];
    await setWatchlist(next);
  }, [setWatchlist]);

  const setSubscribedBaskets = useCallback(async (ids: string[]) => {
    setState(s => ({ ...s, subscribedBaskets: ids }));
    await saveBaskets(userId, ids);
  }, [userId]);

  const toggleBasketSubscription = useCallback(async (id: string) => {
    const curr = stateRef.current.subscribedBaskets;
    const next = curr.includes(id) ? curr.filter(b => b !== id) : [...curr, id];
    await setSubscribedBaskets(next);
  }, [setSubscribedBaskets]);

  const setWatchedIPOs = useCallback(async (ids: string[]) => {
    setState(s => ({ ...s, watchedIPOs: ids }));
    await saveIPOAlerts(userId, ids);
  }, [userId]);

  const toggleIPOAlert = useCallback(async (id: string) => {
    const curr = stateRef.current.watchedIPOs;
    const next = curr.includes(id) ? curr.filter(i => i !== id) : [...curr, id];
    await setWatchedIPOs(next);
  }, [setWatchedIPOs]);

  const updateProfile = useCallback(async (patch: Partial<UserProfile>) => {
    const next = { ...stateRef.current.profile, ...patch } as UserProfile;
    setState(s => ({ ...s, profile: next }));
    await saveProfile(userId, next);
  }, [userId]);

  return {
    userId,
    ...state,
    setWatchlist,
    toggleWatchlist,
    setSubscribedBaskets,
    toggleBasketSubscription,
    setWatchedIPOs,
    toggleIPOAlert,
    updateProfile,
    refresh: load,
  };
}
