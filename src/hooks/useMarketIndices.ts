import { useState, useEffect } from 'react';
import { marketAPI, MarketIndex } from '../services/api';

const MOCK_INDICES: MarketIndex[] = [
  { name: 'NIFTY 50', value: 24198.85, change: 143.6, changePercent: 0.60 },
  { name: 'SENSEX', value: 79648.92, change: 487.3, changePercent: 0.62 },
  { name: 'NIFTY BANK', value: 52341.15, change: -112.4, changePercent: -0.21 },
  { name: 'NIFTY IT', value: 38654.70, change: 312.8, changePercent: 0.82 },
];

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
    } catch {
      setIndices(MOCK_INDICES);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  return { indices, loading, error, refreshIndices: fetchIndices };
}
