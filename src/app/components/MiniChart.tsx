import { LineChart, Line, ResponsiveContainer } from "recharts";

interface MiniChartProps {
  data: { time: string; value: number }[];
  color?: string;
  height?: number;
}

export function MiniChart({ data, color = "#3B82F6", height = 60 }: MiniChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
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
  );
}
