import React, { useState } from "react";
import {
  Sparkles,
  Search,
  BookOpen,
  Globe,
  Layers,
  MessageSquare,
  Star,
  TrendingUp,
  Cpu,
  Flame,
  Type,
  Filter,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Zap,
} from "lucide-react";
import { AI_FEATURES_DATA } from "./ai-mock-data";
import { AIFeature, AIFeatureStatus } from "./types";
import { toast } from "sonner";

interface AIFeatureGridProps {
  onSelectFeature: (featureId: string) => void;
}

export function AIFeatureGrid({ onSelectFeature }: AIFeatureGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  const getIcon = (name: string) => {
    switch (name) {
      case "Sparkles":
        return Sparkles;
      case "Search":
        return Search;
      case "BookOpen":
        return BookOpen;
      case "Globe":
        return Globe;
      case "Layers":
        return Layers;
      case "MessageSquare":
        return MessageSquare;
      case "Star":
        return Star;
      case "TrendingUp":
        return TrendingUp;
      case "Cpu":
        return Cpu;
      case "Flame":
        return Flame;
      case "Type":
        return Type;
      default:
        return Zap;
    }
  };

  const getStatusBadge = (status: AIFeatureStatus) => {
    switch (status) {
      case "Active":
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" /> Active
          </span>
        );
      case "Ready":
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 bg-sky-500/10 text-sky-400 border border-sky-500/30">
            Ready
          </span>
        );
      case "Draft":
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 bg-zinc-500/10 text-zinc-400 border border-zinc-500/30">
            Draft
          </span>
        );
      case "Needs Review":
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/30">
            Needs Review
          </span>
        );
    }
  };

  const filteredFeatures = AI_FEATURES_DATA.filter((feat) => {
    const matchesSearch =
      feat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feat.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === "All" || feat.category === selectedCategory;
    const matchesStat = selectedStatus === "All" || feat.status === selectedStatus;
    return matchesSearch && matchesCat && matchesStat;
  });

  return (
    <div className="space-y-6 animate-fade-in-soft">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-surface border border-border">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="size-5 text-gold" />
            <h2 className="text-xl font-display font-medium text-foreground uppercase tracking-wider">
              Enterprise AI Capabilities Grid
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            12 bespoke neural engines configured for print-on-demand eCommerce, high-end copy
            generation, and operational scaling.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-3 py-1.5 bg-surface-2 border border-border text-foreground">
            12/12 ENGINES ONLINE
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 bg-surface border border-border">
        <div className="relative flex-1 max-w-md">
          <Search className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search AI features or capabilities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-surface-2 border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1">
            <span className="text-[11px] font-mono uppercase text-muted-foreground mr-1">
              Category:
            </span>
            {["All", "Catalog", "Editorial", "Growth", "Operations", "Intelligence"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider transition-colors ${
                  selectedCategory === cat
                    ? "bg-gold text-background font-bold"
                    : "bg-surface-2 text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Ready">Ready</option>
            <option value="Draft">Draft</option>
            <option value="Needs Review">Needs Review</option>
          </select>
        </div>
      </div>

      {/* 12 Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFeatures.map((feat) => {
          const Icon = getIcon(feat.iconName);
          return (
            <div
              key={feat.id}
              className="p-5 bg-surface border border-border hover:border-gold/80 transition-all flex flex-col justify-between group space-y-4 shadow-sm hover:shadow-gold/5"
            >
              <div className="space-y-3">
                {/* Top Row: Icon & Status */}
                <div className="flex items-center justify-between">
                  <div className="size-9 bg-surface-2 border border-border group-hover:border-gold/50 flex items-center justify-center transition-colors">
                    <Icon className="size-4 text-gold" />
                  </div>
                  {getStatusBadge(feat.status)}
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-sm font-semibold font-display tracking-wider text-foreground uppercase group-hover:text-gold transition-colors">
                    {feat.name}
                  </h3>
                  <span className="text-[10px] font-mono text-gold/80 uppercase">
                    {feat.category} • Latency {feat.latency}
                  </span>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed font-sans">
                    {feat.description}
                  </p>
                </div>
              </div>

              {/* Bottom: Telemetry & Open action */}
              <div className="pt-3 border-t border-border/70 space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                  <span>Usage: {feat.usageMetric}</span>
                  <span>{feat.lastActivity}</span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {feat.tokensToday}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      if (feat.id === "feat_prod_desc") onSelectFeature("product-assistant");
                      else if (feat.id === "feat_blog_assist") onSelectFeature("blog-assistant");
                      else if (feat.id === "feat_seo_gen") onSelectFeature("seo-workspace");
                      else if (feat.id === "feat_cust_support")
                        onSelectFeature("support-assistant");
                      else if (feat.id === "feat_sales_insights") onSelectFeature("insights");
                      else {
                        toast.success(`Launched ${feat.name} Studio`, {
                          description: "AI module workspace loaded with live parameters.",
                        });
                        onSelectFeature("product-assistant");
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-2 hover:bg-gold hover:text-background text-foreground text-xs font-mono uppercase tracking-wider border border-border hover:border-gold transition-all"
                  >
                    Open Workspace <ArrowUpRight className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
