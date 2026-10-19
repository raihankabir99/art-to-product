import { useState } from "react";
import {
  Cpu,
  Truck,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle,
  Package,
  Layers,
  ArrowRight,
} from "lucide-react";
import {
  POD_FULFILLMENT_DATA,
  SHIPPING_CARRIERS_LIST,
  RETURN_REASONS_DATA,
  PRODUCT_HEALTH_METRICS,
  AI_IMPACT_TELEMETRY,
} from "./analytics-mock-data";

export function PODFulfillmentAnalyticsView() {
  const [subTab, setSubTab] = useState<"fulfillment" | "shipping" | "returns" | "health" | "ai">(
    "fulfillment",
  );

  const pod = POD_FULFILLMENT_DATA;
  const carriers = SHIPPING_CARRIERS_LIST;
  const returns = RETURN_REASONS_DATA;
  const health = PRODUCT_HEALTH_METRICS;
  const ai = AI_IMPACT_TELEMETRY;

  return (
    <div className="space-y-8 animate-fade-in-soft">
      {/* 1. TOP OPERATIONS STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-surface border border-border">
          <span className="text-xs font-mono uppercase text-muted-foreground">
            POD Production SLA
          </span>
          <div className="text-2xl font-display font-semibold text-emerald-400 mt-2">
            99.2% On-Target
          </div>
          <div className="text-xs font-mono text-muted-foreground mt-1">
            Avg {pod.avgProductionHours} hrs print & cure time
          </div>
        </div>

        <div className="p-5 bg-surface border border-border">
          <span className="text-xs font-mono uppercase text-muted-foreground">
            Door-to-Door Delivery
          </span>
          <div className="text-2xl font-display font-semibold text-foreground mt-2">
            {pod.avgShippingDays} Business Days
          </div>
          <div className="text-xs font-mono text-emerald-400 mt-1">98.8% on-time delivery rate</div>
        </div>

        <div className="p-5 bg-surface border border-border">
          <span className="text-xs font-mono uppercase text-muted-foreground">
            Sitewide Return Rate
          </span>
          <div className="text-2xl font-display font-semibold text-foreground mt-2">
            1.35% (10 orders)
          </div>
          <div className="text-xs font-mono text-muted-foreground mt-1">
            50% due to buyer sizing choice
          </div>
        </div>

        <div className="p-5 bg-surface border border-border">
          <span className="text-xs font-mono uppercase text-muted-foreground">
            Catalog Blank Health
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-display font-semibold text-emerald-400">
              {health.overallHealth}
            </span>
          </div>
          <div className="text-xs font-mono text-muted-foreground mt-1">
            48 of 48 product lines active
          </div>
        </div>
      </div>

      {/* 2. SUB NAVIGATION TABS */}
      <div className="flex items-center gap-2 border-b border-border pb-4 overflow-x-auto">
        <button
          onClick={() => setSubTab("fulfillment")}
          className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap ${
            subTab === "fulfillment"
              ? "bg-gold text-black font-semibold"
              : "bg-surface-2 text-muted-foreground hover:text-foreground border border-border"
          }`}
        >
          POD Fulfillment Pipeline
        </button>
        <button
          onClick={() => setSubTab("shipping")}
          className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap ${
            subTab === "shipping"
              ? "bg-gold text-black font-semibold"
              : "bg-surface-2 text-muted-foreground hover:text-foreground border border-border"
          }`}
        >
          Carriers & Transit Logistics
        </button>
        <button
          onClick={() => setSubTab("returns")}
          className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap ${
            subTab === "returns"
              ? "bg-gold text-black font-semibold"
              : "bg-surface-2 text-muted-foreground hover:text-foreground border border-border"
          }`}
        >
          Returns & Quality Reasons
        </button>
        <button
          onClick={() => setSubTab("health")}
          className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap ${
            subTab === "health"
              ? "bg-gold text-black font-semibold"
              : "bg-surface-2 text-muted-foreground hover:text-foreground border border-border"
          }`}
        >
          Blank Availability & Sync
        </button>
        <button
          onClick={() => setSubTab("ai")}
          className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap ${
            subTab === "ai"
              ? "bg-gold text-black font-semibold"
              : "bg-surface-2 text-muted-foreground hover:text-foreground border border-border"
          }`}
        >
          AI Automation Impact
        </button>
      </div>

      {/* 3. POD FULFILLMENT PIPELINE */}
      {subTab === "fulfillment" && (
        <div className="space-y-6">
          <div className="p-6 bg-surface border border-border space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div>
                <div className="flex items-center gap-2">
                  <Cpu className="size-4 text-gold" />
                  <h3 className="text-sm font-display font-medium text-foreground uppercase tracking-wider">
                    POD Production Flow Stages
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Automated routing from web order capture to distributed print node queue.
                </p>
              </div>
              <span className="text-xs font-mono text-emerald-400">98.1% Pipeline Completion</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
              {pod.funnel.map((f, i) => (
                <div key={i} className="p-4 bg-surface-2 border border-border space-y-2">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase">
                    {f.stage}
                  </span>
                  <div className="text-xl font-display font-semibold text-foreground">
                    {f.count}
                  </div>
                  <div className="text-xs font-mono text-emerald-400">{f.percentage}% success</div>
                  <div className="h-1 w-full bg-surface overflow-hidden">
                    <div className="h-full bg-gold" style={{ width: `${f.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. CARRIERS & LOGISTICS */}
      {subTab === "shipping" && (
        <div className="space-y-6">
          <div className="bg-surface border border-border overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-surface-2 border-b border-border text-muted-foreground uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Courier Partner</th>
                  <th className="py-3 px-4">Origin Hub / Region</th>
                  <th className="py-3 px-4">Service Tier</th>
                  <th className="py-3 px-4 text-right">Shipment Volume</th>
                  <th className="py-3 px-4 text-right">Avg Transit Time</th>
                  <th className="py-3 px-4 text-right">On-Time SLA</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {carriers.map((car, i) => (
                  <tr key={i} className="hover:bg-surface-2/60 transition-colors">
                    <td className="py-3 px-4 font-semibold text-foreground flex items-center gap-2">
                      <Truck className="size-4 text-gold flex-shrink-0" />
                      <span>{car.carrier}</span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{car.country}</td>
                    <td className="py-3 px-4 text-muted-foreground">{car.method}</td>
                    <td className="py-3 px-4 text-right text-foreground font-semibold">
                      {car.volume} parcels
                    </td>
                    <td className="py-3 px-4 text-right text-foreground">{car.avgDays} days</td>
                    <td className="py-3 px-4 text-right text-emerald-400 font-bold">
                      {car.onTimeRate}%
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="px-2 py-0.5 text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {car.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. RETURNS & REFUNDS */}
      {subTab === "returns" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-surface border border-border overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-surface-2 border-b border-border text-muted-foreground uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Logged Return Reason</th>
                  <th className="py-3 px-4 text-right">Count</th>
                  <th className="py-3 px-4 text-right">Share</th>
                  <th className="py-3 px-4 text-right">Refunded Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {returns.map((ret, idx) => (
                  <tr key={idx} className="hover:bg-surface-2/60 transition-colors">
                    <td className="py-3 px-4 text-foreground font-medium">{ret.reason}</td>
                    <td className="py-3 px-4 text-right text-muted-foreground">{ret.count}</td>
                    <td className="py-3 px-4 text-right text-rose-400 font-semibold">
                      {ret.percentage}%
                    </td>
                    <td className="py-3 px-4 text-right text-foreground font-semibold">
                      €{ret.value.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="lg:col-span-4 p-6 bg-surface border border-border space-y-4">
            <h3 className="text-sm font-display font-medium text-foreground uppercase tracking-wider">
              Quality Assurance Score
            </h3>
            <div className="text-3xl font-display font-bold text-emerald-400">99.86%</div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Only 2 garments in 1,180 suffered manufacturing or transport damage. Buyer sizing
              discrepancy represents majority of return requests.
            </p>
            <div className="pt-4 border-t border-border">
              <span className="text-xs font-mono text-gold">
                AI Sizing Assistant active on product pages
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 6. PRODUCT HEALTH & AVAILABILITY */}
      {subTab === "health" && (
        <div className="p-6 bg-surface border border-border space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-emerald-400" />
                <h3 className="text-sm font-display font-medium text-foreground uppercase tracking-wider">
                  POD Blank Inventory & Provider Health
                </h3>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Real-time stock polling of 280 GSM cotton blanks, French Terry fleece, and ceramic
                substrates.
              </p>
            </div>
            <span className="px-2.5 py-1 text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Fleet Fully Synchronized
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-4 bg-surface-2 border border-border">
              <span className="text-muted-foreground">Active Catalog SKUs</span>
              <div className="text-xl font-bold text-foreground mt-1">48 Products (624 SKUs)</div>
              <span className="text-emerald-400 text-[10px]">100% In Stock</span>
            </div>
            <div className="p-4 bg-surface-2 border border-border">
              <span className="text-muted-foreground">Unavailable Lines</span>
              <div className="text-xl font-bold text-foreground mt-1">0 Items</div>
              <span className="text-muted-foreground text-[10px]">No outages</span>
            </div>
            <div className="p-4 bg-surface-2 border border-border">
              <span className="text-muted-foreground">Fulfillment Node Warnings</span>
              <div className="text-xl font-bold text-amber-400 mt-1">1 Low Blank Alert</div>
              <span className="text-muted-foreground text-[10px]">
                Berlin White XL French Terry
              </span>
            </div>
            <div className="p-4 bg-surface-2 border border-border">
              <span className="text-muted-foreground">Variant Webhook Sync</span>
              <div className="text-xl font-bold text-emerald-400 mt-1">0 Errors</div>
              <span className="text-muted-foreground text-[10px]">Polled every 60s</span>
            </div>
          </div>
        </div>
      )}

      {/* 7. AI IMPACT TELEMETRY */}
      {subTab === "ai" && (
        <div className="p-6 bg-surface border border-border space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-gold" />
                <h3 className="text-sm font-display font-medium text-foreground uppercase tracking-wider">
                  Autonomous Studio AI Performance
                </h3>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Telemetry measuring time savings, autonomous routing efficiency, and concierge
                resolution rates.
              </p>
            </div>
            <span className="text-xs font-mono text-gold">128 Hours Saved this Month</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-4 bg-surface-2 border border-border">
              <span className="text-muted-foreground">Workflows Executed</span>
              <div className="text-2xl font-bold text-foreground mt-1">
                {ai.automatedWorkflowsRun}
              </div>
              <span className="text-emerald-400 text-[10px]">98.4% without human review</span>
            </div>
            <div className="p-4 bg-surface-2 border border-border">
              <span className="text-muted-foreground">Auto-Dispatched POD Orders</span>
              <div className="text-2xl font-bold text-gold mt-1">{ai.autoDispatchedPODOrders}</div>
              <span className="text-muted-foreground text-[10px]">0 dispatch latency</span>
            </div>
            <div className="p-4 bg-surface-2 border border-border">
              <span className="text-muted-foreground">Customer Concierge Inquiries</span>
              <div className="text-2xl font-bold text-foreground mt-1">
                {ai.customerConciergeHandled}
              </div>
              <span className="text-emerald-400 text-[10px]">4.9/5 satisfaction score</span>
            </div>
            <div className="p-4 bg-surface-2 border border-border">
              <span className="text-muted-foreground">Human Approval Escalations</span>
              <div className="text-2xl font-bold text-foreground mt-1">{ai.humanReviewRate}%</div>
              <span className="text-muted-foreground text-[10px]">Only edge exceptions</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
