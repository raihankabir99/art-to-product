import {
  Menu,
  Search,
  Bell,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Shield,
  LogOut,
  ChevronDown,
  Globe,
  Radio,
} from "lucide-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";

interface AdminHeaderProps {
  onOpenMobileMenu: () => void;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  unreadNotificationsCount: number;
  activeSection: string;
  activeSub: string;
  onNavigate: (section: string, sub?: string) => void;
}

export function AdminHeader({
  onOpenMobileMenu,
  onOpenSearch,
  onOpenNotifications,
  unreadNotificationsCount,
  activeSection,
  activeSub,
  onNavigate,
}: AdminHeaderProps) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [currency, setCurrency] = useState("EUR (€)");

  const formatTitle = (str: string) => {
    if (!str) return "";
    return str
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  const sectionLabel = formatTitle(activeSection);
  const subLabel = formatTitle(activeSub);

  return (
    <header className="h-16 border-b border-border bg-surface/90 backdrop-blur-md sticky top-0 z-20 px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left Area: Mobile Menu + Breadcrumbs */}
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 text-muted-foreground hover:text-foreground border border-border bg-surface"
          aria-label="Open Navigation Menu"
        >
          <Menu className="size-4" />
        </button>

        {/* Dynamic Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs truncate">
          <button
            type="button"
            onClick={() => onNavigate("dashboard", "overview")}
            className="text-muted-foreground hover:text-gold transition-colors uppercase tracking-wider font-mono hidden sm:inline"
          >
            Atelier CMS
          </button>
          <ChevronRight className="size-3 text-muted-foreground hidden sm:inline" />
          <span className="font-display font-medium text-foreground uppercase tracking-wider">
            {sectionLabel || "Dashboard"}
          </span>
          {subLabel && subLabel !== "Overview" && (
            <>
              <ChevronRight className="size-3 text-muted-foreground" />
              <span className="text-gold font-medium truncate">{subLabel}</span>
            </>
          )}
        </div>
      </div>

      {/* Center/Right Area: Search + Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Global Search Button */}
        <button
          type="button"
          onClick={onOpenSearch}
          className="flex items-center gap-2 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground border border-border bg-surface hover:border-gold/40 transition-all rounded-none"
        >
          <Search className="size-3.5 text-gold" />
          <span className="hidden lg:inline text-xs">Search catalog, orders, CMS...</span>
          <span className="lg:hidden text-xs">Search</span>
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground border border-border bg-background">
            ⌘K
          </kbd>
        </button>

        {/* Live Network Pill */}
        <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/30 border border-emerald-500/20">
          <span className="size-1.5 bg-emerald-400 rounded-full animate-pulse" />
          <span>4 POD Nodes Live</span>
        </div>

        {/* Currency Switcher */}
        <div className="hidden sm:flex items-center border border-border bg-surface text-xs text-muted-foreground px-2 py-1">
          <Globe className="size-3 mr-1.5 text-gold" />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-transparent text-foreground text-xs focus:outline-none cursor-pointer"
          >
            <option value="EUR (€)" className="bg-surface text-foreground">
              EUR (€)
            </option>
            <option value="USD ($)" className="bg-surface text-foreground">
              USD ($)
            </option>
            <option value="GBP (£)" className="bg-surface text-foreground">
              GBP (£)
            </option>
            <option value="CHF" className="bg-surface text-foreground">
              CHF
            </option>
          </select>
        </div>

        {/* Notification Bell */}
        <button
          type="button"
          onClick={onOpenNotifications}
          className="relative p-2 text-muted-foreground hover:text-foreground border border-border bg-surface hover:border-gold/40 transition-colors"
          aria-label="View Notifications"
        >
          <Bell className="size-4" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute -top-1 -right-1 size-4 bg-gold text-background text-[10px] font-bold flex items-center justify-center rounded-full font-mono">
              {unreadNotificationsCount}
            </span>
          )}
        </button>

        {/* Preview Website Button */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 text-xs uppercase tracking-wider font-medium text-foreground bg-surface border border-border-strong hover:border-gold hover:text-gold transition-all"
        >
          <span>Preview Website</span>
          <ExternalLink className="size-3.5" />
        </a>

        {/* Admin Profile Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2 p-1.5 border border-border bg-surface hover:border-gold/50 transition-colors"
          >
            <div className="size-6 border border-gold/40 bg-gold/10 text-gold flex items-center justify-center font-display font-bold text-xs">
              LN
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-medium text-foreground leading-none">Laurent N.</p>
              <p className="text-[9px] uppercase font-mono text-gold leading-none mt-0.5">
                Director
              </p>
            </div>
            <ChevronDown className="size-3 text-muted-foreground hidden sm:inline" />
          </button>

          {profileDropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-56 bg-surface border border-border-strong shadow-2xl z-50 p-2 space-y-1 animate-fade-in-soft"
              onClick={() => setProfileDropdownOpen(false)}
            >
              <div className="p-2 border-b border-border">
                <p className="text-xs font-semibold text-foreground">Laurent Noir</p>
                <p className="text-[11px] text-muted-foreground truncate">
                  laurent@ateliernoir.com
                </p>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className="size-1.5 bg-emerald-400 rounded-full" />
                  <span className="text-[10px] uppercase font-mono text-gold">
                    Enterprise Administrator
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigate("settings", "general")}
                className="w-full flex items-center gap-2 p-2 text-xs text-left text-muted-foreground hover:text-foreground hover:bg-surface-2 transition-colors"
              >
                <Shield className="size-3.5 text-gold" />
                Store Settings & Security
              </button>

              <button
                type="button"
                onClick={() => onNavigate("settings", "users-roles")}
                className="w-full flex items-center gap-2 p-2 text-xs text-left text-muted-foreground hover:text-foreground hover:bg-surface-2 transition-colors"
              >
                <Sparkles className="size-3.5 text-gold" />
                Staff Roles & Permissions
              </button>

              <div className="pt-1 border-t border-border">
                <a
                  href="/account"
                  className="w-full flex items-center gap-2 p-2 text-xs text-left text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <LogOut className="size-3.5" />
                  Sign Out of Console
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
