import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  dashboardStats: defineTable({
    orgId: v.string(),
    storeId: v.string(),
    todayRevenue: v.number(),
    todaySales: v.number(),
    monthRevenue: v.number(),
    monthSales: v.number(),
    avgBasket: v.number(),
    grossMargin: v.number(),
    updatedAt: v.number(),
  })
    .index("by_org_store", ["orgId", "storeId"])
    .index("by_org", ["orgId"]),

  notifications: defineTable({
    orgId: v.string(),
    userId: v.string(),
    type: v.union(
      v.literal("stock_alert"),
      v.literal("sale"),
      v.literal("payment"),
      v.literal("system"),
    ),
    title: v.string(),
    message: v.string(),
    read: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_unread", ["userId", "read"]),

  stockAlerts: defineTable({
    orgId: v.string(),
    storeId: v.string(),
    productId: v.string(),
    productName: v.string(),
    currentStock: v.number(),
    minStock: v.number(),
    resolvedAt: v.optional(v.number()),
  })
    .index("by_org", ["orgId"])
    .index("by_store", ["storeId"]),

  presence: defineTable({
    userId: v.string(),
    orgId: v.string(),
    storeId: v.optional(v.string()),
    lastSeen: v.number(),
  }).index("by_org", ["orgId"]),

  activityFeed: defineTable({
    orgId: v.string(),
    userId: v.string(),
    userName: v.string(),
    action: v.union(
      v.literal("sale_created"),
      v.literal("product_added"),
      v.literal("client_added"),
      v.literal("stock_adjusted"),
      v.literal("invoice_sent"),
      v.literal("cash_entry"),
    ),
    description: v.string(),
    metadata: v.optional(v.any()),
    createdAt: v.number(),
  }).index("by_org", ["orgId"]),
});
