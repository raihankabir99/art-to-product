import { useState } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Plus,
} from "lucide-react";
import { ArticleItem, CalendarEventItem } from "./blog-types";
import { INITIAL_CALENDAR_EVENTS } from "./blog-initial-data";

interface ContentCalendarViewProps {
  articles: ArticleItem[];
  onSelectArticle: (article: ArticleItem) => void;
  onCreateNewArticle: () => void;
}

export function ContentCalendarView({
  articles,
  onSelectArticle,
  onCreateNewArticle,
}: ContentCalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState("September 2026");
  const [events, setEvents] = useState<CalendarEventItem[]>(INITIAL_CALENDAR_EVENTS);

  // Days in month simulation for September 2026 (Starts on Tuesday, 30 days)
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="space-y-6 animate-fade-in-soft">
      {/* Header Bar */}
      <div className="p-4 bg-surface border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-display font-medium text-foreground uppercase tracking-wider flex items-center gap-2">
            <CalendarIcon className="size-4 text-gold" /> Editorial Release & Drop Calendar
          </h3>
          <p className="text-xs text-muted-foreground">
            Orchestrate content timing with print drops, lookbooks, and newsletter dispatches.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center border border-border bg-surface-2">
            <button
              type="button"
              className="p-1.5 text-muted-foreground hover:text-foreground border-r border-border"
            >
              <ChevronLeft className="size-3.5" />
            </button>
            <span className="px-3 py-1 text-xs font-mono font-semibold text-foreground">
              {currentMonth}
            </span>
            <button
              type="button"
              className="p-1.5 text-muted-foreground hover:text-foreground border-l border-border"
            >
              <ChevronRight className="size-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={onCreateNewArticle}
            className="px-3 py-1.5 bg-gold text-background text-xs font-mono uppercase font-bold hover:bg-foreground hover:text-background flex items-center gap-1.5 transition-colors"
          >
            <Plus className="size-3.5" /> Schedule Story
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-surface border border-border overflow-hidden">
        {/* Day of Week Headers */}
        <div className="grid grid-cols-7 border-b border-border bg-surface-2 text-center text-[11px] font-mono uppercase text-muted-foreground py-2.5">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        {/* Month Grid Cells */}
        <div className="grid grid-cols-7 divide-x divide-y divide-border/60 min-h-[500px]">
          {/* Offset for September 2026 (Starts on Tuesday = 2 empty cells) */}
          <div className="bg-surface-2/20 min-h-[90px] p-2 text-muted-foreground/30 font-mono text-xs">
            30
          </div>
          <div className="bg-surface-2/20 min-h-[90px] p-2 text-muted-foreground/30 font-mono text-xs">
            31
          </div>

          {daysInMonth.map((day) => {
            const dateStr = `2026-09-${day.toString().padStart(2, "0")}`;
            const dayEvents = events.filter((e) => e.date === dateStr);
            const scheduledArticle = articles.find(
              (a) =>
                a.scheduledAt === dateStr ||
                (a.publishedAt && a.publishedAt.includes(`-09-${day.toString().padStart(2, "0")}`)),
            );

            return (
              <div
                key={day}
                className="min-h-[100px] p-2 bg-surface hover:bg-surface-2/40 transition-colors flex flex-col justify-between"
              >
                <div className="flex items-center justify-between font-mono text-xs">
                  <span
                    className={`size-5 flex items-center justify-center ${
                      day === 1 ? "bg-gold text-background font-bold" : "text-muted-foreground"
                    }`}
                  >
                    {day}
                  </span>
                  {dayEvents.length > 0 && (
                    <span className="size-1.5 rounded-full bg-gold animate-pulse" />
                  )}
                </div>

                <div className="space-y-1 my-1">
                  {dayEvents.map((evt) => (
                    <div
                      key={evt.id}
                      className={`p-1 text-[9px] font-mono border truncate ${
                        evt.status === "scheduled"
                          ? "bg-blue-500/10 border-blue-500/30 text-blue-300"
                          : evt.status === "published"
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                            : "bg-amber-500/10 border-amber-500/30 text-amber-300"
                      }`}
                    >
                      {evt.time && `${evt.time} • `}
                      {evt.title}
                    </div>
                  ))}

                  {scheduledArticle && (
                    <div
                      onClick={() => onSelectArticle(scheduledArticle)}
                      className="p-1 text-[9px] font-mono bg-gold/15 border border-gold/40 text-gold truncate cursor-pointer hover:bg-gold hover:text-background transition-colors"
                      title="Click to edit article"
                    >
                      📖 {scheduledArticle.title}
                    </div>
                  )}
                </div>

                <div />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
