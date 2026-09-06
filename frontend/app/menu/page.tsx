"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Plus, Search, UtensilsCrossed } from "lucide-react";
import { useStore } from "@/lib/store";
import { CATEGORIES } from "@/lib/categories";
import { EmptyState } from "@/components/ui/atoms";
import { Modal, ConfirmDialog, type ConfirmState } from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import MenuCard from "@/components/menu/MenuCard";
import MenuItemForm from "@/components/menu/MenuItemForm";
import { useToast } from "@/components/ui/Toast";
import ClientOnly from "@/components/ClientOnly";
import type { MenuItem } from "@/lib/types";

type ModalState = { mode: "add" } | { mode: "edit"; item: MenuItem } | null;

function MenuSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="skeleton h-[240px]" />
      ))}
    </div>
  );
}

function MenuContent() {
  const params = useSearchParams();
  const menuItems = useStore((s) => s.menuItems);
  const currency = useStore((s) => s.settings.currency);
  const addMenuItem = useStore((s) => s.addMenuItem);
  const updateMenuItem = useStore((s) => s.updateMenuItem);
  const deleteMenuItem = useStore((s) => s.deleteMenuItem);
  const addToCart = useStore((s) => s.addToCart);
  const push = useToast();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [modal, setModal] = useState<ModalState>(params.get("add") ? { mode: "add" } : null);
  const [confirm, setConfirm] = useState<ConfirmState | null>(null);

  const filtered = useMemo(() => {
    return menuItems.filter((m) => {
      const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || m.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [menuItems, search, category]);

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex min-w-[230px] items-center gap-2.5 rounded-sm border border-line-strong bg-surface px-3.5 py-2.5 text-ink-faint focus-within:border-copper focus-within:ring-4 focus-within:ring-copper-tint">
          <Search size={16} />
          <input
            className="w-full border-none bg-transparent text-sm text-ink outline-none"
            placeholder="Search menu items"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select className="input w-auto" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>All</option>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <Button variant="primary" className="ml-auto" onClick={() => setModal({ mode: "add" })}>
          <Plus size={16} /> Add menu item
        </Button>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={UtensilsCrossed}
          title={menuItems.length === 0 ? "Your menu is empty" : "No items match your search"}
          hint={
            menuItems.length === 0
              ? "Add your first dish to get the menu started."
              : "Try a different search term or category."
          }
          action={
            menuItems.length === 0 && (
              <Button variant="primary" onClick={() => setModal({ mode: "add" })}>
                <Plus size={16} /> Add menu item
              </Button>
            )
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              currency={currency}
              onEdit={() => setModal({ mode: "edit", item })}
              onDelete={() =>
                setConfirm({
                  open: true,
                  message: `Are you sure you want to delete "${item.name}"?`,
                  onConfirm: () => {
                    deleteMenuItem(item.id);
                    setConfirm(null);
                    push(`Deleted ${item.name}`, "danger");
                  },
                })
              }
              onAddToCart={(size) => {
                addToCart(item, size);
                push(`Added ${item.name}${size ? ` (${size.label})` : ""} to cart`);
              }}
              onToggleAvailable={() => {
                updateMenuItem(item.id, { ...item, available: !item.available });
                push(item.available ? `${item.name} marked unavailable` : `${item.name} marked available`);
              }}
            />
          ))}
        </div>
      )}

      <Modal
        open={!!modal}
        onClose={() => setModal(null)}
        title={modal?.mode === "edit" ? "Edit menu item" : "Add menu item"}
      >
        {modal && (
          <MenuItemForm
            initial={modal.mode === "edit" ? modal.item : undefined}
            onCancel={() => setModal(null)}
            onSave={(data) => {
              if (modal.mode === "edit") {
                updateMenuItem(modal.item.id, data);
                push("Menu item updated");
              } else {
                addMenuItem(data);
                push("Menu item added");
              }
              setModal(null);
            }}
          />
        )}
      </Modal>

      <ConfirmDialog state={confirm} onCancel={() => setConfirm(null)} />
    </div>
  );
}

export default function MenuPage() {
  return (
    <ClientOnly fallback={<MenuSkeleton />}>
      <Suspense fallback={<MenuSkeleton />}>
        <MenuContent />
      </Suspense>
    </ClientOnly>
  );
}