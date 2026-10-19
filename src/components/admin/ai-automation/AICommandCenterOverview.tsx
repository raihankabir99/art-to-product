import React from "react";
import {
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Cpu,
  ArrowUpRight,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  BrainCircuit,
  Layers,
} from "lucide-react";
import { CinematicAIVisualizer } from "./CinematicAIVisualizer";
import { AI_INSIGHTS_DATA } from "./ai-mock-data";

interface AICommandCenterOverviewProps {
  onNavigateTab: (tabId: string) => void;
}

export function AICommandCenterOverview({ onNavigateTab }: AICommandCenterOverviewProps) {
  return (
    <div className="space-y-8 animate-fade-in-soft">
      {/* 1. TOP HERO / COMMAND BANNER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 bg-surface border border-border relative overflow-hidden">
        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-2">
            <BrainCircuit className="size-5 text-gold" />
            <h1 className="text-xl font-display font-medium text-foreground uppercase tracking-wider">
              AI & Automation Command Center
            </h1>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/30">
              MODELS OPERATIONAL
            </span>
          </div>
          <p className="text-xs text-muted-foreground max-w-2xl font-sans">
            Centralized orchestration hub for Gemini generative models, autonomous POD routing
            pipelines, automated editorial copywriting, and multi-region fulfillment intelligence.
          </p>
        </div>

        {/* Action quick links */}
        <div className="flex items-center gap-2.5 relative z-10 flex-wrap">
          <button
            type="button"
            onClick={() => onNavigateTab("approvals")}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-surface-2 border border-border hover:border-gold text-xs font-mono uppercase tracking-wider text-foreground transition-colors"
          >
            <Clock className="size-3.5 text-gold" />
            Approvals Queue (6)
          </button>

          <button
            type="button"
            onClick={() => onNavigateTab("product-assistant")}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gold text-background hover:bg-foreground hover:text-background text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
          >
            <Sparkles className="size-3.5" />
            Launch AI Studio
          </button>
        </div>
      </div>

      {/* 2. CINEMATIC KPI METRIC CARDS (6 CARDS) */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
        {/* Card 1: AI Tasks Today */}
        <div className="p-4 bg-surface border border-border space-y-2 relative overflow-hidden group hover:border-gold/60 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              AI Tasks Today
            </span>
            <Sparkles className="size-3.5 text-gold group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-display font-medium text-foreground">1,482</span>
            <span className="text-[10px] font-mono text-emerald-400 flex items-center">
              <TrendingUp className="size-3 mr-0.5" /> +18%
            </span>
          </div>
          <p className="text-[10px] text-muted-foreground font-mono">Gemini 1.5 Pro & Flash</p>
        </div>

        {/* Card 2: AI Tasks Completed */}
        <div className="p-4 bg-surface border border-border space-y-2 relative overflow-hidden group hover:border-gold/60 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              Completed
            </span>
            <CheckCircle2 className="size-3.5 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-display font-medium text-foreground">1,468</span>
            <span className="text-[10px] font-mono text-emerald-400">99.1% SLA</span>
          </div>
          <p className="text-[10px] text-muted-foreground font-mono">Avg latency: 420ms</p>
        </div>

        {/* Card 3: Automation Runs */}
        <div className="p-4 bg-surface border border-border space-y-2 relative overflow-hidden group hover:border-gold/60 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              Automation Runs
            </span>
            <Zap className="size-3.5 text-sky-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-display font-medium text-foreground">8,920</span>
            <span className="text-[10px] font-mono text-sky-400">+12% vol</span>
          </div>
          <p className="text-[10px] text-muted-foreground font-mono">18 Active Workflows</p>
        </div>

        {/* Card 4: Successful Automations */}
        <div className="p-4 bg-surface border border-border space-y-2 relative overflow-hidden group hover:border-gold/60 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              Success Rate
            </span>
            <ShieldCheck className="size-3.5 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-display font-medium text-emerald-400">99.5%</span>
            <span className="text-[10px] font-mono text-muted-foreground">8,874 ok</span>
          </div>
          <p className="text-[10px] text-muted-foreground font-mono">Zero unrecovered drops</p>
        </div>

        {/* Card 5: Pending Approvals */}
        <div
          className="p-4 bg-surface border border-border space-y-2 relative overflow-hidden group hover:border-gold/60 transition-colors cursor-pointer"
          onClick={() => onNavigateTab("approvals")}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-widest text-gold">
              Pending Approvals
            </span>
            <Clock className="size-3.5 text-gold animate-pulse" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-display font-medium text-gold">6</span>
            <span className="text-[10px] font-mono text-gold bg-gold/10 px-1.5 py-0.5 border border-gold/30">
              Human Review
            </span>
          </div>
          <p className="text-[10px] text-muted-foreground font-mono">2 Blog, 2 SEO, 2 Copy</p>
        </div>

        {/* Card 6: AI Errors */}
        <div className="p-4 bg-surface border border-border space-y-2 relative overflow-hidden group hover:border-gold/60 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              AI Errors
            </span>
            <AlertTriangle className="size-3.5 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-display font-medium text-foreground">3</span>
            <span className="text-[10px] font-mono text-amber-400">Auto-retried</span>
          </div>
          <p className="text-[10px] text-muted-foreground font-mono">0.05% Failure Rate</p>
        </div>
      </div>

      {/* 3. CINEMATIC NEURAL PIPELINE VISUALIZATION */}
      <CinematicAIVisualizer />

      {/* 4. AI INSIGHTS & RECENT RECOMMENDATIONS HIGHLIGHT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 bg-surface border border-border space-y-4">
          <div className="flex items-center justify-between border-b border-border/80 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-gold" />
              <h3 className="text-sm font-display font-medium text-foreground uppercase tracking-wider">
                Autonomous Intelligence & Merchandising Signals
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab("insights")}
              className="text-xs font-mono text-gold hover:underline flex items-center gap-1"
            >
              View All Insights <ArrowRight className="size-3" />
            </button>
          </div>

          <div className="space-y-3">
            {AI_INSIGHTS_DATA.slice(0, 2).map((ins) => (
              <div
                key={ins.id}
                className="p-4 bg-surface-2 border border-border hover:border-gold/60 transition-colors space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground font-display tracking-wider uppercase">
                    {ins.headline}
                  </span>
                  <span className="text-[9px] font-mono text-gold bg-gold/10 px-2 py-0.5 border border-gold/30">
                    {ins.confidence}% Confidence
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{ins.narrative}</p>
                <div className="pt-2 border-t border-border/60 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-muted-foreground">{ins.dataSource}</span>
                  <span className="text-gold uppercase font-semibold">
                    Action: {ins.recommendedAction}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Launchpad to dedicated modules */}
        <div className="p-6 bg-surface border border-border space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-border/80 pb-3 mb-4">
              <Layers className="size-4 text-gold" />
              <h3 className="text-sm font-display font-medium text-foreground uppercase tracking-wider">
                AI Studio Modules
              </h3>
            </div>

            <div className="space-y-2">
              {[
                {
                  id: "product-assistant",
                  label: "AI Product Assistant",
                  desc: "Craft copy, tags & care guides",
                },
                {
                  id: "blog-assistant",
                  label: "AI Blog Assistant",
                  desc: "Draft long-form essays & reviews",
                },
                {
                  id: "seo-workspace",
                  label: "AI SEO Studio",
                  desc: "Health audit & structured JSON-LD",
                },
                {
                  id: "support-assistant",
                  label: "AI Customer Support",
                  desc: "Synthesize tracking & sizing replies",
                },
                {
                  id: "workflows",
                  label: "Workflow Builder",
                  desc: "Visual multi-node POD diagrams",
                },
              ].map((mod) => (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => onNavigateTab(mod.id)}
                  className="w-full p-3 bg-surface-2 border border-border hover:border-gold text-left flex items-center justify-between group transition-colors"
                >
                  <div>
                    <h4 className="text-xs font-bold text-foreground group-hover:text-gold transition-colors">
                      {mod.label}
                    </h4>
                    <p className="text-[10px] text-muted-foreground">{mod.desc}</p>
                  </div>
                  <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-background border border-border text-[11px] font-mono text-muted-foreground flex items-center justify-between">
            <span>LLM Backbone: Gemini 1.5 Pro</span>
            <span className="text-emerald-400">Online 100%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
