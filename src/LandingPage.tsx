import React from "react";
import { Capabilities } from "./components/Capabilities";
import { UseCases } from "./components/UseCases";
import { Modes } from "./components/Modes";
import { ApiSection } from "./components/ApiSection";
import { BlockBuilder } from "./components/BlockBuilder";
import { Footer } from "./components/Footer";
import { FigraniumIntegrationBackground } from "./components/FigraniumIntegrationBackground";
import { LandingNavbar } from "./components/LandingNavbar";
import { HeroSection } from "./components/HeroSection";

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
      <HeroSection />

      <BlockBuilder />
      <Capabilities />
      <UseCases />
      <Modes />
      <ApiSection />
      <Footer />
    </div>
  );
}
