"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LogoIcon } from "@/components/Logo";

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Process", href: "/process" },
  { name: "Tech Stack", href: "/tech-stack" },
  { name: "Projects", href: "/projects" },
  { name: "Why Us", href: "/why-us" },
  { name: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-[#030712]/75 backdrop-blur-md border-b border-slate-900 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/"
            className="flex items-center space-x-2.5 text-white group cursor-pointer select-none"
          >
            <LogoIcon size={32} className="group-hover:rotate-6 transition-transform" />
            <span className="text-xl font-bold tracking-tight text-white font-sans uppercase">
              Deploy<span className="text-[#0082f6]">Forge</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 relative group ${
                    isActive ? "text-white" : "text-slate-300 hover:text-white"
                  }`}
                >
                  {link.name}
                  <span 
                    className={`absolute bottom-[-4px] left-0 h-[2px] bg-gradient-to-r from-brand-blue to-brand-cyan transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`} 
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-slate-900 border border-slate-800 hover:border-brand-blue/50 hover:bg-slate-950 transition-all duration-300 group shadow-lg"
            >
              Start a Project
              <ArrowRight className="ml-2 h-4 w-4 text-brand-blue group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-slate-950/95 border-b border-slate-900 backdrop-blur-lg lg:hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`block w-full px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive ? "text-white bg-slate-900/60" : "text-slate-300 hover:text-white hover:bg-slate-900"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-slate-900">
                <Link
                  href="/contact"
                  className="flex w-full items-center justify-center px-4 py-3.5 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-brand-blue to-brand-cyan hover:opacity-90 shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all"
                >
                  Start a Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
