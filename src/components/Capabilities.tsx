import React from "react";
import { motion } from "motion/react";
import GridViewIcon from "@mui/icons-material/GridView";
import LayersIcon from "@mui/icons-material/Layers";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import CodeIcon from "@mui/icons-material/Code";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import LockIcon from "@mui/icons-material/Lock";
import { SectionSurface } from "./SectionSurface";

const capabilities = [
  {
    icon: <GridViewIcon sx={{ fontSize: 20 }} />,
    title: "Block-Based Builder",
    desc: "Create tasks by stacking action blocks inside a visual editor.",
    colSpan: "md:col-span-2",
  },
  {
    icon: <LayersIcon sx={{ fontSize: 20 }} />,
    title: "Execution Modes",
    desc: "Scrape, Agent, or Headful.",
    colSpan: "md:col-span-1",
  },
  {
    icon: <PlayCircleOutlineIcon sx={{ fontSize: 20 }} />,
    title: "Action Blocks",
    desc: "Click, type, hover, wait, scroll, press, and run JS.",
    colSpan: "md:col-span-1",
  },
  {
    icon: <CodeIcon sx={{ fontSize: 20 }} />,
    title: "JavaScript Blocks",
    desc: "Add custom extraction and page logic where you need it.",
    colSpan: "md:col-span-2",
  },
  {
    icon: <FileDownloadIcon sx={{ fontSize: 20 }} />,
    title: "JSON Export",
    desc: "Copy task definitions from the editor for reuse.",
    colSpan: "md:col-span-1",
  },
  {
    icon: <LockIcon sx={{ fontSize: 20 }} />,
    title: "Secure API Access",
    desc: "Trigger and manage tasks through a secure API.",
    colSpan: "md:col-span-2",
  },
];

export function Capabilities() {
  return (
    <SectionSurface contentClassName="px-6 py-10 md:px-10 md:py-12">
      <div className="mb-16">
        <span className="text-zinc-500 font-medium tracking-[0.2em] mb-4 block text-xs uppercase">
          CAPABILITIES
        </span>
        <h3 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-6 max-w-2xl">
          Build automation tasks locally, step by step.
        </h3>
        <p className="text-zinc-400 max-w-2xl leading-relaxed text-lg">
          A block-based editor, multiple run modes, and exportable task
          definitions you can reuse.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {capabilities.map((cap, i) => (
          <motion.div
            key={i}
            className={cap.colSpan}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="bg-[#050505] border border-white/10 rounded-2xl h-full transition-colors duration-300 hover:bg-[#0A0A0A] hover:border-white/20 p-8 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-zinc-300 mb-6 bg-white/5">
                  {cap.icon}
                </div>
                <h6 className="text-zinc-100 text-lg font-semibold mb-3 tracking-tight">
                  {cap.title}
                </h6>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {cap.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionSurface>
  );
}
