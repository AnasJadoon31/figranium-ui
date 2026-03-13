import React, { useState } from "react";
import { motion, Reorder } from "motion/react";
import MouseIcon from "@mui/icons-material/Mouse";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CodeIcon from "@mui/icons-material/Code";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const initialBlocks = [
  {
    id: "1",
    type: "goto",
    label: "Go to URL",
    icon: <MouseIcon sx={{ fontSize: 16 }} />,
    color: "bg-zinc-900 text-zinc-400 border-zinc-800",
  },
  {
    id: "2",
    type: "wait",
    label: "Wait for Element",
    icon: <HourglassEmptyIcon sx={{ fontSize: 16 }} />,
    color: "bg-zinc-900 text-zinc-400 border-zinc-800",
  },
  {
    id: "3",
    type: "type",
    label: "Type Text",
    icon: <KeyboardIcon sx={{ fontSize: 16 }} />,
    color: "bg-zinc-900 text-zinc-400 border-zinc-800",
  },
  {
    id: "4",
    type: "click",
    label: "Click Element",
    icon: <MouseIcon sx={{ fontSize: 16 }} />,
    color: "bg-zinc-900 text-zinc-400 border-zinc-800",
  },
  {
    id: "5",
    type: "js",
    label: "Run JavaScript",
    icon: <CodeIcon sx={{ fontSize: 16 }} />,
    color: "bg-zinc-900 text-zinc-400 border-zinc-800",
  },
  {
    id: "6",
    type: "condition",
    label: "If/Else",
    icon: <AccountTreeIcon sx={{ fontSize: 16 }} />,
    color: "bg-zinc-900 text-zinc-400 border-zinc-800",
  },
];

export function BlockBuilder() {
  const [blocks, setBlocks] = useState(initialBlocks);

  return (
    <section className="py-32 px-6 max-w-5xl mx-auto relative z-10">
      <div className="mb-20">
        <span className="text-zinc-500 font-medium tracking-[0.2em] mb-4 block text-xs uppercase">
          BLOCK-FIRST DESIGN
        </span>
        <h3 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-6 max-w-2xl">
          Drag and drop to build logic.
        </h3>
        <p className="text-zinc-400 max-w-2xl leading-relaxed text-lg">
          Complex automation is broken down into simple, composable blocks.
          Reorder the blocks below to see how easy it is to build a flow.
        </p>
      </div>

      <div className="max-w-xl mx-auto bg-[#050505] border border-white/10 rounded-2xl p-8 shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

        <Reorder.Group
          axis="y"
          values={blocks}
          onReorder={setBlocks}
          className="space-y-3"
        >
          {blocks.map((block) => (
            <Reorder.Item
              key={block.id}
              value={block}
              className="relative z-10"
            >
              <div className="flex items-center gap-4 bg-[#0A0A0A] border border-white/5 rounded-xl p-4 cursor-grab active:cursor-grabbing hover:bg-[#111111] hover:border-white/10 transition-colors group">
                <div className="text-zinc-600 group-hover:text-zinc-400 transition-colors">
                  <DragIndicatorIcon sx={{ fontSize: 20 }} />
                </div>
                <div
                  className={`w-8 h-8 rounded-md border flex items-center justify-center ${block.color}`}
                >
                  {block.icon}
                </div>
                <div className="flex-1">
                  <div className="text-zinc-200 font-medium text-sm tracking-tight">
                    {block.label}
                  </div>
                </div>
                <div className="text-xs font-mono text-zinc-600">
                  {block.type.toUpperCase()}
                </div>
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    </section>
  );
}
