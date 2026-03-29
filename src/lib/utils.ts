import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCFA(amount: number, currency = "XOF"): string {
  return new Intl.NumberFormat("fr-CI", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function calculateMargin(buyPrice: number, sellPrice: number) {
  if (sellPrice === 0) return { absolute: 0, percent: 0 };
  const absolute = sellPrice - buyPrice;
  const percent = (absolute / sellPrice) * 100;
  return { absolute, percent };
}

export function generateRef(prefix: string, index: number): string {
  return `${prefix}-${String(index).padStart(4, "0")}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
