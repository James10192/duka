<div align="center">

# DUKA

**La gestion commerciale intelligente pour l'Afrique**

Plateforme SaaS de gestion commerciale pour les commerces physiques en Afrique francophone.
Stock, ventes POS, facturation OHADA, CRM, journal de caisse, intelligence artificielle, Mobile Money.

[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Prisma 7](https://img.shields.io/badge/Prisma-7-2D3748?style=flat-square&logo=prisma)](https://prisma.io)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue?style=flat-square)](./LICENSE)

</div>

---

## Overview

DUKA est une solution de gestion commerciale conçue pour les commerçants d'Afrique francophone. Lancée en Côte d'Ivoire, la plateforme couvre l'ensemble du cycle commercial : gestion des stocks, point de vente, facturation conforme OHADA, suivi clients, journal de caisse et intelligence d'affaires propulsée par l'IA.

L'architecture multi-tenant avec contrôle d'accès par rôles (RBAC) permet aux organisations de gérer plusieurs points de vente avec des droits granulaires par utilisateur.

### Pourquoi DUKA ?

- **Conformité OHADA** -- Numérotation séquentielle des factures, journal de caisse en ajout seul, normes comptables respectées.
- **Mobile Money natif** -- Intégration CinetPay pour les paiements par Mobile Money, adaptée aux réalités du marché.
- **IA intégrée** -- Analyse des ventes, prévisions de stock et recommandations commerciales via Claude.
- **Temps réel** -- Tableau de bord live, alertes de stock et fil d'activité en temps réel.
- **Hors ligne d'abord** -- Conçu pour fonctionner même avec une connectivité intermittente.

---

## Features

| Module | Description |
|---|---|
| **Stock Management** | Product catalog, stock levels, low-stock alerts, multi-store inventory tracking |
| **Point of Sale** | Fast POS interface, barcode support, receipt generation, cash and Mobile Money payments |
| **OHADA Invoicing** | Legally compliant sequential invoicing with PDF generation via `@react-pdf/renderer` |
| **CRM** | Client database, purchase history, segmentation, loyalty tracking |
| **Cash Journal** | Immutable append-only ledger, daily balances, reverse entries only (no delete/edit) |
| **AI Business Intelligence** | Sales analysis, demand forecasting, smart reorder suggestions powered by Claude |
| **Mobile Money** | CinetPay integration for Orange Money, MTN Mobile Money, Wave, and more |
| **Multi-Tenant RBAC** | Organizations, stores, and users with Owner / Manager / Cashier roles |
| **Real-Time Dashboard** | Live sales metrics, stock alerts, notifications, and activity feed via Convex |
| **Onboarding Wizard** | 5-step guided setup for new merchants |

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router, Turbopack, `proxy.ts`) |
| **Language** | TypeScript 5.8 (strict mode) |
| **Database** | PostgreSQL via Prisma 7 ORM + Neon serverless driver |
| **Real-Time** | Convex (dashboard stats, notifications, stock alerts, presence, activity feed) |
| **Authentication** | Better Auth v1.5 with Prisma adapter, Phone OTP, Organizations plugin |
| **AI** | Anthropic Claude via AI SDK + AI Gateway |
| **Payments** | CinetPay (Mobile Money) |
| **Storage** | Cloudflare R2 via `@aws-sdk/client-s3` (invoice PDFs, product photos) |
| **PDF Generation** | `@react-pdf/renderer` (OHADA-compliant invoices) |
| **UI** | shadcn/ui + Tailwind CSS v4 + Geist fonts + Lucide icons |
| **Charts** | Recharts |
| **Animations** | Motion (Framer Motion) |
| **Validation** | Zod |
| **Package Manager** | pnpm |

---

## Architecture

```
                    +------------------+
                    |    Next.js 16    |
                    |   (App Router)   |
                    +--------+---------+
                             |
              +--------------+--------------+
              |              |              |
     +--------v---+  +------v------+  +----v-------+
     | Better Auth |  |   Prisma 7  |  |   Convex   |
     | (Sessions)  |  |   (Neon)    |  | (Realtime) |
     +-------------+  +------+------+  +----+-------+
                             |              |
                    +--------v---------+    |
                    |   PostgreSQL     |    |
                    |   (Neon)         |    |
                    +------------------+    |
                                            |
     +-------------+  +-------------+  +----v-------+
     | Claude AI   |  | CinetPay    |  | Cloudflare |
     | (AI SDK)    |  | (Payments)  |  | R2 (Files) |
     +-------------+  +-------------+  +------------+
```

**Data flow:**

- **Prisma / Neon** -- All structured data: products, sales, clients, invoices, cash entries, AI generations.
- **Convex** -- Real-time features only: dashboard stats, notifications, stock alerts, presence, activity feed.
- **Sync** -- Prisma to Convex via internal webhook (`/api/webhooks/convex-sync`) after each sale or stock movement.
- **R2** -- File storage for invoice PDFs, product images, and data exports.
- **Better Auth** -- Authentication layer with Prisma adapter (not Convex).

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/              # Login, register (public routes)
│   ├── (onboarding)/        # 5-step merchant setup wizard
│   ├── (dashboard)/         # Authenticated pages
│   │   └── dashboard/       # Products, sales, clients, invoices, cash, AI, settings
│   └── api/
│       ├── auth/            # Better Auth catch-all route
│       ├── ai/              # AI generation endpoints
│       ├── upload/          # R2 presigned URL generation
│       └── webhooks/        # Convex sync, CinetPay callbacks
├── lib/                     # Core libraries (auth, prisma, r2, ai, sms, utils)
├── components/
│   ├── ui/                  # shadcn/ui primitives
│   ├── layout/              # Sidebar, topbar
│   ├── pos/                 # Point of sale components
│   └── onboarding/          # Wizard step components
├── actions/                 # Server Actions
├── hooks/                   # React hooks
└── types/                   # TypeScript type definitions
prisma/                      # Schema, migrations, seed
convex/                      # Real-time schema and functions
```

---

## Quick Start

### Prerequisites

- Node.js 20+
- pnpm 9+
- PostgreSQL database (or [Neon](https://neon.tech) account)
- Convex account

### Installation

```bash
# Clone the repository
git clone https://github.com/James10192/duka.git
cd duka

# Install dependencies
pnpm install
```

### Environment Variables

Create a `.env.local` file at the project root:

```env
# Database (Neon)
DATABASE_URL="postgresql://..."

# Better Auth
BETTER_AUTH_SECRET="your-secret"
BETTER_AUTH_URL="http://localhost:3000"

# Convex
NEXT_PUBLIC_CONVEX_URL="https://your-project.convex.cloud"
CONVEX_DEPLOY_KEY="..."

# Anthropic (AI)
ANTHROPIC_API_KEY="sk-ant-..."

# Cloudflare R2
R2_ACCOUNT_ID="..."
R2_ACCESS_KEY_ID="..."
R2_SECRET_ACCESS_KEY="..."
R2_BUCKET_NAME="duka"

# CinetPay
CINETPAY_API_KEY="..."
CINETPAY_SITE_ID="..."
```

### Database Setup

```bash
# Push schema to database
pnpm db:push

# Or run migrations
pnpm db:migrate

# Seed initial data (optional)
pnpm db:seed
```

### Development

```bash
# Start the dev server (Turbopack)
pnpm dev

# In a separate terminal, start Convex
pnpm convex:dev

# Open Prisma Studio (database GUI)
pnpm db:studio
```

The application will be available at `http://localhost:3000`.

---

## Commands Reference

| Command | Description |
|---|---|
| `pnpm dev` | Start development server with Turbopack |
| `pnpm build` | Production build (generates Prisma client first) |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm db:push` | Push Prisma schema to database |
| `pnpm db:migrate` | Run Prisma migrations |
| `pnpm db:studio` | Open Prisma Studio GUI |
| `pnpm db:seed` | Seed database with initial data |
| `pnpm convex:dev` | Start Convex development server |
| `pnpm convex:deploy` | Deploy Convex functions to production |

---

## Pricing Plans

| | Starter | Pro | Business | Enterprise |
|---|---|---|---|---|
| **Price** | Gratuit | 9 900 FCFA/mois | 24 900 FCFA/mois | Sur devis |
| **Stores** | 1 | 3 | 10 | Illimité |
| **Products** | 100 | Illimité | Illimité | Illimité |
| **Users** | 1 | 5 | 20 | Illimité |
| **AI Features** | -- | Basique | Complet | Complet + API |
| **Support** | Communauté | Email | Prioritaire | Dédié |

---

## Roadmap

- [x] Core product catalog and stock management
- [x] Point of sale interface
- [x] OHADA-compliant invoicing with PDF export
- [x] Better Auth with phone OTP
- [x] Multi-tenant organization support
- [ ] CinetPay Mobile Money integration
- [ ] AI business intelligence (Claude)
- [ ] Real-time dashboard via Convex
- [ ] Offline mode with background sync
- [ ] Mobile application (React Native)
- [ ] Supplier management and purchase orders
- [ ] Advanced analytics and reporting
- [ ] Multi-currency support (FCFA, GNF, XOF)
- [ ] API for third-party integrations

---

## Contributing

Contributions are welcome. Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Follow existing conventions: French UI labels, English code and comments
4. Use `pnpm` exclusively (not npm or yarn)
5. Ensure TypeScript strict mode compliance
6. Submit a pull request

### Code Conventions

- **UI theme:** Dark mode by default (`zinc-950` background, teal/emerald primary)
- **Fonts:** Geist Sans for UI, Geist Mono for data, metrics, and prices
- **Labels:** French for user-facing text, English for code and comments
- **Prices:** Always displayed with `FCFA` suffix
- **IDs:** `cuid()` for all primary keys
- **Tables:** `@@map("snake_case")` for all Prisma models

---

## License

This project is licensed under the [ISC License](./LICENSE).

---

<div align="center">

Built for Africa. Powered by modern web technologies.

**[duka](https://github.com/James10192/duka)**

</div>
