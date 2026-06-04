"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Play, RotateCcw, Terminal as TerminalIcon, Cloud, Cpu, ShieldCheck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const terminalLogs = [
  { text: "$ deployforge deploy --env=production", delay: 300, type: "cmd" },
  { text: "[info] Parsing configurations & dependencies...", delay: 800, type: "info" },
  { text: "[info] Compiling Next.js application (Serverless Mode)...", delay: 1000, type: "info" },
  { text: "[success] Client bundle built: 142.4 KB (gzip)", delay: 800, type: "success" },
  { text: "[info] Containerizing project via Dockerfile...", delay: 900, type: "info" },
  { text: "[info] Pushing container to AWS Elastic Container Registry (ECR)...", delay: 1200, type: "info" },
  { text: "[info] Triggering Terraform Cloud Provisioning...", delay: 800, type: "info" },
  { text: "[info] Setting up Amazon ECS task definition & VPC route tables...", delay: 1000, type: "info" },
  { text: "[success] SSL certificate verified & attached (instant https)", delay: 700, type: "success" },
  { text: "[success] Health Check PASSED: 200 OK (latency: 18ms)", delay: 600, type: "success" },
  { text: "[success] DeployForge pipeline complete! App live globally.", delay: 500, type: "highlight" },
  { text: "https://production.deployforge.in", delay: 200, type: "link" }
];

export default function Hero() {
  const [logs, setLogs] = useState<typeof terminalLogs>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Trigger terminal simulation
  useEffect(() => {
    if (!isRunning) return;

    const timer = setTimeout(() => {
      setLogs((prev) => [...prev, terminalLogs[currentStep]]);
      if (currentStep + 1 >= terminalLogs.length) {
        setIsRunning(false);
      } else {
        setCurrentStep((prev) => prev + 1);
      }
    }, terminalLogs[currentStep].delay);

    return () => clearTimeout(timer);
  }, [isRunning, currentStep]);

  // Scroll to bottom of terminal when logs print
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const startSimulation = () => {
    setLogs([]);
    setCurrentStep(0);
    setIsRunning(true);
  };

  const resetSimulation = () => {
    setLogs([]);
    setCurrentStep(0);
    setIsRunning(false);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Dynamic Futuristic Grid Layer */}
      <div className="absolute inset-0 grid-overlay z-0 pointer-events-none" />

      {/* Decorative Radial Lights */}
      <div className="absolute top-[10%] left-[5%] w-[350px] h-[350px] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-brand-purple/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text / Info Panel */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Startup Tag / Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
            >
              <span className="flex h-2 w-2 rounded-full bg-brand-cyan animate-ping" />
              <span className="text-xs font-bold uppercase tracking-widest text-brand-cyan">
                DevOps & Full-Stack Studio
              </span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="block"
              >
                Build.
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="block bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-violet bg-clip-text text-transparent"
              >
                Deploy. Scale.
              </motion.span>
            </h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg text-slate-400 font-medium max-w-xl mx-auto lg:mx-0"
            >
              From Code to Cloud — Development to Deployment. We craft cutting-edge full-stack web applications and robust cloud infrastructure to scale your business with zero downtime.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <Link
                href="/contact"
                className="w-full sm:w-auto flex items-center justify-center px-8 py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-brand-blue to-brand-cyan hover:opacity-95 shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all group"
              >
                Start a Project
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/projects"
                className="w-full sm:w-auto flex items-center justify-center px-8 py-4 rounded-xl text-sm font-bold text-slate-300 bg-slate-900/60 border border-slate-800 hover:border-slate-700 hover:text-white transition-all backdrop-blur-sm"
              >
                View Our Work
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="pt-8 grid grid-cols-3 gap-4 border-t border-slate-900 max-w-md mx-auto lg:mx-0"
            >
              <div className="flex items-center space-x-2 text-slate-400">
                <Cloud className="h-4.5 w-4.5 text-brand-blue" />
                <span className="text-xs font-semibold">AWS & Vercel</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <Cpu className="h-4.5 w-4.5 text-brand-cyan" />
                <span className="text-xs font-semibold">Docker CI/CD</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <ShieldCheck className="h-4.5 w-4.5 text-brand-violet" />
                <span className="text-xs font-semibold">99.9% Uptime</span>
              </div>
            </motion.div>
          </div>

          {/* Right Dashboard / Interactive Terminal Mockup */}
          <div className="lg:col-span-5 w-full relative">
            {/* Ambient shadow glow around dashboard mockup */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/15 to-brand-purple/5 rounded-2xl blur-[40px] pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-full relative z-10 rounded-2xl terminal-window border border-slate-800 overflow-hidden"
            >
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-950/90 border-b border-slate-900">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/70" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
                  <div className="h-3 w-3 rounded-full bg-green-500/70" />
                </div>
                <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-mono">
                  <TerminalIcon className="h-3.5 w-3.5 text-brand-blue" />
                  <span>pipeline.sh — deployforge</span>
                </div>
                <div className="w-12" /> {/* spacer */}
              </div>

              {/* Terminal Screen Console */}
              <div 
                ref={logContainerRef}
                className="h-[300px] p-5 font-mono text-xs overflow-y-auto space-y-2 bg-slate-950/70 select-none scrollbar-thin"
              >
                {logs.length === 0 && !isRunning && (
                  <div className="text-slate-500 flex flex-col items-center justify-center h-full space-y-3">
                    <TerminalIcon className="h-8 w-8 text-slate-700 animate-bounce" />
                    <p className="text-center text-sm font-semibold">{"Click \"Run Pipeline\" to simulate a deployment"}</p>
                  </div>
                )}

                {logs.map((log, index) => (
                  <div key={index} className="leading-relaxed">
                    {log.type === "cmd" && (
                      <span className="text-brand-cyan font-bold">{log.text}</span>
                    )}
                    {log.type === "info" && (
                      <span className="text-slate-300">{log.text}</span>
                    )}
                    {log.type === "success" && (
                      <span className="text-emerald-400 font-semibold">{log.text}</span>
                    )}
                    {log.type === "highlight" && (
                      <span className="text-yellow-400 font-bold bg-yellow-950/20 px-1 py-0.5 rounded">{log.text}</span>
                    )}
                    {log.type === "link" && (
                      <a 
                        href="#" 
                        onClick={(e) => e.preventDefault()} 
                        className="text-brand-blue hover:text-brand-cyan underline font-semibold transition-colors duration-200"
                      >
                        {log.text}
                      </a>
                    )}
                  </div>
                ))}
                
                {isRunning && (
                  <div className="inline-block">
                    <span className="terminal-cursor" />
                  </div>
                )}
              </div>

              {/* Interactive Control Console */}
              <div className="flex items-center justify-between px-5 py-4 bg-slate-950/90 border-t border-slate-900">
                <button
                  onClick={startSimulation}
                  disabled={isRunning}
                  className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    isRunning 
                      ? "bg-slate-900 border border-slate-800 text-slate-500 cursor-not-allowed" 
                      : "bg-brand-blue/15 hover:bg-brand-blue/20 text-brand-blue border border-brand-blue/30"
                  }`}
                >
                  <Play className="h-3.5 w-3.5" />
                  <span>Run Pipeline</span>
                </button>

                <button
                  onClick={resetSimulation}
                  className="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset Console</span>
                </button>
              </div>
            </motion.div>

            {/* Custom visual float graphics (Cloud & Docker logo styling overlays) */}
            <div className="absolute -top-6 -right-6 h-12 w-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-brand-blue shadow-lg animate-float-slow hidden md:flex">
              <Cloud className="h-6 w-6" />
            </div>
            <div className="absolute -bottom-6 -left-6 h-12 w-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-brand-cyan shadow-lg animate-float-delayed hidden md:flex">
              <Cpu className="h-6 w-6" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
