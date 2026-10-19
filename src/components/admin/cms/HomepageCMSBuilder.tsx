import { useState } from "react";
import {
  Monitor,
  Tablet,
  Smartphone,
  Save,
  Send,
  Calendar,
  History,
  Eye,
  EyeOff,
  Plus,
  GripVertical,
  Layers,
  ArrowUp,
  ArrowDown,
  Copy,
  Trash2,
  Undo,
  Redo,
  Sparkles,
  Sliders,
  Maximize2,
  CheckCircle2,
  Clock,
  Search,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Video,
} from "lucide-react";
import type {
  HomepageSection,
  HomepageVersion,
  DeviceMode,
  SectionType,
  SectionStatus,
} from "./homepage-types";
import { INITIAL_HOMEPAGE_SECTIONS, INITIAL_HOMEPAGE_VERSIONS } from "./homepage-initial-data";

// Dedicated Section Editors
import { HeroEditor } from "./editors/HeroEditor";
import { VideoSectionEditor } from "./editors/VideoSectionEditor";
import { OneDesignManyProductsEditor } from "./editors/OneDesignManyProductsEditor";
import { FeaturedCollectionEditor } from "./editors/FeaturedCollectionEditor";
import { NewDesignsEditor } from "./editors/NewDesignsEditor";
import { BestSellersEditor } from "./editors/BestSellersEditor";
import { ShopByProductEditor } from "./editors/ShopByProductEditor";
import { FeaturedDesignsEditor } from "./editors/FeaturedDesignsEditor";
import { EditorialSectionEditor } from "./editors/EditorialSectionEditor";
import { PromoBannerEditor } from "./editors/PromoBannerEditor";
import { ReviewsSectionEditor } from "./editors/ReviewsSectionEditor";
import { BrandStoryEditor } from "./editors/BrandStoryEditor";
import { BlogSectionEditor } from "./editors/BlogSectionEditor";
import { NewsletterSectionEditor } from "./editors/NewsletterSectionEditor";
import { SocialShowcaseEditor } from "./editors/SocialShowcaseEditor";
import { AnnouncementBarEditor } from "./editors/AnnouncementBarEditor";
import { HeaderFooterEditor } from "./editors/HeaderFooterEditor";
import { UniversalSectionSettings } from "./editors/UniversalSectionSettings";
import { AIHomepageAssistantPanel } from "./editors/AIHomepageAssistantPanel";

// Modals & Preview
import { VersionHistoryModal } from "./modals/VersionHistoryModal";
import { SchedulePublishModal } from "./modals/SchedulePublishModal";
import { UnsavedChangesModal } from "./modals/UnsavedChangesModal";
import { AddSectionModal } from "./modals/AddSectionModal";
import { FocusedSectionPreviewModal } from "./modals/FocusedSectionPreviewModal";
import { LiveHomepageRenderer } from "./preview/LiveHomepageRenderer";
import { toast } from "sonner";

export function HomepageCMSBuilder() {
  // State: Sections list
  const [sections, setSections] = useState<HomepageSection[]>(INITIAL_HOMEPAGE_SECTIONS);
  const [selectedSectionId, setSelectedSectionId] = useState<string>("sec_hero");
  const [device, setDevice] = useState<DeviceMode>("desktop");
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  // Inspector Subtab: 'content' | 'settings' | 'ai'
  const [inspectorTab, setInspectorTab] = useState<"content" | "settings" | "ai">("content");

  // Panel Collapsing
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [sectionSearchQuery, setSectionSearchQuery] = useState("");

  // History & Publishing
  const [versions, setVersions] = useState<HomepageVersion[]>(INITIAL_HOMEPAGE_VERSIONS);
  const [publishStatus, setPublishStatus] = useState<SectionStatus>("published");
  const [scheduledNote, setScheduledNote] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Undo / Redo Stacks
  const [historyStack, setHistoryStack] = useState<HomepageSection[][]>([
    INITIAL_HOMEPAGE_SECTIONS,
  ]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Modals state
  const [versionModalOpen, setVersionModalOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [unsavedModalOpen, setUnsavedModalOpen] = useState(false);
  const [addSectionModalOpen, setAddSectionModalOpen] = useState(false);
  const [addSectionInsertIndex, setAddSectionInsertIndex] = useState<number | null>(null);
  const [focusedPreviewOpen, setFocusedPreviewOpen] = useState(false);

  // Current active section
  const activeSection = sections.find((s) => s.id === selectedSectionId) || sections[0]!;
  const activeIndex = sections.findIndex((s) => s.id === selectedSectionId);

  // Helper to commit state with history tracking
  const commitSections = (nextSections: HomepageSection[], markUnsaved = true) => {
    setSections(nextSections);
    if (markUnsaved) setHasUnsavedChanges(true);

    const newHistory = historyStack.slice(0, historyIndex + 1);
    setHistoryStack([...newHistory, nextSections]);
    setHistoryIndex(newHistory.length);
  };

  // Undo / Redo
  const handleUndo = () => {
    if (historyIndex > 0) {
      const prev = historyStack[historyIndex - 1]!;
      setHistoryIndex(historyIndex - 1);
      setSections(prev);
      toast.info("Undid previous edit");
    }
  };

  const handleRedo = () => {
    if (historyIndex < historyStack.length - 1) {
      const next = historyStack[historyIndex + 1]!;
      setHistoryIndex(historyIndex + 1);
      setSections(next);
      toast.info("Redid edit");
    }
  };

  // Update active section
  const handleUpdateActiveSection = (updatedFields: Partial<HomepageSection>) => {
    const next = sections.map((s) => (s.id === selectedSectionId ? { ...s, ...updatedFields } : s));
    commitSections(next as HomepageSection[]);
  };

  // Reordering functions
  const handleMoveUp = (id: string) => {
    const idx = sections.findIndex((s) => s.id === id);
    if (idx <= 0) return;
    const next = [...sections];
    const temp = next[idx]!;
    next[idx] = next[idx - 1]!;
    next[idx - 1] = temp;
    commitSections(next);
    toast.success(`Moved "${next[idx - 1]!.name}" up`);
  };

  const handleMoveDown = (id: string) => {
    const idx = sections.findIndex((s) => s.id === id);
    if (idx === -1 || idx >= sections.length - 1) return;
    const next = [...sections];
    const temp = next[idx]!;
    next[idx] = next[idx + 1]!;
    next[idx + 1] = temp;
    commitSections(next);
    toast.success(`Moved "${next[idx + 1]!.name}" down`);
  };

  const handleToggleVisibility = (id: string) => {
    const target = sections.find((s) => s.id === id);
    if (!target) return;
    const next = sections.map((s) => (s.id === id ? { ...s, visible: !s.visible } : s));
    commitSections(next);
    toast.success(
      target.visible ? `"${target.name}" is now hidden` : `"${target.name}" is now visible`,
    );
  };

  const handleDuplicateSection = (id: string) => {
    const target = sections.find((s) => s.id === id);
    if (!target) return;
    const idx = sections.findIndex((s) => s.id === id);
    const duplicated: HomepageSection = {
      ...JSON.parse(JSON.stringify(target)),
      id: `sec_${Date.now()}`,
      name: `${target.name} (Copy)`,
      status: "draft",
    };
    const next = [...sections.slice(0, idx + 1), duplicated, ...sections.slice(idx + 1)];
    commitSections(next);
    setSelectedSectionId(duplicated.id);
    toast.success(`Duplicated "${target.name}"`);
  };

  const handleDeleteSection = (id: string) => {
    if (sections.length <= 1) {
      toast.error("Cannot delete the last remaining homepage block.");
      return;
    }
    const target = sections.find((s) => s.id === id);
    const next = sections.filter((s) => s.id !== id);
    commitSections(next);
    setSelectedSectionId(next[0]!.id);
    toast.info(`Deleted section "${target?.name}"`);
  };

  const handleOpenAddModal = (insertIndex: number | null = null) => {
    setAddSectionInsertIndex(insertIndex);
    setAddSectionModalOpen(true);
  };

  const handleAddSectionFromTemplate = (type: SectionType, insertIdx: number | null = null) => {
    let newSection: HomepageSection;

    if (type === "video") {
      newSection = {
        id: `sec_vid_${Date.now()}`,
        type: "video",
        name: "Cinematic Film Reel",
        status: "draft",
        visible: true,
        background: "black",
        paddingTop: "lg",
        paddingBottom: "lg",
        containerWidth: "default",
        borderTop: true,
        borderBottom: true,
        videoUrl:
          "https://assets.mixkit.co/videos/preview/mixkit-black-and-white-portrait-of-a-woman-in-a-studio-41481-large.mp4",
        posterImage:
          "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80",
        autoplay: true,
        loop: true,
        mute: true,
        videoAspect: "16:9",
        eyebrow: "ATELIER FILM",
        heading: "Precision in Every Thread",
        subheading:
          "Watch the meticulous silk-screen and direct-to-garment atelier process in 4K resolution.",
        ctaText: "Explore Collection",
        ctaLink: "/collections",
        overlayOpacity: 45,
      };
    } else {
      const base =
        INITIAL_HOMEPAGE_SECTIONS.find((s) => s.type === type) || INITIAL_HOMEPAGE_SECTIONS[0]!;
      newSection = {
        ...JSON.parse(JSON.stringify(base)),
        id: `sec_${Date.now()}`,
        name: `${base.name} (New)`,
        status: "draft",
        visible: true,
      };
    }

    let next: HomepageSection[];
    if (insertIdx !== null && insertIdx >= 0 && insertIdx <= sections.length) {
      next = [...sections.slice(0, insertIdx), newSection, ...sections.slice(insertIdx)];
    } else {
      next = [...sections, newSection];
    }

    commitSections(next);
    setSelectedSectionId(newSection.id);
    toast.success(`Added new block "${newSection.name}"`);
  };

  // Publishing Workflow
  const handleSaveDraft = () => {
    setPublishStatus("draft");
    setHasUnsavedChanges(false);
    toast.success("Draft saved successfully", {
      description: "Homepage layout draft saved to internal cloud staging.",
    });
  };

  const handlePublishNow = () => {
    setPublishStatus("published");
    setScheduledNote(null);
    setHasUnsavedChanges(false);

    // Append to version history
    const nextVer: HomepageVersion = {
      id: `v${Date.now()}`,
      version: `v12.${versions.length + 1} (Live Snapshot)`,
      timestamp: "Just Now",
      author: "Admin Workspace",
      note: `Published homepage update with ${sections.filter((s) => s.visible).length} active sections.`,
      status: "published",
      sectionsCount: sections.length,
    };
    setVersions([nextVer, ...versions.map((v) => ({ ...v, status: "archived" as const }))]);
    toast.success("Homepage Published Live Worldwide!", {
      description: "Edge CDN cache invalidated across all regional nodes (EU, UK, US).",
    });
  };

  const handleConfirmSchedule = (date: string, time: string) => {
    setPublishStatus("scheduled");
    setScheduledNote(`Scheduled for ${date} at ${time} UTC`);
    setHasUnsavedChanges(false);
    toast.success("Drop Release Scheduled", {
      description: `Automated switch configured for ${date} ${time} UTC.`,
    });
  };

  const handleRestoreVersion = (versionId: string) => {
    const target = versions.find((v) => v.id === versionId);
    if (!target) return;
    setSections(INITIAL_HOMEPAGE_SECTIONS);
    setHasUnsavedChanges(false);
    setPublishStatus("draft");
    toast.success(`Restored snapshot ${target.version}`);
  };

  // Filtered sections for search in left panel
  const filteredSections = sections.filter((s) =>
    s.name.toLowerCase().includes(sectionSearchQuery.toLowerCase()),
  );

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] min-h-[750px] bg-background border border-border overflow-hidden select-none">
      {/* 1. TOP BUILDER TOOLBAR */}
      <header className="h-14 bg-surface border-b border-border px-4 flex items-center justify-between gap-3 shrink-0 z-30">
        {/* Left: Branding & Status Indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-gold font-semibold flex items-center gap-1.5">
              <Layers className="size-3.5" /> Visual Page Builder
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-border">
            {publishStatus === "published" && (
              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono flex items-center gap-1.5 uppercase">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live
                Storefront
              </span>
            )}
            {publishStatus === "draft" && (
              <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-mono flex items-center gap-1.5 uppercase">
                <span className="size-1.5 rounded-full bg-amber-400" /> Staging Draft
              </span>
            )}
            {publishStatus === "scheduled" && (
              <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/30 text-[10px] font-mono flex items-center gap-1.5 uppercase">
                <Clock className="size-3" /> {scheduledNote || "Scheduled Drop"}
              </span>
            )}

            {hasUnsavedChanges && (
              <span className="text-[10px] font-mono text-gold flex items-center gap-1">
                • Unsaved changes
              </span>
            )}
          </div>
        </div>

        {/* Center: Device Viewport Switcher & Zoom */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-surface-2 border border-border p-0.5">
            <button
              type="button"
              onClick={() => setDevice("desktop")}
              className={`px-2.5 py-1 text-xs font-mono flex items-center gap-1.5 transition-colors ${
                device === "desktop"
                  ? "bg-gold text-background font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Desktop Viewport (1440px)"
            >
              <Monitor className="size-3.5" /> <span className="hidden md:inline">Desktop</span>
            </button>
            <button
              type="button"
              onClick={() => setDevice("tablet")}
              className={`px-2.5 py-1 text-xs font-mono flex items-center gap-1.5 transition-colors ${
                device === "tablet"
                  ? "bg-gold text-background font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Tablet Viewport (768px)"
            >
              <Tablet className="size-3.5" /> <span className="hidden md:inline">Tablet</span>
            </button>
            <button
              type="button"
              onClick={() => setDevice("mobile")}
              className={`px-2.5 py-1 text-xs font-mono flex items-center gap-1.5 transition-colors ${
                device === "mobile"
                  ? "bg-gold text-background font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Mobile Viewport (375px)"
            >
              <Smartphone className="size-3.5" /> <span className="hidden md:inline">Mobile</span>
            </button>
          </div>

          {/* Zoom controls */}
          <div className="hidden lg:flex items-center bg-surface-2 border border-border text-xs font-mono">
            <button
              type="button"
              onClick={() => setZoomLevel(Math.max(50, zoomLevel - 15))}
              className="px-2 py-1 hover:bg-surface text-muted-foreground"
              title="Zoom Out"
            >
              -
            </button>
            <span className="px-2 py-1 text-[11px] text-zinc-300 min-w-10 text-center">
              {zoomLevel}%
            </span>
            <button
              type="button"
              onClick={() => setZoomLevel(Math.min(100, zoomLevel + 15))}
              className="px-2 py-1 hover:bg-surface text-muted-foreground"
              title="Zoom In"
            >
              +
            </button>
          </div>
        </div>

        {/* Right: Actions, History & Publishing */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1 mr-1">
            <button
              type="button"
              disabled={historyIndex <= 0}
              onClick={handleUndo}
              className="p-1.5 text-muted-foreground hover:text-foreground disabled:opacity-30"
              title="Undo"
            >
              <Undo className="size-3.5" />
            </button>
            <button
              type="button"
              disabled={historyIndex >= historyStack.length - 1}
              onClick={handleRedo}
              className="p-1.5 text-muted-foreground hover:text-foreground disabled:opacity-30"
              title="Redo"
            >
              <Redo className="size-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setVersionModalOpen(true)}
            className="p-1.5 sm:px-2.5 sm:py-1 bg-surface-2 border border-border hover:border-gold text-xs font-mono text-foreground flex items-center gap-1.5 transition-colors"
            title="Version History & Rollbacks"
          >
            <History className="size-3.5" /> <span className="hidden lg:inline">Versions</span>
          </button>

          <button
            type="button"
            onClick={() => setFocusedPreviewOpen(true)}
            className="p-1.5 sm:px-2.5 sm:py-1 bg-surface-2 border border-border hover:border-gold text-xs font-mono text-foreground flex items-center gap-1.5 transition-colors"
            title="Focused Section Preview"
          >
            <Maximize2 className="size-3.5" /> <span className="hidden lg:inline">Focus</span>
          </button>

          <button
            type="button"
            onClick={() => setScheduleModalOpen(true)}
            className="p-1.5 sm:px-2.5 sm:py-1 bg-surface-2 border border-border hover:border-gold text-xs font-mono text-foreground flex items-center gap-1.5 transition-colors"
            title="Schedule Drop"
          >
            <Calendar className="size-3.5" /> <span className="hidden xl:inline">Schedule</span>
          </button>

          <button
            type="button"
            onClick={handleSaveDraft}
            className="px-3 py-1 bg-surface-2 border border-border hover:bg-surface text-xs font-mono text-foreground flex items-center gap-1.5 transition-colors"
          >
            <Save className="size-3.5" /> <span className="hidden sm:inline">Save Draft</span>
          </button>

          <button
            type="button"
            onClick={handlePublishNow}
            className="px-4 py-1 bg-gold text-background text-xs font-mono uppercase tracking-wider font-semibold hover:bg-white transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Send className="size-3.5" /> Publish
          </button>
        </div>
      </header>

      {/* 2. THREE-PANE MAIN WORKSPACE */}
      <div className="flex-1 flex min-h-0 overflow-hidden relative">
        {/* LEFT PANEL: HOMEPAGE SECTIONS LIST */}
        <aside
          className={`${
            leftPanelOpen ? "w-80" : "w-10"
          } bg-surface border-r border-border flex flex-col shrink-0 transition-all duration-300 z-20`}
        >
          {/* Left Panel Header */}
          <div className="p-3 border-b border-border flex items-center justify-between bg-surface-2/50">
            {leftPanelOpen && (
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-display font-medium text-foreground tracking-wider uppercase">
                  Homepage Sections ({sections.length})
                </span>
                <button
                  type="button"
                  onClick={() => handleOpenAddModal(null)}
                  className="p-1 bg-surface border border-gold/40 text-gold hover:bg-gold hover:text-background text-[10px] font-mono flex items-center gap-1 px-2 transition-colors"
                >
                  <Plus className="size-3" /> Add Block
                </button>
              </div>
            )}
            <button
              type="button"
              onClick={() => setLeftPanelOpen(!leftPanelOpen)}
              className="p-1 text-muted-foreground hover:text-foreground ml-auto"
              title={leftPanelOpen ? "Collapse Panel" : "Expand Panel"}
            >
              {leftPanelOpen ? (
                <ChevronLeft className="size-4" />
              ) : (
                <ChevronRight className="size-4" />
              )}
            </button>
          </div>

          {leftPanelOpen && (
            <>
              {/* Search Bar */}
              <div className="p-2 border-b border-border">
                <div className="relative">
                  <Search className="size-3.5 absolute left-2.5 top-2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Filter sections..."
                    value={sectionSearchQuery}
                    onChange={(e) => setSectionSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-2.5 py-1 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              {/* Sections Reorderable List */}
              <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
                {filteredSections.map((sec, idx) => {
                  const isSelected = sec.id === selectedSectionId;

                  return (
                    <div
                      key={sec.id}
                      onClick={() => setSelectedSectionId(sec.id)}
                      className={`p-2.5 border cursor-pointer group transition-all ${
                        isSelected
                          ? "bg-gold/10 border-gold shadow-sm"
                          : "bg-surface-2 border-border hover:border-zinc-700"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        {/* Drag handle & Title */}
                        <div className="flex items-center gap-2 min-w-0">
                          <GripVertical className="size-3.5 text-muted-foreground group-hover:text-gold shrink-0 cursor-grab" />
                          <div className="min-w-0">
                            <p
                              className={`text-xs font-medium truncate ${
                                isSelected ? "text-gold font-semibold" : "text-foreground"
                              }`}
                            >
                              {sec.name}
                            </p>
                            <div className="flex items-center gap-2 text-[9px] font-mono text-muted-foreground mt-0.5">
                              <span>#{idx + 1}</span>
                              <span>•</span>
                              <span
                                className={`uppercase font-semibold ${
                                  sec.status === "published"
                                    ? "text-emerald-400"
                                    : sec.status === "draft"
                                      ? "text-amber-400"
                                      : "text-blue-400"
                                }`}
                              >
                                {sec.status}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Quick Actions (Move up/down, visibility) */}
                        <div className="flex items-center gap-1 shrink-0 opacity-80 group-hover:opacity-100">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleVisibility(sec.id);
                            }}
                            className={`p-1 border text-xs transition-colors ${
                              sec.visible
                                ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
                                : "text-zinc-500 border-zinc-700 bg-zinc-800"
                            }`}
                            title={sec.visible ? "Hide section" : "Make visible"}
                          >
                            {sec.visible ? (
                              <Eye className="size-3" />
                            ) : (
                              <EyeOff className="size-3" />
                            )}
                          </button>

                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMoveUp(sec.id);
                            }}
                            className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-20"
                            title="Move Up"
                          >
                            <ArrowUp className="size-3" />
                          </button>

                          <button
                            type="button"
                            disabled={idx === sections.length - 1}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMoveDown(sec.id);
                            }}
                            className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-20"
                            title="Move Down"
                          >
                            <ArrowDown className="size-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </aside>

        {/* CENTER PANE: LIVE PAGE PREVIEW CANVAS */}
        <main className="flex-1 bg-zinc-950/80 overflow-y-auto overflow-x-hidden p-4 sm:p-6 flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-3 text-xs font-mono text-muted-foreground max-w-[1440px]">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-gold animate-pulse" />
              <span>Live Visual Storefront Canvas</span>
              <span>—</span>
              <span className="text-zinc-400">Click any block to edit directly</span>
            </div>
            <span className="hidden sm:inline text-zinc-500">
              Viewport Mode: {device.toUpperCase()} (
              {device === "desktop" ? "1440px" : device === "tablet" ? "768px" : "375px"})
            </span>
          </div>

          {/* Interactive Live Homepage Renderer */}
          <LiveHomepageRenderer
            sections={sections}
            selectedSectionId={selectedSectionId}
            onSelectSection={(id) => setSelectedSectionId(id)}
            device={device}
            zoomLevel={zoomLevel}
            onAddSectionAtIndex={(idx) => handleOpenAddModal(idx)}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
            onDuplicate={handleDuplicateSection}
            onToggleVisibility={handleToggleVisibility}
            onDelete={handleDeleteSection}
          />
        </main>

        {/* RIGHT PANEL: CONTEXTUAL SECTION INSPECTOR */}
        <aside
          className={`${
            rightPanelOpen ? "w-96" : "w-10"
          } bg-surface border-l border-border flex flex-col shrink-0 transition-all duration-300 z-20`}
        >
          {/* Right Panel Header */}
          <div className="p-3 border-b border-border flex items-center justify-between bg-surface-2/50">
            <button
              type="button"
              onClick={() => setRightPanelOpen(!rightPanelOpen)}
              className="p-1 text-muted-foreground hover:text-foreground mr-2"
              title={rightPanelOpen ? "Collapse Inspector" : "Expand Inspector"}
            >
              {rightPanelOpen ? (
                <ChevronRight className="size-4" />
              ) : (
                <ChevronLeft className="size-4" />
              )}
            </button>

            {rightPanelOpen && (
              <div className="flex items-center justify-between w-full min-w-0">
                <div className="truncate">
                  <span className="text-xs font-display font-medium text-foreground tracking-wider uppercase truncate block">
                    {activeSection.name}
                  </span>
                  <span className="text-[9px] font-mono text-gold uppercase tracking-wider">
                    Type: {activeSection.type}
                  </span>
                </div>
              </div>
            )}
          </div>

          {rightPanelOpen && (
            <>
              {/* Inspector Subtabs: Content, Settings & Spacing, AI Assistant */}
              <div className="grid grid-cols-3 border-b border-border bg-surface-2">
                <button
                  type="button"
                  onClick={() => setInspectorTab("content")}
                  className={`py-2 text-[11px] font-mono flex items-center justify-center gap-1 transition-colors ${
                    inspectorTab === "content"
                      ? "bg-surface text-gold border-b-2 border-gold font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Sliders className="size-3" /> Content
                </button>

                <button
                  type="button"
                  onClick={() => setInspectorTab("settings")}
                  className={`py-2 text-[11px] font-mono flex items-center justify-center gap-1 transition-colors ${
                    inspectorTab === "settings"
                      ? "bg-surface text-gold border-b-2 border-gold font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Layers className="size-3" /> Box
                </button>

                <button
                  type="button"
                  onClick={() => setInspectorTab("ai")}
                  className={`py-2 text-[11px] font-mono flex items-center justify-center gap-1 transition-colors ${
                    inspectorTab === "ai"
                      ? "bg-surface text-gold border-b-2 border-gold font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Sparkles className="size-3 text-gold" /> AI Assistant
                </button>
              </div>

              {/* Inspector Content Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {inspectorTab === "content" && (
                  <>
                    {/* Render dedicated editor matching active section type */}
                    {activeSection.type === "hero" && (
                      <HeroEditor section={activeSection} onChange={handleUpdateActiveSection} />
                    )}

                    {activeSection.type === "video" && (
                      <VideoSectionEditor
                        section={activeSection}
                        onChange={handleUpdateActiveSection}
                      />
                    )}

                    {activeSection.type === "one-design-multiple" && (
                      <OneDesignManyProductsEditor
                        section={activeSection}
                        onChange={handleUpdateActiveSection}
                      />
                    )}

                    {activeSection.type === "featured-collection" && (
                      <FeaturedCollectionEditor
                        section={activeSection}
                        onChange={handleUpdateActiveSection}
                      />
                    )}

                    {activeSection.type === "new-designs" && (
                      <NewDesignsEditor
                        section={activeSection}
                        onChange={handleUpdateActiveSection}
                      />
                    )}

                    {activeSection.type === "best-sellers" && (
                      <BestSellersEditor
                        section={activeSection}
                        onChange={handleUpdateActiveSection}
                      />
                    )}

                    {activeSection.type === "shop-by-product" && (
                      <ShopByProductEditor
                        section={activeSection}
                        onChange={handleUpdateActiveSection}
                      />
                    )}

                    {activeSection.type === "featured-designs" && (
                      <FeaturedDesignsEditor
                        section={activeSection}
                        onChange={handleUpdateActiveSection}
                      />
                    )}

                    {activeSection.type === "editorial" && (
                      <EditorialSectionEditor
                        section={activeSection}
                        onChange={handleUpdateActiveSection}
                      />
                    )}

                    {activeSection.type === "promotional-banner" && (
                      <PromoBannerEditor
                        section={activeSection}
                        onChange={handleUpdateActiveSection}
                      />
                    )}

                    {activeSection.type === "reviews" && (
                      <ReviewsSectionEditor
                        section={activeSection}
                        onChange={handleUpdateActiveSection}
                      />
                    )}

                    {activeSection.type === "brand-story" && (
                      <BrandStoryEditor
                        section={activeSection}
                        onChange={handleUpdateActiveSection}
                      />
                    )}

                    {activeSection.type === "blog" && (
                      <BlogSectionEditor
                        section={activeSection}
                        onChange={handleUpdateActiveSection}
                      />
                    )}

                    {activeSection.type === "newsletter" && (
                      <NewsletterSectionEditor
                        section={activeSection}
                        onChange={handleUpdateActiveSection}
                      />
                    )}

                    {activeSection.type === "social-showcase" && (
                      <SocialShowcaseEditor
                        section={activeSection}
                        onChange={handleUpdateActiveSection}
                      />
                    )}

                    {activeSection.type === "announcement" && (
                      <AnnouncementBarEditor
                        section={activeSection}
                        onChange={handleUpdateActiveSection}
                      />
                    )}

                    {(activeSection.type === "header" || activeSection.type === "footer") && (
                      <HeaderFooterEditor
                        section={activeSection}
                        onChange={handleUpdateActiveSection}
                      />
                    )}
                  </>
                )}

                {/* Common Settings Tab */}
                {inspectorTab === "settings" && (
                  <UniversalSectionSettings
                    section={activeSection}
                    onChange={handleUpdateActiveSection}
                    onDuplicate={() => handleDuplicateSection(activeSection.id)}
                    onDelete={() => handleDeleteSection(activeSection.id)}
                    onMoveUp={() => handleMoveUp(activeSection.id)}
                    onMoveDown={() => handleMoveDown(activeSection.id)}
                    isFirst={activeIndex === 0}
                    isLast={activeIndex === sections.length - 1}
                  />
                )}

                {/* AI Assistant Tab */}
                {inspectorTab === "ai" && (
                  <AIHomepageAssistantPanel
                    section={activeSection}
                    onApplyGeneratedContent={(fields) => handleUpdateActiveSection(fields)}
                  />
                )}
              </div>
            </>
          )}
        </aside>
      </div>

      {/* 3. SUPPORTING MODALS */}
      <VersionHistoryModal
        open={versionModalOpen}
        onClose={() => setVersionModalOpen(false)}
        versions={versions}
        onRestore={handleRestoreVersion}
      />

      <SchedulePublishModal
        open={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        onConfirmSchedule={handleConfirmSchedule}
      />

      <UnsavedChangesModal
        open={unsavedModalOpen}
        onContinueEditing={() => setUnsavedModalOpen(false)}
        onDiscard={() => {
          setUnsavedModalOpen(false);
          setSections(INITIAL_HOMEPAGE_SECTIONS);
          setHasUnsavedChanges(false);
        }}
        onSaveDraft={() => {
          setUnsavedModalOpen(false);
          handleSaveDraft();
        }}
      />

      <AddSectionModal
        open={addSectionModalOpen}
        insertIndex={addSectionInsertIndex}
        onClose={() => {
          setAddSectionModalOpen(false);
          setAddSectionInsertIndex(null);
        }}
        onAdd={handleAddSectionFromTemplate}
      />

      <FocusedSectionPreviewModal
        open={focusedPreviewOpen}
        section={activeSection}
        onClose={() => setFocusedPreviewOpen(false)}
      />
    </div>
  );
}
