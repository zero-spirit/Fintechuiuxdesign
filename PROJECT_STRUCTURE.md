# 📁 Ani.AMC - Project Structure

```
ani-amc/
├── 📱 Frontend (React + TypeScript)
│   ├── src/
│   │   ├── app/
│   │   │   ├── App.tsx                    # Main app with routing
│   │   │   ├── components/
│   │   │   │   ├── Navbar.tsx             # Navigation bar
│   │   │   │   ├── MarketTicker.tsx       # Live market ticker
│   │   │   │   ├── StockCard.tsx          # Stock display card
│   │   │   │   ├── MiniChart.tsx          # Chart component
│   │   │   │   ├── LoadingSpinner.tsx     # Loading state
│   │   │   │   ├── ErrorMessage.tsx       # Error display
│   │   │   │   └── ui/                    # UI components
│   │   │   │       ├── Button.tsx
│   │   │   │       ├── Card.tsx
│   │   │   │       ├── Badge.tsx
│   │   │   │       └── Input.tsx
│   │   │   └── pages/
│   │   │       ├── Landing.tsx            # Homepage
│   │   │       ├── Login.tsx              # Login page
│   │   │       ├── Signup.tsx             # Signup page
│   │   │       ├── Dashboard.tsx          # Main dashboard
│   │   │       ├── Stocks.tsx             # Stock explorer
│   │   │       ├── IPO.tsx                # IPO tracker
│   │   │       ├── Watchlist.tsx          # Watchlist
│   │   │       ├── News.tsx               # News feed
│   │   │       ├── Baskets.tsx            # Investment baskets
│   │   │       └── Profile.tsx            # User profile
│   │   ├── hooks/                          # Custom React hooks
│   │   │   ├── useStocks.ts               # Stock data hook
│   │   │   ├── useIPOs.ts                 # IPO data hook
│   │   │   ├── useNews.ts                 # News data hook
│   │   │   └── useMarketIndices.ts        # Market indices hook
│   │   ├── services/
│   │   │   └── api.ts                     # API service layer
│   │   ├── lib/
│   │   │   ├── mockData.ts                # Fallback mock data
│   │   │   └── utils.ts                   # Utility functions
│   │   └── styles/
│   │       ├── theme.css                  # Design tokens
│   │       ├── fonts.css                  # Font imports
│   │       └── globals.css                # Global styles
│   │
├── 🔧 Backend (Express + TypeScript)
│   └── server/
│       ├── index.ts                       # Express server entry
│       ├── routes/                        # API routes
│       │   ├── stocks.ts                  # Stock endpoints
│       │   ├── ipo.ts                     # IPO endpoints
│       │   ├── news.ts                    # News endpoints
│       │   └── market.ts                  # Market endpoints
│       └── services/                      # Business logic
│           ├── nseService.ts              # NSE India API
│           ├── ipoService.ts              # IPO data scraping
│           └── newsService.ts             # News scraping
│
├── 📄 Configuration Files
│   ├── package.json                       # Dependencies & scripts
│   ├── tsconfig.json                      # TypeScript config
│   ├── vite.config.ts                     # Vite config
│   ├── tailwind.config.js                 # Tailwind config
│   ├── .env                               # Environment variables
│   ├── .env.local                         # Local env vars
│   └── .env.example                       # Example env vars
│
├── 📖 Documentation
│   ├── README.md                          # Main readme
│   ├── QUICK_START.md                     # Quick start guide
│   ├── BACKEND_SETUP.md                   # Backend setup
│   ├── API_GUIDE.md                       # API documentation
│   └── PROJECT_STRUCTURE.md               # This file
│
└── 🚀 Deployment
    └── start.sh                           # Quick start script
```

## 📂 Key Directories Explained

### Frontend (`src/app/`)

#### `pages/`
Each file is a complete page component:
- **Landing.tsx** - Marketing homepage with hero, features, pricing
- **Dashboard.tsx** - User dashboard with portfolio overview
- **Stocks.tsx** - Stock explorer with live NSE data
- **IPO.tsx** - IPO tracker with upcoming IPOs
- **News.tsx** - Market news with AI summaries

#### `components/`
Reusable UI components:
- **Navbar.tsx** - Top navigation with responsive menu
- **MarketTicker.tsx** - Animated scrolling ticker
- **StockCard.tsx** - Stock display with chart
- **ui/** - Base UI components (buttons, cards, etc.)

#### `hooks/`
Custom React hooks for data fetching:
- **useStocks.ts** - Manages stock data state
- **useIPOs.ts** - Manages IPO data state
- **useNews.ts** - Manages news data state
- **useMarketIndices.ts** - Manages market indices

### Backend (`server/`)

#### `routes/`
Express route handlers:
- **stocks.ts** - `/api/stocks/*` endpoints
- **ipo.ts** - `/api/ipo/*` endpoints
- **news.ts** - `/api/news/*` endpoints
- **market.ts** - `/api/market/*` endpoints

#### `services/`
Data fetching and processing:
- **nseService.ts** - NSE India API integration
- **ipoService.ts** - IPO data web scraping
- **newsService.ts** - News data web scraping

## 🔄 Data Flow

```
User Action
    ↓
React Component
    ↓
Custom Hook (useStocks, useIPOs, etc.)
    ↓
API Service Layer (src/services/api.ts)
    ↓
HTTP Request
    ↓
Express Route Handler (server/routes/)
    ↓
Service Layer (server/services/)
    ↓
External API / Web Scraping
    ↓
Data Processing
    ↓
JSON Response
    ↓
React Component Updates
```

## 📦 File Size Distribution

- **Frontend:** ~2.5 MB (dev), ~500 KB (prod build)
- **Backend:** ~150 KB TypeScript source
- **node_modules:** ~300 MB (dev dependencies)
- **Total:** ~350 MB (with dependencies)

## 🎯 Entry Points

### Frontend
- **Development:** `src/app/App.tsx`
- **Build:** Uses Vite to bundle from `App.tsx`
- **Port:** 5173

### Backend
- **Development:** `server/index.ts`
- **Production:** Compiled to `dist/server/`
- **Port:** 3001

## 🔐 Environment Variables

### Frontend (`.env.local`)
```env
VITE_API_URL=http://localhost:3001/api
```

### Backend (`.env`)
```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## 🧪 Testing Structure (Recommended)

```
tests/
├── frontend/
│   ├── components/
│   ├── pages/
│   └── hooks/
└── backend/
    ├── routes/
    └── services/
```

## 📊 Component Hierarchy

```
App
├── Router
│   ├── Navbar
│   ├── MarketTicker (on app pages)
│   └── Routes
│       ├── Landing
│       ├── Login
│       ├── Signup
│       ├── Dashboard
│       │   ├── Card (Portfolio)
│       │   ├── Card (Chart)
│       │   ├── StockCard
│       │   └── NewsCard
│       ├── Stocks
│       │   ├── Card (Search)
│       │   ├── Card (Gainers)
│       │   └── StockCard Grid
│       └── ... (other pages)
└── DarkModeToggle
```

## 🛠️ Build Output

### Frontend Build
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── vendor-[hash].js
└── favicon.ico
```

### Backend Build
```
dist/
└── server/
    ├── index.js
    ├── routes/
    └── services/
```

## 📝 Code Organization Best Practices

1. **One component per file**
2. **Co-locate related files** (component + styles + tests)
3. **Barrel exports** in `index.ts` files
4. **Clear naming conventions** (PascalCase for components)
5. **Hooks prefix** with `use` (useStocks, useIPOs)
6. **Service suffix** for backend services (nseService)

## 🔍 Important Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies and scripts |
| `src/app/App.tsx` | Main React component |
| `server/index.ts` | Backend server entry |
| `src/services/api.ts` | API client configuration |
| `src/styles/theme.css` | Design system tokens |
| `.env` | Backend environment vars |
| `.env.local` | Frontend environment vars |

## 📈 Scalability Considerations

Current structure supports:
- ✅ Adding new pages easily
- ✅ Creating new API endpoints
- ✅ Adding more data sources
- ✅ Implementing authentication
- ✅ Adding database layer
- ✅ Deploying separately (frontend/backend)

## 🚀 Future Structure (Suggested)

```
├── src/
│   ├── features/          # Feature-based organization
│   │   ├── stocks/
│   │   ├── ipo/
│   │   └── news/
│   ├── shared/            # Shared utilities
│   └── core/              # Core app logic
├── server/
│   ├── api/              # API layer
│   ├── database/         # DB models
│   ├── middleware/       # Express middleware
│   └── utils/            # Backend utilities
└── tests/                # Test suites
```

---

This structure balances simplicity with scalability, making it easy to understand and extend! 🎉
