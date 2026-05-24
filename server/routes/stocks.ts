import { Router, Request, Response } from 'express';
import {
  getNifty50Stocks,
  getStockQuote,
  getTopGainers,
  getTopLosers,
  searchStocks
} from '../services/nseService';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const stocks = await getNifty50Stocks();

    // If NSE API returns empty data, use fallback mock data
    if (stocks.length === 0) {
      const fallbackStocks = [
        {
          symbol: 'RELIANCE',
          name: 'Reliance Industries Ltd',
          price: 2456.75,
          change: 45.30,
          changePercent: 1.88,
          volume: '12.5M',
          marketCap: '₹16.6L Cr',
          sector: 'Energy'
        },
        {
          symbol: 'TCS',
          name: 'Tata Consultancy Services Ltd',
          price: 3687.20,
          change: -23.50,
          changePercent: -0.63,
          volume: '8.2M',
          marketCap: '₹13.4L Cr',
          sector: 'IT'
        },
        {
          symbol: 'HDFCBANK',
          name: 'HDFC Bank Ltd',
          price: 1634.85,
          change: 12.40,
          changePercent: 0.76,
          volume: '15.7M',
          marketCap: '₹12.4L Cr',
          sector: 'Banking'
        },
        {
          symbol: 'INFY',
          name: 'Infosys Ltd',
          price: 1456.30,
          change: 18.75,
          changePercent: 1.30,
          volume: '9.8M',
          marketCap: '₹6.1L Cr',
          sector: 'IT'
        },
        {
          symbol: 'ICICIBANK',
          name: 'ICICI Bank Ltd',
          price: 1089.50,
          change: -8.25,
          changePercent: -0.75,
          volume: '14.3M',
          marketCap: '₹7.6L Cr',
          sector: 'Banking'
        },
        {
          symbol: 'HINDUNILVR',
          name: 'Hindustan Unilever Ltd',
          price: 2376.40,
          change: 32.10,
          changePercent: 1.37,
          volume: '5.1M',
          marketCap: '₹5.6L Cr',
          sector: 'Consumer'
        },
        {
          symbol: 'BHARTIARTL',
          name: 'Bharti Airtel Ltd',
          price: 1456.90,
          change: 21.35,
          changePercent: 1.49,
          volume: '11.2M',
          marketCap: '₹8.2L Cr',
          sector: 'Telecom'
        },
        {
          symbol: 'ITC',
          name: 'ITC Ltd',
          price: 432.75,
          change: -3.80,
          changePercent: -0.87,
          volume: '18.9M',
          marketCap: '₹5.4L Cr',
          sector: 'Consumer'
        },
        {
          symbol: 'SBIN',
          name: 'State Bank of India',
          price: 789.30,
          change: 15.60,
          changePercent: 2.02,
          volume: '22.4M',
          marketCap: '₹7.0L Cr',
          sector: 'Banking'
        },
        {
          symbol: 'WIPRO',
          name: 'Wipro Ltd',
          price: 456.80,
          change: 8.90,
          changePercent: 1.99,
          volume: '7.6M',
          marketCap: '₹2.5L Cr',
          sector: 'IT'
        },
        {
          symbol: 'LT',
          name: 'Larsen & Toubro Ltd',
          price: 3567.25,
          change: -12.45,
          changePercent: -0.35,
          volume: '4.8M',
          marketCap: '₹4.9L Cr',
          sector: 'Engineering'
        },
        {
          symbol: 'SUNPHARMA',
          name: 'Sun Pharmaceutical Industries Ltd',
          price: 1687.40,
          change: 24.30,
          changePercent: 1.46,
          volume: '6.3M',
          marketCap: '₹4.0L Cr',
          sector: 'Pharma'
        }
      ];
      return res.json(fallbackStocks);
    }

    res.json(stocks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stocks' });
  }
});

router.get('/quote/:symbol', async (req: Request, res: Response) => {
  try {
    const { symbol } = req.params;
    const quote = await getStockQuote(symbol);

    if (!quote) {
      return res.status(404).json({ error: 'Stock not found' });
    }

    res.json(quote);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stock quote' });
  }
});

router.get('/gainers', async (req: Request, res: Response) => {
  try {
    const gainers = await getTopGainers();

    // If NSE API returns empty data, use fallback mock data
    if (gainers.length === 0) {
      const fallbackGainers = [
        { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd', price: 1456.90, change: 21.35, changePercent: 2.49, volume: 11200000 },
        { symbol: 'SBIN', name: 'State Bank of India', price: 789.30, change: 15.60, changePercent: 2.02, volume: 22400000 },
        { symbol: 'WIPRO', name: 'Wipro Ltd', price: 456.80, change: 8.90, changePercent: 1.99, volume: 7600000 },
        { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', price: 2456.75, change: 45.30, changePercent: 1.88, volume: 12500000 },
        { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical Industries Ltd', price: 1687.40, change: 24.30, changePercent: 1.46, volume: 6300000 }
      ];
      return res.json(fallbackGainers);
    }

    res.json(gainers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch top gainers' });
  }
});

router.get('/losers', async (req: Request, res: Response) => {
  try {
    const losers = await getTopLosers();

    // If NSE API returns empty data, use fallback mock data
    if (losers.length === 0) {
      const fallbackLosers = [
        { symbol: 'ITC', name: 'ITC Ltd', price: 432.75, change: -3.80, changePercent: -0.87, volume: 18900000 },
        { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', price: 1089.50, change: -8.25, changePercent: -0.75, volume: 14300000 },
        { symbol: 'TCS', name: 'Tata Consultancy Services Ltd', price: 3687.20, change: -23.50, changePercent: -0.63, volume: 8200000 },
        { symbol: 'LT', name: 'Larsen & Toubro Ltd', price: 3567.25, change: -12.45, changePercent: -0.35, volume: 4800000 },
        { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', price: 1634.85, change: -5.60, changePercent: -0.34, volume: 15700000 }
      ];
      return res.json(fallbackLosers);
    }

    res.json(losers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch top losers' });
  }
});

router.get('/search', async (req: Request, res: Response) => {
  try {
    const { q } = req.query;

    if (!q || typeof q !== 'string') {
      return res.status(400).json({ error: 'Search query required' });
    }

    const results = await searchStocks(q);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search stocks' });
  }
});

export default router;
