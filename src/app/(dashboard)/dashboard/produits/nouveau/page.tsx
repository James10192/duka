"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SECTORS } from "@/lib/constants";
import { toast } from "sonner";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const data = {
      name: form.get("name") as string,
      category: form.get("category") as string,
      format: form.get("format") as string,
      buyPrice: parseFloat(form.get("buyPrice") as string),
      sellPrice: parseFloat(form.get("sellPrice") as string),
      stock: parseInt(form.get("stock") as string, 10),
      minStock: parseInt(form.get("minStock") as string, 10),
    };

    try {
      // TODO: Server action to create product
      console.log("Creating product:", data);
      toast.success("Produit créé avec succès");
      router.push("/dashboard/produits");
    } catch {
      toast.error("Erreur lors de la création");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/produits">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Nouveau produit
          </h1>
          <p className="text-muted-foreground">
            Ajoutez un produit à votre catalogue
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Informations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Nom du produit *
                </label>
                <input
                  name="name"
                  required
                  placeholder="Ex: Champagne Moët & Chandon 75cl"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Catégorie
                  </label>
                  <select
                    name="category"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
                  >
                    <option value="">Sélectionner</option>
                    {SECTORS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Format / Variante
                  </label>
                  <input
                    name="format"
                    placeholder="Ex: 75cl, 1L, Magnum"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Prix & Stock</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Prix d&apos;achat (FCFA) *
                  </label>
                  <input
                    name="buyPrice"
                    type="number"
                    required
                    min="0"
                    placeholder="0"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-mono outline-none ring-ring focus:ring-2"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Prix de vente (FCFA) *
                  </label>
                  <input
                    name="sellPrice"
                    type="number"
                    required
                    min="0"
                    placeholder="0"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-mono outline-none ring-ring focus:ring-2"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Stock initial *
                  </label>
                  <input
                    name="stock"
                    type="number"
                    required
                    min="0"
                    defaultValue="0"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-mono outline-none ring-ring focus:ring-2"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Seuil d&apos;alerte
                  </label>
                  <input
                    name="minStock"
                    type="number"
                    min="0"
                    defaultValue="5"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-mono outline-none ring-ring focus:ring-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button type="button" variant="outline" asChild>
            <Link href="/dashboard/produits">Annuler</Link>
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Création..." : "Créer le produit"}
          </Button>
        </div>
      </form>
    </div>
  );
}
