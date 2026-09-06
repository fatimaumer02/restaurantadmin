import { money, orderNumber as fmtOrderNumber } from "@/lib/utils";
import type { CartItem } from "@/lib/types";

export default function BillTicket({
  restaurantName,
  orderNumber,
  date,
  items,
  totalQty,
  grandTotal,
  currency,
  pending,
}: {
  restaurantName: string;
  orderNumber?: number;
  date?: string;
  items: CartItem[];
  totalQty: number;
  grandTotal: number;
  currency: string;
  pending?: boolean;
}) {
  return (
    <div className="text-[13.5px]">
      <div className="mb-2.5 text-center">
        <div className="font-display text-[18px] font-semibold">{restaurantName}</div>
        <div className="text-[13px] text-ink-soft">{pending || !orderNumber ? "Not yet saved" : fmtOrderNumber(orderNumber)}</div>
        <div className="text-[13px] text-ink-soft">{pending || !date ? "\u2014" : new Date(date).toLocaleString()}</div>
      </div>
      <div className="my-3 border-t border-dashed border-line-strong" />
      <div className="flex flex-col gap-2.5">
        {items.map((it) => (
          <div key={it.id} className="grid grid-cols-[1fr_auto_auto] items-center gap-3">
            <span>{it.name}</span>
            <span className="mono">
              {it.qty} &times; {money(it.price, currency)}
            </span>
            <span className="mono min-w-[58px] text-right">{money(it.qty * it.price, currency)}</span>
          </div>
        ))}
      </div>
      <div className="my-3 border-t border-dashed border-line-strong" />
      <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3">
        <span>Total items</span>
        <span />
        <span className="mono">{totalQty}</span>
      </div>
      <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3 text-[16px] font-semibold">
        <span>Grand total</span>
        <span />
        <span className="mono">{money(grandTotal, currency)}</span>
      </div>
    </div>
  );
}
