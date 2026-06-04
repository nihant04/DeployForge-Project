"use client";

import { Clock, ShieldAlert, Cpu, Sparkles, Box, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    icon: Clock,
    metric: "48hr Response",
    title: "Sprint-Based Speed",
    desc: "Guaranteed initial project sprint response within 48 hours. We value speed and execute updates rapidly.",
  },
  {
    icon: Cpu,
    metric: "100k+ Load",
    title: "Scalable Architecture",
    desc: "Engineered to comfortably handle over 100,000 concurrent user requests using auto-scalable ECS tasks.",
  },
  {
    icon: ShieldAlert,
    metric: "Zero Downtime",
    title: "Hardened Deployments",
    desc: "Rigorous network configurations, firewalls, custom subnets, and automated SSL to prevent security risks.",
  },
  {
    icon: Sparkles,
    metric: ">90 Lighthouse",
    title: "Modern UI/UX Design",
    desc: "Sleek, futuristic interfaces configured to score above 90 on page speed, SEO, accessibility, and conversion.",
  },
  {
    icon: Box,
    metric: "1-Click Provision",
    title: "End-to-End Integration",
    desc: "We write the code, configure the servers, design pipelines, and automate provisioning in one fluid motion.",
  },
  {
    icon: CalendarDays,
    metric: "99.9% Uptime",
    title: "24/7 SLA Support",
    desc: "Integrated site telemetry triggers instant notifications if anything fails, maintaining continuous uptime.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-24 relative overflow-hidden bg-background">
      {/* Visual neon light backing */}
      <div className="absolute left-1/4 bottom-10 w-[300px] h-[300px] bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-brand-blue uppercase tracking-wider">
            <span>Our Commitments</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Engineered for Uptime and Reliability
          </h2>
          <p className="text-slate-400 font-medium text-sm sm:text-base leading-relaxed">
            {"Startups choose DeployForge because we don't treat DevOps as an afterthought. We build cloud operations into the core layout of your application."}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative rounded-2xl border border-slate-800/80 bg-slate-950/40 p-6 backdrop-blur-md transition-all duration-300 hover:border-brand-blue/30 hover:bg-slate-900/30 overflow-hidden"
              >
                {/* Metric Display banner */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs font-mono font-bold bg-brand-blue/15 text-brand-cyan border border-brand-blue/20 px-3 py-1 rounded-lg">
                    {stat.metric}
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-slate-455 group-hover:text-brand-blue transition-colors">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                </div>

                {/* Info details */}
                <h3 className="text-base font-bold text-white mb-2 tracking-tight group-hover:text-brand-blue transition-colors">
                  {stat.title}
                </h3>
                <p className="text-xs font-semibold text-slate-400 leading-relaxed">
                  {stat.desc}
                </p>

                {/* Radial Glow underneath cards on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl bg-[radial-gradient(120px_circle_at_center,rgba(59,130,246,0.04),transparent_80%)]" />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
