import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  Pencil,
  ImageIcon,
  TrendingUp,
  BarChart3,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getProduct } from "@/actions/products";
import { formatCFA } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let product;
  try {
    product = await getProduct(id);
  } catch {
    notFound();
  }

  const margin = product.sellPrice - product.buyPrice;
  const marginPercent =
    product.buyPrice > 0
      ? ((margin / product.buyPrice) * 100).toFixed(1)
      : "0";
  const valorization = product.stock * product.buyPrice;

  const movementTypeLabel: Record<string, string> = {
    IN: "Entree",
    OUT: "Sortie",
    ADJUSTMENT: "Ajustement",
    LOSS: "Perte",
  };

  const movementTypeColor: Record<string, string> = {
    IN: "text-emerald-500",
    OUT: "text-red-500",
    ADJUSTMENT: "text-amber-500",
    LOSS: "text-red-500",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/produits">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight">
              {product.name}
            </h1>
            <Badge variant="outline" className="font-mono text-xs">
              {product.ref}
            </Badge>
            {product.category && (
              <Badge variant="secondary">{product.category}</Badge>
            )}
            <Badge variant={product.isActive ? "default" : "destructive"}>
              {product.isActive ? "Actif" : "Inactif"}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Fiche produit et mouvements de stock
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Pencil className="mr-2 h-4 w-4" />
            Modifier
          </Button>
        </div>
      </div>

      <Separator />

      {/* Two-column layout */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Left column */}
        <div className="space-y-6">
          {/* Product image */}
          <Card>
            <CardContent className="pt-6">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-48 w-full rounded-lg object-cover"
                />
              ) : (
                <div className="flex h-48 items-center justify-center rounded-lg border-2 border-dashed border-border">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <ImageIcon className="h-10 w-10" />
                    <span className="text-sm">Aucune image</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Basic info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Package className="h-4 w-4" />
                Informations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Nom</dt>
                  <dd className="font-medium">{product.name}</dd>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Categorie</dt>
                  <dd className="font-medium">{product.category ?? "-"}</dd>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Format</dt>
                  <dd className="font-medium">{product.format ?? "-"}</dd>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Code-barres</dt>
                  <dd className="font-mono font-medium">{product.barcode ?? "-"}</dd>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Boutique</dt>
                  <dd className="font-medium">{product.store.name}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="h-4 w-4" />
                Tarification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Prix d&apos;achat</dt>
                  <dd className="font-mono font-medium">
                    {formatCFA(product.buyPrice)}
                  </dd>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Prix de vente</dt>
                  <dd className="font-mono font-medium text-primary">
                    {formatCFA(product.sellPrice)}
                  </dd>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Marge</dt>
                  <dd className="font-mono font-medium text-emerald-500">
                    +{formatCFA(margin)} ({marginPercent}%)
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          {/* Stock */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <BarChart3 className="h-4 w-4" />
                Stock
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Stock actuel</dt>
                  <dd className="flex items-center gap-2">
                    <span
                      className={`font-mono text-lg font-bold ${
                        product.stock > product.minStock
                          ? "text-emerald-500"
                          : product.stock === product.minStock
                            ? "text-amber-500"
                            : "text-red-500"
                      }`}
                    >
                      {product.stock}
                    </span>
                    {product.stock <= product.minStock && (
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                    )}
                  </dd>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Seuil minimum</dt>
                  <dd className="font-mono font-medium">{product.minStock}</dd>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Valorisation stock</dt>
                  <dd className="font-mono font-medium">
                    {formatCFA(valorization)}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stock movements table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Mouvements de stock</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 text-right font-medium">Quantite</th>
                  <th className="px-4 py-3 font-medium">Motif</th>
                </tr>
              </thead>
              <tbody>
                {product.stockMovements.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-12 text-center text-muted-foreground"
                    >
                      Aucun mouvement de stock
                    </td>
                  </tr>
                ) : (
                  product.stockMovements.map((mv) => (
                    <tr
                      key={mv.id}
                      className="border-b border-border last:border-0"
                    >
                      <td className="px-4 py-3 text-muted-foreground">
                        {format(new Date(mv.date), "dd/MM/yyyy HH:mm", { locale: fr })}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`font-medium ${movementTypeColor[mv.type] ?? ""}`}>
                          {movementTypeLabel[mv.type] ?? mv.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-medium">
                        {mv.type === "IN" ? "+" : "-"}{mv.quantity}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {mv.reason ?? "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
