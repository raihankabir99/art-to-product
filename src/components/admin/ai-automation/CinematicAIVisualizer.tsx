import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Activity,
  Cpu,
  Zap,
  CheckCircle2,
  Workflow,
  Globe,
  Radio,
  Layers,
  ArrowRight,
} from "lucide-react";

interface ActivityPulse {
  id: string;
  time: string;
  source: string;
  action: string;
  latency: string;
  status: "success" | "processing" | "routed";
}

export function CinematicAIVisualizer() {
  const [activePipelineStep, setActivePipelineStep] = useState(1);
  const [pulseList, setPulseList] = useState<ActivityPulse[]>([
    {
      id: "p1",
      time: "11:42:01",
      source: "Gemini 1.5 Pro",
      action: "Product Description Synthesis: 'Midnight Lion'",
      latency: "540ms",
      status: "success",
    },
    {
      id: "p2",
      time: "11:41:48",
      source: "Geo-Router",
      action: "Order #AT-9844 Routed to Berlin Print Node",
      latency: "120ms",
      status: "routed",
    },
    {
      id: "p3",
      time: "11:41:22",
      source: "Vision OCR",
      action: "300 DPI Vector Pre-flight Verification",
      latency: "310ms",
      status: "success",
    },
    {
      id: "p4",
      time: "11:40:59",
      source: "Semantic Neural Embed",
      action: "Search Vector Indexing (14 new silhouettes)",
      latency: "85ms",
      status: "processing",
    },
  ]);

  // Subtle cyclic animation for pipeline steps
  useEffect(() => {
    const timer = setInterval(() => {
      setActivePipelineStep((prev) => (prev % 5) + 1);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const PIPELINE_NODES = [
    { step: 1, label: "Input Event", desc: "Order / Prompt Ingestion", icon: Radio },
    { step: 2, label: "Neural Synthesizer", desc: "Gemini 1.5 Flash / Pro", icon: Sparkles },
    { step: 3, label: "Validation Gate", desc: "Schema & Quality Assurance", icon: CheckCircle2 },
    { step: 4, label: "POD Routing & Sync", desc: "Regional Hub Execution", icon: Cpu },
    { step: 5, label: "Storefront Dispatch", desc: "CDN Edge Invalidation", icon: Globe },
  ];

  return (
    <div className="p-6 bg-surface border border-border relative overflow-hidden space-y-6">
      {/* Background ambient subtle glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold" />
            </span>
            <h3 className="text-sm font-display font-medium text-foreground uppercase tracking-widest">
              Neural Activity & Pipeline Stream
            </h3>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5 font-sans">
            Real-time multi-agent execution pipeline connecting storefront telemetry, Gemini
            intelligence, and distributed POD nodes.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 border border-emerald-500/30 flex items-center gap-1.5">
            <Activity className="size-3" /> PIPELINE LATENCY: 245ms
          </span>
          <span className="text-[10px] font-mono text-gold bg-gold/10 px-2.5 py-1 border border-gold/30">
            SYSTEM LOAD: 14.8%
          </span>
        </div>
      </div>

      {/* Pipeline Nodes Flow Visualization */}
      <div className="relative z-10 py-3">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
          {PIPELINE_NODES.map((node) => {
            const Icon = node.icon;
            const isCurrent = activePipelineStep === node.step;
            const isPast = activePipelineStep > node.step;
            return (
              <div
                key={node.step}
                className={`p-4 border transition-all duration-500 relative flex flex-col justify-between group ${
                  isCurrent
                    ? "bg-surface-2 border-gold ring-1 ring-gold/40 shadow-lg shadow-gold/5"
                    : isPast
                      ? "bg-surface-2/60 border-border"
                      : "bg-surface/40 border-border/60 opacity-70"
                }`}
              >
                {/* Step indicator */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`size-6 rounded-none flex items-center justify-center text-[10px] font-mono border ${
                      isCurrent
                        ? "bg-gold text-background font-bold border-gold"
                        : "bg-background text-muted-foreground border-border"
                    }`}
                  >
                    0{node.step}
                  </span>
                  <Icon
                    className={`size-4 transition-colors ${
                      isCurrent ? "text-gold animate-pulse" : "text-muted-foreground"
                    }`}
                  />
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-foreground tracking-wider font-display uppercase">
                    {node.label}
                  </h4>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{node.desc}</p>
                </div>

                {/* Flow progress bar at bottom */}
                <div className="mt-4 h-1 w-full bg-background border border-border/40 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-700 ${
                      isCurrent
                        ? "w-full bg-gold"
                        : isPast
                          ? "w-full bg-emerald-500/80"
                          : "w-0 bg-transparent"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Stream Ticker / Activity Log */}
      <div className="relative z-10 border border-border bg-background p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
            <Zap className="size-3 text-gold" /> LIVE NEURAL EVENT STREAM
          </span>
          <span className="text-[10px] font-mono text-muted-foreground">POLLING: 100ms TICK</span>
        </div>

        <div className="space-y-2">
          {pulseList.map((pulse) => (
            <div
              key={pulse.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono py-1.5 px-3 bg-surface-2/60 border border-border/60 hover:border-gold/50 transition-colors gap-2"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] text-muted-foreground shrink-0">{pulse.time}</span>
                <span className="text-[10px] text-gold bg-gold/10 px-1.5 py-0.5 border border-gold/20 shrink-0">
                  {pulse.source}
                </span>
                <span className="text-foreground truncate">{pulse.action}</span>
              </div>
              <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                <span className="text-[10px] text-muted-foreground font-mono">{pulse.latency}</span>
                <span
                  className={`text-[9px] uppercase px-1.5 py-0.5 border ${
                    pulse.status === "success"
                      ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
                      : pulse.status === "routed"
                        ? "text-sky-400 bg-sky-500/10 border-sky-500/30"
                        : "text-amber-400 bg-amber-500/10 border-amber-500/30"
                  }`}
                >
                  {pulse.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
