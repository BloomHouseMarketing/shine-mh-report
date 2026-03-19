import { ShineKPISummary } from "@/types/index";
import KpiCard from "@/components/ui/KpiCard";

interface KPICardsProps {
  summary: ShineKPISummary;
  adsLeadsPercent: string;
}

export default function KPICards({ summary, adsLeadsPercent }: KPICardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
      <KpiCard
        label="Total FTC Calls"
        value={summary.totalCallsSum}
      />
      <KpiCard
        label="Qualified Calls"
        value={summary.qualifiedCallsSum}
        subtext={`of ${summary.totalCallsSum} total calls`}
      />
      <KpiCard
        label="Qualification Rate"
        value={`${summary.qualificationRate}%`}
        subtext="calls converted"
      />
      <KpiCard
        label="Organic Lead %"
        value={`${summary.avgOrganicPercent}%`}
      />
      <KpiCard
        label="PPC LEADS %"
        value={adsLeadsPercent}
      />
    </div>
  );
}
