"use client";

import { useState } from "react";
import { 
  Code, 
  Terminal, 
  Database, 
  Layers, 
  Cpu, 
  Workflow, 
  Network, 
  Cloud,
  FileCode,
  HardDrive
} from "lucide-react";
import { motion } from "framer-motion";

const techItems = [
  { name: "React", category: "Frontend", icon: Code, desc: "Interactive UI Library", color: "text-[#61dafb] border-[#61dafb]/20 bg-[#61dafb]/5" },
  { name: "Next.js", category: "Meta-Framework", icon: Layers, desc: "Server-rendered Core Engine", color: "text-white border-slate-700 bg-slate-900/30" },
  { name: "Node.js", category: "Backend Runtime", icon: Terminal, desc: "High-throughput APIs", color: "text-[#68a063] border-[#68a063]/20 bg-[#68a063]/5" },
  { name: "Docker", category: "Containerization", icon: Cpu, desc: "Immutable Dev Containers", color: "text-[#2496ed] border-[#2496ed]/20 bg-[#2496ed]/5" },
  { name: "AWS", category: "Cloud Host", icon: Cloud, desc: "Auto-scalable EC2, ECS, VPC", color: "text-[#ff9900] border-[#ff9900]/20 bg-[#ff9900]/5" },
  { name: "GitHub Actions", category: "CI/CD Automator", icon: Workflow, desc: "Automatic Tests & Deployment", color: "text-[#2088ff] border-[#2088ff]/20 bg-[#2088ff]/5" },
  { name: "MongoDB", category: "NoSQL DB", icon: Database, desc: "Document storage layers", color: "text-[#47a248] border-[#47a248]/20 bg-[#47a248]/5" },
  { name: "PostgreSQL", category: "Relational DB", icon: HardDrive, desc: "Strict transactional database", color: "text-[#336791] border-[#336791]/20 bg-[#336791]/5" },
  { name: "Nginx", category: "Reverse Proxy", icon: Network, desc: "Caching & SSL proxy layers", color: "text-[#009639] border-[#009639]/20 bg-[#009639]/5" },
  { name: "Linux", category: "Operating System", icon: FileCode, desc: "Secure host kernels", color: "text-[#f8c02c] border-[#f8c02c]/20 bg-[#f8c02c]/5" }
];

export default function TechStack() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="tech-stack" className="py-24 relative overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="absolute left-0 bottom-1/4 w-[350px] h-[350px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-brand-blue uppercase tracking-wider">
            <span>Stack Toolkit</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Our Battle-Tested Technology Stack
          </h2>
          <p className="text-slate-400 font-medium text-sm sm:text-base leading-relaxed">
            We use stable, industry-standard modern systems that ensure rapid load times, flexible API layers, and highly reproducible cloud infrastructure.
          </p>
        </div>

        {/* 10 Stack Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {techItems.map((tech, index) => {
            const Icon = tech.icon;
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative group rounded-xl border p-5 backdrop-blur-md transition-all duration-300 select-none flex flex-col items-center text-center justify-between h-[155px] ${
                  isHovered 
                    ? "border-brand-blue/40 bg-slate-900/50 shadow-[0_0_20px_rgba(59,130,246,0.15)] -translate-y-1"
                    : "border-slate-800/80 bg-slate-950/40"
                }`}
              >
                {/* Tech icon */}
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900/80 border border-slate-850 transition-all duration-300 ${tech.color}`}>
                  <Icon className="h-5.5 w-5.5 animate-pulse-slow" />
                </div>

                {/* Tech Name */}
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white tracking-tight">{tech.name}</h3>
                  <p className="text-[10px] font-medium text-slate-500">{tech.category}</p>
                </div>

                {/* Custom glowing background behind active tech */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl bg-[radial-gradient(80px_circle_at_center,rgba(59,130,246,0.06),transparent_80%)]" 
                />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
