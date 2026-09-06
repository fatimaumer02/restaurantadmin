"use client";

import { useState } from "react";
import { ReceiptText, ShoppingCart } from "lucide-react";
import { useStore } from "@/lib/store";
import { EmptyState } from "@/components/ui/atoms";
import { Modal, ConfirmDialog, type ConfirmState } from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import CartRow from "@/components/cart/CartRow";
import BillTicket from "@/components/cart/BillTicket";
import { useToast } from "@/components/ui/Toast";
import ClientOnly from "@/components/ClientOnly";
import { money } from "@/lib/utils";

function CartSkeleton() {
  return <div className="skeleton h-[320px]" />;
}

function CartContent() {
  const cart = useStore((s) => s.cart);
  const incCartItem = useStore((s) => s.incCartItem);
  const decCartItem = useStore((s) => s.decCartItem);
  const removeCartItem = useStore((s) => s.removeCartItem);
  const clearCart = useStore((s) => s.clearCart);
  const createBill = useStore((s) => s.createBill);
  const currency = useStore((s) => s.settings.currency);
  const restaurantName = useStore((s) => s.settings.restaurantName);
  const push = useToast();

  const [confirmClear, setConfirmClear] = useState<ConfirmState | null>(null);
  const [preview, setPreview] = useState(false);
  const [customerName, setCustomerName] = useState("");

  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  const grandTotal = cart.reduce((s, i) => s + i.qty * i.price, 0);

  if (cart.length === 0) {
    return (
      <EmptyState
        icon={ShoppingCart}
        title="Your cart is empty"
        hint="Add items from the menu to start building a bill."
      />
    );
  }

  return (
    <div className="flex flex-col gap-7">
      <div className="rounded-md border border-line bg-surface p-6 shadow-card">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-display text-[17px] font-semibold tracking-tight">Cart items</h2>
          <button
            className="text-[12.5px] font-medium text-copper-deep hover:underline"
            onClick={() =>
              setConfirmClear({
                open: true,
                title: "Clear cart?",
                message: "This removes every item currently in the cart.",
                confirmLabel: "Clear cart",
                onConfirm: () => {
                  clearCart();
                  setConfirmClear(null);
                  push("Cart cleared", "danger");
                },
              })
            }
          >
            Clear cart
          </button>
        </div>
        <div>
          {cart.map((item) => (
            <CartRow
              key={item.id}
              item={item}
              currency={currency}
              onInc={() => incCartItem(item.id)}
              onDec={() => decCartItem(item.id)}
              onRemove={() => {
                removeCartItem(item.id);
                push(`Removed ${item.name}`);
              }}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3.5 rounded-md border border-line bg-surface p-6 shadow-card">
        <div className="flex items-center justify-between text-[14px] text-ink-soft">
          <span>Total quantity</span>
          <span className="mono">{totalQty}</span>
        </div>
        <div className="flex items-center justify-between font-display text-[21px] font-semibold">
          <span>Grand total</span>
          <span className="mono">{money(grandTotal, currency)}</span>
        </div>
        <Button variant="primary" size="lg" onClick={() => setPreview(true)}>
          <ReceiptText size={16} /> Create bill
        </Button>
      </div>

      <Modal
        open={preview}
        onClose={() => setPreview(false)}
        title="Bill preview"
        width={420}
        footer={
          <>
            <Button variant="ghost" onClick={() => setPreview(false)}>
              Keep editing
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                createBill(cart, customerName);
                setPreview(false);
                setCustomerName("");
                push("Bill saved");
              }}
            >
              Save bill
            </Button>
          </>
        }
      >
        <div className="mb-4 flex flex-col gap-1.5">
          <label className="text-[12.5px] font-medium text-ink-soft">Customer name (optional)</label>
          <input
            className="input"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="e.g. Ali"
          />
        </div>
        <BillTicket
          restaurantName={restaurantName}
          items={cart}
          totalQty={totalQty}
          grandTotal={grandTotal}
          currency={currency}
          customerName={customerName}
          pending
        />
      </Modal>

      <ConfirmDialog state={confirmClear} onCancel={() => setConfirmClear(null)} />
    </div>
  );
}

export default function CartPage() {
  return (
    <ClientOnly fallback={<CartSkeleton />}>
      <CartContent />
    </ClientOnly>
  );
}