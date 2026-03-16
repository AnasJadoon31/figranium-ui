import React from "react";
import { LandingNavbar } from "./components/LandingNavbar";
import { Footer } from "./components/Footer";
import { SectionSurface } from "./components/SectionSurface";
import { FigraniumIntegrationBackground } from "./components/FigraniumIntegrationBackground";

export interface IntegrationInfo {
  id: string;
  name: string;
  description: string;
  url: string;
  logoUrl?: string;
  npmCommand?: string;
  tags: string[];
}

// Easily add new integrations here in the future
const INTEGRATIONS: IntegrationInfo[] = [
  {
    id: "n8n",
    name: "n8n",
    description:
      "Official Figranium nodes for n8n. Automate workflows by natively triggering Figranium browser automation and agents directly from your n8n pipelines.",
    url: "https://www.npmjs.com/package/n8n-nodes-figranium",
    logoUrl: "https://cdn.simpleicons.org/n8n/ea4b71",
    npmCommand: "npm i n8n-nodes-figranium",
    tags: ["Workflow Automation", "Official", "Node"],
  },
  {
    id: "zapier",
    name: "Zapier",
    description:
      "Connect Figranium to 5,000+ apps. Trigger automated web tasks, extract data, and pipe the results directly into Google Sheets, Slack, or thousands of other platforms without coding.",
    url: "#",
    logoUrl: "https://cdn.simpleicons.org/zapier/FF4A00",
    tags: ["Workflow Automation", "Coming Soon", "No-code"],
  },
];

export default function Integrations() {
  return (
    <div className="min-h-screen bg-black text-neutral-200 font-sans selection:bg-blue-500/30 relative overflow-clip flex flex-col">
      <FigraniumIntegrationBackground />
      <div className="relative z-10 flex-grow flex flex-col">
        <LandingNavbar />

        <div className="flex-grow max-w-4xl mx-auto w-full px-6 pt-8 pb-16 sm:pt-12 sm:pb-24">
          <header className="mb-12 lg:mb-16 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Integrations
            </h1>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
              Supercharge your workflow by connecting Figranium with your
              favorite tools and platforms.
            </p>
          </header>

          <SectionSurface
            className="w-full px-0 py-0"
            contentClassName="p-8 sm:p-10 border-white/5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {INTEGRATIONS.map((integration) => (
                <div
                  key={integration.id}
                  className="group relative flex flex-col p-6 sm:p-8 bg-black/60 backdrop-blur-xl hover:bg-[#0a0a0a]/90 border border-white/10 hover:border-white/20 rounded-2xl transition-all duration-300 h-full"
                >
                  <div className="flex items-center gap-4 mb-4">
                    {integration.logoUrl && (
                      <div className="shrink-0 w-12 h-12 bg-neutral-900 border border-neutral-800 rounded-lg flex items-center justify-center p-2.5 group-hover:border-neutral-700 transition-colors">
                        <img
                          src={integration.logoUrl}
                          alt={`${integration.name} logo`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    <h2 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {integration.name}
                    </h2>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {integration.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider bg-neutral-800/80 text-neutral-300 rounded border border-neutral-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-neutral-400 leading-relaxed mb-6 text-sm sm:text-base flex-grow">
                    {integration.description}
                  </p>

                  <div className="mt-auto space-y-4">
                    {integration.npmCommand && (
                      <div className="w-full">
                        <code className="block bg-neutral-950 font-mono text-emerald-400 px-3 py-2 rounded-lg border border-neutral-800 text-sm text-center truncate">
                          <span className="text-neutral-500 select-none mr-2">
                            $
                          </span>
                          {integration.npmCommand}
                        </code>
                      </div>
                    )}

                    <a
                      href={integration.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-semibold text-white bg-neutral-800 hover:bg-neutral-700 transition-colors rounded-xl border border-neutral-700 shadow-sm hover:shadow group-hover:border-emerald-500/50"
                    >
                      View Integration
                      <svg
                        className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </SectionSurface>
        </div>
        <Footer />
      </div>
    </div>
  );
}
