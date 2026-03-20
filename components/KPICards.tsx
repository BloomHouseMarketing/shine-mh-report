import { ShineKPISummary } from "@/types/index";
import KpiCard from "@/components/ui/KpiCard";

interface KPICardsProps {
  summary: ShineKPISummary;
  adsLeadsPercent: string;
  admission: string;
}

export default function KPICards({ summary, adsLeadsPercent, admission }: KPICardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
        label="Admission"
        value={admission}
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
