import { useState } from "react";
import {
  FileText,
  Search,
  Sparkles,
  TrendingUp,
  ArrowUpRight,
  Eye,
  Clock,
  ShoppingCart,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { CONTENT_ARTICLES_LIST, SEO_PERFORMANCE_METRICS } from "./analytics-mock-data";

export function ContentSEOAnalyticsView() {
  const [activeTab, setActiveTab] = useState<"content" | "seo">("content");
  const seo = SEO_PERFORMANCE_METRICS;
  const articles = CONTENT_ARTICLES_LIST;

  return (
    <div className="space-y-8 animate-fade-in-soft">
      {/* 1. TOP STATS OVERVIEW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-surface border border-border">
          <span className="text-xs font-mono uppercase text-muted-foreground">
            SEO Health Score
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-display font-bold text-emerald-400">
              {seo.healthScore} / 100
            </span>
            <span className="text-xs font-mono text-emerald-400">{seo.rating}</span>
          </div>
          <span className="text-xs font-mono text-muted-foreground mt-1 block">
            148 Indexed Pages • 0 Broken Links
          </span>
        </div>

        <div className="p-5 bg-surface border border-border">
          <span className="text-xs font-mono uppercase text-muted-foreground">
            Organic Search Revenue
          </span>
          <div className="text-2xl font-display font-semibold text-gold mt-2">
            €{seo.organicRevenue.toLocaleString()}
          </div>
          <span className="text-xs font-mono text-emerald-400">+19.2% MoM Organic GMV</span>
        </div>

        <div className="p-5 bg-surface border border-border">
          <span className="text-xs font-mono uppercase text-muted-foreground">
            Editorial Assisted Revenue
          </span>
          <div className="text-2xl font-display font-semibold text-foreground mt-2">€17,740.00</div>
          <span className="text-xs font-mono text-muted-foreground">786 direct product clicks</span>
        </div>

        <div className="p-5 bg-surface border border-border">
          <span className="text-xs font-mono uppercase text-muted-foreground">
            Avg Search SERP Position
          </span>
          <div className="text-2xl font-display font-semibold text-foreground mt-2">
            #{seo.avgPosition}
          </div>
          <span className="text-xs font-mono text-gold">Top 3 for 14 high-intent terms</span>
        </div>
      </div>

      {/* 2. SUB NAVIGATION: EDITORIAL vs SEARCH ENGINE OPTIMIZATION */}
      <div className="flex items-center gap-2 border-b border-border pb-4">
        <button
          onClick={() => setActiveTab("content")}
          className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors ${
            activeTab === "content"
              ? "bg-gold text-black font-semibold"
              : "bg-surface-2 text-muted-foreground hover:text-foreground border border-border"
          }`}
        >
          Editorial & Journal Performance
        </button>
        <button
          onClick={() => setActiveTab("seo")}
          className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors ${
            activeTab === "seo"
              ? "bg-gold text-black font-semibold"
              : "bg-surface-2 text-muted-foreground hover:text-foreground border border-border"
          }`}
        >
          Organic Search & Keyword Matrix
        </button>
      </div>

      {/* 3. CONTENT ARTICLES VIEW */}
      {activeTab === "content" && (
        <div className="space-y-6">
          <div className="bg-surface border border-border overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-surface-2 border-b border-border text-muted-foreground uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Journal Article Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4 text-right">Page Views</th>
                  <th className="py-3 px-4 text-right">Engagement</th>
                  <th className="py-3 px-4 text-right">Avg Read Time</th>
                  <th className="py-3 px-4 text-right">Product Clicks</th>
                  <th className="py-3 px-4 text-right">Revenue Assisted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {articles.map((art) => (
                  <tr key={art.id} className="hover:bg-surface-2/60 transition-colors">
                    <td className="py-3 px-4 font-medium text-foreground">
                      <div className="flex items-center gap-2">
                        <FileText className="size-4 text-gold flex-shrink-0" />
                        <span>{art.title}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{art.category}</td>
                    <td className="py-3 px-4 text-right text-foreground font-semibold">
                      {art.views.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {art.engagementScore}/100
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-muted-foreground">
                      {art.avgReadTime}
                    </td>
                    <td className="py-3 px-4 text-right text-gold font-semibold">
                      {art.productClicks}
                    </td>
                    <td className="py-3 px-4 text-right text-emerald-400 font-bold">
                      €{art.revenueAssisted.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. SEO AUDIT & KEYWORDS VIEW */}
      {activeTab === "seo" && (
        <div className="space-y-6">
          {/* SEO Health Category Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {seo.breakdown.map((item, idx) => (
              <div key={idx} className="p-5 bg-surface border border-border space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground">{item.category}</span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    {item.score}/100
                  </span>
                </div>
                <div className="h-1.5 w-full bg-surface-2 overflow-hidden">
                  <div className="h-full bg-emerald-400" style={{ width: `${item.score}%` }} />
                </div>
                <p className="text-[11px] text-muted-foreground leading-snug">{item.checks}</p>
              </div>
            ))}
          </div>

          {/* Top Keywords Table */}
          <div className="space-y-3">
            <h3 className="text-sm font-display font-medium text-foreground uppercase tracking-wider">
              Top Ranking Commercial Keywords
            </h3>

            <div className="bg-surface border border-border overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-surface-2 border-b border-border text-muted-foreground uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Keyword Query</th>
                    <th className="py-3 px-4">Search Intent</th>
                    <th className="py-3 px-4 text-right">Google Rank</th>
                    <th className="py-3 px-4 text-right">Monthly Impressions</th>
                    <th className="py-3 px-4 text-right">Clicks</th>
                    <th className="py-3 px-4 text-right">CTR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {seo.topKeywords.map((kw, i) => (
                    <tr key={i} className="hover:bg-surface-2/60 transition-colors">
                      <td className="py-3 px-4 font-semibold text-foreground">{kw.keyword}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 text-[10px] bg-surface-2 border border-border text-muted-foreground">
                          {kw.intent}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-gold font-bold">#{kw.position}</td>
                      <td className="py-3 px-4 text-right text-muted-foreground">
                        {kw.impressions.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right text-foreground font-semibold">
                        {kw.clicks}
                      </td>
                      <td className="py-3 px-4 text-right text-emerald-400 font-semibold">
                        {kw.ctr}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
