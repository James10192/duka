import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  MessageCircle,
  CheckCircle2,
  FileText,
  CreditCard,
  CalendarDays,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getInvoice } from "@/actions/invoices";
import { formatCFA } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let invoice;
  try {
    invoice = await getInvoice(id);
  } catch {
    notFound();
  }

  const sale = invoice.sale;

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

  const paymentLabel: Record<string, string> = {
    CASH: "Especes",
    MOBILE_MONEY: "Mobile Money",
    CARD: "Carte bancaire",
    MIXED: "Mixte",
  };

  const subtotal = sale.items.reduce((sum, item) => sum + item.total, 0);
  const taxRate = invoice.organization.taxRate ?? 18;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/factures">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="font-mono text-2xl font-bold tracking-tight">
              {invoice.number}
            </h1>
            <Badge variant={statusVariant[invoice.status] ?? "outline"}>
              {statusLabel[invoice.status] ?? invoice.status}
            </Badge>
          </div>
          <p className="text-muted-foreground">Detail de la facture</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Telecharger PDF
          </Button>
          {sale.client?.whatsapp && (
            <Button variant="outline">
              <MessageCircle className="mr-2 h-4 w-4" />
              Envoyer par WhatsApp
            </Button>
          )}
          {invoice.status !== "PAID" && (
            <Button>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Marquer comme payee
            </Button>
          )}
        </div>
      </div>

      <Separator />

      {/* Two-column layout */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Left: invoice details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="h-4 w-4" />
              Details de la facture
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <dt className="w-32 text-muted-foreground">Date</dt>
                <dd className="font-medium">
                  {format(new Date(sale.date), "dd/MM/yyyy HH:mm", { locale: fr })}
                </dd>
              </div>
              <Separator />
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <dt className="w-32 text-muted-foreground">Client</dt>
                <dd className="font-medium">
                  {sale.client ? (
                    <Link
                      href={`/dashboard/clients/${sale.client.id}`}
                      className="text-primary hover:underline"
                    >
                      {sale.client.name}
                    </Link>
                  ) : (
                    "Client comptoir"
                  )}
                </dd>
              </div>
              <Separator />
              <div className="flex items-center gap-3">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <dt className="w-32 text-muted-foreground">Paiement</dt>
                <dd className="font-medium">
                  {paymentLabel[sale.paymentMethod] ?? sale.paymentMethod}
                </dd>
              </div>
              <Separator />
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <dt className="w-32 text-muted-foreground">Statut</dt>
                <dd>
                  <Badge variant={statusVariant[invoice.status] ?? "outline"}>
                    {statusLabel[invoice.status] ?? invoice.status}
                  </Badge>
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        {/* Right: org info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Emetteur</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Entreprise</dt>
                <dd className="font-medium">{invoice.organization.name}</dd>
              </div>
              {invoice.organization.address && (
                <>
                  <Separator />
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Adresse</dt>
                    <dd className="font-medium">{invoice.organization.address}</dd>
                  </div>
                </>
              )}
              {invoice.organization.phone && (
                <>
                  <Separator />
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Telephone</dt>
                    <dd className="font-mono font-medium">{invoice.organization.phone}</dd>
                  </div>
                </>
              )}
              {invoice.organization.email && (
                <>
                  <Separator />
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Email</dt>
                    <dd className="font-medium">{invoice.organization.email}</dd>
                  </div>
                </>
              )}
            </dl>
          </CardContent>
        </Card>
      </div>

      {/* Items table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Articles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Produit</th>
                  <th className="px-4 py-3 text-right font-medium">Quantite</th>
                  <th className="px-4 py-3 text-right font-medium">Prix unitaire</th>
                  <th className="px-4 py-3 text-right font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {sale.items.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-12 text-center text-muted-foreground"
                    >
                      Aucun article
                    </td>
                  </tr>
                ) : (
                  sale.items.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-border last:border-0"
                    >
                      <td className="px-4 py-3">
                        <div>
                          <span className="font-medium">{item.product.name}</span>
                          <span className="ml-2 font-mono text-xs text-muted-foreground">
                            {item.product.ref}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right font-mono">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-3 text-right font-mono">
                        {formatCFA(item.unitPrice)}
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-medium">
                        {formatCFA(item.total)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="ml-auto mt-4 w-full max-w-xs space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sous-total</span>
              <span className="font-mono font-medium">
                {formatCFA(subtotal)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">TVA ({taxRate}%)</span>
              <span className="font-mono font-medium">
                {formatCFA(sale.taxAmount)}
              </span>
            </div>
            {sale.discount > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Remise</span>
                <span className="font-mono font-medium text-red-400">
                  -{formatCFA(sale.discount)}
                </span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between text-base font-bold">
              <span>TOTAL</span>
              <span className="font-mono text-primary">
                {formatCFA(sale.total)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
