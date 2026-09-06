import { Minus, Plus, Trash2 } from "lucide-react";
import { IconButton } from "@/components/ui/atoms";
import { money } from "@/lib/utils";
import type { CartItem } from "@/lib/types";

export default function CartRow({
  item,
  currency,
  onInc,
  onDec,
  onRemove,
}: {
  item: CartItem;
  currency: string;
  onInc: () => void;
  onDec: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex flex-col gap-2.5 border-b border-line py-3.5 last:border-none sm:flex-row sm:items-center sm:gap-4">
      <div className="min-w-0 flex-1">
        <div className="text-[14px] font-medium">{item.name}</div>
        <div className="text-[13px] text-ink-soft">{money(item.price, currency)} each</div>
      </div>
      <div className="flex items-center justify-between gap-3 sm:justify-end sm:gap-4">
        <div className="flex items-center gap-2.5">
          <IconButton onClick={onDec} aria-label="Decrease quantity">
            <Minus size={14} />
          </IconButton>
          <span className="min-w-[18px] text-center text-[14px]">{item.qty}</span>
          <IconButton onClick={onInc} aria-label="Increase quantity">
            <Plus size={14} />
          </IconButton>
        </div>
        <div className="mono min-w-[68px] text-right text-[14px] font-medium">
          {money(item.price * item.qty, currency)}
        </div>
        <IconButton danger onClick={onRemove} aria-label="Remove item">
          <Trash2 size={15} />
        </IconButton>
      </div>
    </div>
  );
}