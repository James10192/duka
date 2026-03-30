import { redirect } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  History,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getUserOrganizations } from "@/actions/organizations";
import { getSales } from "@/actions/sales";
import { formatCFA } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default async function SalesHistoryPage() {
  const orgs = await getUserOrganizations();
  const org = orgs[0];
  if (!org) redirect("/onboarding");

  const sales = await getSales(org.id);

  const paymentLabel: Record<string, string> = {
    CASH: "Especes",
    MOBILE_MONEY: "Mobile Money",
    CARD: "Carte",
    MIXED: "Mixte",
  };

  const statusLabel: Record<string, string> = {
    PAID: "Paye",
    PARTIAL: "Partiel",
    PENDING: "En attente",
  };

  const statusVariant: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
    PAID: "default",
    PARTIAL: "secondary",
    PENDING: "outline",
  };

  // Calculate totals
  const totalRevenue = sales.reduce((sum, s) => sum + s.total, 0);
  const paidCount = sales.filter((s) => s.paymentStatus === "PAID").length;

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
            {sales.length} vente{sales.length > 1 ? "s" : ""} — {formatCFA(totalRevenue)} de CA total — {paidCount} payee{paidCount > 1 ? "s" : ""}
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exporter CSV
        </Button>
      </div>

      <Separator />

      {/* Sales table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <History className="h-4 w-4" />
            Ventes
          </CardTitle>
        </CardHeader>
        <CardContent>
          {sales.length === 0 ? (
            <div className="flex h-48 items-center justify-center text-muted-foreground">
              Aucune vente enregistree
            </div>
          ) : (
            <div className="rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-muted-foreground">
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Facture</th>
                    <th className="px-4 py-3 font-medium">Client</th>
                    <th className="px-4 py-3 font-medium">Articles</th>
                    <th className="px-4 py-3 text-right font-medium">Total</th>
                    <th className="px-4 py-3 font-medium">Paiement</th>
                    <th className="px-4 py-3 font-medium">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {sales.map((sale) => (
                    <tr
                      key={sale.id}
                      className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                    >
                      <td className="px-4 py-3 text-muted-foreground">
                        {format(new Date(sale.date), "dd/MM/yyyy HH:mm", { locale: fr })}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-primary">
                        {sale.invoiceNumber}
                      </td>
                      <td className="px-4 py-3">
                        {sale.client ? (
                          <Link
                            href={`/dashboard/clients/${sale.client.id}`}
                            className="hover:underline"
                          >
                            {sale.client.name}
                          </Link>
                        ) : (
                          <span className="text-muted-foreground">Client comptoir</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {sale.items.length} article{sale.items.length > 1 ? "s" : ""}
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-medium">
                        {formatCFA(sale.total)}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="secondary" className="text-xs">
                          {paymentLabel[sale.paymentMethod] ?? sale.paymentMethod}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={statusVariant[sale.paymentStatus] ?? "outline"}
                          className="text-xs"
                        >
                          {statusLabel[sale.paymentStatus] ?? sale.paymentStatus}
                        </Badge>
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
