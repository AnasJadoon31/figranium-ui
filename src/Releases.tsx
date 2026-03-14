import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import releasesData from "@/data/releases.json";
import { LandingNavbar } from "./components/LandingNavbar";
import { Footer } from "./components/Footer";
import { SectionSurface } from "./components/SectionSurface";
import { FigraniumIntegrationBackground } from "./components/FigraniumIntegrationBackground";
// Define the interface for a release based on the requested structure
interface Release {
  id: number;
  version: string;
  title: string;
  body: string;
  publishedAt: string;
  authorName: string;
  releaseUrl: string;
}

const releases: Release[] = releasesData as Release[];

export default function Releases() {
  if (!releases || releases.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white px-4">
        <h1 className="text-2xl font-bold">No releases found</h1>
        <p className="text-neutral-500 mt-2">Check back later for updates.</p>
      </div>
    );
  }

  const latestRelease = releases[0];
  const previousReleases = releases.slice(1);

  // Helper date formatter
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-black text-neutral-200 font-sans selection:bg-blue-500/30 relative overflow-clip">
      <FigraniumIntegrationBackground />
      <div className="relative z-10">
        <LandingNavbar />
        <div className="max-w-4xl mx-auto px-6 pt-8 pb-16 sm:pt-12 sm:pb-24">
          <header className="mb-8 lg:mb-10">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Releases
            </h1>
            <p className="text-lg text-neutral-400">
              Latest updates, features, and fixes for the project.
            </p>
          </header>

          {/* Hero Release (Latest) */}
          <SectionSurface
            className="mb-16 lg:mb-24 px-0 py-0 max-w-4xl"
            contentClassName="shadow-2xl"
          >
            <div className="p-8 sm:p-10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4 pb-6 border-b border-white/10">
                <div>
                  <div className="inline-flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                      Latest Release
                    </span>
                    <span className="text-sm text-neutral-400 font-mono">
                      {latestRelease.version}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-white tracking-tight">
                    {latestRelease.title}
                  </h2>
                </div>

                <div className="flex flex-col sm:items-end text-sm text-neutral-500 gap-1 mt-2 sm:mt-0">
                  <time
                    dateTime={latestRelease.publishedAt}
                    className="text-neutral-300 font-medium"
                  >
                    {formatDate(latestRelease.publishedAt)}
                  </time>
                  <span>By @{latestRelease.authorName}</span>
                </div>
              </div>

              {/* Render Markdown securely with react-markdown & Tailwind arbitrary variants */}
              <div
                className="text-neutral-300 leading-relaxed 
                [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:text-white [&>h1]:mt-8 [&>h1]:mb-4 
                [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-white [&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:border-b [&>h2]:border-neutral-800 [&>h2]:pb-2
                [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-white [&>h3]:mt-6 [&>h3]:mb-3
                [&>p]:mb-5 
                [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul>li]:mb-2 [&>ul>li::marker]:text-neutral-500
                [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol>li]:mb-2
                [&>blockquote]:border-l-4 [&>blockquote]:border-neutral-600 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-neutral-400 [&>blockquote]:mb-6
                [&>pre]:bg-neutral-950 [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:mb-6 [&>pre]:overflow-x-auto
                [&>p>code]:bg-neutral-800 [&>p>code]:px-1.5 [&>p>code]:py-0.5 [&>p>code]:rounded-md [&>p>code]:text-sm [&>p>code]:text-emerald-300
                [&>li>code]:bg-neutral-800 [&>li>code]:px-1.5 [&>li>code]:py-0.5 [&>li>code]:rounded-md [&>li>code]:text-sm [&>li>code]:text-emerald-300
                [&>a]:text-emerald-400 [&>a]:underline [&>a:hover]:text-emerald-300"
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {latestRelease.body}
                </ReactMarkdown>
              </div>

              <div className="mt-10 pt-6">
                <a
                  href={latestRelease.releaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-neutral-800 hover:bg-neutral-700 transition-colors rounded-xl border border-neutral-700 w-full sm:w-auto shadow-sm hover:shadow"
                >
                  View full release on GitHub
                  <svg
                    className="ml-2 w-4 h-4"
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
          </SectionSurface>

          {/* Previous Releases List */}
          {previousReleases.length > 0 && (
            <section>
              <h3 className="text-xl font-bold text-white mb-6">
                Previous Releases
              </h3>

              <div className="space-y-4">
                {previousReleases.map((release) => (
                  <a
                    key={release.id}
                    href={release.releaseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block bg-black/60 backdrop-blur-xl hover:bg-[#0a0a0a]/90 border border-white/10 hover:border-white/20 p-6 rounded-2xl transition-all duration-200"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-l-2 border-transparent group-hover:border-emerald-500 pl-0 sm:group-hover:pl-4 transition-all">
                      <div>
                        <div className="flex flex-wrap items-center gap-3 mb-1.5">
                          <span className="text-lg font-semibold text-neutral-200 group-hover:text-emerald-400 transition-colors">
                            {release.title}
                          </span>
                          <span className="text-xs font-mono text-neutral-400 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded-md">
                            {release.version}
                          </span>
                        </div>
                        <div className="text-sm text-neutral-500 line-clamp-1 group-hover:text-neutral-400 transition-colors">
                          Released by @{release.authorName}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-sm text-neutral-500 whitespace-nowrap">
                        <time dateTime={release.publishedAt}>
                          {formatDate(release.publishedAt)}
                        </time>
                        <svg
                          className="w-5 h-5 text-neutral-600 group-hover:text-emerald-400 transition-colors transform group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-12 text-center">
                <a
                  href="https://github.com/figranium/doppelganger/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-neutral-400 hover:text-emerald-400 transition-colors"
                >
                  View all releases on GitHub
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            </section>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}
