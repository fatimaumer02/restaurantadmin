"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import CartRow from "@/components/cart/CartRow";
import { useStore } from "@/lib/store";
import { money } from "@/lib/utils";
import type { Bill, CartItem } from "@/lib/types";

export default function EditBillForm({
  bill,
  currency,
  onCancel,
  onSave,
}: {
  bill: Bill;
  currency: string;
  onCancel: () => void;
  onSave: (bill: Bill) => void;
}) {
  const menuItems = useStore((s) => s.menuItems);
  const [items, setItems] = useState<CartItem[]>(bill.items.map((i) => ({ ...i })));

  const availableItems = menuItems.filter((m) => m.available);
  const [selectedItemId, setSelectedItemId] = useState(availableItems[0]?.id ?? "");
  const selectedItem = availableItems.find((m) => m.id === selectedItemId);
  const itemSizes = selectedItem?.sizes ?? [];
  const hasSizes = itemSizes.length > 0;
  const [selectedSizeLabel, setSelectedSizeLabel] = useState(itemSizes[0]?.label ?? "");

  const handleItemChange = (id: string) => {
    setSelectedItemId(id);
    const item = availableItems.find((m) => m.id === id);
    setSelectedSizeLabel(item?.sizes?.[0]?.label ?? "");
  };

  const addItem = () => {
    if (!selectedItem) return;
    const size = itemSizes.find((s) => s.label === selectedSizeLabel);
    const unitPrice = hasSizes ? size?.price ?? selectedItem.price : selectedItem.price;
    const cartId = hasSizes && size ? `${selectedItem.id}::${size.label}` : selectedItem.id;
    const displayName = hasSizes && size ? `${selectedItem.name} (${size.label})` : selectedItem.name;

    setItems((current) => {
      const existing = current.find((i) => i.id === cartId);
      if (existing) {
        return current.map((i) => (i.id === cartId ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...current, { id: cartId, name: displayName, price: unitPrice, qty: 1 }];
    });
  };

  const inc = (id: string) => setItems((it) => it.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));
  const dec = (id: string) =>
    setItems((it) => it.map((i) => (i.id === id && i.qty > 1 ? { ...i, qty: i.qty - 1 } : i)));
  const remove = (id: string) => setItems((it) => it.filter((i) => i.id !== id));

  const grandTotal = items.reduce((s, i) => s + i.qty * i.price, 0);
  const totalQty = items.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="flex flex-col gap-5">
      {availableItems.length > 0 && (
        <div className="flex flex-col gap-2.5 rounded-sm border border-line-strong bg-surface-alt p-3.5">
          <span className="text-[12.5px] font-medium text-ink-soft">Add an item to this bill</span>
          <div className="flex flex-wrap gap-2">
            <select
              className="input min-w-[140px] flex-1"
              value={selectedItemId}
              onChange={(e) => handleItemChange(e.target.value)}
            >
              {availableItems.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
            {hasSizes && (
              <select
                className="input w-20"
                value={selectedSizeLabel}
                onChange={(e) => setSelectedSizeLabel(e.target.value)}
              >
                {itemSizes.map((s) => (
                  <option key={s.label} value={s.label}>
                    {s.label}
                  </option>
                ))}
              </select>
            )}
            <Button type="button" variant="ghost" onClick={addItem}>
              <Plus size={14} /> Add
            </Button>
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <p className="text-[13.5px] text-ink-soft">All items removed &mdash; saving will delete this bill instead.</p>
      ) : (
        <div>
          {items.map((item) => (
            <CartRow
              key={item.id}
              item={item}
              currency={currency}
              onInc={() => inc(item.id)}
              onDec={() => dec(item.id)}
              onRemove={() => remove(item.id)}
            />
          ))}
        </div>
      )}
      <div className="flex items-center justify-between font-display text-[19px] font-semibold">
        <span>Grand total</span>
        <span className="mono">{money(grandTotal, currency)}</span>
      </div>
      <div className="flex justify-end gap-2.5 pt-1">
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => onSave({ ...bill, items, totalQty, grandTotal })}>
          Save changes
        </Button>
      </div>
    </div>
  );
}