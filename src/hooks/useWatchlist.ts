import { useState, useEffect } from 'react';

export function useWatchlist() {
  const [watchlistIds, setWatchlistIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('watchlist');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(Array.from(watchlistIds)));
  }, [watchlistIds]);

  const addToWatchlist = (symbol: string) => {
    setWatchlistIds(prev => new Set([...prev, symbol]));
  };

  const removeFromWatchlist = (symbol: string) => {
    setWatchlistIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(symbol);
      return newSet;
    });
  };

  const toggleWatchlist = (symbol: string) => {
    if (watchlistIds.has(symbol)) {
      removeFromWatchlist(symbol);
    } else {
      addToWatchlist(symbol);
    }
  };

  const isInWatchlist = (symbol: string) => {
    return watchlistIds.has(symbol);
  };

  return {
    watchlistIds,
    addToWatchlist,
    removeFromWatchlist,
    toggleWatchlist,
    isInWatchlist,
  };
}
