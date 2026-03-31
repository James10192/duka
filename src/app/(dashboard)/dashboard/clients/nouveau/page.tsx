"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CLIENT_TYPES } from "@/lib/constants";
import { toast } from "sonner";
import { createClient } from "@/actions/clients";
import { getUserOrganizations } from "@/actions/organizations";

export default function NewClientPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const data = {
      name: form.get("name") as string,
      phone: (form.get("phone") as string) || undefined,
      whatsapp: (form.get("whatsapp") as string) || undefined,
      email: (form.get("email") as string) || undefined,
      area: (form.get("area") as string) || undefined,
      type: (form.get("type") as string) || "PARTICULIER",
      notes: (form.get("notes") as string) || undefined,
    };

    try {
      const orgs = await getUserOrganizations();
      if (!orgs.length) {
        toast.error("Completez l'onboarding d'abord");
        router.push("/onboarding");
        return;
      }
      const org = orgs[0];

      await createClient({
        orgId: org.id,
        name: data.name,
        phone: data.phone,
        whatsapp: data.whatsapp,
        email: data.email,
        area: data.area,
        type: data.type as "PARTICULIER" | "ENTREPRISE" | "EVENEMENTIEL" | "REVENDEUR" | "VIP",
        notes: data.notes,
      });

      toast.success("Client cree avec succes");
      router.push("/dashboard/clients");
    } catch (err) {
      console.error("Create client failed:", err);
      toast.error("Erreur lors de la creation du client");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/clients">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Nouveau client</h1>
          <p className="text-muted-foreground">
            Ajoutez un client a votre base
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
                  Nom du client *
                </label>
                <input
                  name="name"
                  required
                  placeholder="Ex: Jean Kouassi"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Telephone
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Ex: +225 07 00 00 00"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    WhatsApp
                  </label>
                  <input
                    name="whatsapp"
                    type="tel"
                    placeholder="Ex: +225 07 00 00 00"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="Ex: jean@exemple.com"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Type de client
                  </label>
                  <select
                    name="type"
                    defaultValue="PARTICULIER"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
                  >
                    {CLIENT_TYPES.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Zone / Quartier
                  </label>
                  <input
                    name="area"
                    placeholder="Ex: Cocody, Plateau"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Notes
                </label>
                <textarea
                  name="notes"
                  rows={4}
                  placeholder="Informations supplementaires sur le client..."
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2 resize-none"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button type="button" variant="outline" asChild>
            <Link href="/dashboard/clients">Annuler</Link>
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Creation..." : "Creer le client"}
          </Button>
        </div>
      </form>
    </div>
  );
}
