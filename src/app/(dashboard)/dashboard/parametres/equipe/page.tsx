import Link from "next/link";
import {
  ArrowLeft,
  Users,
  ChevronRight,
  UserPlus,
  Shield,
  ShieldCheck,
  ShieldAlert,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const roles = [
  {
    name: "Proprietaire",
    icon: ShieldAlert,
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
    description:
      "Acces total. Gestion de l'abonnement, des membres, des parametres et de toutes les boutiques.",
  },
  {
    name: "Gerant",
    icon: ShieldCheck,
    color: "text-primary",
    bgColor: "bg-primary/10",
    description:
      "Gestion des produits, ventes, clients, factures et journal de caisse pour les boutiques assignees.",
  },
  {
    name: "Caissier",
    icon: Shield,
    color: "text-muted-foreground",
    bgColor: "bg-muted-foreground/10",
    description:
      "Acces au point de vente et a l'enregistrement des ventes uniquement. Pas de modification des stocks.",
  },
];

export default function EquipePage() {
  const hasMembers = false;

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-10">
      {/* Breadcrumb + Title */}
      <div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
          <Link
            href="/dashboard/parametres"
            className="hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Parametres
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">Equipe</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              Equipe
            </h1>
            <p className="text-muted-foreground mt-1">
              Gerez les membres de votre equipe et leurs acces
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
            <UserPlus className="h-4 w-4" />
            Inviter un membre
          </Button>
        </div>
      </div>

      {/* Members Table / Empty State */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-base text-foreground">Membres</CardTitle>
        </CardHeader>
        <CardContent>
          {hasMembers ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-muted-foreground">
                    <th className="pb-3 font-medium">Nom</th>
                    <th className="pb-3 font-medium">Email</th>
                    <th className="pb-3 font-medium">Role</th>
                    <th className="pb-3 font-medium">Boutiques</th>
                    <th className="pb-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Rows would go here when connected to DB */}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted mb-4">
                <Users className="h-7 w-7 text-muted-foreground" />
              </div>
              <h3 className="text-base font-medium text-foreground mb-1">
                Vous etes le seul membre
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs mb-6">
                Invitez des gerants ou caissiers pour collaborer sur votre commerce
              </p>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                <UserPlus className="h-4 w-4" />
                Inviter un membre
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Separator className="bg-border" />

      {/* Role Descriptions */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Roles & Permissions
        </h2>
        <Card className="bg-card border-border">
          <CardContent className="pt-6 space-y-4">
            {roles.map((role) => (
              <div
                key={role.name}
                className="flex items-start gap-3 rounded-lg border border-border p-4"
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${role.bgColor}`}
                >
                  <role.icon className={`h-4 w-4 ${role.color}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">
                      {role.name}
                    </p>
                    <Badge
                      variant="outline"
                      className="border-border text-muted-foreground text-[10px]"
                    >
                      {role.name === "Proprietaire"
                        ? "1 par organisation"
                        : "Illimite"}
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {role.description}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
