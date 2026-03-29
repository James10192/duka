import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(request: NextRequest) {
  try {
    const { type, data } = await request.json();

    switch (type) {
      case "sale_created":
        await convex.mutation(api.dashboardStats.upsert, {
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
        await convex.mutation(api.stockAlerts.upsert, {
          orgId: data.orgId,
          storeId: data.storeId,
          productId: data.productId,
          productName: data.productName,
          currentStock: data.currentStock,
          minStock: data.minStock,
        });
        break;

      case "activity":
        await convex.mutation(api.activityFeed.create, {
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
