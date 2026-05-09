import { useState, useEffect } from 'react';
import { marketAPI, MarketIndex } from '../services/api';

export function useMarketIndices() {
  const [indices, setIndices] = useState<MarketIndex[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchIndices();
    const interval = setInterval(fetchIndices, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchIndices = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await marketAPI.getIndices();
      setIndices(data);
    } catch (err: any) {
      if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
        setError('Backend server not running. Start it with: pnpm server:watch');
      } else {
        setError('Failed to fetch market indices');
      }
      console.error('Error:', err);
      setIndices([]);
    } finally {
      setLoading(false);
    }
  };

  return { indices, loading, error, refreshIndices: fetchIndices };
}
