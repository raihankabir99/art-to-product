import { useState } from "react";
import {
  Sparkles,
  Upload,
  Image as ImageIcon,
  Smartphone,
  Monitor,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Sliders,
  Eye,
  RefreshCw,
  Wand2,
  LayoutTemplate,
  Maximize,
  Minimize,
  Columns,
  SplitSquareVertical,
  Trash2,
} from "lucide-react";
import type { HeroSectionData, HeroPreset } from "../homepage-types";
import { toast } from "sonner";

interface HeroEditorProps {
  section: HeroSectionData;
  onChange: (updated: Partial<HeroSectionData>) => void;
}

export function HeroEditor({ section, onChange }: HeroEditorProps) {
  const [activeMediaTab, setActiveMediaTab] = useState<"desktop" | "mobile">("desktop");

  const currentPreset: HeroPreset = section.preset || "centered";

  const handleApplyPreset = (preset: HeroPreset) => {
    switch (preset) {
      case "centered":
        onChange({
          preset,
          textAlignment: "center",
          contentWidth: "md",
          imagePosition: "background",
          overlayStrength: 45,
          height: "large",
        });
        break;
      case "left-aligned":
        onChange({
          preset,
          textAlignment: "left",
          contentWidth: "md",
          imagePosition: "background",
          overlayStrength: 40,
          height: "large",
        });
        break;
      case "right-aligned":
        onChange({
          preset,
          textAlignment: "right",
          contentWidth: "md",
          imagePosition: "background",
          overlayStrength: 45,
          height: "large",
        });
        break;
      case "split":
        onChange({
          preset,
          textAlignment: "left",
          contentWidth: "full",
          imagePosition: "split-right",
          overlayStrength: 0,
          height: "large",
        });
        break;
      case "cinematic":
        onChange({
          preset,
          textAlignment: "center",
          contentWidth: "lg",
          imagePosition: "background",
          overlayStrength: 55,
          height: "cinematic",
        });
        break;
      case "editorial":
        onChange({
          preset,
          textAlignment: "left",
          contentWidth: "sm",
          imagePosition: "split-left",
          overlayStrength: 10,
          height: "screen",
        });
        break;
    }
    toast.success(`Applied "${preset.replace("-", " ").toUpperCase()}" hero layout preset`);
  };

  const handleAiHeadline = () => {
    const headlines = [
      "Wear the design. Live the idea.",
      "Art in Motion. Tailored on Demand.",
      "The Architecture of Expression.",
      "Nocturne 2026: The Graphic Edition.",
      "Original Artwork. Zero Overproduction.",
    ];
    const picked = headlines[Math.floor(Math.random() * headlines.length)]!;
    onChange({ headline: picked });
    toast.success("AI Studio synthesized new headline", { description: picked });
  };

  const handleAiSubhead = () => {
    const subheads = [
      "Original designs, made on demand with organic heavyweight fabrics and museum-grade printing.",
      "Museum-grade prints rendered on 240gsm brushed cotton. Handcrafted for longevity.",
      "Choose the drawing, select your physical silhouette. Delivered carbon-neutral worldwide.",
    ];
    const picked = subheads[Math.floor(Math.random() * subheads.length)]!;
    onChange({ subheadline: picked });
    toast.success("AI Studio enhanced editorial subheadline");
  };

  const handleMockUpload = (target: "desktop" | "mobile") => {
    toast.info(`Uploaded new high-res asset for ${target} hero view.`);
  };

  const handleRemoveImage = (target: "desktop" | "mobile") => {
    if (target === "desktop") {
      onChange({ desktopImage: "" });
    } else {
      onChange({ mobileImage: "" });
    }
    toast.info(`Removed ${target} asset.`);
  };

  return (
    <div className="space-y-6">
      {/* 1. HERO PRESET SELECTOR (6 Presets) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-display font-medium text-foreground uppercase tracking-wider flex items-center gap-1.5">
            <LayoutTemplate className="size-3.5 text-gold" /> Hero Layout Preset
          </label>
          <span className="text-[10px] font-mono text-gold uppercase font-semibold">
            {currentPreset.replace("-", " ")}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {/* Centered */}
          <button
            type="button"
            onClick={() => handleApplyPreset("centered")}
            className={`p-2 border text-left transition-all group ${
              currentPreset === "centered"
                ? "bg-gold/10 border-gold shadow-sm"
                : "bg-surface-2 border-border hover:border-zinc-700"
            }`}
          >
            <div className="h-9 bg-black border border-border/80 flex flex-col items-center justify-center p-1 mb-1.5">
              <div className="w-8 h-1 bg-gold rounded-full mb-0.5" />
              <div className="w-5 h-0.5 bg-zinc-400 rounded-full" />
            </div>
            <span className="text-[11px] font-mono block text-foreground group-hover:text-gold">
              Centered
            </span>
            <span className="text-[9px] font-mono text-muted-foreground block">Direct focal</span>
          </button>

          {/* Left Aligned */}
          <button
            type="button"
            onClick={() => handleApplyPreset("left-aligned")}
            className={`p-2 border text-left transition-all group ${
              currentPreset === "left-aligned"
                ? "bg-gold/10 border-gold shadow-sm"
                : "bg-surface-2 border-border hover:border-zinc-700"
            }`}
          >
            <div className="h-9 bg-black border border-border/80 flex flex-col items-start justify-center p-1 mb-1.5 pl-1.5">
              <div className="w-8 h-1 bg-gold rounded-full mb-0.5" />
              <div className="w-5 h-0.5 bg-zinc-400 rounded-full" />
            </div>
            <span className="text-[11px] font-mono block text-foreground group-hover:text-gold">
              Left Aligned
            </span>
            <span className="text-[9px] font-mono text-muted-foreground block">Editorial left</span>
          </button>

          {/* Right Aligned */}
          <button
            type="button"
            onClick={() => handleApplyPreset("right-aligned")}
            className={`p-2 border text-left transition-all group ${
              currentPreset === "right-aligned"
                ? "bg-gold/10 border-gold shadow-sm"
                : "bg-surface-2 border-border hover:border-zinc-700"
            }`}
          >
            <div className="h-9 bg-black border border-border/80 flex flex-col items-end justify-center p-1 mb-1.5 pr-1.5">
              <div className="w-8 h-1 bg-gold rounded-full mb-0.5" />
              <div className="w-5 h-0.5 bg-zinc-400 rounded-full" />
            </div>
            <span className="text-[11px] font-mono block text-foreground group-hover:text-gold">
              Right Aligned
            </span>
            <span className="text-[9px] font-mono text-muted-foreground block">Fashion slant</span>
          </button>

          {/* Split 50/50 */}
          <button
            type="button"
            onClick={() => handleApplyPreset("split")}
            className={`p-2 border text-left transition-all group ${
              currentPreset === "split"
                ? "bg-gold/10 border-gold shadow-sm"
                : "bg-surface-2 border-border hover:border-zinc-700"
            }`}
          >
            <div className="h-9 bg-black border border-border/80 flex items-center justify-between p-1 mb-1.5 gap-1">
              <div className="w-1/2 flex flex-col justify-center gap-0.5">
                <div className="w-full h-1 bg-gold rounded-full" />
                <div className="w-2/3 h-0.5 bg-zinc-400 rounded-full" />
              </div>
              <div className="w-1/2 h-full bg-zinc-800 border border-zinc-700" />
            </div>
            <span className="text-[11px] font-mono block text-foreground group-hover:text-gold">
              Split Screen
            </span>
            <span className="text-[9px] font-mono text-muted-foreground block">50/50 Canvas</span>
          </button>

          {/* Fullscreen Cinematic */}
          <button
            type="button"
            onClick={() => handleApplyPreset("cinematic")}
            className={`p-2 border text-left transition-all group ${
              currentPreset === "cinematic"
                ? "bg-gold/10 border-gold shadow-sm"
                : "bg-surface-2 border-border hover:border-zinc-700"
            }`}
          >
            <div className="h-9 bg-gradient-to-t from-black to-zinc-800 border border-border/80 flex flex-col items-center justify-end p-1 mb-1.5">
              <div className="w-10 h-1 bg-gold rounded-full mb-0.5" />
              <div className="w-6 h-0.5 bg-zinc-400 rounded-full" />
            </div>
            <span className="text-[11px] font-mono block text-foreground group-hover:text-gold">
              Cinematic
            </span>
            <span className="text-[9px] font-mono text-muted-foreground block">
              Widescreen 21:9
            </span>
          </button>

          {/* Editorial Magazine */}
          <button
            type="button"
            onClick={() => handleApplyPreset("editorial")}
            className={`p-2 border text-left transition-all group ${
              currentPreset === "editorial"
                ? "bg-gold/10 border-gold shadow-sm"
                : "bg-surface-2 border-border hover:border-zinc-700"
            }`}
          >
            <div className="h-9 bg-surface border border-border/80 flex items-center p-1 mb-1.5 gap-1">
              <div className="w-1/3 h-full bg-zinc-900 border border-zinc-700" />
              <div className="w-2/3 flex flex-col justify-center gap-0.5">
                <div className="w-full h-1 bg-gold rounded-full" />
                <div className="w-4/5 h-0.5 bg-zinc-400 rounded-full" />
              </div>
            </div>
            <span className="text-[11px] font-mono block text-foreground group-hover:text-gold">
              Editorial
            </span>
            <span className="text-[9px] font-mono text-muted-foreground block">Lookbook style</span>
          </button>
        </div>
      </div>

      {/* AI Assistance Toolbar */}
      <div className="p-3.5 bg-gold/10 border border-gold/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-gold" />
          <span className="text-xs font-mono text-gold font-medium">GenAI Copywriter Ready</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleAiHeadline}
            className="px-2.5 py-1 bg-surface-2 border border-gold/40 hover:bg-gold hover:text-background text-[10px] font-mono uppercase tracking-wider text-foreground transition-colors"
          >
            AI Headline
          </button>
          <button
            type="button"
            onClick={handleAiSubhead}
            className="px-2.5 py-1 bg-surface-2 border border-gold/40 hover:bg-gold hover:text-background text-[10px] font-mono uppercase tracking-wider text-foreground transition-colors"
          >
            AI Subhead
          </button>
        </div>
      </div>

      {/* Copy & Narrative */}
      <div className="space-y-4">
        <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider">
          Editorial Typography & Content
        </h4>

        <div>
          <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
            Eyebrow Tagline
          </label>
          <input
            type="text"
            value={section.eyebrow}
            onChange={(e) => onChange({ eyebrow: e.target.value })}
            placeholder="e.g. New collection · Nocturne 2026"
            className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
          />
        </div>

        <div>
          <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
            Main Hero Headline (H1)
          </label>
          <input
            type="text"
            value={section.headline}
            onChange={(e) => onChange({ headline: e.target.value })}
            placeholder="e.g. Wear the design. Live the idea."
            className="w-full px-3 py-2 bg-surface-2 border border-border text-xs font-medium text-foreground focus:outline-none focus:border-gold"
          />
        </div>

        <div>
          <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
            Editorial Subheadline
          </label>
          <textarea
            rows={2}
            value={section.subheadline}
            onChange={(e) => onChange({ subheadline: e.target.value })}
            placeholder="Describe the collection ethos..."
            className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold resize-none"
          />
        </div>

        <div>
          <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
            Delivery / Geo Trust Note
          </label>
          <input
            type="text"
            value={section.deliveryNote}
            onChange={(e) => onChange({ deliveryNote: e.target.value })}
            placeholder="e.g. Worldwide Express · Free 30-Day Returns"
            className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
          />
        </div>
      </div>

      {/* Call to Actions */}
      <div className="space-y-4 pt-4 border-t border-border">
        <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider">
          Call-To-Action Triggers
        </h4>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
              Primary CTA Label
            </label>
            <input
              type="text"
              value={section.primaryCtaText}
              onChange={(e) => onChange({ primaryCtaText: e.target.value })}
              className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
              Primary CTA Link
            </label>
            <input
              type="text"
              value={section.primaryCtaLink}
              onChange={(e) => onChange({ primaryCtaLink: e.target.value })}
              className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs font-mono text-foreground focus:outline-none focus:border-gold"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
              Secondary CTA Label
            </label>
            <input
              type="text"
              value={section.secondaryCtaText}
              onChange={(e) => onChange({ secondaryCtaText: e.target.value })}
              className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
              Secondary CTA Link
            </label>
            <input
              type="text"
              value={section.secondaryCtaLink}
              onChange={(e) => onChange({ secondaryCtaLink: e.target.value })}
              className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs font-mono text-foreground focus:outline-none focus:border-gold"
            />
          </div>
        </div>
      </div>

      {/* Hero Media Management */}
      <div className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider">
            Hero Imagery & Focal Canvas
          </h4>
          <div className="flex items-center gap-1 bg-surface-2 border border-border p-0.5">
            <button
              type="button"
              onClick={() => setActiveMediaTab("desktop")}
              className={`px-2 py-0.5 text-[10px] font-mono flex items-center gap-1 ${
                activeMediaTab === "desktop"
                  ? "bg-gold text-background font-semibold"
                  : "text-muted-foreground"
              }`}
            >
              <Monitor className="size-3" /> Desktop
            </button>
            <button
              type="button"
              onClick={() => setActiveMediaTab("mobile")}
              className={`px-2 py-0.5 text-[10px] font-mono flex items-center gap-1 ${
                activeMediaTab === "mobile"
                  ? "bg-gold text-background font-semibold"
                  : "text-muted-foreground"
              }`}
            >
              <Smartphone className="size-3" /> Mobile
            </button>
          </div>
        </div>

        {/* Media Preview Box */}
        <div className="relative aspect-video w-full bg-black border border-border overflow-hidden group">
          <img
            src={activeMediaTab === "desktop" ? section.desktopImage : section.mobileImage}
            alt={section.altText}
            className="size-full object-cover"
          />
          <div
            className="absolute inset-0 bg-black pointer-events-none transition-opacity"
            style={{ opacity: section.overlayStrength / 100 }}
          />

          <div className="absolute top-2 left-2 flex items-center gap-1.5">
            <span className="text-[9px] font-mono uppercase bg-black/80 px-2 py-0.5 text-gold border border-gold/30">
              {activeMediaTab === "desktop" ? "Desktop Asset" : "Mobile Asset"}
            </span>
            <span className="text-[9px] font-mono bg-black/80 px-2 py-0.5 text-zinc-300 border border-zinc-700">
              {section.dimensions} • {section.fileSize}
            </span>
          </div>

          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
            <button
              type="button"
              onClick={() => handleMockUpload(activeMediaTab)}
              className="px-3 py-1.5 bg-gold text-background text-xs font-mono uppercase tracking-wider font-semibold hover:bg-white transition-colors"
            >
              Replace Asset
            </button>
            <button
              type="button"
              onClick={() => handleRemoveImage(activeMediaTab)}
              className="p-1.5 bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30"
              title="Remove Asset"
            >
              <Trash2 className="size-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
              Focal Point
            </label>
            <select
              value={section.focalPoint}
              onChange={(e) =>
                onChange({
                  focalPoint: e.target.value as HeroSectionData["focalPoint"],
                })
              }
              className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
            >
              <option value="center">Center / Golden Ratio</option>
              <option value="top">Top Center</option>
              <option value="bottom">Bottom Center</option>
              <option value="left">Left Aligned</option>
              <option value="right">Right Aligned</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
              Dark Overlay ({section.overlayStrength}%)
            </label>
            <div className="flex items-center gap-1 mt-1 mb-1.5">
              <button
                type="button"
                onClick={() => onChange({ overlayStrength: 0 })}
                className="px-1.5 py-0.5 text-[9px] font-mono bg-surface-2 border border-border hover:border-gold"
              >
                None
              </button>
              <button
                type="button"
                onClick={() => onChange({ overlayStrength: 25 })}
                className="px-1.5 py-0.5 text-[9px] font-mono bg-surface-2 border border-border hover:border-gold"
              >
                Light
              </button>
              <button
                type="button"
                onClick={() => onChange({ overlayStrength: 50 })}
                className="px-1.5 py-0.5 text-[9px] font-mono bg-surface-2 border border-border hover:border-gold"
              >
                Medium
              </button>
              <button
                type="button"
                onClick={() => onChange({ overlayStrength: 75 })}
                className="px-1.5 py-0.5 text-[9px] font-mono bg-surface-2 border border-border hover:border-gold"
              >
                Strong
              </button>
            </div>
            <input
              type="range"
              min="0"
              max="95"
              value={section.overlayStrength}
              onChange={(e) => onChange({ overlayStrength: Number(e.target.value) })}
              className="w-full accent-gold cursor-pointer"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
            Accessibility Alt Text
          </label>
          <input
            type="text"
            value={section.altText}
            onChange={(e) => onChange({ altText: e.target.value })}
            placeholder="Detailed description for screen readers and SEO..."
            className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
          />
        </div>
      </div>

      {/* Height & Content Dimensions */}
      <div className="space-y-4 pt-4 border-t border-border">
        <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider">
          Section Height & Dimensions
        </h4>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
              Canvas Height
            </label>
            <select
              value={section.height || "large"}
              onChange={(e) =>
                onChange({
                  height: e.target.value as HeroSectionData["height"],
                })
              }
              className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
            >
              <option value="screen">Full Screen (100vh)</option>
              <option value="large">Spacious (85vh)</option>
              <option value="compact">Compact (65vh)</option>
              <option value="cinematic">Cinematic 21:9</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
              Content Max Width
            </label>
            <select
              value={section.contentWidth}
              onChange={(e) =>
                onChange({
                  contentWidth: e.target.value as HeroSectionData["contentWidth"],
                })
              }
              className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
            >
              <option value="sm">Compact (480px)</option>
              <option value="md">Balanced (640px)</option>
              <option value="lg">Spacious (800px)</option>
              <option value="full">Full Screen Width</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
