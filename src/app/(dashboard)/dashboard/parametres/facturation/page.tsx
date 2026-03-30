"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const templates = [
  {
    id: "classique",
    name: "Classique",
    description: "Mise en page traditionnelle, ideale pour tous les secteurs",
    preview: "En-tete / Tableau / Total / Mentions",
  },
  {
    id: "moderne",
    name: "Moderne",
    description: "Design epure avec accents de couleur et typographie moderne",
    preview: "Logo lateral / Grille / Recapitulatif",
  },
  {
    id: "minimaliste",
    name: "Minimaliste",
    description: "Format compact, parfait pour les recus et petits commerces",
    preview: "Compact / Sans bordures / Essentiel",
  },
] as const;

type TemplateId = (typeof templates)[number]["id"];

export default function FacturationPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>("classique");

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
          <span className="text-zinc-100">Facturation</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100 flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          Facturation
        </h1>
        <p className="text-zinc-500 mt-1">
          Personnalisez vos factures et mentions legales
        </p>
      </div>

      {/* Template Selector */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-100">
          Modele de facture
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {templates.map((tpl) => {
            const isSelected = selectedTemplate === tpl.id;
            return (
              <button
                key={tpl.id}
                type="button"
                onClick={() => setSelectedTemplate(tpl.id)}
                className={`relative rounded-lg border p-4 text-left transition-all cursor-pointer ${
                  isSelected
                    ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                    : "border-zinc-800 bg-zinc-950 hover:border-zinc-700"
                }`}
              >
                {isSelected && (
                  <CheckCircle2 className="absolute top-2 right-2 h-4 w-4 text-primary" />
                )}
                {/* Preview placeholder */}
                <div className="mb-3 flex h-20 items-center justify-center rounded-md border border-zinc-800 bg-zinc-900 text-[10px] text-zinc-600 leading-tight px-2 text-center">
                  {tpl.preview}
                </div>
                <p className="text-sm font-medium text-zinc-100">{tpl.name}</p>
                <p className="mt-0.5 text-xs text-zinc-500">{tpl.description}</p>
              </button>
            );
          })}
        </div>
      </section>

      <Separator className="bg-zinc-800" />

      {/* Business Info */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-100">
          Informations de l&apos;entreprise
        </h2>
        <Card className="bg-zinc-950 border-zinc-800">
          <CardContent className="pt-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-400">
                  Raison sociale
                </label>
                <Input
                  placeholder="Nom de l'entreprise"
                  className="bg-zinc-900 border-zinc-800 text-zinc-100"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-400">
                  Telephone
                </label>
                <Input
                  placeholder="+225 XX XX XX XX XX"
                  className="bg-zinc-900 border-zinc-800 text-zinc-100"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-sm font-medium text-zinc-400">
                  Adresse
                </label>
                <Input
                  placeholder="Adresse complete"
                  className="bg-zinc-900 border-zinc-800 text-zinc-100"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-400">
                  Numero RCCM
                </label>
                <Input
                  placeholder="CI-ABJ-XXXX-X-XXXXX"
                  className="bg-zinc-900 border-zinc-800 text-zinc-100"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-400">
                  Numero d&apos;identification fiscale
                </label>
                <Input
                  placeholder="NIF"
                  className="bg-zinc-900 border-zinc-800 text-zinc-100"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Legal Mentions */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-100">
          Mentions legales
        </h2>
        <Card className="bg-zinc-950 border-zinc-800">
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-400">
                Mentions a afficher sur les factures
              </label>
              <textarea
                rows={3}
                placeholder="Ex: Facture conforme aux normes OHADA. TVA non applicable - Article XX..."
                className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-ring focus:outline-none focus:ring-[3px] focus:ring-ring/50"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-400">
                Conditions de paiement
              </label>
              <textarea
                rows={3}
                placeholder="Ex: Paiement a reception. Penalite de retard : 1.5% par mois. Mobile Money accepte."
                className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-ring focus:outline-none focus:ring-[3px] focus:ring-ring/50"
              />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
          Enregistrer
        </Button>
      </div>
    </div>
  );
}
