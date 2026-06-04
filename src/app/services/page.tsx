import Services from "@/components/Services";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services — DeployForge | Full-Stack, Cloud & DevOps Solutions",
  description: "Explore our range of premium technological services, including Full-Stack Web Development, Docker Containerization, CI/CD pipelines, and cloud scaling.",
};

export default function ServicesPage() {
  return (
    <div className="pt-16 pb-8 bg-background relative overflow-hidden">
      {/* Decorative top blue ambient mesh */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[350px] bg-brand-cyan/5 rounded-full blur-[140px] pointer-events-none" />
      <Services />
    </div>
  );
}
