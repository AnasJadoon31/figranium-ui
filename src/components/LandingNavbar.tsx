import React from "react";
import StarIcon from "@mui/icons-material/Star";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmergencyIcon from "@mui/icons-material/Emergency";
import { DiscordIcon } from "./DiscordIcon";

const navLinks = ["DOCS", "BLOG", "TEMPLATES", "RELEASES", "INTEGRATIONS"];

function handleLogoClick() {
  if (window.location.pathname === "/") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  window.location.href = "/";
}

export function LandingNavbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/5 bg-black/80 backdrop-blur-md">
      <button
        onClick={handleLogoClick}
        className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity bg-transparent border-none p-0 m-0"
      >
        <EmergencyIcon sx={{ fontSize: 20, color: "white" }} />
        <span className="font-bold text-lg tracking-tight text-white">
          figranium
        </span>
      </button>

      <div className="hidden md:flex items-center gap-8 text-xs font-medium text-zinc-400">
        {navLinks.map((link) => (
          <a key={link} href="#" className="hover:text-white transition-colors">
            {link}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <a
          href="#"
          className="text-zinc-400 hover:text-white transition-colors"
        >
          <DiscordIcon className="w-5 h-5" />
        </a>
        <a
          href="#"
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 transition-colors rounded-md text-zinc-300"
        >
          <GitHubIcon sx={{ fontSize: 16 }} />
          <span>GITHUB</span>
          <span className="text-zinc-600">|</span>
          <StarIcon sx={{ fontSize: 16 }} />
          <span className="text-zinc-600">|</span>
          <span>405</span>
        </a>
      </div>
    </nav>
  );
}

export default LandingNavbar;
