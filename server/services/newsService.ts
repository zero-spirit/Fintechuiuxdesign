import axios from 'axios';
import * as cheerio from 'cheerio';

const NEWS_SOURCES = {
  moneycontrol: 'https://www.moneycontrol.com/news/business/markets/',
  economicTimes: 'https://economictimes.indiatimes.com/markets',
  livemint: 'https://www.livemint.com/market'
};

export async function getMarketNews() {
  try {
    const news = await scrapeMoneyControlNews();
    return news.length > 0 ? news : getFallbackNews();
  } catch (error) {
    console.error('Error fetching market news:', error);
    return getFallbackNews();
  }
}

async function scrapeMoneyControlNews() {
  try {
    const response = await axios.get(NEWS_SOURCES.moneycontrol, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    const newsItems: any[] = [];

    $('li.clearfix').slice(0, 15).each((index, element) => {
      const $item = $(element);
      const title = $item.find('h2 a').text().trim();
      const summary = $item.find('p').text().trim();
      const link = $item.find('h2 a').attr('href');
      const timestamp = $item.find('span').text().trim();

      if (title) {
        newsItems.push({
          id: `news-${index}`,
          title,
          summary: summary || title,
          source: 'MoneyControl',
          timestamp: timestamp || 'Recently',
          category: 'Markets',
          url: link,
          aiSummary: generateAISummary(title)
        });
      }
    });

    return newsItems;
  } catch (error) {
    console.error('Error scraping MoneyControl:', error);
    return [];
  }
}

function generateAISummary(title: string): string | undefined {
  const bullishKeywords = ['surge', 'rally', 'gain', 'rise', 'soar', 'jump', 'boost', 'growth'];
  const bearishKeywords = ['fall', 'drop', 'decline', 'crash', 'slump', 'loss', 'down'];

  const titleLower = title.toLowerCase();

  if (bullishKeywords.some(keyword => titleLower.includes(keyword))) {
    return 'Positive sentiment. Potential buying opportunity for long-term investors.';
  }

  if (bearishKeywords.some(keyword => titleLower.includes(keyword))) {
    return 'Negative sentiment. Exercise caution and monitor closely.';
  }

  return undefined;
}

function getFallbackNews() {
  return [
    {
      id: 'news-1',
      title: 'Nifty 50 hits all-time high as FII inflows continue',
      summary: 'Indian benchmark indices continue their upward trajectory with strong foreign institutional investor participation.',
      source: 'Economic Times',
      timestamp: '2 hours ago',
      category: 'Markets',
      aiSummary: 'Positive sentiment. Market momentum remains strong.'
    },
    {
      id: 'news-2',
      title: 'IT sector leads market gains on strong Q4 results',
      summary: 'Technology stocks rally as major IT companies report better-than-expected quarterly earnings.',
      source: 'Moneycontrol',
      timestamp: '4 hours ago',
      category: 'Corporate',
      aiSummary: 'Bullish outlook for IT sector. Good entry point for tech stocks.'
    },
    {
      id: 'news-3',
      title: 'RBI maintains repo rate at 6.5% in latest policy review',
      summary: 'Reserve Bank of India keeps benchmark interest rates unchanged, focusing on inflation management.',
      source: 'Mint',
      timestamp: '6 hours ago',
      category: 'Economy'
    },
    {
      id: 'news-4',
      title: 'Banking stocks rally on improved asset quality',
      summary: 'Bank Nifty gains 2% as major lenders report decline in non-performing assets.',
      source: 'Business Standard',
      timestamp: '1 day ago',
      category: 'Markets',
      aiSummary: 'Positive for banking sector. Consider accumulation.'
    },
    {
      id: 'news-5',
      title: 'EV sector attracts record investments in Q1 2026',
      summary: 'Electric vehicle companies see surge in funding as India pushes for clean energy transition.',
      source: 'Financial Express',
      timestamp: '1 day ago',
      category: 'Corporate',
      aiSummary: 'Long-term growth sector. High potential but volatile.'
    }
  ];
}

export async function getNewsByCategory(category: string) {
  const allNews = await getMarketNews();

  if (category === 'all') {
    return allNews;
  }

  return allNews.filter(news =>
    news.category.toLowerCase() === category.toLowerCase()
  );
}

export async function searchNews(query: string) {
  const allNews = await getMarketNews();

  return allNews.filter(news =>
    news.title.toLowerCase().includes(query.toLowerCase()) ||
    news.summary.toLowerCase().includes(query.toLowerCase())
  );
}
