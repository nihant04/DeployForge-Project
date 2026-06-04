"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mail, Globe, MapPin, Send, Terminal as TerminalIcon, Check } from "lucide-react";

interface FormState {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    projectType: "Full-Stack Web Dev",
    budget: "$50 - Starter Launch",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "[system] DeployForge Contact telemetry online.",
    "[system] Awaiting user interaction..."
  ]);
  
  const terminalContainerRef = useRef<HTMLDivElement>(null);

  // Add terminal logs
  const log = (msg: string) => {
    setTerminalLogs((prev) => [...prev, msg]);
  };

  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [terminalLogs]);

  // Log validations on inputs focus/change
  const handleFocus = (field: string) => {
    log(`[info] Input focused: '${field}'`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  // Handle Form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    log("[info] Initializing validation audit...");

    if (!form.name.trim()) {
      setStatus("error");
      log("[error] Validation FAILED: Name field is empty.");
      return;
    }

    if (!validateEmail(form.email)) {
      setStatus("error");
      log("[error] Validation FAILED: Invalid email pattern.");
      return;
    }

    if (!form.message.trim()) {
      setStatus("error");
      log("[error] Validation FAILED: Message field is empty.");
      return;
    }

    log("[success] Inputs audited. 0 warnings. 0 errors.");
    log("[info] Connecting to DeployForge secure database gateway...");
    log("[info] Dispatching post payload JSON package...");

    try {
      // POST directly to our new Next.js backend API Route
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (response.status === 200 && result.success) {
        setStatus("success");
        if (result.simulated) {
          log("[success] Transmission complete! Request saved in Local JSON DB.");
        } else {
          log("[success] Transmission complete! Request saved in MongoDB Cluster.");
        }
        log("[highlight] SUCCESS: DeployForge will respond in under 48 hours.");
        setForm({
          name: "",
          email: "",
          projectType: "Full-Stack Web Dev",
          budget: "$50 - Starter Launch",
          message: "",
        });
      } else {
        setStatus("error");
        log(`[error] Transmission FAILED: ${result.error || "Unknown server response."}`);
      }
    } catch {
      setStatus("error");
      log("[error] Critical transmission failure. Backend API unreachable.");
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-background">
      {/* Decorative background grid and neon orb */}
      <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-brand-blue uppercase tracking-wider">
            <span>Get Started</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {"Let's Build Something Amazing Together"}
          </h2>
          <p className="text-slate-400 font-medium text-sm sm:text-base leading-relaxed">
            Ready to deploy your next feature application? Fill out the secure form below. Our interactive terminal will audit your inputs in real time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-6xl mx-auto">
          
          {/* Left panel - Form container */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-800/80 bg-slate-950/40 p-8 backdrop-blur-md shadow-2xl flex flex-col justify-between">
            
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Row: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-bold text-slate-300 uppercase tracking-wider">Your Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus("name")}
                    placeholder="Jane Doe"
                    required
                    className="w-full px-4.5 py-3 rounded-xl bg-slate-900/60 border border-slate-800 text-sm font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-bold text-slate-300 uppercase tracking-wider">Your Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus("email")}
                    placeholder="jane@company.com"
                    required
                    className="w-full px-4.5 py-3 rounded-xl bg-slate-900/60 border border-slate-800 text-sm font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                  />
                </div>
              </div>

              {/* Row: Project Type and Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="projectType" className="text-xs font-bold text-slate-300 uppercase tracking-wider">Project Scope</label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={form.projectType}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus("projectType")}
                    className="w-full px-4.5 py-3 rounded-xl bg-slate-900/60 border border-slate-800 text-sm font-semibold text-white focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all cursor-pointer"
                  >
                    <option value="Full-Stack Web Dev" className="bg-slate-950">Full-Stack Web Dev</option>
                    <option value="Custom Business App" className="bg-slate-950">Custom Business App</option>
                    <option value="DevOps & CI/CD Pipeline" className="bg-slate-950">DevOps & CI/CD Pipeline</option>
                    <option value="Cloud Deployment & Scaling" className="bg-slate-950">Cloud Deployment & Scaling</option>
                    <option value="Custom Architecture Design" className="bg-slate-950">Custom Architecture Design</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="budget" className="text-xs font-bold text-slate-300 uppercase tracking-wider">Estimated Budget</label>
                  <select
                    id="budget"
                    name="budget"
                    value={form.budget}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus("budget")}
                    className="w-full px-4.5 py-3 rounded-xl bg-slate-900/60 border border-slate-800 text-sm font-semibold text-white focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all cursor-pointer"
                  >
                    <option value="$50 - Starter Launch" className="bg-slate-950">$50 - Starter Launch</option>
                    <option value="$150 - Business Pro" className="bg-slate-950">$150 - Business Pro</option>
                    <option value="$350 - Enterprise Forge" className="bg-slate-950">$350 - Enterprise Forge</option>
                    <option value="Custom Enterprise Quote" className="bg-slate-950">Custom Enterprise Quote</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-bold text-slate-300 uppercase tracking-wider">Project Outline</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("message")}
                  placeholder="Outline the core features and any specific hosting infrastructure you require..."
                  required
                  rows={4}
                  className="w-full px-4.5 py-3 rounded-xl bg-slate-900/60 border border-slate-800 text-sm font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all resize-none"
                />
              </div>

              {/* Submit CTA button */}
              <div className="pt-2">
                <button
                  id="contact-submit"
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full flex items-center justify-center space-x-2.5 py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-brand-blue to-brand-cyan hover:opacity-95 shadow-[0_0_20px_rgba(59,130,246,0.25)] transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {status === "loading" ? (
                    <span className="flex h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : status === "success" ? (
                    <>
                      <Check className="h-4.5 w-4.5" />
                      <span>Message Dispatched Successfully</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4.5 w-4.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      <span>Dispatch Pipeline Request</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>

          {/* Right panel - Contacts & Telemetry Logger Console */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Quick Contact Links Box */}
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/40 p-6 backdrop-blur-md space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Corporate Hub</h3>
              
              <div className="space-y-3.5">
                <div className="flex items-center space-x-3 text-xs font-semibold text-slate-300">
                  <Mail className="h-4.5 w-4.5 text-brand-blue shrink-0 animate-pulse-slow" />
                  <a href="mailto:deployforge0@gmail.com" className="hover:text-white hover:underline transition-all">deployforge0@gmail.com</a>
                </div>
                <div className="flex items-center space-x-3 text-xs font-semibold text-slate-300">
                  <Globe className="h-4.5 w-4.5 text-brand-cyan shrink-0" />
                  <a href="https://deployforge.in" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline transition-all">deployforge.in</a>
                </div>
                <div className="flex items-center space-x-3 text-xs font-semibold text-slate-300">
                  <MapPin className="h-4.5 w-4.5 text-[#8b5cf6] shrink-0" />
                  <span>Distributed globally &bull; Cloud native</span>
                </div>
              </div>
            </div>

            {/* Interactive Terminal Logger */}
            <div className="rounded-2xl border border-slate-850 bg-slate-950 overflow-hidden shadow-inner flex-1 flex flex-col h-[260px] lg:h-auto">
              {/* Header bar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/90 border-b border-slate-900 select-none">
                <div className="flex items-center space-x-1.5">
                  <TerminalIcon className="h-3.5 w-3.5 text-brand-cyan" />
                  <span className="text-[10px] font-mono font-bold text-slate-400">form-telemetry-logger</span>
                </div>
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              {/* Console log box */}
              <div ref={terminalContainerRef} className="flex-1 p-4 bg-slate-950/40 font-mono text-[10px] overflow-y-auto space-y-1.5 select-none scrollbar-thin max-h-[220px] lg:max-h-none">
                {terminalLogs.map((item, idx) => (
                  <div key={idx} className="leading-relaxed">
                    {item.includes("[system]") && (
                      <span className="text-slate-500">{item}</span>
                    )}
                    {item.includes("[info]") && (
                      <span className="text-slate-300">{item}</span>
                    )}
                    {item.includes("[success]") && (
                      <span className="text-emerald-400 font-bold">{item}</span>
                    )}
                    {item.includes("[error]") && (
                      <span className="text-red-400 font-bold bg-red-950/20 px-1 py-0.5 rounded">{item}</span>
                    )}
                    {item.includes("[warn]") && (
                      <span className="text-yellow-400 font-bold">{item}</span>
                    )}
                    {item.includes("[highlight]") && (
                      <span className="text-brand-blue font-extrabold bg-blue-950/30 px-1.5 py-0.5 rounded">{item}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
