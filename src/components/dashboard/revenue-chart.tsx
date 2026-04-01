"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { formatCFA } from "@/lib/utils";

const TEAL = "#14b8a6";
const TEAL_LIGHT = "#2dd4bf";
const GRID = "#27272a";
const AXIS = "#71717a";

// --- Revenue Area Chart ---

const revenueConfig = {
  revenue: {
    label: "Chiffre d'affaires",
    color: TEAL,
  },
} satisfies ChartConfig;

export function RevenueChart({
  data,
}: {
  data: { date: string; revenue: number }[];
}) {
  if (data.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center text-muted-foreground">
        Aucune vente pour le moment
      </div>
    );
  }

  return (
    <ChartContainer config={revenueConfig} className="h-64 w-full">
      <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={TEAL} stopOpacity={0.4} />
            <stop offset="100%" stopColor={TEAL} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid
          vertical={false}
          strokeDasharray="3 3"
          stroke={GRID}
        />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          fontSize={12}
          tick={{ fill: AXIS }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={4}
          fontSize={11}
          tick={{ fill: AXIS }}
          tickFormatter={(v: number) =>
            v >= 1000 ? `${Math.round(v / 1000)}k` : String(v)
          }
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value) => formatCFA(value as number)}
            />
          }
        />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke={TEAL_LIGHT}
          strokeWidth={2.5}
          fill="url(#fillRevenue)"
        />
      </AreaChart>
    </ChartContainer>
  );
}

// --- Top Products Horizontal Bar Chart ---

const productsConfig = {
  revenue: {
    label: "CA",
    color: TEAL,
  },
} satisfies ChartConfig;

export function TopProductsChart({
  data,
}: {
  data: { name: string; revenue: number; quantity: number }[];
}) {
  if (data.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center text-muted-foreground">
        Aucun produit vendu
      </div>
    );
  }

  return (
    <ChartContainer config={productsConfig} className="h-64 w-full">
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 4, right: 8, bottom: 0, left: 0 }}
      >
        <CartesianGrid
          horizontal={false}
          strokeDasharray="3 3"
          stroke={GRID}
        />
        <XAxis
          type="number"
          tickLine={false}
          axisLine={false}
          fontSize={11}
          tick={{ fill: AXIS }}
          tickFormatter={(v: number) =>
            v >= 1000 ? `${Math.round(v / 1000)}k` : String(v)
          }
        />
        <YAxis
          type="category"
          dataKey="name"
          tickLine={false}
          axisLine={false}
          fontSize={11}
          width={110}
          tick={{ fill: AXIS }}
          tickFormatter={(v: string) =>
            v.length > 16 ? v.slice(0, 14) + "..." : v
          }
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value, _name, item) => (
                <span>
                  {formatCFA(value as number)} ({item?.payload?.quantity} vendus)
                </span>
              )}
            />
          }
        />
        <Bar
          dataKey="revenue"
          fill={TEAL}
          radius={[0, 6, 6, 0]}
        />
      </BarChart>
    </ChartContainer>
  );
}
