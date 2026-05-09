import { useState, useEffect } from 'react';
import { ipoAPI, IPO } from '../services/api';

export function useIPOs() {
  const [ipos, setIPOs] = useState<IPO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchIPOs();
  }, []);

  const fetchIPOs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ipoAPI.getIPOs();
      setIPOs(data);
    } catch (err: any) {
      if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
        setError('Backend server not running. Start it with: pnpm server:watch');
      } else {
        setError('Failed to fetch IPOs');
      }
      console.error('Error fetching IPOs:', err);
      setIPOs([]);
    } finally {
      setLoading(false);
    }
  };

  return { ipos, loading, error, refreshIPOs: fetchIPOs };
}

export function useIPODetails(id: string) {
  const [ipo, setIPO] = useState<IPO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchIPO = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await ipoAPI.getIPODetails(id);
        setIPO(data);
      } catch (err) {
        setError('Failed to fetch IPO details');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchIPO();
  }, [id]);

  return { ipo, loading, error };
}
