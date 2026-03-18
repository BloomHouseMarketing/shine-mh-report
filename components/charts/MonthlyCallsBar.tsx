"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ShineDataRow } from "@/types/index";

interface MonthlyCallsBarProps {
  data: ShineDataRow[];
}

const LabeledBar = (props: any) => {
  const { x, y, width, height, value, index, data } = props;
  const hasData = data?.[index]?.hasData;
  const fill = hasData ? "#22C55E" : "#E5E7EB";
  const opacity = hasData ? 1 : 0.5;
  return (
    <g>
      <rect
        x={x} y={y} width={width} height={height}
        fill={fill} fillOpacity={opacity} rx={6}
      />
      {hasData && value ? (
        <text
          x={x + width / 2}
          y={y - 8}
          textAnchor="middle"
          fontSize={11}
          fontWeight={600}
          fill="#111111"
        >
          {value}
        </text>
      ) : null}
    </g>
  );
};

export default function MonthlyCallsBar({ data }: MonthlyCallsBarProps) {
  const chartData = data.map((r) => ({
    month: r.month,
    totalCalls: r.totalCalls !== null ? r.totalCalls : 0,
    hasData: r.totalCalls !== null,
  }));

  const hasAnyData = data.some((r) => r.totalCalls !== null);

  if (!hasAnyData) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-brand-yellow">
        <h2 className="font-heading font-bold text-brand-black text-base">
          Monthly Call Volume
        </h2>
        <p className="text-xs text-brand-muted mt-0.5">No data yet</p>
      </div>
    );
  }

  const hasGrayBars = chartData.some((d) => !d.hasData);

  const filled = data.filter((r) => r.totalCalls !== null);
  const trendDelta =
    filled.length >= 2
      ? (filled[filled.length - 1].totalCalls ?? 0) -
        (filled[filled.length - 2].totalCalls ?? 0)
      : null;

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
        <p className="text-[#22C55E]">Total Calls: {entry.totalCalls}</p>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-brand-yellow">
      <h2 className="font-heading font-bold text-brand-black text-base">
        Monthly Call Volume
      </h2>
      <p className="text-xs text-brand-muted mt-0.5 mb-6">
        Total First-Time Calls (FTC)
      </p>
      <div style={{ overflow: "visible" }}>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData} maxBarSize={60} margin={{ top: 30, right: 10, left: 10, bottom: 60 }} style={{ overflow: "visible" }}>
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
              domain={[0, "auto"]}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="totalCalls"
              shape={(props: any) => (
                <LabeledBar {...props} data={chartData} />
              )}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {trendDelta !== null && (
        <p
          className={`text-xs font-semibold mt-3 ${trendDelta >= 0 ? "text-green-500" : "text-red-500"}`}
        >
          {trendDelta >= 0 ? "▲" : "▼"} {Math.abs(trendDelta)} calls vs
          previous month
          <span className="text-brand-muted font-normal ml-1">
            ({filled[filled.length - 2].month} →{" "}
            {filled[filled.length - 1].month})
          </span>
        </p>
      )}
      {hasGrayBars && (
        <p className="text-xs text-brand-muted mt-3">
          Months without data shown in gray
        </p>
      )}
    </div>
  );
}
