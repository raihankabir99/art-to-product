import React, { useState } from "react";
import {
  ArrowLeft,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Copy,
  Save,
  Eye,
  Calendar,
  Send,
  History,
  Type,
  Heading as HeadingIcon,
  Image as ImageIcon,
  Video,
  MousePointer,
  Minus,
  Quote,
  LayoutGrid,
  Sparkles,
  Layers,
  BookOpen,
  MessageSquare,
  HelpCircle,
  Mail,
  Megaphone,
  Space,
  Columns,
  Split,
  Globe,
  Settings,
  AlertCircle,
  CheckCircle2,
  Monitor,
  Tablet,
  Smartphone,
  Wand2,
  Bookmark,
  Sliders,
  Maximize2,
  EyeOff,
  Palette,
  Layout,
  Smartphone as PhoneIcon,
} from "lucide-react";
import { toast } from "sonner";
import type { PageItem, PageBlock, BlockType, ReusableSection } from "../pages-types";
import { PageSEOPanel } from "./PageSEOPanel";
import { PageVersionHistoryModal } from "./PageVersionHistoryModal";
import { PageScheduleModal } from "./PageScheduleModal";
import { PagePublishModal } from "./PagePublishModal";
import { PagePreviewModal } from "./PagePreviewModal";
import { PageAIAssistantModal } from "./PageAIAssistantModal";
import { PageSectionLibraryModal } from "./PageSectionLibraryModal";

interface VisualPageEditorProps {
  page: PageItem;
  onBack: () => void;
  onSave: (updatedPage: PageItem) => void;
}

const BLOCK_LIBRARY: {
  type: BlockType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
}[] = [
  { type: "heading", label: "Heading", icon: HeadingIcon, category: "Basic" },
  { type: "text", label: "Text Block", icon: Type, category: "Basic" },
  { type: "image", label: "Image", icon: ImageIcon, category: "Media" },
  { type: "video", label: "Video", icon: Video, category: "Media" },
  { type: "button", label: "Button", icon: MousePointer, category: "Basic" },
  { type: "divider", label: "Divider", icon: Minus, category: "Layout" },
  { type: "quote", label: "Quote", icon: Quote, category: "Basic" },
  { type: "gallery", label: "Gallery", icon: LayoutGrid, category: "Media" },
  { type: "productGrid", label: "Product Grid", icon: Sparkles, category: "Commerce" },
  { type: "designGrid", label: "Design Grid", icon: Layers, category: "Commerce" },
  { type: "collectionGrid", label: "Collection Grid", icon: LayoutGrid, category: "Commerce" },
  { type: "blogGrid", label: "Blog Grid", icon: BookOpen, category: "Editorial" },
  { type: "testimonial", label: "Testimonial", icon: MessageSquare, category: "Editorial" },
  { type: "faq", label: "FAQ", icon: HelpCircle, category: "Editorial" },
  { type: "newsletter", label: "Newsletter", icon: Mail, category: "Editorial" },
  { type: "banner", label: "Banner", icon: Megaphone, category: "Media" },
  { type: "spacer", label: "Spacer", icon: Space, category: "Layout" },
  { type: "twoColumn", label: "Two Column", icon: Columns, category: "Layout" },
  { type: "threeColumn", label: "Three Column", icon: Columns, category: "Layout" },
  { type: "editorialSplit", label: "Editorial Split", icon: Split, category: "Editorial" },
];

export function VisualPageEditor({ page: initialPage, onBack, onSave }: VisualPageEditorProps) {
  const [page, setPage] = useState<PageItem>(initialPage);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(
    initialPage.blocks && initialPage.blocks.length > 0 ? initialPage.blocks[0].id : null,
  );
  const [leftTab, setLeftTab] = useState<"library" | "reusable">("library");
  const [rightTab, setRightTab] = useState<
    "block" | "layout" | "design" | "responsive" | "seo" | "settings"
  >("block");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");

  // Reusable sections library
  const [reusableSections, setReusableSections] = useState<ReusableSection[]>([
    {
      id: "sec_reu_1",
      name: "Atelier Zero-Waste CTA",
      category: "CTA",
      createdAt: "2026-08-20",
      author: "Elena Vance",
      block: {
        id: `blk_reu_cta_${Date.now()}`,
        type: "newsletter",
        label: "Atelier Zero-Waste CTA",
        settings: {
          heading: "Sustainable Print Ethos",
          body: "Zero excess inventory. Certified 400gsm organic cotton.",
          buttonText: "Join Atelier Dispatch",
        },
      },
    },
    {
      id: "sec_reu_2",
      name: "POD Guarantee Grid",
      category: "Trust",
      createdAt: "2026-08-22",
      author: "Marcus Thorne",
      block: {
        id: `blk_reu_trust_${Date.now()}`,
        type: "testimonial",
        label: "POD Guarantee Grid",
        settings: {
          heading: "100% Archival Quality Guarantee",
          body: "Printed with water-based pigment inks in Berlin & London.",
        },
      },
    },
  ]);

  // Modals state
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isPublishOpen, setIsPublishOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [isSectionLibraryOpen, setIsSectionLibraryOpen] = useState(false);

  const selectedBlock = page.blocks.find((b) => b.id === selectedBlockId);

  const handleAddBlock = (blockType: BlockType, label: string) => {
    const newBlock: PageBlock = {
      id: `blk_${Date.now()}`,
      type: blockType,
      label,
      settings: {
        heading: blockType === "heading" ? "New Section Title" : undefined,
        body: blockType === "text" ? "Enter body paragraph copy..." : undefined,
        alignment: "left",
        width: "contained",
        typography: "sans",
        buttonText: blockType === "button" ? "Explore Drop" : undefined,
        buttonStyle: "gold",
        imageUrl:
          blockType === "image"
            ? "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80"
            : undefined,
      },
    };
    setPage((prev) => ({ ...prev, blocks: [...prev.blocks, newBlock] }));
    setSelectedBlockId(newBlock.id);
    setHasUnsavedChanges(true);
    toast.success(`Added ${label} block to canvas`);
  };

  const handleInsertReusableSection = (reusable: ReusableSection) => {
    const clonedBlock: PageBlock = {
      ...reusable.block,
      id: `blk_${Date.now()}`,
      label: reusable.name,
      isReusable: true,
      reusableName: reusable.name,
    };
    setPage((prev) => ({ ...prev, blocks: [...prev.blocks, clonedBlock] }));
    setSelectedBlockId(clonedBlock.id);
    setHasUnsavedChanges(true);
    toast.success(`Inserted reusable section "${reusable.name}"!`);
  };

  const handleSaveAsReusable = (block: PageBlock) => {
    const name = prompt("Enter a name for this reusable section:", block.label);
    if (!name) return;

    const newReusable: ReusableSection = {
      id: `sec_reu_${Date.now()}`,
      name,
      category: "Custom",
      createdAt: new Date().toISOString().slice(0, 10),
      author: page.author || "Admin Editor",
      block: { ...block },
    };

    setReusableSections((prev) => [...prev, newReusable]);
    toast.success(`Saved "${name}" to Reusable Sections Library!`);
  };

  const handleMoveBlock = (index: number, direction: "up" | "down") => {
    const newBlocks = [...page.blocks];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newBlocks.length) return;
    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[targetIndex];
    newBlocks[targetIndex] = temp;
    setPage((prev) => ({ ...prev, blocks: newBlocks }));
    setHasUnsavedChanges(true);
  };

  const handleDuplicateBlock = (block: PageBlock) => {
    const dup: PageBlock = {
      ...block,
      id: `blk_${Date.now()}`,
      label: `${block.label} (Copy)`,
    };
    setPage((prev) => ({ ...prev, blocks: [...prev.blocks, dup] }));
    setSelectedBlockId(dup.id);
    setHasUnsavedChanges(true);
    toast.info(`Duplicated ${block.label}`);
  };

  const handleDeleteBlock = (id: string) => {
    setPage((prev) => ({ ...prev, blocks: prev.blocks.filter((b) => b.id !== id) }));
    if (selectedBlockId === id) setSelectedBlockId(null);
    setHasUnsavedChanges(true);
    toast.info("Block removed from canvas");
  };

  const handleUpdateBlockSettings = (blockId: string, updatedSettings: Record<string, unknown>) => {
    setPage((prev) => ({
      ...prev,
      blocks: prev.blocks.map((b) =>
        b.id === blockId ? { ...b, settings: { ...b.settings, ...updatedSettings } } : b,
      ),
    }));
    setHasUnsavedChanges(true);
  };

  const handleSaveDraft = () => {
    onSave({
      ...page,
      status: "Draft",
      lastUpdated: new Date().toISOString().replace("T", " ").substring(0, 16),
    });
    setHasUnsavedChanges(false);
    toast.success("Draft saved successfully", {
      description: "Visual canvas and block properties synchronized.",
    });
  };

  const handleConfirmPublish = () => {
    onSave({
      ...page,
      status: "Published",
      lastUpdated: new Date().toISOString().replace("T", " ").substring(0, 16),
    });
    setHasUnsavedChanges(false);
    toast.success(`Published ${page.name} live!`, {
      description: "Updated storefront CDN cache across all regional edges.",
    });
  };

  const widthCanvasClass =
    viewport === "desktop" ? "w-full" : viewport === "tablet" ? "max-w-[768px]" : "max-w-[375px]";

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-background border border-border overflow-hidden animate-fade-in-soft">
      {/* ================= TOP TOOLBAR ================= */}
      <div className="flex items-center justify-between px-4 py-3 bg-surface border-b border-border gap-2 shrink-0">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (hasUnsavedChanges) {
                if (confirm("You have unsaved changes. Leave visual editor?")) onBack();
              } else {
                onBack();
              }
            }}
            className="p-1.5 text-muted-foreground hover:text-foreground border border-border hover:border-foreground transition-colors"
            title="Back to Pages List"
          >
            <ArrowLeft className="size-4" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-display font-medium text-foreground uppercase tracking-wider">
                {page.name}
              </h2>
              <span className="text-[10px] font-mono text-gold bg-gold/10 px-2 py-0.5 border border-gold/30">
                {page.slug}
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/30">
                {page.status}
              </span>
              {hasUnsavedChanges && (
                <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 border border-amber-500/30 flex items-center gap-1">
                  <AlertCircle className="size-3" /> UNSAVED CHANGES
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Viewport & Modal Triggers */}
        <div className="flex items-center gap-2">
          {/* AI Co-Pilot Button */}
          <button
            type="button"
            onClick={() => setIsAIAssistantOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gold/10 text-gold border border-gold/40 hover:bg-gold hover:text-background font-mono text-xs uppercase tracking-wider transition-all font-semibold"
          >
            <Sparkles className="size-3.5 animate-pulse" /> AI Co-Pilot
          </button>

          {/* Add Section Library Button */}
          <button
            type="button"
            onClick={() => setIsSectionLibraryOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-2 text-foreground border border-border hover:border-gold font-mono text-xs transition-colors hidden sm:inline-flex"
          >
            <Plus className="size-3.5 text-gold" /> Section Library
          </button>

          {/* Viewport switchers */}
          <div className="hidden md:flex items-center gap-1 bg-surface-2 p-1 border border-border">
            <button
              type="button"
              onClick={() => setViewport("desktop")}
              className={`p-1.5 text-xs font-mono transition-colors ${
                viewport === "desktop"
                  ? "bg-gold text-background font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Desktop View (100%)"
            >
              <Monitor className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewport("tablet")}
              className={`p-1.5 text-xs font-mono transition-colors ${
                viewport === "tablet"
                  ? "bg-gold text-background font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Tablet View (768px)"
            >
              <Tablet className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewport("mobile")}
              className={`p-1.5 text-xs font-mono transition-colors ${
                viewport === "mobile"
                  ? "bg-gold text-background font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Mobile View (375px)"
            >
              <Smartphone className="size-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsHistoryOpen(true)}
            className="p-2 text-muted-foreground hover:text-foreground border border-border transition-colors hidden sm:inline-flex"
            title="Version History"
          >
            <History className="size-4" />
          </button>

          <button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-2 text-foreground text-xs font-mono border border-border hover:border-gold transition-colors"
          >
            <Eye className="size-3.5" /> Preview
          </button>

          <button
            type="button"
            onClick={() => setIsScheduleOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-2 text-foreground text-xs font-mono border border-border hover:border-gold transition-colors hidden lg:inline-flex"
          >
            <Calendar className="size-3.5" /> Schedule
          </button>

          <button
            type="button"
            onClick={handleSaveDraft}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-2 text-foreground text-xs font-mono border border-border hover:border-gold transition-colors"
          >
            <Save className="size-3.5" /> Save Draft
          </button>

          <button
            type="button"
            onClick={() => setIsPublishOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gold text-background text-xs uppercase tracking-wider font-semibold hover:bg-foreground hover:text-background transition-colors"
          >
            <Send className="size-3.5" /> Publish
          </button>
        </div>
      </div>

      {/* ================= 3-PANEL EDITOR WORKSPACE ================= */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT PANEL: BLOCK LIBRARY & REUSABLE SECTIONS */}
        <div className="w-64 bg-surface border-r border-border flex flex-col shrink-0">
          <div className="flex border-b border-border bg-surface-2/40">
            <button
              type="button"
              onClick={() => setLeftTab("library")}
              className={`flex-1 py-2 text-xs font-mono uppercase tracking-wider transition-colors ${
                leftTab === "library"
                  ? "bg-surface text-gold border-b-2 border-gold font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Blocks
            </button>
            <button
              type="button"
              onClick={() => setLeftTab("reusable")}
              className={`flex-1 py-2 text-xs font-mono uppercase tracking-wider transition-colors ${
                leftTab === "reusable"
                  ? "bg-surface text-gold border-b-2 border-gold font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Reusable ({reusableSections.length})
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-4 custom-scrollbar">
            {leftTab === "library" && (
              <>
                {["Basic", "Media", "Commerce", "Editorial", "Layout"].map((cat) => {
                  const blocks = BLOCK_LIBRARY.filter((b) => b.category === cat);
                  if (blocks.length === 0) return null;
                  return (
                    <div key={cat} className="space-y-1.5">
                      <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest block px-1">
                        {cat}
                      </span>
                      <div className="grid grid-cols-2 gap-1.5">
                        {blocks.map((blk) => {
                          const Icon = blk.icon;
                          return (
                            <button
                              key={blk.type}
                              type="button"
                              onClick={() => handleAddBlock(blk.type, blk.label)}
                              className="p-2 bg-surface-2 border border-border hover:border-gold hover:text-gold text-left text-xs transition-colors flex flex-col items-center justify-center gap-1 text-muted-foreground group"
                            >
                              <Icon className="size-4 text-foreground group-hover:text-gold transition-colors" />
                              <span className="text-[10px] font-mono font-medium truncate w-full text-center">
                                {blk.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </>
            )}

            {leftTab === "reusable" && (
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest block px-1">
                  Saved Reusable Sections
                </span>
                {reusableSections.map((sec) => (
                  <div
                    key={sec.id}
                    className="p-3 bg-surface-2 border border-border hover:border-gold transition-colors space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-foreground group-hover:text-gold">
                        {sec.name}
                      </span>
                      <span className="text-[9px] font-mono text-gold bg-gold/10 px-1.5 py-0.5 border border-gold/30">
                        {sec.category}
                      </span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">
                      Created {sec.createdAt} by {sec.author}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleInsertReusableSection(sec)}
                      className="w-full py-1 bg-gold text-background text-[10px] uppercase font-mono font-semibold tracking-wider hover:bg-foreground hover:text-background transition-colors flex items-center justify-center gap-1"
                    >
                      <Plus className="size-3" /> Insert Section
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CENTER PANEL: LIVE PAGE CANVAS */}
        <div className="flex-1 bg-black/80 overflow-y-auto p-4 sm:p-8 flex justify-center items-start custom-scrollbar">
          <div
            className={`${widthCanvasClass} min-h-[700px] bg-background border border-border shadow-2xl transition-all duration-300 overflow-hidden flex flex-col`}
          >
            {/* Simulated Storefront Header */}
            <div className="border-b border-border bg-surface px-6 py-3 flex items-center justify-between text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
              <span className="text-gold font-display font-bold">STUDIO NOIR</span>
              <span>{page.slug}</span>
            </div>

            {/* Block Stack Canvas */}
            <div className="p-6 space-y-4 flex-1">
              {page.blocks.length === 0 ? (
                <div className="p-12 text-center border-2 border-dashed border-border space-y-3">
                  <Plus className="size-8 text-gold mx-auto" />
                  <p className="text-sm font-display text-foreground uppercase tracking-wider">
                    Canvas Empty
                  </p>
                  <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                    Click any block in the left Library or use the AI Co-Pilot to generate a visual
                    layout.
                  </p>
                </div>
              ) : (
                page.blocks.map((blk, idx) => {
                  const isSelected = blk.id === selectedBlockId;
                  return (
                    <div
                      key={blk.id}
                      onClick={() => setSelectedBlockId(blk.id)}
                      className={`relative p-5 border transition-all cursor-pointer group ${
                        isSelected
                          ? "bg-surface border-gold ring-1 ring-gold shadow-lg"
                          : "bg-surface/60 border-border hover:border-border/80"
                      }`}
                    >
                      {/* Block Controls Bar */}
                      <div className="flex items-center justify-between border-b border-border/60 pb-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-gold bg-gold/10 px-2 py-0.5 border border-gold/30 uppercase">
                            {blk.label}
                          </span>
                          {blk.isReusable && (
                            <span className="text-[9px] font-mono text-sky-400 bg-sky-500/10 px-1.5 py-0.5 border border-sky-500/30">
                              REUSABLE
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSaveAsReusable(blk);
                            }}
                            className="p-1 hover:text-gold text-muted-foreground"
                            title="Save as Reusable Section"
                          >
                            <Bookmark className="size-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMoveBlock(idx, "up");
                            }}
                            disabled={idx === 0}
                            className="p-1 hover:text-gold text-muted-foreground disabled:opacity-30"
                            title="Move Up"
                          >
                            <MoveUp className="size-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMoveBlock(idx, "down");
                            }}
                            disabled={idx === page.blocks.length - 1}
                            className="p-1 hover:text-gold text-muted-foreground disabled:opacity-30"
                            title="Move Down"
                          >
                            <MoveDown className="size-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDuplicateBlock(blk);
                            }}
                            className="p-1 hover:text-gold text-muted-foreground"
                            title="Duplicate"
                          >
                            <Copy className="size-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteBlock(blk.id);
                            }}
                            className="p-1 hover:text-red-400 text-muted-foreground"
                            title="Delete"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Block Visual Content */}
                      <div className="space-y-2">
                        {blk.settings.heading && (
                          <h3 className="text-lg font-display text-foreground">
                            {blk.settings.heading}
                          </h3>
                        )}
                        {blk.settings.body && (
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {blk.settings.body}
                          </p>
                        )}
                        {blk.settings.imageUrl && (
                          <img
                            src={blk.settings.imageUrl}
                            alt="Block Asset"
                            className="w-full h-36 object-cover border border-border"
                          />
                        )}
                        {blk.settings.buttonText && (
                          <button
                            type="button"
                            className="px-4 py-1.5 bg-gold text-background text-xs font-semibold uppercase tracking-wider"
                          >
                            {blk.settings.buttonText}
                          </button>
                        )}
                        {!blk.settings.heading &&
                          !blk.settings.body &&
                          !blk.settings.imageUrl &&
                          !blk.settings.buttonText && (
                            <p className="text-xs font-mono text-muted-foreground italic">
                              [{blk.label} module configured on canvas]
                            </p>
                          )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: 6-TAB INSPECTOR & SETTINGS */}
        <div className="w-80 bg-surface border-l border-border flex flex-col shrink-0">
          <div className="grid grid-cols-6 border-b border-border bg-surface-2/40 text-[10px] font-mono uppercase">
            {[
              { id: "block", label: "Block" },
              { id: "layout", label: "Layout" },
              { id: "design", label: "Design" },
              { id: "responsive", label: "Resp" },
              { id: "seo", label: "SEO" },
              { id: "settings", label: "Page" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() =>
                  setRightTab(
                    tab.id as "block" | "layout" | "design" | "responsive" | "seo" | "settings",
                  )
                }
                className={`py-2 text-center truncate transition-colors ${
                  rightTab === tab.id
                    ? "bg-surface text-gold border-b-2 border-gold font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {rightTab === "block" &&
              (selectedBlock ? (
                <div className="space-y-4 animate-fade-in-soft">
                  <div className="p-3 bg-surface-2 border border-border">
                    <span className="text-[10px] font-mono text-gold uppercase block">
                      Editing Block
                    </span>
                    <h4 className="text-xs font-bold text-foreground uppercase">
                      {selectedBlock.label}
                    </h4>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase text-muted-foreground block mb-1">
                      Heading Text
                    </label>
                    <input
                      type="text"
                      value={selectedBlock.settings.heading || ""}
                      onChange={(e) =>
                        handleUpdateBlockSettings(selectedBlock.id, { heading: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase text-muted-foreground block mb-1">
                      Body Copy
                    </label>
                    <textarea
                      value={selectedBlock.settings.body || ""}
                      onChange={(e) =>
                        handleUpdateBlockSettings(selectedBlock.id, { body: e.target.value })
                      }
                      rows={4}
                      className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold resize-none"
                    />
                  </div>

                  {selectedBlock.settings.buttonText !== undefined && (
                    <div>
                      <label className="text-[11px] font-mono uppercase text-muted-foreground block mb-1">
                        Button Label
                      </label>
                      <input
                        type="text"
                        value={selectedBlock.settings.buttonText}
                        onChange={(e) =>
                          handleUpdateBlockSettings(selectedBlock.id, {
                            buttonText: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
                      />
                    </div>
                  )}

                  {selectedBlock.settings.imageUrl !== undefined && (
                    <div>
                      <label className="text-[11px] font-mono uppercase text-muted-foreground block mb-1">
                        Image Asset URL
                      </label>
                      <input
                        type="text"
                        value={selectedBlock.settings.imageUrl}
                        onChange={(e) =>
                          handleUpdateBlockSettings(selectedBlock.id, { imageUrl: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-surface-2 border border-border text-xs font-mono text-foreground focus:outline-none focus:border-gold"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-8 text-center text-xs font-mono text-muted-foreground">
                  Select any block on the central canvas to inspect and edit properties.
                </div>
              ))}

            {rightTab === "layout" && selectedBlock && (
              <div className="space-y-4 animate-fade-in-soft">
                <h4 className="text-xs font-mono font-bold uppercase text-foreground">
                  Layout & Alignment
                </h4>
                <div>
                  <label className="text-[11px] font-mono uppercase text-muted-foreground block mb-1">
                    Text Alignment
                  </label>
                  <select
                    value={selectedBlock.settings.alignment || "left"}
                    onChange={(e) =>
                      handleUpdateBlockSettings(selectedBlock.id, { alignment: e.target.value })
                    }
                    className="w-full px-2 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
                  >
                    <option value="left">Left Aligned</option>
                    <option value="center">Centered</option>
                    <option value="right">Right Aligned</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-muted-foreground block mb-1">
                    Container Width
                  </label>
                  <select
                    value={selectedBlock.settings.width || "contained"}
                    onChange={(e) =>
                      handleUpdateBlockSettings(selectedBlock.id, { width: e.target.value })
                    }
                    className="w-full px-2 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
                  >
                    <option value="full">Full Screen Edge-to-Edge</option>
                    <option value="contained">Contained (1200px)</option>
                    <option value="narrow">Narrow Reader View (800px)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-muted-foreground block mb-1">
                    Vertical Padding Top / Bottom
                  </label>
                  <select
                    value={selectedBlock.settings.spacingTop || "md"}
                    onChange={(e) =>
                      handleUpdateBlockSettings(selectedBlock.id, { spacingTop: e.target.value })
                    }
                    className="w-full px-2 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
                  >
                    <option value="none">None (0px)</option>
                    <option value="sm">Tight (16px)</option>
                    <option value="md">Standard (32px)</option>
                    <option value="lg">Spacious (64px)</option>
                  </select>
                </div>
              </div>
            )}

            {rightTab === "design" && selectedBlock && (
              <div className="space-y-4 animate-fade-in-soft">
                <h4 className="text-xs font-mono font-bold uppercase text-foreground">
                  Design & Atmosphere
                </h4>
                <div>
                  <label className="text-[11px] font-mono uppercase text-muted-foreground block mb-1">
                    Background Treatment
                  </label>
                  <select
                    value={selectedBlock.settings.backgroundTreatment || "default"}
                    onChange={(e) =>
                      handleUpdateBlockSettings(selectedBlock.id, {
                        backgroundTreatment: e.target.value,
                      })
                    }
                    className="w-full px-2 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
                  >
                    <option value="default">Default Background</option>
                    <option value="surface">Surface-2 Highlight</option>
                    <option value="gold-subtle">Subtle Gold Glow</option>
                    <option value="darkroom">Darkroom Pure Black</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-muted-foreground block mb-1">
                    Typography Pairing
                  </label>
                  <select
                    value={selectedBlock.settings.typography || "sans"}
                    onChange={(e) =>
                      handleUpdateBlockSettings(selectedBlock.id, { typography: e.target.value })
                    }
                    className="w-full px-2 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
                  >
                    <option value="display">Playfair Display Serif</option>
                    <option value="sans">Plus Jakarta Sans</option>
                    <option value="mono">Space Grotesk Mono</option>
                  </select>
                </div>
              </div>
            )}

            {rightTab === "responsive" && selectedBlock && (
              <div className="space-y-4 animate-fade-in-soft">
                <h4 className="text-xs font-mono font-bold uppercase text-foreground">
                  Responsive Visibility
                </h4>
                <div className="p-3 bg-surface-2 border border-border space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span>Hide on Mobile (&lt; 640px)</span>
                    <input
                      type="checkbox"
                      checked={selectedBlock.settings.visibility === "desktop"}
                      onChange={(e) =>
                        handleUpdateBlockSettings(selectedBlock.id, {
                          visibility: e.target.checked ? "desktop" : "all",
                        })
                      }
                      className="accent-gold"
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span>Hide on Desktop (&gt; 1024px)</span>
                    <input
                      type="checkbox"
                      checked={selectedBlock.settings.visibility === "mobile"}
                      onChange={(e) =>
                        handleUpdateBlockSettings(selectedBlock.id, {
                          visibility: e.target.checked ? "mobile" : "all",
                        })
                      }
                      className="accent-gold"
                    />
                  </div>
                </div>
              </div>
            )}

            {rightTab === "seo" && (
              <PageSEOPanel
                seo={page.seo}
                onChange={(updatedSeo) => {
                  setPage((prev) => ({ ...prev, seo: updatedSeo }));
                  setHasUnsavedChanges(true);
                }}
              />
            )}

            {rightTab === "settings" && (
              <div className="space-y-4 animate-fade-in-soft">
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-1">
                    Page Name
                  </label>
                  <input
                    type="text"
                    value={page.name}
                    onChange={(e) => {
                      setPage((prev) => ({ ...prev, name: e.target.value }));
                      setHasUnsavedChanges(true);
                    }}
                    className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-1">
                    URL / Slug
                  </label>
                  <input
                    type="text"
                    value={page.slug}
                    onChange={(e) => {
                      setPage((prev) => ({ ...prev, slug: e.target.value }));
                      setHasUnsavedChanges(true);
                    }}
                    className="w-full px-3 py-2 bg-surface-2 border border-border text-xs font-mono text-gold focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-1">
                    Visibility
                  </label>
                  <select
                    value={page.visibility}
                    onChange={(e) => {
                      setPage((prev) => ({
                        ...prev,
                        visibility: e.target.value as "Public" | "Hidden" | "Password Protected",
                      }));
                      setHasUnsavedChanges(true);
                    }}
                    className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
                  >
                    <option value="Public">Public (Visible to all)</option>
                    <option value="Hidden">Hidden (Direct URL only)</option>
                    <option value="Password Protected">Password Protected</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= MODALS ================= */}
      <PageVersionHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        pageName={page.name}
        versions={page.versions}
        onRestore={(ver) => {
          setHasUnsavedChanges(true);
          toast.info(`Restored snapshot ${ver.version}`);
        }}
      />

      <PageScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        pageName={page.name}
        initialPublishDate={page.scheduledPublishDate}
        onSchedule={(pubDate, unpubDate, tz) => {
          setPage((prev) => ({
            ...prev,
            status: pubDate ? "Scheduled" : "Draft",
            scheduledPublishDate: pubDate,
            scheduledUnpublishDate: unpubDate,
            timezone: tz,
          }));
          setHasUnsavedChanges(true);
        }}
      />

      <PagePublishModal
        isOpen={isPublishOpen}
        onClose={() => setIsPublishOpen(false)}
        page={page}
        changesCount={page.blocks.length}
        onConfirmPublish={handleConfirmPublish}
      />

      <PagePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        page={page}
      />

      <PageAIAssistantModal
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
        pageName={page.name}
        onApplyStructure={(blocks) => {
          setPage((prev) => ({ ...prev, blocks: [...prev.blocks, ...blocks] }));
          setHasUnsavedChanges(true);
        }}
        onApplySEO={(seoUpdate) => {
          setPage((prev) => ({ ...prev, seo: { ...prev.seo, ...seoUpdate } }));
          setHasUnsavedChanges(true);
        }}
      />

      <PageSectionLibraryModal
        isOpen={isSectionLibraryOpen}
        onClose={() => setIsSectionLibraryOpen(false)}
        onAddBlock={handleAddBlock}
      />
    </div>
  );
}
