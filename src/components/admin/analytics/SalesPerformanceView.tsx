import { useState } from "react";
import {
  DollarSign,
  CheckCircle2,
  Clock,
  XCircle,
  RotateCcw,
  ArrowUpRight,
  TrendingUp,
  Percent,
  Layers,
  ArrowDownRight,
  Filter,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { SALES_BREAKDOWN_DATA } from "./analytics-mock-data";

export function SalesPerformanceView() {
  const [selectedStatus, setSelectedStatus] = useState<"all" | "paid" | "pending" | "refunded">(
    "all",
  );
  const data = SALES_BREAKDOWN_DATA;

  return (
    <div className="space-y-8 animate-fade-in-soft">
      {/* 1. SALES SUMMARY STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Paid Orders */}
        <div className="p-5 bg-surface border border-border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-muted-foreground">
              Paid & Settled
            </span>
            <div className="p-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="size-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-display font-semibold text-foreground">
              €{data.paidOrders.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mt-1">
              <span>{data.paidOrders.count} orders</span>
              <span className="text-emerald-400 font-semibold">
                {data.paidOrders.percentage}% of total
              </span>
            </div>
          </div>
          <div className="h-1.5 w-full bg-surface-2 overflow-hidden">
            <div
              className="h-full bg-emerald-400"
              style={{ width: `${data.paidOrders.percentage}%` }}
            />
          </div>
        </div>

        {/* Pending Orders */}
        <div className="p-5 bg-surface border border-border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-muted-foreground">
              Pending Processing
            </span>
            <div className="p-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Clock className="size-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-display font-semibold text-foreground">
              €{data.pendingOrders.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mt-1">
              <span>{data.pendingOrders.count} orders</span>
              <span className="text-amber-400 font-semibold">{data.pendingOrders.percentage}%</span>
            </div>
          </div>
          <div className="h-1.5 w-full bg-surface-2 overflow-hidden">
            <div
              className="h-full bg-amber-400"
              style={{ width: `${data.pendingOrders.percentage}%` }}
            />
          </div>
        </div>

        {/* Refunded Orders */}
        <div className="p-5 bg-surface border border-border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-muted-foreground">Refunded</span>
            <div className="p-1.5 bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <RotateCcw className="size-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-display font-semibold text-foreground">
              €{data.refundedOrders.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mt-1">
              <span>{data.refundedOrders.count} orders</span>
              <span className="text-rose-400 font-semibold">
                {data.refundedOrders.percentage}% rate
              </span>
            </div>
          </div>
          <div className="h-1.5 w-full bg-surface-2 overflow-hidden">
            <div
              className="h-full bg-rose-400"
              style={{ width: `${data.refundedOrders.percentage}%` }}
            />
          </div>
        </div>

        {/* Cancelled Orders */}
        <div className="p-5 bg-surface border border-border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-muted-foreground">
              Cancelled Pre-Print
            </span>
            <div className="p-1.5 bg-zinc-500/10 text-zinc-400 border border-zinc-500/20">
              <XCircle className="size-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-display font-semibold text-foreground">
              €{data.cancelledOrders.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mt-1">
              <span>{data.cancelledOrders.count} orders</span>
              <span className="text-zinc-400 font-semibold">
                {data.cancelledOrders.percentage}%
              </span>
            </div>
          </div>
          <div className="h-1.5 w-full bg-surface-2 overflow-hidden">
            <div
              className="h-full bg-zinc-500"
              style={{ width: `${data.cancelledOrders.percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. SALES TREND VISUALIZATION */}
      <div className="p-6 bg-surface border border-border space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="size-4 text-gold" />
              <h3 className="text-sm font-display font-medium text-foreground uppercase tracking-wider">
                Weekly Order Status Progression
              </h3>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Volume breakdown across payment settlement, fulfillment queue, and return
              reconciliations.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 bg-gold" />
              <span className="text-muted-foreground">Paid</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 bg-amber-400" />
              <span className="text-muted-foreground">Pending</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 bg-rose-400" />
              <span className="text-muted-foreground">Refunded</span>
            </div>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data.orderStatusTrends}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 6%)" vertical={false} />
              <XAxis
                dataKey="period"
                stroke="oklch(0.68 0.005 90 / 50%)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="oklch(0.68 0.005 90 / 50%)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="p-3 bg-surface border border-gold/40 text-xs font-mono space-y-1">
                        <p className="text-gold font-bold">{label}</p>
                        {payload.map((p, i) => (
                          <div key={i} className="flex justify-between gap-4">
                            <span className="text-muted-foreground capitalize">{p.dataKey}:</span>
                            <span className="text-foreground font-semibold">{p.value} orders</span>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="paid" fill="oklch(0.79 0.1 85)" stackId="a" />
              <Bar dataKey="pending" fill="oklch(0.8 0.14 85)" stackId="a" />
              <Bar dataKey="refunded" fill="oklch(0.65 0.2 25)" stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
