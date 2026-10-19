import { useState } from "react";
import {
  FileText,
  Plus,
  Search,
  Filter,
  Eye,
  Edit3,
  Globe,
  Calendar,
  History,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  ExternalLink,
  ShieldAlert,
  ArrowUpDown,
  BarChart2,
  Copy,
} from "lucide-react";
import { toast } from "sonner";
import type { PageItem, PageType, PageStatus } from "../pages-types";
import { PageCreateModal } from "./PageCreateModal";
import { PageVersionHistoryModal } from "./PageVersionHistoryModal";
import { PageScheduleModal } from "./PageScheduleModal";
import { PagePreviewModal } from "./PagePreviewModal";
import { PageAnalyticsModal } from "./PageAnalyticsModal";

interface PagesListProps {
  pages: PageItem[];
  onEditPage: (page: PageItem) => void;
  onCreatePage: (newPage: Partial<PageItem>) => void;
  onDeletePage: (id: string) => void;
}

export function PagesList({ pages, onEditPage, onCreatePage, onDeletePage }: PagesListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "alphabetical">("newest");

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [activeVersionPage, setActiveVersionPage] = useState<PageItem | null>(null);
  const [activeSchedulePage, setActiveSchedulePage] = useState<PageItem | null>(null);
  const [activePreviewPage, setActivePreviewPage] = useState<PageItem | null>(null);
  const [activeAnalyticsPage, setActiveAnalyticsPage] = useState<PageItem | null>(null);

  const handleDuplicate = (page: PageItem) => {
    const duplicated: Partial<PageItem> = {
      ...page,
      id: `page_${Date.now()}`,
      name: `${page.name} (Copy)`,
      slug: `${page.slug}-copy`,
      status: "Draft",
      lastUpdated: new Date().toISOString().slice(0, 16).replace("T", " "),
    };
    onCreatePage(duplicated);
    toast.success(`Duplicated page "${page.name}" as a new Draft!`);
  };

  // Filter logic
  const filteredPages = pages
    .filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.author.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = typeFilter === "ALL" || p.type === typeFilter;
      const matchesStatus = statusFilter === "ALL" || p.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    })
    .sort((a, b) => {
      if (sortOrder === "alphabetical") return a.name.localeCompare(b.name);
      if (sortOrder === "oldest") return a.lastUpdated.localeCompare(b.lastUpdated);
      return b.lastUpdated.localeCompare(a.lastUpdated);
    });

  const publishedCount = pages.filter((p) => p.status === "Published").length;
  const draftCount = pages.filter((p) => p.status === "Draft").length;
  const scheduledCount = pages.filter((p) => p.status === "Scheduled").length;
  const legalCount = pages.filter((p) => p.type === "LEGAL").length;

  return (
    <div className="space-y-6 animate-fade-in-soft">
      {/* ================= TOP STATS BAR ================= */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-surface border border-border space-y-1">
          <span className="text-[10px] font-mono uppercase text-muted-foreground">
            Total Managed Pages
          </span>
          <p className="text-2xl font-display font-medium text-foreground">{pages.length}</p>
        </div>
        <div className="p-4 bg-surface border border-border space-y-1">
          <span className="text-[10px] font-mono uppercase text-emerald-400">Live Published</span>
          <p className="text-2xl font-display font-medium text-emerald-400">{publishedCount}</p>
        </div>
        <div className="p-4 bg-surface border border-border space-y-1">
          <span className="text-[10px] font-mono uppercase text-amber-400">Staged Drafts</span>
          <p className="text-2xl font-display font-medium text-amber-400">{draftCount}</p>
        </div>
        <div className="p-4 bg-surface border border-border space-y-1">
          <span className="text-[10px] font-mono uppercase text-sky-400">Automated Releases</span>
          <p className="text-2xl font-display font-medium text-sky-400">{scheduledCount}</p>
        </div>
      </div>

      {/* ================= PAGE MANAGEMENT HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-surface border border-border">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="size-5 text-gold" />
            <h2 className="text-xl font-display font-medium text-foreground uppercase tracking-wider">
              Website Page Directory & CMS
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Manage system routes, editorial landing pages, customer care resources, and legal
            disclosures.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCreateOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gold text-background text-xs uppercase tracking-wider font-semibold hover:bg-foreground hover:text-background transition-colors shrink-0"
        >
          <Plus className="size-4" /> Create Page
        </button>
      </div>

      {/* ================= LEGAL REVIEW WARNING BANNER (When filtering Legal) ================= */}
      {typeFilter === "LEGAL" && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 animate-fade-in-soft">
          <ShieldAlert className="size-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-amber-200 uppercase tracking-wider">
              Legal Compliance Audit Policy
            </p>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
              Legal documents (Privacy Policy, Terms & Conditions, Cookie Policy, Refund Terms)
              govern consumer transactions across international jurisdictions. Ensure all copy is
              audited prior to publication.
            </p>
          </div>
        </div>
      )}

      {/* ================= FILTERS & SEARCH TOOLBAR ================= */}
      <div className="p-4 bg-surface border border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto custom-scrollbar pb-1 md:pb-0">
          {[
            { id: "ALL", label: "All Pages" },
            { id: "SYSTEM", label: "System" },
            { id: "CONTENT", label: "Content" },
            { id: "INFORMATION", label: "Information" },
            { id: "LEGAL", label: `Legal (${legalCount})` },
            { id: "EDITORIAL", label: "Editorial" },
            { id: "CAMPAIGN", label: "Campaign" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setTypeFilter(tab.id)}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors shrink-0 ${
                typeFilter === tab.id
                  ? "bg-gold text-background font-bold"
                  : "bg-surface-2 text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search & Select Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[200px]">
            <Search className="size-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search pages or slug..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
          >
            <option value="ALL">All Statuses</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Archived">Archived</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest" | "alphabetical")}
            className="px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
          >
            <option value="newest">Sort: Recently Updated</option>
            <option value="oldest">Sort: Oldest</option>
            <option value="alphabetical">Sort: Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>

      {/* ================= PAGE TABLE ================= */}
      <div className="bg-surface border border-border overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-border text-muted-foreground uppercase text-[10px] tracking-wider font-mono bg-surface-2/40">
              <th className="p-3.5">Page Name & Slug</th>
              <th className="p-3.5">Type</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5">Last Updated</th>
              <th className="p-3.5">Author</th>
              <th className="p-3.5">Visibility</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {filteredPages.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-12 text-center text-muted-foreground font-mono">
                  No website pages match your filter criteria.
                </td>
              </tr>
            ) : (
              filteredPages.map((p) => {
                const isDraft = p.status === "Draft";
                const isPublished = p.status === "Published";
                const isScheduled = p.status === "Scheduled";

                return (
                  <tr key={p.id} className="hover:bg-surface-2/70 transition-colors group">
                    <td className="p-3.5 font-medium text-foreground">
                      <div className="flex items-center gap-2.5">
                        <FileText className="size-4 text-gold shrink-0" />
                        <div>
                          <p className="font-semibold text-foreground">{p.name}</p>
                          <p className="text-[10px] font-mono text-gold">{p.slug}</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-surface-2 text-muted-foreground border border-border">
                        {p.type}
                      </span>
                    </td>

                    <td className="p-3.5">
                      {isPublished && (
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 inline-flex items-center gap-1">
                          <CheckCircle2 className="size-3" /> Published
                        </span>
                      )}
                      {isDraft && (
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/30">
                          Draft
                        </span>
                      )}
                      {isScheduled && (
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-sky-500/10 text-sky-400 border border-sky-500/30 inline-flex items-center gap-1">
                          <Clock className="size-3" /> Scheduled
                        </span>
                      )}
                    </td>

                    <td className="p-3.5 font-mono text-muted-foreground text-[11px]">
                      {p.lastUpdated}
                    </td>

                    <td className="p-3.5 text-foreground text-[11px] font-medium">{p.author}</td>

                    <td className="p-3.5 font-mono text-[11px] text-muted-foreground">
                      {p.visibility}
                    </td>

                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setActiveAnalyticsPage(p)}
                          className="p-1.5 text-muted-foreground hover:text-gold border border-border"
                          title="Page Analytics"
                        >
                          <BarChart2 className="size-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setActivePreviewPage(p)}
                          className="p-1.5 text-muted-foreground hover:text-foreground border border-border"
                          title="Visual Storefront Preview"
                        >
                          <Eye className="size-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDuplicate(p)}
                          className="p-1.5 text-muted-foreground hover:text-gold border border-border"
                          title="Duplicate Page as Draft"
                        >
                          <Copy className="size-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setActiveVersionPage(p)}
                          className="p-1.5 text-muted-foreground hover:text-foreground border border-border"
                          title="Version History"
                        >
                          <History className="size-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setActiveSchedulePage(p)}
                          className="p-1.5 text-muted-foreground hover:text-foreground border border-border"
                          title="Schedule Release"
                        >
                          <Calendar className="size-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => onEditPage(p)}
                          className="px-3 py-1 bg-gold text-background font-semibold text-[11px] uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors inline-flex items-center gap-1"
                        >
                          <Edit3 className="size-3" /> Edit
                        </button>

                        {p.type !== "SYSTEM" && (
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Delete page "${p.name}"?`)) onDeletePage(p.id);
                            }}
                            className="p-1.5 text-muted-foreground hover:text-red-400 border border-border"
                            title="Delete Page"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ================= MODALS ================= */}
      <PageCreateModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreate={onCreatePage}
      />

      {activeVersionPage && (
        <PageVersionHistoryModal
          isOpen={!!activeVersionPage}
          onClose={() => setActiveVersionPage(null)}
          pageName={activeVersionPage.name}
          versions={activeVersionPage.versions}
          onRestore={(ver) => toast.info(`Restored ${activeVersionPage.name} to ${ver.version}`)}
        />
      )}

      {activeSchedulePage && (
        <PageScheduleModal
          isOpen={!!activeSchedulePage}
          onClose={() => setActiveSchedulePage(null)}
          pageName={activeSchedulePage.name}
          initialPublishDate={activeSchedulePage.scheduledPublishDate}
          onSchedule={(pubDate, unpubDate, tz) => {
            toast.success(`Schedule saved for ${activeSchedulePage.name}`);
          }}
        />
      )}

      {activePreviewPage && (
        <PagePreviewModal
          isOpen={!!activePreviewPage}
          onClose={() => setActivePreviewPage(null)}
          page={activePreviewPage}
        />
      )}

      {activeAnalyticsPage && (
        <PageAnalyticsModal
          isOpen={!!activeAnalyticsPage}
          onClose={() => setActiveAnalyticsPage(null)}
          page={activeAnalyticsPage}
        />
      )}
    </div>
  );
}
