# DUKA — Gestion commerciale intelligente pour l'Afrique

## Project Overview
SaaS de gestion commerciale pour commerces physiques en Afrique francophone (lancement Côte d'Ivoire). Stock, ventes POS, factures OHADA, CRM, journal de caisse, IA générative, Mobile Money.

## Tech Stack
- **Framework**: Next.js 16 (App Router, Turbopack, proxy.ts)
- **Auth**: Better Auth v1.5+ with Prisma adapter + Phone OTP plugin + Organization plugin
- **Database**: PostgreSQL via Prisma 7 ORM (all structured data)
- **Real-time**: Convex (live dashboard, notifications, stock alerts, activity feed)
- **Storage**: Cloudflare R2 via @aws-sdk/client-s3 (invoices PDF, product photos)
- **AI**: Anthropic Claude via AI SDK + AI Gateway
- **PDF**: @react-pdf/renderer (OHADA-compliant invoices)
- **UI**: Tailwind CSS v4 + shadcn/ui + Geist fonts + Lucide icons
- **Language**: TypeScript strict mode

## Architecture
- **Prisma/Neon** = all structured data (products, sales, clients, invoices, cash entries, AI generations)
- **Convex** = real-time features only (dashboard stats, notifications, stock alerts, presence, activity feed)
- **Better Auth** = auth layer with Prisma adapter (NOT Convex)
- **R2** = file storage (invoice PDFs, product images, exports)
- **Sync** = Prisma → Convex via internal webhook after each sale/stock movement

## Key Conventions
- Use `pnpm` (not npm/yarn)
- Dark mode by default (zinc-950 bg, teal/emerald primary)
- Geist Sans for UI, Geist Mono for data/metrics/prices
- French UI labels, English code/comments
- Prices always displayed with FCFA suffix
- No Co-Authored-By lines in commits

## File Structure
```
src/
├── app/
│   ├── (auth)/          # Login, register (public)
│   ├── (onboarding)/    # 5-step wizard
│   ├── (dashboard)/     # All authenticated pages
│   │   └── dashboard/   # Products, sales, clients, invoices, cash, AI, settings
│   └── api/
│       ├── auth/        # Better Auth catch-all
│       ├── ai/          # AI generation endpoints
│       ├── upload/      # R2 presigned URLs
│       └── webhooks/    # Convex sync, CinetPay
├── lib/                 # auth, prisma, r2, ai, sms, utils, constants
├── components/          # UI components (shadcn + custom)
│   ├── ui/              # shadcn/ui primitives
│   ├── layout/          # Sidebar, topbar
│   ├── pos/             # POS components
│   └── onboarding/      # Wizard steps
├── actions/             # Server Actions
├── hooks/               # React hooks
└── types/               # TypeScript types
prisma/                  # Schema + migrations
convex/                  # Real-time schema + functions
```

## Commands
```bash
pnpm dev              # Start dev server (Turbopack)
pnpm build            # Production build
npx prisma studio     # Database GUI
npx prisma migrate dev # Run migrations
npx convex dev        # Start Convex dev server
```

## Prisma 7 Conventions
- All table names use `@@map("snake_case")`
- Use `cuid()` for IDs
- Always add `@@index` for frequently queried fields
- Use `onDelete: Cascade` for child relations
- Singleton PrismaClient via `globalForPrisma` pattern
- Driver adapter: `@prisma/adapter-pg` (MANDATORY)
- Generator output: `../src/generated/prisma`
- Config in `prisma.config.ts` (loads .env.local)

## Convex Rules
- Convex is for REAL-TIME features ONLY (not relational data)
- Tables: dashboardStats, notifications, stockAlerts, presence, activityFeed
- Use `useQuery` for reactive data, `useMutation` for writes
- Sync from Prisma → Convex via `/api/webhooks/convex-sync`

## Auth Patterns
- Better Auth with Prisma adapter
- Auth route: `/api/auth/[...all]/route.ts`
- Proxy: `src/proxy.ts` checks session cookie
- Session cookie name: `better-auth.session_token`
- Phone OTP via Twilio SMS (dev: logs to console)
- Organizations plugin for multi-tenant

## Business Rules
- OHADA compliant: sequential invoice numbering, append-only cash journal
- InvoiceCounter: atomic sequence via Prisma transaction
- CashEntry: immutable (no updatedAt, no delete, only reverse entries)
- Multi-tenant: Organization → Store → Products/Sales/Clients
- RBAC: Owner, Manager, Cashier with storeAccess[]
