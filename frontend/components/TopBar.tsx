"use client";

import { useEffect, useState } from "react";
import { Clock, Menu as MenuIcon } from "lucide-react";

export default function TopBar({
  title,
  subtitle,
  onMenuClick,
}: {
  title: string;
  subtitle?: string;
  onMenuClick: () => void;
}) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex items-start justify-between gap-4 px-6 pb-5 pt-7 md:px-10 md:pt-8">
      <button
        className="flex h-8 w-8 items-center justify-center rounded-sm border border-line bg-surface md:hidden"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <MenuIcon size={18} />
      </button>
      <div>
        <h1 className="font-display text-[26px] font-semibold tracking-tight md:text-[28px]">{title}</h1>
        {subtitle && <p className="mt-1 text-[13.5px] text-ink-soft">{subtitle}</p>}
      </div>
      {now && (
        <div className="hidden items-center gap-1.5 pt-2 text-[12.5px] text-ink-faint md:flex">
          <Clock size={14} />
          {now.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
          {" \u00b7 "}
          {now.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
        </div>
      )}
    </div>
  );
}
