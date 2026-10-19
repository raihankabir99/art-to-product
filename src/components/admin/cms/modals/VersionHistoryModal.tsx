import { History, Check, RotateCcw, Eye, ArrowRight, X } from "lucide-react";
import type { HomepageVersion } from "../homepage-types";
import { toast } from "sonner";

interface VersionHistoryModalProps {
  open: boolean;
  onClose: () => void;
  versions: HomepageVersion[];
  onRestore: (versionId: string) => void;
}

export function VersionHistoryModal({
  open,
  onClose,
  versions,
  onRestore,
}: VersionHistoryModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface border border-border w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl animate-fade-in-soft">
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-gold/10 border border-gold/30 text-gold">
              <History className="size-4" />
            </div>
            <div>
              <h3 className="text-sm font-display font-medium text-foreground">
                Homepage Version History & Rollback
              </h3>
              <p className="text-[11px] text-muted-foreground font-mono">
                Audit trail of all published snapshots and release checkpoints.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-surface-2"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Versions List */}
        <div className="p-4 space-y-3 overflow-y-auto flex-1">
          {versions.map((ver, idx) => (
            <div
              key={ver.id}
              className={`p-4 border transition-colors ${
                ver.status === "published"
                  ? "bg-gold/5 border-gold/40"
                  : "bg-surface-2 border-border hover:border-zinc-700"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-foreground">
                      {ver.version}
                    </span>
                    {ver.status === "published" && (
                      <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[9px] font-mono uppercase tracking-wider">
                        Live Snapshot
                      </span>
                    )}
                    {ver.status === "draft" && (
                      <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[9px] font-mono uppercase tracking-wider">
                        Staging Draft
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-300 mt-1.5">{ver.note}</p>
                  <div className="flex items-center gap-3 text-[10px] font-mono text-muted-foreground mt-2">
                    <span>{ver.timestamp}</span>
                    <span>•</span>
                    <span>By {ver.author}</span>
                    <span>•</span>
                    <span>{ver.sectionsCount} Sections</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {ver.status !== "published" && (
                    <button
                      type="button"
                      onClick={() => {
                        onRestore(ver.id);
                        onClose();
                      }}
                      className="px-3 py-1.5 bg-surface border border-gold/40 hover:bg-gold hover:text-background text-xs font-mono text-gold flex items-center gap-1.5 transition-colors"
                    >
                      <RotateCcw className="size-3" /> Restore
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 bg-surface-2 border-t border-border flex items-center justify-between text-xs font-mono text-muted-foreground">
          <span>Snapshots are immutable and verified.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 bg-surface border border-border text-foreground hover:bg-surface-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
