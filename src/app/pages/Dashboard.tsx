import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { StockCard } from "../components/StockCard";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  PieChart,
  AlertCircle,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { mockStocks, mockIPOs, mockNews, mockBaskets } from "../../lib/mockData";
import { formatCurrency, formatPercent, getChangeColor } from "../../lib/utils";
import { LineChart, Line, AreaChart, Area, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const portfolioData = [
  { id: 'jan', time: 'Jan', value: 100000 },
  { id: 'feb', time: 'Feb', value: 115000 },
  { id: 'mar', time: 'Mar', value: 108000 },
  { id: 'apr', time: 'Apr', value: 125000 },
  { id: 'may', time: 'May', value: 145000 },
  { id: 'jun', time: 'Jun', value: 142000 },
  { id: 'jul', time: 'Jul', value: 165000 },
  { id: 'aug', time: 'Aug', value: 158000 },
  { id: 'sep', time: 'Sep', value: 178000 },
  { id: 'oct', time: 'Oct', value: 195000 },
  { id: 'nov', time: 'Nov', value: 185000 },
  { id: 'dec', time: 'Dec', value: 210000 }
];

const sectorAllocation = [
  { sector: 'IT', percentage: 35, color: '#3B82F6' },
  { sector: 'Banking', percentage: 25, color: '#00C896' },
  { sector: 'Energy', percentage: 20, color: '#f59e0b' },
  { sector: 'Healthcare', percentage: 15, color: '#8b5cf6' },
  { sector: 'Others', percentage: 5, color: '#6b7280' }
];

export function Dashboard() {
  const topStocks = mockStocks.slice(0, 3);
  const upcomingIPO = mockIPOs.find(ipo => ipo.status === 'upcoming');
  const latestNews = mockNews.slice(0, 3);
  const featuredBasket = mockBaskets[0];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Investor</h1>
          <p className="text-muted-foreground">Here's what's happening with your portfolio today</p>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Total Portfolio Value</p>
                  <PieChart className="w-4 h-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold mb-1">{formatCurrency(210000)}</p>
                <div className="flex items-center gap-1 text-success">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">{formatPercent(12.5)} this month</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Today's Gain/Loss</p>
                  <Activity className="w-4 h-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold mb-1 text-success">+{formatCurrency(3450)}</p>
                <div className="flex items-center gap-1 text-success">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">{formatPercent(1.64)} today</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Total Invested</p>
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold mb-1">{formatCurrency(180000)}</p>
                <p className="text-sm text-muted-foreground">Across 12 stocks</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Total Returns</p>
                  <TrendingUp className="w-4 h-4 text-success" />
                </div>
                <p className="text-2xl font-bold mb-1 text-success">+{formatCurrency(30000)}</p>
                <div className="flex items-center gap-1 text-success">
                  <span className="text-sm font-medium">{formatPercent(16.67)} ROI</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Portfolio Chart */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Portfolio Performance</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">1M</Button>
                    <Button variant="ghost" size="sm">3M</Button>
                    <Button variant="ghost" size="sm">6M</Button>
                    <Button variant="primary" size="sm">1Y</Button>
                    <Button variant="ghost" size="sm">All</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={portfolioData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00C896" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#00C896" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
                    <XAxis dataKey="time" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#111827',
                        border: '1px solid #1F2937',
                        borderRadius: '0.5rem'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#00C896"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorValue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Sector Allocation */}
          <Card>
            <CardHeader>
              <CardTitle>Sector Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sectorAllocation.map((sector, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{sector.sector}</span>
                      <span className="text-sm text-muted-foreground">{sector.percentage}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${sector.percentage}%` }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="h-full"
                        style={{ backgroundColor: sector.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium mb-1">AI Recommendation</p>
                    <p className="text-xs text-muted-foreground">
                      Consider diversifying into Healthcare sector for better risk distribution
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Watchlist */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Your Watchlist</h2>
            <Link to="/watchlist">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topStocks.map((stock, index) => (
              <motion.div
                key={stock.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <StockCard stock={stock} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Upcoming IPO */}
          {upcomingIPO && (
            <Card hoverable>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Upcoming IPO</CardTitle>
                  <Badge variant="success">New</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-semibold mb-2">{upcomingIPO.company}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price Range</span>
                    <span className="font-medium">{upcomingIPO.priceRange}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Opens On</span>
                    <span className="font-medium">{upcomingIPO.openDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expected Listing</span>
                    <span className="font-medium text-success">+{upcomingIPO.expectedListing}%</span>
                  </div>
                </div>
                <Link to="/ipo">
                  <Button variant="primary" size="sm" className="w-full mt-4">
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* Featured Basket */}
          <Card hoverable>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Featured Basket</CardTitle>
                <Badge variant="warning">Hot</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">{featuredBasket.name}</h3>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {featuredBasket.description}
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">CAGR</span>
                  <span className="font-medium text-success">{featuredBasket.cagr}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Min Investment</span>
                  <span className="font-medium">{formatCurrency(featuredBasket.minInvestment)}</span>
                </div>
              </div>
              <Link to="/baskets">
                <Button variant="primary" size="sm" className="w-full mt-4">
                  Explore Baskets
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Market Alert */}
          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-primary" />
                Market Alert
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">
                Market volatility detected in Banking sector. Consider reviewing your exposure.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">NIFTY BANK</span>
                  <span className="text-destructive font-medium">-1.2%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Your Exposure</span>
                  <span className="font-medium">25%</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">
                Review Portfolio
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Latest News */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Latest Market News</h2>
            <Link to="/news">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestNews.map((news, index) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hoverable className="h-full">
                  <CardContent className="pt-6">
                    <Badge variant="outline" className="mb-3">{news.category}</Badge>
                    <h3 className="font-semibold mb-2 line-clamp-2">{news.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {news.summary}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{news.source}</span>
                      <span className="text-muted-foreground">{news.timestamp}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
