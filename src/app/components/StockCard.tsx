import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { TrendingUp, TrendingDown, Plus, Star } from "lucide-react";
import type { Stock } from "../../lib/mockData";
import { formatCurrency, formatPercent, getChangeColor } from "../../lib/utils";
import { MiniChart } from "./MiniChart";

interface StockCardProps {
  stock: Stock;
  onAddToWatchlist?: () => void;
}

export function StockCard({ stock, onAddToWatchlist }: StockCardProps) {
  const isPositive = stock.change >= 0;

  return (
    <Card glass hoverable className="relative group overflow-hidden">
      {/* Hover gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${
        isPositive ? 'from-success/5' : 'from-destructive/5'
      } to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      {/* Watchlist button */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={onAddToWatchlist}
          className="p-2 hover:bg-warning/10 rounded-lg transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-warning/30"
        >
          <Star className="w-4 h-4 text-muted-foreground hover:text-warning hover:fill-warning transition-all" />
        </button>
      </div>

      {/* Header */}
      <div className="mb-4 relative">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${
              isPositive
                ? 'from-emerald-500 to-teal-500'
                : 'from-red-500 to-orange-500'
            } flex items-center justify-center font-bold text-white text-sm shadow-lg`}>
              {stock.symbol.substring(0, 2)}
            </div>
            <div>
              <h4 className="font-bold text-lg">{stock.symbol}</h4>
              <p className="text-xs text-muted-foreground line-clamp-1">{stock.name}</p>
            </div>
          </div>
        </div>
        <Badge
          variant="outline"
          className="border-primary/30 bg-primary/5 backdrop-blur-sm text-xs"
        >
          {stock.sector}
        </Badge>
      </div>

      {/* Mini Chart */}
      {stock.chartData && (
        <div className="mb-4 -mx-2">
          <MiniChart data={stock.chartData} color={isPositive ? "#00C896" : "#ef4444"} />
        </div>
      )}

      {/* Price Section */}
      <div className="space-y-3 relative">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {formatCurrency(stock.price)}
            </p>
            <div className={`flex items-center gap-1.5 mt-2 ${getChangeColor(stock.change)}`}>
              {isPositive ? (
                <div className="p-1 rounded bg-success/10">
                  <TrendingUp className="w-3.5 h-3.5" />
                </div>
              ) : (
                <div className="p-1 rounded bg-destructive/10">
                  <TrendingDown className="w-3.5 h-3.5" />
                </div>
              )}
              <span className="font-semibold text-sm">
                {formatCurrency(Math.abs(stock.change))} ({formatPercent(stock.changePercent)})
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/50">
          <div className="p-2 rounded-lg bg-muted/30">
            <p className="text-xs text-muted-foreground mb-1">Volume</p>
            <p className="font-semibold text-sm">{stock.volume}</p>
          </div>
          <div className="p-2 rounded-lg bg-muted/30">
            <p className="text-xs text-muted-foreground mb-1">Market Cap</p>
            <p className="font-semibold text-sm">{stock.marketCap}</p>
          </div>
        </div>
      </div>

      {/* Buy Button */}
      <Button
        variant="primary"
        size="sm"
        className="w-full mt-4 shadow-lg shadow-primary/20 group-hover:shadow-xl group-hover:shadow-primary/30 transition-all"
      >
        <Plus className="w-4 h-4 mr-2" />
        Buy Now
      </Button>
    </Card>
  );
}
