import React from "react";
import { motion } from "motion/react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
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

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#000000",
      paper: "#0A0A0A",
    },
  },
  typography: {
    fontFamily: "inherit",
  },
});

export default function LandingPage() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30 relative overflow-clip">
        <FigraniumIntegrationBackground />

        {/* Background Glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none flex justify-center items-start pt-32 z-0">
          <div className="w-200 h-100 bg-white/3 blur-[120px] rounded-full" />
        </div>

        <LandingNavbar />

        {/* Hero Section */}
        <main className="relative z-10 flex flex-col items-center justify-center px-6 pt-32 pb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
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
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Figranium runs on your hardware while giving you the power of a
              visual builder with block-based actions, optional JavaScript, and
              a secure API.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-6 py-3 bg-white text-black font-semibold rounded-md hover:bg-zinc-200 transition-colors w-full sm:w-auto">
                Get Started
              </button>
              <button className="px-6 py-3 bg-transparent border border-zinc-800 text-white font-medium rounded-md hover:bg-zinc-900 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto">
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
            <FigraniumHeroDemo />
          </motion.div>
        </main>

        <BlockBuilder />
        <Capabilities />
        <UseCases />
        <Modes />
        <ApiSection />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
