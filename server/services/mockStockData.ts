// Mock Indian Stock Market Data
// This provides fallback data when NSE API is unavailable

export interface MockStock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
  sector: string;
}

// Generate realistic price fluctuations
const fluctuatePrice = (basePrice: number): number => {
  const variation = (Math.random() - 0.5) * 0.05; // ±2.5% variation
  return Math.round((basePrice * (1 + variation)) * 100) / 100;
};

const fluctuatePercent = (): number => {
  return Math.round((Math.random() - 0.5) * 6 * 100) / 100; // ±3% range
};

export const generateMockNifty50Stocks = (): MockStock[] => {
  const baseStocks = [
    { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', basePrice: 2456.75, volume: '12.5M', marketCap: '₹16.6L Cr', sector: 'Energy' },
    { symbol: 'TCS', name: 'Tata Consultancy Services Ltd', basePrice: 3687.20, volume: '8.2M', marketCap: '₹13.4L Cr', sector: 'IT' },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', basePrice: 1634.85, volume: '15.7M', marketCap: '₹12.4L Cr', sector: 'Banking' },
    { symbol: 'INFY', name: 'Infosys Ltd', basePrice: 1456.30, volume: '9.8M', marketCap: '₹6.1L Cr', sector: 'IT' },
    { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', basePrice: 1089.50, volume: '14.3M', marketCap: '₹7.6L Cr', sector: 'Banking' },
    { symbol: 'HINDUNILVR', name: 'Hindustan Unilever Ltd', basePrice: 2376.40, volume: '5.1M', marketCap: '₹5.6L Cr', sector: 'Consumer' },
    { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd', basePrice: 1456.90, volume: '11.2M', marketCap: '₹8.2L Cr', sector: 'Telecom' },
    { symbol: 'ITC', name: 'ITC Ltd', basePrice: 432.75, volume: '18.9M', marketCap: '₹5.4L Cr', sector: 'Consumer' },
    { symbol: 'SBIN', name: 'State Bank of India', basePrice: 789.30, volume: '22.4M', marketCap: '₹7.0L Cr', sector: 'Banking' },
    { symbol: 'WIPRO', name: 'Wipro Ltd', basePrice: 456.80, volume: '7.6M', marketCap: '₹2.5L Cr', sector: 'IT' },
    { symbol: 'LT', name: 'Larsen & Toubro Ltd', basePrice: 3567.25, volume: '4.8M', marketCap: '₹4.9L Cr', sector: 'Engineering' },
    { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical Industries Ltd', basePrice: 1687.40, volume: '6.3M', marketCap: '₹4.0L Cr', sector: 'Pharma' },
    { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank Ltd', basePrice: 1787.60, volume: '5.9M', marketCap: '₹3.5L Cr', sector: 'Banking' },
    { symbol: 'AXISBANK', name: 'Axis Bank Ltd', basePrice: 1134.70, volume: '13.2M', marketCap: '₹3.5L Cr', sector: 'Banking' },
    { symbol: 'HCLTECH', name: 'HCL Technologies Ltd', basePrice: 1567.85, volume: '6.7M', marketCap: '₹4.2L Cr', sector: 'IT' },
    { symbol: 'ASIANPAINT', name: 'Asian Paints Ltd', basePrice: 2876.50, volume: '3.4M', marketCap: '₹2.7L Cr', sector: 'Consumer' },
    { symbol: 'MARUTI', name: 'Maruti Suzuki India Ltd', basePrice: 12456.30, volume: '2.1M', marketCap: '₹3.8L Cr', sector: 'Auto' },
    { symbol: 'BAJFINANCE', name: 'Bajaj Finance Ltd', basePrice: 7234.90, volume: '4.3M', marketCap: '₹4.4L Cr', sector: 'Finance' },
    { symbol: 'TITAN', name: 'Titan Company Ltd', basePrice: 3456.20, volume: '3.8M', marketCap: '₹3.1L Cr', sector: 'Consumer' },
    { symbol: 'NESTLEIND', name: 'Nestle India Ltd', basePrice: 2567.80, volume: '1.2M', marketCap: '₹2.5L Cr', sector: 'Consumer' },
    { symbol: 'ULTRACEMCO', name: 'UltraTech Cement Ltd', basePrice: 9876.40, volume: '2.8M', marketCap: '₹2.8L Cr', sector: 'Cement' },
    { symbol: 'ADANIPORTS', name: 'Adani Ports and Special Economic Zone Ltd', basePrice: 1234.60, volume: '8.9M', marketCap: '₹2.7L Cr', sector: 'Infrastructure' },
    { symbol: 'TECHM', name: 'Tech Mahindra Ltd', basePrice: 1456.70, volume: '5.4M', marketCap: '₹1.4L Cr', sector: 'IT' },
    { symbol: 'POWERGRID', name: 'Power Grid Corporation of India Ltd', basePrice: 287.45, volume: '14.6M', marketCap: '₹2.6L Cr', sector: 'Power' },
    { symbol: 'NTPC', name: 'NTPC Ltd', basePrice: 356.80, volume: '16.7M', marketCap: '₹3.5L Cr', sector: 'Power' },
    { symbol: 'ONGC', name: 'Oil and Natural Gas Corporation Ltd', basePrice: 267.90, volume: '19.2M', marketCap: '₹3.4L Cr', sector: 'Energy' },
    { symbol: 'TATASTEEL', name: 'Tata Steel Ltd', basePrice: 134.50, volume: '21.4M', marketCap: '₹1.7L Cr', sector: 'Metals' },
    { symbol: 'JSWSTEEL', name: 'JSW Steel Ltd', basePrice: 876.30, volume: '9.8M', marketCap: '₹2.1L Cr', sector: 'Metals' },
    { symbol: 'HINDALCO', name: 'Hindalco Industries Ltd', basePrice: 634.70, volume: '11.3M', marketCap: '₹1.4L Cr', sector: 'Metals' },
    { symbol: 'COALINDIA', name: 'Coal India Ltd', basePrice: 423.60, volume: '15.9M', marketCap: '₹2.6L Cr', sector: 'Mining' },
    { symbol: 'BPCL', name: 'Bharat Petroleum Corporation Ltd', basePrice: 567.80, volume: '8.7M', marketCap: '₹1.2L Cr', sector: 'Energy' },
    { symbol: 'INDUSINDBK', name: 'IndusInd Bank Ltd', basePrice: 1456.40, volume: '6.2M', marketCap: '₹1.1L Cr', sector: 'Banking' },
    { symbol: 'DIVISLAB', name: 'Divi\'s Laboratories Ltd', basePrice: 3789.20, volume: '2.3M', marketCap: '₹1.0L Cr', sector: 'Pharma' },
    { symbol: 'DRREDDY', name: 'Dr. Reddy\'s Laboratories Ltd', basePrice: 6234.50, volume: '1.8M', marketCap: '₹1.0L Cr', sector: 'Pharma' },
    { symbol: 'CIPLA', name: 'Cipla Ltd', basePrice: 1456.80, volume: '4.5M', marketCap: '₹1.2L Cr', sector: 'Pharma' },
    { symbol: 'EICHERMOT', name: 'Eicher Motors Ltd', basePrice: 4876.30, volume: '1.9M', marketCap: '₹1.3L Cr', sector: 'Auto' },
    { symbol: 'HEROMOTOCO', name: 'Hero MotoCorp Ltd', basePrice: 4567.90, volume: '2.4M', marketCap: '₹0.9L Cr', sector: 'Auto' },
    { symbol: 'BAJAJ-AUTO', name: 'Bajaj Auto Ltd', basePrice: 9876.50, volume: '1.6M', marketCap: '₹2.9L Cr', sector: 'Auto' },
    { symbol: 'M&M', name: 'Mahindra & Mahindra Ltd', basePrice: 2134.60, volume: '5.8M', marketCap: '₹2.6L Cr', sector: 'Auto' },
    { symbol: 'TATAMOTORS', name: 'Tata Motors Ltd', basePrice: 876.40, volume: '18.3M', marketCap: '₹3.2L Cr', sector: 'Auto' },
    { symbol: 'GRASIM', name: 'Grasim Industries Ltd', basePrice: 2345.70, volume: '3.7M', marketCap: '₹1.6L Cr', sector: 'Cement' },
    { symbol: 'BRITANNIA', name: 'Britannia Industries Ltd', basePrice: 5234.80, volume: '1.4M', marketCap: '₹1.3L Cr', sector: 'Consumer' },
    { symbol: 'SHRIRAMFIN', name: 'Shriram Finance Ltd', basePrice: 2876.50, volume: '4.2M', marketCap: '₹1.1L Cr', sector: 'Finance' },
    { symbol: 'APOLLOHOSP', name: 'Apollo Hospitals Enterprise Ltd', basePrice: 6543.20, volume: '1.7M', marketCap: '₹0.9L Cr', sector: 'Healthcare' },
    { symbol: 'ADANIENT', name: 'Adani Enterprises Ltd', basePrice: 2987.60, volume: '7.8M', marketCap: '₹3.4L Cr', sector: 'Diversified' },
    { symbol: 'TATACONSUM', name: 'Tata Consumer Products Ltd', basePrice: 1087.40, volume: '4.9M', marketCap: '₹1.0L Cr', sector: 'Consumer' },
    { symbol: 'SBILIFE', name: 'SBI Life Insurance Company Ltd', basePrice: 1634.80, volume: '3.2M', marketCap: '₹1.6L Cr', sector: 'Finance' },
    { symbol: 'BAJAJFINSV', name: 'Bajaj Finserv Ltd', basePrice: 1789.30, volume: '3.8M', marketCap: '₹2.8L Cr', sector: 'Finance' },
    { symbol: 'LTIM', name: 'LTIMindtree Ltd', basePrice: 5876.40, volume: '2.1M', marketCap: '₹1.7L Cr', sector: 'IT' },
    { symbol: 'BEL', name: 'Bharat Electronics Ltd', basePrice: 287.60, volume: '12.8M', marketCap: '₹2.1L Cr', sector: 'Defense' }
  ];

  return baseStocks.map(stock => {
    const changePercent = fluctuatePercent();
    const price = fluctuatePrice(stock.basePrice);
    const change = Math.round((price * changePercent / 100) * 100) / 100;

    return {
      symbol: stock.symbol,
      name: stock.name,
      price,
      change,
      changePercent,
      volume: stock.volume,
      marketCap: stock.marketCap,
      sector: stock.sector
    };
  });
};

export const generateTopGainers = (): MockStock[] => {
  const allStocks = generateMockNifty50Stocks();
  return allStocks
    .filter(s => s.changePercent > 0)
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, 10)
    .map(stock => ({
      ...stock,
      volume: parseInt(stock.volume.replace(/[^\d]/g, ''))
    })) as any;
};

export const generateTopLosers = (): MockStock[] => {
  const allStocks = generateMockNifty50Stocks();
  return allStocks
    .filter(s => s.changePercent < 0)
    .sort((a, b) => a.changePercent - b.changePercent)
    .slice(0, 10)
    .map(stock => ({
      ...stock,
      volume: parseInt(stock.volume.replace(/[^\d]/g, ''))
    })) as any;
};
