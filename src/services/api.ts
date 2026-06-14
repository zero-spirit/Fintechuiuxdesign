import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

// Unified Stock type — superset of both mockData and backend shapes
export interface Stock {
  id?: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
  sector: string;
  open?: number;
  high?: number;
  low?: number;
  previousClose?: number;
  pe?: number;
  eps?: number;
  chartData?: { time: string; value: number }[];
}

export interface IPO {
  id: string;
  company: string;
  logo?: string;
  priceRange: string;
  lotSize: number;
  openDate: string;
  closeDate: string;
  listingDate: string;
  issueSize?: string;
  gmp: number;
  subscriptionTimes: number;
  status: 'upcoming' | 'open' | 'closed' | 'listed';
  expectedListing: number;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  timestamp: string;
  category: string;
  url?: string;
  imageUrl?: string;
  aiSummary?: string;
}

export interface MarketIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

export const stockAPI = {
  getAllStocks: async (): Promise<Stock[]> => {
    const response = await api.get('/stocks');
    return response.data;
  },
  getStockQuote: async (symbol: string): Promise<Stock> => {
    const response = await api.get(`/stocks/quote/${symbol}`);
    return response.data;
  },
  getTopGainers: async (): Promise<Stock[]> => {
    const response = await api.get('/stocks/gainers');
    return response.data;
  },
  getTopLosers: async (): Promise<Stock[]> => {
    const response = await api.get('/stocks/losers');
    return response.data;
  },
  searchStocks: async (query: string): Promise<Stock[]> => {
    const response = await api.get('/stocks/search', { params: { q: query } });
    return response.data;
  }
};

export const ipoAPI = {
  getIPOs: async (): Promise<IPO[]> => {
    const response = await api.get('/ipo');
    return response.data;
  },
  getIPODetails: async (id: string): Promise<IPO> => {
    const response = await api.get(`/ipo/${id}`);
    return response.data;
  }
};

export const newsAPI = {
  getNews: async (category?: string): Promise<NewsItem[]> => {
    const params = category && category !== 'all' ? { category } : {};
    const response = await api.get('/news', { params });
    return response.data;
  },
  searchNews: async (query: string): Promise<NewsItem[]> => {
    const response = await api.get('/news/search', { params: { q: query } });
    return response.data;
  }
};

export const marketAPI = {
  getIndices: async (): Promise<MarketIndex[]> => {
    const response = await api.get('/market/indices');
    return response.data;
  }
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
      console.warn('⚠️ Backend offline — falling back to mock data. Run: npm run dev:full');
    } else {
      console.error('API Error:', error.response?.status, error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
