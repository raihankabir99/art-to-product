import React, { useState } from "react";
import {
  ListOrdered,
  Search,
  CheckCircle2,
  AlertTriangle,
  Clock,
  RefreshCw,
  Eye,
  RotateCcw,
  Zap,
  Filter,
  X,
} from "lucide-react";
import { AUTOMATION_LOGS_DATA } from "./ai-mock-data";
import { AutomationLog } from "./types";
import { toast } from "sonner";

export function AutomationLogs() {
  const [logs, setLogs] = useState<AutomationLog[]>(AUTOMATION_LOGS_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedLog, setSelectedLog] = useState<AutomationLog | null>(null);

  const filteredLogs = logs.filter((l) => {
    const matchesSearch =
      l.workflowName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.trigger.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.payloadSummary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: AutomationLog["status"]) => {
    switch (status) {
      case "Success":
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            Success
          </span>
        );
      case "Running":
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 bg-sky-500/10 text-sky-400 border border-sky-500/30 flex items-center gap-1">
            <RefreshCw className="size-2.5 animate-spin" /> Running
          </span>
        );
      case "Failed":
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 bg-rose-500/10 text-rose-400 border border-rose-500/30">
            Failed
          </span>
        );
      case "Waiting":
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 bg-zinc-500/10 text-zinc-400 border border-zinc-500/30">
            Waiting
          </span>
        );
      case "Needs Approval":
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/30">
            Needs Approval
          </span>
        );
    }
  };

  const handleRetry = (logId: string) => {
    toast.success("Re-executing Automation Pipeline", {
      description: `Dispatched idempotency token for ${logId}.`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in-soft">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-surface border border-border">
        <div>
          <div className="flex items-center gap-2">
            <ListOrdered className="size-5 text-gold" />
            <h2 className="text-xl font-display font-medium text-foreground uppercase tracking-wider">
              Automation Execution Logs
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mt-1 font-sans">
            Immutable audit trail of autonomous webhook triggers, neural generation jobs, and POD
            API transactions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => toast.success("Logs synchronized from Cloud Router")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-2 border border-border hover:border-gold text-xs font-mono uppercase text-foreground transition-colors"
          >
            <RefreshCw className="size-3 text-gold" /> Refresh Stream
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 bg-surface border border-border">
        <div className="relative flex-1 max-w-md">
          <Search className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search logs by trigger, order ID, or payload..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-surface-2 border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold"
          />
        </div>

        <div className="flex items-center gap-1 flex-wrap">
          <span className="text-[11px] font-mono uppercase text-muted-foreground mr-1">
            Status:
          </span>
          {["All", "Success", "Running", "Failed", "Needs Approval"].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-1 text-xs font-mono uppercase tracking-wider transition-colors ${
                statusFilter === st
                  ? "bg-gold text-background font-bold"
                  : "bg-surface-2 text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Enterprise Activity Table */}
      <div className="bg-surface border border-border overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-surface-2 text-[10px] font-mono uppercase text-muted-foreground">
              <th className="py-3 px-4 font-semibold">Time (UTC)</th>
              <th className="py-3 px-4 font-semibold">Workflow</th>
              <th className="py-3 px-4 font-semibold">Trigger Event</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold">Duration</th>
              <th className="py-3 px-4 font-semibold">Result Summary</th>
              <th className="py-3 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-xs font-mono">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-surface-2/60 transition-colors group">
                <td className="py-3.5 px-4 text-muted-foreground whitespace-nowrap">
                  {log.timestamp}
                </td>
                <td className="py-3.5 px-4 font-semibold text-foreground font-display tracking-wider uppercase">
                  {log.workflowName}
                </td>
                <td className="py-3.5 px-4 text-muted-foreground">
                  <span className="text-gold/90">{log.trigger}</span>
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap">{getStatusBadge(log.status)}</td>
                <td className="py-3.5 px-4 text-muted-foreground">{log.duration}</td>
                <td className="py-3.5 px-4 text-muted-foreground max-w-xs truncate">
                  {log.payloadSummary}
                </td>
                <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-2">
                  <button
                    type="button"
                    onClick={() => setSelectedLog(log)}
                    className="px-2.5 py-1 bg-surface-2 border border-border hover:border-gold text-[10px] uppercase text-foreground transition-colors"
                  >
                    Inspect
                  </button>
                  {log.status === "Failed" && (
                    <button
                      type="button"
                      onClick={() => handleRetry(log.id)}
                      className="px-2.5 py-1 bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500 text-rose-400 hover:text-white text-[10px] uppercase transition-colors"
                    >
                      Retry
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Trace Inspection Modal / Drawer */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface border border-border max-w-2xl w-full p-6 space-y-6 animate-fade-in-soft shadow-2xl">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h3 className="text-sm font-bold font-display uppercase tracking-wider text-foreground">
                  Execution Trace: {selectedLog.id}
                </h3>
                <span className="text-[10px] font-mono text-gold">{selectedLog.workflowName}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLog(null)}
                className="size-7 rounded-none bg-surface-2 border border-border flex items-center justify-center hover:text-gold"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono p-3 bg-surface-2 border border-border">
              <div>
                <span className="text-muted-foreground">Region:</span> {selectedLog.region}
              </div>
              <div>
                <span className="text-muted-foreground">Total Time:</span> {selectedLog.duration}
              </div>
              <div>
                <span className="text-muted-foreground">Trigger:</span> {selectedLog.trigger}
              </div>
              <div>
                <span className="text-muted-foreground">Status:</span> {selectedLog.status}
              </div>
            </div>

            {/* Step execution timeline */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase text-muted-foreground block">
                Step-by-Step Execution Profile:
              </span>
              <div className="space-y-1.5 font-mono text-xs">
                {selectedLog.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-background border border-border flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-gold text-[10px]">0{idx + 1}.</span>
                      <span className="text-foreground">{step.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground text-[10px]">{step.duration}</span>
                      <span
                        className={`text-[9px] uppercase px-1.5 py-0.2 border ${
                          step.status === "success"
                            ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
                            : "text-rose-400 bg-rose-500/10 border-rose-500/30"
                        }`}
                      >
                        {step.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-background border border-border text-xs font-mono text-muted-foreground">
              <span className="text-foreground block font-bold mb-1">Payload Summary:</span>
              <p>{selectedLog.payloadSummary}</p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
              <button
                type="button"
                onClick={() => setSelectedLog(null)}
                className="px-4 py-2 bg-surface-2 border border-border hover:border-gold text-xs font-mono uppercase text-foreground"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
