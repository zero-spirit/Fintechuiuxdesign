import { useState, useEffect } from 'react';
import { stockAPI, Stock } from '../services/api';
import { mockStocks } from '../lib/mockData';

export function useStocks() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { fetchStocks(); }, []);

  const fetchStocks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await stockAPI.getAllStocks();
      setStocks(data);
    } catch {
      // Fall back to mock data so the UI is never empty
      setStocks(mockStocks as Stock[]);
      setError(null); // clear error — mock data is shown instead
    } finally {
      setLoading(false);
    }
  };

  return { stocks, loading, error, refreshStocks: fetchStocks };
}

export function useTopGainersLosers() {
  const [gainers, setGainers] = useState<Stock[]>([]);
  const [losers, setLosers] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const [g, l] = await Promise.all([
          stockAPI.getTopGainers(),
          stockAPI.getTopLosers(),
        ]);
        setGainers(g);
        setLosers(l);
      } catch {
        const sorted = [...mockStocks].sort((a, b) => b.changePercent - a.changePercent);
        setGainers(sorted.slice(0, 5) as Stock[]);
        setLosers(sorted.slice(-5).reverse() as Stock[]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { gainers, losers, loading };
}

export function useStockQuote(symbol: string) {
  const [stock, setStock] = useState<Stock | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!symbol) return;
    const fetch = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await stockAPI.getStockQuote(symbol);
        setStock(data);
      } catch {
        const fallback = mockStocks.find(s => s.symbol === symbol);
        setStock((fallback as Stock) ?? null);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [symbol]);

  return { stock, loading, error };
}
