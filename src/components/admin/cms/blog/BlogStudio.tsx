import { useState } from "react";
import { BookOpen, FolderTree, Users, Calendar, BarChart2, Sparkles, Plus } from "lucide-react";
import { ArticleItem, ArticleStatus } from "./blog-types";
import { INITIAL_ARTICLES } from "./blog-initial-data";
import { BlogArticlesList } from "./BlogArticlesList";
import { ArticleEditorWorkspace } from "./ArticleEditorWorkspace";
import { CategoriesTagsManager } from "./CategoriesTagsManager";
import { AuthorsManager } from "./AuthorsManager";
import { ContentCalendarView } from "./ContentCalendarView";
import { BlogAnalyticsDashboard } from "./BlogAnalyticsDashboard";
import { AIArticleGenWizardModal } from "./AIArticleGenWizardModal";
import { ArticlePreviewModal } from "./ArticlePreviewModal";
import { toast } from "sonner";

export function BlogStudio() {
  const [articles, setArticles] = useState<ArticleItem[]>(INITIAL_ARTICLES);
  const [activeTab, setActiveTab] = useState<
    "articles" | "taxonomy" | "authors" | "calendar" | "analytics"
  >("articles");
  const [editingArticle, setEditingArticle] = useState<ArticleItem | null>(null);

  // Modals
  const [aiWizardOpen, setAiWizardOpen] = useState(false);
  const [previewArticle, setPreviewArticle] = useState<ArticleItem | null>(null);

  const handleCreateNewArticle = () => {
    const newArticle: ArticleItem = {
      id: `art_${Date.now()}`,
      title: "Untitled Editorial Monograph",
      slug: `untitled-monograph-${Date.now().toString().slice(-4)}`,
      excerpt: "Enter a compelling introductory thesis or editorial summary...",
      category: "Design",
      featuredImage:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
      featuredImageAlt: "Studio editorial composition",
      author: "Creative Studio",
      authorRole: "Design Direction",
      authorAvatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      status: "draft",
      readTime: "4 min read",
      tags: ["Minimalism", "Design", "Atelier"],
      language: "English",
      seo: {
        seoTitle: "Untitled Editorial Monograph | Studio Noir Journal",
        metaDescription:
          "Read the latest design essay exploring minimalist craftsmanship and luxury print-on-demand.",
        urlSlug: `untitled-monograph-${Date.now().toString().slice(-4)}`,
        canonicalUrl: `https://studionoir.fashion/journal/untitled-monograph`,
        ogTitle: "Untitled Editorial Monograph",
        ogDescription: "An exploration into form, fabric, and print discipline.",
        ogImage:
          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
        keywords: ["minimalism", "fashion", "studio noir"],
        robotsIndex: true,
        robotsFollow: true,
      },
      blocks: [
        {
          id: `blk_${Date.now()}_1`,
          type: "paragraph",
          content:
            "Begin crafting your story here. Introduce the core philosophy, textile weight, or cultural context.",
        },
        {
          id: `blk_${Date.now()}_2`,
          type: "heading",
          content: "The Foundations of Form",
          settings: { level: 2 },
        },
        {
          id: `blk_${Date.now()}_3`,
          type: "quote",
          content: "Discipline in the design room translates directly to presence on the street.",
          settings: { quoteAuthor: "Editorial Studio" },
        },
      ],
      versions: [
        {
          id: `v_${Date.now()}`,
          versionNumber: 1,
          timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
          author: "Creative Studio",
          changeSummary: "Initial draft creation",
          wordCount: 42,
          snapshotTitle: "Untitled Editorial Monograph (v1)",
        },
      ],
    };

    setArticles([newArticle, ...articles]);
    setEditingArticle(newArticle);
    toast.success("Created new blank article draft");
  };

  const handleSaveArticle = (updated: ArticleItem) => {
    setArticles((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
    setEditingArticle(updated);
  };

  const handleDeleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
    if (editingArticle?.id === id) {
      setEditingArticle(null);
    }
    toast.info("Article deleted");
  };

  const handleDuplicateArticle = (article: ArticleItem) => {
    const duplicated: ArticleItem = {
      ...article,
      id: `art_${Date.now()}`,
      title: `${article.title} (Copy)`,
      slug: `${article.slug}-copy`,
      status: "draft",
      views: 0,
      publishedAt: undefined,
      scheduledAt: undefined,
      blocks: article.blocks.map((b) => ({
        ...b,
        id: `blk_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      })),
    };
    setArticles([duplicated, ...articles]);
    toast.success("Article duplicated as draft");
  };

  const handleUpdateStatus = (id: string, status: ArticleStatus) => {
    setArticles((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  const handleArticleGeneratedFromWizard = (gen: Partial<ArticleItem>) => {
    const newArt: ArticleItem = {
      id: `art_ai_${Date.now()}`,
      title: gen.title || "AI Editorial Story",
      slug: gen.slug || `story-${Date.now()}`,
      excerpt: gen.excerpt || "",
      category: gen.category || "Design",
      featuredImage:
        gen.featuredImage ||
        "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80",
      featuredImageAlt: gen.featuredImageAlt,
      author: gen.author || "Creative Studio",
      authorRole: gen.authorRole || "Editorial Direction",
      authorAvatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      status: "draft",
      readTime: gen.readTime || "5 min read",
      tags: gen.tags || ["Design", "Editorial AI"],
      language: gen.language || "English",
      seo: gen.seo || {
        seoTitle: `${gen.title} | Studio Noir`,
        metaDescription: gen.excerpt || "",
        urlSlug: gen.slug || `story-${Date.now()}`,
        canonicalUrl: `https://studionoir.fashion/journal/${gen.slug}`,
        ogTitle: gen.title || "",
        ogDescription: gen.excerpt || "",
        ogImage: gen.featuredImage || "",
        keywords: ["editorial", "studio noir"],
        robotsIndex: true,
        robotsFollow: true,
      },
      blocks: gen.blocks || [],
      versions: [
        {
          id: `v_gen_${Date.now()}`,
          versionNumber: 1,
          timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
          author: "AI Content Copilot",
          changeSummary: "AI Full Article Synthesis",
          wordCount: 820,
          snapshotTitle: `${gen.title} (v1 AI Generated)`,
        },
      ],
    };

    setArticles([newArt, ...articles]);
    setEditingArticle(newArt);
  };

  // If in editor mode, render the full workspace
  if (editingArticle) {
    return (
      <ArticleEditorWorkspace
        initialArticle={editingArticle}
        onBack={() => setEditingArticle(null)}
        onSaveArticle={handleSaveArticle}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Banner Navigation for Blog Studio */}
      <div className="p-4 bg-surface border border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-display font-medium text-foreground uppercase tracking-wider">
              Blog & Editorial Content Studio
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 bg-gold/15 text-gold border border-gold/40">
              PROMPT 4 WORKSPACE
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Enterprise content management, block-based writing studio, and print-on-demand
            merchandising.
          </p>
        </div>

        {/* Top Studio Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveTab("articles")}
            className={`px-3 py-1.5 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === "articles"
                ? "bg-gold text-background font-semibold"
                : "bg-surface-2 text-muted-foreground hover:text-foreground hover:bg-surface-2/80"
            }`}
          >
            <BookOpen className="size-3.5" /> Articles ({articles.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("taxonomy")}
            className={`px-3 py-1.5 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === "taxonomy"
                ? "bg-gold text-background font-semibold"
                : "bg-surface-2 text-muted-foreground hover:text-foreground hover:bg-surface-2/80"
            }`}
          >
            <FolderTree className="size-3.5" /> Taxonomy & Tags
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("authors")}
            className={`px-3 py-1.5 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === "authors"
                ? "bg-gold text-background font-semibold"
                : "bg-surface-2 text-muted-foreground hover:text-foreground hover:bg-surface-2/80"
            }`}
          >
            <Users className="size-3.5" /> Authors Roster
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("calendar")}
            className={`px-3 py-1.5 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === "calendar"
                ? "bg-gold text-background font-semibold"
                : "bg-surface-2 text-muted-foreground hover:text-foreground hover:bg-surface-2/80"
            }`}
          >
            <Calendar className="size-3.5" /> Content Calendar
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("analytics")}
            className={`px-3 py-1.5 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === "analytics"
                ? "bg-gold text-background font-semibold"
                : "bg-surface-2 text-muted-foreground hover:text-foreground hover:bg-surface-2/80"
            }`}
          >
            <BarChart2 className="size-3.5" /> Analytics
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === "articles" && (
        <BlogArticlesList
          articles={articles}
          onSelectArticle={(art) => setEditingArticle(art)}
          onCreateNewArticle={handleCreateNewArticle}
          onOpenAIWizard={() => setAiWizardOpen(true)}
          onDeleteArticle={handleDeleteArticle}
          onDuplicateArticle={handleDuplicateArticle}
          onUpdateArticleStatus={handleUpdateStatus}
          onPreviewArticle={(art) => setPreviewArticle(art)}
        />
      )}

      {activeTab === "taxonomy" && <CategoriesTagsManager />}

      {activeTab === "authors" && <AuthorsManager />}

      {activeTab === "calendar" && (
        <ContentCalendarView
          articles={articles}
          onSelectArticle={(art) => setEditingArticle(art)}
          onCreateNewArticle={handleCreateNewArticle}
        />
      )}

      {activeTab === "analytics" && (
        <BlogAnalyticsDashboard
          articles={articles}
          onSelectArticle={(art) => setEditingArticle(art)}
        />
      )}

      {/* Global Modals */}
      <AIArticleGenWizardModal
        isOpen={aiWizardOpen}
        onClose={() => setAiWizardOpen(false)}
        onArticleGenerated={handleArticleGeneratedFromWizard}
      />

      {previewArticle && (
        <ArticlePreviewModal
          isOpen={true}
          onClose={() => setPreviewArticle(null)}
          article={previewArticle}
        />
      )}
    </div>
  );
}
