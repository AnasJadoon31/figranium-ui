import React from "react";
import { motion } from "motion/react";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import RefreshIcon from "@mui/icons-material/Refresh";
import CodeIcon from "@mui/icons-material/Code";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { WindowFrame } from "./WindowFrame";

const features = [
  {
    icon: <FlashOnIcon sx={{ fontSize: 16 }} />,
    title: "Trigger Runs",
    desc: "Start tasks programmatically through the secure API.",
  },
  {
    icon: <RefreshIcon sx={{ fontSize: 16 }} />,
    title: "Check Status",
    desc: "Read run progress and statuses without leaving your stack.",
  },
  {
    icon: <CodeIcon sx={{ fontSize: 16 }} />,
    title: "Fetch Results",
    desc: "Pull structured outputs directly from the API.",
  },
];

export function ApiSection() {
  return (
    <section className="py-32 px-6 max-w-5xl mx-auto relative z-10">
      <div className="bg-[#050505] border border-white/10 rounded-3xl p-8 md:p-16 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <span className="text-zinc-500 font-medium tracking-[0.2em] mb-4 block text-xs uppercase">
              API
            </span>
            <h3 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Secure API access to run and manage tasks.
            </h3>
            <p className="text-zinc-400 mb-12 leading-relaxed max-w-md text-lg">
              Trigger tasks, monitor runs, and fetch results from a secure API
              alongside the dashboard.
            </p>

            <div className="space-y-8 mb-12">
              {features.map((feat, i) => (
                <motion.div
                  key={i}
                  className="flex gap-4 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <div className="w-8 h-8 rounded-md border border-white/10 flex items-center justify-center text-zinc-400 shrink-0 bg-white/5 group-hover:bg-white/10 group-hover:text-white transition-colors">
                    {feat.icon}
                  </div>
                  <div>
                    <h6 className="text-zinc-100 font-semibold mb-1 tracking-tight text-sm">
                      {feat.title}
                    </h6>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <button className="flex items-center gap-2 bg-white text-black hover:bg-zinc-200 rounded-full px-6 py-3 font-medium transition-colors text-sm">
              View API Documentation
              <ArrowForwardIcon sx={{ fontSize: 16 }} />
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <WindowFrame
              className="border-white/10"
              headerClassName="border-white/10"
              centerContent={
                <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                  curl
                </span>
              }
              bodyClassName="p-6 overflow-x-auto"
            >
              <pre className="text-zinc-400 leading-loose">
                <span className="text-blue-400">curl</span>{" "}
                <span className="text-purple-400">-X</span> POST{" "}
                <span className="text-emerald-400">
                  "http://localhost:11345/tasks/:id/api"
                </span>{" "}
                \
                <br />
                {"  "}
                <span className="text-purple-400">-H</span>{" "}
                <span className="text-emerald-400">
                  "x-api-key: dpl_9d2f..."
                </span>{" "}
                \
                <br />
                {"  "}
                <span className="text-purple-400">-d</span>{" "}
                <span className="text-emerald-400">
                  '{"{"}
                  <span className="text-blue-300">"target_url"</span>:{" "}
                  <span className="text-emerald-400">
                    "https://example.com"
                  </span>
                  {"}"}'
                </span>
              </pre>
            </WindowFrame>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
