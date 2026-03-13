import React from 'react';
import { motion } from 'motion/react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const useCases = [
  {
    title: 'Lead Generation',
    desc: 'Extract structured contacts from directories and LinkedIn.',
  },
  {
    title: 'Price Monitoring',
    desc: 'Track competitor pricing across multiple e-commerce sites.',
  },
  {
    title: 'Automated Testing',
    desc: 'Run end-to-end browser tests on your staging environments.',
  },
  {
    title: 'Data Entry',
    desc: 'Move data between internal tools without an API.',
  },
];

export function UseCases() {
  return (
    <section className="py-32 px-6 max-w-5xl mx-auto relative z-10 border-t border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <span className="text-zinc-500 font-medium tracking-[0.2em] mb-4 block text-xs uppercase">
            USE CASES
          </span>
          <h3 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Automate the web, <br /> your way.
          </h3>
          <p className="text-zinc-400 mb-8 leading-relaxed text-lg">
            From simple scraping to complex multi-step workflows, Figranium handles it all locally.
          </p>
          <button className="text-white font-medium flex items-center gap-2 hover:text-zinc-300 transition-colors group">
            See all templates
            <ArrowForwardIcon sx={{ fontSize: 16 }} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {useCases.map((useCase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-6 rounded-xl border-b border-white/5 hover:bg-white/[0.02] transition-colors group cursor-pointer"
            >
              <h6 className="text-zinc-100 font-semibold mb-2 tracking-tight group-hover:text-white transition-colors">
                {useCase.title}
              </h6>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {useCase.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
