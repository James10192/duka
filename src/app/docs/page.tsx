import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowLeft,
  BookOpen,
  Code,
  Plug,
  Terminal,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Documentation — DUKA",
  description:
    "Guide de démarrage, référence API et intégrations pour la plateforme DUKA.",
};

function SectionHeading({
  id,
  icon: Icon,
  title,
}: {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
}) {
  return (
    <div id={id} className="scroll-mt-24">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-md bg-primary/10">
          <Icon className="size-4 text-primary" />
        </div>
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
      </div>
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-border/50 bg-card/50 p-4 font-mono text-sm text-muted-foreground">
      <code>{children}</code>
    </pre>
  );
}

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-foreground"
          >
            DUKA
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/#fonctionnalites"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Fonctionnalités
            </Link>
            <Link
              href="/#tarifs"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Tarifs
            </Link>
            <Link
              href="/docs"
              className="text-sm font-medium text-foreground"
            >
              Docs
            </Link>
          </div>
          <Button size="sm" asChild>
            <Link href="/#tarifs">Commencer</Link>
          </Button>
        </nav>
      </header>

      <main className="mx-auto max-w-3xl px-6 pt-32 pb-20">
        {/* Back link */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Retour à l&apos;accueil
        </Link>

        {/* Page header */}
        <div className="mb-12">
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Documentation
          </h1>
          <p className="text-muted-foreground">
            Tout ce dont vous avez besoin pour intégrer et utiliser DUKA dans votre
            activité commerciale.
          </p>
        </div>

        {/* Table of contents */}
        <div className="mb-12 rounded-lg border border-border/50 bg-card/30 p-6">
          <h3 className="mb-4 text-sm font-semibold text-foreground">
            Sur cette page
          </h3>
          <ul className="space-y-2">
            {[
              { href: "#demarrage", label: "Guide de démarrage" },
              { href: "#api", label: "Référence API" },
              { href: "#integrations", label: "Intégrations" },
            ].map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ChevronRight className="size-3" />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Getting Started */}
        <section className="mb-16">
          <SectionHeading id="demarrage" icon={BookOpen} title="Guide de démarrage" />

          <div className="space-y-6">
            <div>
              <h3 className="mb-2 font-semibold text-foreground">
                1. Créer votre compte
              </h3>
              <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                Inscrivez-vous sur DUKA avec votre adresse email ou votre numéro de
                téléphone. Le plan Starter est gratuit et ne nécessite aucune carte
                bancaire.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-foreground">
                2. Configurer votre commerce
              </h3>
              <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                Renseignez les informations de votre entreprise : nom commercial, adresse,
                numéro RCCM, régime fiscal. Ces données seront utilisées pour générer vos
                factures conformes OHADA.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-foreground">
                3. Importer vos produits
              </h3>
              <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                Ajoutez vos produits manuellement ou importez-les via un fichier CSV.
                DUKA supporte les catégories, variantes, codes-barres et photos produit.
              </p>
              <CodeBlock>{`# Format CSV attendu
nom,reference,prix_vente,prix_achat,stock,categorie
"Riz parfumé 5kg",RIZ-005,3500,2800,120,"Alimentaire"
"Huile Dinor 1L",HUI-001,1200,950,85,"Alimentaire"`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-foreground">
                4. Configurer les paiements
              </h3>
              <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                Activez les moyens de paiement que vous acceptez : espèces, Mobile Money
                (Orange, MTN, Wave, Moov), carte bancaire via CinetPay. Chaque mode peut
                être activé ou désactivé indépendamment.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-foreground">
                5. Lancer votre première vente
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Accédez au module POS, scannez ou recherchez un produit, ajoutez-le au
                panier et encaissez. Le stock est mis à jour automatiquement et le ticket
                de caisse est généré.
              </p>
            </div>
          </div>
        </section>

        <Separator className="mb-16" />

        {/* API Reference */}
        <section className="mb-16">
          <SectionHeading id="api" icon={Code} title="Référence API" />

          <div className="mb-6 rounded-lg border border-border/50 bg-card/30 p-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">v1</Badge>
              <span className="text-sm text-muted-foreground">
                API REST &mdash; Base URL :{" "}
                <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                  https://api.duka.ci/v1
                </code>
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="mb-2 font-semibold text-foreground">Authentification</h3>
              <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                Toutes les requêtes API nécessitent un jeton d&apos;accès. Générez votre
                clé API depuis le tableau de bord, section Paramètres &gt; API.
              </p>
              <CodeBlock>{`curl -X GET https://api.duka.ci/v1/products \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 font-semibold text-foreground">
                Endpoints principaux
              </h3>
              <div className="overflow-hidden rounded-lg border border-border/50">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50 bg-card/50">
                      <th className="px-4 py-2.5 text-left font-medium text-foreground">
                        Méthode
                      </th>
                      <th className="px-4 py-2.5 text-left font-medium text-foreground">
                        Endpoint
                      </th>
                      <th className="px-4 py-2.5 text-left font-medium text-foreground">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    {[
                      ["GET", "/products", "Lister les produits"],
                      ["POST", "/products", "Créer un produit"],
                      ["GET", "/sales", "Lister les ventes"],
                      ["POST", "/sales", "Enregistrer une vente"],
                      ["GET", "/invoices", "Lister les factures"],
                      ["POST", "/invoices", "Générer une facture OHADA"],
                      ["GET", "/customers", "Lister les clients"],
                      ["POST", "/customers", "Créer un client"],
                      ["GET", "/stock/movements", "Mouvements de stock"],
                      ["POST", "/payments/mobile", "Initier un paiement Mobile Money"],
                    ].map(([method, endpoint, desc]) => (
                      <tr
                        key={endpoint + method}
                        className="border-b border-border/30 last:border-0"
                      >
                        <td className="px-4 py-2.5">
                          <Badge
                            variant={method === "GET" ? "secondary" : "outline"}
                            className="font-mono text-xs"
                          >
                            {method}
                          </Badge>
                        </td>
                        <td className="px-4 py-2.5 font-mono text-xs text-foreground">
                          {endpoint}
                        </td>
                        <td className="px-4 py-2.5">{desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-foreground">Pagination</h3>
              <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                Toutes les listes sont paginées. Utilisez les paramètres{" "}
                <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                  page
                </code>{" "}
                et{" "}
                <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                  per_page
                </code>{" "}
                (max 100).
              </p>
              <CodeBlock>{`GET /v1/products?page=2&per_page=25

{
  "data": [...],
  "meta": {
    "current_page": 2,
    "per_page": 25,
    "total": 342,
    "total_pages": 14
  }
}`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-foreground">Codes d&apos;erreur</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                L&apos;API retourne des codes HTTP standards : 200 (succès), 201 (créé),
                400 (requête invalide), 401 (non authentifié), 403 (interdit), 404 (non
                trouvé), 422 (validation échouée), 429 (trop de requêtes), 500 (erreur
                serveur).
              </p>
            </div>
          </div>
        </section>

        <Separator className="mb-16" />

        {/* Integrations */}
        <section className="mb-16">
          <SectionHeading id="integrations" icon={Plug} title="Intégrations" />

          <div className="space-y-8">
            {/* CinetPay */}
            <div className="rounded-lg border border-border/50 p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-foreground">CinetPay</h3>
                <Badge variant="secondary">Paiements</Badge>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                CinetPay est la passerelle de paiement utilisée par DUKA pour traiter les
                paiements Mobile Money et carte bancaire. L&apos;intégration est
                automatique pour les plans Pro et supérieurs.
              </p>
              <h4 className="mb-2 text-sm font-medium text-foreground">Configuration</h4>
              <ol className="mb-4 list-inside list-decimal space-y-1.5 text-sm text-muted-foreground">
                <li>Créez un compte sur cinetpay.com</li>
                <li>
                  Récupérez votre{" "}
                  <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                    API_KEY
                  </code>{" "}
                  et{" "}
                  <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                    SITE_ID
                  </code>{" "}
                  depuis votre tableau de bord CinetPay
                </li>
                <li>
                  Ajoutez ces identifiants dans DUKA : Paramètres &gt; Intégrations &gt;
                  CinetPay
                </li>
                <li>Activez les moyens de paiement souhaités (Orange, MTN, Wave, Moov)</li>
              </ol>
              <CodeBlock>{`# Webhook de notification (configuré automatiquement)
POST https://api.duka.ci/v1/webhooks/cinetpay

# Payload reçu
{
  "cpm_trans_id": "TXN_20240115_001",
  "cpm_amount": "15000",
  "cpm_currency": "XOF",
  "cpm_payment_config": "SINGLE",
  "cpm_trans_status": "ACCEPTED"
}`}</CodeBlock>
            </div>

            {/* WhatsApp */}
            <div className="rounded-lg border border-border/50 p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-foreground">WhatsApp Business</h3>
                <Badge variant="secondary">Communication</Badge>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                Envoyez des notifications de commande, des factures et des messages
                promotionnels directement sur WhatsApp. Idéal pour la relation client en
                Afrique de l&apos;Ouest où WhatsApp est le canal de communication principal.
              </p>
              <h4 className="mb-2 text-sm font-medium text-foreground">
                Notifications automatiques
              </h4>
              <ul className="mb-4 space-y-1.5 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <ChevronRight className="size-3 text-primary" />
                  Confirmation de commande avec récapitulatif
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="size-3 text-primary" />
                  Envoi de facture PDF en pièce jointe
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="size-3 text-primary" />
                  Rappels de paiement pour les factures impayées
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="size-3 text-primary" />
                  Messages promotionnels et offres ciblées
                </li>
              </ul>
              <CodeBlock>{`# Envoyer une notification via l'API
POST /v1/notifications/whatsapp
{
  "customer_id": "cust_abc123",
  "template": "order_confirmation",
  "params": {
    "order_id": "ORD-2024-0042",
    "total": "25 500 FCFA"
  }
}`}</CodeBlock>
            </div>

            {/* MailPulse */}
            <div className="rounded-lg border border-border/50 p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-foreground">MailPulse</h3>
                <Badge variant="secondary">Email</Badge>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                MailPulse gère l&apos;envoi des emails transactionnels et marketing de
                DUKA : factures, rappels, newsletters et campagnes promotionnelles.
              </p>
              <h4 className="mb-2 text-sm font-medium text-foreground">Configuration</h4>
              <ol className="mb-4 list-inside list-decimal space-y-1.5 text-sm text-muted-foreground">
                <li>Créez un compte MailPulse et vérifiez votre domaine</li>
                <li>
                  Ajoutez votre clé API dans DUKA : Paramètres &gt; Intégrations &gt;
                  MailPulse
                </li>
                <li>
                  Personnalisez les modèles d&apos;email avec votre logo et vos couleurs
                </li>
              </ol>
              <CodeBlock>{`# Envoyer un email via l'API
POST /v1/notifications/email
{
  "customer_id": "cust_abc123",
  "template": "invoice",
  "subject": "Votre facture DUKA #FAC-2024-0089",
  "attachments": ["invoice_FAC-2024-0089.pdf"]
}`}</CodeBlock>
            </div>
          </div>
        </section>

        {/* Help CTA */}
        <div className="rounded-lg border border-border/50 bg-card/30 p-6 text-center">
          <h3 className="mb-2 font-semibold text-foreground">
            Besoin d&apos;aide ?
          </h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Notre équipe technique est disponible pour vous accompagner dans
            l&apos;intégration de DUKA.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button variant="outline" size="sm">
              contact@duka.ci
            </Button>
            <Button size="sm" asChild>
              <Link href="/#tarifs">Commencer maintenant</Link>
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} DUKA. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <Link
              href="/"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Accueil
            </Link>
            <Link
              href="/docs"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Documentation
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
