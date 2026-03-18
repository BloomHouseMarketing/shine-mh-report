export default function Header() {
  const today = new Date()
    .toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-");

  return (
    <header className="bg-brand-black w-full" style={{ borderBottom: "3px solid #F5C518" }}>
      <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-brand-yellow font-heading font-bold text-xl">
            Bloomhouse
          </span>
          <div className="w-px h-5 bg-white/30 mx-3" />
          <span className="text-white font-body text-sm font-medium">
            Shine Mental Health
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-brand-yellow/70 text-xs">Date:</span>
          <span className="text-brand-yellow text-sm font-semibold">{today}</span>
        </div>
      </div>
    </header>
  );
}
