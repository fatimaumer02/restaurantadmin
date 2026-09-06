"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { AlertTriangle, Check } from "lucide-react";

type Tone = "default" | "danger";
interface ToastItem {
  id: string;
  message: string;
  tone: Tone;
}

const ToastContext = createContext<(message: string, tone?: Tone) => void>(() => {});

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const push = useCallback((message: string, tone: Tone = "default") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, message, tone }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);

  return (
    <ToastContext.Provider value={push}>
      {children}
      <div className="fixed top-4 right-4 z-[200] flex w-72 flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`flex items-center gap-2 rounded-sm px-4 py-3 text-sm shadow-pop ${
              t.tone === "danger" ? "bg-wine text-white" : "bg-sidebar text-sidebar-text"
            }`}
          >
            {t.tone === "danger" ? <AlertTriangle size={16} /> : <Check size={16} />}
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
