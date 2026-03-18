"use client";

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ShineDataRow } from "@/types/index";

interface LeadSourceStackedBarProps {
  data: ShineDataRow[];
}

export default function LeadSourceStackedBar({
  data,
}: LeadSourceStackedBarProps) {
  const chartData = data.map((r) => ({
    month: r.month,
    organic: r.organicLeadsPercent ?? 0,
    ads: r.adsLeadsPercent ?? 0,
    hasData: r.totalCalls !== null,
  }));

  const hasAnyData = data.some((r) => r.totalCalls !== null);

  if (!hasAnyData) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-brand-yellow">
        <h2 className="font-heading font-bold text-brand-black text-base">
          Lead Source Split by Month
        </h2>
        <p className="text-xs text-brand-muted mt-0.5">No data yet</p>
      </div>
    );
  }

  const hasGrayBars = chartData.some((d) => !d.hasData);

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: { value: number }[];
    label?: string;
  }) => {
    if (!active || !payload?.length) return null;
    const entry = chartData.find((d) => d.month === label);
    if (!entry?.hasData) {
      return (
        <div className="bg-white border border-brand-border rounded-lg px-3 py-2 text-xs text-brand-muted shadow">
          {label}: No data yet
        </div>
      );
    }
    return (
      <div className="bg-brand-black rounded-lg px-4 py-3 text-sm shadow-xl">
        <p className="text-white font-semibold mb-2">{label}</p>
        <p className="text-[#22C55E]">Organic: {entry.organic}%</p>
        <p className="text-[#3B82F6]">Ads: {entry.ads}%</p>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-brand-yellow">
      <h2 className="font-heading font-bold text-brand-black text-base">
        Lead Source Split by Month
      </h2>
      <p className="text-xs text-brand-muted mt-0.5 mb-6">
        Ads vs Organic %
      </p>
      <div>
        <ResponsiveContainer width="100%" height={320}>
          <RechartsBarChart data={chartData} barCategoryGap="30%">
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="#F3F4F6"
            />
            <XAxis
              dataKey="month"
              interval={0}
              angle={-35}
              textAnchor="end"
              height={60}
              tick={{ fill: "#6B7280", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: "16px" }} />
            <Bar dataKey="organic" name="Organic Leads" stackId="a" fill="#22C55E">
              {chartData.map((entry, i) => (
                <Cell
                  key={i}
                  fill={entry.hasData ? "#22C55E" : "#E5E7EB"}
                  fillOpacity={entry.hasData ? 1 : 0.5}
                />
              ))}
            </Bar>
            <Bar dataKey="ads" name="Ads Leads" stackId="a" fill="#3B82F6" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, i) => (
                <Cell
                  key={i}
                  fill={entry.hasData ? "#3B82F6" : "#D1D5DB"}
                  fillOpacity={entry.hasData ? 1 : 0.5}
                />
              ))}
            </Bar>
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
      {hasGrayBars && (
        <p className="text-xs text-brand-muted mt-3">
          Months without data shown in gray
        </p>
      )}
    </div>
  );
}
