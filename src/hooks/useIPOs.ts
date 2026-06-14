import { useState, useEffect } from 'react';
import { ipoAPI, IPO } from '../services/api';
import { mockIPOs } from '../lib/mockData';

export function useIPOs() {
  const [ipos, setIPOs] = useState<IPO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { fetchIPOs(); }, []);

  const fetchIPOs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ipoAPI.getIPOs();
      setIPOs(data);
    } catch {
      setIPOs(mockIPOs as IPO[]);
      setError(null);
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
    const fetch = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await ipoAPI.getIPODetails(id);
        setIPO(data);
      } catch {
        const fallback = mockIPOs.find(i => i.id === id);
        setIPO((fallback as IPO) ?? null);
        setError(null);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  return { ipo, loading, error };
}
