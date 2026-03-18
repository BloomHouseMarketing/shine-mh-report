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
  const [selectedMonth, setSelectedMonth] = useState<string>("All Time");

  const monthsWithData = data
    .filter((r) => r.totalCalls !== null)
    .map((r) => r.month);

  const filteredSummary: ShineKPISummary =
    selectedMonth === "All Time"
      ? summary
      : (() => {
          const row = data.find((r) => r.month === selectedMonth);
          if (!row || row.totalCalls === null) return summary;
          const totalCalls = row.totalCalls;
          const qualifiedCalls = row.qualifiedCalls ?? 0;
          const qualificationRate =
            totalCalls > 0
              ? Math.round((qualifiedCalls / totalCalls) * 1000) / 10
              : 0;
          return {
            ...summary,
            totalCallsSum: totalCalls,
            qualifiedCallsSum: qualifiedCalls,
            qualificationRate,
            avgOrganicPercent: row.adsLeadsPercent ?? 0,
          };
        })();

  const isMonthSelected = selectedMonth !== "All Time";

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedMonth("All Time")}
          className={`rounded-full px-4 py-1.5 text-sm cursor-pointer ${
            selectedMonth === "All Time"
              ? "bg-brand-yellow text-brand-black font-semibold"
              : "bg-white border border-brand-border text-brand-muted hover:border-brand-yellow transition"
          }`}
        >
          All Time
        </button>
        {monthsWithData.map((month) => (
          <button
            key={month}
            onClick={() => setSelectedMonth(month)}
            className={`rounded-full px-4 py-1.5 text-sm cursor-pointer ${
              selectedMonth === month
                ? "bg-brand-yellow text-brand-black font-semibold"
                : "bg-white border border-brand-border text-brand-muted hover:border-brand-yellow transition"
            }`}
          >
            {month}
          </button>
        ))}
      </div>

      <div className="mb-6">
        <KPICards
          summary={filteredSummary}
          monthSelected={isMonthSelected}
        />
      </div>

      <ChartGrid data={data} selectedMonth={selectedMonth} />
    </>
  );
}
