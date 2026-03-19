"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ShineDataRow } from "@/types/index";

interface TotalVsQualifiedBarProps {
  data: ShineDataRow[];
}

const GreenBar = (props: any) => {
  const { x, y, width, height, value, index, data } = props;
  const hasData = data?.[index]?.hasData;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height}
        fill={hasData ? "#22C55E" : "#E5E7EB"}
        fillOpacity={hasData ? 1 : 0.5} rx={4} />
      {hasData && value !== null && value !== undefined ? (
        <text x={x + width / 2} y={y - 8}
          textAnchor="middle" fontSize={11}
          fontWeight={600} fill="#111111">
          {value}
        </text>
      ) : null}
    </g>
  );
};

const BlueBar = (props: any) => {
  const { x, y, width, height, value, index, data } = props;
  const hasData = data?.[index]?.hasData;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height}
        fill={hasData ? "#3B82F6" : "#D1D5DB"}
        fillOpacity={hasData ? 1 : 0.5} rx={4} />
      {hasData && value !== null && value !== undefined ? (
        <text x={x + width / 2} y={y - 8}
          textAnchor="middle" fontSize={11}
          fontWeight={600} fill="#111111">
          {value}
        </text>
      ) : null}
    </g>
  );
};

export default function TotalVsQualifiedBar({
  data,
}: TotalVsQualifiedBarProps) {
  const chartData = data.map((r) => ({
    month: r.month,
    totalCalls: r.totalCalls ?? 0,
    qualifiedCalls: r.qualifiedCalls ?? 0,
    hasData: r.totalCalls !== null,
  }));

  const hasAnyData = data.some((r) => r.totalCalls !== null);

  if (!hasAnyData) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-brand-yellow">
        <h2 className="font-heading font-bold text-brand-black text-base">
          Total vs Qualified Calls
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
        <p className="text-[#22C55E]">Total Calls: {entry.totalCalls}</p>
        <p className="text-[#3B82F6]">Qualified: {entry.qualifiedCalls}</p>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-brand-yellow">
      <h2 className="font-heading font-bold text-brand-black text-base">
        Total vs Qualified Calls
      </h2>
      <p className="text-xs text-brand-muted mt-0.5 mb-6">
        FTC Call Performance by Month
      </p>
      <div style={{ overflow: "visible" }}>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData} barCategoryGap="25%" margin={{ top: 30, right: 10, left: 10, bottom: 60 }} style={{ overflow: "visible" }}>
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
            <Legend wrapperStyle={{ paddingTop: "16px" }} />
            <Bar
              dataKey="totalCalls"
              name="Total Calls (FTC)"
              fill="#22C55E"
              barSize={20}
              shape={(props: any) => <GreenBar {...props} data={chartData} />}
            />
            <Bar
              dataKey="qualifiedCalls"
              name="Qualified Calls"
              fill="#3B82F6"
              barSize={20}
              shape={(props: any) => <BlueBar {...props} data={chartData} />}
            />
          </BarChart>
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
