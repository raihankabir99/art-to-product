import { ARTICLES } from "@/lib/catalog";
import type { BlogSectionData } from "../homepage-types";
import { Sparkles, BookOpen } from "lucide-react";
import { toast } from "sonner";

interface BlogSectionEditorProps {
  section: BlogSectionData;
  onChange: (updated: Partial<BlogSectionData>) => void;
}

export function BlogSectionEditor({ section, onChange }: BlogSectionEditorProps) {
  return (
    <div className="space-y-6">
      {/* Narrative */}
      <div className="space-y-4">
        <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider">
          Journal Header
        </h4>

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
            Title
          </label>
          <input
            type="text"
            value={section.title}
            onChange={(e) => onChange({ title: e.target.value })}
            className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
          />
        </div>
      </div>

      {/* Query & Source */}
      <div className="space-y-4 pt-4 border-t border-border">
        <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider">
          Article Feed & Source
        </h4>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
              Feed Mode
            </label>
            <select
              value={section.source}
              onChange={(e) => onChange({ source: e.target.value as BlogSectionData["source"] })}
              className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
            >
              <option value="latest">Latest Published Stories</option>
              <option value="featured">Featured Curated Articles</option>
              <option value="category">Category Filtered</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
              Number of Stories
            </label>
            <select
              value={section.postCount}
              onChange={(e) => onChange({ postCount: Number(e.target.value) })}
              className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
            >
              <option value={2}>2 Articles</option>
              <option value={3}>3 Articles (Recommended)</option>
              <option value={4}>4 Articles</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2">
          <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={section.showDate}
              onChange={(e) => onChange({ showDate: e.target.checked })}
              className="accent-gold size-3.5 rounded-none"
            />
            <span>Show Date & Year</span>
          </label>

          <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={section.showCategory}
              onChange={(e) => onChange({ showCategory: e.target.checked })}
              className="accent-gold size-3.5 rounded-none"
            />
            <span>Show Category Badge</span>
          </label>

          <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={section.showExcerpt}
              onChange={(e) => onChange({ showExcerpt: e.target.checked })}
              className="accent-gold size-3.5 rounded-none"
            />
            <span>Show Reading Excerpt</span>
          </label>

          <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={section.showAuthor}
              onChange={(e) => onChange({ showAuthor: e.target.checked })}
              className="accent-gold size-3.5 rounded-none"
            />
            <span>Show Author Byline</span>
          </label>
        </div>
      </div>

      {/* Layout Presets */}
      <div className="space-y-3 pt-4 border-t border-border">
        <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider">
          Column Presentation
        </h4>

        <div className="grid grid-cols-2 gap-2">
          {[
            { id: "2-col", label: "2-Column Split", desc: "Spacious dual article layout" },
            { id: "3-col", label: "3-Column Grid", desc: "Balanced editorial trio" },
            { id: "4-col", label: "4-Column Dense", desc: "Multi-post feed" },
            { id: "editorial", label: "Editorial Hero + 2", desc: "Lead story with sub-links" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange({ layout: item.id as BlogSectionData["layout"] })}
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
    </div>
  );
}
