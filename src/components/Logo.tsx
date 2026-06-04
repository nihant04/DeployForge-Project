import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
}

export function LogoIcon({ className = "", size = 40 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Drifting blue pixels/squares on the left */}
      <rect x="18" y="28" width="4" height="4" rx="1" fill="#3b82f6" opacity="0.8" />
      <rect x="25" y="28" width="4" height="4" rx="1" fill="#06b6d4" />
      <rect x="25" y="35" width="4" height="4" rx="1" fill="#3b82f6" opacity="0.6" />
      <rect x="12" y="42" width="4" height="4" rx="1" fill="#06b6d4" opacity="0.7" />
      <rect x="18" y="42" width="4" height="4" rx="1" fill="#3b82f6" />
      <rect x="25" y="49" width="4.5" height="4.5" rx="1" fill="#06b6d4" />
      <rect x="18" y="56" width="4" height="4" rx="1" fill="#3b82f6" opacity="0.7" />
      <rect x="13" y="49" width="3.5" height="3.5" rx="1" fill="#06b6d4" opacity="0.5" />
      <rect x="18" y="69" width="3.5" height="3.5" rx="1" fill="#3b82f6" opacity="0.8" />
      <rect x="25" y="62" width="4.5" height="4.5" rx="1" fill="#3b82f6" />
      <rect x="32" y="35" width="4.5" height="4.5" rx="1" fill="#3b82f6" />
      <rect x="32" y="42" width="5" height="5" rx="1" fill="#06b6d4" />
      <rect x="32" y="56" width="5" height="5" rx="1" fill="#3b82f6" />
      <rect x="32" y="49" width="4.5" height="4.5" rx="1" fill="#3b82f6" opacity="0.5" />

      {/* Stylized White 'D' contour */}
      <path
        d="M51 28H62C75.2548 28 86 37.8497 86 50C86 62.1503 75.2548 72 62 72H51C45.5 72 40 68.5 37 63L45 58.5C46.5 61.5 49 63.5 52 63.5H62C70.2843 63.5 77 57.4558 77 50C77 42.5442 70.2843 36.5 62 36.5H52C49 36.5 46.5 38.5 45 41.5L37 37C40 31.5 45.5 28 51 28Z"
        fill="white"
      />

      {/* Solid Blue Horizontal inner Loop Bar */}
      <rect x="45" y="45.5" width="22" height="9" rx="4.5" fill="#0082f6" />
    </svg>
  );
}

export function LogoFull({ className = "", size = 200 }: LogoProps) {
  return (
    <div className={`flex flex-col items-center text-center ${className}`} style={{ width: size }}>
      {/* Circle housing for the emblem */}
      <div className="flex h-36 w-36 items-center justify-center rounded-full bg-slate-950 border border-slate-900 shadow-[0_0_30px_rgba(59,130,246,0.15)] mb-4 p-4">
        <LogoIcon size={120} />
      </div>

      {/* Main Text branding */}
      <h2 className="text-2xl font-black tracking-wider text-white uppercase font-sans">
        DEPLOY<span className="text-[#0082f6]">FORGE</span>
      </h2>

      {/* Tagline Stack */}
      <div className="w-full flex items-center justify-center space-x-2.5 my-1">
        <div className="h-[1px] w-6 bg-gradient-to-r from-transparent to-[#0082f6]" />
        <span className="text-[9px] font-bold tracking-[0.2em] text-slate-300 uppercase font-mono">
          FROM CODE TO CLOUD
        </span>
        <div className="h-[1px] w-6 bg-gradient-to-l from-transparent to-[#0082f6]" />
      </div>

      <span className="text-[8px] font-extrabold tracking-[0.25em] text-[#0082f6] uppercase font-sans">
        DEVELOPMENT TO DEPLOYMENT
      </span>
    </div>
  );
}
