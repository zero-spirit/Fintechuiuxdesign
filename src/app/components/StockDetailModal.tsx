import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, TrendingUp, TrendingDown, BarChart3, Clock } from "lucide-react";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import type { Stock } from "../../lib/mockData";
import { formatCurrency, formatPercent, getChangeColor } from "../../lib/utils";

interface StockDetailModalProps {
  stock: Stock;
  isOpen: boolean;
  onClose: () => void;
}

interface HistoricalDataPoint {
  time: string;
  price: number;
  volume: number;
}

// Generate mock historical data based on current price
const generateHistoricalData = (currentPrice: number, changePercent: number): HistoricalDataPoint[] => {
  const data: HistoricalDataPoint[] = [];
  const periods = 30; // 30 time periods
  const basePrice = currentPrice / (1 + changePercent / 100);

  for (let i = 0; i < periods; i++) {
    const volatility = 0.02; // 2% volatility
    const trend = (changePercent / 100) / periods; // Distribute the change across periods
    const random = (Math.random() - 0.5) * volatility;
    const priceChange = trend + random;

    const price = i === 0
      ? basePrice
      : data[i - 1].price * (1 + priceChange);

    // Generate time labels (every 2 hours for intraday view)
    const hour = 9 + Math.floor(i / 2);
    const minute = (i % 2) * 30;
    const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

    data.push({
      time,
      price: Math.round(price * 100) / 100,
      volume: Math.floor(Math.random() * 500000) + 100000
    });
  }

  // Ensure last price matches current price
  data[data.length - 1].price = currentPrice;

  return data;
};

export function StockDetailModal({ stock, isOpen, onClose }: StockDetailModalProps) {
  const [historicalData, setHistoricalData] = useState<HistoricalDataPoint[]>([]);
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '1Y'>('1D');
  const isPositive = stock.change >= 0;

  useEffect(() => {
    if (isOpen) {
      setHistoricalData(generateHistoricalData(stock.price, stock.changePercent));
    }
  }, [isOpen, stock.price, stock.changePercent]);

  const stats = [
    { label: 'Open', value: formatCurrency(stock.price - stock.change * 0.5) },
    { label: 'High', value: formatCurrency(stock.price + Math.abs(stock.change) * 0.3) },
    { label: 'Low', value: formatCurrency(stock.price - Math.abs(stock.change) * 0.4) },
    { label: 'Prev Close', value: formatCurrency(stock.price - stock.change) },
    { label: 'Volume', value: stock.volume },
    { label: 'Market Cap', value: stock.marketCap },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl md:max-h-[90vh] z-50 overflow-auto"
          >
            <div className="relative bg-gradient-to-br from-card/95 to-card/90 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl">
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-2xl" />
              <div className={`absolute inset-0 bg-gradient-to-br ${
                isPositive ? 'from-success/10' : 'from-destructive/10'
              } via-transparent to-transparent rounded-2xl opacity-50`} />

              {/* Content */}
              <div className="relative p-6 md:p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${
                      isPositive
                        ? 'from-emerald-500 to-teal-500'
                        : 'from-red-500 to-orange-500'
                    } flex items-center justify-center font-bold text-white text-xl shadow-lg`}>
                      {stock.symbol.substring(0, 2)}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-1">{stock.symbol}</h2>
                      <p className="text-muted-foreground">{stock.name}</p>
                      <Badge className="mt-2 border-primary/30 bg-primary/10">
                        {stock.sector}
                      </Badge>
                    </div>
                  </div>

                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-muted/50 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Price Info */}
                <div className="mb-6">
                  <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    {formatCurrency(stock.price)}
                  </div>
                  <div className={`flex items-center gap-2 ${getChangeColor(stock.change)}`}>
                    {isPositive ? (
                      <div className="p-1.5 rounded-lg bg-success/10">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="p-1.5 rounded-lg bg-destructive/10">
                        <TrendingDown className="w-4 h-4" />
                      </div>
                    )}
                    <span className="font-semibold">
                      {formatCurrency(Math.abs(stock.change))} ({formatPercent(stock.changePercent)})
                    </span>
                    <span className="text-sm text-muted-foreground">Today</span>
                  </div>
                </div>

                {/* Timeframe Selector */}
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <div className="flex gap-2">
                    {(['1D', '1W', '1M', '1Y'] as const).map((tf) => (
                      <button
                        key={tf}
                        onClick={() => setTimeframe(tf)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                          timeframe === tf
                            ? 'bg-primary text-primary-foreground shadow-lg'
                            : 'bg-muted/50 hover:bg-muted text-muted-foreground'
                        }`}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chart */}
                <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-muted/30 to-muted/10 backdrop-blur-sm border border-border/30">
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Price Chart - {timeframe}</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={historicalData}>
                      <defs>
                        <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop
                            offset="5%"
                            stopColor={isPositive ? "#00C896" : "#ef4444"}
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor={isPositive ? "#00C896" : "#ef4444"}
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis
                        dataKey="time"
                        stroke="rgba(255,255,255,0.3)"
                        tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                        tickLine={false}
                      />
                      <YAxis
                        stroke="rgba(255,255,255,0.3)"
                        tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                        tickLine={false}
                        domain={['auto', 'auto']}
                        tickFormatter={(value) => `₹${value.toFixed(0)}`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(0,0,0,0.9)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '8px',
                          backdropFilter: 'blur(10px)',
                        }}
                        labelStyle={{ color: 'rgba(255,255,255,0.7)' }}
                        itemStyle={{ color: isPositive ? '#00C896' : '#ef4444' }}
                        formatter={(value: number) => [`₹${value.toFixed(2)}`, 'Price']}
                      />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke={isPositive ? "#00C896" : "#ef4444"}
                        strokeWidth={2}
                        fill="url(#priceGradient)"
                        animationDuration={1000}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 rounded-xl bg-gradient-to-br from-muted/40 to-muted/20 backdrop-blur-sm border border-border/30"
                    >
                      <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                      <p className="font-semibold text-lg">{stat.value}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
