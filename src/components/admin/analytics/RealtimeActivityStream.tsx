import { useState, useEffect } from "react";
import {
  Activity,
  CreditCard,
  ShoppingCart,
  Users,
  Eye,
  Cpu,
  Truck,
  Star,
  CheckCircle2,
  Clock,
  Filter,
  Radio,
} from "lucide-react";
import { REALTIME_ACTIVITY_FEED } from "./analytics-mock-data";
import type { RealtimeEvent } from "./types";

export function RealtimeActivityStream() {
  const [events, setEvents] = useState<RealtimeEvent[]>(REALTIME_ACTIVITY_FEED);
  const [filterType, setFilterType] = useState<string>("All");
  const [isLive, setIsLive] = useState(true);

  // Periodic pulse simulator
  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      const newItems: RealtimeEvent[] = [
        {
          id: `rt-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          timeAgo: "Just now",
          event: "Product Viewed",
          source: "Munich, DE • Direct",
          status: "info",
          details: "Viewing Midnight Lion Heavyweight Organic Tee (M)",
        },
      ];
      setEvents((prev) => [newItems[0], ...prev.slice(0, 19)]);
    }, 12000);
    return () => clearInterval(interval);
  }, [isLive]);

  const getEventIcon = (event: RealtimeEvent["event"]) => {
    switch (event) {
      case "Payment Completed":
      case "New Order":
        return CreditCard;
      case "New Customer":
        return Users;
      case "Cart Created":
        return ShoppingCart;
      case "Product Viewed":
        return Eye;
      case "POD Submitted":
        return Cpu;
      case "Order Shipped":
        return Truck;
      case "Review Added":
        return Star;
      default:
        return Activity;
    }
  };

  const filteredEvents = events.filter((ev) => {
    if (filterType === "All") return true;
    if (filterType === "Orders")
      return ev.event === "New Order" || ev.event === "Payment Completed";
    if (filterType === "POD") return ev.event === "POD Submitted" || ev.event === "Order Shipped";
    if (filterType === "Browsing")
      return ev.event === "Product Viewed" || ev.event === "Cart Created";
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in-soft">
      {/* Top Telemetry Ribbon */}
      <div className="p-6 bg-surface border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="relative flex size-2.5">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isLive ? "bg-emerald-400" : "bg-zinc-400"}`}
              />
              <span
                className={`relative inline-flex rounded-full size-2.5 ${isLive ? "bg-emerald-500" : "bg-zinc-500"}`}
              />
            </div>
            <h2 className="text-sm font-display font-medium text-foreground uppercase tracking-wider">
              Live Ingress Telemetry Stream
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Real-time event pulse streaming transactions, print queue handshakes, and shopper
            interactions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-surface-2 p-0.5 border border-border text-xs font-mono">
            <button
              onClick={() => setFilterType("All")}
              className={`px-2.5 py-1 uppercase ${filterType === "All" ? "bg-gold text-black font-semibold" : "text-muted-foreground"}`}
            >
              All Events
            </button>
            <button
              onClick={() => setFilterType("Orders")}
              className={`px-2.5 py-1 uppercase ${filterType === "Orders" ? "bg-gold text-black font-semibold" : "text-muted-foreground"}`}
            >
              Orders
            </button>
            <button
              onClick={() => setFilterType("POD")}
              className={`px-2.5 py-1 uppercase ${filterType === "POD" ? "bg-gold text-black font-semibold" : "text-muted-foreground"}`}
            >
              POD & Ship
            </button>
            <button
              onClick={() => setFilterType("Browsing")}
              className={`px-2.5 py-1 uppercase ${filterType === "Browsing" ? "bg-gold text-black font-semibold" : "text-muted-foreground"}`}
            >
              Browsing
            </button>
          </div>

          <button
            onClick={() => setIsLive(!isLive)}
            className={`px-3 py-1 text-xs font-mono uppercase border ${
              isLive
                ? "border-emerald-500/40 text-emerald-400 bg-emerald-500/10"
                : "border-border text-muted-foreground bg-surface-2"
            }`}
          >
            {isLive ? "Stream Active" : "Paused"}
          </button>
        </div>
      </div>

      {/* Event Stream List */}
      <div className="bg-surface border border-border divide-y divide-border font-mono text-xs">
        {filteredEvents.map((ev) => {
          const Icon = getEventIcon(ev.event);
          return (
            <div
              key={ev.id}
              className="p-4 hover:bg-surface-2/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 border flex-shrink-0 ${
                    ev.event === "Payment Completed" || ev.event === "New Order"
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                      : ev.event === "POD Submitted" || ev.event === "Order Shipped"
                        ? "bg-gold/10 border-gold/30 text-gold"
                        : "bg-surface-2 border-border text-muted-foreground"
                  }`}
                >
                  <Icon className="size-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">{ev.event}</span>
                    {ev.amount && (
                      <span className="text-emerald-400 font-bold">€{ev.amount.toFixed(2)}</span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-[11px] mt-0.5">{ev.details}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-muted-foreground text-[11px] sm:text-right">
                <span className="truncate max-w-[200px]">{ev.source}</span>
                <span className="font-semibold text-foreground whitespace-nowrap">
                  {ev.timestamp}
                </span>
                <span className="text-[10px] text-gold w-16">{ev.timeAgo}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
