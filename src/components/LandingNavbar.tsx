import React, { useState, useEffect } from "react";
import StarIcon from "@mui/icons-material/Star";
import GitHubIcon from "@mui/icons-material/GitHub";
import { DiscordIcon } from "./DiscordIcon";
import { Link, useNavigate, useLocation } from "react-router-dom";

const navLinks = ["DOCS", "BLOG", "TEMPLATES", "RELEASES", "INTEGRATIONS"];

export function LandingNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/figranium/figranium")
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.stargazers_count === "number") {
          setStars(data.stargazers_count);
        }
      })
      .catch((err) => console.error("Failed to fetch GitHub stars:", err));
  }, []);

  function handleLogoClick() {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    navigate("/");
  }

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/5 bg-black/80 backdrop-blur-md">
      <button
        onClick={handleLogoClick}
        className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity bg-transparent border-none p-0 m-0"
      >
        <img src="/logo.svg" alt="figranium" className="h-16" />
      </button>

      <div className="hidden md:flex items-center gap-8 text-xs font-medium text-zinc-400">
        {navLinks.map((link) => {
          if (link === "RELEASES" || link === "INTEGRATIONS") {
            return (
              <Link
                key={link}
                to={`/${link.toLowerCase()}`}
                className="hover:text-white transition-colors"
              >
                {link}
              </Link>
            );
          }
          return (
            <a
              key={link}
              href="#"
              className="hover:text-white transition-colors"
            >
              {link}
            </a>
          );
        })}
      </div>

      <div className="flex items-center gap-4">
        <a
          href="https://discord.gg/kPmfbgu9Xn"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-400 hover:text-white transition-colors"
        >
          <DiscordIcon className="w-5 h-5" />
        </a>
        <a
          href="https://github.com/figranium/figranium"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 transition-colors rounded-md text-zinc-300"
        >
          <GitHubIcon sx={{ fontSize: 16 }} />
          <span>GITHUB</span>
          <span className="text-zinc-600">|</span>
          <StarIcon sx={{ fontSize: 16 }} />
          <span className="text-zinc-600">|</span>
          <span>{stars !== null ? stars : "405"}</span>
        </a>
      </div>
    </nav>
  );
}

export default LandingNavbar;
