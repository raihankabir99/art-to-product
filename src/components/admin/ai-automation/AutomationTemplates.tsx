import React, { useState } from "react";
import {
  Workflow,
  Sparkles,
  Zap,
  CheckCircle2,
  Cpu,
  Mail,
  Search,
  ArrowUpRight,
  ShieldCheck,
  AlertTriangle,
  Flame,
  Truck,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";

interface AutomationTemplate {
  id: string;
  name: string;
  category: "Fulfillment" | "Marketing" | "Customer" | "Operations" | "Content";
  trigger: string;
  actions: string[];
  status: "Active" | "Ready to Deploy" | "Recommended";
  lastRun: string;
  successRate: number;
}

const TEMPLATES_LIST: AutomationTemplate[] = [
  {
    id: "tpl_order_conf",
    name: "Order Confirmation",
    category: "Customer",
    trigger: "Order.Payment_Succeeded",
    actions: ["Generate Tax Invoice", "Dispatch HTML Receipt", "Create Patron Loyalty Points"],
    status: "Active",
    lastRun: "4 mins ago",
    successRate: 99.9,
  },
  {
    id: "tpl_pod_sub",
    name: "Order → POD Submission",
    category: "Fulfillment",
    trigger: "Order.Validated",
    actions: [
      "Pre-flight 300 DPI Vector Check",
      "Calculate Geo-Distance",
      "Send Job to Berlin/London Hub",
    ],
    status: "Active",
    lastRun: "8 mins ago",
    successRate: 99.8,
  },
  {
    id: "tpl_shipping_notif",
    name: "Shipping Notification",
    category: "Fulfillment",
    trigger: "Carrier.Tracking_Generated",
    actions: ["Sync Tracking Code", "Build Real-Time Delivery Map", "Send Email + SMS Alert"],
    status: "Active",
    lastRun: "18 mins ago",
    successRate: 99.9,
  },
  {
    id: "tpl_delivered_review",
    name: "Order Delivered → Review Request",
    category: "Marketing",
    trigger: "Carrier.Doorstep_Delivered_Plus_3D",
    actions: [
      "Evaluate Customer Tier",
      "Synthesize Personalized Invite",
      "Grant 10% Next-Order Perk",
    ],
    status: "Active",
    lastRun: "45 mins ago",
    successRate: 99.2,
  },
  {
    id: "tpl_abandoned_cart",
    name: "Abandoned Cart",
    category: "Marketing",
    trigger: "Checkout.Abandoned_60_Min",
    actions: [
      "Check Blank Inventory",
      "Generate 1-Click Restore Link",
      "Send High-Aesthetic Reminder",
    ],
    status: "Active",
    lastRun: "12 mins ago",
    successRate: 98.4,
  },
  {
    id: "tpl_welcome",
    name: "New Customer Welcome",
    category: "Customer",
    trigger: "Customer.Account_Created",
    actions: ["Assign Welcome Capsule Lookbook", "Generate VIP Pass", "Send Onboarding Series"],
    status: "Active",
    lastRun: "1 hour ago",
    successRate: 100,
  },
  {
    id: "tpl_new_design",
    name: "New Design Published",
    category: "Marketing",
    trigger: "Design.Published_To_Catalog",
    actions: [
      "Generate Social Assets",
      "Alert VIP Collector Subscribers",
      "Invalidate Edge CDN Cache",
    ],
    status: "Active",
    lastRun: "1 day ago",
    successRate: 100,
  },
  {
    id: "tpl_blog_pub",
    name: "Blog Published",
    category: "Content",
    trigger: "CMS.Journal_Post_Published",
    actions: ["Ping Google Indexing API", "Build RSS Feed Entry", "Generate Social Teaser Snippet"],
    status: "Active",
    lastRun: "2 days ago",
    successRate: 99.5,
  },
  {
    id: "tpl_low_conv",
    name: "Low Conversion Alert",
    category: "Operations",
    trigger: "Analytics.Product_Page_Dropoff_Spike",
    actions: [
      "AI Price Elasticity Analysis",
      "Draft Alternative Mockup Angles",
      "Create Review Task",
    ],
    status: "Recommended",
    lastRun: "Never",
    successRate: 98.0,
  },
  {
    id: "tpl_pod_fail",
    name: "POD Failure Alert",
    category: "Fulfillment",
    trigger: "POD.Api_Webhook_Error",
    actions: [
      "Auto Re-route to London Studio",
      "Upgrade to Priority Express",
      "Notify Operations Team",
    ],
    status: "Active",
    lastRun: "3 days ago",
    successRate: 100,
  },
  {
    id: "tpl_refund_alert",
    name: "Refund Request Alert",
    category: "Operations",
    trigger: "Order.Refund_Initiated",
    actions: [
      "Inspect Reason Code",
      "Pause Print Node if in Queue",
      "Generate Patron Return Label",
    ],
    status: "Ready to Deploy",
    lastRun: "Never",
    successRate: 99.0,
  },
];

interface AutomationTemplatesProps {
  onViewFlow: (templateId: string) => void;
}

export function AutomationTemplates({ onViewFlow }: AutomationTemplatesProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered = TEMPLATES_LIST.filter(
    (t) => selectedCategory === "All" || t.category === selectedCategory,
  );

  return (
    <div className="space-y-6 animate-fade-in-soft">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-surface border border-border">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="size-5 text-gold" />
            <h2 className="text-xl font-display font-medium text-foreground uppercase tracking-wider">
              Automated Workflow Templates
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mt-1 font-sans">
            11 battle-tested enterprise automation blueprints engineered specifically for
            print-on-demand commerce logistics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {["All", "Fulfillment", "Marketing", "Customer", "Operations", "Content"].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 text-xs font-mono uppercase tracking-wider transition-colors ${
                selectedCategory === cat
                  ? "bg-gold text-background font-bold"
                  : "bg-surface-2 text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((tpl) => (
          <div
            key={tpl.id}
            className="p-5 bg-surface border border-border hover:border-gold/80 transition-all flex flex-col justify-between group space-y-4 shadow-sm"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-gold bg-gold/10 px-2 py-0.5 border border-gold/30 uppercase">
                  {tpl.category}
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 border ${
                    tpl.status === "Active"
                      ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
                      : "text-sky-400 bg-sky-500/10 border-sky-500/30"
                  }`}
                >
                  {tpl.status}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-semibold font-display tracking-wider text-foreground uppercase group-hover:text-gold transition-colors">
                  {tpl.name}
                </h3>
                <p className="text-[11px] font-mono text-muted-foreground mt-1">
                  Trigger: <span className="text-foreground">{tpl.trigger}</span>
                </p>
              </div>

              {/* Action Chain */}
              <div className="p-3 bg-surface-2 border border-border space-y-1.5 text-xs">
                <span className="text-[10px] font-mono uppercase text-muted-foreground block">
                  Action Chain ({tpl.actions.length} steps):
                </span>
                {tpl.actions.map((act, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 text-muted-foreground text-[11px]"
                  >
                    <span className="text-gold font-mono">0{idx + 1}.</span>
                    <span className="truncate">{act}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Meta & Button */}
            <div className="pt-3 border-t border-border/80 flex items-center justify-between">
              <div className="text-[10px] font-mono text-muted-foreground">
                <span>{tpl.successRate}% Success</span> • <span>{tpl.lastRun}</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  onViewFlow("workflows");
                  toast.info(`Opened "${tpl.name}" in Workflow Builder`);
                }}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-surface-2 hover:bg-gold hover:text-background text-foreground text-xs font-mono uppercase tracking-wider border border-border hover:border-gold transition-all"
              >
                VIEW FLOW <ArrowUpRight className="size-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
