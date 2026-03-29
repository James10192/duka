import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const listForOrg = query({
  args: { orgId: v.string(), limit: v.optional(v.number()) },
  handler: async (ctx, { orgId, limit }) => {
    return ctx.db
      .query("activityFeed")
      .withIndex("by_org", (q) => q.eq("orgId", orgId))
      .order("desc")
      .take(limit ?? 30);
  },
});

export const create = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("activityFeed", {
      ...args,
      createdAt: Date.now(),
    });
  },
});
