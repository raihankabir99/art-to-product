import { useState } from "react";
import {
  Users,
  UserCheck,
  UserPlus,
  RefreshCcw,
  Sparkles,
  ArrowRight,
  TrendingUp,
  CreditCard,
  Eye,
  ShoppingCart,
  CheckCircle2,
  Package,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { CUSTOMER_METRICS_DATA, CONVERSION_FUNNEL_STAGES } from "./analytics-mock-data";

export function CustomerInsightsView() {
  const cust = CUSTOMER_METRICS_DATA;
  const funnel = CONVERSION_FUNNEL_STAGES;

  return (
    <div className="space-y-8 animate-fade-in-soft">
      {/* 1. CUSTOMER KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="p-5 bg-surface border border-border">
          <span className="text-xs font-mono uppercase text-muted-foreground">Total Customers</span>
          <div className="text-2xl font-display font-semibold text-foreground mt-2">
            {cust.totalCustomers}
          </div>
          <span className="text-xs font-mono text-emerald-400">+9.5% MoM</span>
        </div>

        <div className="p-5 bg-surface border border-border">
          <span className="text-xs font-mono uppercase text-muted-foreground">New Customers</span>
          <div className="text-2xl font-display font-semibold text-foreground mt-2">
            {cust.newCustomers}
          </div>
          <span className="text-xs font-mono text-muted-foreground">73.1% Acquisition</span>
        </div>

        <div className="p-5 bg-surface border border-border">
          <span className="text-xs font-mono uppercase text-muted-foreground">
            Returning Customers
          </span>
          <div className="text-2xl font-display font-semibold text-gold mt-2">
            {cust.returningCustomers}
          </div>
          <span className="text-xs font-mono text-emerald-400">+14.2% MoM</span>
        </div>

        <div className="p-5 bg-surface border border-border">
          <span className="text-xs font-mono uppercase text-muted-foreground">
            Repeat Purchase Rate
          </span>
          <div className="text-2xl font-display font-semibold text-emerald-400 mt-2">
            {cust.repeatPurchaseRate}%
          </div>
          <span className="text-xs font-mono text-muted-foreground">High Brand Loyalty</span>
        </div>

        <div className="p-5 bg-surface border border-border">
          <span className="text-xs font-mono uppercase text-muted-foreground">Customer LTV</span>
          <div className="text-2xl font-display font-semibold text-foreground mt-2">
            €{cust.customerLTV.toFixed(2)}
          </div>
          <span className="text-xs font-mono text-gold">+€14.50 vs baseline</span>
        </div>

        <div className="p-5 bg-surface border border-border">
          <span className="text-xs font-mono uppercase text-muted-foreground">
            Avg Customer Spend
          </span>
          <div className="text-2xl font-display font-semibold text-foreground mt-2">
            €{cust.avgCustomerSpend.toFixed(2)}
          </div>
          <span className="text-xs font-mono text-muted-foreground">Per order basket</span>
        </div>
      </div>

      {/* 2. NEW VS RETURNING VISUALIZATION */}
      <div className="p-6 bg-surface border border-border space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <Users className="size-4 text-gold" />
              <h3 className="text-sm font-display font-medium text-foreground uppercase tracking-wider">
                New vs Returning Customer Trajectory
              </h3>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Weekly cohort acquisition and repeat buyer retention trends.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 bg-gold" />
              <span className="text-muted-foreground">New Customers</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 bg-foreground" />
              <span className="text-muted-foreground">Returning Customers</span>
            </div>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={cust.newVsReturningTimeline}
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
                        <p className="text-foreground">New: {payload[0]?.value} customers</p>
                        <p className="text-muted-foreground">
                          Returning: {payload[1]?.value} customers
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="newCustomers" fill="oklch(0.79 0.1 85)" />
              <Bar dataKey="returningCustomers" fill="oklch(0.92 0.005 90)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. CONVERSION FUNNEL (CUSTOMER JOURNEY) */}
      <div className="p-6 bg-surface border border-border space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="size-4 text-gold" />
              <h3 className="text-sm font-display font-medium text-foreground uppercase tracking-wider">
                Full-Fulfillment Conversion Funnel
              </h3>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              End-to-end journey from initial storefront session to door delivery.
            </p>
          </div>
          <span className="text-xs font-mono text-gold">Overall Conversion: 3.42%</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
          {funnel.map((stage, idx) => (
            <div
              key={stage.id}
              className="p-4 bg-surface-2 border border-border hover:border-gold/40 transition-all flex flex-col justify-between relative"
            >
              <div>
                <span className="text-[10px] font-mono text-muted-foreground uppercase block mb-1">
                  Stage 0{idx + 1}
                </span>
                <h4 className="text-xs font-semibold text-foreground truncate">{stage.name}</h4>
                <div className="text-lg font-display font-bold text-foreground mt-2">
                  {stage.count.toLocaleString()}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-border space-y-1.5 text-[11px] font-mono">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Progression:</span>
                  <span className="text-emerald-400 font-semibold">
                    {stage.conversionFromPrev}%
                  </span>
                </div>
                {idx > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Drop-off:</span>
                    <span className="text-rose-400">{stage.dropoffRate}%</span>
                  </div>
                )}
                <div className="h-1 w-full bg-surface overflow-hidden mt-1">
                  <div
                    className="h-full bg-gold"
                    style={{ width: `${stage.conversionFromTotal}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
