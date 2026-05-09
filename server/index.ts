import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import stockRoutes from './routes/stocks';
import ipoRoutes from './routes/ipo';
import newsRoutes from './routes/news';
import marketRoutes from './routes/market';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

app.use('/api/stocks', stockRoutes);
app.use('/api/ipo', ipoRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/market', marketRoutes);

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Ani.AMC API is running' });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Ani.AMC Server running on http://localhost:${PORT}`);
  console.log(`📊 Stock API ready for Indian markets (NSE/BSE)`);
});

export default app;
