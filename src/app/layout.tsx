import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DeployForge — From Code to Cloud | Full-Stack Web Development & DevOps",
  description: "DeployForge is a premium technology studio offering Full-Stack Web Development, DevOps engineering, Docker containerization, AWS cloud deployments, and automated CI/CD pipelines.",
  keywords: [
    "Full-Stack Web Development",
    "DevOps Engineering",
    "Cloud Deployment",
    "CI/CD Automation",
    "AWS",
    "Docker",
    "Next.js Developer",
    "Terraform Automation",
    "Nginx Server Hardening"
  ],
  authors: [{ name: "DeployForge Team", url: "https://deployforge.in" }],
  openGraph: {
    title: "DeployForge — From Code to Cloud | Development to Deployment",
    description: "Premium tech startup crafting state-of-the-art web platforms and highly resilient cloud architectures with zero downtime.",
    url: "https://deployforge.in",
    siteName: "DeployForge",
    images: [
      {
        url: "https://deployforge.in/og-image.png", // High-fidelity placeholder
        width: 1200,
        height: 630,
        alt: "DeployForge — Built for Scale",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DeployForge — From Code to Cloud",
    description: "Full-Stack engineering agency and DevOps automated deployment experts.",
    images: ["https://deployforge.in/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      style={{ scrollBehavior: "smooth" }}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans relative">
        <CursorGlow />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
