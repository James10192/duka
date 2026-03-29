import Link from "next/link";
import { DukaLogo } from "@/components/duka-logo";
import {
  Package,
  ShoppingCart,
  FileText,
  Users,
  Sparkles,
  Smartphone,
  Check,
  ArrowRight,
  Banknote,
  MessageCircle,
  Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/landing/navbar";
import { HeroGlow } from "@/components/landing/hero-glow";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/landing/animated-section";
import { MetricCard } from "@/components/landing/metric-card";
import { PulseLine } from "@/components/landing/pulse-line";
import { POSTerminal } from "@/components/landing/pos-terminal";
import { Suspense } from "react";
import { ErrorToast } from "@/components/landing/error-toast";

const starterFeatures = [
  "50 produits",
  "1 utilisateur",
  "1 boutique",
  "100 ventes / mois",
  "Facturation de base",
];

const proFeatures = [
  "Produits illimites",
  "3 utilisateurs",
  "Ventes illimitees",
  "20 generations IA",
  "Mobile Money",
  "Scan code-barres",
  "Export donnees",
];

const businessFeatures = [
  "10 utilisateurs",
  "5 boutiques",
  "100 generations IA",
  "10 Go stockage",
  "CRM automatise",
  "Tout de Pro inclus",
];

/* Enterprise features are inlined in the CTA bar below the pricing grid */

const team = [
  {
    name: "Marcel DJEDJE-LI",
    role: "Fondateur & Full-Stack Developer",
    github: "James10192",
    linkedin: "marcel-djedje-li-099490235",
    tech: ["Next.js", "Prisma", "Convex", "Python", "TypeScript"],
  },
  {
    name: "Yablai Yablai Ruben Virgil",
    role: "Co-Fondateur & Frontend / Mobile Developer",
    github: "yab21",
    linkedin: "ruben-yablai",
    tech: ["Flutter", "Next.js", "React", "TypeScript", "Dart"],
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <Suspense>
        <ErrorToast />
      </Suspense>

      <main>
        {/* ───── Hero ───── */}
        <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
          <HeroGlow />

          <div className="relative mx-auto max-w-4xl px-6 text-center">
            <AnimatedSection>
              <p className="mb-6 font-mono text-5xl font-bold tracking-tighter text-zinc-100 md:text-7xl">
                DUKA
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <Badge
                variant="secondary"
                className="mb-6 border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-400"
              >
                <span className="relative mr-2 flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                Bientot disponible en Cote d&apos;Ivoire
              </Badge>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <h1 className="mb-4 font-mono text-3xl font-bold tracking-tight text-zinc-100 md:text-5xl">
                Votre commerce, simplifie.
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <p className="mx-auto mb-8 max-w-xl text-base text-zinc-400 md:text-lg">
                La plateforme de gestion commerciale pensee pour les commercants
                africains. Stock, ventes, factures OHADA, CRM et Mobile Money — tout
                en un.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/register">
                    Commencer gratuitement
                    <ArrowRight className="ml-1 size-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="#fonctionnalites">Voir les fonctionnalites</Link>
                </Button>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.5}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                {["Next.js 16", "Prisma", "Convex", "Claude AI", "CinetPay"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 font-mono text-xs text-zinc-500"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ───── Metrics bar ───── */}
        <section className="border-y border-zinc-800/50 bg-zinc-900/30 py-12">
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
            <MetricCard value={10} suffix=" min" label="Premiere configuration" />
            <MetricCard value={50} suffix="k+" label="Commercants cibles" />
            <MetricCard value={18} suffix="%" label="TVA auto-calculee" />
            <MetricCard value={100} suffix="%" label="Conforme OHADA" />
          </div>
        </section>

        {/* ───── Made for Africa ───── */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <AnimatedSection className="mx-auto mb-14 max-w-2xl text-center">
              <h2 className="mb-4 font-mono text-2xl font-bold tracking-tight text-zinc-100 md:text-3xl">
                Concu pour l&apos;Afrique
              </h2>
              <p className="text-zinc-400">
                Les outils occidentaux ignorent vos realites. DUKA est ne du terrain.
              </p>
            </AnimatedSection>

            <StaggerContainer className="grid gap-6 md:grid-cols-3">
              <StaggerItem>
                <div className="rounded-lg border border-zinc-800/50 bg-zinc-900/30 p-6">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                    <Banknote className="size-5 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold text-zinc-100">
                    Pense pour le FCFA
                  </h3>
                  <p className="text-sm text-zinc-400">
                    Mobile Money natif. MTN MoMo, Orange Money, Wave — les moyens de
                    paiement de vos clients, integres nativement.
                  </p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="rounded-lg border border-zinc-800/50 bg-zinc-900/30 p-6">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                    <MessageCircle className="size-5 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold text-zinc-100">
                    Support francophone
                  </h3>
                  <p className="text-sm text-zinc-400">
                    WhatsApp + support local. Documentation en francais,
                    accompagnement par des equipes qui connaissent votre marche.
                  </p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="rounded-lg border border-zinc-800/50 bg-zinc-900/30 p-6">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                    <Brain className="size-5 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold text-zinc-100">
                    IA contextuelle
                  </h3>
                  <p className="text-sm text-zinc-400">
                    Adaptee au marche ivoirien. Recommandations, pricing et relances
                    bases sur les habitudes locales.
                  </p>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        <PulseLine />

        {/* ───── Features bento grid ───── */}
        <section
          id="fonctionnalites"
          className="scroll-mt-20 py-20 md:py-28"
        >
          <div className="mx-auto max-w-6xl px-6">
            <AnimatedSection className="mx-auto mb-14 max-w-2xl text-center">
              <h2 className="mb-4 font-mono text-2xl font-bold tracking-tight text-zinc-100 md:text-3xl">
                Tout pour gerer votre commerce
              </h2>
              <p className="text-zinc-400">
                Six modules integres qui couvrent l&apos;ensemble de votre activite.
              </p>
            </AnimatedSection>

            <StaggerContainer className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-3">
              {/* Stock — spans 2 cols, row 1 */}
              <StaggerItem className="md:col-span-2">
                <div className="group relative h-full rounded-2xl border border-zinc-800/50 bg-zinc-900/20 p-6 transition-all duration-300 hover:border-primary/30 hover:bg-zinc-900/40">
                  <div className="relative">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-primary/10 bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                      <Package className="size-5" />
                    </div>
                    <h3 className="mb-2 font-semibold text-zinc-100">
                      Gestion de stock
                    </h3>
                    <p className="mb-5 text-sm leading-relaxed text-zinc-400">
                      Stock temps reel, alertes de rupture, mouvements entree/sortie, valorisation automatique, seuils configurables.
                    </p>
                    {/* Mini stock bars visualization */}
                    <div className="flex items-end gap-2 rounded-lg border border-zinc-800/50 bg-zinc-950/60 p-3">
                      {[
                        { label: "Riz 25kg", pct: 82, color: "bg-primary" },
                        { label: "Huile 1L", pct: 45, color: "bg-amber-500" },
                        { label: "Sucre 1kg", pct: 12, color: "bg-red-500" },
                        { label: "Lait 500ml", pct: 67, color: "bg-primary" },
                        { label: "Savon", pct: 91, color: "bg-primary" },
                      ].map((item) => (
                        <div key={item.label} className="flex flex-1 flex-col items-center gap-1.5">
                          <div className="relative h-16 w-full rounded-sm bg-zinc-800/60">
                            <div
                              className={`absolute bottom-0 w-full rounded-sm ${item.color} transition-all`}
                              style={{ height: `${item.pct}%` }}
                            />
                          </div>
                          <span className="text-[10px] leading-tight text-zinc-500">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </StaggerItem>

              {/* POS — 1 col, row 1 */}
              <StaggerItem>
                <div className="group relative h-full rounded-2xl border border-zinc-800/50 bg-zinc-900/20 p-6 transition-all duration-300 hover:border-primary/30 hover:bg-zinc-900/40">
                  <div className="relative">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-primary/10 bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                      <ShoppingCart className="size-5" />
                    </div>
                    <h3 className="mb-2 font-semibold text-zinc-100">
                      Point de vente
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-400">
                      Interface POS ultra-rapide, panier intelligent, paiement mixte (especes + Mobile Money), facture auto en 1 tap.
                    </p>
                  </div>
                </div>
              </StaggerItem>

              {/* OHADA — 1 col, row 2 */}
              <StaggerItem>
                <div className="group relative h-full rounded-2xl border border-zinc-800/50 bg-zinc-900/20 p-6 transition-all duration-300 hover:border-primary/30 hover:bg-zinc-900/40">
                  <div className="relative">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-primary/10 bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                      <FileText className="size-5" />
                    </div>
                    <h3 className="mb-2 font-semibold text-zinc-100">
                      Factures OHADA
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-400">
                      Numerotation sequentielle sans trou, generation PDF, envoi WhatsApp, 3 templates professionnels, conformite 100%.
                    </p>
                  </div>
                </div>
              </StaggerItem>

              {/* CRM — 1 col, row 2 */}
              <StaggerItem>
                <div className="group relative h-full rounded-2xl border border-zinc-800/50 bg-zinc-900/20 p-6 transition-all duration-300 hover:border-primary/30 hover:bg-zinc-900/40">
                  <div className="relative">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-primary/10 bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                      <Users className="size-5" />
                    </div>
                    <h3 className="mb-2 font-semibold text-zinc-100">
                      CRM Clients
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-400">
                      Historique achats complet, segmentation automatique, score fidelite RFM, rappels occasions, credit informel.
                    </p>
                  </div>
                </div>
              </StaggerItem>

              {/* IA — 1 col, spans 2 rows (row 2-3) */}
              <StaggerItem className="md:row-span-2">
                <div className="group relative h-full rounded-2xl border border-zinc-800/50 bg-zinc-900/20 p-6 transition-all duration-300 hover:border-primary/30 hover:bg-zinc-900/40">
                  <div className="relative flex h-full flex-col">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-primary/10 bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                      <Sparkles className="size-5" />
                    </div>
                    <h3 className="mb-2 font-semibold text-zinc-100">
                      IA Generative
                    </h3>
                    <p className="mb-5 text-sm leading-relaxed text-zinc-400">
                      Plans d&apos;action 30 jours, strategies pricing, messages relance WhatsApp, analyses performance, previsions.
                    </p>
                    {/* Fake AI generation output */}
                    <div className="mt-auto space-y-2 rounded-lg border border-zinc-800/50 bg-zinc-950/60 p-3 font-mono text-xs">
                      <div className="flex items-center gap-2 text-primary">
                        <Sparkles className="size-3" />
                        <span className="text-zinc-500">Analyse en cours...</span>
                      </div>
                      <div className="space-y-1.5 text-zinc-400">
                        <p>&gt; Marge moyenne: <span className="text-primary">34%</span></p>
                        <p>&gt; Produit star: <span className="text-zinc-200">Riz 25kg</span></p>
                        <p>&gt; Action: <span className="text-zinc-200">Augmenter stock</span></p>
                        <p>&gt; <span className="text-zinc-200">Huile en promo -10%</span></p>
                        <p className="text-primary">Prevision +18% CA ce mois</p>
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>

              {/* Mobile Money — spans 2 cols, row 3 */}
              <StaggerItem className="md:col-span-2">
                <div className="group relative h-full rounded-2xl border border-zinc-800/50 bg-zinc-900/20 p-6 transition-all duration-300 hover:border-primary/30 hover:bg-zinc-900/40">
                  <div className="relative">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-primary/10 bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                      <Smartphone className="size-5" />
                    </div>
                    <h3 className="mb-2 font-semibold text-zinc-100">
                      Mobile Money
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-400">
                      MTN MoMo, Orange Money, Wave, Moov via CinetPay. Confirmation temps reel, reconciliation automatique.
                    </p>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* ───── POS Terminal visualization ───── */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <AnimatedSection className="mx-auto mb-14 max-w-2xl text-center">
              <h2 className="mb-4 font-mono text-2xl font-bold tracking-tight text-zinc-100 md:text-3xl">
                Point de vente en action
              </h2>
              <p className="text-zinc-400">
                Une interface rapide et intuitive pour encaisser vos clients.
              </p>
            </AnimatedSection>
            <AnimatedSection>
              <POSTerminal />
            </AnimatedSection>
          </div>
        </section>

        <PulseLine />

        {/* ───── Pricing ───── */}
        <section id="tarifs" className="scroll-mt-20 py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <AnimatedSection className="mx-auto mb-14 max-w-2xl text-center">
              <h2 className="mb-4 font-mono text-2xl font-bold tracking-tight text-zinc-100 md:text-3xl">
                Tarification simple et transparente
              </h2>
              <p className="text-zinc-400">
                Commencez gratuitement, evoluez selon vos besoins. Aucun frais cache.
              </p>
            </AnimatedSection>

            {/* 3-column pricing grid */}
            <StaggerContainer className="grid gap-4 md:grid-cols-3">
              {/* Starter */}
              <StaggerItem className="flex">
                <Card className="flex h-full flex-col border-zinc-800/50 bg-zinc-900/20">
                  <CardHeader className="p-5 pb-3">
                    <p className="text-sm font-medium text-zinc-400">Starter</p>
                    <div className="mt-2">
                      <span className="whitespace-nowrap font-mono text-2xl font-bold text-zinc-100">
                        0 FCFA
                      </span>
                      <span className="ml-1 text-xs text-zinc-500">Gratuit pour toujours</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 p-5 pt-2">
                    <ul className="space-y-2">
                      {starterFeatures.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-zinc-400">
                          <Check className="mt-0.5 size-3.5 shrink-0 text-primary" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="p-5 pt-0">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/register">Commencer gratuitement</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </StaggerItem>

              {/* Pro — highlighted */}
              <StaggerItem className="flex">
                <Card className="relative flex h-full flex-col border-primary/40 bg-zinc-900/60 shadow-lg shadow-primary/10 md:-my-2">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">Populaire</Badge>
                  </div>
                  <CardHeader className="p-5 pb-3 pt-6">
                    <p className="text-sm font-medium text-zinc-400">Pro</p>
                    <div className="mt-2">
                      <span className="whitespace-nowrap font-mono text-2xl font-bold text-zinc-100">
                        9 900 FCFA/mois
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 p-5 pt-2">
                    <ul className="space-y-2">
                      {proFeatures.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-zinc-400">
                          <Check className="mt-0.5 size-3.5 shrink-0 text-primary" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="p-5 pt-0">
                    <Button className="w-full" asChild>
                      <Link href="/register">Essai gratuit 14 jours</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </StaggerItem>

              {/* Business */}
              <StaggerItem className="flex">
                <Card className="flex h-full flex-col border-zinc-800/50 bg-zinc-900/20">
                  <CardHeader className="p-5 pb-3">
                    <p className="text-sm font-medium text-zinc-400">Business</p>
                    <div className="mt-2">
                      <span className="whitespace-nowrap font-mono text-2xl font-bold text-zinc-100">
                        24 900 FCFA/mois
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 p-5 pt-2">
                    <ul className="space-y-2">
                      {businessFeatures.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-zinc-400">
                          <Check className="mt-0.5 size-3.5 shrink-0 text-primary" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="p-5 pt-0">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/register">Essai gratuit 14 jours</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </StaggerItem>
            </StaggerContainer>

            {/* Enterprise — full-width CTA bar */}
            <AnimatedSection className="mt-4">
              <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-zinc-800/50 bg-zinc-900/20 px-6 py-5 sm:flex-row">
                <div>
                  <p className="font-semibold text-zinc-100">Enterprise</p>
                  <p className="text-sm text-zinc-400">
                    Sur mesure — utilisateurs, boutiques, IA et stockage illimites. SLA garanti, account manager dedie.
                  </p>
                </div>
                <Button variant="outline" className="shrink-0 whitespace-nowrap" asChild>
                  <Link href="/register">Contacter l&apos;equipe</Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ───── Team ───── */}
        <section className="border-t border-zinc-800/50 py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-6">
            <AnimatedSection className="mx-auto mb-14 max-w-2xl text-center">
              <h2 className="mb-4 font-mono text-2xl font-bold tracking-tight text-zinc-100 md:text-3xl">
                L&apos;equipe
              </h2>
              <p className="text-zinc-400">
                Deux developpeurs passionnes par la tech et le commerce africain.
              </p>
            </AnimatedSection>

            <StaggerContainer className="grid gap-6 md:grid-cols-2">
              {team.map((member) => (
                <StaggerItem key={member.name}>
                  <div className="rounded-lg border border-zinc-800/50 bg-zinc-900/30 p-6">
                    <h3 className="font-semibold text-zinc-100">{member.name}</h3>
                    <p className="mt-1 text-sm text-primary">{member.role}</p>
                    <div className="mt-4 flex gap-3">
                      <a
                        href={`https://github.com/${member.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-500 transition-colors hover:text-zinc-100"
                      >
                        <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                      <a
                        href={`https://linkedin.com/in/${member.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-500 transition-colors hover:text-zinc-100"
                      >
                        <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {member.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-zinc-800 bg-zinc-900/50 px-2 py-0.5 font-mono text-xs text-zinc-500"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ───── Final CTA ───── */}
        <section className="border-t border-zinc-800/50 py-20 md:py-28">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <AnimatedSection>
              <h2 className="mb-4 font-mono text-2xl font-bold tracking-tight text-zinc-100 md:text-3xl">
                Pret a digitaliser votre commerce ?
              </h2>
              <p className="mb-8 text-zinc-400">
                Rejoignez les commercants qui modernisent leur gestion avec DUKA.
                Inscription gratuite, sans carte bancaire.
              </p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/register">
                    Commencer gratuitement
                    <ArrowRight className="ml-1 size-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/docs">Lire la documentation</Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      {/* ───── Footer ───── */}
      <footer className="border-t border-zinc-800/50 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-3">
                <DukaLogo size={20} />
              </div>
              <p className="text-sm text-zinc-500">
                La gestion commerciale intelligente pour l&apos;Afrique francophone.
              </p>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold text-zinc-300">Produit</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#fonctionnalites"
                    className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
                  >
                    Fonctionnalites
                  </a>
                </li>
                <li>
                  <a
                    href="#tarifs"
                    className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
                  >
                    Tarifs
                  </a>
                </li>
                <li>
                  <Link
                    href="/docs"
                    className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
                  >
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold text-zinc-300">
                Integrations
              </h4>
              <ul className="space-y-2">
                <li className="text-sm text-zinc-500">CinetPay</li>
                <li className="text-sm text-zinc-500">WhatsApp Business</li>
                <li className="text-sm text-zinc-500">Claude AI</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold text-zinc-300">Contact</h4>
              <ul className="space-y-2">
                <li className="text-sm text-zinc-500">contact@duka.ci</li>
                <li className="text-sm text-zinc-500">
                  Abidjan, Cote d&apos;Ivoire
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-zinc-800/50 pt-8">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-xs text-zinc-600">
                &copy; {new Date().getFullYear()} DUKA. Tous droits reserves.
              </p>
              <div className="flex gap-6">
                <a
                  href="#"
                  className="text-xs text-zinc-600 transition-colors hover:text-zinc-400"
                >
                  Conditions d&apos;utilisation
                </a>
                <a
                  href="#"
                  className="text-xs text-zinc-600 transition-colors hover:text-zinc-400"
                >
                  Politique de confidentialite
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
