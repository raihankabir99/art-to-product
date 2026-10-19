import React from "react";
import {
  Activity,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  Globe,
  Clock,
  Server,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

export function AutomationHealthMonitor() {
  const POD_NODES = [
    {
      name: "London Atelier Print Studio (UK/US Route)",
      region: "eu-west-2",
      status: "Optimal",
      latency: "42ms",
      load: "28%",
      activeJobs: 14,
      downtimeSla: "99.99%",
    },
    {
      name: "Berlin Prodigi / Gelato Fulfillment (EU/DACH Route)",
      region: "eu-central-1",
      status: "Optimal",
      latency: "38ms",
      load: "42%",
      activeJobs: 32,
      downtimeSla: "99.98%",
    },
    {
      name: "Amsterdam Logistics & Custom Packaging Hub",
      region: "eu-west-1",
      status: "Optimal",
      latency: "45ms",
      load: "19%",
      activeJobs: 8,
      downtimeSla: "100%",
    },
    {
      name: "Tokyo Fine-Art Archival Paper & DTG Node (APAC)",
      region: "ap-northeast-1",
      status: "Optimal",
      latency: "112ms",
      load: "15%",
      activeJobs: 6,
      downtimeSla: "99.95%",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in-soft">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-surface border border-border">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="size-5 text-gold" />
            <h2 className="text-xl font-display font-medium text-foreground uppercase tracking-wider">
              AUTOMATION HEALTH & INFRASTRUCTURE TELEMETRY
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mt-1 font-sans">
            Real-time health telemetry across global print-on-demand fulfillment nodes, serverless
            webhook routers, and Gemini API endpoints.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 border border-emerald-500/30 flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-emerald-400 animate-ping" /> ALL SYSTEMS OPTIMAL
            (99.98% SLA)
          </span>
        </div>
      </div>

      {/* System Health Metric Cards (5 Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-4 bg-surface border border-border space-y-1">
          <span className="text-[10px] font-mono uppercase text-muted-foreground">
            System Health
          </span>
          <div className="text-2xl font-display font-medium text-emerald-400">99.98%</div>
          <span className="text-[10px] font-mono text-muted-foreground">Global SLA met</span>
        </div>

        <div className="p-4 bg-surface border border-border space-y-1">
          <span className="text-[10px] font-mono uppercase text-muted-foreground">
            Active Workflows
          </span>
          <div className="text-2xl font-display font-medium text-foreground">18 Active</div>
          <span className="text-[10px] font-mono text-emerald-400">100% operational</span>
        </div>

        <div className="p-4 bg-surface border border-border space-y-1">
          <span className="text-[10px] font-mono uppercase text-muted-foreground">
            Failed Runs (24h)
          </span>
          <div className="text-2xl font-display font-medium text-foreground">3 Runs</div>
          <span className="text-[10px] font-mono text-amber-400">Auto-failover recovered</span>
        </div>

        <div className="p-4 bg-surface border border-border space-y-1">
          <span className="text-[10px] font-mono uppercase text-muted-foreground">
            Avg Execution Time
          </span>
          <div className="text-2xl font-display font-medium text-foreground">245ms</div>
          <span className="text-[10px] font-mono text-sky-400">P50 benchmark</span>
        </div>

        <div className="p-4 bg-surface border border-border space-y-1">
          <span className="text-[10px] font-mono uppercase text-muted-foreground">
            Pending Tasks Queue
          </span>
          <div className="text-2xl font-display font-medium text-gold">12 Tasks</div>
          <span className="text-[10px] font-mono text-muted-foreground">Queue drain: ~3.2s</span>
        </div>
      </div>

      {/* Distributed Regional POD Hubs Status */}
      <div className="p-6 bg-surface border border-border space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <Server className="size-4 text-gold" />
            <h3 className="text-sm font-display font-medium text-foreground uppercase tracking-wider">
              Distributed POD Fulfillment Nodes & Print Routing Telemetry
            </h3>
          </div>
          <span className="text-[10px] font-mono text-gold">4/4 Nodes Active</span>
        </div>

        <div className="space-y-3">
          {POD_NODES.map((node, idx) => (
            <div
              key={idx}
              className="p-4 bg-surface-2 border border-border hover:border-gold/60 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-400" />
                  <h4 className="text-xs font-semibold text-foreground tracking-wider font-display uppercase">
                    {node.name}
                  </h4>
                  <span className="text-[10px] font-mono text-muted-foreground bg-background px-2 py-0.5 border border-border">
                    {node.region}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground pl-4">
                  Active Print Queues: {node.activeJobs} units in rasterization • Uptime SLA:{" "}
                  {node.downtimeSla}
                </p>
              </div>

              <div className="flex items-center gap-6 text-xs font-mono text-muted-foreground self-end lg:self-auto">
                <div>
                  <span className="text-muted-foreground block text-[10px]">Ping Latency</span>
                  <span className="text-foreground font-bold">{node.latency}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px]">Compute Load</span>
                  <span className="text-gold font-bold">{node.load}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px]">Status</span>
                  <span className="text-emerald-400 font-bold uppercase">{node.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
