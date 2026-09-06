export function money(n: number, symbol = "$"): string {
  return `${symbol}${(Math.round(n * 100) / 100).toFixed(2)}`;
}

export function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}

export function orderNumber(n: number): string {
  return `#${String(n).padStart(3, "0")}`;
}

export function todayKey(d: string | Date): string {
  return new Date(d).toDateString();
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
