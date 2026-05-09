import { motion } from "motion/react";
import { formatNumber, formatPercent, getChangeColor } from "../../lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useMarketIndices } from "../../hooks/useMarketIndices";

export function MarketTicker() {
  const { indices, loading } = useMarketIndices();

  if (loading || indices.length === 0) {
    return (
      <div className="bg-card border-b border-border py-3 px-4">
        <div className="text-sm text-muted-foreground">Loading market data...</div>
      </div>
    );
  }

  const displayIndices = [...indices, ...indices];

  return (
    <div className="bg-card border-b border-border overflow-hidden">
      <motion.div
        className="flex gap-8 py-3 px-4"
        animate={{ x: [0, -1000] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {displayIndices.map((index, i) => (
          <div key={i} className="flex items-center gap-3 whitespace-nowrap">
            <span className="font-medium">{index.name}</span>
            <span className="text-foreground">{formatNumber(index.value)}</span>
            <span className={`flex items-center gap-1 ${getChangeColor(index.change)}`}>
              {index.change >= 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {formatPercent(index.changePercent)}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
