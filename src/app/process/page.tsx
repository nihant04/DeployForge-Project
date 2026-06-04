import Process from "@/components/Process";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Process — DeployForge | Plan. Build. Test. Deploy. Scale.",
  description: "Learn how DeployForge automates software delivery through our premium 6-step DevOps pipeline, taking code to cloud securely.",
};

export default function ProcessPage() {
  return (
    <div className="pt-16 pb-8 bg-background relative overflow-hidden">
      {/* Decorative top blue ambient mesh */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-brand-violet/5 rounded-full blur-[120px] pointer-events-none" />
      <Process />
    </div>
  );
}
