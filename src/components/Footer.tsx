import React from 'react';

export function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-900 pt-20 pb-10 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-4">
            <h6 className="text-white font-bold tracking-widest mb-6 uppercase text-sm">
              FIGRANIUM
            </h6>
            <p className="text-zinc-400 leading-relaxed max-w-xs text-sm">
              Self-hosted automation that keeps your data local, with secure API access when you need it.
            </p>
          </div>
          
          <div className="md:col-span-5">
            <h6 className="text-white font-bold tracking-widest mb-6 uppercase text-sm">
              BLOG
            </h6>
            <ul className="space-y-4">
              {[
                'Leveling Up Figranium: Joining the Mintlify OSS Program',
                'Figranium vs. Automa: The Illusion of the Exact Same Tool',
                'More Than a Name Change: The Evolution from Doppelganger to Figranium',
                'From Sidebar to Infinity: Introducing Figranium v0.9',
                'Figranium v0.8: Deterministic Automation, Now with AI Assistance',
                'Apify Features for Free: Why Browser Automation is Easier Than You Think',
              ].map((post, i) => (
                <li key={i}>
                  <a href="#" onClick={(e) => e.preventDefault()} className="text-zinc-400 hover:text-white transition-colors text-sm block leading-snug">
                    {post}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a href="#" onClick={(e) => e.preventDefault()} className="text-zinc-500 hover:text-white transition-colors text-sm block">
                  View all blog posts
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h6 className="text-white font-bold tracking-widest mb-6 uppercase text-sm">
              NAVIGATE
            </h6>
            <ul className="space-y-4">
              {['Home', 'Docs', 'Templates', 'Discord', 'GitHub'].map((link, i) => (
                <li key={i}>
                  <a href="#" onClick={(e) => e.preventDefault()} className="text-zinc-400 hover:text-white transition-colors text-sm block">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-900 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-600">
          <div>Figranium</div>
          <div>Browser Automation for Everyone</div>
          <div>© 2026 Figranium</div>
        </div>
      </div>
    </footer>
  );
}
