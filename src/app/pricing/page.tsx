import Pricing from "@/components/Pricing";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing & Packages — DeployForge | Affordable Cloud & Web Dev",
  description: "View our transparent pricing and package options, built for startups scaling to MVP and enterprises looking for bespoke architecture consulting.",
};

export default function PricingPage() {
  return (
    <div className="pt-16 pb-8 bg-background relative overflow-hidden">
      {/* Decorative top blue ambient mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />
      <Pricing />
    </div>
  );
}
