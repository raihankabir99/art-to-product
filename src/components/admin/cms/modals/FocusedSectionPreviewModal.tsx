import { useState } from "react";
import { Monitor, Tablet, Smartphone, X, Maximize2, Sparkles } from "lucide-react";
import type { HomepageSection, DeviceMode } from "../homepage-types";
import { LiveSectionRenderer } from "../preview/LiveSectionRenderer";

interface FocusedSectionPreviewModalProps {
  open: boolean;
  section: HomepageSection | null;
  onClose: () => void;
}

export function FocusedSectionPreviewModal({
  open,
  section,
  onClose,
}: FocusedSectionPreviewModalProps) {
  const [device, setDevice] = useState<DeviceMode>("desktop");

  if (!open || !section) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col p-4 sm:p-6">
      {/* Top Modal Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono uppercase tracking-wider text-gold bg-gold/10 px-2 py-0.5 border border-gold/30">
            Focused Block Preview
          </span>
          <span className="text-sm font-display font-medium text-foreground">{section.name}</span>
        </div>

        {/* Viewport device switcher */}
        <div className="flex items-center gap-1 bg-surface border border-border p-1">
          <button
            type="button"
            onClick={() => setDevice("desktop")}
            className={`px-3 py-1 text-xs font-mono flex items-center gap-1.5 transition-colors ${
              device === "desktop"
                ? "bg-gold text-background font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Monitor className="size-3.5" /> Desktop (1440px)
          </button>
          <button
            type="button"
            onClick={() => setDevice("tablet")}
            className={`px-3 py-1 text-xs font-mono flex items-center gap-1.5 transition-colors ${
              device === "tablet"
                ? "bg-gold text-background font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Tablet className="size-3.5" /> Tablet (768px)
          </button>
          <button
            type="button"
            onClick={() => setDevice("mobile")}
            className={`px-3 py-1 text-xs font-mono flex items-center gap-1.5 transition-colors ${
              device === "mobile"
                ? "bg-gold text-background font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Smartphone className="size-3.5" /> Mobile (375px)
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-2 text-muted-foreground hover:text-foreground hover:bg-surface-2"
        >
          <X className="size-5" />
        </button>
      </div>

      {/* Frame Container */}
      <div className="flex-1 overflow-auto flex items-center justify-center p-6 bg-zinc-950">
        <div
          className={`bg-background border border-border transition-all duration-300 shadow-2xl overflow-y-auto max-h-full ${
            device === "desktop"
              ? "w-full max-w-5xl"
              : device === "tablet"
                ? "w-[768px] rounded-xl border-zinc-700"
                : "w-[375px] rounded-2xl border-zinc-700"
          }`}
        >
          <LiveSectionRenderer section={section} isPreview device={device} />
        </div>
      </div>
    </div>
  );
}
