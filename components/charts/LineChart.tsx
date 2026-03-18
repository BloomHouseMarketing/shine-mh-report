"use client";

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface LineChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  yKey: string;
}

export default function LineChart({ data, xKey, yKey }: LineChartProps) {
  // TODO: Implement chart with real data
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey={yKey} stroke="#F5C518" strokeWidth={2} />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
