import { ShineKPISummary } from "@/types/index";
import KpiCard from "@/components/ui/KpiCard";

interface KPICardsProps {
  summary: ShineKPISummary;
  monthSelected?: boolean;
}

export default function KPICards({ summary, monthSelected }: KPICardsProps) {
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
      {monthSelected ? (
        <KpiCard
          icon="📣"
          label="Ads Lead %"
          value={`${summary.avgOrganicPercent}%`}
        />
      ) : (
        <KpiCard
          icon="🌿"
          label="Avg Organic Lead %"
          value={`${summary.avgOrganicPercent}%`}
        />
      )}
    </div>
  );
}
