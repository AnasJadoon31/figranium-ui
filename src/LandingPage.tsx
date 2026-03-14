import React from "react";
import { motion } from "motion/react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Capabilities } from "./components/Capabilities";
import { UseCases } from "./components/UseCases";
import { Modes } from "./components/Modes";
import { ApiSection } from "./components/ApiSection";
import { BlockBuilder } from "./components/BlockBuilder";
import { Footer } from "./components/Footer";
import { Typewriter } from "./components/Typewriter";
import { FigraniumIntegrationBackground } from "./components/FigraniumIntegrationBackground";
import { FigraniumHeroDemo } from "./components/FigraniumHeroDemo";
import { LandingNavbar } from "./components/LandingNavbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30 relative overflow-clip">
      <FigraniumIntegrationBackground />

      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex justify-center items-start pt-32 z-0">
        <div className="w-200 h-100 bg-white/3 blur-[120px] rounded-full" />
      </div>

      <LandingNavbar />

      {/* Hero Section */}
      <main className="relative z-10 px-6 pt-24 pb-24">
        <div className="max-w-368 mx-auto">
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#050505]/90 backdrop-blur-sm px-6 py-10 md:px-10 md:py-14 lg:px-12">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-linear-to-br from-white/8 via-transparent to-transparent" />
              <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-cyan-400/20 blur-[120px]" />
              <div className="absolute -right-24 top-8 h-72 w-72 rounded-full bg-sky-500/15 blur-[130px]" />
              <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent" />
              <div className="absolute inset-x-12 bottom-0 h-px bg-linear-to-r from-transparent via-cyan-300/30 to-transparent" />
            </div>

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
                  Figranium runs on your hardware while giving you the power of
                  a visual builder with block-based actions, optional
                  JavaScript, and a secure API.
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
          </div>
        </div>
      </main>

      <BlockBuilder />
      <Capabilities />
      <UseCases />
      <Modes />
      <ApiSection />
      <Footer />
    </div>
  );
}
