import { Router, Request, Response } from 'express';
import { getMarketIndices } from '../services/nseService';

const router = Router();

router.get('/indices', async (req: Request, res: Response) => {
  try {
    const indices = await getMarketIndices();
    res.json(indices);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch market indices' });
  }
});

export default router;
