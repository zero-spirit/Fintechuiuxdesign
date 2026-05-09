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
    <Card hoverable className="relative">
      <div className="absolute top-4 right-4">
        <button
          onClick={onAddToWatchlist}
          className="p-2 hover:bg-accent rounded-lg transition-colors"
        >
          <Star className="w-4 h-4 text-muted-foreground hover:text-warning" />
        </button>
      </div>

      <div className="mb-3">
        <div className="flex items-start justify-between mb-1">
          <div>
            <h4 className="font-semibold text-lg">{stock.symbol}</h4>
            <p className="text-sm text-muted-foreground line-clamp-1">{stock.name}</p>
          </div>
        </div>
        <Badge variant="outline" className="mt-2">{stock.sector}</Badge>
      </div>

      {stock.chartData && (
        <div className="mb-4">
          <MiniChart data={stock.chartData} color={isPositive ? "#00C896" : "#ef4444"} />
        </div>
      )}

      <div className="space-y-2">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-2xl font-bold">{formatCurrency(stock.price)}</p>
            <div className={`flex items-center gap-1 mt-1 ${getChangeColor(stock.change)}`}>
              {isPositive ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="font-medium">
                {formatCurrency(Math.abs(stock.change))} ({formatPercent(stock.changePercent)})
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm pt-3 border-t border-border">
          <div>
            <p className="text-muted-foreground">Vol</p>
            <p className="font-medium">{stock.volume}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Mkt Cap</p>
            <p className="font-medium">{stock.marketCap}</p>
          </div>
        </div>
      </div>

      <Button variant="primary" size="sm" className="w-full mt-4">
        <Plus className="w-4 h-4 mr-2" />
        Buy
      </Button>
    </Card>
  );
}
