import {
  BarChart3,
  TrendingUp,
  Clock,
  Eye,
  Users,
  ShoppingBag,
  ArrowUpRight,
  Share2,
  Globe,
  Mail,
  Search,
} from "lucide-react";
import { ArticleItem } from "./blog-types";

interface BlogAnalyticsDashboardProps {
  articles: ArticleItem[];
  onSelectArticle: (article: ArticleItem) => void;
}

export function BlogAnalyticsDashboard({ articles, onSelectArticle }: BlogAnalyticsDashboardProps) {
  const topArticles = [...articles].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in-soft">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-surface border border-border space-y-1">
          <span className="text-[10px] font-mono uppercase text-muted-foreground">
            30-Day Article Views
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-display font-medium text-foreground">42,850</span>
            <span className="text-[10px] font-mono text-emerald-400">+22.4%</span>
          </div>
          <p className="text-[11px] text-muted-foreground">vs. previous 30 days</p>
        </div>

        <div className="p-4 bg-surface border border-border space-y-1">
          <span className="text-[10px] font-mono uppercase text-muted-foreground">
            Avg. Scroll Depth
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-display font-medium text-foreground">84.2%</span>
            <span className="text-[10px] font-mono text-emerald-400">High intent</span>
          </div>
          <p className="text-[11px] text-muted-foreground">Editorial engagement</p>
        </div>

        <div className="p-4 bg-surface border border-border space-y-1">
          <span className="text-[10px] font-mono uppercase text-muted-foreground">
            POD Commerce Clicks
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-display font-medium text-foreground">1,840</span>
            <span className="text-[10px] font-mono text-gold">4.3% CTR</span>
          </div>
          <p className="text-[11px] text-muted-foreground">Driven to shop checkouts</p>
        </div>

        <div className="p-4 bg-surface border border-border space-y-1">
          <span className="text-[10px] font-mono uppercase text-muted-foreground">
            Dispatch Subscribers
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-display font-medium text-foreground">392</span>
            <span className="text-[10px] font-mono text-emerald-400">+12%</span>
          </div>
          <p className="text-[11px] text-muted-foreground">New newsletter readers</p>
        </div>
      </div>

      {/* Grid: Top Articles & Traffic Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Top Performing Articles (7 Cols) */}
        <div className="lg:col-span-7 bg-surface border border-border p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="size-4 text-gold" /> Top Editorial Monographs
            </h4>
            <span className="text-[10px] font-mono text-muted-foreground">
              RANKED BY ENGAGEMENT
            </span>
          </div>

          <div className="space-y-3">
            {topArticles.map((art, idx) => (
              <div
                key={art.id}
                onClick={() => onSelectArticle(art)}
                className="p-3 bg-surface-2/60 hover:bg-surface-2 border border-border hover:border-gold/50 transition-colors cursor-pointer flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-mono text-xs text-gold font-bold w-4">#{idx + 1}</span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{art.title}</p>
                    <p className="text-[10px] font-mono text-muted-foreground">
                      {art.category} • {art.readTime}
                    </p>
                  </div>
                </div>

                <div className="text-right font-mono shrink-0">
                  <span className="text-xs font-semibold text-foreground">
                    {(art.views || 0).toLocaleString()}
                  </span>
                  <span className="text-[10px] text-muted-foreground block">views</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources & Conversion (5 Cols) */}
        <div className="lg:col-span-5 bg-surface border border-border p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h4 className="text-xs font-display font-medium text-foreground uppercase tracking-wider flex items-center gap-2">
              <Globe className="size-4 text-gold" /> Inbound Traffic Channels
            </h4>
            <span className="text-[10px] font-mono text-muted-foreground">LAST 30 DAYS</span>
          </div>

          <div className="space-y-3 text-xs">
            {[
              {
                name: "Organic Search (Google/Bing)",
                share: "48%",
                icon: Search,
                color: "bg-gold",
              },
              {
                name: "Direct / Loyal Readers",
                share: "24%",
                icon: Globe,
                color: "bg-emerald-500",
              },
              { name: "Nocturne Email Dispatch", share: "18%", icon: Mail, color: "bg-blue-500" },
              {
                name: "Instagram / Social Shares",
                share: "10%",
                icon: Share2,
                color: "bg-purple-500",
              },
            ].map((src) => {
              const Icon = src.icon;
              return (
                <div key={src.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2 text-foreground">
                      <Icon className="size-3.5 text-muted-foreground" /> {src.name}
                    </span>
                    <span className="font-mono font-semibold text-foreground">{src.share}</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-2 border border-border/80 overflow-hidden">
                    <div className={`h-full ${src.color}`} style={{ width: src.share }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
