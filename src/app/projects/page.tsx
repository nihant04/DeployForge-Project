import Projects from "@/components/Projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies & Work — DeployForge | Proven Web & Cloud Systems",
  description: "Browse the engineering portfolio of DeployForge, featuring defensive-grade cybersecurity ecosystems, immersive applications, and enterprise web solutions.",
};

export default function ProjectsPage() {
  return (
    <div className="pt-16 pb-8 bg-background relative overflow-hidden">
      {/* Decorative top blue ambient mesh */}
      <div className="absolute top-0 right-1/3 w-[600px] h-[350px] bg-brand-cyan/5 rounded-full blur-[140px] pointer-events-none" />
      <Projects />
    </div>
  );
}
