interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Card({ title, children, className = "" }: CardProps) {
  return (
    <div className={`rounded-xl border border-brand-border bg-brand-white p-6 ${className}`}>
      {title && <h3 className="font-heading text-lg font-bold mb-4">{title}</h3>}
      {children}
    </div>
  );
}
