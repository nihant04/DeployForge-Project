import TechStack from "@/components/TechStack";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tech Stack — DeployForge | Advanced Cloud & Full-Stack Technologies",
  description: "Browse the modern development tools, databases, and DevOps automation technologies that DeployForge utilizes to scale robust client platforms.",
};

export default function TechStackPage() {
  return (
    <div className="pt-16 pb-8 bg-background relative overflow-hidden">
      {/* Decorative top blue ambient mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />
      <TechStack />
    </div>
  );
}
