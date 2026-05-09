# Ani.AMC

A modern, premium fintech stock advisory platform built with React, TypeScript, and Tailwind CSS.

## Features

- 🎨 **Premium Fintech UI/UX** - Dark mode default, glassmorphism effects, smooth animations
- 📊 **Real-time Market Data** - Live stock prices, charts, and market indices
- 🔔 **IPO Tracking** - Monitor upcoming and ongoing IPOs with GMP and subscription data
- 📰 **Market News** - AI-summarized news with category filters
- 🛒 **Investment Baskets** - Curated stock portfolios with performance metrics
- 👁️ **Watchlist** - Track your favorite stocks
- 📱 **Fully Responsive** - Mobile-first design with tablet and desktop layouts
- 🎭 **Dark/Light Mode** - Toggle between themes

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Routing:** React Router DOM
- **Styling:** Tailwind CSS v4
- **Animations:** Motion/React (Framer Motion)
- **Charts:** Recharts
- **Icons:** Lucide React
- **UI Components:** Radix UI

## Project Structure

```
src/
├── app/
│   ├── App.tsx                 # Main app with routing
│   ├── components/
│   │   ├── Navbar.tsx          # Navigation bar
│   │   ├── MarketTicker.tsx    # Animated market ticker
│   │   ├── StockCard.tsx       # Stock display card
│   │   ├── MiniChart.tsx       # Mini chart component
│   │   └── ui/                 # Reusable UI components
│   └── pages/
│       ├── Landing.tsx         # Homepage
│       ├── Login.tsx           # Login page
│       ├── Signup.tsx          # Signup page
│       ├── Dashboard.tsx       # User dashboard
│       ├── Stocks.tsx          # Stock explorer
│       ├── IPO.tsx             # IPO tracker
│       ├── Watchlist.tsx       # Watchlist
│       ├── News.tsx            # News feed
│       ├── Baskets.tsx         # Investment baskets
│       └── Profile.tsx         # User profile
├── lib/
│   ├── mockData.ts             # Mock data for demonstration
│   └── utils.ts                # Utility functions
└── styles/
    ├── theme.css               # Design tokens and theme
    └── fonts.css               # Font imports
```

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm

### Installation

```bash
# Install dependencies
pnpm install
```

### Running the Application

**Full Stack (Frontend + Backend with Live Data)**

```bash
# Run both frontend and backend together
pnpm dev:full
```

This starts:
- Backend API server at `http://localhost:3001` with real Indian stock market data
- Frontend dev server at `http://localhost:5173`

**Backend Only**

```bash
# Run backend server with auto-reload
pnpm server:watch

# Or run once
pnpm server
```

**Frontend Only**

```bash
# Note: Vite dev server should already be running in Figma Make environment
```

### Backend Features

✅ **Live Indian Stock Market Data**
- Real-time stock prices from NSE India
- NIFTY 50, NIFTY Bank, NIFTY IT indices
- Top gainers and losers
- Stock search functionality

✅ **IPO Tracking**
- Upcoming and ongoing IPOs
- Subscription status
- GMP (Grey Market Premium) data
- Scraped from Chittorgarh.com

✅ **Market News**
- Latest financial news from MoneyControl
- AI-powered sentiment analysis
- Category filtering
- Auto-refresh functionality

### API Documentation

See [BACKEND_SETUP.md](./BACKEND_SETUP.md) for complete API documentation and setup guide.

### Build for Production

```bash
# Build frontend
pnpm build

# Run backend in production
NODE_ENV=production pnpm server
```

## Design System

### Colors

- **Primary:** #3B82F6 (Electric Blue)
- **Secondary:** #00C896 (Emerald Green)
- **Background (Dark):** #0B1120
- **Card (Dark):** #111827
- **Success:** #00C896
- **Destructive:** #ef4444
- **Warning:** #f59e0b

### Typography

- **Font Family:** Inter
- **Headings:** 500-700 weight
- **Body:** 400 weight

### Spacing

- **Base Unit:** 4px
- **Border Radius:** 12px
- **Card Padding:** 24px

## Pages

1. **Landing Page** - Hero, features, pricing, testimonials
2. **Login/Signup** - Authentication with Google OAuth
3. **Dashboard** - Portfolio overview with charts and analytics
4. **Stocks** - Stock explorer with search and filters
5. **IPO** - Upcoming IPOs with detailed metrics
6. **Watchlist** - Personal stock tracking
7. **News** - Market news with AI summaries
8. **Baskets** - Curated investment portfolios
9. **Profile** - User settings and preferences

## Features

### Dark Mode
- Default dark theme
- Light mode toggle (bottom-right button)
- Persistent theme preference

### Responsive Design
- Mobile-first approach
- Tablet breakpoints
- Desktop optimized layouts

### Animations
- Smooth page transitions
- Hover effects
- Loading states
- Micro-interactions

## Mock Data

The application uses comprehensive mock data for:
- Stock prices and charts
- IPO information
- Market news
- Investment baskets
- Portfolio data

Replace mock data with real API calls in production.

## Customization

### Update Theme Colors

Edit `src/styles/theme.css`:

```css
:root {
  --primary: #3B82F6;
  --secondary: #00C896;
  /* ... */
}
```

### Add New Pages

1. Create component in `src/app/pages/`
2. Add route in `src/app/App.tsx`
3. Update navigation in `src/app/components/Navbar.tsx`

## License

MIT

## Credits

Built with Figma Make - AI-powered web application builder.
