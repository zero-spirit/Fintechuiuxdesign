import { useState, useEffect } from 'react';
import { newsAPI, NewsItem } from '../services/api';

export function useNews(category?: string) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNews();
  }, [category]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await newsAPI.getNews(category);
      setNews(data);
    } catch (err: any) {
      if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
        setError('Backend server not running. Start it with: pnpm server:watch');
      } else {
        setError('Failed to fetch news');
      }
      console.error('Error fetching news:', err);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  return { news, loading, error, refreshNews: fetchNews };
}
