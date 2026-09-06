"use client";

import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-sidebar px-6 text-center text-sidebar-text">
      {/* ambient glow accents */}
      <div className="pointer-events-none absolute -top-52 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-copper/25 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 h-[420px] w-[420px] rounded-full bg-wine/15 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-[320px] w-[320px] rounded-full bg-basil/10 blur-[120px]" />

      <div className="relative flex flex-col items-center gap-7">
        <div className="animate-mark-in flex h-16 w-16 items-center justify-center rounded-2xl bg-copper text-[#2A1204] shadow-pop">
          <Flame size={30} className="animate-flicker" />
        </div>

        <div className="flex flex-col items-center gap-3">
          <h1 className="animate-title-in font-display text-[15vw] font-semibold leading-none tracking-tight sm:text-[68px] md:text-[86px]">
            Fork <span className="text-copper">&amp;</span> Fire
          </h1>
          <p className="animate-subtitle-in max-w-md text-[15px] leading-relaxed text-sidebar-text-soft">
            Restaurant admin console &mdash; manage the menu, ring up orders, and keep every bill on record.
          </p>
        </div>

        <Link href="/dashboard" className="btn-landing animate-button-in">
          Dashboard <ArrowRight size={16} />
        </Link>
      </div>

      <div className="animate-subtitle-in absolute bottom-8 text-[11.5px] text-[#7C7360]">
        No login required &middot; admin mode
      </div>
    </div>
  );
}
