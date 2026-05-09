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
    res.json(gainers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch top gainers' });
  }
});

router.get('/losers', async (req: Request, res: Response) => {
  try {
    const losers = await getTopLosers();
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
