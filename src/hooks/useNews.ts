import { useState, useEffect } from 'react';
import { newsAPI, NewsItem } from '../services/api';
import { mockNews } from '../lib/mockData';

export function useNews(category?: string) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { fetchNews(); }, [category]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await newsAPI.getNews(category);
      setNews(data);
    } catch {
      setNews(mockNews as NewsItem[]);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  return { news, loading, error, refreshNews: fetchNews };
}
