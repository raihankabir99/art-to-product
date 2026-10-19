import { useState } from "react";
import { X, Calendar, Clock, Globe, Check, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface PageScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  pageName: string;
  initialPublishDate?: string;
  initialUnpublishDate?: string;
  initialTimezone?: string;
  onSchedule: (publishDate?: string, unpublishDate?: string, timezone?: string) => void;
}

export function PageScheduleModal({
  isOpen,
  onClose,
  pageName,
  initialPublishDate = "2026-09-01T09:00",
  initialUnpublishDate = "",
  initialTimezone = "UTC+01:00 (Europe/Berlin)",
  onSchedule,
}: PageScheduleModalProps) {
  const [publishDate, setPublishDate] = useState(initialPublishDate);
  const [unpublishDate, setUnpublishDate] = useState(initialUnpublishDate);
  const [timezone, setTimezone] = useState(initialTimezone);

  if (!isOpen) return null;

  const handleSave = () => {
    onSchedule(publishDate, unpublishDate, timezone);
    toast.success(`Schedule configured for ${pageName}`, {
      description: publishDate
        ? `Automated publish set for ${publishDate.replace("T", " ")} (${timezone})`
        : "Automated publishing cleared.",
    });
    onClose();
  };

  const handleClear = () => {
    setPublishDate("");
    setUnpublishDate("");
    onSchedule("", "", timezone);
    toast.info(`Schedule cleared for ${pageName}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in-soft">
      <div className="w-full max-w-lg bg-surface border border-border shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border bg-surface-2/40">
          <div className="flex items-center gap-2">
            <div className="size-8 border border-gold/40 bg-gold/10 text-gold flex items-center justify-center">
              <Calendar className="size-4" />
            </div>
            <div>
              <h3 className="text-base font-display font-medium text-foreground uppercase tracking-wider">
                Automated Page Scheduling
              </h3>
              <p className="text-xs text-muted-foreground">{pageName}</p>
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
        <div className="p-6 space-y-5">
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-1.5 flex items-center gap-1.5">
              <Clock className="size-3.5 text-gold" /> Schedule Automated Publication Date & Time
            </label>
            <input
              type="datetime-local"
              value={publishDate}
              onChange={(e) => setPublishDate(e.target.value)}
              className="w-full px-3 py-2 bg-surface-2 border border-border text-xs font-mono text-gold focus:outline-none focus:border-gold"
            />
            <p className="text-[11px] text-muted-foreground mt-1">
              The page status will automatically transition to <strong>Published</strong> at this
              exact timestamp.
            </p>
          </div>

          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-1.5 flex items-center gap-1.5">
              <Clock className="size-3.5 text-amber-400" /> Schedule Automated Unpublish / Archival
              Date (Optional)
            </label>
            <input
              type="datetime-local"
              value={unpublishDate}
              onChange={(e) => setUnpublishDate(e.target.value)}
              className="w-full px-3 py-2 bg-surface-2 border border-border text-xs font-mono text-foreground focus:outline-none focus:border-gold"
            />
            <p className="text-[11px] text-muted-foreground mt-1">
              Useful for seasonal campaign landing pages or flash promotional offers.
            </p>
          </div>

          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-1.5 flex items-center gap-1.5">
              <Globe className="size-3.5 text-gold" /> Target Timezone
            </label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
            >
              <option value="UTC+01:00 (Europe/Berlin)">UTC+01:00 (Europe/Berlin / London)</option>
              <option value="UTC-05:00 (America/New_York)">UTC-05:00 (America/New York)</option>
              <option value="UTC-08:00 (America/Los_Angeles)">
                UTC-08:00 (America/Los Angeles)
              </option>
              <option value="UTC+09:00 (Asia/Tokyo)">UTC+09:00 (Asia/Tokyo)</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-surface-2/40 flex items-center justify-between">
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-red-400 border border-red-500/20 hover:bg-red-500/10 transition-colors"
          >
            <Trash2 className="size-3.5" /> Clear Schedule
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-mono text-muted-foreground hover:text-foreground border border-border"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gold text-background font-semibold text-xs uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors"
            >
              <Check className="size-3.5" /> Save Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
