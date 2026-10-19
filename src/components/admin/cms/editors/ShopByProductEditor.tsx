import { useState } from "react";
import type { ShopByProductSectionData, ProductCategoryItem } from "../homepage-types";
import { Eye, EyeOff, GripVertical, Plus, Check } from "lucide-react";
import { toast } from "sonner";

interface ShopByProductEditorProps {
  section: ShopByProductSectionData;
  onChange: (updated: Partial<ShopByProductSectionData>) => void;
}

export function ShopByProductEditor({ section, onChange }: ShopByProductEditorProps) {
  const handleToggleCategory = (id: string) => {
    const updated = section.categories.map((c) =>
      c.id === id ? { ...c, visible: !c.visible } : c,
    );
    onChange({ categories: updated });
    toast.success("Updated category display settings");
  };

  const handleEditCategory = (id: string, updates: Partial<ProductCategoryItem>) => {
    const updated = section.categories.map((c) => (c.id === id ? { ...c, ...updates } : c));
    onChange({ categories: updated });
  };

  return (
    <div className="space-y-6">
      {/* Narrative */}
      <div className="space-y-4">
        <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider">
          Product Substrates Header
        </h4>

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

        <div>
          <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
            Description
          </label>
          <textarea
            rows={2}
            value={section.description}
            onChange={(e) => onChange({ description: e.target.value })}
            className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none resize-none"
          />
        </div>
      </div>

      {/* Layout Format */}
      <div className="space-y-3 pt-4 border-t border-border">
        <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider">
          Presentation Style
        </h4>

        <div className="grid grid-cols-2 gap-2">
          {[
            { id: "pills", label: "Minimal Tag Pills", desc: "Horizontal typographic list" },
            { id: "grid-3", label: "3-Column Cards", desc: "Substrate cards with weight stats" },
            { id: "grid-4", label: "4-Column Matrix", desc: "High density product gallery" },
            {
              id: "editorial-cards",
              label: "Editorial Lifestyle",
              desc: "Magazine styled substrate previews",
            },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange({ layout: item.id as ShopByProductSectionData["layout"] })}
              className={`p-2.5 border text-left transition-colors ${
                section.layout === item.id
                  ? "bg-gold/10 border-gold text-foreground"
                  : "bg-surface-2 border-border text-muted-foreground hover:border-zinc-700"
              }`}
            >
              <p className="text-xs font-medium">{item.label}</p>
              <p className="text-[9px] font-mono text-muted-foreground mt-0.5">{item.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* 13 Substrate Categories List */}
      <div className="space-y-3 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider">
            All 13 Substrate Products
          </h4>
          <span className="text-[10px] font-mono text-gold">
            {section.categories.filter((c) => c.visible).length} visible
          </span>
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
          {section.categories.map((cat) => (
            <div
              key={cat.id}
              className={`p-2.5 border flex items-center justify-between gap-3 ${
                cat.visible
                  ? "bg-surface-2 border-border"
                  : "bg-zinc-900/40 border-zinc-800 opacity-60"
              }`}
            >
              <div className="flex-1 min-w-0">
                <input
                  type="text"
                  value={cat.name}
                  onChange={(e) => handleEditCategory(cat.id, { name: e.target.value })}
                  className="bg-transparent text-xs font-medium text-foreground focus:outline-none border-b border-transparent focus:border-gold w-full"
                />
                <input
                  type="text"
                  value={cat.subtitle}
                  onChange={(e) => handleEditCategory(cat.id, { subtitle: e.target.value })}
                  className="bg-transparent text-[10px] font-mono text-muted-foreground focus:outline-none border-b border-transparent focus:border-gold w-full mt-0.5"
                />
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => handleToggleCategory(cat.id)}
                  className={`p-1.5 border text-xs ${
                    cat.visible
                      ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
                      : "text-zinc-500 border-zinc-700 bg-zinc-800"
                  }`}
                  title={cat.visible ? "Hide category" : "Show category"}
                >
                  {cat.visible ? <Eye className="size-3.5" /> : <EyeOff className="size-3.5" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
