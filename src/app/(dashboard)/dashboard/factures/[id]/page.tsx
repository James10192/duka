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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Shell data — will be replaced by DB fetch
  const invoice = {
    id,
    number: "FA-2026-000042",
    status: "Brouillon" as "Brouillon" | "Envoyee" | "Payee",
    date: "29/03/2026",
    clientName: "Client exemple",
    paymentMethod: "Especes",
    items: [] as {
      product: string;
      quantity: number;
      unitPrice: number;
      total: number;
    }[],
    subtotal: 0,
    tvaRate: 18,
    tvaAmount: 0,
    discount: 0,
    total: 0,
  };

  const statusVariant =
    invoice.status === "Payee"
      ? "default"
      : invoice.status === "Envoyee"
        ? "secondary"
        : "outline";

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
            <Badge variant={statusVariant}>{invoice.status}</Badge>
          </div>
          <p className="text-muted-foreground">
            Detail de la facture
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Telecharger PDF
          </Button>
          <Button variant="outline">
            <MessageCircle className="mr-2 h-4 w-4" />
            Envoyer par WhatsApp
          </Button>
          <Button>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Marquer comme payee
          </Button>
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
                <dd className="font-medium">{invoice.date}</dd>
              </div>
              <Separator />
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <dt className="w-32 text-muted-foreground">Client</dt>
                <dd className="font-medium">{invoice.clientName}</dd>
              </div>
              <Separator />
              <div className="flex items-center gap-3">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <dt className="w-32 text-muted-foreground">Paiement</dt>
                <dd className="font-medium">{invoice.paymentMethod}</dd>
              </div>
              <Separator />
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <dt className="w-32 text-muted-foreground">Statut</dt>
                <dd>
                  <Badge variant={statusVariant}>{invoice.status}</Badge>
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        {/* Right: PDF preview placeholder */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Apercu PDF</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted">
              <div className="flex flex-col items-center gap-3 text-muted-foreground">
                <FileText className="h-12 w-12" />
                <span className="text-sm">Apercu du document</span>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-3 w-3" />
                  Telecharger
                </Button>
              </div>
            </div>
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
                  <th className="px-4 py-3 text-right font-medium">
                    Prix unitaire
                  </th>
                  <th className="px-4 py-3 text-right font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.length > 0 ? (
                  invoice.items.map((item, i) => (
                    <tr
                      key={i}
                      className="border-b border-border last:border-0"
                    >
                      <td className="px-4 py-3">{item.product}</td>
                      <td className="px-4 py-3 text-right font-mono">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-3 text-right font-mono">
                        {item.unitPrice.toLocaleString("fr-FR")} FCFA
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-medium">
                        {item.total.toLocaleString("fr-FR")} FCFA
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-12 text-center text-muted-foreground"
                    >
                      Aucun article
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Totals section */}
          <div className="ml-auto mt-4 w-full max-w-xs space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sous-total</span>
              <span className="font-mono font-medium">
                {invoice.subtotal.toLocaleString("fr-FR")} FCFA
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                TVA ({invoice.tvaRate}%)
              </span>
              <span className="font-mono font-medium">
                {invoice.tvaAmount.toLocaleString("fr-FR")} FCFA
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Remise</span>
              <span className="font-mono font-medium text-red-400">
                -{invoice.discount.toLocaleString("fr-FR")} FCFA
              </span>
            </div>
            <Separator />
            <div className="flex justify-between text-base font-bold">
              <span>TOTAL</span>
              <span className="font-mono text-primary">
                {invoice.total.toLocaleString("fr-FR")} FCFA
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
