import { Eye, Pencil, Trash2 } from "lucide-react";
import { IconButton } from "@/components/ui/atoms";
import { money, orderNumber } from "@/lib/utils";
import type { Bill } from "@/lib/types";

export default function BillCard({
  bill,
  currency,
  onView,
  onEdit,
  onDelete,
}: {
  bill: Bill;
  currency: string;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-md border border-line bg-surface p-[18px] shadow-card">
      <div className="flex items-center justify-between">
        <span className="mono text-[14.5px] font-semibold text-copper-deep">{orderNumber(bill.orderNumber)}</span>
        <span className="text-[13px] text-ink-soft">{new Date(bill.date).toLocaleString()}</span>
      </div>
      <ul className="flex flex-col gap-1 text-[12.5px] text-ink-soft">
        {bill.items.slice(0, 4).map((i) => (
          <li key={i.id}>
            {i.name} &times; {i.qty}
          </li>
        ))}
        {bill.items.length > 4 && <li className="text-ink-faint">+{bill.items.length - 4} more</li>}
      </ul>
      <div className="flex items-end justify-between border-t border-line pt-2.5">
        <div>
          <div className="text-[13px] text-ink-soft">Total items: {bill.totalQty}</div>
          <div className="mono font-display text-[17px] font-semibold">{money(bill.grandTotal, currency)}</div>
        </div>
        <div className="flex gap-1.5">
          <IconButton onClick={onView} aria-label="View bill">
            <Eye size={15} />
          </IconButton>
          <IconButton onClick={onEdit} aria-label="Edit bill">
            <Pencil size={15} />
          </IconButton>
          <IconButton danger onClick={onDelete} aria-label="Delete bill">
            <Trash2 size={15} />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
