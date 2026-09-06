"use client";

import Link from "next/link";
import { Plus, Receipt, ShoppingCart, TrendingUp, UtensilsCrossed } from "lucide-react";
import { useStore } from "@/lib/store";
import { CategoryChip, StatCard } from "@/components/ui/atoms";
import { money, orderNumber, todayKey } from "@/lib/utils";
import ClientOnly from "@/components/ClientOnly";

function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-7">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton h-[92px]" />
        ))}
      </div>
      <div className="skeleton h-[220px]" />
    </div>
  );
}

function DashboardContent() {
  const menuItems = useStore((s) => s.menuItems);
  const bills = useStore((s) => s.bills);
  const cart = useStore((s) => s.cart);
  const currency = useStore((s) => s.settings.currency);

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const todaySales = bills
    .filter((b) => todayKey(b.date) === todayKey(new Date()))
    .reduce((s, b) => s + b.grandTotal, 0);
  const unavailable = menuItems.filter((m) => !m.available);

  return (
    <div className="flex flex-col gap-7">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard icon={UtensilsCrossed} label="Menu items" value={menuItems.length} tint="#C97B2E" />
        <StatCard icon={Receipt} label="Bills recorded" value={bills.length} tint="#3F6B4F" />
        <StatCard icon={ShoppingCart} label="Cart total" value={money(cartTotal, currency)} tint="#B8433A" />
        <StatCard icon={TrendingUp} label="Today's sales" value={money(todaySales, currency)} tint="#8B5E34" />
      </div>

      <div className="rounded-md border border-line bg-surface p-6 shadow-card">
        <h2 className="mb-4 font-display text-[17px] font-semibold tracking-tight">Quick actions</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <Link href="/menu?add=1" className="quick-action">
            <Plus size={18} className="text-copper" /> Add menu item
          </Link>
          <Link href="/menu" className="quick-action">
            <UtensilsCrossed size={18} className="text-copper" /> View menu
          </Link>
          <Link href="/cart" className="quick-action">
            <ShoppingCart size={18} className="text-copper" /> View cart
          </Link>
          <Link href="/bills" className="quick-action">
            <Receipt size={18} className="text-copper" /> View bills
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-md border border-line bg-surface p-6 shadow-card">
          <h2 className="mb-4 font-display text-[17px] font-semibold tracking-tight">Recent bills</h2>
          {bills.length === 0 ? (
            <p className="text-[13px] text-ink-soft">
              No bills saved yet. They&apos;ll show up here once you check out a cart.
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {bills.slice(0, 5).map((b) => (
                <li
                  key={b.id}
                  className="flex items-center justify-between gap-3 border-b border-line pb-3 text-[13.5px] last:border-none last:pb-0"
                >
                  <span className="mono">{orderNumber(b.orderNumber)}</span>
                  <span className="text-[13px] text-ink-soft">{new Date(b.date).toLocaleDateString()}</span>
                  <span className="mono">{money(b.grandTotal, currency)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="rounded-md border border-line bg-surface p-6 shadow-card">
          <h2 className="mb-4 font-display text-[17px] font-semibold tracking-tight">Low on availability</h2>
          {unavailable.length === 0 ? (
            <p className="text-[13px] text-ink-soft">Everything on the menu is currently available.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {unavailable.slice(0, 5).map((m) => (
                <li
                  key={m.id}
                  className="flex items-center justify-between gap-3 border-b border-line pb-3 text-[13.5px] last:border-none last:pb-0"
                >
                  <span>{m.name}</span>
                  <CategoryChip category={m.category} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ClientOnly fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </ClientOnly>
  );
}
