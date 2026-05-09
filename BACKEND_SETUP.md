# Ani.AMC - Backend Setup Guide

This guide will help you set up and run the full-stack Ani.AMC application with real Indian stock market data.

## 📋 Prerequisites

- Node.js 18+ installed
- pnpm package manager
- Internet connection (for fetching live market data)

## 🏗️ Architecture

The application consists of:

### Frontend (React + Vite)
- **Framework:** React 18 with TypeScript
- **Routing:** React Router DOM
- **Styling:** Tailwind CSS v4
- **State Management:** React Hooks
- **Port:** 5173 (Vite dev server)

### Backend (Express + TypeScript)
- **Framework:** Express.js
- **Language:** TypeScript
- **Data Sources:** NSE India APIs, web scraping
- **Port:** 3001

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Environment Setup

The `.env` file is already created with default values:

```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

For additional features, you can add optional API keys to `.env`:

```env
# Optional: For enhanced stock data
ALPHA_VANTAGE_API_KEY=your_key_here

# Optional: For news aggregation
NEWS_API_KEY=your_key_here

# Optional: For premium data
RAPIDAPI_KEY=your_key_here
```

### 3. Run the Application

**Option A: Run Frontend and Backend Together (Recommended)**

```bash
pnpm dev:full
```

This will start:
- Backend API server on `http://localhost:3001`
- Frontend dev server on `http://localhost:5173`

**Option B: Run Separately**

Terminal 1 (Backend):
```bash
pnpm server:watch
```

Terminal 2 (Frontend):
```bash
# The Vite server should already be running in Figma Make
# Or run: vite
```

## 📡 API Endpoints

### Stock Data

#### Get All Nifty 50 Stocks
```http
GET /api/stocks
```

Response:
```json
[
  {
    "symbol": "RELIANCE",
    "name": "Reliance Industries Ltd",
    "price": 2456.75,
    "change": 32.50,
    "changePercent": 1.34,
    "volume": "4200000",
    "marketCap": "16.6T",
    "sector": "Energy"
  }
]
```

#### Get Stock Quote
```http
GET /api/stocks/quote/:symbol
```

Example:
```http
GET /api/stocks/quote/TCS
```

#### Get Top Gainers
```http
GET /api/stocks/gainers
```

#### Get Top Losers
```http
GET /api/stocks/losers
```

#### Search Stocks
```http
GET /api/stocks/search?q=infosys
```

### IPO Data

#### Get All IPOs
```http
GET /api/ipo
```

#### Get IPO Details
```http
GET /api/ipo/:id
```

### Market Data

#### Get Market Indices
```http
GET /api/market/indices
```

Response:
```json
[
  {
    "name": "NIFTY 50",
    "value": 22456.75,
    "change": 234.50,
    "changePercent": 1.06
  }
]
```

### News

#### Get Market News
```http
GET /api/news
```

#### Get News by Category
```http
GET /api/news?category=Markets
```

#### Search News
```http
GET /api/news/search?q=banking
```

## 🔧 Data Sources

### NSE India (Primary Source)
- **Live Stock Prices:** NIFTY 50, NIFTY Bank, NIFTY IT stocks
- **Market Indices:** Real-time index values
- **Top Gainers/Losers:** Live market movers
- **Stock Details:** Open, high, low, volume, P/E ratio

**No API Key Required** - Uses public NSE endpoints with proper session management.

### IPO Data
- **Source:** Chittorgarh.com (web scraping)
- **Data:** Upcoming IPOs, issue size, subscription status
- **Fallback:** Mock data if scraping fails

### News Data
- **Source:** MoneyControl.com (web scraping)
- **Features:** AI sentiment analysis for market impact
- **Fallback:** Curated mock news

## 📱 Frontend Integration

The frontend automatically connects to the backend using environment variables.

### Custom Hooks

```typescript
// Fetch stocks
import { useStocks } from '../hooks/useStocks';

function MyComponent() {
  const { stocks, loading, error, refreshStocks } = useStocks();
  
  return (
    // Your component
  );
}
```

```typescript
// Fetch IPOs
import { useIPOs } from '../hooks/useIPOs';

function IPOPage() {
  const { ipos, loading, error, refreshIPOs } = useIPOs();
  
  return (
    // Your component
  );
}
```

```typescript
// Fetch News
import { useNews } from '../hooks/useNews';

function NewsPage() {
  const { news, loading, error, refreshNews } = useNews('Markets');
  
  return (
    // Your component
  );
}
```

## 🔍 Troubleshooting

### Backend Not Starting

**Issue:** Port 3001 already in use
```bash
# Find and kill the process
lsof -i :3001
kill -9 <PID>
```

**Issue:** TypeScript errors
```bash
# Reinstall dependencies
rm -rf node_modules
pnpm install
```

### NSE API Not Working

**Issue:** Rate limiting or session errors

The NSE service automatically:
- Initializes sessions
- Retries failed requests
- Falls back to cached data

If persistent:
```typescript
// server/services/nseService.ts
// Increase delay between requests or implement caching
```

### Frontend Can't Connect to Backend

**Issue:** CORS errors

Check `.env`:
```env
FRONTEND_URL=http://localhost:5173
```

Make sure both servers are running:
```bash
pnpm dev:full
```

## 🎯 Testing the API

### Using curl

```bash
# Test health check
curl http://localhost:3001/api/health

# Get stocks
curl http://localhost:3001/api/stocks

# Get specific stock
curl http://localhost:3001/api/stocks/quote/INFY

# Get market indices
curl http://localhost:3001/api/market/indices

# Get IPOs
curl http://localhost:3001/api/ipo

# Get news
curl http://localhost:3001/api/news
```

### Using Browser

Navigate to:
- http://localhost:3001/api/health
- http://localhost:3001/api/stocks
- http://localhost:3001/api/market/indices

## 📊 Performance

### Caching Strategy

The backend implements:
- **Session caching** for NSE API
- **Automatic retry** on failure
- **Fallback data** when APIs are unavailable

### Rate Limiting

To avoid rate limits:
- Requests are throttled
- Sessions are reused
- Auto-refresh intervals are set to 60 seconds

## 🔐 Security Notes

1. **API Keys:** Store in `.env`, never commit to git
2. **CORS:** Configured for localhost development
3. **Data Validation:** Input sanitization on all endpoints
4. **Error Handling:** Graceful degradation with fallbacks

## 📚 Additional Resources

- [NSE India](https://www.nseindia.com) - Official NSE website
- [BSE India](https://www.bseindia.com) - Bombay Stock Exchange
- [Chittorgarh IPO](https://www.chittorgarh.com/ipo) - IPO information
- [MoneyControl](https://www.moneycontrol.com) - Financial news

## 🚀 Production Deployment

### Build for Production

```bash
# Build frontend
pnpm build

# Build backend
pnpm server
```

### Deploy Backend

Recommended platforms:
- **Render.com** (Free tier available)
- **Railway.app**
- **Heroku**
- **AWS EC2**
- **DigitalOcean**

### Environment Variables for Production

```env
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
```

### Deploy Frontend

Recommended platforms:
- **Vercel** (Recommended for Vite)
- **Netlify**
- **Cloudflare Pages**
- **GitHub Pages**

Update `.env.production`:
```env
VITE_API_URL=https://your-backend-domain.com/api
```

## 📝 License

MIT License - See LICENSE file for details

## 🤝 Contributing

This is a demonstration project. For production use:
1. Add proper authentication
2. Implement rate limiting
3. Add comprehensive error logging
4. Set up monitoring (e.g., Sentry)
5. Add unit and integration tests

## 💡 Next Steps

1. **Add Authentication:** Implement JWT-based user auth
2. **Database:** Add PostgreSQL/MongoDB for user data
3. **WebSockets:** Real-time price updates
4. **Advanced Charts:** Candlestick charts with TradingView
5. **Portfolio Tracking:** Real portfolio management
6. **Alerts:** Email/SMS price alerts
7. **Payment Integration:** Razorpay for subscriptions

---

**Need Help?** Check the main README.md or create an issue in the repository.
