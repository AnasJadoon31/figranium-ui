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
        className={`relative overflow-hidden rounded-[28px] border border-white/10 bg-[#050505]/90 backdrop-blur-sm ${contentClassName}`.trim()}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-linear-to-br from-white/8 via-transparent to-transparent" />
          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-cyan-400/16 blur-[120px]" />
          <div className="absolute -right-24 top-8 h-72 w-72 rounded-full bg-sky-500/12 blur-[130px]" />
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/35 to-transparent" />
          <div className="absolute inset-x-12 bottom-0 h-px bg-linear-to-r from-transparent via-cyan-300/25 to-transparent" />
        </div>

        <div className="relative z-10">{children}</div>
      </div>
    </section>
  );
}

export default SectionSurface;
