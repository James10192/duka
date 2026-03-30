import Link from "next/link";
import {
  ArrowLeft,
  CreditCard,
  ChevronRight,
  Check,
  Zap,
  TrendingUp,
  Package,
  Users,
  ShoppingCart,
  Sparkles,
  Receipt,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const starterFeatures = [
  "1 boutique",
  "50 produits max",
  "1 utilisateur",
  "100 ventes / mois",
  "Factures OHADA",
  "Journal de caisse",
];

const plans = [
  {
    name: "Pro",
    price: "9 900",
    period: "/mois",
    description: "Pour les commerces en croissance",
    highlight: true,
    features: [
      "3 boutiques",
      "500 produits",
      "5 utilisateurs",
      "Ventes illimitees",
      "CRM clients",
      "Rapports avances",
      "50 generations IA / mois",
      "Support prioritaire",
    ],
  },
  {
    name: "Business",
    price: "24 900",
    period: "/mois",
    description: "Pour les entreprises multi-sites",
    highlight: false,
    features: [
      "Boutiques illimitees",
      "Produits illimites",
      "Utilisateurs illimites",
      "Ventes illimitees",
      "CRM + fidelite",
      "Rapports & exports",
      "200 generations IA / mois",
      "Support dedie",
      "API access",
    ],
  },
];

const usageMeters = [
  {
    label: "Produits",
    current: 0,
    max: 50,
    icon: Package,
  },
  {
    label: "Utilisateurs",
    current: 1,
    max: 1,
    icon: Users,
  },
  {
    label: "Ventes ce mois",
    current: 0,
    max: 100,
    icon: ShoppingCart,
  },
  {
    label: "Generations IA",
    current: 0,
    max: 0,
    icon: Sparkles,
  },
];

export default function AbonnementPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-10">
      {/* Breadcrumb + Title */}
      <div>
        <div className="flex items-center gap-1.5 text-sm text-zinc-500 mb-2">
          <Link
            href="/dashboard/parametres"
            className="hover:text-zinc-300 transition-colors inline-flex items-center gap-1"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Parametres
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-zinc-100">Abonnement</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100 flex items-center gap-2">
          <CreditCard className="h-6 w-6 text-primary" />
          Abonnement
        </h1>
        <p className="text-zinc-500 mt-1">
          Gerez votre plan et suivez votre consommation
        </p>
      </div>

      {/* Current Plan */}
      <Card className="bg-zinc-950 border-zinc-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base text-zinc-100">Plan actuel</CardTitle>
            <Badge className="bg-primary/10 text-primary border-primary/20">
              Starter
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold font-mono text-zinc-100">Gratuit</span>
          </div>
          <ul className="grid gap-2 sm:grid-cols-2">
            {starterFeatures.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm text-zinc-400">
                <Check className="h-3.5 w-3.5 text-primary shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Usage Meters */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-100">Utilisation</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {usageMeters.map((meter) => {
            const percentage =
              meter.max > 0 ? Math.round((meter.current / meter.max) * 100) : 0;
            const isMaxed = meter.max > 0 && meter.current >= meter.max;
            const isUnavailable = meter.max === 0;

            return (
              <Card key={meter.label} className="bg-zinc-950 border-zinc-800">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <meter.icon className="h-4 w-4 text-zinc-500" />
                      <span className="text-sm font-medium text-zinc-300">
                        {meter.label}
                      </span>
                    </div>
                    <span className="text-sm font-mono text-zinc-400">
                      {isUnavailable ? (
                        <span className="text-zinc-600">Non inclus</span>
                      ) : (
                        <>
                          {meter.current}
                          <span className="text-zinc-600">/{meter.max}</span>
                        </>
                      )}
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-zinc-800">
                    <div
                      className={`h-1.5 rounded-full transition-all ${
                        isMaxed
                          ? "bg-amber-500"
                          : isUnavailable
                          ? "bg-zinc-700"
                          : "bg-primary"
                      }`}
                      style={{ width: `${isUnavailable ? 0 : percentage}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <Separator className="bg-zinc-800" />

      {/* Upgrade Plans */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-zinc-100">
            Passer au niveau superieur
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`bg-zinc-950 ${
                plan.highlight
                  ? "border-primary/40 ring-1 ring-primary/10"
                  : "border-zinc-800"
              }`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base text-zinc-100">
                    {plan.name}
                  </CardTitle>
                  {plan.highlight && (
                    <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px]">
                      Populaire
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-zinc-500">{plan.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold font-mono text-zinc-100">
                    {plan.price}
                  </span>
                  <span className="text-sm text-zinc-500">
                    FCFA{plan.period}
                  </span>
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-zinc-400"
                    >
                      <Check className="h-3.5 w-3.5 text-primary shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    plan.highlight
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : "bg-zinc-800 hover:bg-zinc-700 text-zinc-100"
                  }`}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Choisir {plan.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="bg-zinc-800" />

      {/* Billing History */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
          <Receipt className="h-5 w-5 text-zinc-400" />
          Historique de facturation
        </h2>
        <Card className="bg-zinc-950 border-zinc-800">
          <CardContent className="py-12">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-800/50 mb-4">
                <Receipt className="h-7 w-7 text-zinc-500" />
              </div>
              <h3 className="text-base font-medium text-zinc-100 mb-1">
                Aucune facture
              </h3>
              <p className="text-sm text-zinc-500 max-w-xs">
                Votre historique de facturation apparaitra ici lorsque vous
                souscrirez a un plan payant
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
