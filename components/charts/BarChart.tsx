"use client";

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface BarChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  yKey: string;
}

export default function BarChart({ data, xKey, yKey }: BarChartProps) {
  // TODO: Implement chart with real data
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <Bar dataKey={yKey} fill="#3B82F6" />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
