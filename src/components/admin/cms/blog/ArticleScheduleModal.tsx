import { useState } from "react";
import { X, Calendar as CalendarIcon, Clock, Globe, Check, CalendarCheck } from "lucide-react";
import { toast } from "sonner";

interface ArticleScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmSchedule: (date: string, time: string, timezone: string) => void;
  currentDate?: string;
  currentTime?: string;
  currentTimezone?: string;
  articleTitle: string;
}

export function ArticleScheduleModal({
  isOpen,
  onClose,
  onConfirmSchedule,
  currentDate = "2026-09-01",
  currentTime = "09:00",
  currentTimezone = "CET (Berlin)",
  articleTitle,
}: ArticleScheduleModalProps) {
  const [date, setDate] = useState<string>(currentDate);
  const [time, setTime] = useState<string>(currentTime);
  const [timezone, setTimezone] = useState<string>(currentTimezone);

  if (!isOpen) return null;

  const handleSave = () => {
    onConfirmSchedule(date, time, timezone);
    toast.success("Article Release Scheduled!", {
      description: `Scheduled to publish on ${date} at ${time} ${timezone}`,
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in-soft"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-surface border border-border-strong shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-border bg-surface-2/60">
          <div className="flex items-center gap-2">
            <CalendarCheck className="size-4 text-gold" />
            <h3 className="text-sm font-display font-medium text-foreground uppercase tracking-wider">
              Schedule Article Release
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-muted-foreground hover:text-foreground border border-border hover:border-gold/50"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs">
          <div className="p-3 bg-surface-2 border border-border/80 space-y-1">
            <span className="text-[10px] font-mono text-muted-foreground uppercase">
              Target Article
            </span>
            <p className="font-semibold text-foreground truncate">{articleTitle}</p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="font-mono text-muted-foreground uppercase text-[10px] block mb-1 flex items-center gap-1.5">
                <CalendarIcon className="size-3 text-gold" /> Release Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-mono text-muted-foreground uppercase text-[10px] block mb-1 flex items-center gap-1.5">
                  <Clock className="size-3 text-gold" /> Release Time
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold font-mono"
                />
              </div>

              <div>
                <label className="font-mono text-muted-foreground uppercase text-[10px] block mb-1 flex items-center gap-1.5">
                  <Globe className="size-3 text-gold" /> Timezone
                </label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
                >
                  <option value="CET (Berlin/Paris)">CET (Berlin/Paris)</option>
                  <option value="GMT (London)">GMT (London)</option>
                  <option value="EST (New York)">EST (New York)</option>
                  <option value="PST (Los Angeles)">PST (Los Angeles)</option>
                  <option value="AST (Riyadh)">AST (Riyadh)</option>
                  <option value="GST (Dubai)">GST (Dubai)</option>
                  <option value="JST (Tokyo)">JST (Tokyo)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="p-3 bg-surface-2/80 border border-gold/30 flex items-center justify-between font-mono text-[11px]">
            <span className="text-muted-foreground">Scheduled Slot:</span>
            <span className="text-gold font-semibold">
              {date} @ {time} {timezone.split(" ")[0]}
            </span>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-border text-xs uppercase font-mono text-muted-foreground hover:text-foreground"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 bg-gold text-background text-xs uppercase font-mono font-bold hover:bg-foreground hover:text-background flex items-center gap-1.5 transition-colors"
            >
              <Check className="size-3.5" /> Confirm Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
