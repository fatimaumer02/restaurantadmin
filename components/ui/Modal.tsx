"use client";

import { X } from "lucide-react";
import { ReactNode } from "react";
import { IconButton } from "./atoms";
import Button from "./Button";

export function Modal({
  open,
  onClose,
  title,
  width = 480,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  width?: number;
  children: ReactNode;
  footer?: ReactNode;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center bg-[#211C16]/50 p-5 backdrop-blur-[2px]"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="max-h-[88vh] w-full overflow-y-auto rounded-lg bg-surface shadow-pop"
        style={{ maxWidth: width }}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h3 className="font-display text-[18px] font-semibold tracking-tight">{title}</h3>
          <IconButton onClick={onClose} aria-label="Close">
            <X size={18} />
          </IconButton>
        </div>
        <div className="p-6">{children}</div>
        {footer && <div className="flex justify-end gap-2.5 border-t border-line px-6 py-4">{footer}</div>}
      </div>
    </div>
  );
}

export interface ConfirmState {
  open: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
}

export function ConfirmDialog({
  state,
  onCancel,
}: {
  state: ConfirmState | null;
  onCancel: () => void;
}) {
  if (!state?.open) return null;
  return (
    <Modal
      open
      onClose={onCancel}
      title={state.title || "Please confirm"}
      width={380}
      footer={
        <>
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={state.onConfirm}>
            {state.confirmLabel || "Delete"}
          </Button>
        </>
      }
    >
      <p className="text-[14px] leading-relaxed text-ink-soft">{state.message}</p>
    </Modal>
  );
}
