import { Sparkles, FileText, DollarSign, BarChart3, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const aiFeatures = [
  {
    title: "Plan d'action commercial",
    description:
      "Un plan opérationnel sur 30 jours adapté à votre secteur et votre ville. Actions concrètes, calendrier, KPIs.",
    icon: FileText,
    plan: "Pro",
  },
  {
    title: "Programme d'encaissement",
    description:
      "Procédure complète : modes de paiement recommandés, règles anti-risque, modèle de journal de caisse.",
    icon: DollarSign,
    plan: "Pro",
  },
  {
    title: "Stratégie de pricing",
    description:
      "Recommandations de prix par produit avec justification, prix psychologiques, stratégie de bundle.",
    icon: DollarSign,
    plan: "Pro",
  },
  {
    title: "Analyse de performance",
    description:
      "Rapport d'analyse mensuel : tendances, opportunités, risques, prévisions pour le mois suivant.",
    icon: BarChart3,
    plan: "Pro",
  },
  {
    title: "Messages de relance",
    description:
      "3 variantes de messages WhatsApp personnalisés pour relancer vos clients inactifs.",
    icon: MessageSquare,
    plan: "Pro",
  },
];

export default function AIPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          Intelligence artificielle
        </h1>
        <p className="text-muted-foreground">
          Votre directeur commercial virtuel produit des livrables concrets
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {aiFeatures.map((feature) => (
          <Card
            key={feature.title}
            className="cursor-pointer transition-colors hover:border-primary/50"
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-base">
                  <feature.icon className="h-4 w-4 text-primary" />
                  {feature.title}
                </span>
                <Badge variant="secondary">{feature.plan}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historique des générations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-32 items-center justify-center text-muted-foreground">
            Aucune génération IA pour le moment
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
