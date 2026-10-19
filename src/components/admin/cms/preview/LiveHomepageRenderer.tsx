import { useState } from "react";
import type { HomepageSection, DeviceMode } from "../homepage-types";
import { LiveSectionRenderer } from "./LiveSectionRenderer";
import { Edit2, Eye, EyeOff, ArrowUp, ArrowDown, Copy, Trash2, Plus, Sliders } from "lucide-react";

interface LiveHomepageRendererProps {
  sections: HomepageSection[];
  selectedSectionId: string | null;
  onSelectSection: (id: string) => void;
  device: DeviceMode;
  zoomLevel: number;
  onAddSectionAtIndex?: (index: number) => void;
  onMoveUp?: (id: string) => void;
  onMoveDown?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onToggleVisibility?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function LiveHomepageRenderer({
  sections,
  selectedSectionId,
  onSelectSection,
  device,
  zoomLevel,
  onAddSectionAtIndex,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onToggleVisibility,
  onDelete,
}: LiveHomepageRendererProps) {
  const [hoveredSectionId, setHoveredSectionId] = useState<string | null>(null);
  const [hoveredDividerIndex, setHoveredDividerIndex] = useState<number | null>(null);

  // Device width wrappers
  const deviceWidthClass =
    device === "desktop"
      ? "w-full max-w-[1440px]"
      : device === "tablet"
        ? "w-[768px] min-w-[768px]"
        : "w-[375px] min-w-[375px]";

  const deviceBezelClass =
    device === "desktop"
      ? "rounded-none border-x border-border shadow-2xl"
      : device === "tablet"
        ? "rounded-2xl border-4 border-zinc-700 shadow-2xl overflow-hidden my-4"
        : "rounded-[36px] border-[6px] border-zinc-800 shadow-2xl overflow-hidden my-4";

  return (
    <div
      className="flex justify-center min-h-full py-4 transition-transform duration-200 origin-top"
      style={{ transform: `scale(${zoomLevel / 100})` }}
    >
      <div
        className={`${deviceWidthClass} ${deviceBezelClass} bg-background min-h-[900px] flex flex-col relative transition-all duration-300`}
      >
        {/* Mobile speaker notch simulation */}
        {device === "mobile" && (
          <div className="w-full bg-zinc-900 py-1.5 flex justify-center items-center z-30 sticky top-0 border-b border-border/40">
            <div className="w-20 h-3.5 bg-black rounded-full" />
          </div>
        )}

        {/* Sections Stream */}
        <div className="w-full flex-1 flex flex-col overflow-x-hidden">
          {sections.map((section, index) => {
            const isSelected = selectedSectionId === section.id;
            const isHovered = hoveredSectionId === section.id;

            return (
              <div key={section.id} className="relative group/block flex flex-col">
                {/* 1. In-between Section Divider Add Button */}
                {onAddSectionAtIndex && (
                  <div
                    onMouseEnter={() => setHoveredDividerIndex(index)}
                    onMouseLeave={() => setHoveredDividerIndex(null)}
                    className="relative w-full h-4 -my-2 z-30 flex items-center justify-center group/divider cursor-pointer"
                  >
                    <div
                      className={`w-full h-px transition-colors ${
                        hoveredDividerIndex === index ? "bg-gold" : "bg-transparent"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddSectionAtIndex(index);
                      }}
                      className={`absolute px-2.5 py-0.5 bg-surface border border-gold/60 text-gold text-[10px] font-mono flex items-center gap-1 shadow-lg hover:bg-gold hover:text-background transition-all ${
                        hoveredDividerIndex === index
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-95 pointer-events-none group-hover/divider:opacity-100 group-hover/divider:pointer-events-auto"
                      }`}
                    >
                      <Plus className="size-3" /> Add Section Here
                    </button>
                  </div>
                )}

                {/* 2. Section Block Item */}
                <div
                  id={`preview-sec-${section.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectSection(section.id);
                  }}
                  onMouseEnter={() => setHoveredSectionId(section.id)}
                  onMouseLeave={() => setHoveredSectionId(null)}
                  className={`relative cursor-pointer transition-all ${
                    isSelected
                      ? "outline outline-2 outline-gold z-20 shadow-[0_0_20px_rgba(212,175,55,0.25)]"
                      : isHovered
                        ? "outline outline-1 outline-gold/50 z-10"
                        : ""
                  }`}
                >
                  {/* Floating Left Ribbon Indicator */}
                  {(isSelected || isHovered) && (
                    <div className="absolute top-2 left-2 z-30 flex items-center gap-1.5 bg-black/95 text-foreground px-2.5 py-1 text-[10px] font-mono border border-gold/40 shadow-lg pointer-events-none animate-fade-in-soft">
                      <span className="size-1.5 rounded-full bg-gold animate-pulse" />
                      <span className="font-semibold text-gold">{section.name}</span>
                      <span className="text-zinc-400">({section.status})</span>
                      {!section.visible && (
                        <span className="text-red-400 font-bold ml-1">HIDDEN</span>
                      )}
                    </div>
                  )}

                  {/* Floating Right Quick Toolbar (Move, Duplicate, Hide, Delete) */}
                  {(isSelected || isHovered) && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-2 right-2 z-30 flex items-center gap-1 bg-black/95 p-1 border border-gold/40 shadow-xl animate-fade-in-soft"
                    >
                      {onMoveUp && (
                        <button
                          type="button"
                          disabled={index === 0}
                          onClick={() => onMoveUp(section.id)}
                          className="p-1 text-zinc-300 hover:text-gold hover:bg-white/10 disabled:opacity-20"
                          title="Move Up"
                        >
                          <ArrowUp className="size-3" />
                        </button>
                      )}

                      {onMoveDown && (
                        <button
                          type="button"
                          disabled={index === sections.length - 1}
                          onClick={() => onMoveDown(section.id)}
                          className="p-1 text-zinc-300 hover:text-gold hover:bg-white/10 disabled:opacity-20"
                          title="Move Down"
                        >
                          <ArrowDown className="size-3" />
                        </button>
                      )}

                      {onToggleVisibility && (
                        <button
                          type="button"
                          onClick={() => onToggleVisibility(section.id)}
                          className="p-1 text-zinc-300 hover:text-gold hover:bg-white/10"
                          title={section.visible ? "Hide Section" : "Show Section"}
                        >
                          {section.visible ? (
                            <Eye className="size-3" />
                          ) : (
                            <EyeOff className="size-3 text-red-400" />
                          )}
                        </button>
                      )}

                      {onDuplicate && (
                        <button
                          type="button"
                          onClick={() => onDuplicate(section.id)}
                          className="p-1 text-zinc-300 hover:text-gold hover:bg-white/10"
                          title="Duplicate Section"
                        >
                          <Copy className="size-3" />
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => onSelectSection(section.id)}
                        className="p-1 text-gold hover:bg-gold/20"
                        title="Edit Settings"
                      >
                        <Sliders className="size-3" />
                      </button>

                      {onDelete && (
                        <button
                          type="button"
                          onClick={() => onDelete(section.id)}
                          className="p-1 text-rose-400 hover:bg-rose-950/40"
                          title="Delete Section"
                        >
                          <Trash2 className="size-3" />
                        </button>
                      )}
                    </div>
                  )}

                  {/* Rendered Live Component */}
                  <div
                    className={`w-full transition-opacity ${
                      !section.visible ? "opacity-30 filter grayscale" : ""
                    }`}
                  >
                    <LiveSectionRenderer section={section} isPreview device={device} />
                  </div>
                </div>
              </div>
            );
          })}

          {/* Bottom Add Section Button */}
          {onAddSectionAtIndex && (
            <div className="p-4 flex justify-center bg-surface/30 border-t border-border/50">
              <button
                type="button"
                onClick={() => onAddSectionAtIndex(sections.length)}
                className="px-4 py-2 bg-surface-2 border border-dashed border-gold/40 text-gold hover:border-gold hover:bg-gold hover:text-background text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm"
              >
                <Plus className="size-3.5" /> Append New Section
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
