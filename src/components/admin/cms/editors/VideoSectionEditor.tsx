import { useState } from "react";
import {
  Video,
  Play,
  Pause,
  Upload,
  Sparkles,
  Volume2,
  VolumeX,
  Repeat,
  Sliders,
  Eye,
  ExternalLink,
  Layers,
} from "lucide-react";
import type { VideoSectionData } from "../homepage-types";
import { toast } from "sonner";

interface VideoSectionEditorProps {
  section: VideoSectionData;
  onChange: (updated: Partial<VideoSectionData>) => void;
}

export function VideoSectionEditor({ section, onChange }: VideoSectionEditorProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleAiCopy = () => {
    const titles = [
      "THE ANATOMY OF CRAFT: NOCTURNE ATELIER",
      "FROM VECTOR TO FABRIC: ZERO WASTE PRINTING",
      "THE SOUND OF SILENT MAKING",
      "ARCHITECTURAL GRAPHICS IN MOTION",
    ];
    const picked = titles[Math.floor(Math.random() * titles.length)]!;
    onChange({
      heading: picked,
      subheading:
        "A cinematic immersion into our Berlin textile laboratories and sustainable direct-to-garment pigment baths.",
    });
    toast.success("AI synthesized cinematic video narrative", { description: picked });
  };

  const handleMockUploadPoster = () => {
    toast.info("Uploaded high-resolution video poster frame (4K UHD).");
  };

  return (
    <div className="space-y-6 animate-fade-in-soft">
      {/* AI Assistance Toolbar */}
      <div className="p-3 bg-gold/10 border border-gold/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-gold" />
          <span className="text-xs font-mono text-gold font-medium">
            Video Storytelling Copilot
          </span>
        </div>
        <button
          type="button"
          onClick={handleAiCopy}
          className="px-2.5 py-1 bg-surface-2 border border-gold/40 hover:bg-gold hover:text-background text-[10px] font-mono uppercase tracking-wider text-foreground transition-colors"
        >
          Generate Story Copy
        </button>
      </div>

      {/* Video Preview Player Box */}
      <div className="space-y-2">
        <label className="text-[10px] uppercase font-mono text-muted-foreground block">
          Cinematic Video Stream Preview
        </label>
        <div className="relative aspect-video w-full bg-black border border-border overflow-hidden group">
          <img
            src={
              section.posterImage ||
              "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80"
            }
            alt="Video poster thumbnail"
            className="size-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
          />
          <div
            className="absolute inset-0 bg-black pointer-events-none transition-opacity"
            style={{ opacity: (section.overlayOpacity || 50) / 100 }}
          />

          {/* Overlay Content Preview */}
          <div className="absolute inset-0 p-4 flex flex-col justify-between z-10 pointer-events-none">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono uppercase bg-black/80 px-2 py-0.5 text-gold border border-gold/30">
                {section.videoAspect || "16:9 Widescreen"}
              </span>
              <div className="flex items-center gap-1">
                {section.autoplay && (
                  <span className="text-[8px] font-mono uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-1.5 py-0.2">
                    AUTOPLAY
                  </span>
                )}
                {section.mute && (
                  <span className="text-[8px] font-mono uppercase bg-zinc-800 text-zinc-300 px-1.5 py-0.2">
                    MUTED
                  </span>
                )}
              </div>
            </div>

            <div className="text-center">
              <p className="text-[10px] font-mono uppercase text-gold tracking-widest">
                {section.eyebrow || "STUDIO DOCUMENTARY"}
              </p>
              <h3 className="text-sm font-display font-medium text-white mt-1">
                {section.heading || "The Making of Atelier Noir"}
              </h3>
            </div>

            <div className="flex items-center justify-center">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="size-10 rounded-full bg-gold/90 text-background flex items-center justify-center shadow-xl hover:scale-110 transition-transform pointer-events-auto"
              >
                {isPlaying ? <Pause className="size-4" /> : <Play className="size-4 ml-0.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Source Controls */}
      <div className="space-y-4 pt-4 border-t border-border">
        <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider">
          Video Source & Asset
        </h4>

        <div>
          <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
            Video Source URL (.mp4 / HLS / CDN)
          </label>
          <input
            type="text"
            value={section.videoUrl || ""}
            onChange={(e) => onChange({ videoUrl: e.target.value })}
            placeholder="https://cdn.ateliernoir.studio/video/craft-2026-uhd.mp4"
            className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs font-mono text-foreground focus:outline-none focus:border-gold"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-[10px] uppercase font-mono text-muted-foreground">
              Poster Image Frame URL
            </label>
            <button
              type="button"
              onClick={handleMockUploadPoster}
              className="text-[10px] font-mono text-gold hover:underline flex items-center gap-1"
            >
              <Upload className="size-3" /> Upload Poster
            </button>
          </div>
          <input
            type="text"
            value={section.posterImage || ""}
            onChange={(e) => onChange({ posterImage: e.target.value })}
            placeholder="https://images.unsplash.com/photo-..."
            className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
              Aspect Ratio
            </label>
            <select
              value={section.videoAspect || "16:9"}
              onChange={(e) =>
                onChange({
                  videoAspect: e.target.value as VideoSectionData["videoAspect"],
                })
              }
              className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
            >
              <option value="16:9">16:9 Standard HD</option>
              <option value="21:9">21:9 Cinematic Widescreen</option>
              <option value="4:3">4:3 Editorial Box</option>
              <option value="full-bleed">Full Bleed Hero Canvas</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
              Dark Overlay ({section.overlayOpacity ?? 40}%)
            </label>
            <input
              type="range"
              min="0"
              max="90"
              value={section.overlayOpacity ?? 40}
              onChange={(e) => onChange({ overlayOpacity: Number(e.target.value) })}
              className="w-full accent-gold cursor-pointer mt-2"
            />
          </div>
        </div>
      </div>

      {/* Playback Toggles */}
      <div className="space-y-3 pt-4 border-t border-border">
        <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider">
          Playback Behavior
        </h4>

        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => onChange({ autoplay: !section.autoplay })}
            className={`p-2.5 border text-center transition-colors ${
              section.autoplay
                ? "bg-gold/10 border-gold text-foreground"
                : "bg-surface-2 border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            <Play className="size-4 mx-auto mb-1 text-gold" />
            <span className="text-[10px] font-mono block uppercase">Autoplay</span>
            <span className="text-[9px] font-mono text-muted-foreground">
              {section.autoplay ? "ON" : "OFF"}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onChange({ mute: !section.mute })}
            className={`p-2.5 border text-center transition-colors ${
              section.mute
                ? "bg-gold/10 border-gold text-foreground"
                : "bg-surface-2 border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {section.mute ? (
              <VolumeX className="size-4 mx-auto mb-1 text-gold" />
            ) : (
              <Volume2 className="size-4 mx-auto mb-1 text-muted-foreground" />
            )}
            <span className="text-[10px] font-mono block uppercase">Mute Audio</span>
            <span className="text-[9px] font-mono text-muted-foreground">
              {section.mute ? "MUTED" : "SOUND ON"}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onChange({ loop: !section.loop })}
            className={`p-2.5 border text-center transition-colors ${
              section.loop
                ? "bg-gold/10 border-gold text-foreground"
                : "bg-surface-2 border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            <Repeat className="size-4 mx-auto mb-1 text-gold" />
            <span className="text-[10px] font-mono block uppercase">Loop</span>
            <span className="text-[9px] font-mono text-muted-foreground">
              {section.loop ? "REPEAT" : "ONCE"}
            </span>
          </button>
        </div>
      </div>

      {/* Typography & CTAs */}
      <div className="space-y-4 pt-4 border-t border-border">
        <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider">
          Overlay Typography & CTA
        </h4>

        <div>
          <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
            Eyebrow Tag
          </label>
          <input
            type="text"
            value={section.eyebrow || ""}
            onChange={(e) => onChange({ eyebrow: e.target.value })}
            placeholder="e.g. STUDIO DOCUMENTARY"
            className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
          />
        </div>

        <div>
          <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
            Video Title / Headline
          </label>
          <input
            type="text"
            value={section.heading}
            onChange={(e) => onChange({ heading: e.target.value })}
            placeholder="e.g. The Architecture of Modern Print-on-Demand"
            className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
          />
        </div>

        <div>
          <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
            Subheading / Synopsis
          </label>
          <textarea
            rows={2}
            value={section.subheading || ""}
            onChange={(e) => onChange({ subheading: e.target.value })}
            placeholder="Short 1-2 sentence description..."
            className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
              CTA Button Label
            </label>
            <input
              type="text"
              value={section.ctaText || ""}
              onChange={(e) => onChange({ ctaText: e.target.value })}
              placeholder="e.g. Watch Full Film"
              className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase font-mono text-muted-foreground block mb-1">
              CTA Target Link
            </label>
            <input
              type="text"
              value={section.ctaLink || ""}
              onChange={(e) => onChange({ ctaLink: e.target.value })}
              placeholder="/journal/studio-film"
              className="w-full px-3 py-1.5 bg-surface-2 border border-border text-xs font-mono text-foreground focus:outline-none focus:border-gold"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
