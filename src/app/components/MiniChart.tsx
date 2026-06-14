import { LineChart, Line, ResponsiveContainer } from "recharts";

interface MiniChartProps {
  data: { time: string; value: number }[];
  color?: string;
  height?: number;
}

export function MiniChart({ data, color = "#3B82F6", height = 60 }: MiniChartProps) {
  return (
    <div className="relative" style={{ height }}>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
    </div>
  );
}
