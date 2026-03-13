import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EmergencyIcon from '@mui/icons-material/Emergency';
import { Capabilities } from './components/Capabilities';
import { UseCases } from './components/UseCases';
import { Modes } from './components/Modes';
import { ApiSection } from './components/ApiSection';
import { BlockBuilder } from './components/BlockBuilder';
import { Footer } from './components/Footer';
import { Typewriter } from './components/Typewriter';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#000000',
      paper: '#0A0A0A',
    },
  },
  typography: {
    fontFamily: 'inherit',
  },
});

// Custom Discord Icon since Lucide doesn't include brand icons
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    className={className}
  >
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
  </svg>
);

export function FigraniumHeroDemo() {
  const [activeTab, setActiveTab] = useState<'editor' | 'terminal'>('editor');
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<{ text: string; color: string }[]>([]);
  const terminalContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const taskJson = `{
  "name": "Extract GitHub Trending",
  "modes": ["block"],
  "actions": [
    {
      "type": "goto",
      "url": "https://github.com/trending"
    },
    {
      "type": "wait",
      "selector": ".Box-row"
    },
    {
      "type": "javascript",
      "code": "return Array.from(document.querySelectorAll('h2 a'))\\n           .map(a => a.innerText.trim()).slice(0, 3);"
    }
  ]
}`;

  const runSimulation = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveTab('terminal');
    setLogs([]);

    const executionSteps = [
      { text: "> npx @doppelgangerdev/doppelganger --task trending.json", delay: 200, color: "text-zinc-300" },
      { text: "[info] Figranium engine starting...", delay: 400, color: "text-zinc-500" },
      { text: "[info] Launching headless browser (Playwright)...", delay: 600, color: "text-zinc-500" },
      { text: "[action] Executing block 1: GOTO https://github.com/trending", delay: 800, color: "text-blue-400" },
      { text: "[action] Executing block 2: WAIT for selector .Box-row", delay: 1200, color: "text-blue-400" },
      { text: "[action] Executing block 3: JAVASCRIPT extraction", delay: 500, color: "text-blue-400" },
      { text: "[success] Task completed in 1.4s.", delay: 300, color: "text-green-400" },
      { text: "Result:", delay: 200, color: "text-zinc-300" },
      { text: '[\n  "figranium/figranium",\n  "facebook/react",\n  "vercel/next.js"\n]', delay: 100, color: "text-green-300" }
    ];

    for (const step of executionSteps) {
      await new Promise(resolve => setTimeout(resolve, step.delay));
      setLogs(prev => [...prev, { text: step.text, color: step.color }]);
    }
    setIsRunning(false);
  };

  function syntaxHighlight(json: string) {
    let colored = json.replace(/"(.*?)"(?=:)/g, '<span class="text-blue-300">"$1"</span>');
    colored = colored.replace(/:\s"(.*?)"/g, ': <span class="text-green-300">"$1"</span>');
    colored = colored.replace(/\[|\]|\{|\}/g, '<span class="text-zinc-500">$&</span>');
    return colored;
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-16 bg-[#0A0A0A] border border-zinc-800 rounded-xl shadow-2xl overflow-hidden font-mono text-sm relative z-10 text-left">
      <div className="flex items-center justify-between px-4 py-3 bg-[#111111] border-b border-zinc-800">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('editor')}
            className={`transition-colors ${activeTab === 'editor' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            trending.json
          </button>
          <button
            onClick={() => setActiveTab('terminal')}
            className={`transition-colors ${activeTab === 'terminal' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            Terminal
          </button>
        </div>
        <div>
          <button
            onClick={runSimulation}
            disabled={isRunning}
            className="px-3 py-1 text-xs font-sans font-medium text-black bg-white rounded-md hover:bg-zinc-200 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isRunning ? (
              <span className="animate-pulse">Running...</span>
            ) : (
              "Run Task"
            )}
          </button>
        </div>
      </div>
      <div className="relative h-80 w-full bg-[#0A0A0A] overflow-hidden">
        {activeTab === 'editor' ? (
          <div className="p-6 text-zinc-300 overflow-y-auto h-full w-full">
            <pre className="font-mono leading-relaxed text-sm">
              <code dangerouslySetInnerHTML={{ __html: syntaxHighlight(taskJson) }} />
            </pre>
          </div>
        ) : (
          <div ref={terminalContainerRef} className="p-6 overflow-y-auto h-full w-full flex flex-col gap-2">
            {logs.length === 0 && !isRunning && (
              <div className="text-zinc-600">Click "Run Task" to execute the automation block...</div>
            )}
            {logs.map((log, index) => (
              <div key={index} className={`whitespace-pre-wrap ${log.color}`}>
                {log.text}
              </div>
            ))}
            {isRunning && <div className="text-zinc-500 animate-pulse mt-2">_</div>}
          </div>
        )}
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30 relative overflow-clip">
        {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex justify-center items-start pt-32 z-0">
        <div className="w-[800px] h-[400px] bg-white/[0.03] blur-[120px] rounded-full" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/5 bg-black/80 backdrop-blur-md">
        {/* Logo */}
        <button 
          onClick={() => {
            if (window.location.pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              window.location.href = '/';
            }
          }}
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity bg-transparent border-none p-0 m-0"
        >
          <EmergencyIcon sx={{ fontSize: 20, color: 'white' }} />
          <span className="font-bold text-lg tracking-tight text-white">figranium</span>
        </button>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-medium text-zinc-400">
          <a href="#" className="hover:text-white transition-colors">DOCS</a>
          <a href="#" className="hover:text-white transition-colors">BLOG</a>
          <a href="#" className="hover:text-white transition-colors">TEMPLATES</a>
          <a href="#" className="hover:text-white transition-colors">RELEASES</a>
          <a href="#" className="hover:text-white transition-colors">INTEGRATIONS</a>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <a href="#" className="text-zinc-400 hover:text-white transition-colors">
            <DiscordIcon className="w-5 h-5" />
          </a>
          <a href="#" className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 transition-colors rounded-md text-zinc-300">
            <GitHubIcon sx={{ fontSize: 16 }} />
            <span>GITHUB</span>
            <span className="text-zinc-600">|</span>
            <StarIcon sx={{ fontSize: 16 }} />
            <span className="text-zinc-600">|</span>
            <span>405</span>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center px-6 pt-32 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6">
            Browser automation <br className="hidden md:block" /> for <Typewriter words={["hobbyist", "enterprises", "teams", "developers", "freelancers"]} />
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Figranium runs on your hardware while giving you the power of a visual builder with block-based actions, optional JavaScript, and a secure API.
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
