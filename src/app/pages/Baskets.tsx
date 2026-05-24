import { Card } from "../components/ui/CustomCard";
import { Badge } from "../components/ui/CustomBadge";
import { Button } from "../components/ui/CustomButton";
import { mockBaskets } from "../../lib/mockData";
import { getRiskColor, formatCurrency } from "../../lib/utils";
import { TrendingUp, ShoppingCart, Info } from "lucide-react";
import { MiniChart } from "../components/MiniChart";
import { motion } from "motion/react";

export function Baskets() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Stock Baskets</h1>
          <p className="text-muted-foreground">Invest in curated portfolios designed by experts</p>
        </div>

        {/* Featured Basket */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="warning">Featured</Badge>
              <Badge variant="success">Hot</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">{mockBaskets[0].name}</h2>
                <p className="text-muted-foreground mb-6">{mockBaskets[0].description}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">CAGR</p>
                    <p className="text-2xl font-bold text-success">{mockBaskets[0].cagr}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Min Investment</p>
                    <p className="text-2xl font-bold">{formatCurrency(mockBaskets[0].minInvestment)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">1Y Returns</p>
                    <p className="text-lg font-semibold text-success">+{mockBaskets[0].returns1Y}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Risk</p>
                    <Badge className={getRiskColor(mockBaskets[0].risk)}>
                      {mockBaskets[0].risk.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button variant="primary" size="lg">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Invest Now
                  </Button>
                  <Button variant="outline" size="lg">
                    <Info className="w-5 h-5 mr-2" />
                    Learn More
                  </Button>
                </div>
              </div>

              <div>
                {mockBaskets[0].chartData && (
                  <div className="bg-card/50 backdrop-blur-lg rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-2">Performance Trend</p>
                    <MiniChart
                      data={mockBaskets[0].chartData}
                      color="#00C896"
                      height={200}
                    />
                  </div>
                )}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Baskets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockBaskets.map((basket, index) => (
            <motion.div
              key={basket.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hoverable className="h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{basket.name}</h3>
                  <Badge className={getRiskColor(basket.risk)}>
                    {basket.risk}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {basket.description}
                </p>

                {basket.chartData && (
                  <div className="mb-4">
                    <MiniChart data={basket.chartData} color="#3B82F6" height={80} />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground">CAGR</p>
                    <p className="text-lg font-bold text-success">{basket.cagr}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">3Y Returns</p>
                    <p className="text-lg font-bold text-success">+{basket.returns3Y}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Volatility</p>
                    <p className="text-sm font-medium">{basket.volatility}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Stocks</p>
                    <p className="text-sm font-medium">{basket.stocks.length}</p>
                  </div>
                </div>

                <div className="border-t border-border pt-4 mb-4">
                  <p className="text-xs text-muted-foreground mb-2">Includes</p>
                  <div className="flex flex-wrap gap-1">
                    {basket.stocks.slice(0, 3).map((stock, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {stock}
                      </Badge>
                    ))}
                    {basket.stocks.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{basket.stocks.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Min Investment</span>
                    <span className="font-semibold">{formatCurrency(basket.minInvestment)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subscription Fee</span>
                    <span className="font-semibold">{formatCurrency(basket.price)}/mo</span>
                  </div>
                </div>

                <Button variant="primary" className="w-full mt-4">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Subscribe
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
