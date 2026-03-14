import React from "react";

interface SectionSurfaceProps {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export function SectionSurface({
  children,
  className = "",
  contentClassName = "",
}: SectionSurfaceProps) {
  return (
    <section
      className={`py-20 px-6 max-w-368 mx-auto relative z-10 ${className}`.trim()}
    >
      <div
        className={`relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0a0a0a]/70 backdrop-blur-xl shadow-2xl ${contentClassName}`.trim()}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] rounded-[28px]" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/80" />
          <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-zinc-500/10 blur-[120px]" />
          <div className="absolute -right-24 top-8 h-80 w-80 rounded-full bg-zinc-400/10 blur-[130px]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-300/40 to-transparent" />
          <div className="absolute inset-x-12 bottom-0 h-px bg-gradient-to-r from-transparent via-zinc-800/60 to-transparent" />
        </div>

        <div className="relative z-10">{children}</div>
      </div>
    </section>
  );
}

export default SectionSurface;
