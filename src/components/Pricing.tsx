"use client";

import { useState } from "react";
import { Check, Info, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const plans = [
  {
    name: "Starter Launch",
    price: "$50",
    time: "3 Days Delivery",
    tagline: "Professional responsive website for startups or personal brands.",
    features: [
      "3 Pages layout",
      "Basic Design Customization",
      "Content Upload & Source Code",
      "Full Responsive Design",
      "2 Revisions cycles",
      "Basic Hosting Setup",
    ],
    cta: "Order Starter Launch",
    popular: false,
    glow: "rgba(59,130,246,0.05)"
  },
  {
    name: "Business Pro",
    price: "$150",
    time: "5 Days Delivery",
    tagline: "Advanced business website with custom features and deployment.",
    features: [
      "6 Pages layout",
      "Advanced Design Customization",
      "Content Upload & Source Code",
      "4 Revisions + Detailed Comments",
      "Docker + CI/CD Setup",
      "Full Responsive Design",
    ],
    cta: "Scale with Business Pro",
    popular: true,
    glow: "rgba(6,182,212,0.1)"
  },
  {
    name: "Enterprise Forge",
    price: "$350",
    time: "7-10 Days Delivery",
    tagline: "Complete full-stack web application with DevOps & cloud deployment.",
    features: [
      "10+ Pages layout",
      "Premium Custom UI/UX Design",
      "Content Upload & Source Code",
      "Unlimited Revisions cycles",
      "Detailed Code Comments",
      "Full Cloud Deployment + Monitoring",
    ],
    cta: "Request Enterprise Forge",
    popular: false,
    glow: "rgba(139,92,246,0.05)"
  },
];

// Parameters for the comparison matrix table
const comparisonRows = [
  { param: "Package Name", starter: "Starter Launch", business: "Business Pro", enterprise: "Enterprise Forge" },
  { param: "Description", starter: "Professional responsive website for startups or personal brands", business: "Advanced business website with custom features and deployment", enterprise: "Complete full-stack web application with DevOps & cloud deployment" },
  { param: "Number of Pages", starter: "3 Pages", business: "6 Pages", enterprise: "10+ Pages" },
  { param: "Design Customization", starter: "Basic", business: "Advanced", enterprise: "Premium Custom UI/UX" },
  { param: "Content Upload", starter: "Yes", business: "Yes", enterprise: "Yes" },
  { param: "Responsive Design", starter: "Yes", business: "Yes", enterprise: "Yes" },
  { param: "Include Source Code", starter: "Yes", business: "Yes", enterprise: "Yes" },
  { param: "Revisions", starter: "2 Revisions", business: "4 Revisions", enterprise: "Unlimited Revisions" },
  { param: "Detailed Code Comments", starter: "No", business: "Yes", enterprise: "Yes" },
  { param: "DevOps / Deployment", starter: "Basic Hosting Setup", business: "Docker + CI/CD Setup", enterprise: "Full Cloud Deployment + Monitoring" },
  { param: "Delivery Time", starter: "3 Days", business: "5 Days", enterprise: "7-10 Days" },
  { param: "Price", starter: "$50", business: "$150", enterprise: "$350" },
];

export default function Pricing() {
  const [showCompare, setShowCompare] = useState(false);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-background border-b border-slate-950">
      {/* Background neon orb decoration */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[500px] h-[250px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-brand-blue uppercase tracking-wider">
            <span>Pricing plans</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Transparent Packaging & Rates
          </h2>
          <p className="text-slate-400 font-medium text-sm sm:text-base leading-relaxed">
            Select the exact package matching your application milestone. No hourly ambiguity, backed by rapid sprint deliveries.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative rounded-2xl border backdrop-blur-md p-8 flex flex-col justify-between transition-all duration-300 shadow-xl ${
                plan.popular 
                  ? "border-brand-blue bg-slate-950/60 -translate-y-2 md:-translate-y-3"
                  : "border-slate-800/80 bg-slate-950/40"
              }`}
            >
              {/* Radial glow backdrop */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" 
                style={{ background: `radial-gradient(200px circle at top center, ${plan.glow}, transparent 80%)` }}
              />

              {/* Popular banner indicator */}
              {plan.popular && (
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-brand-blue to-brand-cyan text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md z-20">
                  Most Popular
                </div>
              )}

              {/* Plan Header */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white tracking-tight">{plan.name}</h3>
                  <span className="text-[9px] font-bold font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-850 text-brand-cyan">
                    {plan.time}
                  </span>
                </div>
                <p className="text-[11px] font-medium text-slate-400 leading-normal">{plan.tagline}</p>
                
                <div className="flex items-baseline space-x-1 text-white">
                  <span className="text-4xl font-black tracking-tight">{plan.price}</span>
                  <span className="text-xs font-medium text-slate-500">/ flat rate</span>
                </div>
                
                <hr className="border-slate-900" />

                {/* Features list */}
                <ul className="space-y-3.5 pt-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start space-x-3 text-xs">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-cyan">
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="text-slate-300 font-semibold leading-normal">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA button */}
              <div className="pt-8">
                <button
                  onClick={scrollToContact}
                  className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold transition-all shadow-md ${
                    plan.popular
                      ? "bg-gradient-to-r from-brand-blue to-brand-cyan text-white hover:opacity-95 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                      : "bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Interactive Comparison Drawer */}
        <div className="max-w-5xl mx-auto text-center">
          <button
            onClick={() => setShowCompare(!showCompare)}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 hover:border-slate-700 text-xs font-bold text-white transition-all shadow-lg"
          >
            <span>{showCompare ? "Hide Matrix Specifications" : "Compare Packages Full Matrix"}</span>
            {showCompare ? <ChevronUp className="h-4 w-4 text-brand-blue" /> : <ChevronDown className="h-4 w-4 text-brand-blue" />}
          </button>

          <AnimatePresence>
            {showCompare && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-8 border border-slate-850 rounded-2xl bg-slate-950/80 backdrop-blur-md overflow-hidden text-left shadow-2xl"
              >
                <div className="overflow-x-auto w-full scrollbar-thin">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-900/50 border-b border-slate-800">
                        <th className="p-4 font-bold text-white uppercase tracking-wider text-left min-w-[150px]">Package Matrix</th>
                        <th className="p-4 font-bold text-brand-blue uppercase tracking-wider text-left min-w-[200px]">Starter Launch</th>
                        <th className="p-4 font-bold text-brand-cyan uppercase tracking-wider text-left min-w-[200px]">Business Pro</th>
                        <th className="p-4 font-bold text-brand-violet uppercase tracking-wider text-left min-w-[200px]">Enterprise Forge</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonRows.map((row, idx) => (
                        <tr 
                          key={idx} 
                          className={`border-b border-slate-900/60 transition-colors ${
                            idx % 2 === 0 ? "bg-slate-950/20" : "bg-slate-900/20"
                          } hover:bg-slate-900/40`}
                        >
                          <td className="p-4 font-bold text-slate-400 border-r border-slate-900/60">{row.param}</td>
                          <td className={`p-4 font-medium border-r border-slate-900/60 ${row.param === "Price" ? "text-lg font-black text-white" : "text-slate-300"}`}>
                            {row.starter}
                          </td>
                          <td className={`p-4 font-medium border-r border-slate-900/60 ${row.param === "Price" ? "text-lg font-black text-brand-cyan" : "text-slate-300"}`}>
                            {row.business}
                          </td>
                          <td className={`p-4 font-medium ${row.param === "Price" ? "text-lg font-black text-brand-violet" : "text-slate-300"}`}>
                            {row.enterprise}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Pricing notice disclaimer */}
        <div className="flex items-center justify-center space-x-2 text-xs text-slate-500 mt-12 text-center max-w-md mx-auto">
          <Info className="h-4 w-4 text-brand-blue shrink-0 animate-pulse" />
          <span>{"Need customized scopes or long-term retainer SLAs? We build tailored infrastructure. Let's chat directly."}</span>
        </div>

      </div>
    </section>
  );
}
