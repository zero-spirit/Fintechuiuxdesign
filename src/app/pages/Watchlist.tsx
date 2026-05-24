import { useState } from "react";
import { Card } from "../components/ui/CustomCard";
import { Button } from "../components/ui/CustomButton";
import { StockCard } from "../components/StockCard";
import { mockStocks } from "../../lib/mockData";
import { Plus, Trash2 } from "lucide-react";
import { motion } from "motion/react";

export function Watchlist() {
  const [watchlistStocks] = useState(mockStocks.slice(0, 6));

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Watchlist</h1>
            <p className="text-muted-foreground">Track your favorite stocks in one place</p>
          </div>
          <Button variant="primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Stock
          </Button>
        </div>

        {/* Watchlist Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Stocks</p>
                <p className="text-2xl font-bold">{watchlistStocks.length}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg. Gain</p>
                <p className="text-2xl font-bold text-success">+2.3%</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Market Value</p>
                <p className="text-2xl font-bold">₹4.2L</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Watchlist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {watchlistStocks.map((stock, index) => (
            <motion.div
              key={stock.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StockCard stock={stock} onAddToWatchlist={() => {}} />
            </motion.div>
          ))}
        </div>

        {watchlistStocks.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Plus className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Your watchlist is empty</h3>
            <p className="text-muted-foreground mb-6">Start adding stocks to track them here</p>
            <Button variant="primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Stock
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
