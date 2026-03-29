"use client";

import { useState } from "react";
import { Wallet, Plus, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function CashJournalPage() {
  const [showNewEntry, setShowNewEntry] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Journal de caisse
          </h1>
          <p className="text-muted-foreground">
            Suivi des encaissements et décaissements — registre immuable
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowNewEntry(!showNewEntry)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle écriture
          </Button>
          <Button variant="secondary">Arrêté de caisse</Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Solde du jour
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">0 FCFA</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Entrées</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-green-500">
              0 FCFA
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
              0 FCFA
            </div>
          </CardContent>
        </Card>
      </div>

      {showNewEntry && (
        <Card>
          <CardHeader>
            <CardTitle>Nouvelle écriture manuelle</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Type
                </label>
                <select className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2">
                  <option value="IN">Entrée</option>
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
                  placeholder="0"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-mono outline-none ring-ring focus:ring-2"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Libellé
                </label>
                <input
                  type="text"
                  placeholder="Ex: Loyer boutique"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
                />
              </div>
              <div className="flex items-end">
                <Button className="w-full">Enregistrer</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Écritures du jour</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-48 items-center justify-center text-muted-foreground">
            Aucune écriture aujourd&apos;hui
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
