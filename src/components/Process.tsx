"use client";

import { useState } from "react";
import { 
  FileSearch, 
  Paintbrush, 
  Code2, 
  Cpu, 
  FileCheck, 
  Rocket, 
  Wrench, 
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    id: "requirements",
    number: "01",
    title: "Requirement Analysis",
    short: "Analyze scope & cloud stacks",
    icon: FileSearch,
    details: "We start by deeply analyzing your business requirements, user personas, and throughput needs to select the most optimal cloud host and front-end architectures.",
    deliverables: [
      "Technical specifications brief",
      "Detailed cloud resource blueprint",
      "Exact project delivery roadmap",
    ],
  },
  {
    id: "uiux",
    number: "02",
    title: "UI/UX Planning",
    short: "Wireframe & design tokens",
    icon: Paintbrush,
    details: "We craft stunning layouts in Figma that mirror modern SaaS aesthetics (dark grids, clear contrast, glassmorphism) tailored for high user conversion.",
    deliverables: [
      "High-fidelity interactive prototype",
      "Tailwind typography & custom CSS design tokens",
      "Full responsive mobile wireframe validation",
    ],
  },
  {
    id: "development",
    number: "03",
    title: "Development",
    short: "Write core code assets",
    icon: Code2,
    details: "We write clean, semantic React, Next.js, and TypeScript code, establishing structured database connections and fast local API routes.",
    deliverables: [
      "Fully responsive front-end pages",
      "Secure and optimized API route architecture",
      "TypeScript interfaces & modular data schemas",
    ],
  },
  {
    id: "devops",
    number: "04",
    title: "DevOps Integration",
    short: "Dockerize & build pipelines",
    icon: Cpu,
    details: "We containerize the project with Docker and build custom GitHub Actions or GitLab pipelines to automate all testing and compilation cycles.",
    deliverables: [
      "Optimized production Dockerfiles",
      "Automated CI/CD YAML configuration scripts",
      "Terraform cloud environment provisioning files",
    ],
  },
  {
    id: "testing",
    number: "05",
    title: "Testing & Audits",
    short: "Quality assurance audits",
    icon: FileCheck,
    details: "We conduct end-to-end user testing, load checking, API integrity tests, and strict system security audits to prevent cross-site scripting or database injection.",
    deliverables: [
      "Automated regression test reports",
      "Performance score audit (>90 Google Lighthouse)",
      "SSL, SSH, and server firewall validation",
    ],
  },
  {
    id: "deployment",
    number: "06",
    title: "Deployment",
    short: "Go live globally",
    icon: Rocket,
    details: "We launch your application live on secure subnets using AWS, Vercel, or custom servers, linking custom domains and enabling live logging.",
    deliverables: [
      "Zero-downtime rolling container releases",
      "Custom DNS & HTTPS configurations",
      "Production deployment verification checklist",
    ],
  },
  {
    id: "maintenance",
    number: "07",
    title: "Maintenance",
    short: "24/7 site health alerts",
    icon: Wrench,
    details: "We stay on guard with active performance alerts, server backups, software dependency updates, and immediate troubleshooting to maintain a 99.9% uptime.",
    deliverables: [
      "Automated hourly database backup rules",
      "Continuous server load & latency monitoring",
      "Guaranteed sprint response times for bugfixes",
    ],
  },
];

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="py-24 relative overflow-hidden bg-background">
      {/* Decorative background grid mesh and light */}
      <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-brand-violet/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-brand-blue uppercase tracking-wider">
            <span>Our Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            From Blueprint to Cloud: The Pipeline
          </h2>
          <p className="text-slate-400 font-medium text-sm sm:text-base leading-relaxed">
            Click on any phase of our automated software delivery cycle to inspect exact deliverables and deliverables we bring to your project.
          </p>
        </div>

        {/* Horizontal Timeline Timeline Nav */}
        <div className="relative mb-12 pb-4 overflow-x-auto scrollbar-thin select-none">
          {/* Connecting Track Line */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-slate-900 -translate-y-1/2 z-0 hidden lg:block" />
          
          {/* Active Connector Progress */}
          <div 
            className="absolute top-1/2 left-0 h-[2px] bg-gradient-to-r from-brand-blue to-brand-cyan -translate-y-1/2 z-0 transition-all duration-500 hidden lg:block" 
            style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
          />

          <div className="flex lg:justify-between items-center space-x-8 lg:space-x-0 min-w-[900px] px-4 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;
              const isPassed = activeStep > index;

              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className="flex flex-col items-center text-center space-y-3 group focus:outline-none transition-all"
                >
                  {/* Outer ring */}
                  <div 
                    className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                      isActive 
                        ? "border-brand-blue bg-slate-950 text-brand-blue shadow-[0_0_15px_rgba(59,130,246,0.4)]" 
                        : isPassed
                          ? "border-brand-cyan bg-slate-900 text-brand-cyan"
                          : "border-slate-800 bg-slate-950 text-slate-500 group-hover:border-slate-700 group-hover:text-slate-300"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  
                  {/* Step Info label */}
                  <div>
                    <div className={`text-[10px] font-mono tracking-widest uppercase transition-colors ${
                      isActive ? "text-brand-cyan" : "text-slate-500"
                    }`}>
                      Step {step.number}
                    </div>
                    <div className={`text-xs font-bold transition-colors ${
                      isActive ? "text-white" : "text-slate-400 group-hover:text-white"
                    }`}>
                      {step.title}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Step Detail Panel (Glassmorphic) */}
        <div className="relative max-w-4xl mx-auto z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-slate-800/80 bg-slate-950/50 backdrop-blur-md p-8 shadow-2xl relative overflow-hidden"
            >
              {/* Orb backing inside detail box */}
              <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-brand-blue/5 rounded-full blur-[50px] pointer-events-none" />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                {/* Left block - Summary info */}
                <div className="md:col-span-6 space-y-4">
                  <div className="flex items-center space-x-3 text-brand-cyan font-mono text-xs tracking-wider">
                    <span>PHASE {steps[activeStep].number}</span>
                    <ChevronRight className="h-3 w-3" />
                    <span>ACTIVE PIPELINE</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {steps[activeStep].title}
                  </h3>
                  <p className="text-sm font-medium text-slate-400 leading-relaxed">
                    {steps[activeStep].details}
                  </p>
                </div>

                {/* Right block - Deliverable Checklist */}
                <div className="md:col-span-6 space-y-4 bg-slate-900/40 border border-slate-800/50 rounded-xl p-5">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Key Deliverables</h4>
                  <ul className="space-y-3">
                    {steps[activeStep].deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-3 text-xs">
                        <div className="flex h-5 w-5 items-center justify-center rounded bg-brand-blue/10 border border-brand-blue/20 text-brand-cyan shrink-0">
                          <span className="font-mono text-[9px] font-extrabold">{idx + 1}</span>
                        </div>
                        <span className="text-slate-300 font-semibold leading-normal">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
