"use client";

import { useState } from "react";
import { Field, SwitchToggle } from "@/components/ui/atoms";
import Button from "@/components/ui/Button";
import { CATEGORIES } from "@/lib/categories";
import { cn } from "@/lib/utils";
import type { Category, MenuItem, SizeOption } from "@/lib/types";

const SIZE_KEYS = ["S", "M", "L", "XL"] as const;
type SizeKey = (typeof SIZE_KEYS)[number];

type FormState = {
  name: string;
  category: Category;
  description: string;
  price: string;
  activeSizes: SizeKey[]; // which size pills are toggled on — empty by default
  sizePrices: Record<SizeKey, string>;
  image: string;
  available: boolean;
};

const EMPTY_SIZES: Record<SizeKey, string> = { S: "", M: "", L: "", XL: "" };

function buildInitialState(initial?: MenuItem): FormState {
  if (!initial) {
    return {
      name: "",
      category: CATEGORIES[0],
      description: "",
      price: "",
      activeSizes: [],
      sizePrices: { ...EMPTY_SIZES },
      image: "",
      available: true,
    };
  }
  const sizePrices = { ...EMPTY_SIZES };
  const activeSizes: SizeKey[] = [];
  initial.sizes?.forEach((s) => {
    if ((SIZE_KEYS as readonly string[]).includes(s.label)) {
      const key = s.label as SizeKey;
      sizePrices[key] = String(s.price);
      activeSizes.push(key);
    }
  });
  return {
    name: initial.name,
    category: initial.category,
    description: initial.description,
    price: String(initial.price),
    activeSizes,
    sizePrices,
    image: initial.image,
    available: initial.available,
  };
}

export default function MenuItemForm({
  initial,
  onCancel,
  onSave,
}: {
  initial?: MenuItem;
  onCancel: () => void;
  onSave: (data: Omit<MenuItem, "id">) => void;
}) {
  const [form, setForm] = useState<FormState>(buildInitialState(initial));

  const set = <K extends keyof FormState>(key: K) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value as FormState[K] }));

  const toggleSize = (key: SizeKey) =>
    setForm((f) => ({
      ...f,
      activeSizes: f.activeSizes.includes(key)
        ? f.activeSizes.filter((k) => k !== key)
        : [...f.activeSizes, key],
    }));

  const setSizePrice = (key: SizeKey) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, sizePrices: { ...f.sizePrices, [key]: e.target.value } }));

  const hasSizes = form.activeSizes.length > 0;
  const sizesValid =
    hasSizes &&
    form.activeSizes.every((k) => form.sizePrices[k].trim() !== "" && !isNaN(parseFloat(form.sizePrices[k])));

  const canSave = hasSizes
    ? form.name.trim().length > 0 && sizesValid
    : form.name.trim().length > 0 && form.price !== "" && !isNaN(parseFloat(form.price));

  const handleSave = () => {
    const sizes: SizeOption[] = hasSizes
      ? SIZE_KEYS.filter((k) => form.activeSizes.includes(k)).map((k) => ({
          label: k,
          price: parseFloat(form.sizePrices[k]),
        }))
      : [];
    const price = hasSizes ? sizes[0]?.price ?? 0 : parseFloat(form.price);

    onSave({
      name: form.name,
      category: form.category,
      description: form.description,
      price,
      sizes,
      image: form.image,
      available: form.available,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <Field label="Item name">
        <input className="input" value={form.name} onChange={set("name")} placeholder="e.g. Margherita Pizza" />
      </Field>

      <Field label="Category">
        <select className="input" value={form.category} onChange={set("category")}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </Field>

      <div className="flex flex-col gap-2.5">
        <span className="text-[12.5px] font-medium text-ink-soft">
          Sizes (tap to add a size — leave all off for a single price)
        </span>
        <div className="flex gap-2">
          {SIZE_KEYS.map((k) => {
            const active = form.activeSizes.includes(k);
            return (
              <button
                key={k}
                type="button"
                onClick={() => toggleSize(k)}
                className={cn(
                  "flex-1 rounded-sm border px-3 py-2 text-[13px] font-semibold transition",
                  active
                    ? "border-copper bg-copper text-[#2A1204]"
                    : "border-line-strong bg-surface text-ink-soft hover:border-copper hover:text-copper-deep"
                )}
              >
                {k}
              </button>
            );
          })}
        </div>
      </div>

      {hasSizes ? (
        <div className="grid grid-cols-4 gap-3">
          {form.activeSizes.map((k) => (
            <Field key={k} label={`${k} price`}>
              <input
                className="input"
                type="number"
                min="0"
                step="0.01"
                value={form.sizePrices[k]}
                onChange={setSizePrice(k)}
                placeholder="0.00"
              />
            </Field>
          ))}
        </div>
      ) : (
        <Field label="Price">
          <input
            className="input"
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={set("price")}
            placeholder="0.00"
          />
        </Field>
      )}

      <Field label="Description">
        <textarea
          className="input resize-y"
          rows={3}
          value={form.description}
          onChange={set("description")}
          placeholder="Short description shown on the menu card"
        />
      </Field>
      <Field label="Image URL (optional)">
        <input className="input" value={form.image} onChange={set("image")} placeholder="https://..." />
      </Field>
      <label className="flex items-center justify-between">
        <span className="text-[12.5px] font-medium text-ink-soft">Available on menu</span>
        <SwitchToggle checked={form.available} onChange={(v) => setForm((f) => ({ ...f, available: v }))} />
      </label>
      <div className="flex justify-end gap-2.5 pt-1">
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" disabled={!canSave} onClick={handleSave}>
          Save item
        </Button>
      </div>
    </div>
  );
}