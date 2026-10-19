import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Bell,
  Check,
  CheckCheck,
  Package,
  Sparkles,
  MessageSquare,
  ArrowRight,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { NOTIFICATIONS, type Notification as NotificationType } from "@/lib/account-data";
import { cn } from "@/lib/utils";

export function AccountNotifications({
  onViewOrder: _onViewOrder,
}: {
  onViewOrder?: (orderId: string) => void;
}) {
  const [notifications, setNotifications] = useState<NotificationType[]>(NOTIFICATIONS);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter((n) => n.unread).length;
  const filteredList = notifications.filter((n) => (filter === "unread" ? n.unread : true));

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    toast.success("All notifications marked as read.");
  };

  const handleToggleRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, unread: !n.unread } : n)));
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast.info("Notification removed.");
  };

  const getIcon = (title: string) => {
    if (title.toLowerCase().includes("order") || title.toLowerCase().includes("shipped")) {
      return <Package className="size-4 text-gold" />;
    }
    if (title.toLowerCase().includes("design") || title.toLowerCase().includes("hoodie")) {
      return <Sparkles className="size-4 text-gold" />;
    }
    return <MessageSquare className="size-4 text-gold" />;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-h3 font-medium">Notifications</h2>
            {unreadCount > 0 && (
              <span className="text-label text-gold text-xs px-2.5 py-0.5 bg-surface border border-gold/40">
                {unreadCount} unread
              </span>
            )}
          </div>
          <p className="text-meta text-muted-foreground mt-1">
            Real-time updates regarding your atelier orders, new drops, and collector notes.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex border border-border p-0.5 bg-surface">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={cn(
                "text-label text-xs uppercase tracking-wider px-3 py-1.5 transition-colors",
                filter === "all"
                  ? "bg-foreground text-background font-medium"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              All ({notifications.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter("unread")}
              className={cn(
                "text-label text-xs uppercase tracking-wider px-3 py-1.5 transition-colors",
                filter === "unread"
                  ? "bg-foreground text-background font-medium"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Unread ({unreadCount})
            </button>
          </div>

          {unreadCount > 0 && (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleMarkAllAsRead}
              className="gap-1.5 text-xs uppercase tracking-wider"
            >
              <CheckCheck className="size-3.5" /> Mark All Read
            </Button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      {filteredList.length > 0 ? (
        <div className="space-y-3">
          {filteredList.map((item) => (
            <div
              key={item.id}
              className={cn(
                "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border p-5 transition-all",
                item.unread
                  ? "border-gold/60 bg-surface shadow-xs"
                  : "border-border bg-surface/60 opacity-90",
              )}
            >
              <div className="flex items-start gap-4 min-w-0">
                <div
                  className={cn(
                    "grid size-10 shrink-0 place-items-center border mt-0.5",
                    item.unread ? "border-gold bg-gold/10" : "border-border bg-surface-2",
                  )}
                >
                  {getIcon(item.title)}
                </div>

                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-body-sm font-medium text-foreground">{item.title}</h3>
                    {item.unread && <span className="size-2 rounded-full bg-gold inline-block" />}
                  </div>
                  <p className="text-meta text-muted-foreground text-xs leading-relaxed">
                    {item.body}
                  </p>
                  <p className="text-meta text-muted-foreground/70 text-[11px] pt-0.5">
                    {item.when}
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-3 sm:shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/60">
                {item.title.includes("AN-2026-00184") && (
                  <Button asChild size="sm" variant="secondary" className="gap-1 text-xs">
                    <Link to="/orders">Track Parcel</Link>
                  </Button>
                )}
                {item.title.includes("Nordic Silence") && (
                  <Button asChild size="sm" variant="secondary" className="gap-1 text-xs">
                    <Link to="/designs/$slug" params={{ slug: "nordic-silence" }}>
                      View Artwork
                    </Link>
                  </Button>
                )}

                <button
                  type="button"
                  onClick={() => handleToggleRead(item.id)}
                  aria-label={item.unread ? "Mark as read" : "Mark as unread"}
                  title={item.unread ? "Mark as read" : "Mark as unread"}
                  className="grid size-8 place-items-center text-muted-foreground hover:text-foreground border border-border bg-surface hover:bg-surface-2 transition-colors"
                >
                  <Check className="size-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  aria-label="Delete notification"
                  title="Delete notification"
                  className="grid size-8 place-items-center text-muted-foreground hover:text-destructive border border-border bg-surface hover:bg-surface-2 transition-colors"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-border bg-surface p-12 text-center space-y-4">
          <Bell className="size-10 mx-auto text-muted-foreground/60" />
          <h3 className="text-h3 font-medium">
            {filter === "unread" ? "No unread notifications" : "No notifications yet"}
          </h3>
          <p className="text-body-sm text-muted-foreground max-w-md mx-auto">
            {filter === "unread"
              ? "You have caught up on all studio announcements and parcel tracking updates."
              : "Studio updates regarding orders and new releases will be delivered here."}
          </p>
          {filter === "unread" && (
            <Button variant="secondary" onClick={() => setFilter("all")}>
              View All Notifications
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
