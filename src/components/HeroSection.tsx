import React from "react";
import { motion } from "motion/react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Typewriter } from "./Typewriter";
import { FigraniumHeroDemo } from "./FigraniumHeroDemo";
import { SectionSurface } from "./SectionSurface";

export function HeroSection() {
  return (
    <SectionSurface
      className="pt-24 pb-8"
      contentClassName="px-6 py-10 md:px-10 md:py-14 lg:px-12"
    >
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-start lg:items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center lg:text-left lg:pt-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium tracking-[0.18em] text-zinc-300 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
            SELF-HOSTED AUTOMATION
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6">
            Browser automation <br className="hidden md:block" /> for{" "}
            <Typewriter
              words={[
                "hobbyist",
                "enterprises",
                "teams",
                "developers",
                "freelancers",
              ]}
            />
          </h1>
          <p className="text-lg md:text-xl text-zinc-300/90 max-w-2xl lg:mx-0 mx-auto mb-10 leading-relaxed">
            Figranium runs on your hardware while giving you the power of a
            visual builder with block-based actions, optional JavaScript, and a
            secure API.
          </p>

          <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
            <button className="px-6 py-3 bg-white text-black font-semibold rounded-md hover:bg-zinc-200 transition-colors w-full sm:w-auto">
              Get Started
            </button>
            <button className="px-6 py-3 bg-transparent border border-zinc-700 text-white font-medium rounded-md hover:bg-zinc-900 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto">
              View Documentation
              <ArrowForwardIcon sx={{ fontSize: 16 }} />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="w-full"
        >
          <FigraniumHeroDemo
            className="w-full max-w-none mx-auto mt-0 relative z-10 text-left"
            bodyClassName="relative h-120 md:h-128 xl:h-144 w-full bg-[#0A0A0A] overflow-hidden"
          />
        </motion.div>
      </div>
    </SectionSurface>
  );
}
