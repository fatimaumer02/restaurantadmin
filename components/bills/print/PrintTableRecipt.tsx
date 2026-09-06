"use client";

import { Printer } from "lucide-react";
import Button from "@/components/ui/Button";
import { money, orderNumber as fmtOrderNumber } from "@/lib/utils";
import type { CartItem } from "@/lib/types";

export default function PrintableReceipt({
  restaurantName,
  orderNumber,
  date,
  items,
  currency,
  taxRate,
  customerName,
}: {
  restaurantName: string;
  orderNumber: number;
  date: string;
  items: CartItem[];
  currency: string;
  taxRate: number;
  customerName?: string;
}) {
  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
  const tax = (subtotal * (taxRate || 0)) / 100;
  const total = subtotal + tax;
  const dt = new Date(date);

  return (
    <div className="flex flex-col items-center gap-5">
      <div
        id="printable-receipt"
        className="w-full max-w-[320px] rounded-sm border border-line bg-white px-6 py-7 font-mono text-[13px] leading-relaxed text-ink"
      >
        <div className="mb-3 text-center">
          <div className="text-[16px] font-bold uppercase tracking-wide">{restaurantName}</div>  
          {customerName && <div className="mt-1 text-[12.5px] font-semibold">Customer Name: {customerName}</div>}
          <div className="mt-2 text-[12px] text-ink-soft">Order-number: {fmtOrderNumber(orderNumber)}</div>
            <div className="text-[12px] text-ink-soft">
            {dt.toLocaleDateString()} {"\u00b7"}{" "}
            {dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>

        <div className="my-2.5 border-t border-dashed border-ink-faint" />

        <div className="flex flex-col gap-1.5">
          {items.map((it) => (
            <div key={it.id} className="flex items-baseline justify-between gap-3">
              <span className="truncate">
                {it.name}
                {it.qty > 1 ? ` x${it.qty}` : ""}
              </span>
              <span className="whitespace-nowrap">{money(it.price * it.qty, currency)}</span>
            </div>
          ))}
        </div>

        <div className="my-2.5 border-t border-dashed border-ink-faint" />

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{money(subtotal, currency)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax{taxRate ? ` (${taxRate}%)` : ""}</span>
          <span>{money(tax, currency)}</span>
        </div>

        <div className="my-2.5 border-t border-dashed border-ink-faint" />

        <div className="flex justify-between text-[15px] font-bold">
          <span>Total</span>
          <span>{money(total, currency)}</span>
        </div>

        <div className="my-3 border-t border-dashed border-ink-faint" />

        <div className="text-center text-[12px] leading-relaxed text-ink-soft">
          Thank you for your order!
          <br />
          We appreciate your business.
        </div>
      </div>

      <Button variant="primary" onClick={() => window.print()} className="print:hidden">
        <Printer size={15} /> Print receipt
      </Button>
    </div>
  );
}