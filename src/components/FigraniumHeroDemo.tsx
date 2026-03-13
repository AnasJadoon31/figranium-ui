import React, { useEffect, useRef, useState } from "react";
import { HeroDemoTerminal, type HeroDemoLogEntry } from "./HeroDemoTerminal";
import { WindowFrame } from "./WindowFrame";

interface FigraniumHeroDemoProps {
  className?: string;
  bodyClassName?: string;
}

type HeroDemoTab = "editor" | "terminal";

const taskJson = `{
  "name": "Extract GitHub Trending",
  "modes": ["block"],
  "actions": [
    {
      "type": "goto",
      "url": "https://github.com/trending"
    },
    {
      "type": "wait",
      "selector": ".Box-row"
    },
    {
      "type": "javascript",
      "code": "return Array.from(document.querySelectorAll('h2 a'));"
    }
  ]
}`;

const executionSteps: Array<HeroDemoLogEntry & { delay: number }> = [
  {
    text: "> npx @doppelgangerdev/doppelganger --task trending.json",
    delay: 200,
    color: "text-zinc-300",
  },
  {
    text: "[info] Figranium engine starting...",
    delay: 400,
    color: "text-zinc-500",
  },
  {
    text: "[info] Launching headless browser (Playwright)...",
    delay: 600,
    color: "text-zinc-500",
  },
  {
    text: "[action] Executing block 1: GOTO https://github.com/trending",
    delay: 800,
    color: "text-blue-400",
  },
  {
    text: "[action] Executing block 2: WAIT for selector .Box-row",
    delay: 1200,
    color: "text-blue-400",
  },
  {
    text: "[action] Executing block 3: JAVASCRIPT extraction",
    delay: 500,
    color: "text-blue-400",
  },
  {
    text: "[success] Task completed in 1.4s.",
    delay: 300,
    color: "text-green-400",
  },
  { text: "Result:", delay: 200, color: "text-zinc-300" },
  {
    text: '[\n  "figranium/figranium",\n  "facebook/react",\n  "vercel/next.js"\n]',
    delay: 100,
    color: "text-green-300",
  },
];

function syntaxHighlight(json: string) {
  let colored = json.replace(
    /"(.*?)"(?=:)/g,
    '<span class="text-blue-300">"$1"</span>',
  );
  colored = colored.replace(
    /:\s"(.*?)"/g,
    ': <span class="text-green-300">"$1"</span>',
  );
  colored = colored.replace(
    /\[|\]|\{|\}/g,
    '<span class="text-zinc-500">$&</span>',
  );
  return colored;
}

export function FigraniumHeroDemo({
  className = "w-full max-w-4xl mx-auto mt-16 relative z-10 text-left",
  bodyClassName = "relative h-80 w-full bg-[#0A0A0A] overflow-hidden",
}: FigraniumHeroDemoProps) {
  const [activeTab, setActiveTab] = useState<HeroDemoTab>("editor");
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<HeroDemoLogEntry[]>([]);
  const terminalContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop =
        terminalContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const runSimulation = async () => {
    if (isRunning) return;

    setIsRunning(true);
    setActiveTab("terminal");
    setLogs([]);

    for (const step of executionSteps) {
      await new Promise((resolve) => setTimeout(resolve, step.delay));
      setLogs((prev) => [...prev, { text: step.text, color: step.color }]);
    }

    setIsRunning(false);
  };

  return (
    <WindowFrame
      className={className}
      centerContent={
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setActiveTab("editor")}
            className={`transition-colors ${activeTab === "editor" ? "text-white" : "text-zinc-500 hover:text-zinc-300"}`}
          >
            trending.json
          </button>
          <button
            onClick={() => setActiveTab("terminal")}
            className={`transition-colors ${activeTab === "terminal" ? "text-white" : "text-zinc-500 hover:text-zinc-300"}`}
          >
            Terminal
          </button>
        </div>
      }
      rightContent={
        <button
          onClick={runSimulation}
          disabled={isRunning}
          className="px-3 py-1 text-xs font-sans font-medium text-black bg-white rounded-md hover:bg-zinc-200 transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {isRunning ? (
            <span className="animate-pulse">Running...</span>
          ) : (
            "Run Task"
          )}
        </button>
      }
      bodyClassName={bodyClassName}
    >
      {activeTab === "editor" ? (
        <div className="p-6 text-zinc-300 overflow-y-auto h-full w-full">
          <pre className="font-mono leading-relaxed text-sm">
            <code
              dangerouslySetInnerHTML={{ __html: syntaxHighlight(taskJson) }}
            />
          </pre>
        </div>
      ) : (
        <HeroDemoTerminal
          logs={logs}
          isRunning={isRunning}
          terminalContainerRef={terminalContainerRef}
        />
      )}
    </WindowFrame>
  );
}

export default FigraniumHeroDemo;
