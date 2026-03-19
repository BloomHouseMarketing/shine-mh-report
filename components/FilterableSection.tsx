"use client";

import { useState } from "react";
import { ShineDataRow, ShineKPISummary } from "@/types/index";
import KPICards from "@/components/KPICards";
import ChartGrid from "@/components/ChartGrid";

interface FilterableSectionProps {
  data: ShineDataRow[];
  summary: ShineKPISummary;
}

export default function FilterableSection({
  data,
  summary,
}: FilterableSectionProps) {
  const currentMonth =
    data.filter((r) => r.totalCalls !== null).pop()?.month ?? "";

  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth);

  const monthsWithData = data
    .filter((r) => r.totalCalls !== null)
    .map((r) => r.month);

  const selectedRow = data.find((r) => r.month === selectedMonth);
  const filteredSummary: ShineKPISummary = (() => {
    if (!selectedRow || selectedRow.totalCalls === null) return summary;
    const totalCalls = selectedRow.totalCalls;
    const qualifiedCalls = selectedRow.qualifiedCalls ?? 0;
    const qualificationRate =
      totalCalls > 0
        ? Math.round((qualifiedCalls / totalCalls) * 1000) / 10
        : 0;
    return {
      ...summary,
      totalCallsSum: totalCalls,
      qualifiedCallsSum: qualifiedCalls,
      qualificationRate,
      avgOrganicPercent: selectedRow.organicLeadsPercent ?? 0,
    };
  })();

  const activePill =
    "bg-brand-yellow text-brand-black font-semibold";
  const inactivePill =
    "bg-white border border-brand-border text-brand-muted hover:border-brand-yellow transition";

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedMonth(currentMonth)}
          className={`rounded-full px-4 py-1.5 text-sm cursor-pointer font-bold ${
            selectedMonth === currentMonth ? activePill : inactivePill
          }`}
        >
          ● Current Month
        </button>
        {monthsWithData.map((month) => (
          <button
            key={month}
            onClick={() => setSelectedMonth(month)}
            className={`rounded-full px-4 py-1.5 text-sm cursor-pointer ${
              selectedMonth === month ? activePill : inactivePill
            }`}
          >
            {month}
          </button>
        ))}
      </div>

      <div className="mb-6">
        <KPICards summary={filteredSummary} />
      </div>

      <ChartGrid data={data} selectedMonth={selectedMonth} />
    </>
  );
}
