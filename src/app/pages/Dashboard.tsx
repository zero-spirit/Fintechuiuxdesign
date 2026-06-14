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
  ArrowRight,
  Target,
  Zap,
  Crown
} from "lucide-react";
import { mockStocks, mockIPOs, mockNews, mockBaskets } from "../../lib/mockData";
import { formatCurrency, formatPercent, getChangeColor } from "../../lib/utils";
import { LineChart, Line, AreaChart, Area, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, PieChart as RechartsPie, Cell, Pie } from "recharts";
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
  { sector: 'IT', percentage: 35, value: 35, color: '#3B82F6' },
  { sector: 'Banking', percentage: 25, value: 25, color: '#00C896' },
  { sector: 'Energy', percentage: 20, value: 20, color: '#f59e0b' },
  { sector: 'Healthcare', percentage: 15, value: 15, color: '#8b5cf6' },
  { sector: 'Others', percentage: 5, value: 5, color: '#6b7280' }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function Dashboard() {
  const topStocks = mockStocks.slice(0, 3);
  const upcomingIPO = mockIPOs.find(ipo => ipo.status === 'upcoming');
  const latestNews = mockNews.slice(0, 3);
  const featuredBasket = mockBaskets[0];

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-secondary/20 to-transparent rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Welcome back, Investor
              </h1>
              <p className="text-muted-foreground">Here's what's happening with your portfolio today</p>
            </div>
          </div>
        </motion.div>

        {/* Portfolio Overview */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
        >
          <motion.div variants={item}>
            <Card glass hoverable className="group overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="pt-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <PieChart className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="success" className="text-xs">+12.5%</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Total Portfolio Value</p>
                <p className="text-3xl font-bold mb-1 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  {formatCurrency(210000)}
                </p>
                <div className="flex items-center gap-1 text-success">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">this month</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card glass hoverable className="group overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-success/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="pt-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="success" className="text-xs">+1.64%</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Today's Gain/Loss</p>
                <p className="text-3xl font-bold mb-1 text-success">
                  +{formatCurrency(3450)}
                </p>
                <div className="flex items-center gap-1 text-success">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm font-medium">today</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card glass hoverable className="group overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="pt-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="outline" className="text-xs">12 stocks</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Total Invested</p>
                <p className="text-3xl font-bold mb-1 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  {formatCurrency(180000)}
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Target className="w-3 h-3" />
                  Across 12 stocks
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card glass hoverable className="group overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-success/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="pt-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="success" className="text-xs">16.67% ROI</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Total Returns</p>
                <p className="text-3xl font-bold mb-1 text-success">
                  +{formatCurrency(30000)}
                </p>
                <div className="flex items-center gap-1 text-success">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">lifetime</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {/* Portfolio Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card glass className="overflow-hidden">
              <CardHeader className="border-b border-border/50">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Portfolio Performance</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">Last 12 months</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="text-xs">1M</Button>
                    <Button variant="ghost" size="sm" className="text-xs">3M</Button>
                    <Button variant="ghost" size="sm" className="text-xs">6M</Button>
                    <Button variant="primary" size="sm" className="text-xs shadow-lg shadow-primary/20">1Y</Button>
                    <Button variant="ghost" size="sm" className="text-xs">All</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ResponsiveContainer width="100%" height={320}>
                  <AreaChart data={portfolioData}>
                    <defs>
                      <linearGradient id="dashColorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00C896" stopOpacity={0.4} />
                        <stop offset="50%" stopColor="#00C896" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#00C896" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="dashStrokeGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#00C896" />
                        <stop offset="100%" stopColor="#3B82F6" />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" opacity={0.3} />
                    <XAxis
                      dataKey="time"
                      stroke="#9CA3AF"
                      style={{ fontSize: '12px' }}
                      tick={{ fill: '#9CA3AF' }}
                    />
                    <YAxis
                      stroke="#9CA3AF"
                      style={{ fontSize: '12px' }}
                      tick={{ fill: '#9CA3AF' }}
                      tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(17, 24, 39, 0.95)',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        borderRadius: '0.75rem',
                        backdropFilter: 'blur(8px)',
                        padding: '12px'
                      }}
                      labelStyle={{ color: '#F9FAFB', marginBottom: '4px' }}
                      itemStyle={{ color: '#00C896' }}
                      formatter={(value: any) => [`₹${value.toLocaleString()}`, 'Value']}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="url(#dashStrokeGradient)"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#dashColorValue)"
                      animationDuration={1500}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sector Allocation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card glass className="h-full">
              <CardHeader className="border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <PieChart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Sector Allocation</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">Portfolio distribution</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center mb-6">
                  <ResponsiveContainer width="100%" height={180}>
                    <RechartsPie>
                      <Pie
                        data={sectorAllocation}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {sectorAllocation.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(17, 24, 39, 0.95)',
                          border: '1px solid rgba(59, 130, 246, 0.3)',
                          borderRadius: '0.5rem',
                          backdropFilter: 'blur(8px)'
                        }}
                      />
                    </RechartsPie>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-3">
                  {sectorAllocation.map((sector, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: sector.color }}
                        />
                        <span className="text-sm font-medium">{sector.sector}</span>
                      </div>
                      <span className="text-sm font-semibold" style={{ color: sector.color }}>
                        {sector.percentage}%
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-xl backdrop-blur-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-1 text-foreground">AI Recommendation</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Consider diversifying into Healthcare sector for better risk distribution
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Watchlist */}
        <div className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-between mb-8"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Your Watchlist</h2>
                <p className="text-sm text-muted-foreground">Top performing stocks</p>
              </div>
            </div>
            <Link to="/watchlist">
              <Button variant="outline" size="sm" className="gap-2 hover:gap-3 transition-all">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {topStocks.map((stock, index) => (
              <motion.div key={stock.id} variants={item}>
                <StockCard stock={stock} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Quick Actions Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
        >
          {/* Upcoming IPO */}
          {upcomingIPO && (
            <motion.div variants={item}>
              <Card glass hoverable className="h-full group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader className="border-b border-border/50 relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <CardTitle className="text-lg">Upcoming IPO</CardTitle>
                    </div>
                    <Badge variant="success" className="shadow-lg shadow-success/20">New</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 relative">
                  <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    {upcomingIPO.company}
                  </h3>
                  <div className="space-y-3 text-sm mb-6">
                    <div className="flex justify-between items-center p-2 rounded-lg bg-muted/30">
                      <span className="text-muted-foreground">Price Range</span>
                      <span className="font-semibold">{upcomingIPO.priceRange}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-muted/30">
                      <span className="text-muted-foreground">Opens On</span>
                      <span className="font-semibold">{upcomingIPO.openDate}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-success/10">
                      <span className="text-muted-foreground">Expected Listing</span>
                      <span className="font-semibold text-success">+{upcomingIPO.expectedListing}%</span>
                    </div>
                  </div>
                  <Link to="/ipo">
                    <Button variant="primary" size="sm" className="w-full shadow-lg shadow-primary/20">
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Featured Basket */}
          <motion.div variants={item}>
            <Card glass hoverable className="h-full group overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-warning/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardHeader className="border-b border-border/50 relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                      <Target className="w-4 h-4 text-white" />
                    </div>
                    <CardTitle className="text-lg">Featured Basket</CardTitle>
                  </div>
                  <Badge variant="warning" className="shadow-lg shadow-warning/20">Hot</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6 relative">
                <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  {featuredBasket.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                  {featuredBasket.description}
                </p>
                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between items-center p-2 rounded-lg bg-success/10">
                    <span className="text-muted-foreground">CAGR</span>
                    <span className="font-semibold text-success">{featuredBasket.cagr}%</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg bg-muted/30">
                    <span className="text-muted-foreground">Min Investment</span>
                    <span className="font-semibold">{formatCurrency(featuredBasket.minInvestment)}</span>
                  </div>
                </div>
                <Link to="/baskets">
                  <Button variant="primary" size="sm" className="w-full shadow-lg shadow-primary/20">
                    Explore Baskets
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Market Alert */}
          <motion.div variants={item}>
            <Card glass className="h-full overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent" />
              <CardHeader className="border-b border-primary/20 relative">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 text-white" />
                  </div>
                  <CardTitle className="text-lg">Market Alert</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6 relative">
                <p className="text-sm mb-6 leading-relaxed">
                  Market volatility detected in Banking sector. Consider reviewing your exposure.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-destructive/10">
                    <span className="text-sm text-muted-foreground">NIFTY BANK</span>
                    <span className="text-sm text-destructive font-semibold flex items-center gap-1">
                      <TrendingDown className="w-3 h-3" />
                      -1.2%
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                    <span className="text-sm text-muted-foreground">Your Exposure</span>
                    <span className="text-sm font-semibold">25%</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full border-primary/30 hover:bg-primary/10">
                  Review Portfolio
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Latest News */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-between mb-8"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Latest Market News</h2>
                <p className="text-sm text-muted-foreground">Stay updated with market trends</p>
              </div>
            </div>
            <Link to="/news">
              <Button variant="outline" size="sm" className="gap-2 hover:gap-3 transition-all">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {latestNews.map((news, index) => (
              <motion.div key={news.id} variants={item}>
                <Card glass hoverable className="h-full group overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="pt-6 relative">
                    <Badge
                      variant="outline"
                      className="mb-4 border-primary/30 bg-primary/5 backdrop-blur-sm"
                    >
                      {news.category}
                    </Badge>
                    <h3 className="font-bold mb-3 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                      {news.summary}
                    </p>
                    <div className="flex items-center justify-between text-xs pt-4 border-t border-border/50">
                      <span className="text-muted-foreground font-medium">{news.source}</span>
                      <span className="text-muted-foreground">{news.timestamp}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
