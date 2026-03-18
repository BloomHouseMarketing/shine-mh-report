interface KpiCardProps {
  label: string;
  value: string | number;
  change?: string;
}

export default function KpiCard({ label, value, change }: KpiCardProps) {
  return (
    <div className="rounded-xl border border-brand-border bg-brand-white p-6">
      <p className="text-sm text-brand-muted">{label}</p>
      <p className="font-heading text-2xl font-bold mt-1">{value}</p>
      {change && <p className="text-sm text-brand-green mt-1">{change}</p>}
    </div>
  );
}
