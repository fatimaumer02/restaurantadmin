"use client";

import { CalendarDays, CalendarRange, History, Receipt, TrendingUp } from "lucide-react";
import { useStore } from "@/lib/store";
import { StatCard } from "@/components/ui/atoms";
import { money, todayKey } from "@/lib/utils";
import ClientOnly from "@/components/ClientOnly";

function SalesSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="skeleton h-[92px]" />
      ))}
    </div>
  );
}

function sumBills(bills: { date: string; grandTotal: number }[]) {
  return bills.reduce((s, b) => s + b.grandTotal, 0);
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getMonthlyBreakdown(bills: { date: string; grandTotal: number }[]) {
  // key: "YYYY-MM" -> { total, count, year, month }
  const map = new Map<string, { total: number; count: number; year: number; month: number }>();

  for (const b of bills) {
    const d = new Date(b.date);
    const year = d.getFullYear();
    const month = d.getMonth();
    const key = `${year}-${String(month).padStart(2, "0")}`;

    const existing = map.get(key);
    if (existing) {
      existing.total += b.grandTotal;
      existing.count += 1;
    } else {
      map.set(key, { total: b.grandTotal, count: 1, year, month });
    }
  }

  // Sort newest month first
  return Array.from(map.entries())
    .sort((a, b) => (a[0] < b[0] ? 1 : -1))
    .map(([key, v]) => ({ key, ...v }));
}

function SalesContent() {
  const bills = useStore((s) => s.bills);
  const currency = useStore((s) => s.settings.currency);

  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);

  const dailyBills = bills.filter((b) => todayKey(b.date) === todayKey(now));
  const yesterdayBills = bills.filter((b) => todayKey(b.date) === todayKey(yesterday));
  const monthlyBills = bills.filter((b) => {
    const d = new Date(b.date);
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  });
  const yearlyBills = bills.filter((b) => new Date(b.date).getFullYear() === now.getFullYear());

  const daily = sumBills(dailyBills);
  const yesterdayTotal = sumBills(yesterdayBills);
  const monthly = sumBills(monthlyBills);
  const yearly = sumBills(yearlyBills);
  const allTime = sumBills(bills);

  const monthlyBreakdown = getMonthlyBreakdown(bills);

  return (
    <div className="flex flex-col gap-7">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard icon={CalendarDays} label={`Today (${dailyBills.length} bills)`} value={money(daily, currency)} tint="#B8433A" />
        <StatCard icon={History} label={`Yesterday (${yesterdayBills.length} bills)`} value={money(yesterdayTotal, currency)} tint="#C97B2E" />
        <StatCard icon={CalendarRange} label={`This month (${monthlyBills.length} bills)`} value={money(monthly, currency)} tint="#3F6B4F" />
        <StatCard icon={TrendingUp} label={`This year (${yearlyBills.length} bills)`} value={money(yearly, currency)} tint="#8B5E34" />
        <StatCard icon={Receipt} label={`All-time (${bills.length} bills)`} value={money(allTime, currency)} tint="#5B5850" />
      </div>

      <div className="rounded-md border border-line bg-surface p-6 shadow-card">
        <h2 className="mb-4 font-display text-[17px] font-semibold tracking-tight">
          Monthly sales
        </h2>
        {monthlyBreakdown.length === 0 ? (
          <p className="text-[13px] text-ink-soft">No bills yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="border-b border-line text-ink-soft">
                  <th className="py-2 pr-4 font-medium">Month</th>
                  <th className="py-2 pr-4 font-medium">Bills</th>
                  <th className="py-2 pr-4 font-medium">Sales</th>
                </tr>
              </thead>
              <tbody>
                {monthlyBreakdown.map((m) => (
                  <tr key={m.key} className="border-b border-line/60 last:border-0">
                    <td className="py-2 pr-4">
                      {MONTH_NAMES[m.month]} {m.year}
                    </td>
                    <td className="py-2 pr-4">{m.count}</td>
                    <td className="py-2 pr-4 font-medium">{money(m.total, currency)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="rounded-md border border-line bg-surface p-6 shadow-card">
        <h2 className="mb-1 font-display text-[17px] font-semibold tracking-tight">How these are calculated</h2>
        <p className="text-[13px] leading-relaxed text-ink-soft">
          <strong>Today</strong>, <strong>yesterday</strong>, <strong>this month</strong>, and{" "}
          <strong>this year</strong> use the calendar day, month, and year.{" "}
          <strong>All-time</strong> includes every bill ever saved.
        </p>
      </div>
    </div>
  );
}

export default function SalesPage() {
  return (
    <ClientOnly fallback={<SalesSkeleton />}>
      <SalesContent />
    </ClientOnly>
  );
}