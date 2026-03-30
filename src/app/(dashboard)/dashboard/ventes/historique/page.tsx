import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Search,
  CalendarDays,
  History,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function SalesHistoryPage() {
  // Shell data — will be replaced by DB queries
  const sales: {
    date: string;
    invoice: string;
    client: string;
    total: number;
    paymentMethod: string;
    status: string;
  }[] = [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/ventes">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight">
            Historique des ventes
          </h1>
          <p className="text-muted-foreground">
            Consultez et exportez l&apos;historique de toutes vos ventes
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exporter CSV
        </Button>
      </div>

      <Separator />

      {/* Filter bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-end gap-4">
            <div className="space-y-1.5">
              <label className="text-sm text-muted-foreground">
                <CalendarDays className="mr-1 inline h-3.5 w-3.5" />
                Date debut
              </label>
              <input
                type="date"
                className="block rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm text-muted-foreground">
                <CalendarDays className="mr-1 inline h-3.5 w-3.5" />
                Date fin
              </label>
              <input
                type="date"
                className="block rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm text-muted-foreground">
                Mode de paiement
              </label>
              <select className="block rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2">
                <option value="">Tous</option>
                <option value="especes">Especes</option>
                <option value="mobile_money">Mobile Money</option>
                <option value="carte">Carte bancaire</option>
                <option value="virement">Virement</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm text-muted-foreground">Statut</label>
              <select className="block rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2">
                <option value="">Tous</option>
                <option value="payee">Payee</option>
                <option value="en_attente">En attente</option>
                <option value="annulee">Annulee</option>
              </select>
            </div>
            <Button variant="secondary" className="mb-px">
              <Search className="mr-2 h-4 w-4" />
              Filtrer
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sales table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <History className="h-4 w-4" />
            Ventes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800 text-left text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Facture</th>
                  <th className="px-4 py-3 font-medium">Client</th>
                  <th className="px-4 py-3 text-right font-medium">Total</th>
                  <th className="px-4 py-3 font-medium">Paiement</th>
                  <th className="px-4 py-3 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody>
                {sales.length > 0 ? (
                  sales.map((sale, i) => (
                    <tr
                      key={i}
                      className="border-b border-zinc-800 last:border-0"
                    >
                      <td className="px-4 py-3">{sale.date}</td>
                      <td className="px-4 py-3 font-mono text-primary">
                        {sale.invoice}
                      </td>
                      <td className="px-4 py-3">{sale.client}</td>
                      <td className="px-4 py-3 text-right font-mono font-medium">
                        {sale.total.toLocaleString("fr-FR")} FCFA
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="secondary">{sale.paymentMethod}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={
                            sale.status === "Payee"
                              ? "default"
                              : sale.status === "Annulee"
                                ? "destructive"
                                : "outline"
                          }
                        >
                          {sale.status}
                        </Badge>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-12 text-center text-muted-foreground"
                    >
                      Aucune vente enregistree
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
