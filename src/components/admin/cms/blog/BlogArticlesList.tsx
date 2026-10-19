import { useState } from "react";
import {
  FileText,
  Plus,
  Sparkles,
  Search,
  SlidersHorizontal,
  Eye,
  Calendar,
  Clock,
  User,
  MoreVertical,
  Edit,
  Copy,
  Trash2,
  CheckCircle2,
  TrendingUp,
  LayoutGrid,
  List,
  Filter,
  Check,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";
import { ArticleItem, ArticleStatus } from "./blog-types";
import { INITIAL_CATEGORIES, INITIAL_AUTHORS } from "./blog-initial-data";

interface BlogArticlesListProps {
  articles: ArticleItem[];
  onSelectArticle: (article: ArticleItem) => void;
  onCreateNewArticle: () => void;
  onOpenAIWizard: () => void;
  onDeleteArticle: (id: string) => void;
  onDuplicateArticle: (article: ArticleItem) => void;
  onUpdateArticleStatus: (id: string, status: ArticleStatus) => void;
  onPreviewArticle: (article: ArticleItem) => void;
}

export function BlogArticlesList({
  articles,
  onSelectArticle,
  onCreateNewArticle,
  onOpenAIWizard,
  onDeleteArticle,
  onDuplicateArticle,
  onUpdateArticleStatus,
  onPreviewArticle,
}: BlogArticlesListProps) {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedAuthor, setSelectedAuthor] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [actionMenuOpenId, setActionMenuOpenId] = useState<string | null>(null);

  // Status counts
  const counts = {
    all: articles.length,
    published: articles.filter((a) => a.status === "published").length,
    draft: articles.filter((a) => a.status === "draft").length,
    in_review: articles.filter((a) => a.status === "in_review").length,
    scheduled: articles.filter((a) => a.status === "scheduled").length,
    archived: articles.filter((a) => a.status === "archived").length,
  };

  const totalViews = articles.reduce((acc, a) => acc + (a.views || 0), 0);

  // Filtering
  const filteredArticles = articles.filter((article) => {
    if (activeTab !== "all" && article.status !== activeTab) return false;
    if (selectedCategory !== "all" && article.category !== selectedCategory) return false;
    if (selectedAuthor !== "all" && article.author !== selectedAuthor) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = article.title.toLowerCase().includes(q);
      const matchExcerpt = (article.excerpt || "").toLowerCase().includes(q);
      const matchCategory = article.category.toLowerCase().includes(q);
      const matchTag = article.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchExcerpt && !matchCategory && !matchTag) return false;
    }
    return true;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredArticles.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredArticles.map((a) => a.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleBulkAction = (action: "publish" | "archive" | "delete") => {
    if (action === "publish") {
      selectedIds.forEach((id) => onUpdateArticleStatus(id, "published"));
      toast.success(`Published ${selectedIds.length} articles`);
    } else if (action === "archive") {
      selectedIds.forEach((id) => onUpdateArticleStatus(id, "archived"));
      toast.success(`Archived ${selectedIds.length} articles`);
    } else if (action === "delete") {
      selectedIds.forEach((id) => onDeleteArticle(id));
      toast.success(`Deleted ${selectedIds.length} articles`);
    }
    setSelectedIds([]);
  };

  return (
    <div className="space-y-6 animate-fade-in-soft">
      {/* ================= TOP EDITORIAL METRIC CARDS ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="p-4 bg-surface border border-border space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-muted-foreground tracking-wider">
              Total Articles
            </span>
            <FileText className="size-3.5 text-gold" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-display font-medium text-foreground">
              {articles.length}
            </span>
            <span className="text-[10px] font-mono text-emerald-400">
              +{articles.filter((a) => a.status === "published").length} Live
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground">Studio Journal & Drop Monographs</p>
        </div>

        <div className="p-4 bg-surface border border-border space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-muted-foreground tracking-wider">
              Total Article Views
            </span>
            <TrendingUp className="size-3.5 text-gold" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-display font-medium text-foreground">
              {totalViews.toLocaleString()}
            </span>
            <span className="text-[10px] font-mono text-emerald-400">+18.4%</span>
          </div>
          <p className="text-[11px] text-muted-foreground">High-engagement editorial reads</p>
        </div>

        <div className="p-4 bg-surface border border-border space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-muted-foreground tracking-wider">
              Avg. Reading Time
            </span>
            <Clock className="size-3.5 text-gold" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-display font-medium text-foreground">4.8 min</span>
            <span className="text-[10px] font-mono text-gold">Long-form</span>
          </div>
          <p className="text-[11px] text-muted-foreground">78% Completion Rate</p>
        </div>

        <div className="p-4 bg-surface border border-border space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-muted-foreground tracking-wider">
              Scheduled Releases
            </span>
            <Calendar className="size-3.5 text-gold" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-display font-medium text-foreground">
              {counts.scheduled}
            </span>
            <span className="text-[10px] font-mono text-blue-400">In Pipeline</span>
          </div>
          <p className="text-[11px] text-muted-foreground">Next release: Sept 1 @ 09:00 CET</p>
        </div>
      </div>

      {/* ================= COMMAND HEADER ================= */}
      <div className="p-4 bg-surface border border-border space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 text-xs font-mono">
            {[
              { id: "all", label: "All Stories", count: counts.all },
              { id: "published", label: "Published", count: counts.published },
              { id: "draft", label: "Drafts", count: counts.draft },
              { id: "in_review", label: "In Review", count: counts.in_review },
              { id: "scheduled", label: "Scheduled", count: counts.scheduled },
              { id: "archived", label: "Archived", count: counts.archived },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? "bg-gold text-background font-semibold"
                    : "bg-surface-2 text-muted-foreground hover:text-foreground hover:bg-surface-2/80"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-none font-mono ${
                    activeTab === tab.id
                      ? "bg-background/20 text-background"
                      : "bg-background text-muted-foreground"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Primary Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenAIWizard}
              className="px-3.5 py-2 bg-surface-2 border border-gold/40 hover:border-gold text-xs font-mono uppercase text-gold hover:text-foreground flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Sparkles className="size-3.5 text-gold" /> AI Article Generator
            </button>
            <button
              type="button"
              onClick={onCreateNewArticle}
              className="px-4 py-2 bg-gold text-background text-xs font-mono uppercase font-bold hover:bg-foreground hover:text-background flex items-center gap-1.5 transition-colors shadow-md"
            >
              <Plus className="size-4" /> New Article
            </button>
          </div>
        </div>

        {/* Search, Filter Bar & View Toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-border">
          <div className="flex items-center gap-2 w-full sm:w-auto flex-1">
            <div className="relative flex-1 max-w-sm">
              <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by title, tag, or excerpt..."
                className="w-full pl-9 pr-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold font-sans"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
            >
              <option value="all">All Categories</option>
              {INITIAL_CATEGORIES.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>

            <select
              value={selectedAuthor}
              onChange={(e) => setSelectedAuthor(e.target.value)}
              className="px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold hidden md:block"
            >
              <option value="all">All Authors</option>
              {INITIAL_AUTHORS.map((a) => (
                <option key={a.id} value={a.name}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {/* View Mode Toggle */}
            <div className="flex items-center border border-border bg-surface-2 p-0.5">
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`p-1.5 transition-colors ${
                  viewMode === "table"
                    ? "bg-gold text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title="Table View"
              >
                <List className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`p-1.5 transition-colors ${
                  viewMode === "grid"
                    ? "bg-gold text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title="Cards Grid View"
              >
                <LayoutGrid className="size-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bulk Action Bar (when rows selected) */}
        {selectedIds.length > 0 && (
          <div className="p-2.5 bg-gold/10 border border-gold/40 flex items-center justify-between text-xs animate-fade-in-soft">
            <span className="font-mono text-gold font-semibold">
              {selectedIds.length} article(s) selected
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleBulkAction("publish")}
                className="px-2.5 py-1 bg-surface border border-border hover:border-gold text-[11px] font-mono uppercase text-foreground"
              >
                Publish Live
              </button>
              <button
                type="button"
                onClick={() => handleBulkAction("archive")}
                className="px-2.5 py-1 bg-surface border border-border hover:border-gold text-[11px] font-mono uppercase text-foreground"
              >
                Archive
              </button>
              <button
                type="button"
                onClick={() => handleBulkAction("delete")}
                className="px-2.5 py-1 bg-surface border border-red-500/40 text-red-400 hover:bg-red-500/10 text-[11px] font-mono uppercase"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ================= ARTICLES CONTENT VIEW ================= */}
      {viewMode === "table" ? (
        /* TABLE VIEW */
        <div className="bg-surface border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-2 border-b border-border text-[10px] font-mono uppercase text-muted-foreground tracking-wider">
                <tr>
                  <th className="p-3.5 w-8 text-center">
                    <input
                      type="checkbox"
                      checked={
                        selectedIds.length > 0 && selectedIds.length === filteredArticles.length
                      }
                      onChange={toggleSelectAll}
                      className="size-3.5 accent-gold"
                    />
                  </th>
                  <th className="p-3.5">Article / Monograph</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Author</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Metrics</th>
                  <th className="p-3.5">Last Updated</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredArticles.length > 0 ? (
                  filteredArticles.map((article) => {
                    const isSelected = selectedIds.includes(article.id);

                    return (
                      <tr
                        key={article.id}
                        onClick={() => onSelectArticle(article)}
                        className={`hover:bg-surface-2/60 cursor-pointer transition-colors ${
                          isSelected ? "bg-gold/5" : ""
                        }`}
                      >
                        <td className="p-3.5 text-center" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelect(article.id)}
                            className="size-3.5 accent-gold"
                          />
                        </td>
                        <td className="p-3.5 max-w-sm">
                          <div className="flex items-center gap-3">
                            <div className="size-12 bg-surface-2 border border-border overflow-hidden shrink-0">
                              {article.featuredImage ? (
                                <img
                                  src={article.featuredImage}
                                  alt={article.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-muted-foreground font-mono text-[9px]">
                                  NO IMG
                                </div>
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-foreground truncate group-hover:text-gold">
                                {article.title}
                              </p>
                              <p className="text-[11px] text-muted-foreground truncate max-w-xs mt-0.5">
                                {article.excerpt || "No summary provided"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 bg-surface-2 border border-border text-[10px] font-mono text-muted-foreground uppercase">
                            {article.category}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <div className="flex items-center gap-2">
                            {article.authorAvatar && (
                              <img
                                src={article.authorAvatar}
                                alt={article.author}
                                className="size-5 rounded-full object-cover border border-border"
                              />
                            )}
                            <span className="text-foreground text-xs">{article.author}</span>
                          </div>
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`text-[10px] font-mono uppercase px-2 py-0.5 border ${
                              article.status === "published"
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                                : article.status === "scheduled"
                                  ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                                  : article.status === "in_review"
                                    ? "bg-purple-500/10 text-purple-400 border-purple-500/30"
                                    : article.status === "archived"
                                      ? "bg-zinc-500/10 text-zinc-400 border-zinc-500/30"
                                      : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                            }`}
                          >
                            {article.status.replace("_", " ")}
                          </span>
                        </td>
                        <td className="p-3.5 font-mono text-[11px]">
                          <div className="text-foreground">
                            {(article.views || 0).toLocaleString()} views
                          </div>
                          <div className="text-muted-foreground text-[10px]">
                            {article.readTime}
                          </div>
                        </td>
                        <td className="p-3.5 font-mono text-[11px] text-muted-foreground">
                          {article.lastUpdated || article.publishedAt || "Today"}
                        </td>
                        <td className="p-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              onClick={() => onPreviewArticle(article)}
                              className="p-1.5 text-muted-foreground hover:text-foreground border border-transparent hover:border-border"
                              title="Live Preview"
                            >
                              <Eye className="size-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => onSelectArticle(article)}
                              className="p-1.5 text-muted-foreground hover:text-gold border border-transparent hover:border-gold/40"
                              title="Edit Article"
                            >
                              <Edit className="size-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => onDuplicateArticle(article)}
                              className="p-1.5 text-muted-foreground hover:text-foreground border border-transparent hover:border-border"
                              title="Duplicate"
                            >
                              <Copy className="size-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => onDeleteArticle(article.id)}
                              className="p-1.5 text-muted-foreground hover:text-red-400 border border-transparent hover:border-red-400/40"
                              title="Delete"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={8} className="p-12 text-center text-muted-foreground space-y-2">
                      <FileText className="size-8 mx-auto text-muted-foreground/50 mb-2" />
                      <p className="text-sm font-display text-foreground">
                        No articles found matching filters
                      </p>
                      <p className="text-xs font-mono">
                        Try adjusting your query or launch the AI Generator Wizard.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* GRID CARDS VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="p-4 bg-surface border border-border hover:border-gold/60 transition-all cursor-pointer space-y-3 group"
            >
              <div className="aspect-[16/9] w-full bg-surface-2 border border-border overflow-hidden relative">
                {article.featuredImage ? (
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground font-mono text-xs">
                    NO IMAGE
                  </div>
                )}
                <span
                  className={`absolute top-2 right-2 text-[9px] font-mono uppercase px-2 py-0.5 border ${
                    article.status === "published"
                      ? "bg-black/90 text-emerald-400 border-emerald-500/40"
                      : article.status === "scheduled"
                        ? "bg-black/90 text-blue-400 border-blue-500/40"
                        : "bg-black/90 text-amber-400 border-amber-500/40"
                  }`}
                >
                  {article.status.toUpperCase()}
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
                  <span className="text-gold uppercase font-semibold">{article.category}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
                <h4 className="text-sm font-semibold text-foreground group-hover:text-gold line-clamp-2">
                  {article.title}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-2">{article.excerpt}</p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border/80 text-xs">
                <div className="flex items-center gap-2">
                  {article.authorAvatar && (
                    <img
                      src={article.authorAvatar}
                      alt={article.author}
                      className="size-5 rounded-full object-cover border border-border"
                    />
                  )}
                  <span className="text-[11px] text-muted-foreground truncate max-w-[100px]">
                    {article.author}
                  </span>
                </div>
                <div className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
                  <span>{(article.views || 0).toLocaleString()} views</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
