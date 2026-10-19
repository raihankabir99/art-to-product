import React, { useState } from "react";
import {
  Workflow,
  Plus,
  Play,
  CheckCircle2,
  Cpu,
  Mail,
  MessageSquare,
  ShieldCheck,
  CreditCard,
  Layers,
  ArrowDown,
  Settings2,
  Sparkles,
  Zap,
} from "lucide-react";
import { AUTOMATION_WORKFLOWS_DATA } from "./ai-mock-data";
import { AutomationWorkflow, WorkflowNode } from "./types";
import { toast } from "sonner";

export function AutomationWorkflowBuilder() {
  const [workflows, setWorkflows] = useState<AutomationWorkflow[]>(AUTOMATION_WORKFLOWS_DATA);
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string>(
    AUTOMATION_WORKFLOWS_DATA[0].id,
  );
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(
    AUTOMATION_WORKFLOWS_DATA[0].nodes[2],
  );
  const [isRunningTest, setIsRunningTest] = useState(false);

  const activeWorkflow = workflows.find((wf) => wf.id === selectedWorkflowId) || workflows[0];

  const handleRunTest = () => {
    setIsRunningTest(true);
    setTimeout(() => {
      setIsRunningTest(false);
      toast.success("Simulation Run Succeeded", {
        description: `Executed 6 nodes in 840ms with 0 errors.`,
      });
    }, 900);
  };

  const getNodeIcon = (iconName: string) => {
    switch (iconName) {
      case "CreditCard":
        return CreditCard;
      case "ShieldCheck":
        return ShieldCheck;
      case "Cpu":
        return Cpu;
      case "Layers":
        return Layers;
      case "Mail":
        return Mail;
      case "MessageSquare":
        return MessageSquare;
      default:
        return Zap;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-soft">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-surface border border-border">
        <div>
          <div className="flex items-center gap-2">
            <Workflow className="size-5 text-gold" />
            <h2 className="text-xl font-display font-medium text-foreground uppercase tracking-wider">
              AUTOMATION FLOWS
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mt-1 font-sans">
            Visual node-based orchestration engine connecting checkout webhooks, print routing
            logic, and patron messaging.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRunTest}
            disabled={isRunningTest}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-surface-2 border border-border hover:border-gold text-xs font-mono uppercase text-foreground transition-colors"
          >
            <Play className={`size-3.5 text-gold ${isRunningTest ? "animate-spin" : ""}`} />
            {isRunningTest ? "Simulating Pipeline..." : "Test Run"}
          </button>

          <button
            type="button"
            onClick={() => toast.success("Workflow changes published to Production Router")}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gold text-background hover:bg-foreground hover:text-background font-semibold text-xs uppercase tracking-wider transition-colors"
          >
            Save Flow
          </button>
        </div>
      </div>

      {/* Main Flow Editor Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT: Workflow Selector (3 Cols) */}
        <div className="lg:col-span-3 p-4 bg-surface border border-border space-y-3">
          <div className="flex items-center justify-between border-b border-border pb-2 px-1">
            <h3 className="text-xs font-semibold font-display uppercase tracking-wider text-foreground">
              Configured Flows
            </h3>
            <span className="text-[10px] font-mono text-muted-foreground">
              {workflows.length} Active
            </span>
          </div>

          <div className="space-y-2">
            {workflows.map((wf) => (
              <div
                key={wf.id}
                onClick={() => setSelectedWorkflowId(wf.id)}
                className={`p-3 border transition-all cursor-pointer space-y-1.5 ${
                  wf.id === selectedWorkflowId
                    ? "bg-surface-2 border-gold ring-1 ring-gold/30"
                    : "bg-background border-border hover:border-gold/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground font-display uppercase truncate">
                    {wf.name}
                  </span>
                  <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 border border-emerald-500/30">
                    {wf.status}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground line-clamp-1">{wf.description}</p>
                <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground pt-1 border-t border-border/40">
                  <span>{wf.nodes.length} Nodes</span>
                  <span>{wf.successRate}% Success</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CENTER: CINEMATIC NODE-BASED CANVAS (6 Cols) */}
        <div className="lg:col-span-6 p-6 bg-surface border border-border space-y-6 relative overflow-hidden flex flex-col items-center">
          {/* Subtle Canvas Dot Grid Background */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #D4AF37 1px, transparent 0)`,
              backgroundSize: "24px 24px",
            }}
          />

          <div className="w-full flex items-center justify-between border-b border-border/80 pb-3 relative z-10">
            <div>
              <h3 className="text-xs font-bold font-display uppercase tracking-wider text-foreground">
                {activeWorkflow.name}
              </h3>
              <span className="text-[10px] font-mono text-gold">
                Trigger: {activeWorkflow.trigger}
              </span>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground">
              Latency: {activeWorkflow.avgDuration}
            </span>
          </div>

          {/* Sequential Node Chain */}
          <div className="w-full max-w-md space-y-4 py-2 relative z-10 flex flex-col items-center">
            {activeWorkflow.nodes.map((node, index) => {
              const Icon = getNodeIcon(node.icon);
              const isSelected = selectedNode?.id === node.id;
              const isLast = index === activeWorkflow.nodes.length - 1;

              return (
                <React.Fragment key={node.id}>
                  {/* Node Box */}
                  <div
                    onClick={() => setSelectedNode(node)}
                    className={`w-full p-4 border transition-all cursor-pointer relative group flex items-center justify-between ${
                      isSelected
                        ? "bg-surface-2 border-gold ring-1 ring-gold shadow-lg shadow-gold/10"
                        : "bg-background border-border hover:border-gold/60"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`size-8 flex items-center justify-center border ${
                          node.type === "trigger"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                            : node.type === "pod"
                              ? "bg-sky-500/10 text-sky-400 border-sky-500/30"
                              : node.type === "notification"
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                                : "bg-surface-2 text-gold border-border"
                        }`}
                      >
                        <Icon className="size-4" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-foreground font-display tracking-wider uppercase">
                            {node.title}
                          </h4>
                          <span className="text-[9px] font-mono uppercase text-muted-foreground px-1.5 py-0.2 border border-border">
                            {node.type}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          {node.description}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-mono text-muted-foreground">
                        {node.latency || "40ms"}
                      </span>
                    </div>
                  </div>

                  {/* Connecting Flow Arrow with animated pulse */}
                  {!isLast && (
                    <div className="flex flex-col items-center my-0.5">
                      <div className="w-0.5 h-3 bg-gradient-to-b from-border to-gold" />
                      <div className="size-5 rounded-full bg-surface-2 border border-gold/40 flex items-center justify-center">
                        <ArrowDown className="size-3 text-gold animate-bounce" />
                      </div>
                      <div className="w-0.5 h-3 bg-gradient-to-b from-gold to-border" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* RIGHT: Node Inspector Panel (3 Cols) */}
        <div className="lg:col-span-3 p-5 bg-surface border border-border space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <h3 className="text-xs font-semibold font-display uppercase tracking-wider text-foreground">
              Node Inspector
            </h3>
            <Settings2 className="size-4 text-gold" />
          </div>

          {selectedNode ? (
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-muted-foreground block mb-1">
                  Selected Node
                </span>
                <h4 className="text-sm font-bold text-foreground font-display uppercase">
                  {selectedNode.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">{selectedNode.description}</p>
              </div>

              <div className="space-y-3 pt-2 border-t border-border font-mono text-xs">
                <div>
                  <label className="text-[10px] uppercase text-muted-foreground block mb-1">
                    Execution Mode
                  </label>
                  <select className="w-full p-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none">
                    <option>Synchronous (Blocking)</option>
                    <option>Asynchronous (Queue)</option>
                    <option>Idempotent Auto-Retry (3x)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase text-muted-foreground block mb-1">
                    Timeout Threshold
                  </label>
                  <input
                    type="text"
                    defaultValue="3000ms"
                    className="w-full p-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase text-muted-foreground block mb-1">
                    Failover Policy
                  </label>
                  <select className="w-full p-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none">
                    <option>Fallback to London Atelier Node</option>
                    <option>Route to AI Approval Queue</option>
                    <option>Alert On-Call Engineer</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-surface-2 border border-border text-[11px] font-mono text-muted-foreground space-y-1">
                <div className="flex justify-between">
                  <span>State:</span>
                  <span className="text-emerald-400 uppercase">{selectedNode.status}</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Latency:</span>
                  <span className="text-foreground">{selectedNode.latency || "40ms"}</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">
              Select a workflow node to inspect properties.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
