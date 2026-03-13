import React from "react";

export interface HeroDemoLogEntry {
  text: string;
  color: string;
}

interface HeroDemoTerminalProps {
  logs: HeroDemoLogEntry[];
  isRunning: boolean;
  terminalContainerRef: React.RefObject<HTMLDivElement | null>;
}

export function HeroDemoTerminal({
  logs,
  isRunning,
  terminalContainerRef,
}: HeroDemoTerminalProps) {
  return (
    <div
      ref={terminalContainerRef}
      className="p-6 overflow-y-auto h-full w-full flex flex-col gap-2"
    >
      {logs.length === 0 && !isRunning && (
        <div className="text-zinc-600">
          Click "Run Task" to execute the automation block...
        </div>
      )}
      {logs.map((log, index) => (
        <div key={index} className={`whitespace-pre-wrap ${log.color}`}>
          {log.text}
        </div>
      ))}
      {isRunning && <div className="text-zinc-500 animate-pulse mt-2">_</div>}
    </div>
  );
}

export default HeroDemoTerminal;
