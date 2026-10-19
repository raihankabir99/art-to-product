import { ComponentType } from "react";

export type AIFeatureStatus = "Active" | "Ready" | "Draft" | "Needs Review";

export interface AIFeature {
  id: string;
  name: string;
  category: "Catalog" | "Editorial" | "Growth" | "Operations" | "Intelligence";
  description: string;
  status: AIFeatureStatus;
  lastActivity: string;
  usageMetric: string;
  tokensToday: string;
  latency: string;
  iconName: string;
}

export type ApprovalType =
  | "Blog Draft"
  | "SEO Metadata"
  | "Product Description"
  | "Marketing Caption"
  | "Customer Reply"
  | "Translation"
  | "Campaign Suggestion";

export interface AIApprovalItem {
  id: string;
  title: string;
  type: ApprovalType;
  targetEntity: string;
  summary: string;
  generatedContent: {
    original?: string;
    proposed: string;
    diffNotes?: string;
  };
  confidence: number;
  model: string;
  createdAt: string;
  status: "Pending" | "Approved" | "Rejected" | "Modified";
  author: string;
}

export interface WorkflowNode {
  id: string;
  title: string;
  type: "trigger" | "action" | "condition" | "pod" | "notification";
  status: "active" | "idle" | "error" | "paused";
  description: string;
  latency?: string;
  icon: string;
}

export interface AutomationWorkflow {
  id: string;
  name: string;
  description: string;
  category: "Orders" | "Fulfillment" | "Marketing" | "Customer Service" | "Content";
  trigger: string;
  status: "Active" | "Paused" | "Draft" | "Error";
  lastRun: string;
  successRate: number;
  totalRuns: number;
  avgDuration: string;
  nodes: WorkflowNode[];
}

export interface AutomationLog {
  id: string;
  timestamp: string;
  workflowName: string;
  workflowId: string;
  trigger: string;
  status: "Success" | "Running" | "Failed" | "Waiting" | "Needs Approval";
  duration: string;
  payloadSummary: string;
  region: string;
  errorMessage?: string;
  steps: { name: string; status: "success" | "running" | "failed" | "skipped"; duration: string }[];
}

export interface AIInsight {
  id: string;
  headline: string;
  narrative: string;
  dataSource: string;
  confidence: number;
  impact: "High" | "Medium" | "Crucial";
  category: "Conversion" | "Merchandising" | "Logistics" | "Customer Retention";
  recommendedAction: string;
  actionType: "quick_apply" | "view_report" | "create_campaign";
  timestamp: string;
}

export interface CustomerInquiry {
  id: string;
  customerName: string;
  customerEmail: string;
  tier: "VIP Patron" | "First-Time" | "Collector";
  orderNumber?: string;
  lastMessageTime: string;
  status: "Unresolved" | "Drafted" | "Awaiting Human" | "Resolved";
  conversation: {
    sender: "customer" | "support" | "system";
    message: string;
    timestamp: string;
  }[];
  aiSuggestedReply: string;
  aiConfidence: number;
  aiSuggestedAction?: string;
}

export interface SEOCheckItem {
  id: string;
  name: string;
  status: "pass" | "warning" | "error";
  score: number;
  detail: string;
  recommendation: string;
}
