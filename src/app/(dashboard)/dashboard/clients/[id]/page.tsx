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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Shell data — will be replaced by DB fetch
  const client = {
    id,
    name: "Client exemple",
    type: "Particulier" as "Particulier" | "Entreprise" | "VIP",
    phone: "+225 07 00 00 00",
    whatsapp: "+225 07 00 00 00",
    email: "client@exemple.ci",
    area: "Cocody, Abidjan",
    notes: "",
    tags: ["Fidele", "Cocody"],
    totalPurchases: 0,
    totalSpent: 0,
    averageBasket: 0,
    lastPurchaseDate: null as string | null,
  };

  const typeVariant =
    client.type === "VIP"
      ? "default"
      : client.type === "Entreprise"
        ? "secondary"
        : "outline";

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
            <Badge variant={typeVariant}>{client.type}</Badge>
            {client.tags.map((tag) => (
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
          <Button>
            <MessageCircle className="mr-2 h-4 w-4" />
            Envoyer un message
          </Button>
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
              <p className="text-2xl font-bold">{client.totalPurchases}</p>
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
                {client.totalSpent.toLocaleString("fr-FR")} <span className="text-sm">FCFA</span>
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
                {client.averageBasket.toLocaleString("fr-FR")} <span className="text-sm">FCFA</span>
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
                {client.lastPurchaseDate ?? "Aucun"}
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
              <div className="rounded-lg border border-zinc-800">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-800 text-left text-muted-foreground">
                      <th className="px-4 py-3 font-medium">Date</th>
                      <th className="px-4 py-3 font-medium">Facture</th>
                      <th className="px-4 py-3 font-medium">Articles</th>
                      <th className="px-4 py-3 font-medium">Total</th>
                      <th className="px-4 py-3 font-medium">Paiement</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-12 text-center text-muted-foreground"
                      >
                        Aucun achat enregistre
                      </td>
                    </tr>
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
                  <dd className="font-mono font-medium">{client.phone}</dd>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-4 w-4 text-muted-foreground" />
                  <dt className="w-24 text-muted-foreground">WhatsApp</dt>
                  <dd className="font-mono font-medium">{client.whatsapp}</dd>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <dt className="w-24 text-muted-foreground">Email</dt>
                  <dd className="font-medium">{client.email}</dd>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <dt className="w-24 text-muted-foreground">Quartier</dt>
                  <dd className="font-medium">{client.area}</dd>
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
