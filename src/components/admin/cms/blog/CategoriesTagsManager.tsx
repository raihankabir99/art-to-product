import { useState } from "react";
import {
  FolderPlus,
  Tag,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  Layers,
  Sparkles,
  Hash,
} from "lucide-react";
import { toast } from "sonner";
import { BlogCategory, BlogTag } from "./blog-types";
import { INITIAL_CATEGORIES, INITIAL_TAGS } from "./blog-initial-data";

export function CategoriesTagsManager() {
  const [categories, setCategories] = useState<BlogCategory[]>(INITIAL_CATEGORIES);
  const [tags, setTags] = useState<BlogTag[]>(INITIAL_TAGS);
  const [activeTab, setActiveTab] = useState<"categories" | "tags">("categories");

  // New category form
  const [newCatName, setNewCatName] = useState("");
  const [newCatSlug, setNewCatSlug] = useState("");
  const [newCatDesc, setNewCatDesc] = useState("");

  // New tag form
  const [newTagName, setNewTagName] = useState("");
  const [newTagSlug, setNewTagSlug] = useState("");

  const handleAddCategory = () => {
    if (!newCatName.trim()) {
      toast.error("Please enter a category name");
      return;
    }
    const slug = newCatSlug.trim() || newCatName.toLowerCase().replace(/\s+/g, "-");
    const created: BlogCategory = {
      id: `cat_${Date.now()}`,
      name: newCatName.trim(),
      slug,
      description: newCatDesc.trim() || "Curated editorial pillar",
      count: 0,
      color: "gold",
    };
    setCategories([...categories, created]);
    setNewCatName("");
    setNewCatSlug("");
    setNewCatDesc("");
    toast.success(`Category "${created.name}" created`);
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id));
    toast.info("Category removed");
  };

  const handleAddTag = () => {
    if (!newTagName.trim()) {
      toast.error("Please enter a tag name");
      return;
    }
    const slug = newTagSlug.trim() || newTagName.toLowerCase().replace(/\s+/g, "-");
    const created: BlogTag = {
      id: `tag_${Date.now()}`,
      name: newTagName.trim(),
      slug,
      count: 0,
    };
    setTags([...tags, created]);
    setNewTagName("");
    setNewTagSlug("");
    toast.success(`Tag "#${created.name}" created`);
  };

  const handleDeleteTag = (id: string) => {
    setTags(tags.filter((t) => t.id !== id));
    toast.info("Tag removed");
  };

  return (
    <div className="space-y-6 animate-fade-in-soft">
      {/* Header with Sub-tabs */}
      <div className="p-4 bg-surface border border-border flex items-center justify-between">
        <div>
          <h3 className="text-sm font-display font-medium text-foreground uppercase tracking-wider">
            Taxonomy & Content Organization
          </h3>
          <p className="text-xs text-muted-foreground">
            Manage pillar categories and semantic topic tags for the Journal.
          </p>
        </div>

        <div className="flex border border-border bg-surface-2 p-0.5 text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveTab("categories")}
            className={`px-3 py-1 transition-colors flex items-center gap-1.5 ${
              activeTab === "categories"
                ? "bg-gold text-background font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <FolderPlus className="size-3.5" /> Categories ({categories.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("tags")}
            className={`px-3 py-1 transition-colors flex items-center gap-1.5 ${
              activeTab === "tags"
                ? "bg-gold text-background font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Hash className="size-3.5" /> Topic Tags ({tags.length})
          </button>
        </div>
      </div>

      {activeTab === "categories" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Create Category Form (4 Cols) */}
          <div className="lg:col-span-4 bg-surface border border-border p-5 space-y-4">
            <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider flex items-center gap-2">
              <FolderPlus className="size-4 text-gold" /> Add Pillar Category
            </h4>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-mono text-muted-foreground uppercase text-[10px] block mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  value={newCatName}
                  onChange={(e) => {
                    setNewCatName(e.target.value);
                    if (!newCatSlug)
                      setNewCatSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
                  }}
                  placeholder="e.g. Atelier Craft"
                  className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="font-mono text-muted-foreground uppercase text-[10px] block mb-1">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={newCatSlug}
                  onChange={(e) => setNewCatSlug(e.target.value)}
                  placeholder="atelier-craft"
                  className="w-full px-3 py-2 bg-surface-2 border border-border text-xs font-mono text-foreground focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="font-mono text-muted-foreground uppercase text-[10px] block mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={newCatDesc}
                  onChange={(e) => setNewCatDesc(e.target.value)}
                  placeholder="Short description for archive page header..."
                  className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold resize-none"
                />
              </div>

              <button
                type="button"
                onClick={handleAddCategory}
                className="w-full py-2 bg-gold text-background text-xs font-mono uppercase font-bold hover:bg-foreground hover:text-background flex items-center justify-center gap-1.5 transition-colors"
              >
                <Plus className="size-3.5" /> Create Category
              </button>
            </div>
          </div>

          {/* Categories Grid (8 Cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="p-4 bg-surface border border-border hover:border-gold/60 transition-colors space-y-2 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase font-bold text-foreground flex items-center gap-1.5">
                    <span className="size-2 bg-gold rounded-full" /> {cat.name}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-surface-2 text-gold border border-border">
                    {cat.count} articles
                  </span>
                </div>
                <p className="text-[10px] font-mono text-muted-foreground">
                  slug: /journal/category/{cat.slug}
                </p>
                <p className="text-xs text-muted-foreground">{cat.description}</p>
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleDeleteCategory(cat.id)}
                    className="p-1 text-muted-foreground hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Delete Category"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* TAGS SECTION */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Create Tag Form (4 Cols) */}
          <div className="lg:col-span-4 bg-surface border border-border p-5 space-y-4">
            <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider flex items-center gap-2">
              <Hash className="size-4 text-gold" /> Add Topic Tag
            </h4>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-mono text-muted-foreground uppercase text-[10px] block mb-1">
                  Tag Name
                </label>
                <input
                  type="text"
                  value={newTagName}
                  onChange={(e) => {
                    setNewTagName(e.target.value);
                    if (!newTagSlug)
                      setNewTagSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
                  }}
                  placeholder="e.g. 240gsm Cotton"
                  className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="font-mono text-muted-foreground uppercase text-[10px] block mb-1">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={newTagSlug}
                  onChange={(e) => setNewTagSlug(e.target.value)}
                  placeholder="240gsm-cotton"
                  className="w-full px-3 py-2 bg-surface-2 border border-border text-xs font-mono text-foreground focus:outline-none focus:border-gold"
                />
              </div>

              <button
                type="button"
                onClick={handleAddTag}
                className="w-full py-2 bg-gold text-background text-xs font-mono uppercase font-bold hover:bg-foreground hover:text-background flex items-center justify-center gap-1.5 transition-colors"
              >
                <Plus className="size-3.5" /> Create Tag
              </button>
            </div>
          </div>

          {/* Tags Cloud / Table (8 Cols) */}
          <div className="lg:col-span-8 bg-surface border border-border p-6 space-y-4">
            <h4 className="text-xs font-mono uppercase text-muted-foreground tracking-wider">
              Active Topic Tags ({tags.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <div
                  key={tag.id}
                  className="px-3 py-1.5 bg-surface-2 border border-border hover:border-gold text-xs font-mono text-foreground flex items-center gap-2 group transition-colors"
                >
                  <span className="text-gold">#{tag.name}</span>
                  <span className="text-[10px] text-muted-foreground">({tag.count})</span>
                  <button
                    type="button"
                    onClick={() => handleDeleteTag(tag.id)}
                    className="text-muted-foreground hover:text-red-400 opacity-60 group-hover:opacity-100"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
