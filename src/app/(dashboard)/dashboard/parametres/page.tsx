import { Settings, Store, FileText, Users, CreditCard } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const settingsCards = [
  {
    title: "Mon commerce",
    description: "Nom, secteur, adresse, logo, coordonnées",
    icon: Store,
    href: "/dashboard/parametres",
  },
  {
    title: "Facturation",
    description: "Templates, mentions légales, numérotation",
    icon: FileText,
    href: "/dashboard/parametres/facturation",
  },
  {
    title: "Équipe",
    description: "Utilisateurs, rôles, accès aux boutiques",
    icon: Users,
    href: "/dashboard/parametres/equipe",
  },
  {
    title: "Abonnement",
    description: "Plan actuel, facturation, limites",
    icon: CreditCard,
    href: "/dashboard/parametres/abonnement",
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Settings className="h-6 w-6" />
          Paramètres
        </h1>
        <p className="text-muted-foreground">
          Configurez votre commerce et votre compte
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {settingsCards.map((card) => (
          <Link key={card.href} href={card.href}>
            <Card className="cursor-pointer transition-colors hover:border-primary/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <card.icon className="h-4 w-4 text-primary" />
                  {card.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
