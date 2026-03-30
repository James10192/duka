import { redirect } from "next/navigation";
import Link from "next/link";
import { FileText, Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getUserOrganizations } from "@/actions/organizations";
import { getInvoices } from "@/actions/invoices";
import { formatCFA } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default async function InvoicesPage() {
  const orgs = await getUserOrganizations();
  const org = orgs[0];
  if (!org) redirect("/onboarding");

  const invoices = await getInvoices(org.id);

  const statusLabel: Record<string, string> = {
    DRAFT: "Brouillon",
    SENT: "Envoyee",
    PAID: "Payee",
    CANCELLED: "Annulee",
  };

  const statusVariant: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
    DRAFT: "outline",
    SENT: "secondary",
    PAID: "default",
    CANCELLED: "destructive",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Factures</h1>
          <p className="text-muted-foreground">
            {invoices.length} facture{invoices.length > 1 ? "s" : ""} — conformes OHADA
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exporter
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher par numero de facture ou client..."
            className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-3 text-sm outline-none ring-ring focus:ring-2"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Historique des factures
          </CardTitle>
        </CardHeader>
        <CardContent>
          {invoices.length === 0 ? (
            <div className="flex h-48 items-center justify-center text-muted-foreground">
              Les factures seront generees automatiquement a chaque vente
            </div>
          ) : (
            <div className="rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-muted-foreground">
                    <th className="px-4 py-3 font-medium">Numero</th>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Client</th>
                    <th className="px-4 py-3 text-right font-medium">Total</th>
                    <th className="px-4 py-3 font-medium">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr
                      key={invoice.id}
                      className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <Link
                          href={`/dashboard/factures/${invoice.id}`}
                          className="font-mono text-xs text-primary hover:underline"
                        >
                          {invoice.number}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {format(new Date(invoice.createdAt), "dd/MM/yyyy HH:mm", { locale: fr })}
                      </td>
                      <td className="px-4 py-3">
                        {invoice.sale.client?.name ?? "Client comptoir"}
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-medium">
                        {formatCFA(invoice.sale.total)}
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={statusVariant[invoice.status] ?? "outline"}
                          className="text-xs"
                        >
                          {statusLabel[invoice.status] ?? invoice.status}
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
