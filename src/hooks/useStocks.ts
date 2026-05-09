import { useState, useEffect } from 'react';
import { stockAPI, Stock } from '../services/api';

export function useStocks() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await stockAPI.getAllStocks();
      setStocks(data);
    } catch (err: any) {
      if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
        setError('Backend server not running. Start it with: pnpm server:watch');
      } else {
        setError('Failed to fetch stocks');
      }
      console.error('Error fetching stocks:', err);
      setStocks([]);
    } finally {
      setLoading(false);
    }
  };

  const refreshStocks = () => {
    fetchStocks();
  };

  return { stocks, loading, error, refreshStocks };
}

export function useStockQuote(symbol: string) {
  const [stock, setStock] = useState<Stock | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!symbol) return;

    const fetchQuote = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await stockAPI.getStockQuote(symbol);
        setStock(data);
      } catch (err) {
        setError('Failed to fetch stock quote');
        console.error('Error fetching quote:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, [symbol]);

  return { stock, loading, error };
}

export function useTopGainersLosers() {
  const [gainers, setGainers] = useState<Stock[]>([]);
  const [losers, setLosers] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [gainersData, losersData] = await Promise.all([
        stockAPI.getTopGainers(),
        stockAPI.getTopLosers()
      ]);
      setGainers(gainersData);
      setLosers(losersData);
    } catch (err: any) {
      if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
        setError('Backend server not running. Start it with: pnpm server:watch');
      } else {
        setError('Failed to fetch market movers');
      }
      console.error('Error:', err);
      setGainers([]);
      setLosers([]);
    } finally {
      setLoading(false);
    }
  };

  return { gainers, losers, loading, error };
}
