import { X, Send, Sparkles, CheckCircle2, User, Clock, FileText } from "lucide-react";
import type { PageItem } from "../pages-types";

interface PagePublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  page: PageItem;
  changesCount?: number;
  onConfirmPublish: () => void;
}

export function PagePublishModal({
  isOpen,
  onClose,
  page,
  changesCount = 6,
  onConfirmPublish,
}: PagePublishModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in-soft">
      <div className="w-full max-w-lg bg-surface border border-border shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border bg-surface-2/40">
          <div className="flex items-center gap-2">
            <div className="size-8 border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Send className="size-4" />
            </div>
            <div>
              <h3 className="text-base font-display font-medium text-foreground uppercase tracking-wider">
                Ready to Publish Page
              </h3>
              <p className="text-xs text-muted-foreground">
                Review publication deployment summary before edge CDN sync.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-surface-2 transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="p-4 bg-surface-2/60 border border-border space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="size-4 text-gold" />
                <span className="text-sm font-semibold text-foreground">{page.name}</span>
              </div>
              <span className="text-xs font-mono text-gold bg-gold/10 px-2 py-0.5 border border-gold/30">
                {page.slug}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono text-muted-foreground border-t border-border/60 pt-3">
              <div>
                <span className="block text-[10px] uppercase text-muted-foreground/70">
                  Staged Changes
                </span>
                <span className="text-foreground font-semibold">{changesCount} edits queued</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase text-muted-foreground/70">Author</span>
                <span className="text-foreground font-semibold flex items-center gap-1">
                  <User className="size-3 text-gold" /> {page.author || "Admin Editor"}
                </span>
              </div>
              <div>
                <span className="block text-[10px] uppercase text-muted-foreground/70">
                  Publish Mode
                </span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="size-3" /> Immediate Edge Deployment
                </span>
              </div>
              <div>
                <span className="block text-[10px] uppercase text-muted-foreground/70">
                  Visibility
                </span>
                <span className="text-foreground font-semibold">{page.visibility || "Public"}</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Publishing will sync this revision directly to the live storefront cache and update
            search engine sitemaps immediately.
          </p>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-surface-2/40 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground border border-border"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirmPublish();
              onClose();
            }}
            className="px-5 py-2 bg-emerald-500 text-black font-semibold text-xs uppercase tracking-wider hover:bg-emerald-400 transition-colors inline-flex items-center gap-2"
          >
            <Send className="size-3.5" /> Confirm & Publish Live
          </button>
        </div>
      </div>
    </div>
  );
}
