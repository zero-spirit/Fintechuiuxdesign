import { Router, Request, Response } from 'express';
import { getUpcomingIPOs, getIPODetails } from '../services/ipoService';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const ipos = await getUpcomingIPOs();
    res.json(ipos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch IPOs' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ipo = await getIPODetails(id);

    if (!ipo) {
      return res.status(404).json({ error: 'IPO not found' });
    }

    res.json(ipo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch IPO details' });
  }
});

export default router;
