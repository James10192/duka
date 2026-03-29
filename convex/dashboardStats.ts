import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getByOrg = query({
  args: { orgId: v.string() },
  handler: async (ctx, { orgId }) => {
    return ctx.db
      .query("dashboardStats")
      .withIndex("by_org", (q) => q.eq("orgId", orgId))
      .collect();
  },
});

export const getByOrgStore = query({
  args: { orgId: v.string(), storeId: v.string() },
  handler: async (ctx, { orgId, storeId }) => {
    return ctx.db
      .query("dashboardStats")
      .withIndex("by_org_store", (q) =>
        q.eq("orgId", orgId).eq("storeId", storeId),
      )
      .first();
  },
});

export const upsert = mutation({
  args: {
    orgId: v.string(),
    storeId: v.string(),
    todayRevenue: v.number(),
    todaySales: v.number(),
    monthRevenue: v.number(),
    monthSales: v.number(),
    avgBasket: v.number(),
    grossMargin: v.number(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("dashboardStats")
      .withIndex("by_org_store", (q) =>
        q.eq("orgId", args.orgId).eq("storeId", args.storeId),
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, { ...args, updatedAt: Date.now() });
    } else {
      await ctx.db.insert("dashboardStats", {
        ...args,
        updatedAt: Date.now(),
      });
    }
  },
});
