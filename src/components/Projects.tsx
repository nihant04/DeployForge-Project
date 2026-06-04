"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const projectCategories = ["All", "Full-Stack", "Cloud & DevOps"];

const projects = [
  {
    title: "CyberSuraksha",
    category: "Cloud & DevOps",
    desc: "A defense-grade, comprehensive cybersecurity ecosystem bridging the gap between citizens, law enforcement, and legal aid. Houses a Voice FIR engine, client-side diagnostics scanners, and live geospatial threat mapping.",
    tags: ["Next.js 16", "Supabase", "PostgreSQL", "Tailwind v4", "Leaflet"],
    demoLink: "https://v0-cybersuraksha-landing-page.vercel.app/",
    // Custom premium vector mockup mimicking CyberSuraksha threat shield & waveform
    mockup: (
      <svg className="w-full h-full" viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="220" rx="12" fill="#030712" />
        {/* Terminal Header */}
        <rect x="15" y="15" width="8" height="8" rx="4" fill="#ef4444" />
        <rect x="27" y="15" width="8" height="8" rx="4" fill="#f59e0b" />
        <rect x="39" y="15" width="8" height="8" rx="4" fill="#10b981" />
        <line x1="15" y1="35" x2="385" y2="35" stroke="#1e293b" strokeWidth="1" />
        
        {/* Shield outline */}
        <path d="M200 50 C215 50 250 55 250 90 C250 120 200 140 200 145 C200 140 150 120 150 90 C150 55 185 50 200 50 Z" stroke="#3b82f6" strokeWidth="2" fill="#0d1527" />
        <circle cx="200" cy="95" r="22" fill="#030712" stroke="#06b6d4" strokeWidth="1.5" className="animate-pulse" />
        <path d="M194 95 L198 99 L208 89" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Multilingual Voice wave line */}
        <path d="M80 170 Q 95 140, 110 170 T 140 170 T 170 170 T 200 170 T 230 170 T 260 170 T 290 170 T 320 170" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <text x="140" y="195" fill="#64748b" fontSize="9" fontFamily="monospace">Voice FIR Decryptor: Online</text>
        <text x="20" y="60" fill="#94a3b8" fontSize="8" fontFamily="monospace">STATUS: ARMED</text>
        <text x="310" y="60" fill="#10b981" fontSize="8" fontFamily="monospace">GEO SCAN: OK</text>
      </svg>
    )
  },
  {
    title: "JavaScript Escape Room",
    category: "Full-Stack",
    desc: "A logic-driven coding game designed to teach JavaScript and frontend principles through an immersive escape-room experience. Architecture is split into decoupled micro-repositories to model clean separations.",
    tags: ["Node.js", "Express", "MongoDB", "JWT Auth", "Vanilla JS"],
    demoLink: "https://landingpage-xi-flax.vercel.app/",
    // Custom coding puzzle terminal mockup
    mockup: (
      <svg className="w-full h-full" viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="220" rx="12" fill="#0b0f19" />
        <rect x="15" y="15" width="8" height="8" rx="4" fill="#ef4444" />
        <rect x="27" y="15" width="8" height="8" rx="4" fill="#f59e0b" />
        <rect x="39" y="15" width="8" height="8" rx="4" fill="#10b981" />
        <line x1="15" y1="35" x2="385" y2="35" stroke="#1e293b" strokeWidth="1" />

        {/* Lock indicator */}
        <rect x="20" y="55" width="130" height="145" rx="8" fill="#151f32" stroke="#1e293b" />
        <text x="30" y="75" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="sans-serif">System Encryption</text>
        <rect x="35" y="90" width="100" height="40" rx="6" fill="#0b0f19" stroke="#ef4444" strokeWidth="1" />
        <text x="45" y="114" fill="#ef4444" fontSize="14" fontWeight="bold" fontFamily="monospace">🔒 LOCKED</text>
        <text x="42" y="160" fill="#94a3b8" fontSize="10" fontFamily="sans-serif">Timer: </text>
        <text x="75" y="161" fill="#f59e0b" fontSize="12" fontWeight="bold" fontFamily="monospace">08:42.15</text>

        {/* Javascript block lines */}
        <rect x="165" y="55" width="215" height="145" rx="8" fill="#05070d" stroke="#1e293b" />
        <text x="175" y="75" fill="#3b82f6" fontSize="10" fontFamily="monospace">function escapeRoom(key) &#123;</text>
        <text x="190" y="95" fill="#f59e0b" fontSize="10" fontFamily="monospace">if (key === &quot;JS_CODE&quot;) &#123;</text>
        <text x="205" y="115" fill="#10b981" fontSize="10" fontFamily="monospace">unlockDoor();</text>
        <text x="205" y="135" fill="#94a3b8" fontSize="10" fontFamily="monospace">return true;</text>
        <text x="190" y="155" fill="#f59e0b" fontSize="10" fontFamily="monospace">&#125;</text>
        <text x="175" y="175" fill="#3b82f6" fontSize="10" fontFamily="monospace">&#125;</text>
      </svg>
    )
  },
  {
    title: "Institute Management System (IMS)",
    category: "Full-Stack",
    desc: "A modern institutional portal digitizing workflows for Students, Faculty, and Admin. Handles attendance metrics, auto-generated reports, role-based controls (RBAC), and multi-level certificate request approvals.",
    tags: ["React", "Vite", "Node.js", "MongoDB", "Docker", "Nginx"],
    demoLink: "https://institutemanagement-alpha.vercel.app",
    // Custom administration dashboard mockup
    mockup: (
      <svg className="w-full h-full" viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="220" rx="12" fill="#090d16" />
        <rect x="15" y="15" width="8" height="8" rx="4" fill="#ef4444" />
        <rect x="27" y="15" width="8" height="8" rx="4" fill="#f59e0b" />
        <rect x="39" y="15" width="8" height="8" rx="4" fill="#10b981" />
        <line x1="15" y1="35" x2="385" y2="35" stroke="#1e293b" strokeWidth="1" />
        
        {/* Attendance stats */}
        <rect x="20" y="50" width="110" height="60" rx="8" fill="#111827" stroke="#1e293b" />
        <text x="30" y="70" fill="#94a3b8" fontSize="10" fontFamily="sans-serif">Attendance Avg</text>
        <text x="30" y="95" fill="#10b981" fontSize="18" fontWeight="bold" fontFamily="sans-serif">87.5%</text>

        {/* Requests status */}
        <rect x="145" y="50" width="110" height="60" rx="8" fill="#111827" stroke="#1e293b" />
        <text x="155" y="70" fill="#94a3b8" fontSize="10" fontFamily="sans-serif">Active Requests</text>
        <text x="155" y="95" fill="#3b82f6" fontSize="18" fontWeight="bold" fontFamily="sans-serif">4 Pending</text>

        {/* Portals tags */}
        <rect x="270" y="50" width="110" height="60" rx="8" fill="#111827" stroke="#1e293b" />
        <text x="280" y="70" fill="#94a3b8" fontSize="10" fontFamily="sans-serif">Active Portals</text>
        <text x="280" y="95" fill="#8b5cf6" fontSize="16" fontWeight="bold" fontFamily="sans-serif">Student/Admin</text>

        {/* Approvals table grid */}
        <rect x="20" y="125" width="360" height="75" rx="8" fill="#04060b" stroke="#1e293b" />
        <text x="30" y="145" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Request Approvals Pipeline</text>
        <text x="30" y="165" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">Bonafide Cert - ID: #1042</text>
        <rect x="290" y="155" width="55" height="14" rx="7" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="0.5" />
        <text x="302" y="165" fill="#10b981" fontSize="7" fontWeight="bold" fontFamily="sans-serif">APPROVED</text>

        <text x="30" y="185" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">Leave App - ID: #1043</text>
        <rect x="290" y="175" width="55" height="14" rx="7" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="0.5" />
        <text x="304" y="185" fill="#f59e0b" fontSize="7" fontWeight="bold" fontFamily="sans-serif">PENDING</text>
      </svg>
    )
  }
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProjects = activeTab === "All" 
    ? projects 
    : projects.filter(p => p.category === activeTab);

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-background">
      {/* Decorative neon lights */}
      <div className="absolute right-0 top-10 w-[300px] h-[300px] bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-brand-blue uppercase tracking-wider">
            <span>Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Our Proven Cloud & Software Records
          </h2>
          <p className="text-slate-400 font-medium text-sm sm:text-base leading-relaxed">
            Take a look at some of the customized production platforms we have built and deployed for global startups and local clinics.
          </p>
        </div>

        {/* Tab filters */}
        <div className="flex items-center justify-center space-x-2.5 mb-16">
          {projectCategories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                activeTab === tab 
                  ? "bg-slate-900 border-brand-blue/50 text-white shadow-[0_0_15px_rgba(59,130,246,0.15)]" 
                  : "bg-slate-950/20 border-slate-850 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Filtered Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-950/40 p-6 backdrop-blur-md transition-all duration-300 hover:border-slate-700/50 hover:bg-slate-900/20 overflow-hidden shadow-xl"
              >
                <div>
                  {/* Dashboard Mockup Representation */}
                  <div className="relative rounded-xl border border-slate-800/80 bg-slate-950 overflow-hidden mb-6 select-none shadow-inner aspect-[16/9]">
                    {project.mockup}
                    {/* Hover visual scanlines or dark layer */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-100 pointer-events-none" />
                  </div>

                  {/* Project Details */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-white tracking-tight group-hover:text-brand-blue transition-colors">
                        {project.title}
                      </h3>
                      <span className="inline-flex items-center px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono font-bold text-slate-400 uppercase">
                        {project.category}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-slate-400 leading-relaxed">
                      {project.desc}
                    </p>
                  </div>
                </div>

                {/* Tech tags and CTA button actions */}
                <div className="pt-6 mt-6 border-t border-slate-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="text-[9px] font-bold font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800/80 text-brand-cyan/90"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="flex items-center space-x-3 shrink-0">
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center h-8.5 px-3.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-brand-blue to-brand-cyan hover:opacity-90 transition-all duration-300 shadow-[0_0_10px_rgba(59,130,246,0.2)]"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                    </a>
                  </div>
                </div>

                {/* Radial Glow underneath cards on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl bg-[radial-gradient(150px_circle_at_bottom_right,rgba(59,130,246,0.05),transparent_80%)]" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
