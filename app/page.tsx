import { fetchShineData, getShineKPISummary } from "@/lib/google-sheets";
import KPICards from "@/components/KPICards";
import dynamic from "next/dynamic";

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

export const revalidate = 3600;

export default async function DashboardPage() {
  const shineData = await fetchShineData();
  const summary = getShineKPISummary(shineData);

  return (
    <main className="py-8">
      <div className="mb-8">
        <h1 className="font-heading font-bold text-3xl text-brand-black">
          Shine Mental Health
        </h1>
        <p className="text-brand-muted text-sm mt-1">
          Call Performance &amp; Lead Source Report
        </p>
        <p className="text-xs text-brand-muted mt-0.5">
          {summary.monthsWithData} months with data · Updated hourly
        </p>
      </div>

      <div className="mb-6">
        <KPICards summary={summary} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <LeadSourceStackedBar data={shineData} />
        <TotalVsQualifiedBar data={shineData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <MonthlyCallsBar data={shineData} />
        </div>
        <div className="lg:col-span-1">
          <LeadSourcePie data={shineData} />
        </div>
      </div>
    </main>
  );
}
