import type { AnnouncementSectionData } from "../homepage-types";
import { Sparkles, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface AnnouncementBarEditorProps {
  section: AnnouncementSectionData;
  onChange: (updated: Partial<AnnouncementSectionData>) => void;
}

export function AnnouncementBarEditor({ section, onChange }: AnnouncementBarEditorProps) {
  const handleAddItem = () => {
    const next = [...section.items, "New studio benefit"];
    onChange({ items: next });
    toast.success("Added new ticker item");
  };

  const handleUpdateItem = (index: number, val: string) => {
    const next = [...section.items];
    next[index] = val;
    onChange({ items: next });
  };

  const handleDeleteItem = (index: number) => {
    if (section.items.length <= 1) {
      toast.error("At least one ticker item required.");
      return;
    }
    const next = section.items.filter((_, i) => i !== index);
    onChange({ items: next });
  };

  return (
    <div className="space-y-6">
      {/* Narrative */}
      <div className="space-y-4">
        <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider">
          Top Header Announcement Bar
        </h4>

        <div>
          <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
            Static Banner Announcement Text
          </label>
          <textarea
            rows={2}
            value={section.text}
            onChange={(e) => onChange({ text: e.target.value })}
            className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
              Link Text (Optional)
            </label>
            <input
              type="text"
              value={section.linkText || ""}
              onChange={(e) => onChange({ linkText: e.target.value })}
              className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
              Link URL
            </label>
            <input
              type="text"
              value={section.linkUrl || ""}
              onChange={(e) => onChange({ linkUrl: e.target.value })}
              className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs font-mono text-foreground focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Marquee Ticker Controls */}
      <div className="space-y-3 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider">
            Infinite Marquee Ticker Items
          </h4>
          <label className="flex items-center gap-2 text-xs text-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={section.showMarquee}
              onChange={(e) => onChange({ showMarquee: e.target.checked })}
              className="accent-gold size-3.5 rounded-none"
            />
            <span>Enable Marquee Animation</span>
          </label>
        </div>

        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {section.items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleUpdateItem(idx, e.target.value)}
                className="flex-1 bg-surface-2 border border-border px-2.5 py-1.5 text-xs text-foreground focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleDeleteItem(idx)}
                className="p-1.5 text-red-400 hover:text-red-300 border border-border hover:border-red-500/40 transition-colors"
                title="Remove item"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleAddItem}
          className="w-full py-1.5 bg-surface border border-gold/40 text-xs font-mono uppercase tracking-wider text-gold hover:bg-gold hover:text-background transition-colors flex items-center justify-center gap-1 mt-2"
        >
          <Plus className="size-3.5" /> Add Ticker Item
        </button>
      </div>
    </div>
  );
}
