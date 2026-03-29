"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface SaleEntry {
  id: number;
  time: string;
  product: string;
  qty: number;
  price: number;
  method: string;
}

const products = [
  { name: "Hennessy VS 70cl", price: 18500 },
  { name: "Nivea Creme 400ml", price: 3200 },
  { name: "Wax tissu 6 yards", price: 8500 },
  { name: "Huile Dinor 1L", price: 1650 },
  { name: "Plaquettes frein AV", price: 12000 },
  { name: "iPhone 15 coque", price: 4500 },
  { name: "Matelas 2 places", price: 45000 },
  { name: "Paracetamol 500mg", price: 800 },
  { name: "Ciment CIM 50kg", price: 5200 },
  { name: "Whisky JW Red 1L", price: 15000 },
];

const methods = ["Especes", "MTN MoMo", "Orange Money", "Wave", "Carte"];

function randomEntry(id: number): SaleEntry {
  const product = products[Math.floor(Math.random() * products.length)];
  const qty = Math.floor(Math.random() * 3) + 1;
  const now = new Date();
  const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
  return {
    id,
    time,
    product: product.name,
    qty,
    price: product.price * qty,
    method: methods[Math.floor(Math.random() * methods.length)],
  };
}

let globalId = 0;

export function POSTerminal() {
  const [entries, setEntries] = useState<SaleEntry[]>([]);
  const [total, setTotal] = useState(0);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const initial: SaleEntry[] = [];
    for (let i = 0; i < 4; i++) {
      initial.push(randomEntry(++globalId));
    }
    setEntries(initial);
    setTotal(initial.reduce((s, e) => s + e.price, 0));

    const interval = setInterval(() => {
      const entry = randomEntry(++globalId);
      setEntries((current) => {
        const next = [...current, entry].slice(-6);
        setTotal(next.reduce((s, e) => s + e.price, 0));
        return next;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto max-w-2xl overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950">
      {/* Terminal header */}
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500/60" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
          <div className="h-3 w-3 rounded-full bg-green-500/60" />
        </div>
        <span className="font-mono text-xs text-zinc-600">
          DUKA POS -- Terminal #001
        </span>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="font-mono text-xs text-primary">En ligne</span>
        </div>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-12 gap-2 border-b border-zinc-800/50 px-4 py-2 font-mono text-xs text-zinc-600">
        <div className="col-span-2">Heure</div>
        <div className="col-span-4">Produit</div>
        <div className="col-span-1 text-right">Qte</div>
        <div className="col-span-3 text-right">Montant</div>
        <div className="col-span-2 text-right">Paiement</div>
      </div>

      {/* Entries */}
      <div className="min-h-[240px] px-4 py-2">
        <AnimatePresence mode="popLayout">
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-12 gap-2 border-b border-zinc-800/20 py-2 font-mono text-xs"
            >
              <div className="col-span-2 text-zinc-600">{entry.time}</div>
              <div className="col-span-4 truncate text-zinc-300">
                {entry.product}
              </div>
              <div className="col-span-1 text-right text-zinc-400">
                {entry.qty}
              </div>
              <div className="col-span-3 text-right text-zinc-100">
                {entry.price.toLocaleString("fr-FR")} F
              </div>
              <div className="col-span-2 text-right text-primary/80">
                {entry.method}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer total */}
      <div className="flex items-center justify-between border-t border-zinc-800 bg-zinc-900/50 px-4 py-3">
        <span className="font-mono text-xs text-zinc-500">
          {entries.length} articles affiches
        </span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-zinc-500">TOTAL</span>
          <span className="font-mono text-sm font-bold text-primary">
            {total.toLocaleString("fr-FR")} FCFA
          </span>
        </div>
      </div>
    </div>
  );
}
