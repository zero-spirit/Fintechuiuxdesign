import axios from 'axios';
import * as cheerio from 'cheerio';

const NSE_BASE_URL = 'https://www.nseindia.com';

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  'Accept': 'application/json, text/plain, */*',
  'Accept-Language': 'en-US,en;q=0.9',
  'Referer': 'https://www.nseindia.com/'
};

let cookies = '';

async function initializeSession() {
  try {
    const response = await axios.get(NSE_BASE_URL, { headers, timeout: 5000 });
    const setCookies = response.headers['set-cookie'];
    if (setCookies) {
      cookies = setCookies.map((cookie: string) => cookie.split(';')[0]).join('; ');
    }
  } catch (error) {
    // NSE session initialization failed - will use fallback data
  }
}

async function makeNSERequest(url: string) {
  if (!cookies) {
    await initializeSession();
  }

  try {
    const response = await axios.get(url, {
      headers: { ...headers, Cookie: cookies },
      timeout: 5000
    });
    return response.data;
  } catch (error) {
    // NSE API blocked or unavailable - fail silently to use fallback data
    throw new Error('NSE API unavailable');
  }
}

export async function getNifty50Stocks() {
  try {
    const url = `${NSE_BASE_URL}/api/equity-stockIndices?index=NIFTY%2050`;
    const data = await makeNSERequest(url);

    return data.data.map((stock: any) => ({
      symbol: stock.symbol,
      name: stock.symbol,
      price: stock.lastPrice,
      change: stock.change,
      changePercent: stock.pChange,
      volume: stock.totalTradedVolume.toString(),
      marketCap: 'N/A',
      sector: stock.industry || 'General'
    }));
  } catch (error) {
    // NSE API unavailable - return empty to trigger fallback
    return [];
  }
}

export async function getStockQuote(symbol: string) {
  try {
    const url = `${NSE_BASE_URL}/api/quote-equity?symbol=${symbol}`;
    const data = await makeNSERequest(url);

    const priceInfo = data.priceInfo;
    return {
      symbol: symbol,
      name: data.info.companyName,
      price: priceInfo.lastPrice,
      change: priceInfo.change,
      changePercent: priceInfo.pChange,
      open: priceInfo.open,
      high: priceInfo.intraDayHighLow.max,
      low: priceInfo.intraDayHighLow.min,
      previousClose: priceInfo.previousClose,
      volume: priceInfo.totalTradedVolume,
      marketCap: data.metadata?.industry || 'N/A',
      sector: data.metadata?.sector || 'General',
      pe: data.metadata?.pdSymbolPe || null,
      eps: data.metadata?.eps || null
    };
  } catch (error) {
    return null;
  }
}

export async function getMarketIndices() {
  try {
    const url = `${NSE_BASE_URL}/api/allIndices`;
    const data = await makeNSERequest(url);

    const indices = ['NIFTY 50', 'NIFTY BANK', 'NIFTY IT', 'NIFTY MIDCAP 100'];
    return data.data
      .filter((index: any) => indices.includes(index.index))
      .map((index: any) => ({
        name: index.index,
        value: index.last,
        change: index.change,
        changePercent: index.percentChange
      }));
  } catch (error) {
    return [];
  }
}

export async function getTopGainers() {
  try {
    const url = `${NSE_BASE_URL}/api/live-analysis-variations?index=gainers`;
    const data = await makeNSERequest(url);

    return data.NIFTY.data.slice(0, 10).map((stock: any) => ({
      symbol: stock.symbol,
      name: stock.symbol,
      price: stock.lastPrice,
      change: stock.change,
      changePercent: stock.pChange,
      volume: stock.totalTradedVolume
    }));
  } catch (error) {
    return [];
  }
}

export async function getTopLosers() {
  try {
    const url = `${NSE_BASE_URL}/api/live-analysis-variations?index=losers`;
    const data = await makeNSERequest(url);

    return data.NIFTY.data.slice(0, 10).map((stock: any) => ({
      symbol: stock.symbol,
      name: stock.symbol,
      price: stock.lastPrice,
      change: stock.change,
      changePercent: stock.pChange,
      volume: stock.totalTradedVolume
    }));
  } catch (error) {
    return [];
  }
}

export async function searchStocks(query: string) {
  try {
    const url = `${NSE_BASE_URL}/api/search/autocomplete?q=${query}`;
    const data = await makeNSERequest(url);

    return data.symbols || [];
  } catch (error) {
    return [];
  }
}

initializeSession();
