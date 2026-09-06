"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useStore } from "@/lib/store";
import { Field } from "@/components/ui/atoms";
import Button from "@/components/ui/Button";
import { ConfirmDialog, type ConfirmState } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import ClientOnly from "@/components/ClientOnly";

const CURRENCIES = ["Rs", "\u20ac", "\u00a3", "\u20b9", "$"];

function SettingsSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="skeleton h-[220px] max-w-[480px]" />
      <div className="skeleton h-[160px] max-w-[480px]" />
    </div>
  );
}

function SettingsContent() {
  const settings = useStore((s) => s.settings as any);
  const updateSettings = useStore((s) => s.updateSettings as (updates: Record<string, any>) => void);
  const resetAll = useStore((s) => s.resetAll);
  const push = useToast();
  const [confirmReset, setConfirmReset] = useState<ConfirmState | null>(null);
  const [taxInput, setTaxInput] = useState(String(settings.taxRate ?? 0));

  const commitTax = () => {
    const parsed = parseFloat(taxInput);
    const safe = isNaN(parsed) ? 0 : Math.max(0, parsed);
    setTaxInput(String(safe));
    updateSettings({ taxRate: safe });
  };

  return (
    <div className="flex flex-col gap-7">
      <div className="max-w-[480px] rounded-md border border-line bg-surface p-6 shadow-card">
        <h2 className="mb-4 font-display text-[17px] font-semibold tracking-tight">Restaurant details</h2>
        <div className="flex flex-col gap-4">
          <Field label="Restaurant name">
            <input
              className="input"
              value={settings.restaurantName}
              onChange={(e) => updateSettings({ restaurantName: e.target.value })}
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Currency symbol">
              <select
                className="input"
                value={settings.currency}
                onChange={(e) => updateSettings({ currency: e.target.value })}
              >
                {CURRENCIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Tax rate (%)">
              <input
                className="input"
                type="number"
                min="0"
                step="0.1"
                value={taxInput}
                onChange={(e) => setTaxInput(e.target.value)}
                onBlur={commitTax}
                placeholder="0"
              />
            </Field>
          </div>
        </div>
      </div>

      <div className="max-w-[480px] rounded-md border border-line bg-surface p-6 shadow-card">
        <h2 className="mb-4 font-display text-[17px] font-semibold tracking-tight">Data</h2>
        <p className="mb-3.5 text-[13.5px] leading-relaxed text-ink-soft">
          Menu items, cart contents and saved bills are stored in this browser and will still be here
          the next time you open this dashboard.
        </p>
        <Button
          variant="danger"
          onClick={() =>
            setConfirmReset({
              open: true,
              title: "Reset everything?",
              message: "This permanently deletes every menu item, cart item and saved bill.",
              confirmLabel: "Reset data",
              onConfirm: () => {
                resetAll();
                setConfirmReset(null);
                push("All data reset", "danger");
              },
            })
          }
        >
          <Trash2 size={15} /> Reset all data
        </Button>
      </div>

      <ConfirmDialog state={confirmReset} onCancel={() => setConfirmReset(null)} />
    </div>
  );
}

export default function SettingsPage() {
  return (
    <ClientOnly fallback={<SettingsSkeleton />}>
      <SettingsContent />
    </ClientOnly>
  );
}