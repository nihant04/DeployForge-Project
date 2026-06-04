import About from "@/components/About";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About DeployForge | Premium Tech Startup & DevOps Engineering",
  description: "Learn about the DeployForge mission, our engineering expertise, and our 100% client satisfaction guarantee in delivering high-fidelity Web and Cloud infrastructure.",
};

export default function AboutPage() {
  return (
    <div className="pt-16 pb-8 bg-background relative overflow-hidden">
      {/* Decorative top blue ambient mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />
      <About />
    </div>
  );
}
