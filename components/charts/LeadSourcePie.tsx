'use client'

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { ShineDataRow } from "@/types/index"

interface LeadSourcePieProps {
  data: ShineDataRow[]
  selectedMonth?: string
}

const renderLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, value
}: any) => {
  if (!value) return null
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={13}
      fontWeight={700}
      fill="#FFFFFF"
    >
      {`${value}%`}
    </text>
  )
}

export default function LeadSourcePie({ data, selectedMonth = "All Time" }: LeadSourcePieProps) {
  const displayRow =
    selectedMonth !== "All Time"
      ? data.find((r) => r.month === selectedMonth) ?? null
      : [...data].filter((r) => r.adsLeadsPercent !== null).pop() ?? null

  if (!displayRow || displayRow.adsLeadsPercent === null) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-brand-yellow">
        <h2 className="font-heading font-bold text-brand-black text-base">
          Lead Source
        </h2>
        <p className="text-xs text-brand-muted mt-0.5">No data yet</p>
      </div>
    )
  }

  const pieData = [
    { name: "Organic", value: displayRow.organicLeadsPercent ?? 0, color: "#22C55E" },
    { name: "Ads", value: displayRow.adsLeadsPercent ?? 0, color: "#3B82F6" },
  ]

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean
    payload?: { name: string; value: number; payload: { color: string } }[]
  }) => {
    if (!active || !payload?.length) return null
    const d = payload[0]
    return (
      <div className="bg-brand-black rounded-lg px-4 py-3 text-sm shadow-xl">
        <p style={{ color: d.payload.color }} className="font-semibold">
          {d.name}
        </p>
        <p className="text-white">{d.value}%</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-brand-yellow">
      <h2 className="font-heading font-bold text-brand-black text-base">
        Lead Source — {displayRow.month}
      </h2>
      <p className="text-xs text-brand-muted mt-0.5 mb-6">
        Ads vs Organic Distribution
      </p>
      <div style={{ position: "relative" }}>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={3}
              startAngle={90}
              endAngle={-270}
              isAnimationActive={true}
              label={renderLabel}
              labelLine={false}
            >
              {pieData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <span className="font-heading font-bold text-sm text-brand-black text-center leading-tight">
            {displayRow.month}
          </span>
        </div>
      </div>
      <div className="flex gap-3 justify-center mt-4">
        <span className="rounded-full px-3 py-1 text-sm font-semibold bg-green-100 text-green-700">
          🟢 Organic: {displayRow.organicLeadsPercent}%
        </span>
        <span className="rounded-full px-3 py-1 text-sm font-semibold bg-blue-100 text-blue-700">
          🔵 Ads: {displayRow.adsLeadsPercent}%
        </span>
      </div>
    </div>
  )
}
