"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { LogoIcon } from "@/components/Logo";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-background border-t border-slate-900 pt-20 pb-10 overflow-hidden">
      {/* Decorative radial lighting */}
      <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-slate-900">
          {/* Logo and Tagline */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center space-x-2.5 cursor-pointer group">
              <LogoIcon size={32} className="group-hover:rotate-6 transition-transform" />
              <span className="text-lg font-bold tracking-tight text-white font-sans uppercase">
                Deploy<span className="text-[#0082f6]">Forge</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 font-medium">
              From Code to Cloud — Development to Deployment. We engineer premium digital solutions tailored to scale your enterprise.
            </p>
            {/* Marketplace & Social Links */}
            <div className="flex items-center space-x-4 pt-2">
              <a
                href="https://www.linkedin.com/company/deployforge0/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-brand-blue/50 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" rx="1" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://www.upwork.com/freelancers/~015e119bee32740a71?mp_source=share"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-green-400 hover:border-green-500/30 transition-all duration-300"
              >
                Upwork
              </a>
              <a
                href="https://www.fiverr.com/s/rEy8e47"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-green-500 hover:border-green-500/30 transition-all duration-300"
              >
                Fiverr
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {["about", "services", "process", "projects", "pricing"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item}`}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-200 capitalize font-medium"
                  >
                    {item.replace("-", " ")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Core Services</h3>
            <ul className="space-y-3">
              {[
                "Full-Stack Web Dev",
                "DevOps & CI/CD",
                "Cloud Deployment",
                "Infrastructure Automation",
                "Custom SaaS Platforms",
              ].map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-sm text-slate-400 hover:text-white text-left transition-colors duration-200 font-medium"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Get in touch</h3>
            <div className="space-y-4">
              <p className="text-sm text-slate-400">
                Ready to accelerate your delivery cycle and secure your cloud pipeline? Reach out to us directly.
              </p>
              <a
                href="mailto:deployforge0@gmail.com"
                className="inline-block text-sm text-[#0082f6] hover:text-brand-cyan hover:underline transition-colors font-bold"
              >
                deployforge0@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4">
          <p className="text-xs text-slate-500 font-medium">
            &copy; {new Date().getFullYear()} DeployForge. All rights reserved. Built for ultimate speed & reliability.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center justify-center h-10 w-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-brand-blue/30 hover:bg-slate-950 transition-all duration-300 group shadow-md"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-4 w-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
