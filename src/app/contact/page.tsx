import Contact from "@/components/Contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start a Project — DeployForge | Secure Lead Telemetry Gateway",
  description: "Connect with the DeployForge engineering team via our secure contact portal to dispatch your product specification requirements.",
};

export default function ContactPage() {
  return (
    <div className="pt-16 pb-8 bg-background relative overflow-hidden">
      {/* Decorative top blue ambient mesh */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-brand-cyan/5 rounded-full blur-[140px] pointer-events-none" />
      <Contact />
    </div>
  );
}
