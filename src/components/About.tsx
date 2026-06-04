"use client";

import { CheckCircle2, Layout, Cloud, Container, Zap, Award, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

const aboutCards = [
  {
    icon: Layout,
    title: "Full-Stack Dev",
    desc: "Complete product delivery with state-of-the-art frameworks like Next.js, Node.js, and database layer engines.",
    color: "from-brand-blue/20 to-brand-blue/5",
    glow: "rgba(59,130,246,0.15)",
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    desc: "Bulletproof AWS, GCP, and Azure server setup with auto-scaling capabilities and optimized costs.",
    color: "from-brand-cyan/20 to-brand-cyan/5",
    glow: "rgba(6,182,212,0.15)",
  },
  {
    icon: Container,
    title: "Docker Containerization",
    desc: "Immutable containers guaranteeing your software behaves identically from local test machines to global production.",
    color: "from-brand-violet/20 to-brand-violet/5",
    glow: "rgba(139,92,246,0.15)",
  },
  {
    icon: Zap,
    title: "CI/CD Orchestration",
    desc: "Deploy modifications instantly with GitHub Actions, Gitlab CI, and automated regression testing.",
    color: "from-brand-blue/20 to-brand-blue/5",
    glow: "rgba(59,130,246,0.15)",
  },
  {
    icon: Award,
    title: "AWS Cloud Operations",
    desc: "VPC subnet configurations, secure load balancer rules, and granular IAM user access protocols.",
    color: "from-brand-cyan/20 to-brand-cyan/5",
    glow: "rgba(6,182,212,0.15)",
  },
  {
    icon: ShieldAlert,
    title: "DevSecOps Automation",
    desc: "Automatic SSL installation, network penetration shielding, server firewalls, and active threat monitoring.",
    color: "from-brand-violet/20 to-brand-violet/5",
    glow: "rgba(139,92,246,0.15)",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="absolute right-0 top-1/4 w-[300px] h-[300px] bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Component Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-brand-blue uppercase tracking-wider">
            <span>Our Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            We focus on Client Results, not just compiling code.
          </h2>
          <p className="text-slate-400 font-medium text-sm sm:text-base leading-relaxed">
            Many engineering agencies stop at code compilation. At **DeployForge**, we manage the entire lifecycle. We design beautiful, ultra-high-converting interfaces and implement bulletproof, automated deployment pipelines so you can launch in minutes and scale without breaking.
          </p>
        </div>

        {/* 6 Value Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {aboutCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-2xl border border-slate-800/80 bg-slate-950/40 p-6 backdrop-blur-md transition-all duration-300 hover:border-slate-700/50 hover:bg-slate-900/40 overflow-hidden"
                style={{
                  boxShadow: `0 4px 30px rgba(0, 0, 0, 0.1)`,
                }}
              >
                {/* Glowing effect inside card on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(150px circle at top right, ${card.glow}, transparent 80%)`
                  }}
                />

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900/80 border border-slate-800 text-brand-blue group-hover:text-brand-cyan group-hover:border-brand-blue/30 transition-all duration-300 mb-5">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-brand-blue transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-400 font-medium leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Line banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl bg-gradient-to-r from-navy-dark via-navy-medium to-navy-dark border border-slate-800/80 p-8 text-center overflow-hidden shadow-2xl"
        >
          {/* Subtle gradient light */}
          <div className="absolute inset-0 bg-radial-glow pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            <div className="space-y-1 md:text-left">
              <h4 className="text-2xl font-bold text-white">Trust, delivered.</h4>
              <p className="text-sm text-slate-400 font-medium">We deliver enterprise robustness with startup agility.</p>
            </div>
            
            <div className="h-px w-20 md:h-12 md:w-px bg-slate-800" />

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-10">
              <div className="flex items-center space-x-3 bg-slate-950/60 border border-slate-800/80 px-6 py-3.5 rounded-xl">
                <CheckCircle2 className="h-5.5 w-5.5 text-emerald-400 shrink-0" />
                <span className="text-base font-bold text-slate-200">10+ Projects Delivered</span>
              </div>
              <div className="flex items-center space-x-3 bg-slate-950/60 border border-slate-800/80 px-6 py-3.5 rounded-xl">
                <CheckCircle2 className="h-5.5 w-5.5 text-brand-cyan shrink-0" />
                <span className="text-base font-bold text-slate-200">100% Client Satisfaction</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
