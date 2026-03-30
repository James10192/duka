import { redirect } from "next/navigation";
import Link from "next/link";
import {
  TrendingUp,
  ShoppingCart,
  Users,
  Package,
  AlertTriangle,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getUserOrganizations } from "@/actions/organizations";
import { getDashboardStats } from "@/actions/sales";
import { formatCFA } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default async function DashboardPage() {
  const orgs = await getUserOrganizations();
  const org = orgs[0];
  if (!org) redirect("/onboarding");
  const store = org.stores[0];

  const stats = await getDashboardStats(org.id, store?.id);

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
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tableau de bord</h1>
        <p className="text-muted-foreground">
          Vue d&apos;ensemble de votre activite commerciale
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">CA du jour</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">
              {formatCFA(stats.todayRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.todaySales} vente{stats.todaySales > 1 ? "s" : ""} aujourd&apos;hui
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Ventes du mois</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{stats.monthSales}</div>
            <p className="text-xs text-muted-foreground">
              {formatCFA(stats.monthRevenue)} de CA mensuel
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{stats.clientCount}</div>
            <p className="text-xs text-muted-foreground">
              Panier moyen : <span className="font-mono">{formatCFA(stats.avgBasket)}</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Marge brute</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{stats.grossMargin}%</div>
            <p className="text-xs text-muted-foreground">
              {stats.lowStockProducts.length} produit{stats.lowStockProducts.length > 1 ? "s" : ""} en alerte stock
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-7">
        {/* Top products */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="text-base">Top produits du mois</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.topProducts.length === 0 ? (
              <div className="flex h-48 items-center justify-center text-muted-foreground">
                Les donnees apparaitront apres vos premieres ventes
              </div>
            ) : (
              <div className="space-y-3">
                {stats.topProducts.map((p, i) => (
                  <div key={p.productId} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium">{p.name}</p>
                        <p className="text-xs text-muted-foreground font-mono">{p.ref}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-mono font-medium">{formatCFA(p.revenue)}</p>
                      <p className="text-xs text-muted-foreground">
                        {p.quantitySold} vendu{p.quantitySold > 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Low stock alerts */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <AlertTriangle className="h-4 w-4" />
              Alertes stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats.lowStockProducts.length === 0 ? (
              <div className="flex h-48 items-center justify-center text-muted-foreground">
                Aucune alerte pour le moment
              </div>
            ) : (
              <div className="space-y-3">
                {stats.lowStockProducts.slice(0, 8).map((p) => (
                  <div key={p.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">{p.ref}</p>
                    </div>
                    <Badge
                      variant={p.stock === 0 ? "destructive" : "secondary"}
                      className="font-mono"
                    >
                      {p.stock} / {p.minStock}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent sales */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Dernieres ventes</CardTitle>
          <Link
            href="/dashboard/ventes/historique"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Voir tout
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </CardHeader>
        <CardContent>
          {stats.recentSales.length === 0 ? (
            <div className="flex h-32 items-center justify-center text-muted-foreground">
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
                  {stats.recentSales.map((sale) => (
                    <tr key={sale.id} className="border-b border-border last:border-0">
                      <td className="px-4 py-3 text-muted-foreground">
                        {format(new Date(sale.date), "dd/MM/yyyy HH:mm", { locale: fr })}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs">
                        {sale.invoiceNumber}
                      </td>
                      <td className="px-4 py-3">
                        {sale.client?.name ?? "Client comptoir"}
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
