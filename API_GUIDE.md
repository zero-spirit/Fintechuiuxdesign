# Ani.AMC API Guide

## Quick Reference

### Base URL
```
http://localhost:3001/api
```

## 📊 Stock Endpoints

### Get All Stocks (NIFTY 50)
Fetches all stocks from the NIFTY 50 index with live prices.

```http
GET /api/stocks
```

**Response:**
```json
[
  {
    "symbol": "RELIANCE",
    "name": "Reliance Industries Ltd",
    "price": 2456.75,
    "change": 32.50,
    "changePercent": 1.34,
    "volume": "4200000",
    "marketCap": "N/A",
    "sector": "Energy"
  }
]
```

### Get Stock Quote
Detailed information for a specific stock.

```http
GET /api/stocks/quote/:symbol
```

**Example:**
```bash
curl http://localhost:3001/api/stocks/quote/TCS
```

**Response:**
```json
{
  "symbol": "TCS",
  "name": "Tata Consultancy Services",
  "price": 3567.20,
  "change": -18.30,
  "changePercent": -0.51,
  "open": 3585.00,
  "high": 3590.50,
  "low": 3560.00,
  "previousClose": 3585.50,
  "volume": 1800000,
  "pe": 28.5,
  "eps": 125.4
}
```

### Top Gainers
Get today's top gaining stocks.

```http
GET /api/stocks/gainers
```

**Response:**
```json
[
  {
    "symbol": "BHARTIARTL",
    "name": "Bharti Airtel Ltd",
    "price": 1289.30,
    "change": 45.20,
    "changePercent": 3.63,
    "volume": "2900000"
  }
]
```

### Top Losers
Get today's top losing stocks.

```http
GET /api/stocks/losers
```

### Search Stocks
Search for stocks by name or symbol.

```http
GET /api/stocks/search?q=<query>
```

**Example:**
```bash
curl "http://localhost:3001/api/stocks/search?q=infosys"
```

## 📈 Market Endpoints

### Get Market Indices
Fetch current values for major Indian market indices.

```http
GET /api/market/indices
```

**Response:**
```json
[
  {
    "name": "NIFTY 50",
    "value": 22456.75,
    "change": 234.50,
    "changePercent": 1.06
  },
  {
    "name": "NIFTY BANK",
    "value": 48234.60,
    "change": -123.40,
    "changePercent": -0.26
  }
]
```

## 💰 IPO Endpoints

### Get All IPOs
List of all upcoming, open, closed, and listed IPOs.

```http
GET /api/ipo
```

**Response:**
```json
[
  {
    "id": "ipo-1",
    "company": "TechVision Systems Ltd",
    "priceRange": "₹520 - ₹550",
    "lotSize": 27,
    "openDate": "2026-05-15",
    "closeDate": "2026-05-17",
    "listingDate": "2026-05-22",
    "issueSize": "₹1,200 Cr",
    "gmp": 85,
    "subscriptionTimes": 12.4,
    "status": "open",
    "expectedListing": 15.5
  }
]
```

**Status Values:**
- `upcoming` - IPO not yet open
- `open` - Currently accepting bids
- `closed` - Bidding closed, awaiting listing
- `listed` - Already listed on exchange

### Get IPO Details
Detailed information for a specific IPO.

```http
GET /api/ipo/:id
```

**Example:**
```bash
curl http://localhost:3001/api/ipo/ipo-1
```

## 📰 News Endpoints

### Get Market News
Fetch latest market news with optional category filter.

```http
GET /api/news
GET /api/news?category=<category>
```

**Categories:**
- `Markets`
- `Corporate`
- `Economy`
- `Global`

**Response:**
```json
[
  {
    "id": "news-1",
    "title": "Nifty 50 hits all-time high as FII inflows continue",
    "summary": "Indian benchmark indices continue their upward trajectory...",
    "source": "Economic Times",
    "timestamp": "2 hours ago",
    "category": "Markets",
    "url": "https://...",
    "aiSummary": "Positive sentiment. Market momentum remains strong."
  }
]
```

### Search News
Search news articles by keyword.

```http
GET /api/news/search?q=<query>
```

**Example:**
```bash
curl "http://localhost:3001/api/news/search?q=banking"
```

## 🔧 Utility Endpoints

### Health Check
Verify API server is running.

```http
GET /api/health
```

**Response:**
```json
{
  "status": "OK",
  "message": "Ani.AMC API is running"
}
```

## 🚀 Usage Examples

### JavaScript/TypeScript (Axios)

```typescript
import axios from 'axios';

const API_BASE = 'http://localhost:3001/api';

// Get all stocks
const stocks = await axios.get(`${API_BASE}/stocks`);
console.log(stocks.data);

// Get specific stock
const tcs = await axios.get(`${API_BASE}/stocks/quote/TCS`);
console.log(tcs.data);

// Get market indices
const indices = await axios.get(`${API_BASE}/market/indices`);
console.log(indices.data);

// Get IPOs
const ipos = await axios.get(`${API_BASE}/ipo`);
console.log(ipos.data);

// Get news
const news = await axios.get(`${API_BASE}/news`);
console.log(news.data);
```

### Python (Requests)

```python
import requests

API_BASE = 'http://localhost:3001/api'

# Get all stocks
response = requests.get(f'{API_BASE}/stocks')
stocks = response.json()
print(stocks)

# Get specific stock
response = requests.get(f'{API_BASE}/stocks/quote/TCS')
stock = response.json()
print(f"TCS Price: ₹{stock['price']}")

# Get market indices
response = requests.get(f'{API_BASE}/market/indices')
indices = response.json()
for index in indices:
    print(f"{index['name']}: {index['value']} ({index['changePercent']}%)")
```

### cURL

```bash
# Get stocks
curl http://localhost:3001/api/stocks | jq

# Get stock quote
curl http://localhost:3001/api/stocks/quote/INFY | jq

# Get top gainers
curl http://localhost:3001/api/stocks/gainers | jq

# Get market indices
curl http://localhost:3001/api/market/indices | jq

# Get IPOs
curl http://localhost:3001/api/ipo | jq

# Get news
curl http://localhost:3001/api/news | jq

# Search stocks
curl "http://localhost:3001/api/stocks/search?q=bank" | jq

# Search news
curl "http://localhost:3001/api/news/search?q=RBI" | jq
```

## 🔐 Rate Limiting

The API implements automatic rate limiting and session management:

- **NSE API:** Automatic session renewal
- **Retry Logic:** Failed requests are retried with exponential backoff
- **Caching:** Data cached where appropriate to reduce API calls

## ⚠️ Error Handling

All endpoints return appropriate HTTP status codes:

- `200` - Success
- `400` - Bad Request (invalid parameters)
- `404` - Not Found (resource doesn't exist)
- `500` - Server Error (API failure, data unavailable)

**Error Response Format:**
```json
{
  "error": "Failed to fetch stocks",
  "message": "Detailed error message"
}
```

## 📡 Real-time Updates

For live price updates, implement polling:

```javascript
// Poll every 60 seconds
setInterval(async () => {
  const response = await fetch('http://localhost:3001/api/stocks');
  const stocks = await response.json();
  updateUI(stocks);
}, 60000);
```

## 🌐 CORS Configuration

The API is configured to accept requests from:
- `http://localhost:5173` (Vite dev server)
- Configure additional origins in `.env`:

```env
FRONTEND_URL=http://localhost:5173,https://your-domain.com
```

## 📊 Data Sources

1. **NSE India** - Primary source for stock prices and indices
2. **Chittorgarh.com** - IPO data via web scraping
3. **MoneyControl** - Financial news via web scraping

All data is fetched in real-time with fallbacks to ensure reliability.

## 🎯 Best Practices

1. **Cache responses** on the client side
2. **Implement retry logic** for failed requests
3. **Use debouncing** for search endpoints
4. **Handle errors gracefully** with user-friendly messages
5. **Show loading states** while fetching data

## 🔄 Frontend Integration

The frontend already uses custom hooks that handle:
- Loading states
- Error handling
- Auto-refresh
- Data caching

Example:
```typescript
import { useStocks } from '../hooks/useStocks';

function StocksPage() {
  const { stocks, loading, error, refreshStocks } = useStocks();
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={refreshStocks} />;
  
  return <StockList stocks={stocks} />;
}
```

---

For detailed backend setup and troubleshooting, see [BACKEND_SETUP.md](./BACKEND_SETUP.md)
