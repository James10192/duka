import Link from "next/link";
import {
  ArrowLeft,
  Package,
  Pencil,
  Trash2,
  ImageIcon,
  TrendingUp,
  BarChart3,
  AlertTriangle,
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

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Shell data — will be replaced by DB fetch
  const product = {
    id,
    name: "Produit exemple",
    ref: "PRD-001",
    category: "Boissons",
    format: "Bouteille 33cl",
    barcode: "6001234567890",
    active: true,
    buyPrice: 450,
    sellPrice: 600,
    stock: 24,
    minStock: 10,
    imageUrl: null as string | null,
  };

  const margin = product.sellPrice - product.buyPrice;
  const marginPercent =
    product.buyPrice > 0
      ? ((margin / product.buyPrice) * 100).toFixed(1)
      : "0";
  const valorization = product.stock * product.buyPrice;

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
            <Badge variant="secondary">{product.category}</Badge>
            <Badge
              variant={product.active ? "default" : "destructive"}
            >
              {product.active ? "Actif" : "Inactif"}
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
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Supprimer
          </Button>
        </div>
      </div>

      <Separator />

      {/* Two-column layout */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Left column */}
        <div className="space-y-6">
          {/* Product image placeholder */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex h-48 items-center justify-center rounded-lg border-2 border-dashed border-zinc-800">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <ImageIcon className="h-10 w-10" />
                  <span className="text-sm">Aucune image</span>
                </div>
              </div>
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
                  <dd className="font-medium">{product.category}</dd>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Format</dt>
                  <dd className="font-medium">{product.format}</dd>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Code-barres</dt>
                  <dd className="font-mono font-medium">{product.barcode}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Pricing card */}
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
                    {product.buyPrice.toLocaleString("fr-FR")} FCFA
                  </dd>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Prix de vente</dt>
                  <dd className="font-mono font-medium text-primary">
                    {product.sellPrice.toLocaleString("fr-FR")} FCFA
                  </dd>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Marge</dt>
                  <dd className="font-mono font-medium text-emerald-500">
                    +{margin.toLocaleString("fr-FR")} FCFA ({marginPercent}%)
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          {/* Stock card */}
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
                        product.stock <= product.minStock
                          ? "text-red-500"
                          : product.stock <= product.minStock * 2
                            ? "text-amber-500"
                            : "text-emerald-500"
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
                    {valorization.toLocaleString("fr-FR")} FCFA
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
          <div className="rounded-lg border border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800 text-left text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Quantite</th>
                  <th className="px-4 py-3 font-medium">Reference</th>
                  <th className="px-4 py-3 font-medium">Note</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-12 text-center text-muted-foreground"
                  >
                    Aucun mouvement de stock
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
