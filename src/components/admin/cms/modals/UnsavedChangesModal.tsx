import { AlertTriangle, Save, Trash2, X } from "lucide-react";

interface UnsavedChangesModalProps {
  open: boolean;
  onContinueEditing: () => void;
  onDiscard: () => void;
  onSaveDraft: () => void;
}

export function UnsavedChangesModal({
  open,
  onContinueEditing,
  onDiscard,
  onSaveDraft,
}: UnsavedChangesModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface border border-border w-full max-w-md shadow-2xl animate-fade-in-soft p-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
            <AlertTriangle className="size-5" />
          </div>
          <div>
            <h3 className="text-sm font-display font-medium text-foreground">
              Unsaved Homepage Changes
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              You have modified homepage section order or typography settings. Leaving now will
              discard unpublished adjustments.
            </p>
          </div>
        </div>

        <div className="pt-3 flex flex-col sm:flex-row items-center justify-end gap-2 border-t border-border">
          <button
            type="button"
            onClick={onContinueEditing}
            className="w-full sm:w-auto px-3 py-1.5 text-xs font-mono bg-surface border border-border text-foreground hover:bg-surface-2"
          >
            Continue Editing
          </button>
          <button
            type="button"
            onClick={onDiscard}
            className="w-full sm:w-auto px-3 py-1.5 text-xs font-mono bg-red-950/20 border border-red-900/40 text-red-400 hover:bg-red-900/40"
          >
            Discard Changes
          </button>
          <button
            type="button"
            onClick={onSaveDraft}
            className="w-full sm:w-auto px-4 py-1.5 text-xs font-mono bg-gold text-background font-semibold hover:bg-white transition-colors"
          >
            Save Draft
          </button>
        </div>
      </div>
    </div>
  );
}
