import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const listForOrg = query({
  args: { orgId: v.string() },
  handler: async (ctx, { orgId }) => {
    return ctx.db
      .query("stockAlerts")
      .withIndex("by_org", (q) => q.eq("orgId", orgId))
      .filter((q) => q.eq(q.field("resolvedAt"), undefined))
      .collect();
  },
});

export const upsert = mutation({
  args: {
    orgId: v.string(),
    storeId: v.string(),
    productId: v.string(),
    productName: v.string(),
    currentStock: v.number(),
    minStock: v.number(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("stockAlerts")
      .withIndex("by_store", (q) => q.eq("storeId", args.storeId))
      .filter((q) =>
        q.and(
          q.eq(q.field("productId"), args.productId),
          q.eq(q.field("resolvedAt"), undefined),
        ),
      )
      .first();

    if (args.currentStock >= args.minStock) {
      if (existing) {
        await ctx.db.patch(existing._id, { resolvedAt: Date.now() });
      }
      return;
    }

    if (existing) {
      await ctx.db.patch(existing._id, { currentStock: args.currentStock });
    } else {
      await ctx.db.insert("stockAlerts", args);
    }
  },
});
