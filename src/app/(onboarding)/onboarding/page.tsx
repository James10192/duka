"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, Store, Package, Image, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SECTORS, CITIES_CI } from "@/lib/constants";
import { toast } from "sonner";

const STEPS = [
  { title: "Mon commerce", icon: Store },
  { title: "Mes produits", icon: Package },
  { title: "Mon identité", icon: Image },
  { title: "Plan IA", icon: Sparkles },
  { title: "Récapitulatif", icon: Check },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    orgName: "",
    sector: "",
    city: "",
    products: [{ name: "", sellPrice: "", stock: "" }],
    logo: null as File | null,
    phone: "",
  });

  function next() {
    if (step < STEPS.length - 1) setStep(step + 1);
  }

  function prev() {
    if (step > 0) setStep(step - 1);
  }

  function addProduct() {
    setData({
      ...data,
      products: [...data.products, { name: "", sellPrice: "", stock: "" }],
    });
  }

  function updateProduct(index: number, field: string, value: string) {
    const products = [...data.products];
    products[index] = { ...products[index], [field]: value };
    setData({ ...data, products });
  }

  async function finishOnboarding() {
    setLoading(true);
    try {
      // TODO: Create org, store, products via server actions
      toast.success("Votre commerce est prêt !");
      router.push("/dashboard");
    } catch {
      toast.error("Erreur lors de la configuration");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">DUKA</h1>
        <p className="mt-2 text-muted-foreground">
          Configurez votre commerce en 5 minutes
        </p>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s.title} className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-colors ${
                i <= step
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`h-px w-8 transition-colors ${
                  i < step ? "bg-primary" : "bg-border"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {(() => {
              const StepIcon = STEPS[step].icon;
              return <StepIcon className="h-5 w-5 text-primary" />;
            })()}
            {STEPS[step].title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 0 && (
            <>
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Nom de votre commerce *
                </label>
                <input
                  value={data.orgName}
                  onChange={(e) => setData({ ...data, orgName: e.target.value })}
                  placeholder="Ex: Cave à Vins Cocody"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Secteur d&apos;activité *
                  </label>
                  <select
                    value={data.sector}
                    onChange={(e) => setData({ ...data, sector: e.target.value })}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
                  >
                    <option value="">Sélectionner</option>
                    {SECTORS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Ville *
                  </label>
                  <select
                    value={data.city}
                    onChange={(e) => setData({ ...data, city: e.target.value })}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
                  >
                    <option value="">Sélectionner</option>
                    {CITIES_CI.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <p className="text-sm text-muted-foreground">
                Ajoutez 3 à 5 produits pour commencer. Vous pourrez en ajouter
                plus tard.
              </p>
              {data.products.map((product, i) => (
                <div key={i} className="grid gap-3 sm:grid-cols-3">
                  <input
                    value={product.name}
                    onChange={(e) => updateProduct(i, "name", e.target.value)}
                    placeholder="Nom du produit"
                    className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
                  />
                  <input
                    value={product.sellPrice}
                    onChange={(e) => updateProduct(i, "sellPrice", e.target.value)}
                    placeholder="Prix vente (FCFA)"
                    type="number"
                    className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-mono outline-none ring-ring focus:ring-2"
                  />
                  <input
                    value={product.stock}
                    onChange={(e) => updateProduct(i, "stock", e.target.value)}
                    placeholder="Stock"
                    type="number"
                    className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-mono outline-none ring-ring focus:ring-2"
                  />
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addProduct}>
                + Ajouter un produit
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Téléphone de la boutique
                </label>
                <input
                  value={data.phone}
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                  placeholder="+225 07 00 00 00 00"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Logo (optionnel)
                </label>
                <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-input">
                  <p className="text-sm text-muted-foreground">
                    Glissez votre logo ici ou cliquez pour parcourir
                  </p>
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-primary/50 bg-primary/5">
                <div className="text-center">
                  <Sparkles className="mx-auto h-8 w-8 text-primary" />
                  <p className="mt-2 font-medium">
                    L&apos;IA génère votre plan d&apos;action...
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Plan commercial 30 jours + programme d&apos;encaissement
                  </p>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-3">
              <div className="rounded-lg bg-secondary p-4">
                <p className="text-sm font-medium">Commerce</p>
                <p className="text-lg">{data.orgName || "—"}</p>
                <p className="text-sm text-muted-foreground">
                  {data.sector} — {data.city}
                </p>
              </div>
              <div className="rounded-lg bg-secondary p-4">
                <p className="text-sm font-medium">
                  {data.products.filter((p) => p.name).length} produit(s)
                  ajoutés
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prev}
          disabled={step === 0}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Précédent
        </Button>
        {step < STEPS.length - 1 ? (
          <Button onClick={next}>
            Suivant
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={finishOnboarding} disabled={loading}>
            {loading ? "Configuration..." : "Lancer mon commerce"}
          </Button>
        )}
      </div>
    </div>
  );
}
