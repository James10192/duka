"use client";

import { useEffect, useState } from "react";
import {
  Settings,
  CreditCard,
  ArrowRight,
  Building2,
  Link2,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useSession, signIn } from "@/lib/auth-client";

function getInitials(name: string | undefined | null): string {
  if (!name) return "?";
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export default function SettingsPage() {
  const { data: session } = useSession();
  const user = session?.user;
  const [accounts, setAccounts] = useState<
    { providerId: string; accountId: string }[]
  >([]);

  useEffect(() => {
    fetch("/api/auth/list-accounts", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => setAccounts(data ?? []))
      .catch(() => setAccounts([]));
  }, []);

  const isGoogleLinked = accounts.some((a) => a.providerId === "google");
  const isGitHubLinked = accounts.some((a) => a.providerId === "github");

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-10">
      {/* Breadcrumb + Title */}
      <div>
        <div className="flex items-center gap-1.5 text-sm text-zinc-500 mb-2">
          <Link
            href="/dashboard"
            className="hover:text-zinc-300 transition-colors"
          >
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

      {/* Profile Section */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-100">Profil</h2>
        <Card className="bg-zinc-950 border-zinc-800 rounded-xl">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              {user?.image ? (
                <img
                  src={user.image}
                  alt={user.name ?? "Avatar"}
                  className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-primary/20"
                />
              ) : (
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary ring-2 ring-primary/20">
                  {getInitials(user?.name)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-zinc-100 truncate">
                  {user?.name ?? "Chargement..."}
                </p>
                <p className="text-sm text-zinc-500 truncate">
                  {user?.email ?? ""}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-zinc-700 text-zinc-300 hover:text-zinc-100"
              >
                Modifier
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
        <Card className="bg-zinc-950 border-zinc-800 rounded-xl">
          <CardContent className="p-5 space-y-3">
            {/* Google */}
            <div className="flex items-center justify-between rounded-lg border border-zinc-800 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-zinc-800">
                  <GoogleIcon className="h-4 w-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-zinc-100">Google</p>
                    {isGoogleLinked ? (
                      <Badge
                        variant="secondary"
                        className="bg-emerald-500/10 text-emerald-400 border-0 text-[10px] px-1.5 py-0"
                      >
                        Connecte
                      </Badge>
                    ) : (
                      <Badge
                        variant="secondary"
                        className="bg-zinc-800 text-zinc-500 border-0 text-[10px] px-1.5 py-0"
                      >
                        Non connecte
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-zinc-500">
                    Connexion avec Google
                  </p>
                </div>
              </div>
              {isGoogleLinked ? (
                <Button
                  variant="outline"
                  size="sm"
                  disabled
                  className="border-red-900/50 text-red-400 hover:bg-red-950 hover:text-red-300"
                >
                  Delier
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="border-zinc-700 text-zinc-300 hover:text-zinc-100"
                  onClick={() =>
                    signIn.social({
                      provider: "google",
                      callbackURL: "/dashboard/parametres",
                    })
                  }
                >
                  Connecter
                </Button>
              )}
            </div>

            {/* GitHub */}
            <div className="flex items-center justify-between rounded-lg border border-zinc-800 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-zinc-800 text-zinc-300">
                  <GitHubIcon className="h-4 w-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-zinc-100">GitHub</p>
                    {isGitHubLinked ? (
                      <Badge
                        variant="secondary"
                        className="bg-emerald-500/10 text-emerald-400 border-0 text-[10px] px-1.5 py-0"
                      >
                        Connecte
                      </Badge>
                    ) : (
                      <Badge
                        variant="secondary"
                        className="bg-zinc-800 text-zinc-500 border-0 text-[10px] px-1.5 py-0"
                      >
                        Non connecte
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-zinc-500">
                    Connexion avec GitHub
                  </p>
                </div>
              </div>
              {isGitHubLinked ? (
                <Button
                  variant="outline"
                  size="sm"
                  disabled
                  className="border-red-900/50 text-red-400 hover:bg-red-950 hover:text-red-300"
                >
                  Delier
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="border-zinc-700 text-zinc-300 hover:text-zinc-100"
                  onClick={() =>
                    signIn.social({
                      provider: "github",
                      callbackURL: "/dashboard/parametres",
                    })
                  }
                >
                  Connecter
                </Button>
              )}
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
        <Card className="bg-zinc-950 border-zinc-800 rounded-xl">
          <CardContent className="p-5">
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
                <label className="text-sm font-medium text-zinc-400">
                  Secteur
                </label>
                <Input
                  placeholder="Ex: Alimentation generale"
                  className="bg-zinc-900 border-zinc-800 text-zinc-100"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-sm font-medium text-zinc-400">
                  Ville
                </label>
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

      {/* Billing Link Card */}
      <Link href="/dashboard/parametres/abonnement">
        <Card className="border-teal-500/40 bg-zinc-950 hover:border-teal-500/70 transition-colors cursor-pointer group rounded-xl">
          <CardContent className="flex items-center justify-between p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500/10">
                <CreditCard className="h-5 w-5 text-teal-400" />
              </div>
              <div>
                <p className="font-medium text-zinc-100">
                  Abonnement & Facturation
                </p>
                <p className="text-sm text-zinc-500">
                  Gerez votre abonnement et vos factures
                </p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-zinc-500 group-hover:text-teal-400 transition-colors" />
          </CardContent>
        </Card>
      </Link>

    </div>
  );
}
