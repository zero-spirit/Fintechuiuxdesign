import { Router, Request, Response } from 'express';
import { getMarketNews, getNewsByCategory, searchNews } from '../services/newsService';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { category } = req.query;

    if (category && typeof category === 'string') {
      const news = await getNewsByCategory(category);
      return res.json(news);
    }

    const news = await getMarketNews();
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

router.get('/search', async (req: Request, res: Response) => {
  try {
    const { q } = req.query;

    if (!q || typeof q !== 'string') {
      return res.status(400).json({ error: 'Search query required' });
    }

    const results = await searchNews(q);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search news' });
  }
});

export default router;
