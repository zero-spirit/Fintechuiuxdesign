import { useState } from "react";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Badge } from "../components/ui/Badge";
import { StockCard } from "../components/StockCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorMessage } from "../components/ErrorMessage";
import { Search, Filter, TrendingUp, TrendingDown, RefreshCw } from "lucide-react";
import { useStocks, useTopGainersLosers } from "../../hooks/useStocks";
import { motion } from "motion/react";
import { Button } from "../components/ui/Button";

export function Stocks() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState("all");

  const { stocks, loading: stocksLoading, error: stocksError, refreshStocks } = useStocks();
  const { gainers, losers, loading: moversLoading } = useTopGainersLosers();

  const sectors = ["all", "IT", "Banking", "Energy", "Consumer", "Telecom", "Pharma", "Auto"];

  const filteredStocks = stocks.filter(stock => {
    const matchesSearch = stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         stock.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = selectedSector === "all" || stock.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  if (stocksError) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ErrorMessage message={stocksError} onRetry={refreshStocks} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Stock Market</h1>
            <p className="text-muted-foreground">Live data from NSE India</p>
          </div>
          <Button onClick={refreshStocks} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Market Movers */}
        {moversLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-success" />
                  Top Gainers
                </h3>
              </div>
              <div className="space-y-3">
                {gainers.slice(0, 3).map((stock, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors">
                    <div>
                      <p className="font-medium">{stock.symbol}</p>
                      <p className="text-sm text-muted-foreground">{stock.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{stock.price.toFixed(2)}</p>
                      <p className="text-sm text-success">+{stock.changePercent.toFixed(2)}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-destructive" />
                  Top Losers
                </h3>
              </div>
              <div className="space-y-3">
                {losers.slice(0, 3).map((stock, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors">
                    <div>
                      <p className="font-medium">{stock.symbol}</p>
                      <p className="text-sm text-muted-foreground">{stock.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{stock.price.toFixed(2)}</p>
                      <p className="text-sm text-destructive">{stock.changePercent.toFixed(2)}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Search and Filter */}
        <Card className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search stocks by name or symbol..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <div className="flex flex-wrap gap-2">
                {sectors.map((sector) => (
                  <Badge
                    key={sector}
                    variant={selectedSector === sector ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedSector(sector)}
                  >
                    {sector}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Stock Grid */}
        {stocksLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStocks.map((stock, index) => (
                <motion.div
                  key={stock.symbol}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <StockCard stock={{ ...stock, id: stock.symbol }} />
                </motion.div>
              ))}
            </div>

            {filteredStocks.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No stocks found matching your criteria</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
