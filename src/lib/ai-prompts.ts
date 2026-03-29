export const AI_SYSTEM_PROMPT = `Tu es un directeur commercial expert spécialisé dans le commerce en Afrique de l'Ouest francophone. Tu connais parfaitement les réalités du marché ivoirien : Mobile Money, fêtes religieuses et culturelles (Tabaski, Noël, Saint-Valentin), zones commerciales d'Abidjan, habitudes d'achat locales, et le cadre comptable OHADA.

Tu produis des livrables concrets, professionnels et directement actionnables. Pas de généralités, pas de lieux communs — des recommandations spécifiques adaptées au contexte du commerçant.

Toutes tes réponses sont en français. Les montants sont en FCFA.`;

export function buildActionPlanPrompt(context: {
  sector: string;
  city: string;
  products: { name: string; sellPrice: number; stock: number }[];
  monthlyRevenue?: number;
}) {
  return `Génère un plan d'action commercial sur 30 jours pour ce commerce :

SECTEUR : ${context.sector}
LOCALISATION : ${context.city}
PRODUITS PRINCIPAUX :
${context.products.map((p) => `- ${p.name} : ${p.sellPrice} FCFA (stock: ${p.stock})`).join("\n")}
${context.monthlyRevenue ? `CA MENSUEL ACTUEL : ${context.monthlyRevenue} FCFA` : ""}

Structure ta réponse en JSON avec ce format :
{
  "title": "Titre du plan",
  "summary": "Résumé en 2-3 phrases",
  "weeks": [
    {
      "week": 1,
      "theme": "Thème de la semaine",
      "actions": [
        {
          "action": "Description de l'action",
          "channel": "WhatsApp|Terrain|Boutique|Réseaux sociaux",
          "priority": "haute|moyenne|basse",
          "kpi": "Indicateur de succès"
        }
      ]
    }
  ],
  "kpis": [
    { "name": "Nom du KPI", "target": "Objectif", "measurement": "Comment mesurer" }
  ]
}`;
}

export function buildEncaissementPrompt(context: {
  sector: string;
  avgSaleAmount: number;
  paymentMethods: string[];
}) {
  return `Génère un programme d'encaissement complet pour ce commerce :

SECTEUR : ${context.sector}
PANIER MOYEN : ${context.avgSaleAmount} FCFA
MODES DE PAIEMENT UTILISÉS : ${context.paymentMethods.join(", ")}

Structure ta réponse en JSON avec ce format :
{
  "title": "Programme d'encaissement",
  "paymentMatrix": [
    {
      "method": "Mode de paiement",
      "recommendedUsage": "Quand l'utiliser",
      "maxAmount": "Montant maximum recommandé",
      "verificationDelay": "Délai de vérification"
    }
  ],
  "procedures": [
    {
      "step": 1,
      "title": "Titre de l'étape",
      "description": "Description détaillée",
      "documents": ["Documents à générer"]
    }
  ],
  "antiRiskRules": [
    {
      "rule": "Règle",
      "threshold": "Seuil",
      "action": "Action à prendre"
    }
  ],
  "cashJournalTemplate": {
    "columns": ["Colonne 1", "Colonne 2"],
    "closingProcedure": "Procédure d'arrêté de caisse"
  }
}`;
}

export function buildPricingPrompt(context: {
  products: { name: string; buyPrice: number; sellPrice: number; category: string }[];
  targetMargin: number;
}) {
  return `Analyse et recommande une stratégie de pricing pour ces produits :

PRODUITS :
${context.products.map((p) => `- ${p.name} (${p.category}) : achat ${p.buyPrice} FCFA, vente ${p.sellPrice} FCFA`).join("\n")}
MARGE CIBLE : ${context.targetMargin}%

Structure ta réponse en JSON avec ce format :
{
  "title": "Stratégie de pricing",
  "recommendations": [
    {
      "product": "Nom du produit",
      "currentPrice": 0,
      "recommendedPrice": 0,
      "reasoning": "Justification",
      "psychologicalPrice": true
    }
  ],
  "bundles": [
    {
      "name": "Nom du bundle",
      "products": ["Produit 1", "Produit 2"],
      "bundlePrice": 0,
      "savings": "Économie pour le client"
    }
  ],
  "seasonalAdjustments": [
    {
      "period": "Période",
      "adjustment": "Ajustement recommandé",
      "reasoning": "Justification"
    }
  ]
}`;
}

export function buildAnalysisPrompt(context: {
  monthlyRevenue: number;
  topProducts: { name: string; revenue: number; quantity: number }[];
  clientCount: number;
  avgBasket: number;
}) {
  return `Analyse les performances commerciales de ce mois :

CA MENSUEL : ${context.monthlyRevenue} FCFA
PANIER MOYEN : ${context.avgBasket} FCFA
NOMBRE DE CLIENTS : ${context.clientCount}

TOP PRODUITS :
${context.topProducts.map((p) => `- ${p.name} : ${p.revenue} FCFA (${p.quantity} ventes)`).join("\n")}

Structure ta réponse en JSON avec ce format :
{
  "title": "Analyse de performance",
  "summary": "Résumé exécutif en 3 phrases",
  "trends": [
    { "indicator": "Indicateur", "trend": "hausse|baisse|stable", "analysis": "Analyse" }
  ],
  "opportunities": [
    { "opportunity": "Opportunité identifiée", "action": "Action recommandée", "impact": "Impact estimé" }
  ],
  "risks": [
    { "risk": "Risque identifié", "mitigation": "Action de mitigation" }
  ],
  "nextMonthForecast": {
    "estimatedRevenue": 0,
    "keyActions": ["Action 1", "Action 2"]
  }
}`;
}

export function buildRelancePrompt(context: {
  clientName: string;
  lastPurchaseDate: string;
  favoriteProducts: string[];
  totalSpent: number;
  tone: "formel" | "amical" | "vip";
}) {
  return `Génère 3 variantes de messages WhatsApp de relance pour ce client :

CLIENT : ${context.clientName}
DERNIER ACHAT : ${context.lastPurchaseDate}
PRODUITS FAVORIS : ${context.favoriteProducts.join(", ")}
TOTAL DÉPENSÉ : ${context.totalSpent} FCFA
TON SOUHAITÉ : ${context.tone}

Structure ta réponse en JSON :
{
  "messages": [
    {
      "variant": "A",
      "message": "Texte du message WhatsApp",
      "tone": "Description du ton",
      "bestTime": "Meilleur moment pour envoyer"
    }
  ]
}`;
}
