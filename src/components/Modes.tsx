import React from "react";
import { motion } from "motion/react";
import DownloadIcon from "@mui/icons-material/Download";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { SectionSurface } from "./SectionSurface";

const modes = [
  {
    title: "Scrape",
    desc: "Fast extraction mode for straightforward data pulls.",
    icon: <DownloadIcon sx={{ fontSize: 20 }} />,
  },
  {
    title: "Agent",
    desc: "Multi-step flows with block sequencing and variables.",
    icon: <SmartToyIcon sx={{ fontSize: 20 }} />,
  },
  {
    title: "Headful",
    desc: "Manual, interactive browser session with no automation blocks.",
    icon: <VisibilityIcon sx={{ fontSize: 20 }} />,
  },
];

export function Modes() {
  return (
    <SectionSurface contentClassName="px-6 py-10 md:px-10 md:py-12">
      <div className="mb-16">
        <span className="text-zinc-500 font-medium tracking-[0.2em] mb-4 block text-xs uppercase">
          MODES
        </span>
        <h3 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-6 max-w-2xl">
          Choose the execution mode per task.
        </h3>
        <p className="text-zinc-400 max-w-2xl leading-relaxed text-lg">
          Scrape, Agent, and Headful modes are available from the task editor
          and the secure API.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-stretch gap-6">
        {modes.map((mode, i) => (
          <motion.div
            key={i}
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="bg-[#050505] border border-white/10 rounded-2xl h-full transition-all duration-300 hover:bg-[#0A0A0A] hover:border-white/20 p-8 flex flex-col items-start">
              <div className="mb-6 w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-zinc-300 bg-white/5">
                {mode.icon}
              </div>
              <h6 className="text-zinc-100 text-lg font-semibold mb-3 tracking-tight">
                {mode.title}
              </h6>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {mode.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionSurface>
  );
}
