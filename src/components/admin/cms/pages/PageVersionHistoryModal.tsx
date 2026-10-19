import { useState } from "react";
import { X, History, RotateCcw, AlertTriangle, Check, Calendar, User } from "lucide-react";
import { toast } from "sonner";
import type { PageVersion } from "../pages-types";

interface PageVersionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  pageName: string;
  versions: PageVersion[];
  onRestore: (version: PageVersion) => void;
}

export function PageVersionHistoryModal({
  isOpen,
  onClose,
  pageName,
  versions,
  onRestore,
}: PageVersionHistoryModalProps) {
  const [confirmVersion, setConfirmVersion] = useState<PageVersion | null>(null);

  if (!isOpen) return null;

  const handleConfirmRestore = () => {
    if (confirmVersion) {
      onRestore(confirmVersion);
      toast.success(`Restored ${pageName} to ${confirmVersion.version}`, {
        description: `Draft state updated with snapshot by ${confirmVersion.author}.`,
      });
      setConfirmVersion(null);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in-soft">
      <div className="w-full max-w-2xl bg-surface border border-border shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border bg-surface-2/40">
          <div className="flex items-center gap-2">
            <div className="size-8 border border-gold/40 bg-gold/10 text-gold flex items-center justify-center">
              <History className="size-4" />
            </div>
            <div>
              <h3 className="text-base font-display font-medium text-foreground uppercase tracking-wider">
                Version History — {pageName}
              </h3>
              <p className="text-xs text-muted-foreground">
                Inspect past revisions, author audit trails, and restore snapshots.
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
        <div className="p-6 space-y-4 overflow-y-auto custom-scrollbar flex-1">
          {versions.length === 0 ? (
            <div className="p-8 text-center border border-dashed border-border space-y-2">
              <History className="size-8 text-muted-foreground mx-auto" />
              <p className="text-xs font-mono text-muted-foreground">
                No historical versions recorded for this page yet.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {versions.map((ver, idx) => (
                <div
                  key={ver.id}
                  className={`p-4 border transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    idx === 0
                      ? "bg-gold/5 border-gold/40"
                      : "bg-surface-2/40 border-border hover:border-border/80"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-gold px-2 py-0.5 bg-gold/10 border border-gold/30">
                        {ver.version}
                      </span>
                      {idx === 0 && (
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/30">
                          CURRENT DRAFT / REVISION
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-foreground font-medium">{ver.summary}</p>
                    <div className="flex items-center gap-4 text-[11px] text-muted-foreground font-mono pt-1">
                      <span className="flex items-center gap-1">
                        <User className="size-3" /> {ver.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3" /> {ver.updatedAt}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {idx !== 0 && (
                      <button
                        type="button"
                        onClick={() => setConfirmVersion(ver)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-surface-2 text-foreground border border-border hover:border-gold hover:text-gold transition-colors"
                      >
                        <RotateCcw className="size-3" /> Restore Snapshot
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Restore Confirmation Modal Layer */}
        {confirmVersion && (
          <div className="p-5 bg-amber-500/10 border-t border-amber-500/30 space-y-3 animate-fade-in-soft">
            <div className="flex items-start gap-3">
              <AlertTriangle className="size-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-amber-200 uppercase tracking-wider">
                  Confirm Version Rollback
                </p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  Are you sure you want to restore{" "}
                  <strong className="text-foreground">{pageName}</strong> to revision{" "}
                  <strong className="text-gold">{confirmVersion.version}</strong>? Unsaved draft
                  modifications in the current editor session will be replaced by this historical
                  snapshot.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setConfirmVersion(null)}
                className="px-3 py-1.5 text-xs font-mono text-muted-foreground hover:text-foreground border border-border"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmRestore}
                className="px-3 py-1.5 bg-amber-500 text-black font-semibold text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors inline-flex items-center gap-1.5"
              >
                <Check className="size-3.5" /> Confirm & Overwrite Draft
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t border-border bg-surface-2/40 flex items-center justify-between">
          <span className="text-[11px] font-mono text-muted-foreground">
            {versions.length} historical revision logs captured
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-surface-2 text-foreground text-xs font-mono border border-border hover:border-foreground"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
