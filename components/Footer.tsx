export default function Footer() {
  return (
    <footer className="bg-brand-black w-full">
      <div className="max-w-[1280px] mx-auto px-6 h-20 flex flex-col items-center justify-center gap-1">
        <p className="text-white text-xs">
          Powered by Bloomhouse
          <span className="text-brand-yellow font-bold mx-1">·</span>
          Marketing
        </p>
        <p className="text-white/40 text-xs">
          © 2026 Bloomhouse Marketing. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
