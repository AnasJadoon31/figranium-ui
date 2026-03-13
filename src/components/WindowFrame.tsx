import React from "react";

interface WindowFrameProps {
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  centerContent?: React.ReactNode;
  rightContent?: React.ReactNode;
}

function TrafficLights() {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
      <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
      <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
    </div>
  );
}

export function WindowFrame({
  children,
  className = "",
  headerClassName = "",
  bodyClassName = "",
  centerContent,
  rightContent,
}: WindowFrameProps) {
  return (
    <div
      className={`bg-[#0A0A0A] border border-zinc-800 rounded-xl shadow-2xl overflow-hidden font-mono text-sm ${className}`.trim()}
    >
      <div
        className={`grid grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-3 bg-[#111111] border-b border-zinc-800 ${headerClassName}`.trim()}
      >
        <TrafficLights />
        <div className="min-w-0 flex items-center justify-center">
          {centerContent}
        </div>
        <div className="min-w-0 flex items-center justify-end">
          {rightContent}
        </div>
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}

export default WindowFrame;
