interface KpiCardProps {
  label: string;
  value: string | number;
  subtext?: string;
}

export default function KpiCard({ label, value, subtext }: KpiCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-brand-yellow hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <p className="text-[11px] uppercase tracking-widest text-brand-muted font-bold">
        {label}
      </p>
      <p className="text-4xl font-heading font-bold text-brand-black mt-1">
        {value}
      </p>
      {subtext && (
        <p className="text-xs text-brand-muted mt-1">{subtext}</p>
      )}
    </div>
  );
}
