import { useState, useEffect } from "react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Input } from "../components/ui/Input";
import { StockCard } from "../components/StockCard";
import { useStocks } from "../../hooks/useStocks";
import { Plus, Trash2, Search, Star, TrendingUp, DollarSign, Package, Filter } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { formatCurrency, formatPercent } from "../../lib/utils";

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

export function Watchlist() {
  const { stocks } = useStocks();
  const [watchlistIds, setWatchlistIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('watchlist');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState<string>('all');

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(Array.from(watchlistIds)));
  }, [watchlistIds]);

  const watchlistStocks = stocks.filter(stock =>
    watchlistIds.has(stock.symbol)
  );

  const availableStocks = stocks.filter(stock =>
    !watchlistIds.has(stock.symbol) &&
    (stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const sectors = ['all', ...Array.from(new Set(watchlistStocks.map(s => s.sector)))];

  const filteredWatchlist = selectedSector === 'all'
    ? watchlistStocks
    : watchlistStocks.filter(s => s.sector === selectedSector);

  const addToWatchlist = (symbol: string) => {
    setWatchlistIds(prev => new Set([...prev, symbol]));
  };

  const removeFromWatchlist = (symbol: string) => {
    setWatchlistIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(symbol);
      return newSet;
    });
  };

  const avgChange = watchlistStocks.length > 0
    ? watchlistStocks.reduce((sum, stock) => sum + stock.changePercent, 0) / watchlistStocks.length
    : 0;

  const totalValue = watchlistStocks.reduce((sum, stock) => sum + stock.price, 0);

  const positiveStocks = watchlistStocks.filter(s => s.changePercent > 0).length;

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
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  My Watchlist
                </h1>
                <p className="text-muted-foreground">Track your favorite stocks in one place</p>
              </div>
            </div>
            <Button
              variant="primary"
              onClick={() => setShowAddModal(true)}
              className="shadow-lg shadow-primary/20"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Stock
            </Button>
          </div>
        </motion.div>

        {/* Watchlist Stats */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
        >
          <motion.div variants={item}>
            <Card glass hoverable className="group overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="p-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="outline" className="text-xs">Total</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Total Stocks</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  {watchlistStocks.length}
                </p>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card glass hoverable className="group overflow-hidden relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${
                avgChange >= 0 ? 'from-success/10' : 'from-destructive/10'
              } to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="p-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                    avgChange >= 0 ? 'from-emerald-500 to-teal-500' : 'from-red-500 to-orange-500'
                  } flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant={avgChange >= 0 ? 'success' : 'destructive'} className="text-xs">
                    {formatPercent(avgChange)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Avg. Change</p>
                <p className={`text-3xl font-bold ${avgChange >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {avgChange >= 0 ? '+' : ''}{avgChange.toFixed(2)}%
                </p>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card glass hoverable className="group overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="p-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="outline" className="text-xs">Combined</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Total Value</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  {formatCurrency(totalValue)}
                </p>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card glass hoverable className="group overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-success/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="p-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="success" className="text-xs">
                    {watchlistStocks.length > 0 ? Math.round((positiveStocks / watchlistStocks.length) * 100) : 0}%
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Gainers</p>
                <p className="text-3xl font-bold text-success">
                  {positiveStocks}/{watchlistStocks.length}
                </p>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Sector Filter */}
        {watchlistStocks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <Card glass>
              <div className="flex items-center gap-2 flex-wrap">
                <Filter className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground mr-2">Sector:</span>
                {sectors.map((sector) => (
                  <Button
                    key={sector}
                    variant={selectedSector === sector ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setSelectedSector(sector)}
                    className={selectedSector === sector ? 'shadow-lg shadow-primary/20' : ''}
                  >
                    {sector === 'all' ? 'All Sectors' : sector}
                  </Button>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Watchlist Grid */}
        {watchlistStocks.length > 0 ? (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredWatchlist.map((stock) => (
              <motion.div key={stock.symbol} variants={item}>
                <div className="relative">
                  <button
                    onClick={() => removeFromWatchlist(stock.symbol)}
                    className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-destructive/10 hover:bg-destructive/20 transition-colors border border-destructive/20"
                    title="Remove from watchlist"
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </button>
                  <StockCard stock={{ ...stock, id: stock.symbol }} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <Card glass className="text-center py-20">
            <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
              <Star className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Your watchlist is empty</h3>
            <p className="text-muted-foreground mb-6">Start adding stocks to track them here</p>
            <Button
              variant="primary"
              onClick={() => setShowAddModal(true)}
              className="shadow-lg shadow-primary/20"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Stock
            </Button>
          </Card>
        )}

        {/* Add Stock Modal */}
        <AnimatePresence>
          {showAddModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowAddModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="max-w-2xl w-full max-h-[80vh] overflow-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <Card glass>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Add Stocks to Watchlist</h2>

                    <div className="relative mb-6">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Search stocks by name or symbol..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>

                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {availableStocks.length > 0 ? (
                        availableStocks.map((stock) => (
                          <div
                            key={stock.symbol}
                            className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                                {stock.symbol.substring(0, 2)}
                              </div>
                              <div>
                                <p className="font-semibold">{stock.symbol}</p>
                                <p className="text-sm text-muted-foreground">{stock.name}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <p className="font-semibold">{formatCurrency(stock.price)}</p>
                                <p className={`text-sm ${stock.changePercent >= 0 ? 'text-success' : 'text-destructive'}`}>
                                  {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                                </p>
                              </div>
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() => {
                                  addToWatchlist(stock.symbol);
                                }}
                              >
                                <Plus className="w-4 h-4 mr-1" />
                                Add
                              </Button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          {searchQuery
                            ? 'No stocks found matching your search'
                            : 'All available stocks are already in your watchlist'}
                        </div>
                      )}
                    </div>

                    <div className="mt-6 flex justify-end">
                      <Button
                        variant="outline"
                        onClick={() => setShowAddModal(false)}
                      >
                        Done
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
