import { useState } from "react";
import { Bell, Check, ShoppingBag, Cpu, AlertTriangle, Database, Trash2 } from "lucide-react";
import { INITIAL_NOTIFICATIONS, type NotificationItem } from "./admin-data";

interface AdminNotificationsProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (section: string, sub?: string) => void;
}

export function AdminNotifications({ open, onClose, onNavigate }: AdminNotificationsProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const toggleItem = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, unread: !n.unread } : n)));
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[90] flex justify-end"
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" />
      <div
        className="relative z-10 w-full max-w-sm sm:max-w-md h-full bg-surface border-l border-border shadow-2xl flex flex-col animate-reveal-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between bg-background/50">
          <div className="flex items-center gap-2">
            <Bell className="size-4 text-gold" />
            <h3 className="text-sm uppercase tracking-wider font-display font-medium text-foreground">
              Notifications & Alerts
            </h3>
            {unreadCount > 0 && (
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-gold/10 text-gold border border-gold/30">
                {unreadCount} new
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs">
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllRead}
                className="text-muted-foreground hover:text-gold transition-colors text-[11px] underline"
              >
                Mark all read
              </button>
            )}
            <button
              type="button"
              onClick={clearAll}
              title="Clear all"
              className="text-muted-foreground hover:text-destructive p-1"
            >
              <Trash2 className="size-3.5" />
            </button>
          </div>
        </div>

        {/* Notifications list */}
        <div className="flex-1 overflow-y-auto divide-y divide-border/60">
          {notifications.length === 0 ? (
            <div className="py-16 text-center text-muted-foreground px-4">
              <Check className="size-8 text-gold/50 mx-auto mb-3" />
              <p className="text-sm font-medium text-foreground">All systems clear</p>
              <p className="text-xs mt-1 text-muted-foreground">
                No unread alerts or fulfillment incidents pending.
              </p>
            </div>
          ) : (
            notifications.map((item) => {
              const iconMap = {
                order: ShoppingBag,
                pod: Cpu,
                stock: AlertTriangle,
                system: Database,
              };
              const Icon = iconMap[item.type] || Bell;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    toggleItem(item.id);
                    if (item.type === "order") onNavigate("commerce", "orders");
                    if (item.type === "pod") onNavigate("analytics", "pod");
                    if (item.type === "stock") onNavigate("commerce", "products");
                    onClose();
                  }}
                  className={`p-4 hover:bg-surface-2 transition-colors cursor-pointer relative ${
                    item.unread ? "bg-gold/5" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 border shrink-0 mt-0.5 ${
                        item.type === "stock"
                          ? "border-amber-500/40 bg-amber-500/10 text-amber-400"
                          : item.type === "pod"
                            ? "border-gold/40 bg-gold/10 text-gold"
                            : "border-border bg-surface text-foreground"
                      }`}
                    >
                      <Icon className="size-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p
                          className={`text-xs font-medium truncate ${
                            item.unread ? "text-foreground font-semibold" : "text-muted-foreground"
                          }`}
                        >
                          {item.title}
                        </p>
                        <span className="text-[10px] text-muted-foreground shrink-0 font-mono">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        {item.message}
                      </p>
                    </div>
                  </div>
                  {item.unread && (
                    <span className="absolute top-4 right-3 size-1.5 bg-gold rounded-full" />
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-border bg-background text-center">
          <button
            type="button"
            onClick={() => {
              onNavigate("settings", "audit");
              onClose();
            }}
            className="text-xs uppercase tracking-wider text-muted-foreground hover:text-gold transition-colors"
          >
            View Complete Audit Ledger →
          </button>
        </div>
      </div>
    </div>
  );
}
