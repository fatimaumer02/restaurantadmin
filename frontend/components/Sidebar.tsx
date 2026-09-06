"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, UtensilsCrossed, ShoppingCart, Receipt, Settings as SettingsIcon, Store,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import ClientOnly from "./ClientOnly";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/cart", label: "Cart", icon: ShoppingCart },
  { href: "/bills", label: "Bills", icon: Receipt },
  { href: "/settings", label: "Settings", icon: SettingsIcon },
];

export default function Sidebar({
  mobileOpen,
  onClose,
}: {
  mobileOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const cart = useStore((s) => s.cart);
  const restaurantName = useStore((s) => s.settings.restaurantName);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 z-[110] bg-black/40 md:hidden" onClick={onClose} />
      )}
      <aside
        className={cn(
          "fixed top-0 left-0 z-[120] flex h-screen w-[260px] flex-shrink-0 -translate-x-full flex-col bg-sidebar p-7 text-sidebar-text shadow-pop transition-transform md:sticky md:translate-x-0 md:shadow-none",
          mobileOpen && "translate-x-0"
        )}
      >
        <Link href="/" className="mb-6 flex items-center gap-3 border-b border-white/10 pb-6">
          <div className="flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-md bg-copper text-[#2A1204]">
            <Store size={18} />
          </div>
          <div>
            <div className="font-display text-[17px] font-semibold leading-tight tracking-tight">
              {restaurantName}
            </div>
            <div className="mt-0.5 text-[11.5px] text-sidebar-text-soft">Admin console</div>
          </div>
        </Link>

        <nav className="flex flex-1 flex-col gap-1">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-sidebar-text-soft transition hover:bg-white/[0.06] hover:text-sidebar-text",
                  active && "bg-sidebar-hi text-[#F4CB9E] hover:bg-sidebar-hi hover:text-[#F4CB9E]"
                )}
              >
                <Icon size={17} />
                <span>{item.label}</span>
                <ClientOnly>
                  {item.href === "/cart" && cartCount > 0 && (
                    <span className="ml-auto rounded-full bg-copper px-2 py-0.5 text-[11px] font-semibold text-[#2A1204]">
                      {cartCount}
                    </span>
                  )}
                </ClientOnly>
              </Link>
            );
          })}
        </nav>

        <div className="mt-4 border-t border-white/10 pt-3.5 text-[11px] text-[#7C7360]">
          No login required &middot; admin mode
        </div>
      </aside>
    </>
  );
}
