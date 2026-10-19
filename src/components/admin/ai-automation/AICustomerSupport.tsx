import React, { useState } from "react";
import {
  MessageSquare,
  Sparkles,
  User,
  ShieldCheck,
  Send,
  RefreshCw,
  Edit3,
  XCircle,
  Clock,
  CheckCircle2,
  Package,
  AlertCircle,
} from "lucide-react";
import { CUSTOMER_SUPPORT_DATA } from "./ai-mock-data";
import { CustomerInquiry } from "./types";
import { toast } from "sonner";

export function AICustomerSupport() {
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>(CUSTOMER_SUPPORT_DATA);
  const [selectedInquiryId, setSelectedInquiryId] = useState<string>(CUSTOMER_SUPPORT_DATA[0].id);
  const [isEditingReply, setIsEditingReply] = useState(false);
  const [draftReply, setDraftReply] = useState(CUSTOMER_SUPPORT_DATA[0].aiSuggestedReply);
  const [isGenerating, setIsGenerating] = useState(false);

  const selectedInquiry = inquiries.find((i) => i.id === selectedInquiryId) || inquiries[0];

  const handleSelectInquiry = (inquiry: CustomerInquiry) => {
    setSelectedInquiryId(inquiry.id);
    setDraftReply(inquiry.aiSuggestedReply);
    setIsEditingReply(false);
  };

  const handleRegenerate = (tone: string) => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      let newReply = selectedInquiry.aiSuggestedReply;
      if (tone === "concise") {
        newReply = `Hello ${selectedInquiry.customerName}, regarding order ${selectedInquiry.orderNumber || "inquiry"}: our 400gsm French Terry hoodies are pre-shrunk and true to size. Delivery to your address is on track.`;
      } else if (tone === "formal") {
        newReply = `Dear ${selectedInquiry.customerName}, on behalf of Studio Noir Atelier, we are pleased to confirm that all garments are pre-washed and tailored to architectural specifications. Your satisfaction is our utmost priority.`;
      }
      setDraftReply(newReply);
      toast.success("AI Customer Support Regenerated Response", {
        description: `Tone calibrated to ${tone}.`,
      });
    }, 600);
  };

  const handleSendResponse = () => {
    toast.success("Response Approved & Dispatched to Patron", {
      description: `Sent to ${selectedInquiry.customerEmail}`,
    });
    setInquiries((prev) =>
      prev.map((item) => (item.id === selectedInquiry.id ? { ...item, status: "Resolved" } : item)),
    );
  };

  return (
    <div className="space-y-6 animate-fade-in-soft">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-surface border border-border">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare className="size-5 text-gold" />
            <h2 className="text-xl font-display font-medium text-foreground uppercase tracking-wider">
              AI Customer Support & Atelier Concierge
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mt-1 font-sans">
            AI-assisted patron concierge combining live POD fulfillment telemetry, carrier tracking
            APIs, and fabric care guidance.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-3 py-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1.5">
            <AlertCircle className="size-3.5" /> No Auto-Dispatch • Human Approval Required
          </span>
        </div>
      </div>

      {/* 3-Panel Split Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* PANEL 1: CONVERSATION INBOX (4 Cols) */}
        <div className="lg:col-span-4 p-4 bg-surface border border-border space-y-3">
          <div className="flex items-center justify-between border-b border-border pb-2 px-1">
            <h3 className="text-xs font-semibold font-display uppercase tracking-wider text-foreground">
              Active Patron Inquiries
            </h3>
            <span className="text-[10px] font-mono text-gold bg-gold/10 px-2 py-0.5 border border-gold/30">
              3 Pending
            </span>
          </div>

          <div className="space-y-2">
            {inquiries.map((inq) => {
              const isSelected = inq.id === selectedInquiry.id;
              return (
                <div
                  key={inq.id}
                  onClick={() => handleSelectInquiry(inq)}
                  className={`p-3.5 border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? "bg-surface-2 border-gold ring-1 ring-gold/30"
                      : "bg-background border-border hover:border-gold/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground font-display uppercase">
                      {inq.customerName}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {inq.lastMessageTime}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] font-mono">
                    <span className="text-gold bg-gold/10 px-1.5 py-0.5 border border-gold/20">
                      {inq.tier}
                    </span>
                    {inq.orderNumber && (
                      <span className="text-muted-foreground">{inq.orderNumber}</span>
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {inq.conversation[inq.conversation.length - 1].message}
                  </p>

                  <div className="pt-1.5 border-t border-border/50 flex items-center justify-between text-[10px] font-mono">
                    <span
                      className={`${
                        inq.status === "Resolved"
                          ? "text-emerald-400"
                          : inq.status === "Awaiting Human"
                            ? "text-amber-400"
                            : "text-sky-400"
                      }`}
                    >
                      ● {inq.status}
                    </span>
                    <span className="text-muted-foreground">{inq.aiConfidence}% AI Conf</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* PANEL 2: CONVERSATION THREAD (4 Cols) */}
        <div className="lg:col-span-4 p-5 bg-surface border border-border space-y-4 flex flex-col justify-between min-h-[520px]">
          <div className="space-y-4">
            {/* Conversation Header */}
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h3 className="text-xs font-bold font-display uppercase tracking-wider text-foreground">
                  {selectedInquiry.customerName}
                </h3>
                <span className="text-[11px] font-mono text-muted-foreground">
                  {selectedInquiry.customerEmail}
                </span>
              </div>
              {selectedInquiry.orderNumber && (
                <span className="text-xs font-mono text-gold border border-gold/30 bg-gold/10 px-2 py-1 flex items-center gap-1">
                  <Package className="size-3" /> {selectedInquiry.orderNumber}
                </span>
              )}
            </div>

            {/* Chat Bubble Thread */}
            <div className="space-y-3 py-2">
              {selectedInquiry.conversation.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    msg.sender === "customer" ? "items-start" : "items-end"
                  }`}
                >
                  <div
                    className={`p-3.5 max-w-[90%] text-xs leading-relaxed ${
                      msg.sender === "customer"
                        ? "bg-surface-2 border border-border text-foreground"
                        : "bg-gold text-background font-semibold"
                    }`}
                  >
                    <p>{msg.message}</p>
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground mt-1 px-1">
                    {msg.sender === "customer" ? "Patron" : "Atelier Support"} • {msg.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-background border border-border text-[11px] font-mono text-muted-foreground flex items-center justify-between">
            <span>SLA Target: 15 mins</span>
            <span className="text-emerald-400">Within Threshold</span>
          </div>
        </div>

        {/* PANEL 3: AI SUGGESTION & APPROVAL PANEL (4 Cols) */}
        <div className="lg:col-span-4 p-5 bg-surface border border-border space-y-4 flex flex-col justify-between min-h-[520px]">
          <div className="space-y-4">
            {/* Header with strict notice */}
            <div className="border-b border-border pb-3 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold font-display uppercase tracking-wider text-foreground flex items-center gap-1.5">
                  <Sparkles className="size-3.5 text-gold" />
                  AI Suggested Response
                </span>
                <span className="text-[10px] font-mono text-gold bg-gold/10 px-2 py-0.5 border border-gold/30">
                  {selectedInquiry.aiConfidence}% Match
                </span>
              </div>
              <p className="text-[10px] font-mono uppercase text-amber-400">
                AI GENERATED RESPONSE • PENDING HUMAN APPROVAL
              </p>
            </div>

            {/* AI Generated Content Box */}
            <div className="p-4 bg-surface-2 border border-border text-xs text-foreground font-sans relative">
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-2">
                  <RefreshCw className="size-5 text-gold animate-spin" />
                  <span className="text-xs font-mono text-gold">Synthesizing reply...</span>
                </div>
              ) : isEditingReply ? (
                <textarea
                  rows={8}
                  value={draftReply}
                  onChange={(e) => setDraftReply(e.target.value)}
                  className="w-full bg-background p-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold resize-none leading-relaxed"
                />
              ) : (
                <p className="leading-relaxed">{draftReply}</p>
              )}
            </div>

            {/* AI Contextual Notes */}
            {selectedInquiry.aiSuggestedAction && (
              <div className="p-3 bg-background border border-border/80 text-[11px] font-mono text-muted-foreground flex items-center gap-2">
                <ShieldCheck className="size-3.5 text-gold shrink-0" />
                <span>Context: {selectedInquiry.aiSuggestedAction}</span>
              </div>
            )}

            {/* Tone Switchers */}
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground">
              <span>Tone:</span>
              <button
                type="button"
                onClick={() => handleRegenerate("concise")}
                className="px-2 py-0.5 bg-surface-2 border border-border hover:border-gold text-foreground"
              >
                Concise
              </button>
              <button
                type="button"
                onClick={() => handleRegenerate("formal")}
                className="px-2 py-0.5 bg-surface-2 border border-border hover:border-gold text-foreground"
              >
                Formal Luxury
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-border space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setIsEditingReply(!isEditingReply)}
                className="py-2 bg-surface-2 border border-border hover:border-gold text-xs font-mono uppercase text-foreground transition-colors flex items-center justify-center gap-1.5"
              >
                <Edit3 className="size-3.5" />
                {isEditingReply ? "Preview" : "Edit Response"}
              </button>

              <button
                type="button"
                onClick={() => handleRegenerate("concise")}
                disabled={isGenerating}
                className="py-2 bg-surface-2 border border-border hover:border-gold text-xs font-mono uppercase text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="size-3.5" />
                Regenerate
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => toast.info("AI Suggested Response Ignored")}
                className="py-2 bg-surface-2 border border-border text-xs font-mono uppercase text-muted-foreground hover:text-rose-400 transition-colors flex items-center justify-center gap-1.5"
              >
                <XCircle className="size-3.5" />
                Ignore
              </button>

              <button
                type="button"
                onClick={handleSendResponse}
                className="py-2 bg-gold text-background hover:bg-foreground hover:text-background font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
              >
                <Send className="size-3.5" />
                Use Response
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
