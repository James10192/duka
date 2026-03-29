import Link from "next/link";
import {
  Package,
  ShoppingCart,
  FileText,
  Users,
  Sparkles,
  Smartphone,
  Check,
  ArrowRight,
  ChevronRight,
  BarChart3,
  Shield,
  Globe,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const features = [
  {
    icon: Package,
    title: "Gestion de Stock",
    description:
      "Suivi en temps réel de vos stocks, alertes de rupture, gestion multi-dépôts et inventaires automatisés.",
  },
  {
    icon: ShoppingCart,
    title: "Ventes & POS",
    description:
      "Point de vente rapide et intuitif. Encaissements, remises, tickets de caisse et historique complet.",
  },
  {
    icon: FileText,
    title: "Factures OHADA",
    description:
      "Facturation conforme aux normes OHADA. Devis, bons de commande et exports comptables intégrés.",
  },
  {
    icon: Users,
    title: "CRM Clients",
    description:
      "Fichier clients centralisé, historique d'achats, segmentation et programmes de fidélité.",
  },
  {
    icon: Sparkles,
    title: "IA Générative",
    description:
      "Prévisions de ventes, recommandations de réapprovisionnement et analyses automatiques par IA.",
  },
  {
    icon: Smartphone,
    title: "Mobile Money",
    description:
      "Paiements Orange Money, MTN Money, Wave et Moov. Réconciliation automatique des transactions.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "0",
    period: "Gratuit pour toujours",
    description: "Pour démarrer et tester la plateforme sans engagement.",
    features: [
      "1 point de vente",
      "100 produits",
      "Facturation de base",
      "Support par email",
    ],
    cta: "Commencer gratuitement",
    variant: "outline" as const,
    highlighted: false,
  },
  {
    name: "Pro",
    price: "9 900",
    period: "FCFA / mois",
    description: "Pour les commerces en croissance qui veulent structurer leur activité.",
    features: [
      "3 points de vente",
      "Produits illimités",
      "Factures OHADA",
      "CRM clients",
      "Mobile Money",
      "Support prioritaire",
    ],
    cta: "Essai gratuit 14 jours",
    variant: "default" as const,
    highlighted: true,
  },
  {
    name: "Business",
    price: "24 900",
    period: "FCFA / mois",
    description: "Pour les entreprises avec plusieurs sites et équipes.",
    features: [
      "10 points de vente",
      "Multi-dépôts",
      "IA Générative",
      "API complète",
      "Intégrations avancées",
      "Support dédié",
    ],
    cta: "Essai gratuit 14 jours",
    variant: "outline" as const,
    highlighted: false,
  },
  {
    name: "Enterprise",
    price: "Sur devis",
    period: "Tarification personnalisée",
    description: "Solutions sur mesure pour les grandes structures et réseaux.",
    features: [
      "Points de vente illimités",
      "Déploiement sur site",
      "SLA garanti",
      "Formation équipes",
      "Intégrations custom",
      "Account manager dédié",
    ],
    cta: "Contacter l'équipe",
    variant: "outline" as const,
    highlighted: false,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="text-xl font-bold tracking-tight text-foreground">
            DUKA
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#fonctionnalites"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Fonctionnalités
            </a>
            <a
              href="#tarifs"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Tarifs
            </a>
            <Link
              href="/docs"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Docs
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Se connecter
            </Button>
            <Button size="sm" asChild>
              <Link href="#tarifs">
                Commencer
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
          {/* Subtle grid background */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
          {/* Gradient glow */}
          <div className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

          <div className="relative mx-auto max-w-4xl px-6 text-center">
            <Badge variant="secondary" className="mb-6">
              Bientôt disponible en Côte d&apos;Ivoire
            </Badge>
            <h1 className="mb-2 text-5xl font-bold tracking-tight text-foreground md:text-7xl">
              DUKA
            </h1>
            <p className="mx-auto mb-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
              La gestion commerciale intelligente pour l&apos;Afrique
            </p>
            <p className="mx-auto mb-10 max-w-xl text-sm text-muted-foreground/80">
              Stock, ventes, factures, CRM et paiements mobiles — tout ce dont votre
              commerce a besoin, dans une seule plateforme.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="#tarifs">
                  Commencer gratuitement
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                Voir la démo
              </Button>
            </div>
          </div>
        </section>

        {/* Problem / Solution */}
        <section className="border-t border-border/50 py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Les outils existants ne sont pas faits pour vous
              </h2>
              <p className="mb-12 text-muted-foreground">
                Les logiciels de gestion occidentaux ignorent les réalités du commerce
                africain : paiements Mobile Money, normes comptables OHADA, connectivité
                intermittente, facturation en FCFA.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-lg border border-border/50 bg-card/50 p-6">
                <div className="mb-3 flex size-10 items-center justify-center rounded-md bg-primary/10">
                  <Globe className="size-5 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">Conçu pour l&apos;Afrique</h3>
                <p className="text-sm text-muted-foreground">
                  Multi-devises FCFA/XOF, normes OHADA, langues locales et interfaces
                  adaptées aux réalités terrain.
                </p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/50 p-6">
                <div className="mb-3 flex size-10 items-center justify-center rounded-md bg-primary/10">
                  <Smartphone className="size-5 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">Mobile-first</h3>
                <p className="text-sm text-muted-foreground">
                  Fonctionne sur tout appareil, même avec une connexion instable. Mode
                  hors-ligne intégré.
                </p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/50 p-6">
                <div className="mb-3 flex size-10 items-center justify-center rounded-md bg-primary/10">
                  <Shield className="size-5 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">Simple et fiable</h3>
                <p className="text-sm text-muted-foreground">
                  Pas de formation complexe nécessaire. Interface intuitive, prise en main
                  en moins de 10 minutes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          id="fonctionnalites"
          className="scroll-mt-20 border-t border-border/50 py-20 md:py-28"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Tout pour gérer votre commerce
              </h2>
              <p className="text-muted-foreground">
                Six modules intégrés qui couvrent l&apos;ensemble de votre activité
                commerciale, du stock à la comptabilité.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group rounded-lg border border-border/50 bg-card/30 p-6 transition-colors hover:border-border hover:bg-card/60"
                >
                  <div className="mb-4 flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                    <feature.icon className="size-5" />
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats bar */}
        <section className="border-t border-border/50 bg-card/30 py-12">
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
            {[
              { value: "500+", label: "Commerces" },
              { value: "12M+", label: "Transactions FCFA" },
              { value: "99.9%", label: "Disponibilité" },
              { value: "4.8/5", label: "Satisfaction" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-foreground md:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section
          id="tarifs"
          className="scroll-mt-20 border-t border-border/50 py-20 md:py-28"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Tarification simple et transparente
              </h2>
              <p className="text-muted-foreground">
                Commencez gratuitement, évoluez selon vos besoins. Aucun frais caché.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {plans.map((plan) => (
                <Card
                  key={plan.name}
                  className={
                    plan.highlighted
                      ? "relative border-primary/50 bg-card"
                      : "border-border/50 bg-card/30"
                  }
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge>Populaire</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardDescription className="text-sm font-medium text-foreground">
                      {plan.name}
                    </CardDescription>
                    <CardTitle className="text-3xl font-bold">
                      {plan.price === "Sur devis" ? (
                        <span className="text-xl">Sur devis</span>
                      ) : (
                        <>
                          {plan.price}
                          {plan.price !== "0" && (
                            <span className="ml-1 text-sm font-normal text-muted-foreground">
                              FCFA/mois
                            </span>
                          )}
                        </>
                      )}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">{plan.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2.5">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant={plan.variant}
                      className="w-full"
                    >
                      {plan.cta}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border/50 py-20 md:py-28">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Prêt à transformer votre commerce ?
            </h2>
            <p className="mb-8 text-muted-foreground">
              Rejoignez les commerçants qui modernisent leur gestion avec DUKA.
              Inscription gratuite, sans carte bancaire.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg">
                Commencer gratuitement
                <ArrowRight className="size-4" />
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/docs">
                  Lire la documentation
                  <ChevronRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-3 text-lg font-bold text-foreground">DUKA</div>
              <p className="text-sm text-muted-foreground">
                La gestion commerciale intelligente pour l&apos;Afrique francophone.
              </p>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold text-foreground">Produit</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#fonctionnalites"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Fonctionnalités
                  </a>
                </li>
                <li>
                  <a
                    href="#tarifs"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Tarifs
                  </a>
                </li>
                <li>
                  <Link
                    href="/docs"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold text-foreground">Intégrations</h4>
              <ul className="space-y-2">
                <li>
                  <span className="text-sm text-muted-foreground">CinetPay</span>
                </li>
                <li>
                  <span className="text-sm text-muted-foreground">WhatsApp Business</span>
                </li>
                <li>
                  <span className="text-sm text-muted-foreground">MailPulse</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold text-foreground">Contact</h4>
              <ul className="space-y-2">
                <li>
                  <span className="text-sm text-muted-foreground">
                    contact@duka.ci
                  </span>
                </li>
                <li>
                  <span className="text-sm text-muted-foreground">
                    Abidjan, Côte d&apos;Ivoire
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} DUKA. Tous droits réservés.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                Conditions d&apos;utilisation
              </a>
              <a
                href="#"
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                Politique de confidentialité
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
