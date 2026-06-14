import { useUserDataContext } from '../context/UserDataContext';

export function useWatchlist() {
  const { watchlist, toggleWatchlist: ctxToggle, setWatchlist } = useUserDataContext();

  const watchlistIds = new Set(watchlist);

  const addToWatchlist = async (symbol: string) => {
    if (!watchlistIds.has(symbol)) {
      await setWatchlist([...watchlist, symbol]);
    }
  };

  const removeFromWatchlist = async (symbol: string) => {
    await setWatchlist(watchlist.filter(s => s !== symbol));
  };

  const toggleWatchlist = async (symbol: string) => {
    await ctxToggle(symbol);
  };

  const isInWatchlist = (symbol: string) => watchlistIds.has(symbol);

  return {
    watchlistIds,
    addToWatchlist,
    removeFromWatchlist,
    toggleWatchlist,
    isInWatchlist,
  };
}
