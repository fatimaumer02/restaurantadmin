import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantClass: Record<Variant, string> = {
  primary: "bg-copper text-[#FEF7EE] hover:bg-copper-deep",
  ghost: "bg-transparent border border-line-strong text-ink hover:bg-surface-alt",
  danger: "bg-wine text-white hover:bg-[#832E27]",
};

const sizeClass: Record<Size, string> = {
  sm: "px-3.5 py-2 text-[12.5px]",
  md: "px-4 py-2.5 text-[13.5px]",
  lg: "w-full px-5 py-3.5 text-[14.5px]",
};

export default function Button({ variant = "primary", size = "md", className, ...rest }: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-sm font-semibold whitespace-nowrap transition active:translate-y-px disabled:opacity-40 disabled:cursor-not-allowed",
        variantClass[variant],
        sizeClass[size],
        className
      )}
      {...rest}
    />
  );
}
