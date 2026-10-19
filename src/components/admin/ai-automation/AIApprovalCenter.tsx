import React, { useState } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Edit3,
  Clock,
  Sparkles,
  Search,
  Filter,
  CheckCheck,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { AI_APPROVALS_DATA } from "./ai-mock-data";
import { AIApprovalItem, ApprovalType } from "./types";
import { toast } from "sonner";

export function AIApprovalCenter() {
  const [approvals, setApprovals] = useState<AIApprovalItem[]>(AI_APPROVALS_DATA);
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedItem, setSelectedItem] = useState<AIApprovalItem | null>(AI_APPROVALS_DATA[0]);
  const [editingContent, setEditingContent] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);

  const filtered = approvals.filter((a) => selectedType === "All" || a.type === selectedType);

  const handleApprove = (id: string) => {
    setApprovals((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "Approved" } : item)),
    );
    toast.success("AI Action Approved & Deployed to Live Storefront", {
      description: `Item ${id} synchronized.`,
    });
  };

  const handleReject = (id: string) => {
    setApprovals((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "Rejected" } : item)),
    );
    toast.error("AI Generated Item Rejected", {
      description: `Feedback routed to model alignment log.`,
    });
  };

  const handleApproveAll = () => {
    setApprovals((prev) => prev.map((item) => ({ ...item, status: "Approved" })));
    toast.success("All Pending AI Actions Approved & Synchronized");
  };

  return (
    <div className="space-y-6 animate-fade-in-soft">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-surface border border-border">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-5 text-gold" />
            <h2 className="text-xl font-display font-medium text-foreground uppercase tracking-wider">
              AI APPROVALS (HUMAN-IN-THE-LOOP)
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mt-1 font-sans">
            Enterprise governance review gate ensuring every AI generation meets luxury
            craftsmanship, brand tone, and SEO standards prior to publication.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-gold bg-gold/10 px-3 py-1.5 border border-gold/30">
            {approvals.filter((a) => a.status === "Pending").length} Items Pending Review
          </span>

          <button
            type="button"
            onClick={handleApproveAll}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-500 text-black font-semibold text-xs uppercase tracking-wider hover:bg-emerald-400 transition-colors"
          >
            <CheckCheck className="size-4" />
            Approve All
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 bg-surface border border-border p-2">
        {[
          "All",
          "Blog Draft",
          "SEO Metadata",
          "Product Description",
          "Marketing Caption",
          "Customer Reply",
          "Translation",
        ].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setSelectedType(t)}
            className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap ${
              selectedType === t
                ? "bg-gold text-background font-bold"
                : "bg-surface-2 text-muted-foreground hover:text-foreground border border-border"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* 2-Column Split Review Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT: Approval Queue List (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          {filtered.map((item) => {
            const isSelected = selectedItem?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedItem(item);
                  setIsEditing(false);
                }}
                className={`p-4 border transition-all cursor-pointer space-y-2 relative group ${
                  isSelected
                    ? "bg-surface border-gold ring-1 ring-gold shadow-md shadow-gold/5"
                    : "bg-surface/80 border-border hover:border-gold/60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-gold bg-gold/10 px-2 py-0.5 border border-gold/30 uppercase">
                    {item.type}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {item.createdAt}
                    </span>
                    <span
                      className={`text-[9px] font-mono uppercase px-1.5 py-0.2 border ${
                        item.status === "Approved"
                          ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
                          : item.status === "Rejected"
                            ? "text-rose-400 bg-rose-500/10 border-rose-500/30"
                            : "text-amber-400 bg-amber-500/10 border-amber-500/30"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>

                <h3 className="text-xs font-semibold font-display tracking-wider text-foreground uppercase group-hover:text-gold transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] font-mono text-muted-foreground">{item.targetEntity}</p>

                <p className="text-xs text-muted-foreground line-clamp-2">{item.summary}</p>

                <div className="pt-2 border-t border-border/60 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-emerald-400">Confidence: {item.confidence}%</span>
                  <span className="text-muted-foreground">{item.author}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT: Detailed Review & Inspection Stage (7 Cols) */}
        <div className="lg:col-span-7 p-6 bg-surface border border-border space-y-6">
          {selectedItem ? (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-gold bg-gold/10 px-2 py-0.5 border border-gold/30 uppercase">
                      {selectedItem.type}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">
                      Model: {selectedItem.model}
                    </span>
                  </div>
                  <h2 className="text-base font-display font-medium text-foreground uppercase tracking-wide mt-1">
                    {selectedItem.title}
                  </h2>
                  <p className="text-xs font-mono text-muted-foreground">
                    {selectedItem.targetEntity}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-sm font-mono text-emerald-400 font-bold">
                    {selectedItem.confidence}% Confidence
                  </span>
                  <span className="text-[10px] text-muted-foreground block font-mono">
                    {selectedItem.createdAt}
                  </span>
                </div>
              </div>

              {/* Diff / Proposed Content Area */}
              <div className="space-y-4">
                {selectedItem.generatedContent.original && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-muted-foreground block">
                      Existing / Original Content
                    </span>
                    <div className="p-3 bg-background border border-border text-xs text-muted-foreground font-mono">
                      {selectedItem.generatedContent.original}
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase text-gold block">
                      AI Generated Proposed Revision
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        if (!isEditing) {
                          setEditingContent(selectedItem.generatedContent.proposed);
                        }
                        setIsEditing(!isEditing);
                      }}
                      className="text-[11px] font-mono text-gold hover:underline flex items-center gap-1"
                    >
                      <Edit3 className="size-3" /> {isEditing ? "Cancel Edit" : "Quick Edit"}
                    </button>
                  </div>

                  {isEditing ? (
                    <textarea
                      rows={6}
                      value={editingContent}
                      onChange={(e) => setEditingContent(e.target.value)}
                      className="w-full p-3 bg-surface-2 border border-gold text-xs text-foreground font-mono leading-relaxed focus:outline-none"
                    />
                  ) : (
                    <div className="p-4 bg-surface-2 border border-border text-xs text-foreground leading-relaxed font-sans">
                      {selectedItem.generatedContent.proposed}
                    </div>
                  )}
                </div>

                {selectedItem.generatedContent.diffNotes && (
                  <div className="p-3 bg-background border border-border text-[11px] font-mono text-muted-foreground">
                    <span className="text-gold font-bold">Editorial Notes: </span>
                    {selectedItem.generatedContent.diffNotes}
                  </div>
                )}
              </div>

              {/* Action Controls */}
              <div className="pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => handleReject(selectedItem.id)}
                  className="px-4 py-2 bg-surface-2 hover:bg-rose-500/10 border border-border hover:border-rose-500/30 text-rose-400 text-xs font-mono uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                >
                  <XCircle className="size-3.5" /> Reject Revision
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      toast.success("Changes saved to staged draft");
                      setIsEditing(false);
                    }}
                    className="px-4 py-2 bg-surface-2 border border-border hover:border-gold text-xs font-mono uppercase text-foreground transition-colors flex items-center gap-1.5"
                  >
                    <Edit3 className="size-3.5" /> Save Modified
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApprove(selectedItem.id)}
                    className="px-5 py-2 bg-gold text-background hover:bg-foreground hover:text-background font-semibold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <CheckCircle2 className="size-3.5" /> Approve & Publish
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">Select an item to inspect.</p>
          )}
        </div>
      </div>
    </div>
  );
}
