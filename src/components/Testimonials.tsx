"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Verified Partner",
    role: "Active Project",
    flag: "",
    feedback: "Client review coming soon — project in progress",
    rating: 5,
    initials: "DF",
    glow: "rgba(59,130,246,0.1)"
  },
  {
    name: "Verified Partner",
    role: "Active Project",
    flag: "",
    feedback: "Client review coming soon — project in progress",
    rating: 5,
    initials: "DF",
    glow: "rgba(6,182,212,0.1)"
  },
  {
    name: "Verified Partner",
    role: "Active Project",
    flag: "",
    feedback: "Client review coming soon — project in progress",
    rating: 5,
    initials: "DF",
    glow: "rgba(139,92,246,0.1)"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="absolute right-0 top-1/4 w-[300px] h-[300px] bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-brand-blue uppercase tracking-wider">
            <span>Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Trusted by Builders Globally
          </h2>
          <p className="text-slate-400 font-medium text-sm sm:text-base leading-relaxed">
            See how scaling startups, clinic managers, and logistics companies leverage our end-to-end full-stack & DevOps pipelines.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-2xl border border-slate-800/80 bg-slate-950/40 p-6 backdrop-blur-md transition-all duration-300 hover:border-slate-700/50 hover:bg-slate-900/20 overflow-hidden flex flex-col justify-between"
            >
              {/* Radial glow background on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" 
                style={{ background: `radial-gradient(150px circle at top center, ${item.glow}, transparent 80%)` }}
              />

              <div className="space-y-4 relative z-10">
                {/* Star rating */}
                <div className="flex items-center space-x-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>

                {/* Feedback */}
                <p className="text-xs font-semibold text-slate-300 leading-relaxed italic">
                  {"\""}{item.feedback}{"\""}
                </p>
              </div>

              {/* Client info footer */}
              <div className="flex items-center space-x-3.5 pt-6 mt-6 border-t border-slate-900 relative z-10">
                {/* Avatar Initial */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-brand-blue font-bold text-sm">
                  {item.initials}
                </div>
                {/* Name & Title */}
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs font-bold text-white">{item.name}</span>
                    <span className="text-xs" title="Country Flag">{item.flag}</span>
                  </div>
                  <p className="text-[10px] font-medium text-slate-500">{item.role}</p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
