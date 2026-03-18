import { fetchShineData, getShineKPISummary } from "@/lib/google-sheets";
import KPICards from "@/components/KPICards";
import ChartGrid from "@/components/ChartGrid";

export const dynamic = "force-dynamic";
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

      <ChartGrid data={shineData} />
    </main>
  );
}
