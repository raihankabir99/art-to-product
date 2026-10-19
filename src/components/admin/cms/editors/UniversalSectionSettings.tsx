import { useState } from "react";
import {
  Eye,
  EyeOff,
  Copy,
  Trash2,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Sliders,
  Maximize2,
  Layers,
  Check,
  AlertTriangle,
  Monitor,
  Tablet,
  Smartphone,
  Search,
  Paintbrush,
  Move,
} from "lucide-react";
import type { CommonSectionConfig, SectionStatus } from "../homepage-types";
import { toast } from "sonner";

interface UniversalSectionSettingsProps {
  section: CommonSectionConfig;
  onChange: (updated: Partial<CommonSectionConfig>) => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
  activeSubtab?: "settings" | "design" | "layout" | "spacing" | "responsive" | "seo";
}

export function UniversalSectionSettings({
  section,
  onChange,
  onDuplicate,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
  activeSubtab = "settings",
}: UniversalSectionSettingsProps) {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [responsiveDevice, setResponsiveDevice] = useState<"desktop" | "tablet" | "mobile">(
    "desktop",
  );

  const responsive = section.responsiveOverrides || {};

  const handleUpdateResponsive = (
    patch: Partial<NonNullable<CommonSectionConfig["responsiveOverrides"]>>,
  ) => {
    onChange({
      responsiveOverrides: {
        ...responsive,
        ...patch,
      },
    });
  };

  return (
    <div className="space-y-6 animate-fade-in-soft">
      {/* 1. STATUS & VISIBILITY CONTROLS */}
      <div className="space-y-3">
        <h4 className="text-[11px] font-mono uppercase tracking-wider text-gold flex items-center gap-1.5">
          <Sliders className="size-3.5" /> Block State & Visibility
        </h4>

        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
              Publishing State
            </label>
            <select
              value={section.status}
              onChange={(e) => onChange({ status: e.target.value as SectionStatus })}
              className="w-full px-2.5 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
            >
              <option value="published">● Published (Live)</option>
              <option value="draft">○ Draft (Internal)</option>
              <option value="scheduled">◷ Scheduled Drop</option>
              <option value="hidden">✕ Hidden</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
              Store Visibility
            </label>
            <button
              type="button"
              onClick={() => {
                const next = !section.visible;
                onChange({ visible: next });
                toast.success(
                  next ? `"${section.name}" is now visible` : `"${section.name}" is now hidden`,
                );
              }}
              className={`w-full py-1.5 px-3 border text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors ${
                section.visible
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                  : "bg-zinc-800/60 text-zinc-400 border-zinc-700"
              }`}
            >
              {section.visible ? (
                <>
                  <Eye className="size-3.5" /> Visible
                </>
              ) : (
                <>
                  <EyeOff className="size-3.5" /> Hidden
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 2. DESIGN & CANVAS THEME */}
      <div className="space-y-3 pt-3 border-t border-border">
        <h4 className="text-[11px] font-mono uppercase tracking-wider text-gold flex items-center gap-1.5">
          <Paintbrush className="size-3.5" /> Design & Theme Canvas
        </h4>

        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
              Background Theme
            </label>
            <select
              value={section.background}
              onChange={(e) =>
                onChange({
                  background: e.target.value as CommonSectionConfig["background"],
                })
              }
              className="w-full px-2.5 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
            >
              <option value="default">Master Dark (Noir)</option>
              <option value="surface">Surface Container</option>
              <option value="surface-2">Elevated Dark Surface</option>
              <option value="black">Deep Pure Black</option>
              <option value="editorial">Editorial Charcoal</option>
              <option value="subtle-gold">Subtle Gold Tint</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
              Enter Animation
            </label>
            <select
              value={section.animation || "none"}
              onChange={(e) =>
                onChange({
                  animation: e.target.value as CommonSectionConfig["animation"],
                })
              }
              className="w-full px-2.5 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
            >
              <option value="none">No Animation (Instant)</option>
              <option value="fade-up">Smooth Fade Up</option>
              <option value="subtle-zoom">Subtle Cinematic Zoom</option>
              <option value="slide-in">Slide In from Baseline</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer select-none">
            <input
              type="checkbox"
              checked={section.borderTop}
              onChange={(e) => onChange({ borderTop: e.target.checked })}
              className="accent-gold size-3.5 rounded-none"
            />
            <span>Top Divider Border</span>
          </label>

          <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer select-none">
            <input
              type="checkbox"
              checked={section.borderBottom}
              onChange={(e) => onChange({ borderBottom: e.target.checked })}
              className="accent-gold size-3.5 rounded-none"
            />
            <span>Bottom Divider Border</span>
          </label>
        </div>
      </div>

      {/* 3. LAYOUT & SPACING */}
      <div className="space-y-3 pt-3 border-t border-border">
        <h4 className="text-[11px] font-mono uppercase tracking-wider text-gold flex items-center gap-1.5">
          <Move className="size-3.5" /> Layout Width & Spacing
        </h4>

        <div>
          <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
            Container Width
          </label>
          <select
            value={section.containerWidth}
            onChange={(e) =>
              onChange({
                containerWidth: e.target.value as CommonSectionConfig["containerWidth"],
              })
            }
            className="w-full px-2.5 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
          >
            <option value="default">Standard (1280px)</option>
            <option value="narrow">Editorial Narrow (840px)</option>
            <option value="wide">Wide Screen (1440px)</option>
            <option value="full">Edge-to-Edge (100%)</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
              Top Padding
            </label>
            <select
              value={section.paddingTop}
              onChange={(e) =>
                onChange({
                  paddingTop: e.target.value as CommonSectionConfig["paddingTop"],
                })
              }
              className="w-full px-2.5 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
            >
              <option value="none">None (0px)</option>
              <option value="sm">Small (24px)</option>
              <option value="md">Medium (48px)</option>
              <option value="lg">Large (72px)</option>
              <option value="xl">Cinematic (96px)</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
              Bottom Padding
            </label>
            <select
              value={section.paddingBottom}
              onChange={(e) =>
                onChange({
                  paddingBottom: e.target.value as CommonSectionConfig["paddingBottom"],
                })
              }
              className="w-full px-2.5 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
            >
              <option value="none">None (0px)</option>
              <option value="sm">Small (24px)</option>
              <option value="md">Medium (48px)</option>
              <option value="lg">Large (72px)</option>
              <option value="xl">Cinematic (96px)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4. RESPONSIVE BREAKPOINT OVERRIDES */}
      <div className="space-y-3 pt-3 border-t border-border">
        <div className="flex items-center justify-between">
          <h4 className="text-[11px] font-mono uppercase tracking-wider text-gold flex items-center gap-1.5">
            <Monitor className="size-3.5" /> Responsive Breakpoints
          </h4>
          <div className="flex items-center gap-1 bg-surface-2 border border-border p-0.5">
            <button
              type="button"
              onClick={() => setResponsiveDevice("desktop")}
              className={`px-1.5 py-0.5 text-[9px] font-mono flex items-center gap-1 ${
                responsiveDevice === "desktop"
                  ? "bg-gold text-background font-semibold"
                  : "text-muted-foreground"
              }`}
            >
              <Monitor className="size-2.5" /> Desktop
            </button>
            <button
              type="button"
              onClick={() => setResponsiveDevice("tablet")}
              className={`px-1.5 py-0.5 text-[9px] font-mono flex items-center gap-1 ${
                responsiveDevice === "tablet"
                  ? "bg-gold text-background font-semibold"
                  : "text-muted-foreground"
              }`}
            >
              <Tablet className="size-2.5" /> Tablet
            </button>
            <button
              type="button"
              onClick={() => setResponsiveDevice("mobile")}
              className={`px-1.5 py-0.5 text-[9px] font-mono flex items-center gap-1 ${
                responsiveDevice === "mobile"
                  ? "bg-gold text-background font-semibold"
                  : "text-muted-foreground"
              }`}
            >
              <Smartphone className="size-2.5" /> Mobile
            </button>
          </div>
        </div>

        {responsiveDevice === "desktop" && (
          <div className="grid grid-cols-2 gap-2.5 bg-surface-2/60 p-2.5 border border-border">
            <div>
              <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
                Desktop Grid Columns
              </label>
              <select
                value={responsive.desktopColumns || 4}
                onChange={(e) => handleUpdateResponsive({ desktopColumns: Number(e.target.value) })}
                className="w-full px-2 py-1 bg-surface border border-border text-xs text-foreground focus:outline-none"
              >
                <option value={1}>1 Column</option>
                <option value={2}>2 Columns</option>
                <option value={3}>3 Columns</option>
                <option value={4}>4 Columns</option>
                <option value={5}>5 Columns</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
                Desktop Padding
              </label>
              <select
                value={responsive.desktopPadding || "lg"}
                onChange={(e) =>
                  handleUpdateResponsive({
                    desktopPadding: e.target.value as NonNullable<
                      CommonSectionConfig["paddingTop"]
                    >,
                  })
                }
                className="w-full px-2 py-1 bg-surface border border-border text-xs text-foreground focus:outline-none"
              >
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large (Default)</option>
                <option value="xl">Cinematic</option>
              </select>
            </div>
          </div>
        )}

        {responsiveDevice === "tablet" && (
          <div className="grid grid-cols-2 gap-2.5 bg-surface-2/60 p-2.5 border border-border">
            <div>
              <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
                Tablet Grid Columns
              </label>
              <select
                value={responsive.tabletColumns || 2}
                onChange={(e) => handleUpdateResponsive({ tabletColumns: Number(e.target.value) })}
                className="w-full px-2 py-1 bg-surface border border-border text-xs text-foreground focus:outline-none"
              >
                <option value={1}>1 Column</option>
                <option value={2}>2 Columns (Default)</option>
                <option value={3}>3 Columns</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
                Tablet Padding
              </label>
              <select
                value={responsive.tabletPadding || "md"}
                onChange={(e) =>
                  handleUpdateResponsive({
                    tabletPadding: e.target.value as NonNullable<CommonSectionConfig["paddingTop"]>,
                  })
                }
                className="w-full px-2 py-1 bg-surface border border-border text-xs text-foreground focus:outline-none"
              >
                <option value="sm">Small</option>
                <option value="md">Medium (Default)</option>
                <option value="lg">Large</option>
              </select>
            </div>
          </div>
        )}

        {responsiveDevice === "mobile" && (
          <div className="grid grid-cols-2 gap-2.5 bg-surface-2/60 p-2.5 border border-border">
            <div>
              <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
                Mobile Grid Columns
              </label>
              <select
                value={responsive.mobileColumns || 1}
                onChange={(e) => handleUpdateResponsive({ mobileColumns: Number(e.target.value) })}
                className="w-full px-2 py-1 bg-surface border border-border text-xs text-foreground focus:outline-none"
              >
                <option value={1}>1 Column (Stacked)</option>
                <option value={2}>2 Columns (Compact)</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
                Mobile Padding
              </label>
              <select
                value={responsive.mobilePadding || "sm"}
                onChange={(e) =>
                  handleUpdateResponsive({
                    mobilePadding: e.target.value as NonNullable<CommonSectionConfig["paddingTop"]>,
                  })
                }
                className="w-full px-2 py-1 bg-surface border border-border text-xs text-foreground focus:outline-none"
              >
                <option value="none">None</option>
                <option value="sm">Compact (Default)</option>
                <option value="md">Medium</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* 5. SEO & ACCESSIBILITY */}
      <div className="space-y-3 pt-3 border-t border-border">
        <h4 className="text-[11px] font-mono uppercase tracking-wider text-gold flex items-center gap-1.5">
          <Search className="size-3.5" /> SEO & Section Anchor
        </h4>
        <div>
          <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
            Section ID / Anchor Tag
          </label>
          <input
            type="text"
            value={section.seoTag || section.id}
            onChange={(e) => onChange({ seoTag: e.target.value })}
            placeholder="e.g. hero-banner, nocturne-capsule"
            className="w-full px-2.5 py-1.5 bg-surface-2 border border-border text-xs font-mono text-foreground focus:outline-none focus:border-gold"
          />
        </div>
      </div>

      {/* 6. BLOCK ACTIONS */}
      <div className="space-y-2 pt-3 border-t border-border">
        <label className="text-[10px] uppercase font-mono text-muted-foreground block">
          Section Hierarchy & Actions
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            disabled={isFirst}
            onClick={onMoveUp}
            className="px-3 py-1.5 bg-surface-2 border border-border hover:border-gold disabled:opacity-30 text-xs font-mono flex items-center justify-center gap-1.5 transition-colors"
          >
            <ArrowUp className="size-3.5" /> Move Up
          </button>
          <button
            type="button"
            disabled={isLast}
            onClick={onMoveDown}
            className="px-3 py-1.5 bg-surface-2 border border-border hover:border-gold disabled:opacity-30 text-xs font-mono flex items-center justify-center gap-1.5 transition-colors"
          >
            <ArrowDown className="size-3.5" /> Move Down
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={onDuplicate}
            className="px-3 py-1.5 bg-surface-2 border border-border hover:border-gold text-xs font-mono text-foreground flex items-center justify-center gap-1.5 transition-colors"
          >
            <Copy className="size-3.5" /> Duplicate
          </button>

          <button
            type="button"
            onClick={() => setDeleteConfirmOpen(true)}
            className="px-3 py-1.5 bg-red-950/20 border border-red-900/40 hover:bg-red-900/40 text-xs font-mono text-red-400 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Trash2 className="size-3.5" /> Delete
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmOpen && (
        <div className="p-4 bg-red-950/30 border border-red-500/30 space-y-3 animate-fade-in-soft">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="size-4 text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-red-300">
                Confirm Deletion of "{section.name}"?
              </p>
              <p className="text-[11px] text-zinc-400 mt-1">
                This block will be removed from the public homepage draft. This can be undone from
                version history.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setDeleteConfirmOpen(false)}
              className="px-2.5 py-1 text-xs font-mono text-zinc-300 bg-surface border border-border hover:bg-surface-2"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                setDeleteConfirmOpen(false);
                onDelete();
              }}
              className="px-3 py-1 text-xs font-mono bg-red-600 hover:bg-red-500 text-white font-medium"
            >
              Confirm Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
