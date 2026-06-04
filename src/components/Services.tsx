"use client";

import { 
  Code, 
  AppWindow, 
  GitMerge, 
  Boxes, 
  CloudLightning, 
  ShieldCheck, 
  Cpu, 
  Activity 
} from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: Code,
    title: "Full-Stack Development",
    benefit: "Launch feature-complete, modern web apps built to scale.",
    description: "End-to-end development using React, Next.js, Node.js, and modern databases. We build secure, interactive, and ultra-fast web systems.",
  },
  {
    icon: AppWindow,
    title: "Custom Business Apps",
    benefit: "Streamline your internal operations with tailored workflows.",
    description: "Replace messy spreadsheets with clean, high-performance dashboards, user-role portals, and custom reporting pipelines built for your exact needs.",
  },
  {
    icon: GitMerge,
    title: "DevOps & CI/CD",
    benefit: "Ship updates hourly with Zero-Downtime automated deployments.",
    description: "Automate code testing and staging releases. Rest easy knowing new code rolls out safely with automatic rollbacks on test failure.",
  },
  {
    icon: Boxes,
    title: "Docker & Containerization",
    benefit: "Ensure identical environments from local dev to production.",
    description: "Package your applications into lightweight Docker containers to eliminate 'works on my machine' bugs and optimize server utilization.",
  },
  {
    icon: CloudLightning,
    title: "Cloud Deployment",
    benefit: "Achieve 99.9% availability on AWS, GCP, or modern serverless clouds.",
    description: "Host your sites with optimal security, redundant failovers, CDN caching, and automated backups on major cloud platforms.",
  },
  {
    icon: ShieldCheck,
    title: "Server Management",
    benefit: "Secure, patched, and highly optimized server configurations.",
    description: "Harden Linux servers, configure reverse proxies (Nginx), set up SSL configurations, and apply automated OS-level security patches.",
  },
  {
    icon: Cpu,
    title: "Infrastructure Automation",
    benefit: "Define your servers in code with Terraform for instant replication.",
    description: "Manage your complex infrastructure as code. Deploy, destroy, or duplicate your entire server topography in a single terminal command.",
  },
  {
    icon: Activity,
    title: "Maintenance & Monitoring",
    benefit: "Rest easy with 24/7 uptime monitoring and active support.",
    description: "Integrate alerts that ping when servers load, track memory leaks, and benefit from ongoing support to keep your app running smoothly.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 relative overflow-hidden bg-background">
      {/* Visual neon orb behind header */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[500px] h-[250px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-brand-blue uppercase tracking-wider">
            <span>Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            What We Do — Engineering Built for Value
          </h2>
          <p className="text-slate-400 font-medium text-sm sm:text-base leading-relaxed">
            {"We don't just supply raw hours. We build production pipelines that deliver high uptime, rapid page loads, and continuous security audits, keeping your business running around the clock."}
          </p>
        </div>

        {/* 8 Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative rounded-2xl border border-slate-800/80 bg-slate-950/40 p-6 backdrop-blur-md transition-all duration-300 hover:border-brand-blue/30 hover:bg-slate-900/30 overflow-hidden flex flex-col justify-between"
              >
                {/* Custom Gradient Glow border indicator on card top */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-blue/0 to-transparent group-hover:via-brand-blue group-hover:to-brand-cyan transition-all duration-500" />
                
                {/* Radial Glow underneath cards on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-[radial-gradient(120px_circle_at_top_right,rgba(59,130,246,0.1),transparent_80%)]" />

                <div>
                  {/* Service Icon */}
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-brand-blue group-hover:text-brand-cyan group-hover:border-brand-blue/30 transition-all duration-300 mb-6">
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Service Title */}
                  <h3 className="text-base font-bold text-white mb-2 tracking-tight">
                    {service.title}
                  </h3>

                  {/* One-line Client Benefit (Highlighted) */}
                  <div className="text-xs font-bold text-brand-cyan/90 border-l border-brand-blue/40 pl-2.5 py-0.5 mb-4 italic">
                    {service.benefit}
                  </div>

                  {/* Service Description */}
                  <p className="text-xs font-medium text-slate-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
