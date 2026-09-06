import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, LabelHTMLAttributes, ReactNode } from "react";
import { CATEGORY_META } from "@/lib/categories";
import type { Category } from "@/lib/types";
import type { LucideIcon } from "lucide-react";

export function IconButton({
  className,
  danger,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { danger?: boolean }) {
  return (
    <button
      className={cn(
        "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-sm border border-line bg-surface text-ink-soft transition",
        danger
          ? "hover:border-wine hover:bg-wine-tint hover:text-wine"
          : "hover:border-line-strong hover:bg-surface-alt hover:text-ink",
        className
      )}
      {...rest}
    />
  );
}

export function CategoryChip({ category, size = "sm" }: { category: Category; size?: "sm" | "md" }) {
  const meta = CATEGORY_META[category] ?? CATEGORY_META.Other;
  const Icon = meta.icon;
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1.5 rounded-full font-medium",
        size === "sm" ? "px-2.5 py-1 text-[11.5px]" : "px-3 py-1.5 text-[13px]"
      )}
      style={{ backgroundColor: `${meta.color}22`, color: meta.color }}
    >
      <Icon size={size === "sm" ? 12 : 14} />
      {category}
    </span>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[12.5px] font-medium text-ink-soft">{label}</span>
      {children}
    </label>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  hint,
  action,
}: {
  icon: LucideIcon;
  title: string;
  hint?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border-[1.5px] border-dashed border-line-strong bg-surface-alt px-6 py-16 text-center text-ink-soft">
      <Icon size={30} strokeWidth={1.4} className="text-ink-faint" />
      <p className="mt-1.5 font-display text-[17px] font-semibold text-ink">{title}</p>
      {hint && <p className="max-w-[340px] text-[13.5px] leading-relaxed">{hint}</p>}
      {action}
    </div>
  );
}

export function StatCard({
  icon: Icon,
  label,
  value,
  tint,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  tint: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-md border border-line bg-surface p-4 shadow-card sm:gap-3.5 sm:p-5">
      <div
        className="flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-md sm:h-[42px] sm:w-[42px]"
        style={{ backgroundColor: `${tint}26`, color: tint }}
      >
        <Icon size={18} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate font-display text-[18px] font-semibold leading-tight tracking-tight sm:text-[23px]">{value}</div>
        <div className="mt-0.5 truncate text-[12.5px] text-ink-soft">{label}</div>
      </div>
    </div>
  );
}

export function SwitchToggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-6 w-[42px] rounded-full transition-colors",
        checked ? "bg-basil" : "bg-line-strong"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
          checked && "translate-x-[18px]"
        )}
      />
    </button>
  );
}