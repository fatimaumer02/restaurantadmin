"use client";

import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { CategoryChip, IconButton } from "@/components/ui/atoms";
import Button from "@/components/ui/Button";
import { CATEGORY_META } from "@/lib/categories";
import { money, cn } from "@/lib/utils";
import type { MenuItem, SizeOption } from "@/lib/types";

const ALL_SIZE_KEYS = ["S", "M", "L", "XL"] as const;

export default function MenuCard({
  item,
  currency,
  onEdit,
  onDelete,
  onAddToCart,
  onToggleAvailable,
}: {
  item: MenuItem;
  currency: string;
  onEdit: () => void;
  onDelete: () => void;
  onAddToCart: (size?: SizeOption) => void;
  onToggleAvailable: () => void;
}) {
  const meta = CATEGORY_META[item.category] ?? CATEGORY_META.Other;
  const Icon = meta.icon;

  // Older saved items (created before size support) may not have a `sizes`
  // field at all, so fall back to an empty array instead of crashing.
  const sizes = item.sizes ?? [];
  const hasSizes = sizes.length > 0;

  const [selectedSize, setSelectedSize] = useState<SizeOption | undefined>(
    hasSizes ? sizes[0] : undefined
  );
  const [imageFailed, setImageFailed] = useState(false);

  const displayPrice = hasSizes ? selectedSize?.price ?? sizes[0].price : item.price;

  return (
    <div className="flex flex-col overflow-hidden rounded-md border border-line bg-surface shadow-card transition hover:-translate-y-0.5 hover:shadow-lg">
      <div
        className="relative flex h-[104px] items-center justify-center"
        style={{ backgroundColor: `${meta.color}22`, color: meta.color }}
      >
        {item.image && !imageFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <Icon size={26} />
        )}
        {!item.available && (
          <button
            type="button"
            onClick={onToggleAvailable}
            className="absolute right-2.5 top-2.5 rounded-sm border border-wine bg-wine px-2 py-1 text-[10.5px] font-semibold text-white transition hover:opacity-90"
          >
            Unavailable
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 px-4 pb-2 pt-4">
        <div className="flex items-start justify-between gap-2.5">
          <h3 className="font-display text-[16px] font-semibold tracking-tight">{item.name}</h3>
          <div className="text-right">
            {hasSizes && (
              <div className="whitespace-nowrap text-[10.5px] text-ink-faint">
                {selectedSize?.label ?? sizes[0].label}
              </div>
            )}
            <span className="whitespace-nowrap text-[14.5px] font-semibold text-copper-deep">
              {money(displayPrice, currency)}
            </span>
          </div>
        </div>

        <CategoryChip category={item.category} />

        {item.description && (
          <p className="text-[12.5px] leading-relaxed text-ink-soft">{item.description}</p>
        )}

        {hasSizes && (
          <div className="mt-1 grid grid-cols-4 gap-1.5">
            {ALL_SIZE_KEYS.map((key) => {
              const sizeOption = sizes.find((s) => s.label === key);
              const isActive = selectedSize?.label === key;

              if (!sizeOption) {
                return (
                  <span
                    key={key}
                    className="flex items-center justify-center rounded-sm border border-dashed border-line-strong bg-surface-alt py-1.5 text-center text-[11.5px] font-semibold text-ink-faint"
                  >
                    {key}
                  </span>
                );
              }

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedSize(sizeOption)}
                  className={cn(
                    "flex items-center justify-center rounded-sm border py-1.5 text-center text-[11.5px] font-semibold transition",
                    isActive
                      ? "border-copper bg-copper text-[#2A1204]"
                      : "border-line-strong bg-surface-alt text-ink-soft hover:border-copper hover:text-copper-deep"
                  )}
                >
                  {key}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 border-t border-line px-4 py-3.5">
        <IconButton onClick={onEdit} aria-label="Edit item">
          <Pencil size={15} />
        </IconButton>
        <IconButton danger onClick={onDelete} aria-label="Delete item">
          <Trash2 size={15} />
        </IconButton>
        <Button
          variant="primary"
          size="sm"
          className="flex-1"
          disabled={!item.available}
          onClick={() => onAddToCart(hasSizes ? selectedSize ?? sizes[0] : undefined)}
        >
          <Plus size={14} /> Add to cart
        </Button>
      </div>
    </div>
  );
}