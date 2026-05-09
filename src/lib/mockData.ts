export interface Stock {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
  sector: string;
  chartData?: { time: string; value: number }[];
}

export interface IPO {
  id: string;
  company: string;
  logo?: string;
  priceRange: string;
  lotSize: number;
  openDate: string;
  closeDate: string;
  listingDate: string;
  gmp: number;
  subscriptionTimes: number;
  status: 'upcoming' | 'open' | 'closed' | 'listed';
  expectedListing: number;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  timestamp: string;
  category: string;
  imageUrl?: string;
  aiSummary?: string;
}

export interface Basket {
  id: string;
  name: string;
  description: string;
  cagr: number;
  risk: 'low' | 'medium' | 'high';
  stocks: string[];
  price: number;
  minInvestment: number;
  returns1Y: number;
  returns3Y: number;
  volatility: number;
  chartData?: { time: string; value: number }[];
}

const generateChartData = (baseValue: number, points: number = 24) => {
  const data = [];
  let value = baseValue;
  for (let i = 0; i < points; i++) {
    value = value * (1 + (Math.random() - 0.48) * 0.05);
    data.push({
      time: `${i}:00`,
      value: Math.round(value * 100) / 100
    });
  }
  return data;
};

export const mockStocks: Stock[] = [
  {
    id: '1',
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd',
    price: 2456.75,
    change: 32.50,
    changePercent: 1.34,
    volume: '4.2M',
    marketCap: '₹16.6T',
    sector: 'Energy',
    chartData: generateChartData(2424)
  },
  {
    id: '2',
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    price: 3567.20,
    change: -18.30,
    changePercent: -0.51,
    volume: '1.8M',
    marketCap: '₹13.0T',
    sector: 'IT',
    chartData: generateChartData(3585)
  },
  {
    id: '3',
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Ltd',
    price: 1654.90,
    change: 24.80,
    changePercent: 1.52,
    volume: '5.1M',
    marketCap: '₹12.2T',
    sector: 'Banking',
    chartData: generateChartData(1630)
  },
  {
    id: '4',
    symbol: 'INFY',
    name: 'Infosys Ltd',
    price: 1432.40,
    change: 12.60,
    changePercent: 0.89,
    volume: '3.3M',
    marketCap: '₹5.9T',
    sector: 'IT',
    chartData: generateChartData(1420)
  },
  {
    id: '5',
    symbol: 'ICICIBANK',
    name: 'ICICI Bank Ltd',
    price: 1087.55,
    change: -5.45,
    changePercent: -0.50,
    volume: '6.7M',
    marketCap: '₹7.6T',
    sector: 'Banking',
    chartData: generateChartData(1093)
  },
  {
    id: '6',
    symbol: 'BHARTIARTL',
    name: 'Bharti Airtel Ltd',
    price: 1289.30,
    change: 45.20,
    changePercent: 3.63,
    volume: '2.9M',
    marketCap: '₹7.3T',
    sector: 'Telecom',
    chartData: generateChartData(1244)
  },
  {
    id: '7',
    symbol: 'SBIN',
    name: 'State Bank of India',
    price: 623.75,
    change: 8.90,
    changePercent: 1.45,
    volume: '8.2M',
    marketCap: '₹5.6T',
    sector: 'Banking',
    chartData: generateChartData(615)
  },
  {
    id: '8',
    symbol: 'ASIANPAINT',
    name: 'Asian Paints Ltd',
    price: 2934.60,
    change: -22.10,
    changePercent: -0.75,
    volume: '1.2M',
    marketCap: '₹2.8T',
    sector: 'Consumer',
    chartData: generateChartData(2957)
  },
];

export const mockIPOs: IPO[] = [
  {
    id: '1',
    company: 'TechVision Systems',
    priceRange: '₹520 - ₹550',
    lotSize: 27,
    openDate: '2026-05-12',
    closeDate: '2026-05-14',
    listingDate: '2026-05-19',
    gmp: 85,
    subscriptionTimes: 0,
    status: 'upcoming',
    expectedListing: 15.5
  },
  {
    id: '2',
    company: 'GreenEnergy Solutions',
    priceRange: '₹340 - ₹360',
    lotSize: 41,
    openDate: '2026-05-10',
    closeDate: '2026-05-12',
    listingDate: '2026-05-17',
    gmp: 62,
    subscriptionTimes: 12.4,
    status: 'open',
    expectedListing: 17.2
  },
  {
    id: '3',
    company: 'FinNext Bank',
    priceRange: '₹890 - ₹920',
    lotSize: 16,
    openDate: '2026-05-06',
    closeDate: '2026-05-08',
    listingDate: '2026-05-13',
    gmp: 120,
    subscriptionTimes: 45.8,
    status: 'closed',
    expectedListing: 13.0
  },
  {
    id: '4',
    company: 'MediCare Plus',
    priceRange: '₹275 - ₹290',
    lotSize: 51,
    openDate: '2026-04-28',
    closeDate: '2026-04-30',
    listingDate: '2026-05-05',
    gmp: 45,
    subscriptionTimes: 78.3,
    status: 'listed',
    expectedListing: 15.9
  },
  {
    id: '5',
    company: 'DataHub Technologies',
    priceRange: '₹1200 - ₹1250',
    lotSize: 12,
    openDate: '2026-05-15',
    closeDate: '2026-05-17',
    listingDate: '2026-05-22',
    gmp: 180,
    subscriptionTimes: 0,
    status: 'upcoming',
    expectedListing: 14.4
  }
];

export const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Reliance Industries announces major renewable energy expansion',
    summary: 'Reliance to invest ₹75,000 crore in green hydrogen and solar manufacturing facilities across India.',
    source: 'Economic Times',
    timestamp: '2 hours ago',
    category: 'Markets',
    aiSummary: 'Bullish for long-term investors. Major capex in future energy sectors.'
  },
  {
    id: '2',
    title: 'Sensex surges 800 points on strong global cues',
    summary: 'Indian markets rally as foreign institutional investors return with fresh inflows.',
    source: 'Business Standard',
    timestamp: '4 hours ago',
    category: 'Markets'
  },
  {
    id: '3',
    title: 'TCS wins multi-billion dollar cloud transformation deal',
    summary: 'Leading IT services company secures largest deal in company history with European financial institution.',
    source: 'Moneycontrol',
    timestamp: '6 hours ago',
    category: 'Corporate',
    aiSummary: 'Strong earnings growth expected in Q3. Positive sentiment for IT sector.'
  },
  {
    id: '4',
    title: 'RBI maintains repo rate at 6.5% in policy review',
    summary: 'Central bank keeps key interest rates unchanged, focuses on inflation management.',
    source: 'Mint',
    timestamp: '1 day ago',
    category: 'Economy'
  },
  {
    id: '5',
    title: 'Tech stocks lead market rally amid AI boom',
    summary: 'Investors flock to technology stocks as artificial intelligence adoption accelerates.',
    source: 'Financial Express',
    timestamp: '1 day ago',
    category: 'Markets'
  }
];

export const mockBaskets: Basket[] = [
  {
    id: '1',
    name: 'AI & Tech Revolution',
    description: 'Invest in companies leading the artificial intelligence and technology transformation',
    cagr: 24.5,
    risk: 'high',
    stocks: ['TCS', 'INFY', 'HCLTECH', 'WIPRO', 'TECHM'],
    price: 4999,
    minInvestment: 25000,
    returns1Y: 28.4,
    returns3Y: 72.6,
    volatility: 18.5,
    chartData: generateChartData(100, 30)
  },
  {
    id: '2',
    name: 'Banking & Finance Leaders',
    description: 'Portfolio of top-performing banking and financial services stocks',
    cagr: 18.2,
    risk: 'medium',
    stocks: ['HDFCBANK', 'ICICIBANK', 'SBIN', 'AXISBANK', 'KOTAKBANK'],
    price: 3499,
    minInvestment: 20000,
    returns1Y: 19.8,
    returns3Y: 56.3,
    volatility: 12.3,
    chartData: generateChartData(100, 30)
  },
  {
    id: '3',
    name: 'Green Energy Future',
    description: 'Renewable energy and sustainable companies positioned for growth',
    cagr: 32.1,
    risk: 'high',
    stocks: ['ADANIGREEN', 'TATAPOWER', 'NTPC', 'POWERGRID'],
    price: 5999,
    minInvestment: 30000,
    returns1Y: 35.6,
    returns3Y: 98.4,
    volatility: 22.7,
    chartData: generateChartData(100, 30)
  },
  {
    id: '4',
    name: 'Dividend Aristocrats',
    description: 'Blue-chip companies with consistent dividend payments and stable growth',
    cagr: 12.4,
    risk: 'low',
    stocks: ['ITC', 'COALINDIA', 'ONGC', 'VEDL', 'HINDALCO'],
    price: 2499,
    minInvestment: 15000,
    returns1Y: 13.2,
    returns3Y: 38.7,
    volatility: 8.2,
    chartData: generateChartData(100, 30)
  },
  {
    id: '5',
    name: 'FMCG Champions',
    description: 'Consumer goods leaders with strong brand presence and market share',
    cagr: 15.8,
    risk: 'low',
    stocks: ['HINDUNILVR', 'ITC', 'NESTLEIND', 'BRITANNIA', 'DABUR'],
    price: 2999,
    minInvestment: 18000,
    returns1Y: 16.4,
    returns3Y: 48.9,
    volatility: 9.8,
    chartData: generateChartData(100, 30)
  }
];

export const marketIndices = [
  { name: 'NIFTY 50', value: 22456.75, change: 234.50, changePercent: 1.06 },
  { name: 'SENSEX', value: 74289.30, change: 567.80, changePercent: 0.77 },
  { name: 'NIFTY BANK', value: 48234.60, change: -123.40, changePercent: -0.26 },
  { name: 'NIFTY IT', value: 34567.20, change: 345.60, changePercent: 1.01 }
];
