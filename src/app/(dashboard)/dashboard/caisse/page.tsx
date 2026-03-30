"use client";

import { useState, useEffect, useCallback } from "react";
import { Wallet, Plus, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCFA } from "@/lib/utils";
import { getUserOrganizations } from "@/actions/organizations";
import {
  getCashEntries,
  getDailyBalance,
  createCashEntry,
} from "@/actions/cash-entries";
import type { PaymentMethod } from "@/generated/prisma/client";
import { toast } from "sonner";

type CashEntryRow = {
  id: string;
  type: "IN" | "OUT";
  amount: number;
  label: string;
  method: string;
  date: Date | string;
  runningBalance: number;
  relatedSale: { id: string; invoiceNumber: string } | null;
};

export default function CashJournalPage() {
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [entries, setEntries] = useState<CashEntryRow[]>([]);
  const [balance, setBalance] = useState({ totalIn: 0, totalOut: 0, balance: 0 });
  const [orgId, setOrgId] = useState<string | null>(null);
  const [storeId, setStoreId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [entryType, setEntryType] = useState<"IN" | "OUT">("IN");
  const [entryAmount, setEntryAmount] = useState("");
  const [entryLabel, setEntryLabel] = useState("");
  const [entryMethod, setEntryMethod] = useState<PaymentMethod>("CASH");

  const loadData = useCallback(async (oId: string, sId: string) => {
    try {
      const today = new Date();
      const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

      const [entriesData, balanceData] = await Promise.all([
        getCashEntries(oId, sId, todayStart, todayEnd),
        getDailyBalance(oId, sId, today),
      ]);

      setEntries(entriesData);
      setBalance(balanceData);
    } catch (err) {
      console.error("Failed to load cash data", err);
    }
  }, []);

  useEffect(() => {
    async function init() {
      try {
        const orgs = await getUserOrganizations();
        const org = orgs[0];
        if (!org) return;
        const store = org.stores[0];
        if (!store) return;
        setOrgId(org.id);
        setStoreId(store.id);
        await loadData(org.id, store.id);
      } catch (err) {
        console.error("Failed to init cash journal", err);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [loadData]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!orgId || !storeId) return;

    const amount = parseInt(entryAmount, 10);
    if (!amount || amount <= 0) {
      toast.error("Montant invalide");
      return;
    }
    if (!entryLabel.trim()) {
      toast.error("Libelle requis");
      return;
    }

    setSubmitting(true);
    try {
      await createCashEntry({
        orgId,
        storeId,
        type: entryType,
        amount,
        label: entryLabel.trim(),
        method: entryMethod,
      });

      toast.success("Ecriture enregistree");
      setEntryAmount("");
      setEntryLabel("");
      setEntryType("IN");
      setShowNewEntry(false);

      await loadData(orgId, storeId);
    } catch (err) {
      toast.error("Erreur lors de l'enregistrement");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  function formatDate(d: Date | string) {
    const date = new Date(d);
    return date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Journal de caisse</h1>
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Journal de caisse
          </h1>
          <p className="text-muted-foreground">
            Suivi des encaissements et decaissements — registre immuable
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowNewEntry(!showNewEntry)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle ecriture
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Solde du jour</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">
              {formatCFA(balance.balance)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Entrees</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-green-500">
              {formatCFA(balance.totalIn)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Sorties</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-destructive">
              {formatCFA(balance.totalOut)}
            </div>
          </CardContent>
        </Card>
      </div>

      {showNewEntry && (
        <Card>
          <CardHeader>
            <CardTitle>Nouvelle ecriture manuelle</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
            >
              <div>
                <label className="mb-1.5 block text-sm font-medium">Type</label>
                <select
                  value={entryType}
                  onChange={(e) => setEntryType(e.target.value as "IN" | "OUT")}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
                >
                  <option value="IN">Entree</option>
                  <option value="OUT">Sortie</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Montant (FCFA)
                </label>
                <input
                  type="number"
                  min="0"
                  value={entryAmount}
                  onChange={(e) => setEntryAmount(e.target.value)}
                  placeholder="0"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-mono outline-none ring-ring focus:ring-2"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Libelle
                </label>
                <input
                  type="text"
                  value={entryLabel}
                  onChange={(e) => setEntryLabel(e.target.value)}
                  placeholder="Ex: Loyer boutique"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Methode
                </label>
                <select
                  value={entryMethod}
                  onChange={(e) => setEntryMethod(e.target.value as PaymentMethod)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
                >
                  <option value="CASH">Especes</option>
                  <option value="MOBILE_MONEY">Mobile Money</option>
                  <option value="CARD">Carte</option>
                </select>
              </div>
              <div className="flex items-end">
                <Button className="w-full" type="submit" disabled={submitting}>
                  {submitting ? "Enregistrement..." : "Enregistrer"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Ecritures du jour</CardTitle>
        </CardHeader>
        <CardContent>
          {entries.length === 0 ? (
            <div className="flex h-48 items-center justify-center text-muted-foreground">
              Aucune ecriture aujourd&apos;hui
            </div>
          ) : (
            <div className="rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-muted-foreground">
                    <th className="px-4 py-3 font-medium">Heure</th>
                    <th className="px-4 py-3 font-medium">Libelle</th>
                    <th className="px-4 py-3 font-medium">Type</th>
                    <th className="px-4 py-3 text-right font-medium">Montant</th>
                    <th className="px-4 py-3 text-right font-medium">Solde cumule</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry) => (
                    <tr
                      key={entry.id}
                      className="border-b border-border last:border-0"
                    >
                      <td className="px-4 py-3 text-muted-foreground font-mono">
                        {formatDate(entry.date)}
                      </td>
                      <td className="px-4 py-3">
                        {entry.label}
                        {entry.relatedSale && (
                          <span className="ml-2 text-xs text-muted-foreground font-mono">
                            ({entry.relatedSale.invoiceNumber})
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={entry.type === "IN" ? "default" : "destructive"}
                          className="text-xs"
                        >
                          {entry.type === "IN" ? "Entree" : "Sortie"}
                        </Badge>
                      </td>
                      <td
                        className={`px-4 py-3 text-right font-mono font-medium ${
                          entry.type === "IN" ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {entry.type === "IN" ? "+" : "-"}{formatCFA(entry.amount)}
                      </td>
                      <td className="px-4 py-3 text-right font-mono">
                        {formatCFA(entry.runningBalance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
