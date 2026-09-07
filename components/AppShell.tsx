"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { ToastProvider } from "./ui/Toast";

const PAGE_META: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": { title: "Dashboard", subtitle: "A quick look at how the floor is doing" },
  "/menu": { title: "Menu management", subtitle: "Add, edit and organize what you serve" },
  "/cart": { title: "Cart", subtitle: "Build the current order before billing it" },
  "/bills": { title: "Bills", subtitle: "Every saved order, searchable by number or date" },
  "/sales": { title: "Sales", subtitle: "Revenue at a glance — today, this month, this year" },
  "/settings": { title: "Settings", subtitle: "Restaurant details and stored data" },
};

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // The landing page is a full-bleed splash screen with no sidebar chrome.
  if (pathname === "/") {
    return <ToastProvider>{children}</ToastProvider>;
  }

  const meta = PAGE_META[pathname] ?? PAGE_META["/dashboard"];

  return (
    <ToastProvider>
      <div className="flex min-h-screen bg-bg text-ink">
        <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
        <main className="min-w-0 flex-1">
          <TopBar title={meta.title} subtitle={meta.subtitle} onMenuClick={() => setMobileOpen(true)} />
          <div className="px-6 pb-12 pt-1 md:px-10 md:pb-14">{children}</div>
        </main>
      </div>
    </ToastProvider>
  );
}