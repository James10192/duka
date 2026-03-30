import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Pencil,
  MessageCircle,
  ShoppingBag,
  Wallet,
  ShoppingCart,
  CalendarDays,
  Phone,
  Mail,
  MapPin,
  StickyNote,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getClient } from "@/actions/clients";
import { formatCFA } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let client;
  try {
    client = await getClient(id);
  } catch {
    notFound();
  }

  const typeLabel: Record<string, string> = {
    PARTICULIER: "Particulier",
    ENTREPRISE: "Entreprise",
    EVENEMENTIEL: "Evenementiel",
    REVENDEUR: "Revendeur",
    VIP: "VIP",
  };

  const typeVariant =
    client.type === "VIP"
      ? "default" as const
      : client.type === "ENTREPRISE"
        ? "secondary" as const
        : "outline" as const;

  const averageBasket =
    client.totalPurchases > 0
      ? Math.round(client.totalSpent / client.totalPurchases)
      : 0;

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/clients">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight">
              {client.name}
            </h1>
            <Badge variant={typeVariant}>{typeLabel[client.type] ?? client.type}</Badge>
            {client.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <p className="text-muted-foreground">
            Fiche client et historique d&apos;achats
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Pencil className="mr-2 h-4 w-4" />
            Modifier
          </Button>
          {client.whatsapp && (
            <Button>
              <MessageCircle className="mr-2 h-4 w-4" />
              Envoyer un message
            </Button>
          )}
        </div>
      </div>

      <Separator />

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <ShoppingBag className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total achats</p>
              <p className="text-2xl font-bold font-mono">{client.totalPurchases}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total depense</p>
              <p className="font-mono text-2xl font-bold">
                {formatCFA(client.totalSpent)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <ShoppingCart className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Panier moyen</p>
              <p className="font-mono text-2xl font-bold">
                {formatCFA(averageBasket)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <CalendarDays className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Dernier achat</p>
              <p className="text-lg font-bold">
                {client.lastPurchaseAt
                  ? format(new Date(client.lastPurchaseAt), "dd/MM/yyyy", { locale: fr })
                  : "Aucun"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="historique">
        <TabsList>
          <TabsTrigger value="historique">Historique</TabsTrigger>
          <TabsTrigger value="informations">Informations</TabsTrigger>
        </TabsList>

        <TabsContent value="historique" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Historique des achats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-muted-foreground">
                      <th className="px-4 py-3 font-medium">Date</th>
                      <th className="px-4 py-3 font-medium">Facture</th>
                      <th className="px-4 py-3 font-medium">Articles</th>
                      <th className="px-4 py-3 text-right font-medium">Total</th>
                      <th className="px-4 py-3 font-medium">Paiement</th>
                    </tr>
                  </thead>
                  <tbody>
                    {client.sales.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-4 py-12 text-center text-muted-foreground"
                        >
                          Aucun achat enregistre
                        </td>
                      </tr>
                    ) : (
                      client.sales.map((sale) => (
                        <tr
                          key={sale.id}
                          className="border-b border-border last:border-0"
                        >
                          <td className="px-4 py-3 text-muted-foreground">
                            {format(new Date(sale.date), "dd/MM/yyyy HH:mm", { locale: fr })}
                          </td>
                          <td className="px-4 py-3 font-mono text-xs text-primary">
                            {sale.invoiceNumber}
                          </td>
                          <td className="px-4 py-3">
                            {sale.items.map((item) => (
                              <span key={item.id} className="block text-xs">
                                {item.quantity}x {item.product.name}
                              </span>
                            ))}
                          </td>
                          <td className="px-4 py-3 text-right font-mono font-medium">
                            {formatCFA(sale.total)}
                          </td>
                          <td className="px-4 py-3">
                            <Badge
                              variant={
                                sale.paymentStatus === "PAID"
                                  ? "default"
                                  : sale.paymentStatus === "PARTIAL"
                                    ? "secondary"
                                    : "outline"
                              }
                              className="text-xs"
                            >
                              {statusLabel[sale.paymentStatus] ?? sale.paymentStatus}
                            </Badge>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="informations" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <User className="h-4 w-4" />
                Coordonnees
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <dt className="w-24 text-muted-foreground">Telephone</dt>
                  <dd className="font-mono font-medium">{client.phone ?? "-"}</dd>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-4 w-4 text-muted-foreground" />
                  <dt className="w-24 text-muted-foreground">WhatsApp</dt>
                  <dd className="font-mono font-medium">{client.whatsapp ?? "-"}</dd>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <dt className="w-24 text-muted-foreground">Email</dt>
                  <dd className="font-medium">{client.email ?? "-"}</dd>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <dt className="w-24 text-muted-foreground">Quartier</dt>
                  <dd className="font-medium">{client.area ?? "-"}</dd>
                </div>
                <Separator />
                <div className="flex items-start gap-3">
                  <StickyNote className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <dt className="w-24 text-muted-foreground">Notes</dt>
                  <dd className="flex-1 text-muted-foreground italic">
                    {client.notes || "Aucune note"}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
