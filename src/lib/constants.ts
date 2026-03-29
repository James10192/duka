export const CURRENCIES = [
  { code: "XOF", name: "Franc CFA (UEMOA)", symbol: "FCFA" },
  { code: "XAF", name: "Franc CFA (CEMAC)", symbol: "FCFA" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "USD", name: "Dollar US", symbol: "$" },
] as const;

export const MOBILE_MONEY_OPERATORS = [
  { id: "mtn", name: "MTN MoMo", countries: ["CI", "CM", "SN"] },
  { id: "orange", name: "Orange Money", countries: ["CI", "SN", "CM"] },
  { id: "wave", name: "Wave", countries: ["CI", "SN"] },
  { id: "moov", name: "Moov Money", countries: ["CI"] },
] as const;

export const SECTORS = [
  "Boissons premium",
  "Cosmétiques",
  "Mode & Habillement",
  "Alimentation spécialisée",
  "Pièces auto",
  "Électronique",
  "Ameublement",
  "Pharmacie",
  "Quincaillerie",
  "Autre",
] as const;

export const CITIES_CI = [
  "Abidjan - Cocody",
  "Abidjan - Plateau",
  "Abidjan - Marcory",
  "Abidjan - Adjamé",
  "Abidjan - Yopougon",
  "Abidjan - Treichville",
  "Abidjan - Koumassi",
  "Bouaké",
  "Yamoussoukro",
  "San Pedro",
  "Daloa",
  "Korhogo",
  "Autre",
] as const;

export const PLAN_LIMITS = {
  STARTER: {
    maxProducts: 50,
    maxUsers: 1,
    maxStores: 1,
    maxSalesPerMonth: 100,
    maxAiGenerations: 0,
    maxStorageMb: 100,
    hasMobileMoney: false,
    hasBarcodeScan: false,
    hasExport: false,
    hasCrmAuto: false,
  },
  PRO: {
    maxProducts: Infinity,
    maxUsers: 3,
    maxStores: 1,
    maxSalesPerMonth: Infinity,
    maxAiGenerations: 20,
    maxStorageMb: 1024,
    hasMobileMoney: true,
    hasBarcodeScan: true,
    hasExport: true,
    hasCrmAuto: false,
  },
  BUSINESS: {
    maxProducts: Infinity,
    maxUsers: 10,
    maxStores: 5,
    maxSalesPerMonth: Infinity,
    maxAiGenerations: 100,
    maxStorageMb: 10240,
    hasMobileMoney: true,
    hasBarcodeScan: true,
    hasExport: true,
    hasCrmAuto: true,
  },
  ENTERPRISE: {
    maxProducts: Infinity,
    maxUsers: Infinity,
    maxStores: Infinity,
    maxSalesPerMonth: Infinity,
    maxAiGenerations: Infinity,
    maxStorageMb: Infinity,
    hasMobileMoney: true,
    hasBarcodeScan: true,
    hasExport: true,
    hasCrmAuto: true,
  },
} as const;

export const PAYMENT_METHODS = [
  { id: "CASH", label: "Espèces", icon: "Banknote" },
  { id: "MOBILE_MONEY", label: "Mobile Money", icon: "Smartphone" },
  { id: "CARD", label: "Carte bancaire", icon: "CreditCard" },
  { id: "MIXED", label: "Paiement mixte", icon: "Layers" },
] as const;

export const CLIENT_TYPES = [
  { id: "PARTICULIER", label: "Particulier" },
  { id: "ENTREPRISE", label: "Entreprise" },
  { id: "EVENEMENTIEL", label: "Événementiel" },
  { id: "REVENDEUR", label: "Revendeur" },
  { id: "VIP", label: "VIP" },
] as const;
