import type { SocialShowcaseSectionData, SocialCardItem } from "../homepage-types";
import { Instagram, Eye, EyeOff, Plus, Trash2 } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { toast } from "sonner";

interface SocialShowcaseEditorProps {
  section: SocialShowcaseSectionData;
  onChange: (updated: Partial<SocialShowcaseSectionData>) => void;
}

export function SocialShowcaseEditor({ section, onChange }: SocialShowcaseEditorProps) {
  const handleToggleItem = (id: string) => {
    const updated = section.items.map((item) =>
      item.id === id ? { ...item, visible: !item.visible } : item,
    );
    onChange({ items: updated });
    toast.success("Updated social card visibility");
  };

  const handleEditItem = (id: string, updates: Partial<SocialCardItem>) => {
    const updated = section.items.map((item) => (item.id === id ? { ...item, ...updates } : item));
    onChange({ items: updated });
  };

  return (
    <div className="space-y-6">
      {/* Narrative */}
      <div className="space-y-4">
        <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider">
          Social Showcase Narrative
        </h4>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
              Eyebrow Tag
            </label>
            <input
              type="text"
              value={section.eyebrow}
              onChange={(e) => onChange({ eyebrow: e.target.value })}
              className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
              Social Handle
            </label>
            <input
              type="text"
              value={section.handle}
              onChange={(e) => onChange({ handle: e.target.value })}
              className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-gold font-mono focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
            Section Title
          </label>
          <input
            type="text"
            value={section.title}
            onChange={(e) => onChange({ title: e.target.value })}
            className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
          />
        </div>
      </div>

      {/* Social Cards Grid Manager */}
      <div className="space-y-3 pt-4 border-t border-border">
        <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider">
          Patron & Studio Social Posts ({section.items.length})
        </h4>

        <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
          {section.items.map((item) => (
            <div
              key={item.id}
              className={`p-3 border space-y-2 ${
                item.visible
                  ? "bg-surface-2 border-border"
                  : "bg-zinc-950/40 border-zinc-800 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase bg-gold/20 text-gold px-1.5 py-0.5 border border-gold/30">
                    {item.platform}
                  </span>
                  <input
                    type="text"
                    value={item.handle}
                    onChange={(e) => handleEditItem(item.id, { handle: e.target.value })}
                    className="bg-transparent text-xs font-mono text-foreground focus:outline-none border-b border-transparent focus:border-gold"
                  />
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {item.likes} likes
                  </span>
                  <button
                    type="button"
                    onClick={() => handleToggleItem(item.id)}
                    className={`p-1 border text-xs ${
                      item.visible
                        ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
                        : "text-zinc-500 border-zinc-700 bg-zinc-800"
                    }`}
                  >
                    {item.visible ? <Eye className="size-3" /> : <EyeOff className="size-3" />}
                  </button>
                </div>
              </div>

              <textarea
                rows={2}
                value={item.caption}
                onChange={(e) => handleEditItem(item.id, { caption: e.target.value })}
                className="w-full bg-background border border-border text-xs p-1.5 text-zinc-300 focus:outline-none resize-none"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
