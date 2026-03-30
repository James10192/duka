"use client";

import {
  Settings,
  CreditCard,
  ArrowRight,
  Building2,
  Link2,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "@/lib/auth-client";

function getInitials(name: string | undefined | null): string {
  if (!name) return "?";
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function SettingsPage() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-10">
      {/* Breadcrumb + Title */}
      <div>
        <div className="flex items-center gap-1.5 text-sm text-zinc-500 mb-2">
          <Link href="/dashboard" className="hover:text-zinc-300 transition-colors">
            Tableau de bord
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-zinc-100">Parametres</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100 flex items-center gap-2">
          <Settings className="h-6 w-6 text-primary" />
          Parametres
        </h1>
        <p className="text-zinc-500 mt-1">
          Gerez votre compte, votre commerce et votre abonnement
        </p>
      </div>

      {/* Billing / Subscription Link Card */}
      <Link href="/dashboard/parametres/abonnement">
        <Card className="border-primary/40 bg-zinc-950 hover:border-primary/70 transition-colors cursor-pointer group">
          <CardContent className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-zinc-100">Abonnement & Facturation</p>
                <p className="text-sm text-zinc-500">
                  Plan Starter actif &mdash; Gerez votre abonnement et vos factures
                </p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-zinc-500 group-hover:text-primary transition-colors" />
          </CardContent>
        </Card>
      </Link>

      {/* Profile Section */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-100">Profil</h2>
        <Card className="bg-zinc-950 border-zinc-800">
          <CardContent className="pt-6 space-y-6">
            <div className="flex items-center gap-4">
              <Avatar size="lg">
                {user?.image && <AvatarImage src={user.image} alt={user.name ?? ""} />}
                <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                  {getInitials(user?.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium text-zinc-100">
                  {user?.name ?? "Chargement..."}
                </p>
                <p className="text-sm text-zinc-500">{user?.email ?? ""}</p>
              </div>
              <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300 hover:text-zinc-100">
                Modifier
              </Button>
            </div>

            <Separator className="bg-zinc-800" />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-400">Nom complet</label>
                <Input
                  defaultValue={user?.name ?? ""}
                  placeholder="Votre nom"
                  className="bg-zinc-900 border-zinc-800 text-zinc-100"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-400">Email</label>
                <Input
                  defaultValue={user?.email ?? ""}
                  placeholder="email@exemple.com"
                  className="bg-zinc-900 border-zinc-800 text-zinc-100"
                  disabled
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Organization Section */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
          <Building2 className="h-5 w-5 text-zinc-400" />
          Organisation
        </h2>
        <Card className="bg-zinc-950 border-zinc-800">
          <CardContent className="pt-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-400">
                  Nom du commerce
                </label>
                <Input
                  placeholder="Ex: Boutique Chez Awa"
                  className="bg-zinc-900 border-zinc-800 text-zinc-100"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-400">Secteur</label>
                <Input
                  placeholder="Ex: Alimentation generale"
                  className="bg-zinc-900 border-zinc-800 text-zinc-100"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-sm font-medium text-zinc-400">Ville</label>
                <Input
                  placeholder="Ex: Abidjan"
                  className="bg-zinc-900 border-zinc-800 text-zinc-100"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Enregistrer
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Linked Accounts */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
          <Link2 className="h-5 w-5 text-zinc-400" />
          Comptes lies
        </h2>
        <Card className="bg-zinc-950 border-zinc-800">
          <CardContent className="pt-6 space-y-4">
            {[
              {
                name: "Google",
                icon: "G",
                connected: false,
                description: "Connexion avec Google",
              },
              {
                name: "GitHub",
                icon: "GH",
                connected: false,
                description: "Connexion avec GitHub",
              },
            ].map((account) => (
              <div
                key={account.name}
                className="flex items-center justify-between rounded-lg border border-zinc-800 p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-zinc-800 text-sm font-bold text-zinc-300">
                    {account.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-100">{account.name}</p>
                    <p className="text-xs text-zinc-500">{account.description}</p>
                  </div>
                </div>
                {account.connected ? (
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                    Connecte
                  </Badge>
                ) : (
                  <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300 hover:text-zinc-100">
                    Connecter
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
