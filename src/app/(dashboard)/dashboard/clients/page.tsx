import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getUserOrganizations } from "@/actions/organizations";
import { getClients } from "@/actions/clients";
import { formatCFA } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default async function ClientsPage() {
  const orgs = await getUserOrganizations();
  const org = orgs[0];
  if (!org) redirect("/onboarding");

  const clients = await getClients(org.id);

  const typeColor: Record<string, string> = {
    PARTICULIER: "bg-zinc-500/10 text-zinc-600 border-zinc-500/20",
    ENTREPRISE: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    EVENEMENTIEL: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    REVENDEUR: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    VIP: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  };

  const typeLabel: Record<string, string> = {
    PARTICULIER: "Particulier",
    ENTREPRISE: "Entreprise",
    EVENEMENTIEL: "Evenementiel",
    REVENDEUR: "Revendeur",
    VIP: "VIP",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Clients</h1>
          <p className="text-muted-foreground">
            {clients.length} client{clients.length > 1 ? "s" : ""} dans votre base
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/clients/nouveau">
            <Plus className="mr-2 h-4 w-4" />
            Nouveau client
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher un client par nom ou telephone..."
            className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-3 text-sm outline-none ring-ring focus:ring-2"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Base clients
          </CardTitle>
        </CardHeader>
        <CardContent>
          {clients.length === 0 ? (
            <div className="flex h-48 items-center justify-center text-muted-foreground">
              Aucun client enregistre. Les clients seront ajoutes lors de vos ventes.
            </div>
          ) : (
            <div className="rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-muted-foreground">
                    <th className="px-4 py-3 font-medium">Nom</th>
                    <th className="px-4 py-3 font-medium">Telephone</th>
                    <th className="px-4 py-3 font-medium">Type</th>
                    <th className="px-4 py-3 text-right font-medium">Achats</th>
                    <th className="px-4 py-3 text-right font-medium">Total depense</th>
                    <th className="px-4 py-3 font-medium">Dernier achat</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <tr
                      key={client.id}
                      className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                    >
                      <td className="px-4 py-3 font-medium">
                        <Link
                          href={`/dashboard/clients/${client.id}`}
                          className="hover:underline"
                        >
                          {client.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 font-mono text-muted-foreground">
                        {client.phone ?? "-"}
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant="outline"
                          className={`text-xs ${typeColor[client.type] ?? ""}`}
                        >
                          {typeLabel[client.type] ?? client.type}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right font-mono">
                        {client.totalPurchases}
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-medium">
                        {formatCFA(client.totalSpent)}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {client.lastPurchaseAt
                          ? format(new Date(client.lastPurchaseAt), "dd/MM/yyyy", { locale: fr })
                          : "-"}
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
