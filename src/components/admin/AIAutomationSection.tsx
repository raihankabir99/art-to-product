import React, { useState, useEffect } from "react";
import {
  BrainCircuit,
  Workflow,
  Sparkles,
  Zap,
  Wand2,
  BookOpen,
  Search,
  MessageSquare,
  ListOrdered,
  ShieldCheck,
  TrendingUp,
  BarChart3,
  Activity,
  Layers,
  ChevronRight,
} from "lucide-react";
import { AICommandCenterOverview } from "./ai-automation/AICommandCenterOverview";
import { AIFeatureGrid } from "./ai-automation/AIFeatureGrid";
import { AIProductAssistant } from "./ai-automation/AIProductAssistant";
import { AIBlogAssistant } from "./ai-automation/AIBlogAssistant";
import { AISEOWorkspace } from "./ai-automation/AISEOWorkspace";
import { AICustomerSupport } from "./ai-automation/AICustomerSupport";
import { AutomationWorkflowBuilder } from "./ai-automation/AutomationWorkflowBuilder";
import { AutomationTemplates } from "./ai-automation/AutomationTemplates";
import { AutomationLogs } from "./ai-automation/AutomationLogs";
import { AIApprovalCenter } from "./ai-automation/AIApprovalCenter";
import { AIBusinessInsights } from "./ai-automation/AIBusinessInsights";
import { AIAnalyticsDashboard } from "./ai-automation/AIAnalyticsDashboard";
import { AutomationHealthMonitor } from "./ai-automation/AutomationHealthMonitor";

interface AIAutomationSectionProps {
  subSection: string;
}

export function AIAutomationSection({ subSection }: AIAutomationSectionProps) {
  // Map subSection or internal tab
  const [activeTab, setActiveTab] = useState<string>("overview");

  // Keep synced when navigation from sidebar changes
  useEffect(() => {
    if (subSection === "ai-center" || subSection === "overview") {
      setActiveTab("overview");
    } else if (subSection === "automation-center") {
      setActiveTab("workflows");
    } else if (subSection) {
      setActiveTab(subSection);
    }
  }, [subSection]);

  const SUB_NAV_TABS = [
    { id: "overview", label: "Command Center", icon: BrainCircuit },
    { id: "ai-features", label: "AI Features", icon: Sparkles },
    { id: "product-assistant", label: "Product Studio", icon: Wand2 },
    { id: "blog-assistant", label: "Blog Assistant", icon: BookOpen },
    { id: "seo-workspace", label: "SEO Studio", icon: Search },
    { id: "support-assistant", label: "Support Concierge", icon: MessageSquare },
    { id: "workflows", label: "Flow Builder", icon: Workflow },
    { id: "templates", label: "Templates", icon: Zap },
    { id: "logs", label: "Logs", icon: ListOrdered },
    { id: "approvals", label: "Approvals (6)", icon: ShieldCheck, isBadge: true },
    { id: "insights", label: "Insights", icon: TrendingUp },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "health", label: "Health", icon: Activity },
  ];

  return (
    <div className="space-y-6 animate-fade-in-soft">
      {/* Sub-Navigation Ribbon for AI & Automation Center */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 bg-surface border border-border p-1.5 scrollbar-none">
        {SUB_NAV_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all whitespace-nowrap border-b-2 ${
                isActive
                  ? "border-gold text-gold font-bold bg-surface-2 shadow-xs"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-surface-2/40"
              }`}
            >
              <Icon className={`size-3.5 ${isActive ? "text-gold" : "text-muted-foreground"}`} />
              <span>{tab.label}</span>
              {tab.isBadge && (
                <span className="size-1.5 rounded-full bg-gold animate-pulse ml-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Dynamic Content Views */}
      <div className="min-h-[600px]">
        {activeTab === "overview" && (
          <AICommandCenterOverview onNavigateTab={(tab) => setActiveTab(tab)} />
        )}

        {activeTab === "ai-features" && (
          <AIFeatureGrid onSelectFeature={(featId) => setActiveTab(featId)} />
        )}

        {activeTab === "product-assistant" && <AIProductAssistant />}

        {activeTab === "blog-assistant" && <AIBlogAssistant />}

        {activeTab === "seo-workspace" && <AISEOWorkspace />}

        {activeTab === "support-assistant" && <AICustomerSupport />}

        {activeTab === "workflows" && <AutomationWorkflowBuilder />}

        {activeTab === "templates" && (
          <AutomationTemplates onViewFlow={(flowId) => setActiveTab(flowId)} />
        )}

        {activeTab === "logs" && <AutomationLogs />}

        {activeTab === "approvals" && <AIApprovalCenter />}

        {activeTab === "insights" && <AIBusinessInsights />}

        {activeTab === "analytics" && <AIAnalyticsDashboard />}

        {activeTab === "health" && <AutomationHealthMonitor />}
      </div>
    </div>
  );
}
