import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, Search, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getUserOrganizations } from "@/actions/organizations";
import { getProducts } from "@/actions/products";
import { formatCFA, calculateMargin } from "@/lib/utils";

export default async function ProductsPage() {
  const orgs = await getUserOrganizations();
  const org = orgs[0];
  if (!org) redirect("/onboarding");

  const products = await getProducts(org.id);

  // Extract unique categories
  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Produits</h1>
          <p className="text-muted-foreground">
            {products.length} produit{products.length > 1 ? "s" : ""} dans votre catalogue
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/produits/nouveau">
            <Plus className="mr-2 h-4 w-4" />
            Nouveau produit
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher un produit par nom, reference ou code-barres..."
            className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-3 text-sm outline-none ring-ring focus:ring-2"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Catalogue
          </CardTitle>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <div className="flex h-48 items-center justify-center text-muted-foreground">
              Aucun produit ajoute. Commencez par creer votre premier produit.
            </div>
          ) : (
            <div className="rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-muted-foreground">
                    <th className="px-4 py-3 font-medium">Ref</th>
                    <th className="px-4 py-3 font-medium">Nom</th>
                    <th className="px-4 py-3 font-medium">Categorie</th>
                    <th className="px-4 py-3 text-center font-medium">Stock</th>
                    <th className="px-4 py-3 text-right font-medium">Prix achat</th>
                    <th className="px-4 py-3 text-right font-medium">Prix vente</th>
                    <th className="px-4 py-3 text-right font-medium">Marge</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => {
                    const margin = calculateMargin(product.buyPrice, product.sellPrice);
                    const stockColor =
                      product.stock > product.minStock
                        ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                        : product.stock === product.minStock
                          ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
                          : "bg-red-500/10 text-red-600 border-red-500/20";
                    return (
                      <tr
                        key={product.id}
                        className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <Link
                            href={`/dashboard/produits/${product.id}`}
                            className="font-mono text-xs text-primary hover:underline"
                          >
                            {product.ref}
                          </Link>
                        </td>
                        <td className="px-4 py-3 font-medium">
                          <Link
                            href={`/dashboard/produits/${product.id}`}
                            className="hover:underline"
                          >
                            {product.name}
                          </Link>
                        </td>
                        <td className="px-4 py-3">
                          {product.category ? (
                            <Badge variant="secondary" className="text-xs">
                              {product.category}
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <Badge
                            variant="outline"
                            className={`font-mono text-xs ${stockColor}`}
                          >
                            {product.stock}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-right font-mono text-muted-foreground">
                          {formatCFA(product.buyPrice)}
                        </td>
                        <td className="px-4 py-3 text-right font-mono font-medium">
                          {formatCFA(product.sellPrice)}
                        </td>
                        <td className="px-4 py-3 text-right font-mono text-emerald-500">
                          +{margin.percent.toFixed(1)}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
