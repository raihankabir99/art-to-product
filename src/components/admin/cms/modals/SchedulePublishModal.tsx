import { useState } from "react";
import { Calendar, Clock, Sparkles, X, Check } from "lucide-react";
import { toast } from "sonner";

interface SchedulePublishModalProps {
  open: boolean;
  onClose: () => void;
  onConfirmSchedule: (date: string, time: string) => void;
}

export function SchedulePublishModal({
  open,
  onClose,
  onConfirmSchedule,
}: SchedulePublishModalProps) {
  const [scheduledDate, setScheduledDate] = useState("2026-08-28");
  const [scheduledTime, setScheduledTime] = useState("09:00");
  const [notifySubscribers, setNotifySubscribers] = useState(true);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface border border-border w-full max-w-lg shadow-2xl animate-fade-in-soft">
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-gold/10 border border-gold/30 text-gold">
              <Calendar className="size-4" />
            </div>
            <div>
              <h3 className="text-sm font-display font-medium text-foreground">
                Schedule Homepage Drop Release
              </h3>
              <p className="text-[11px] text-muted-foreground font-mono">
                Automate publishing at precise UTC release windows.
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

        {/* Body */}
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
                Release Date
              </label>
              <input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground font-mono focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
                Release Time (UTC)
              </label>
              <input
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground font-mono focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <div className="p-3 bg-surface-2 border border-border space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-gold font-mono">
              <Clock className="size-3.5" /> Drop Timezone Verification
            </div>
            <p className="text-[11px] text-zinc-300">
              The storefront will automatically switch to this version at{" "}
              <strong>
                {scheduledTime} UTC on {scheduledDate}
              </strong>{" "}
              without server downtime.
            </p>
          </div>

          <label className="flex items-center gap-2 text-xs text-foreground cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={notifySubscribers}
              onChange={(e) => setNotifySubscribers(e.target.checked)}
              className="accent-gold size-3.5 rounded-none"
            />
            <span>Broadcast email notification to VIP patrons at release moment</span>
          </label>
        </div>

        {/* Footer */}
        <div className="p-4 bg-surface-2 border-t border-border flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-mono text-muted-foreground hover:text-foreground"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirmSchedule(scheduledDate, scheduledTime);
              onClose();
            }}
            className="px-4 py-1.5 bg-gold text-background text-xs font-mono uppercase tracking-wider font-semibold hover:bg-white transition-colors"
          >
            Confirm Schedule
          </button>
        </div>
      </div>
    </div>
  );
}
