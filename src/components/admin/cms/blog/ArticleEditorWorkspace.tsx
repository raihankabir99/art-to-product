import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Save,
  Eye,
  Calendar,
  Sparkles,
  History,
  Check,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Copy,
  Sliders,
  Image as ImageIcon,
  Type,
  Heading as HeadingIcon,
  Quote,
  Minus,
  List,
  ListOrdered,
  ShoppingBag,
  Layers,
  Megaphone,
  Video,
  Code,
  Upload,
  Clock,
  Globe,
  Tag,
  User,
  CheckCircle2,
  FileText,
  HelpCircle,
  Share2,
  BarChart3,
  Search,
} from "lucide-react";
import { toast } from "sonner";
import { ArticleItem, ArticleBlock, ArticleBlockType, ArticleStatus } from "./blog-types";
import { INITIAL_AUTHORS, INITIAL_CATEGORIES, INITIAL_TAGS } from "./blog-initial-data";
import { AIContentStudioPanel } from "./AIContentStudioPanel";
import { ArticleSEOPanel } from "./ArticleSEOPanel";
import { ArticlePreviewModal } from "./ArticlePreviewModal";
import { ArticleScheduleModal } from "./ArticleScheduleModal";
import { AIArticleGenWizardModal } from "./AIArticleGenWizardModal";

interface ArticleEditorWorkspaceProps {
  initialArticle: ArticleItem;
  onBack: () => void;
  onSaveArticle: (article: ArticleItem) => void;
}

const BLOCK_LIBRARY_ITEMS: {
  type: ArticleBlockType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  category: "Text" | "Media" | "Commerce" | "Structure";
  description: string;
}[] = [
  {
    type: "paragraph",
    label: "Paragraph",
    icon: Type,
    category: "Text",
    description: "Standard body copy with typography hierarchy",
  },
  {
    type: "heading",
    label: "Heading (H2)",
    icon: HeadingIcon,
    category: "Text",
    description: "Major section division",
  },
  {
    type: "subheading",
    label: "Subheading (H3)",
    icon: Type,
    category: "Text",
    description: "Secondary section breakdown",
  },
  {
    type: "quote",
    label: "Pullquote",
    icon: Quote,
    category: "Text",
    description: "Editorial pullquote with author attribution",
  },
  {
    type: "bullet_list",
    label: "Bullet List",
    icon: List,
    category: "Text",
    description: "Unordered feature list",
  },
  {
    type: "numbered_list",
    label: "Numbered List",
    icon: ListOrdered,
    category: "Text",
    description: "Sequential points or steps",
  },
  {
    type: "image",
    label: "Editorial Image",
    icon: ImageIcon,
    category: "Media",
    description: "High-resolution photo with caption",
  },
  {
    type: "gallery",
    label: "Image Gallery",
    icon: Layers,
    category: "Media",
    description: "Multi-photo comparison grid",
  },
  {
    type: "video",
    label: "Video Player",
    icon: Video,
    category: "Media",
    description: "Vimeo, YouTube, or direct MP4 stream",
  },
  {
    type: "embed",
    label: "Custom Embed",
    icon: Code,
    category: "Media",
    description: "Interactive widget, 3D model, or audio",
  },
  {
    type: "product",
    label: "POD Product Card",
    icon: ShoppingBag,
    category: "Commerce",
    description: "Featured apparel or poster with price & CTA",
  },
  {
    type: "collection",
    label: "Collection Banner",
    icon: Layers,
    category: "Commerce",
    description: "Capsule lookbook gateway",
  },
  {
    type: "cta",
    label: "Call to Action / Box",
    icon: Megaphone,
    category: "Commerce",
    description: "Newsletter box or promotion banner",
  },
  {
    type: "divider",
    label: "Divider Rule",
    icon: Minus,
    category: "Structure",
    description: "Subtle architectural separator",
  },
];

export function ArticleEditorWorkspace({
  initialArticle,
  onBack,
  onSaveArticle,
}: ArticleEditorWorkspaceProps) {
  const [article, setArticle] = useState<ArticleItem>(initialArticle);
  const [activeRightTab, setActiveRightTab] = useState<
    "publishing" | "cover" | "seo" | "ai" | "commerce" | "history" | "analytics"
  >("publishing");
  const [leftTab, setLeftTab] = useState<"library" | "outline">("library");

  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(
    article.blocks[0]?.id || null,
  );

  // Autosave UI state
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">("saved");

  // Modals
  const [previewOpen, setPreviewOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [aiWizardOpen, setAiWizardOpen] = useState(false);

  // Word count & Read time calculation
  const totalWords = article.blocks.reduce(
    (acc, b) => {
      const text = (b.content || "") + " " + JSON.stringify(b.settings || {});
      return acc + text.split(/\s+/).filter(Boolean).length;
    },
    (article.title + " " + article.excerpt).split(/\s+/).filter(Boolean).length,
  );

  const calculatedReadTime = `${Math.max(1, Math.ceil(totalWords / 200))} min read`;

  const markUnsaved = () => {
    setSaveStatus("unsaved");
  };

  const handleAddBlock = (type: ArticleBlockType, insertAfterIndex?: number) => {
    const newBlock: ArticleBlock = {
      id: `blk_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      type,
      content:
        type === "heading"
          ? "New Section Heading"
          : type === "subheading"
            ? "Subsection Insight"
            : type === "quote"
              ? "Design is not just what it looks like; design is how it functions."
              : type === "paragraph"
                ? "Enter your refined editorial text here..."
                : "",
      settings:
        type === "product"
          ? {
              productId: "tshirt",
              productTitle: "Midnight Lion Heavyweight T-Shirt",
              productCategory: "240gsm Organic Jersey",
              productPrice: "€49.00",
              productImage:
                "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
              productBadge: "Bestseller",
            }
          : type === "collection"
            ? {
                collectionTitle: "The Nocturne Capsule",
                collectionSubtitle: "14 exclusive artworks translated across heavyweight apparel.",
              }
            : type === "cta"
              ? {
                  ctaTitle: "RECEIVE PRIORITY DROPS & EDITORIAL ESSAYS",
                  ctaSubtitle: "Strictly limited print runs. Delivered directly to your inbox.",
                  ctaButtonText: "SUBSCRIBE NOW",
                  ctaStyle: "gold",
                }
              : type === "image"
                ? {
                    imageUrl:
                      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=80",
                    imageCaption: "Studio Noir Garment Detail",
                    aspectRatio: "16/9",
                  }
                : {},
    };

    if (insertAfterIndex !== undefined && insertAfterIndex >= 0) {
      const nextBlocks = [...article.blocks];
      nextBlocks.splice(insertAfterIndex + 1, 0, newBlock);
      setArticle((prev) => ({ ...prev, blocks: nextBlocks }));
    } else {
      setArticle((prev) => ({ ...prev, blocks: [...prev.blocks, newBlock] }));
    }

    setSelectedBlockId(newBlock.id);
    markUnsaved();
    toast.success(`Added ${type} block`);
  };

  const handleUpdateBlock = (id: string, updates: Partial<ArticleBlock>) => {
    setArticle((prev) => ({
      ...prev,
      blocks: prev.blocks.map((b) => (b.id === id ? { ...b, ...updates } : b)),
    }));
    markUnsaved();
  };

  const handleDeleteBlock = (id: string) => {
    setArticle((prev) => ({
      ...prev,
      blocks: prev.blocks.filter((b) => b.id !== id),
    }));
    if (selectedBlockId === id) setSelectedBlockId(null);
    markUnsaved();
    toast.info("Block removed");
  };

  const handleMoveBlock = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= article.blocks.length) return;
    const nextBlocks = [...article.blocks];
    const [moved] = nextBlocks.splice(index, 1);
    nextBlocks.splice(targetIndex, 0, moved);
    setArticle((prev) => ({ ...prev, blocks: nextBlocks }));
    markUnsaved();
  };

  const handleDuplicateBlock = (block: ArticleBlock, index: number) => {
    const duplicated: ArticleBlock = {
      ...block,
      id: `blk_${Date.now()}`,
      settings: block.settings ? { ...block.settings } : {},
    };
    const nextBlocks = [...article.blocks];
    nextBlocks.splice(index + 1, 0, duplicated);
    setArticle((prev) => ({ ...prev, blocks: nextBlocks }));
    markUnsaved();
    toast.success("Block duplicated");
  };

  const handleSave = (newStatus?: ArticleStatus) => {
    setSaveStatus("saving");
    const updated: ArticleItem = {
      ...article,
      status: newStatus || article.status,
      readTime: calculatedReadTime,
      lastUpdated: new Date().toISOString().replace("T", " ").substring(0, 16),
      versions: [
        {
          id: `v_${Date.now()}`,
          versionNumber: (article.versions.length || 0) + 1,
          timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
          author: article.author || "Creative Studio",
          changeSummary:
            newStatus === "published" ? "Published live edition" : "Saved draft revisions",
          wordCount: totalWords,
          snapshotTitle: `${article.title} (v${(article.versions.length || 0) + 1})`,
        },
        ...article.versions,
      ],
    };

    setTimeout(() => {
      setArticle(updated);
      onSaveArticle(updated);
      setSaveStatus("saved");
      toast.success(
        newStatus === "published"
          ? "Article Published Successfully!"
          : "Article Changes Saved & Staged",
      );
    }, 400);
  };

  const selectedBlock = article.blocks.find((b) => b.id === selectedBlockId);

  return (
    <div className="space-y-4 animate-fade-in-soft">
      {/* ================= TOP NAVIGATION & COMMAND BAR ================= */}
      <div className="p-4 bg-surface border border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="p-2 text-muted-foreground hover:text-foreground border border-border hover:border-gold transition-colors"
            title="Back to Blog Studio"
          >
            <ArrowLeft className="size-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase text-gold font-semibold">
                EDITORIAL WORKSPACE
              </span>
              <span className="text-muted-foreground text-xs">•</span>
              <span
                className={`text-[10px] font-mono uppercase px-2 py-0.5 border ${
                  article.status === "published"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                    : article.status === "scheduled"
                      ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                      : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                }`}
              >
                {article.status.toUpperCase()}
              </span>
              <span className="text-[11px] font-mono text-muted-foreground hidden sm:inline">
                • {calculatedReadTime} • {totalWords} words
              </span>
            </div>
            <p className="text-sm font-semibold text-foreground truncate max-w-md">
              {article.title || "Untitled Article"}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Autosave Status */}
          <div className="text-[11px] font-mono text-muted-foreground flex items-center gap-1.5 mr-2">
            {saveStatus === "saving" ? (
              <span className="text-gold animate-pulse">Saving...</span>
            ) : saveStatus === "saved" ? (
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="size-3" /> Saved just now
              </span>
            ) : (
              <span className="text-amber-400">Unsaved changes</span>
            )}
          </div>

          <button
            type="button"
            onClick={() => setAiWizardOpen(true)}
            className="px-3 py-1.5 bg-surface-2 border border-gold/40 hover:border-gold text-xs font-mono uppercase text-gold hover:text-foreground flex items-center gap-1.5 transition-colors"
          >
            <Sparkles className="size-3.5 text-gold" /> AI Wizard
          </button>

          <button
            type="button"
            onClick={() => setPreviewOpen(true)}
            className="px-3 py-1.5 bg-surface-2 border border-border hover:border-gold text-xs font-mono uppercase text-foreground flex items-center gap-1.5 transition-colors"
          >
            <Eye className="size-3.5" /> Preview
          </button>

          <button
            type="button"
            onClick={() => setScheduleOpen(true)}
            className="px-3 py-1.5 bg-surface-2 border border-border hover:border-gold text-xs font-mono uppercase text-foreground flex items-center gap-1.5 transition-colors"
          >
            <Calendar className="size-3.5" /> Schedule
          </button>

          <button
            type="button"
            onClick={() => handleSave("draft")}
            className="px-3.5 py-1.5 bg-surface-2 border border-border hover:border-gold text-xs font-mono uppercase font-semibold text-foreground flex items-center gap-1.5 transition-colors"
          >
            <Save className="size-3.5" /> Save Draft
          </button>

          <button
            type="button"
            onClick={() => handleSave("published")}
            className="px-4 py-1.5 bg-gold text-background text-xs font-mono uppercase font-bold hover:bg-foreground hover:text-background flex items-center gap-1.5 transition-colors shadow-md"
          >
            <Check className="size-3.5" /> Publish Live
          </button>
        </div>
      </div>

      {/* ================= 3-COLUMN EDITORIAL WORKSPACE ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* ---------------- LEFT PANEL (3 Cols on Desktop): Block Library & Outline ---------------- */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-surface border border-border p-4 space-y-3">
            <div className="flex border-b border-border text-xs font-mono">
              <button
                type="button"
                onClick={() => setLeftTab("library")}
                className={`flex-1 py-2 text-center border-b-2 transition-colors ${
                  leftTab === "library"
                    ? "border-gold text-gold font-semibold"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                + Add Blocks
              </button>
              <button
                type="button"
                onClick={() => setLeftTab("outline")}
                className={`flex-1 py-2 text-center border-b-2 transition-colors ${
                  leftTab === "outline"
                    ? "border-gold text-gold font-semibold"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Outline ({article.blocks.length})
              </button>
            </div>

            {leftTab === "library" ? (
              <div className="space-y-4 max-h-[620px] overflow-y-auto pr-1">
                {(["Text", "Media", "Commerce", "Structure"] as const).map((cat) => {
                  const items = BLOCK_LIBRARY_ITEMS.filter((i) => i.category === cat);
                  return (
                    <div key={cat} className="space-y-1.5">
                      <span className="text-[10px] font-mono uppercase text-muted-foreground tracking-wider block">
                        {cat}
                      </span>
                      <div className="grid grid-cols-1 gap-1.5">
                        {items.map((item) => {
                          const IconComp = item.icon;
                          return (
                            <button
                              key={item.type}
                              type="button"
                              onClick={() => handleAddBlock(item.type)}
                              className="p-2 bg-surface-2 hover:bg-surface-2/80 border border-border hover:border-gold/60 text-left transition-all group flex items-start gap-2.5"
                            >
                              <div className="p-1.5 bg-background border border-border group-hover:border-gold/50 group-hover:text-gold shrink-0">
                                <IconComp className="size-3.5" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-medium text-foreground group-hover:text-gold truncate">
                                  {item.label}
                                </p>
                                <p className="text-[10px] text-muted-foreground truncate">
                                  {item.description}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* OUTLINE TAB */
              <div className="space-y-1.5 max-h-[620px] overflow-y-auto pr-1">
                {article.blocks.map((blk, idx) => (
                  <div
                    key={blk.id}
                    onClick={() => setSelectedBlockId(blk.id)}
                    className={`p-2 border text-xs cursor-pointer transition-all flex items-center justify-between ${
                      selectedBlockId === blk.id
                        ? "bg-gold/10 border-gold text-foreground"
                        : "bg-surface-2/60 border-border hover:border-gold/40 text-muted-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-mono text-[10px] text-muted-foreground">
                        {idx + 1}.
                      </span>
                      <span className="font-mono text-[10px] uppercase text-gold">
                        [{blk.type}]
                      </span>
                      <span className="truncate">{blk.content || "Empty content"}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ---------------- CENTER PANEL (6 Cols on Desktop): Editorial Writing Canvas ---------------- */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-surface border border-border p-6 md:p-8 space-y-6">
            {/* Cover image preview in canvas */}
            {article.featuredImage ? (
              <div className="relative group border border-border overflow-hidden">
                <div className="aspect-[16/9] w-full bg-surface-2 overflow-hidden">
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveRightTab("cover")}
                    className="px-3 py-1.5 bg-gold text-background text-xs font-mono uppercase font-semibold hover:bg-foreground hover:text-background"
                  >
                    Change Cover Image
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setArticle((prev) => ({ ...prev, featuredImage: "" }));
                      markUnsaved();
                    }}
                    className="px-3 py-1.5 bg-surface text-red-400 border border-red-400/40 text-xs font-mono uppercase"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => setActiveRightTab("cover")}
                className="p-8 border-2 border-dashed border-border hover:border-gold/60 text-center cursor-pointer transition-colors bg-surface-2/40 space-y-2"
              >
                <ImageIcon className="size-8 text-muted-foreground mx-auto" />
                <p className="text-xs font-mono uppercase text-foreground">
                  Drop cover image or click to upload
                </p>
                <p className="text-[10px] text-muted-foreground font-mono">
                  Recommended: 1600 × 900 px (16:9)
                </p>
              </div>
            )}

            {/* Magazine Header Inputs */}
            <div className="space-y-3 pb-4 border-b border-border/80">
              <input
                type="text"
                value={article.title}
                onChange={(e) => {
                  setArticle((prev) => ({ ...prev, title: e.target.value }));
                  markUnsaved();
                }}
                placeholder="Enter Article Title..."
                className="w-full bg-transparent border-none text-2xl md:text-3xl font-display font-medium text-foreground placeholder:text-muted-foreground/40 focus:outline-none tracking-tight"
              />

              <textarea
                rows={2}
                value={article.excerpt}
                onChange={(e) => {
                  setArticle((prev) => ({ ...prev, excerpt: e.target.value }));
                  markUnsaved();
                }}
                placeholder="Write an editorial excerpt or introductory thesis..."
                className="w-full bg-transparent border-none text-sm text-muted-foreground placeholder:text-muted-foreground/40 focus:outline-none italic leading-relaxed resize-none"
              />
            </div>

            {/* Blocks Canvas */}
            <div className="space-y-4">
              {article.blocks.map((block, index) => {
                const isSelected = selectedBlockId === block.id;

                return (
                  <div
                    key={block.id}
                    onClick={() => setSelectedBlockId(block.id)}
                    className={`p-4 border transition-all relative group ${
                      isSelected
                        ? "bg-surface-2/70 border-gold shadow-md"
                        : "bg-surface-2/30 border-border/60 hover:border-border"
                    }`}
                  >
                    {/* Block hover floating toolbar */}
                    <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-background/90 p-1 border border-border shadow-md z-10">
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMoveBlock(index, "up");
                        }}
                        className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30"
                        title="Move Up"
                      >
                        <MoveUp className="size-3" />
                      </button>
                      <button
                        type="button"
                        disabled={index === article.blocks.length - 1}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMoveBlock(index, "down");
                        }}
                        className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30"
                        title="Move Down"
                      >
                        <MoveDown className="size-3" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDuplicateBlock(block, index);
                        }}
                        className="p-1 text-muted-foreground hover:text-foreground"
                        title="Duplicate Block"
                      >
                        <Copy className="size-3" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteBlock(block.id);
                        }}
                        className="p-1 text-red-400 hover:text-red-300"
                        title="Delete Block"
                      >
                        <Trash2 className="size-3" />
                      </button>
                    </div>

                    {/* Block Type Tag */}
                    <div className="mb-2 flex items-center justify-between text-[9px] font-mono text-muted-foreground uppercase">
                      <span>
                        Block #{index + 1} • {block.type}
                      </span>
                    </div>

                    {/* Block Content Renderers / Editors */}
                    {block.type === "paragraph" && (
                      <textarea
                        rows={3}
                        value={block.content || ""}
                        onChange={(e) => handleUpdateBlock(block.id, { content: e.target.value })}
                        placeholder="Write paragraph copy..."
                        className="w-full bg-transparent border-none text-sm text-foreground/90 leading-relaxed focus:outline-none resize-none font-sans"
                      />
                    )}

                    {block.type === "heading" && (
                      <input
                        type="text"
                        value={block.content || ""}
                        onChange={(e) => handleUpdateBlock(block.id, { content: e.target.value })}
                        placeholder="Section Heading..."
                        className="w-full bg-transparent border-none text-xl font-display font-semibold text-foreground focus:outline-none tracking-tight"
                      />
                    )}

                    {block.type === "subheading" && (
                      <input
                        type="text"
                        value={block.content || ""}
                        onChange={(e) => handleUpdateBlock(block.id, { content: e.target.value })}
                        placeholder="Subsection Title..."
                        className="w-full bg-transparent border-none text-base font-display font-medium text-foreground focus:outline-none tracking-tight"
                      />
                    )}

                    {block.type === "quote" && (
                      <div className="space-y-2 border-l-2 border-gold pl-3 py-1">
                        <textarea
                          rows={2}
                          value={block.content || ""}
                          onChange={(e) => handleUpdateBlock(block.id, { content: e.target.value })}
                          placeholder="Editorial quote..."
                          className="w-full bg-transparent border-none text-sm font-display italic text-foreground focus:outline-none resize-none"
                        />
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={block.settings?.quoteAuthor || ""}
                            onChange={(e) =>
                              handleUpdateBlock(block.id, {
                                settings: { ...block.settings, quoteAuthor: e.target.value },
                              })
                            }
                            placeholder="Attribution Name (e.g. Marcus Vance)"
                            className="px-2 py-1 bg-surface border border-border text-[11px] text-foreground font-mono focus:outline-none focus:border-gold w-1/2"
                          />
                          <input
                            type="text"
                            value={block.settings?.quoteRole || ""}
                            onChange={(e) =>
                              handleUpdateBlock(block.id, {
                                settings: { ...block.settings, quoteRole: e.target.value },
                              })
                            }
                            placeholder="Role / Title"
                            className="px-2 py-1 bg-surface border border-border text-[11px] text-foreground font-mono focus:outline-none focus:border-gold w-1/2"
                          />
                        </div>
                      </div>
                    )}

                    {block.type === "image" && (
                      <div className="space-y-2">
                        <div className="aspect-video w-full bg-surface border border-border overflow-hidden">
                          <img
                            src={
                              block.settings?.imageUrl ||
                              "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=80"
                            }
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <input
                          type="text"
                          value={block.settings?.imageUrl || ""}
                          onChange={(e) =>
                            handleUpdateBlock(block.id, {
                              settings: { ...block.settings, imageUrl: e.target.value },
                            })
                          }
                          placeholder="Image URL..."
                          className="w-full px-2.5 py-1.5 bg-surface border border-border text-xs font-mono text-foreground focus:outline-none focus:border-gold"
                        />
                        <input
                          type="text"
                          value={block.settings?.imageCaption || ""}
                          onChange={(e) =>
                            handleUpdateBlock(block.id, {
                              settings: { ...block.settings, imageCaption: e.target.value },
                            })
                          }
                          placeholder="Image caption / credit..."
                          className="w-full px-2.5 py-1 bg-surface border border-border text-[11px] text-muted-foreground focus:outline-none focus:border-gold"
                        />
                      </div>
                    )}

                    {block.type === "product" && (
                      <div className="p-3 bg-surface border border-gold/40 flex items-center gap-3">
                        <div className="size-16 bg-surface-2 border border-border overflow-hidden shrink-0">
                          <img
                            src={
                              block.settings?.productImage ||
                              "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80"
                            }
                            alt="Product"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0 space-y-1">
                          <span className="text-[9px] font-mono text-gold uppercase tracking-wider block">
                            POD PRODUCT EMBED
                          </span>
                          <input
                            type="text"
                            value={block.settings?.productTitle || ""}
                            onChange={(e) =>
                              handleUpdateBlock(block.id, {
                                settings: { ...block.settings, productTitle: e.target.value },
                              })
                            }
                            placeholder="Product Name..."
                            className="w-full bg-transparent border-none text-xs font-semibold text-foreground focus:outline-none"
                          />
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={block.settings?.productPrice || "€49.00"}
                              onChange={(e) =>
                                handleUpdateBlock(block.id, {
                                  settings: { ...block.settings, productPrice: e.target.value },
                                })
                              }
                              className="px-2 py-0.5 bg-surface-2 border border-border text-[11px] font-mono text-foreground w-20"
                            />
                            <span className="text-[10px] text-muted-foreground font-mono">
                              [VIEW PRODUCT BUTTON ATTACHED]
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {block.type === "collection" && (
                      <div className="p-4 bg-surface border border-border space-y-2">
                        <span className="text-[9px] font-mono text-gold uppercase tracking-wider block">
                          COLLECTION CAPSULE EMBED
                        </span>
                        <input
                          type="text"
                          value={block.settings?.collectionTitle || "The Nocturne Capsule"}
                          onChange={(e) =>
                            handleUpdateBlock(block.id, {
                              settings: { ...block.settings, collectionTitle: e.target.value },
                            })
                          }
                          className="w-full bg-transparent border-none text-sm font-semibold text-foreground focus:outline-none"
                        />
                        <input
                          type="text"
                          value={block.settings?.collectionSubtitle || ""}
                          onChange={(e) =>
                            handleUpdateBlock(block.id, {
                              settings: { ...block.settings, collectionSubtitle: e.target.value },
                            })
                          }
                          placeholder="Collection description..."
                          className="w-full bg-transparent border-none text-xs text-muted-foreground focus:outline-none"
                        />
                      </div>
                    )}

                    {block.type === "cta" && (
                      <div className="p-4 bg-surface border border-gold/40 text-center space-y-2">
                        <input
                          type="text"
                          value={block.settings?.ctaTitle || "RECEIVE PRIORITY DROPS"}
                          onChange={(e) =>
                            handleUpdateBlock(block.id, {
                              settings: { ...block.settings, ctaTitle: e.target.value },
                            })
                          }
                          className="w-full bg-transparent border-none text-xs font-semibold text-foreground text-center focus:outline-none uppercase"
                        />
                        <input
                          type="text"
                          value={block.settings?.ctaSubtitle || "Strictly limited print runs."}
                          onChange={(e) =>
                            handleUpdateBlock(block.id, {
                              settings: { ...block.settings, ctaSubtitle: e.target.value },
                            })
                          }
                          className="w-full bg-transparent border-none text-[11px] text-muted-foreground text-center focus:outline-none"
                        />
                      </div>
                    )}

                    {block.type === "divider" && (
                      <div className="py-2">
                        <hr className="border-border" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Add Block Quick Bar */}
            <div className="p-3 border border-dashed border-border flex items-center justify-between text-xs">
              <span className="text-muted-foreground font-mono text-[11px]">
                Append block to canvas:
              </span>
              <div className="flex gap-1.5 flex-wrap">
                {(
                  ["paragraph", "heading", "image", "product", "quote", "cta"] as ArticleBlockType[]
                ).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => handleAddBlock(t)}
                    className="px-2 py-1 bg-surface-2 hover:bg-gold hover:text-background border border-border text-[10px] font-mono uppercase text-foreground transition-colors"
                  >
                    + {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- RIGHT PANEL (3 Cols on Desktop): Inspector / SEO / AI / Publishing ---------------- */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-surface border border-border p-4 space-y-4">
            {/* Inspector Tab Bar */}
            <div className="grid grid-cols-4 gap-1 border-b border-border pb-2 text-[10px] font-mono uppercase text-center">
              <button
                type="button"
                onClick={() => setActiveRightTab("publishing")}
                className={`py-1.5 transition-colors ${
                  activeRightTab === "publishing"
                    ? "bg-gold/20 text-gold font-semibold border border-gold/40"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Publish
              </button>
              <button
                type="button"
                onClick={() => setActiveRightTab("seo")}
                className={`py-1.5 transition-colors ${
                  activeRightTab === "seo"
                    ? "bg-gold/20 text-gold font-semibold border border-gold/40"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                SEO
              </button>
              <button
                type="button"
                onClick={() => setActiveRightTab("ai")}
                className={`py-1.5 transition-colors ${
                  activeRightTab === "ai"
                    ? "bg-gold/20 text-gold font-semibold border border-gold/40"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                AI Studio
              </button>
              <button
                type="button"
                onClick={() => setActiveRightTab("cover")}
                className={`py-1.5 transition-colors ${
                  activeRightTab === "cover"
                    ? "bg-gold/20 text-gold font-semibold border border-gold/40"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Cover
              </button>
            </div>

            {/* TAB 1: PUBLISHING & TAXONOMY */}
            {activeRightTab === "publishing" && (
              <div className="space-y-4 animate-fade-in-soft text-xs">
                <div className="space-y-3">
                  <div>
                    <label className="font-mono text-muted-foreground uppercase text-[10px] block mb-1">
                      Publishing Status
                    </label>
                    <select
                      value={article.status}
                      onChange={(e) => {
                        setArticle((prev) => ({
                          ...prev,
                          status: e.target.value as ArticleStatus,
                        }));
                        markUnsaved();
                      }}
                      className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
                    >
                      <option value="draft">Draft (Private)</option>
                      <option value="in_review">In Editorial Review</option>
                      <option value="scheduled">Scheduled Release</option>
                      <option value="published">Published (Live)</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-mono text-muted-foreground uppercase text-[10px] block mb-1">
                      Pillar Category
                    </label>
                    <select
                      value={article.category}
                      onChange={(e) => {
                        setArticle((prev) => ({ ...prev, category: e.target.value }));
                        markUnsaved();
                      }}
                      className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
                    >
                      {INITIAL_CATEGORIES.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-mono text-muted-foreground uppercase text-[10px] block mb-1">
                      Assigned Author
                    </label>
                    <select
                      value={article.author}
                      onChange={(e) => {
                        const found = INITIAL_AUTHORS.find((a) => a.name === e.target.value);
                        setArticle((prev) => ({
                          ...prev,
                          author: e.target.value,
                          authorRole: found?.role,
                          authorAvatar: found?.avatar,
                        }));
                        markUnsaved();
                      }}
                      className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
                    >
                      {INITIAL_AUTHORS.map((a) => (
                        <option key={a.id} value={a.name}>
                          {a.name} ({a.role})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Tags Manager */}
                  <div className="space-y-1.5 pt-2 border-t border-border">
                    <label className="font-mono text-muted-foreground uppercase text-[10px] block">
                      Article Topic Tags
                    </label>
                    <div className="flex flex-wrap gap-1">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-surface-2 border border-border text-[10px] font-mono text-foreground flex items-center gap-1"
                        >
                          #{tag}
                          <button
                            type="button"
                            onClick={() => {
                              setArticle((prev) => ({
                                ...prev,
                                tags: prev.tags.filter((t) => t !== tag),
                              }));
                              markUnsaved();
                            }}
                            className="hover:text-red-400 ml-0.5"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>

                    <div className="pt-1">
                      <select
                        onChange={(e) => {
                          if (e.target.value && !article.tags.includes(e.target.value)) {
                            setArticle((prev) => ({
                              ...prev,
                              tags: [...prev.tags, e.target.value],
                            }));
                            markUnsaved();
                          }
                          e.target.value = "";
                        }}
                        defaultValue=""
                        className="w-full px-2.5 py-1.5 bg-surface-2 border border-border text-[11px] text-muted-foreground focus:outline-none focus:border-gold"
                      >
                        <option value="" disabled>
                          + Add Topic Tag...
                        </option>
                        {INITIAL_TAGS.map((t) => (
                          <option key={t.id} value={t.name}>
                            {t.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: COVER IMAGE */}
            {activeRightTab === "cover" && (
              <div className="space-y-4 animate-fade-in-soft text-xs">
                <div>
                  <label className="font-mono text-muted-foreground uppercase text-[10px] block mb-1">
                    Featured Image URL
                  </label>
                  <input
                    type="text"
                    value={article.featuredImage}
                    onChange={(e) => {
                      setArticle((prev) => ({ ...prev, featuredImage: e.target.value }));
                      markUnsaved();
                    }}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 bg-surface-2 border border-border text-xs font-mono text-foreground focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="font-mono text-muted-foreground uppercase text-[10px] block mb-1">
                    Alt Text (Accessibility & SEO)
                  </label>
                  <input
                    type="text"
                    value={article.featuredImageAlt || ""}
                    onChange={(e) => {
                      setArticle((prev) => ({ ...prev, featuredImageAlt: e.target.value }));
                      markUnsaved();
                    }}
                    placeholder="Descriptive text for visually impaired readers"
                    className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
                  />
                </div>

                <div className="p-3 bg-surface-2 border border-border text-[11px] space-y-1 text-muted-foreground">
                  <p className="text-foreground font-medium">Recommended Specs:</p>
                  <p>• 1600 × 900 px (16:9 ratio)</p>
                  <p>• WebP, JPG, or PNG under 2MB</p>
                  <p>• Clean architectural background</p>
                </div>
              </div>
            )}

            {/* TAB 3: SEO STUDIO */}
            {activeRightTab === "seo" && (
              <ArticleSEOPanel
                seo={article.seo}
                onChange={(updatedSeo) => {
                  setArticle((prev) => ({ ...prev, seo: updatedSeo }));
                  markUnsaved();
                }}
                articleTitle={article.title}
                articleExcerpt={article.excerpt}
              />
            )}

            {/* TAB 4: AI CONTENT STUDIO */}
            {activeRightTab === "ai" && (
              <AIContentStudioPanel
                article={article}
                onUpdateArticle={(updated) => {
                  setArticle((prev) => ({ ...prev, ...updated }));
                  markUnsaved();
                }}
                onOpenWizard={() => setAiWizardOpen(true)}
              />
            )}
          </div>
        </div>
      </div>

      {/* ================= MODALS ================= */}
      <ArticlePreviewModal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        article={article}
      />

      <ArticleScheduleModal
        isOpen={scheduleOpen}
        onClose={() => setScheduleOpen(false)}
        articleTitle={article.title}
        currentDate={article.scheduledAt || "2026-09-01"}
        currentTime={article.scheduledTime || "09:00"}
        currentTimezone={article.scheduledTimezone || "CET (Berlin)"}
        onConfirmSchedule={(date, time, tz) => {
          setArticle((prev) => ({
            ...prev,
            status: "scheduled",
            scheduledAt: date,
            scheduledTime: time,
            scheduledTimezone: tz,
          }));
          markUnsaved();
        }}
      />

      <AIArticleGenWizardModal
        isOpen={aiWizardOpen}
        onClose={() => setAiWizardOpen(false)}
        onArticleGenerated={(gen) => {
          setArticle((prev) => ({
            ...prev,
            ...gen,
          }));
          markUnsaved();
        }}
      />
    </div>
  );
}
