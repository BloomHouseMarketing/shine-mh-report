import { ShineKPISummary } from "@/types/index";
import KpiCard from "@/components/ui/KpiCard";

interface KPICardsProps {
  summary: ShineKPISummary;
}

export default function KPICards({ summary }: KPICardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <KpiCard
        icon="📞"
        label="Total FTC Calls"
        value={summary.totalCallsSum}
      />
      <KpiCard
        icon="✅"
        label="Qualified Calls"
        value={summary.qualifiedCallsSum}
        subtext={`of ${summary.totalCallsSum} total calls`}
      />
      <KpiCard
        icon="📊"
        label="Qualification Rate"
        value={`${summary.qualificationRate}%`}
        subtext="calls converted"
      />
      <KpiCard
        icon="🌿"
        label="Avg Organic Lead %"
        value={`${summary.avgOrganicPercent}%`}
      />
    </div>
  );
}
