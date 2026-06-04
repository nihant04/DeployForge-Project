import WhyChooseUs from "@/components/WhyChooseUs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Choose Us — DeployForge | Zero-Downtime Reliability",
  description: "Discover why DeployForge is the leading choice for businesses requiring highly available, zero-downtime, and bulletproof web applications.",
};

export default function WhyUsPage() {
  return (
    <div className="pt-16 pb-8 bg-background relative overflow-hidden">
      {/* Decorative top blue ambient mesh */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-brand-violet/5 rounded-full blur-[120px] pointer-events-none" />
      <WhyChooseUs />
    </div>
  );
}
