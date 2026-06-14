import { usePageTitle } from "../../hooks/usePageTitle";
import { useState, useMemo } from "react";
import { useUserDataContext } from "../../context/UserDataContext";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { mockBaskets } from "../../lib/mockData";
import { getRiskColor, formatCurrency } from "../../lib/utils";
import { TrendingUp, ShoppingCart, Info, X, Package, Zap, Shield, Crown, Filter, BarChart3 } from "lucide-react";
import { MiniChart } from "../components/MiniChart";
import { motion, AnimatePresence } from "motion/react";

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

type BasketCategory = 'all' | 'growth' | 'value' | 'dividend' | 'sector';
type RiskFilter = 'all' | 'low' | 'medium' | 'high';

export function Baskets() {
  const [selectedCategory, setSelectedCategory] = useState<BasketCategory>('all');
  const [selectedRisk, setSelectedRisk] = useState<RiskFilter>('all');
  const [selectedBasket, setSelectedBasket] = useState<typeof mockBaskets[0] | null>(null);
  const { subscribedBaskets: subscribedList, toggleBasketSubscription } = useUserDataContext();
  const subscribedBaskets = useMemo(() => new Set(subscribedList), [subscribedList]);

  const toggleSubscription = (basketId: string) => {
    toggleBasketSubscription(basketId);
  };

  const filteredBaskets = mockBaskets.filter(basket => {
    const categoryMatch = selectedCategory === 'all' ||
      basket.name.toLowerCase().includes(selectedCategory);
    const riskMatch = selectedRisk === 'all' ||
      basket.risk.toLowerCase() === selectedRisk;
    return categoryMatch && riskMatch;
  });

  usePageTitle("Baskets");
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
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Stock Baskets
              </h1>
              <p className="text-muted-foreground">Invest in curated portfolios designed by experts</p>
            </div>
          </div>

          {/* Category Tabs */}
          <Card glass className="mb-6">
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground mr-2">Category:</span>
              {(['all', 'growth', 'value', 'dividend', 'sector'] as BasketCategory[]).map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? 'shadow-lg shadow-primary/20' : ''}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>
          </Card>

          {/* Risk Filter */}
          <Card glass>
            <div className="flex items-center gap-2 flex-wrap">
              <Shield className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground mr-2">Risk:</span>
              {(['all', 'low', 'medium', 'high'] as RiskFilter[]).map((risk) => (
                <Badge
                  key={risk}
                  variant={selectedRisk === risk ? 'default' : 'outline'}
                  className={`cursor-pointer transition-all ${
                    selectedRisk === risk ? 'shadow-lg' : 'hover:bg-accent'
                  }`}
                  onClick={() => setSelectedRisk(risk)}
                >
                  {risk.charAt(0).toUpperCase() + risk.slice(1)}
                </Badge>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Featured Basket */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <Card glass className="overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-50" />
            <div className="relative p-6 lg:p-8">
              <div className="flex items-center gap-2 mb-6">
                <Badge variant="warning" className="shadow-lg shadow-warning/20">
                  <Crown className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
                <Badge variant="success" className="shadow-lg shadow-success/20">
                  <Zap className="w-3 h-3 mr-1" />
                  Hot
                </Badge>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    {mockBaskets[0].name}
                  </h2>
                  <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                    {mockBaskets[0].description}
                  </p>

                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-success/10 to-transparent border border-success/20">
                      <p className="text-sm text-muted-foreground mb-2">CAGR</p>
                      <p className="text-3xl font-bold text-success">{mockBaskets[0].cagr}%</p>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
                      <p className="text-sm text-muted-foreground mb-2">Min Investment</p>
                      <p className="text-3xl font-bold">{formatCurrency(mockBaskets[0].minInvestment)}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/30">
                      <p className="text-sm text-muted-foreground mb-2">1Y Returns</p>
                      <p className="text-xl font-bold text-success">+{mockBaskets[0].returns1Y}%</p>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/30">
                      <p className="text-sm text-muted-foreground mb-2">Risk Level</p>
                      <Badge className={getRiskColor(mockBaskets[0].risk)}>
                        {mockBaskets[0].risk.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    <Button variant="primary" size="lg" className="shadow-lg shadow-primary/20">
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Invest Now
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => setSelectedBasket(mockBaskets[0])}
                    >
                      <Info className="w-5 h-5 mr-2" />
                      Learn More
                    </Button>
                  </div>
                </div>

                <div>
                  {mockBaskets[0].chartData && (
                    <div className="bg-card/50 backdrop-blur-lg rounded-xl p-6 border border-border/50 h-full flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-sm font-medium text-muted-foreground">Performance Trend</p>
                        <Badge variant="success" className="text-xs">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          +{mockBaskets[0].returns1Y}%
                        </Badge>
                      </div>
                      <div className="flex-1 flex items-center">
                        <MiniChart
                          data={mockBaskets[0].chartData}
                          color="#00C896"
                          height={240}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Baskets Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredBaskets.map((basket) => (
            <motion.div key={basket.id} variants={item}>
              <Card glass hoverable className="h-full group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold line-clamp-1">{basket.name}</h3>
                    <Badge className={getRiskColor(basket.risk)}>
                      {basket.risk}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                    {basket.description}
                  </p>

                  {basket.chartData && (
                    <div className="mb-4 -mx-2">
                      <MiniChart data={basket.chartData} color="#3B82F6" height={80} />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                      <p className="text-xs text-muted-foreground mb-1">CAGR</p>
                      <p className="text-lg font-bold text-success">{basket.cagr}%</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30">
                      <p className="text-xs text-muted-foreground mb-1">3Y Returns</p>
                      <p className="text-lg font-bold text-success">+{basket.returns3Y}%</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30">
                      <p className="text-xs text-muted-foreground mb-1">Volatility</p>
                      <p className="text-sm font-semibold">{basket.volatility}%</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30">
                      <p className="text-xs text-muted-foreground mb-1">Stocks</p>
                      <p className="text-sm font-semibold">{basket.stocks.length}</p>
                    </div>
                  </div>

                  {subscribedBaskets.has(basket.id) && (
                    <div className="border-t border-border/50 pt-4 mb-4">
                      <p className="text-xs text-muted-foreground mb-2">Top Holdings</p>
                      <div className="flex flex-wrap gap-1.5">
                        {basket.stocks.slice(0, 3).map((stock, i) => (
                          <Badge key={i} variant="outline" className="text-xs border-primary/30 bg-primary/5">
                            {stock}
                          </Badge>
                        ))}
                        {basket.stocks.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{basket.stocks.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm p-2 rounded-lg bg-muted/20">
                      <span className="text-muted-foreground">Min Investment</span>
                      <span className="font-semibold">{formatCurrency(basket.minInvestment)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm p-2 rounded-lg bg-muted/20">
                      <span className="text-muted-foreground">Monthly Fee</span>
                      <span className="font-semibold">{formatCurrency(basket.price)}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant={subscribedBaskets.has(basket.id) ? "outline" : "primary"}
                      className="flex-1 shadow-lg shadow-primary/20"
                      size="sm"
                      onClick={() => toggleSubscription(basket.id)}
                    >
                      {subscribedBaskets.has(basket.id) ? (
                        <>
                          <Shield className="w-4 h-4 mr-2 text-success" />
                          Subscribed
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Subscribe
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedBasket(basket)}
                    >
                      <BarChart3 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredBaskets.length === 0 && (
          <Card glass className="text-center py-16">
            <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
              <Package className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No baskets found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters
            </p>
          </Card>
        )}

        {/* Detail Modal */}
        <AnimatePresence>
          {selectedBasket && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedBasket(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="max-w-4xl w-full max-h-[90vh] overflow-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <Card glass>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className="text-3xl font-bold mb-2">{selectedBasket.name}</h2>
                        <p className="text-muted-foreground">{selectedBasket.description}</p>
                      </div>
                      <button
                        onClick={() => setSelectedBasket(null)}
                        className="p-2 hover:bg-accent rounded-lg transition-colors"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="p-4 rounded-xl bg-gradient-to-br from-success/10 to-transparent border border-success/20">
                        <p className="text-sm text-muted-foreground mb-1">CAGR</p>
                        <p className="text-2xl font-bold text-success">{selectedBasket.cagr}%</p>
                      </div>
                      <div className="p-4 rounded-xl bg-muted/30">
                        <p className="text-sm text-muted-foreground mb-1">1Y Returns</p>
                        <p className="text-2xl font-bold text-success">+{selectedBasket.returns1Y}%</p>
                      </div>
                      <div className="p-4 rounded-xl bg-muted/30">
                        <p className="text-sm text-muted-foreground mb-1">3Y Returns</p>
                        <p className="text-2xl font-bold text-success">+{selectedBasket.returns3Y}%</p>
                      </div>
                      <div className="p-4 rounded-xl bg-muted/30">
                        <p className="text-sm text-muted-foreground mb-1">Volatility</p>
                        <p className="text-2xl font-bold">{selectedBasket.volatility}%</p>
                      </div>
                    </div>

                    {selectedBasket.chartData && (
                      <div className="mb-6 p-6 rounded-xl bg-muted/30">
                        <h3 className="font-semibold mb-4">Performance Chart</h3>
                        <MiniChart
                          data={selectedBasket.chartData}
                          color="#00C896"
                          height={200}
                        />
                      </div>
                    )}

                    {subscribedBaskets.has(selectedBasket.id) ? (
                      <div className="mb-6">
                        <h3 className="font-semibold mb-3">Holdings ({selectedBasket.stocks.length})</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {selectedBasket.stocks.map((stock, i) => (
                            <Badge key={i} variant="outline" className="justify-center py-2">
                              {stock}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="mb-6 p-4 rounded-xl border border-border/50 bg-muted/20 flex items-center gap-3">
                        <Shield className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">Subscribe to unlock the full holdings list for this basket.</p>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <Button
                        variant={subscribedBaskets.has(selectedBasket.id) ? "outline" : "primary"}
                        size="lg"
                        className="flex-1 shadow-lg shadow-primary/20"
                        onClick={() => toggleSubscription(selectedBasket.id)}
                      >
                        {subscribedBaskets.has(selectedBasket.id) ? (
                          <>
                            <Shield className="w-5 h-5 mr-2 text-success" />
                            Unsubscribe
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-5 h-5 mr-2" />
                            Subscribe Now - {formatCurrency(selectedBasket.price)}/mo
                          </>
                        )}
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
