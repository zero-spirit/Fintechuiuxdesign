import { Router, Request, Response } from 'express';
import {
  getNifty50Stocks,
  getStockQuote,
  getTopGainers,
  getTopLosers,
  searchStocks
} from '../services/nseService';
import {
  generateMockNifty50Stocks,
  generateTopGainers as getMockGainers,
  generateTopLosers as getMockLosers
} from '../services/mockStockData';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    // Try NSE API first, but use mock data as fallback
    let stocks = await getNifty50Stocks();

    // Use comprehensive mock data if NSE API fails
    if (stocks.length === 0) {
      stocks = generateMockNifty50Stocks();
    }

    res.json(stocks);
  } catch (error) {
    // On any error, return mock data
    const stocks = generateMockNifty50Stocks();
    res.json(stocks);
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
    let gainers = await getTopGainers();

    // Use mock data if NSE API fails
    if (gainers.length === 0) {
      gainers = getMockGainers();
    }

    res.json(gainers);
  } catch (error) {
    // On any error, return mock data
    const gainers = getMockGainers();
    res.json(gainers);
  }
});

router.get('/losers', async (req: Request, res: Response) => {
  try {
    let losers = await getTopLosers();

    // Use mock data if NSE API fails
    if (losers.length === 0) {
      losers = getMockLosers();
    }

    res.json(losers);
  } catch (error) {
    // On any error, return mock data
    const losers = getMockLosers();
    res.json(losers);
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
