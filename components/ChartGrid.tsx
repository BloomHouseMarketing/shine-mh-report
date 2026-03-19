"use client";

import dynamic from "next/dynamic";
import { ShineDataRow } from "@/types/index";

const LeadSourceStackedBar = dynamic(
  () => import("@/components/charts/BarChart"),
  { ssr: false },
);
const TotalVsQualifiedBar = dynamic(
  () => import("@/components/charts/LineChart"),
  { ssr: false },
);
const MonthlyCallsBar = dynamic(
  () => import("@/components/charts/MonthlyCallsBar"),
  { ssr: false },
);
const LeadSourcePie = dynamic(
  () => import("@/components/charts/LeadSourcePie"),
  { ssr: false },
);

interface ChartGridProps {
  data: ShineDataRow[];
  selectedMonth: string;
}

export default function ChartGrid({ data, selectedMonth }: ChartGridProps) {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <TotalVsQualifiedBar data={data} />
        <LeadSourceStackedBar data={data} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <MonthlyCallsBar data={data} />
        </div>
        <div className="lg:col-span-1">
          <LeadSourcePie data={data} selectedMonth={selectedMonth} />
        </div>
      </div>
    </>
  );
}
