"use client";

import { useMemo, useState } from "react";
import { Pencil, Receipt, Search } from "lucide-react";
import { useStore } from "@/lib/store";
import { EmptyState } from "@/components/ui/atoms";
import { Modal, ConfirmDialog, type ConfirmState } from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import BillCard from "@/components/bills/BillCard";
import EditBillForm from "@/components/bills/EditBillForm";
import PrintableReceipt from "@/components/bills/print/PrintTableRecipt";
import { useToast } from "@/components/ui/Toast";
import ClientOnly from "@/components/ClientOnly";
import { orderNumber } from "@/lib/utils";
import type { Bill } from "@/lib/types";

function BillsSkeleton() {
  return (
    <div className="flex flex-col gap-7">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="skeleton h-[200px]" />
        ))}
      </div>
    </div>
  );
}

function BillsContent() {
  const bills = useStore((s) => s.bills);
  const updateBill = useStore((s) => s.updateBill);
  const deleteBill = useStore((s) => s.deleteBill);
  const currency = useStore((s) => s.settings.currency);
  const restaurantName = useStore((s) => s.settings.restaurantName);
  const push = useToast();

  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [viewing, setViewing] = useState<Bill | null>(null);
  const [editing, setEditing] = useState<Bill | null>(null);
  const [confirm, setConfirm] = useState<ConfirmState | null>(null);

  const filtered = useMemo(() => {
    return bills
      .filter(
        (b) =>
          orderNumber(b.orderNumber).toLowerCase().includes(search.toLowerCase()) ||
          String(b.orderNumber).includes(search) ||
          (b.customerName ?? "").toLowerCase().includes(search.toLowerCase())
      )
      .filter((b) => !dateFilter || new Date(b.date).toISOString().slice(0, 10) === dateFilter)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [bills, search, dateFilter]);

  const saveEdit = (updated: Bill) => {
    if (updated.items.length === 0) {
      deleteBill(updated.id);
      push("Bill emptied and removed", "danger");
    } else {
      updateBill(updated);
      push("Bill updated");
    }
    setEditing(null);
  };

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex min-w-[230px] items-center gap-2.5 rounded-sm border border-line-strong bg-surface px-3.5 py-2.5 text-ink-faint focus-within:border-copper focus-within:ring-4 focus-within:ring-copper-tint">
          <Search size={16} />
          <input
            className="w-full border-none bg-transparent text-sm text-ink outline-none"
            placeholder="Search by order number"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <input
          className="input w-auto"
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
        {(search || dateFilter) && (
          <button
            className="text-[12.5px] font-medium text-copper-deep hover:underline"
            onClick={() => {
              setSearch("");
              setDateFilter("");
            }}
          >
            Reset filters
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Receipt}
          title={bills.length === 0 ? "No bills yet" : "No bills match your filters"}
          hint={
            bills.length === 0
              ? "Save a bill from the cart to see it here."
              : "Try a different order number or date."
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((bill) => (
            <BillCard
              key={bill.id}
              bill={bill}
              currency={currency}
              onView={() => setViewing(bill)}
              onEdit={() => setEditing(bill)}
              onDelete={() =>
                setConfirm({
                  open: true,
                  message: `Delete ${orderNumber(bill.orderNumber)}? This can't be undone.`,
                  onConfirm: () => {
                    deleteBill(bill.id);
                    setConfirm(null);
                    push("Bill deleted", "danger");
                  },
                })
              }
            />
          ))}
        </div>
      )}

      <Modal
        open={!!viewing}
        onClose={() => setViewing(null)}
        title={viewing ? orderNumber(viewing.orderNumber) : ""}
        width={420}
        footer={
          viewing && (
            <Button
              variant="ghost"
              onClick={() => {
                setEditing(viewing);
                setViewing(null);
              }}
            >
              <Pencil size={14} /> Edit this bill
            </Button>
          )
        }
      >
        {viewing && (
          <PrintableReceipt
            restaurantName={restaurantName}
            orderNumber={viewing.orderNumber}
            date={viewing.date}
            items={viewing.items}
            currency={currency}
            taxRate={viewing.taxRate ?? 0}
            customerName={viewing.customerName}
          />
        )}
      </Modal>

      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing ? `Edit ${orderNumber(editing.orderNumber)}` : ""}>
        {editing && (
          <EditBillForm bill={editing} currency={currency} onCancel={() => setEditing(null)} onSave={saveEdit} />
        )}
      </Modal>

      <ConfirmDialog state={confirm} onCancel={() => setConfirm(null)} />
    </div>
  );
}

export default function BillsPage() {
  return (
    <ClientOnly fallback={<BillsSkeleton />}>
      <BillsContent />
    </ClientOnly>
  );
}