import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, TrendingUp, TrendingDown, BarChart3, Clock, ExternalLink, Activity } from "lucide-react";
import { Badge } from "./ui/Badge";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import type { Stock } from "../../services/api";
import { formatCurrency, formatPercent, getChangeColor } from "../../lib/utils";

interface StockDetailModalProps {
  stock: Stock;
  isOpen: boolean;
  onClose: () => void;
}

interface HistoricalDataPoint {
  time: string;
  price: number;
}

const generateHistoricalData = (currentPrice: number, changePercent: number): HistoricalDataPoint[] => {
  const data: HistoricalDataPoint[] = [];
  const periods = 30;
  const basePrice = currentPrice / (1 + changePercent / 100);
  for (let i = 0; i < periods; i++) {
    const trend = (changePercent / 100) / periods;
    const random = (Math.random() - 0.5) * 0.02;
    const price = i === 0 ? basePrice : data[i - 1].price * (1 + trend + random);
    const hour = 9 + Math.floor(i / 2);
    const minute = (i % 2) * 30;
    data.push({ time: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`, price: Math.round(price * 100) / 100 });
  }
  data[data.length - 1].price = currentPrice;
  return data;
};

function TradingViewWidget({ symbol }: { symbol: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    // Clear previous widget
    containerRef.current.innerHTML = '';
    widgetRef.current = null;

    const script = document.createElement('script');
    script.src = 'https://s.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.textContent = JSON.stringify({
      autosize: true,
      symbol: `NSE:${symbol}`,
      interval: 'D',
      timezone: 'Asia/Kolkata',
      theme: 'dark',
      style: '1',
      locale: 'in',
      backgroundColor: 'rgba(0, 0, 0, 0)',
      gridColor: 'rgba(255, 255, 255, 0.06)',
      withdateranges: true,
      hide_side_toolbar: false,
      allow_symbol_change: true,
      details: true,
      hotlist: false,
      calendar: false,
      show_popup_button: false,
      support_host: 'https://www.tradingview.com',
    });

    containerRef.current.appendChild(script);
    widgetRef.current = script;

    return () => {
      if (containerRef.current) containerRef.current.innerHTML = '';
    };
  }, [symbol]);

  return (
    <div className="tradingview-widget-container" ref={containerRef} style={{ height: '100%', width: '100%' }}>
      <div className="tradingview-widget-container__widget" style={{ height: 'calc(100% - 32px)', width: '100%' }} />
    </div>
  );
}

export function StockDetailModal({ stock, isOpen, onClose }: StockDetailModalProps) {
  const [historicalData, setHistoricalData] = useState<HistoricalDataPoint[]>([]);
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '1Y'>('1D');
  const [activeTab, setActiveTab] = useState<'chart' | 'tradingview'>('chart');

  const price = stock.price || 0;
  const change = stock.change || 0;
  const changePercent = stock.changePercent || 0;
  const isPositive = change >= 0;

  useEffect(() => {
    if (isOpen) {
      setHistoricalData(generateHistoricalData(price, changePercent));
    }
  }, [isOpen, price, changePercent]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const stats = [
    { label: 'Open', value: formatCurrency(price - change * 0.5) },
    { label: 'High', value: formatCurrency(price + Math.abs(change) * 0.3) },
    { label: 'Low', value: formatCurrency(price - Math.abs(change) * 0.4) },
    { label: 'Prev Close', value: formatCurrency(price - change) },
    { label: 'Volume', value: stock.volume || 'N/A' },
    { label: 'Market Cap', value: stock.marketCap || 'N/A' },
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
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ type: 'spring', duration: 0.45 }}
            className="fixed inset-3 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-5xl md:max-h-[92vh] z-50 overflow-auto rounded-2xl"
          >
            <div className="relative bg-gradient-to-br from-card/97 to-card/93 backdrop-blur-2xl border border-border/50 rounded-2xl shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-2xl pointer-events-none" />
              <div className={`absolute inset-0 bg-gradient-to-br ${isPositive ? 'from-success/8' : 'from-destructive/8'} via-transparent to-transparent rounded-2xl pointer-events-none opacity-60`} />

              <div className="relative p-5 md:p-7">
                {/* ── Header ── */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${isPositive ? 'from-emerald-500 to-teal-500' : 'from-red-500 to-orange-500'} flex items-center justify-center font-bold text-white text-lg shadow-lg`}>
                      {(stock.symbol || '??').substring(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-bold">{stock.symbol}</h2>
                        <Badge className="border-primary/30 bg-primary/10 text-xs">{stock.sector || 'NSE'}</Badge>
                      </div>
                      <p className="text-muted-foreground text-sm mt-0.5">{stock.name}</p>
                      <div className={`flex items-center gap-1.5 mt-1 ${getChangeColor(change)}`}>
                        <span className="text-2xl font-bold text-foreground">{formatCurrency(price)}</span>
                        {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        <span className="font-semibold text-sm">{formatCurrency(Math.abs(change))} ({formatPercent(changePercent)})</span>
                      </div>
                    </div>
                  </div>
                  <button onClick={onClose} className="p-2 hover:bg-muted/60 rounded-lg transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* ── Chart Tab Switcher ── */}
                <div className="flex items-center gap-2 mb-4">
                  <button
                    onClick={() => setActiveTab('chart')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === 'chart' ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'bg-muted/40 text-muted-foreground hover:bg-muted/70'}`}
                  >
                    <BarChart3 className="w-4 h-4" />
                    Price Chart
                  </button>
                  <button
                    onClick={() => setActiveTab('tradingview')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === 'tradingview' ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'bg-muted/40 text-muted-foreground hover:bg-muted/70'}`}
                  >
                    <Activity className="w-4 h-4" />
                    TradingView
                    <span className="text-[10px] bg-success/20 text-success px-1.5 py-0.5 rounded-full font-semibold">LIVE</span>
                  </button>

                  {/* Timeframe selector — only show for recharts tab */}
                  {activeTab === 'chart' && (
                    <div className="flex items-center gap-1.5 ml-auto">
                      <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                      {(['1D', '1W', '1M', '1Y'] as const).map(tf => (
                        <button
                          key={tf}
                          onClick={() => setTimeframe(tf)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${timeframe === tf ? 'bg-primary text-primary-foreground' : 'bg-muted/40 text-muted-foreground hover:bg-muted/70'}`}
                        >
                          {tf}
                        </button>
                      ))}
                    </div>
                  )}

                  {activeTab === 'tradingview' && (
                    <a
                      href={`https://www.tradingview.com/chart/?symbol=NSE:${stock.symbol}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 ml-auto text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Open in TradingView
                    </a>
                  )}
                </div>

                {/* ── Charts ── */}
                <div className="mb-5 rounded-xl overflow-hidden border border-border/30 bg-gradient-to-br from-muted/20 to-muted/5">
                  {activeTab === 'chart' ? (
                    <div className="p-4">
                      {historicalData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={320}>
                          <AreaChart data={historicalData}>
                            <defs>
                              <linearGradient id={`priceGradient-${stock.symbol}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={isPositive ? '#00C896' : '#ef4444'} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={isPositive ? '#00C896' : '#ef4444'} stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="time" stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} tickLine={false} />
                            <YAxis stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} tickLine={false} domain={['auto', 'auto']} tickFormatter={v => `₹${v.toFixed(0)}`} />
                            <Tooltip
                              contentStyle={{ backgroundColor: 'rgba(10,10,20,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', backdropFilter: 'blur(12px)' }}
                              labelStyle={{ color: 'rgba(255,255,255,0.6)' }}
                              itemStyle={{ color: isPositive ? '#00C896' : '#ef4444' }}
                              formatter={(v: number) => [`₹${v.toFixed(2)}`, 'Price']}
                            />
                            <Area type="monotone" dataKey="price" stroke={isPositive ? '#00C896' : '#ef4444'} strokeWidth={2.5} fill={`url(#priceGradient-${stock.symbol})`} animationDuration={800} />
                          </AreaChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="h-[320px] flex items-center justify-center text-muted-foreground">Loading…</div>
                      )}
                    </div>
                  ) : (
                    <div style={{ height: 420 }} className="relative">
                      <TradingViewWidget symbol={stock.symbol} />
                    </div>
                  )}
                </div>

                {/* ── Stats Grid ── */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="p-3 rounded-xl bg-gradient-to-br from-muted/40 to-muted/20 border border-border/30"
                    >
                      <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                      <p className="font-semibold">{stat.value}</p>
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
