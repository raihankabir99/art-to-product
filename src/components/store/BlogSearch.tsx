import { useState, useMemo } from "react";
import { Search, X, SlidersHorizontal, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BLOG_CATEGORIES,
  type BlogCategory,
  type ArticleDetail,
  ALL_ARTICLES,
  DESIGN_STORIES_DATA,
  PRODUCT_GUIDES_DATA,
} from "@/lib/blog-data";
import { StandardArticleCard } from "./BlogCards";

export interface BlogFilterState {
  category: BlogCategory;
  searchQuery: string;
}

export function BlogCategoryNav({
  activeCategory,
  onSelectCategory,
  className,
}: {
  activeCategory: BlogCategory;
  onSelectCategory: (category: BlogCategory) => void;
  className?: string;
}) {
  return (
    <nav
      aria-label="Blog Categories"
      className={cn("relative w-full border-b border-border bg-background py-3", className)}
    >
      <div className="container-page flex items-center justify-between gap-4">
        {/* Horizontally scrollable category pill list */}
        <div className="no-scrollbar flex w-full items-center gap-1.5 overflow-x-auto py-1 sm:gap-2">
          {BLOG_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onSelectCategory(cat)}
                aria-pressed={isActive}
                className={cn(
                  "shrink-0 rounded-none border px-3.5 py-2 text-label transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold whitespace-nowrap",
                  isActive
                    ? "border-gold bg-gold text-black font-semibold shadow-sm"
                    : "border-border bg-surface text-muted-foreground hover:border-foreground/40 hover:text-foreground",
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export function BlogSearchHeader({
  query,
  onQueryChange,
  activeCategory,
  onSelectCategory,
  totalResults,
}: {
  query: string;
  onQueryChange: (q: string) => void;
  activeCategory: BlogCategory;
  onSelectCategory: (c: BlogCategory) => void;
  totalResults: number;
}) {
  return (
    <div className="border-b border-border bg-surface/50 py-6 sm:py-8">
      <div className="container-page">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-label text-gold uppercase tracking-wider font-semibold">
                Journal Directory
              </span>
              <span className="text-border">·</span>
              <span className="text-meta text-muted-foreground">
                {totalResults} {totalResults === 1 ? "story" : "stories"} found
              </span>
            </div>
            <h2 className="text-h2 mt-1 font-heading">
              {activeCategory === "All" ? "All Editorial Stories" : activeCategory}
            </h2>
          </div>

          {/* Search Input Box */}
          <div className="relative w-full max-w-md">
            <label htmlFor="blog-search-input" className="sr-only">
              Search editorial stories
            </label>
            <div className="relative flex items-center">
              <Search
                className="pointer-events-none absolute left-3.5 size-4 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                id="blog-search-input"
                type="text"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Search stories, fits, design philosophy..."
                className="h-11 w-full border border-border bg-background pl-10 pr-10 text-body text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none transition-colors"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => onQueryChange("")}
                  aria-label="Clear search"
                  className="absolute right-3 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              ) : null}
            </div>
          </div>
        </div>

        {/* Active Filters Tag Bar */}
        {(query || activeCategory !== "All") && (
          <div className="mt-4 flex flex-wrap items-center gap-2 pt-2 text-meta text-muted-foreground">
            <span>Active filters:</span>
            {activeCategory !== "All" && (
              <span className="inline-flex items-center gap-1.5 border border-gold/40 bg-gold/10 px-2 py-0.5 text-[11px] font-medium text-gold">
                Category: {activeCategory}
                <button
                  type="button"
                  onClick={() => onSelectCategory("All")}
                  aria-label="Remove category filter"
                  className="hover:text-white"
                >
                  <X className="size-3" />
                </button>
              </span>
            )}
            {query && (
              <span className="inline-flex items-center gap-1.5 border border-border bg-surface px-2 py-0.5 text-[11px] text-foreground">
                Query: "{query}"
                <button
                  type="button"
                  onClick={() => onQueryChange("")}
                  aria-label="Clear query"
                  className="hover:text-gold"
                >
                  <X className="size-3" />
                </button>
              </span>
            )}
            <button
              type="button"
              onClick={() => {
                onQueryChange("");
                onSelectCategory("All");
              }}
              className="text-label text-gold hover:underline ml-2"
            >
              Reset all
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function BlogEmptyState({
  query,
  activeCategory,
  onReset,
}: {
  query: string;
  activeCategory: BlogCategory;
  onReset: () => void;
}) {
  return (
    <div className="section container-page flex flex-col items-center justify-center border border-dashed border-border py-16 text-center">
      <div className="flex size-14 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground">
        <Search className="size-6 text-gold" />
      </div>
      <h3 className="text-h3 mt-4">No stories found</h3>
      <p className="text-body mt-2 max-w-md text-muted-foreground">
        We couldn't find any articles matching{" "}
        {query ? <span className="text-foreground font-medium">"{query}"</span> : "your filters"} in{" "}
        <span className="text-gold font-medium">{activeCategory}</span>.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={onReset}
          className="border border-gold bg-gold px-4 py-2 text-label font-semibold text-black transition-colors hover:bg-gold/90"
        >
          View All Stories
        </button>
      </div>
    </div>
  );
}
