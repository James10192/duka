import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function POST(request: NextRequest) {
  try {
    const { type, data } = await request.json();

    const mutation = (name: string, args: Record<string, any>) =>
      convex.mutation(name as any, args as any);

    switch (type) {
      case "sale_created":
        await mutation("dashboardStats:upsert", {
          orgId: data.orgId,
          storeId: data.storeId,
          todayRevenue: data.todayRevenue,
          todaySales: data.todaySales,
          monthRevenue: data.monthRevenue,
          monthSales: data.monthSales,
          avgBasket: data.avgBasket,
          grossMargin: data.grossMargin,
        });
        break;

      case "stock_alert":
        await mutation("stockAlerts:upsert", {
          orgId: data.orgId,
          storeId: data.storeId,
          productId: data.productId,
          productName: data.productName,
          currentStock: data.currentStock,
          minStock: data.minStock,
        });
        break;

      case "activity":
        await mutation("activityFeed:create", {
          orgId: data.orgId,
          userId: data.userId,
          userName: data.userName,
          action: data.action,
          description: data.description,
        });
        break;
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Convex sync failed:", error);
    return NextResponse.json(
      { error: "Sync failed" },
      { status: 500 },
    );
  }
}
