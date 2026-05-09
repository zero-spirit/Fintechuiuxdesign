# 🚀 Ani.AMC - Quick Start Guide

Welcome to **Ani.AMC** - a premium fintech platform with **LIVE Indian stock market data**!

## ✨ What's Included

### 🎨 Frontend Features
- ✅ Modern fintech UI with dark/light mode
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ 10+ complete pages (Landing, Dashboard, Stocks, IPOs, News, etc.)
- ✅ Smooth animations and transitions
- ✅ Professional charts and data visualization

### 🔥 Backend Features (NEW!)
- ✅ **Live NSE India stock data** - Real-time NIFTY 50 prices
- ✅ **Market indices** - NIFTY 50, NIFTY Bank, NIFTY IT
- ✅ **IPO tracking** - Upcoming and ongoing IPOs with GMP
- ✅ **Market news** - Auto-scraped from MoneyControl
- ✅ **AI analysis** - Sentiment analysis on news
- ✅ **Top movers** - Real-time gainers and losers

## 🏃 Running the App (3 Easy Steps)

### Step 1: Install Dependencies
```bash
pnpm install
```

### Step 2: Start Everything
```bash
pnpm dev:full
```

This starts:
- 🔴 **Backend API:** `http://localhost:3001` (Live market data)
- 🔵 **Frontend App:** `http://localhost:5173` (Your browser)

### Step 3: Open Your Browser
Navigate to: **http://localhost:5173**

That's it! 🎉

## 📱 What You'll See

1. **Landing Page** → Beautiful hero section with features
2. **Dashboard** → Portfolio overview with live charts
3. **Stocks** → Real NSE stock prices updating live
4. **IPOs** → Current and upcoming Indian IPOs
5. **News** → Latest market news with AI summaries
6. **And more!** → Watchlist, Baskets, Profile pages

## 🎯 Quick Commands

```bash
# Install everything
pnpm install

# Run full stack (recommended)
pnpm dev:full

# Run backend only
pnpm server:watch

# Run backend once
pnpm server

# Build for production
pnpm build
```

## 🌐 API Endpoints Available

Once the backend is running, you can access:

- **Health Check:** http://localhost:3001/api/health
- **All Stocks:** http://localhost:3001/api/stocks
- **Market Indices:** http://localhost:3001/api/market/indices
- **IPOs:** http://localhost:3001/api/ipo
- **News:** http://localhost:3001/api/news

Try opening these in your browser!

## 🔧 Troubleshooting

### "Port 3001 already in use"
```bash
# Kill the process
lsof -i :3001
kill -9 <PID>
```

### "Module not found"
```bash
# Reinstall dependencies
rm -rf node_modules
pnpm install
```

### Backend not connecting
Make sure both servers are running:
```bash
pnpm dev:full
```

## 📚 Documentation

- **[README.md](./README.md)** - Project overview
- **[BACKEND_SETUP.md](./BACKEND_SETUP.md)** - Detailed backend guide
- **[API_GUIDE.md](./API_GUIDE.md)** - Complete API documentation

## 🎨 Features Breakdown

### Pages (10)
1. Landing - Marketing homepage
2. Login/Signup - Authentication pages
3. Dashboard - Portfolio overview
4. Stocks - Stock explorer with live data
5. IPO - IPO tracker
6. Watchlist - Personal stock tracking
7. News - Market news feed
8. Baskets - Investment portfolios
9. Profile - User settings

### Components (15+)
- Navbar, MarketTicker, StockCard
- Charts (Mini, Line, Area)
- Loading states, Error handling
- Buttons, Cards, Badges, Inputs

### Backend APIs (4 Services)
1. **Stock Service** - NSE India integration
2. **IPO Service** - Web scraping
3. **News Service** - MoneyControl scraping
4. **Market Service** - Index data

## 🚀 Next Steps

### For Development:
1. Explore the code in `src/app/pages`
2. Check out `server/` for backend code
3. Test API endpoints in your browser
4. Customize the UI components

### For Production:
1. Add authentication (JWT/OAuth)
2. Set up a database (PostgreSQL)
3. Deploy backend (Render, Railway)
4. Deploy frontend (Vercel, Netlify)
5. Add monitoring (Sentry)

## 💡 Pro Tips

1. **Dark Mode Toggle** - Bottom right corner of the app
2. **Refresh Data** - Use refresh buttons on each page
3. **Live Updates** - Market ticker scrolls automatically
4. **Error Handling** - Graceful fallbacks if APIs fail

## 🌟 Live Data Sources

- **Stock Prices:** NSE India (official)
- **Market Indices:** NSE India
- **IPO Data:** Chittorgarh.com
- **News:** MoneyControl.com
- **All data updates in real-time!**

## ⚡ Performance

- Frontend: React 18 with Vite (lightning fast)
- Backend: Express + TypeScript (robust)
- Charts: Recharts (smooth animations)
- Styling: Tailwind v4 (optimized CSS)

## 🎓 Learning Resources

Want to understand the code?

- **Frontend:** Check `src/app/pages/` for page components
- **Backend:** Check `server/services/` for data fetching
- **API Hooks:** Check `src/hooks/` for data integration
- **Styling:** Check `src/styles/theme.css` for design tokens

## 🤝 Need Help?

1. Read the full [BACKEND_SETUP.md](./BACKEND_SETUP.md)
2. Check [API_GUIDE.md](./API_GUIDE.md) for endpoint docs
3. Look at the code - it's well commented!

## 🎉 You're All Set!

Run `pnpm dev:full` and visit **http://localhost:5173**

Enjoy your premium fintech platform with **LIVE Indian market data**! 📊

---

**Built with:** React, TypeScript, Tailwind, Express, NSE India APIs

**Features:** Real-time stock prices, IPO tracking, market news, AI analysis
