import { ChevronRight, ChevronDown, X, ExternalLink } from "lucide-react";
import { useState } from "react";
import { ADMIN_NAVIGATION, type NavSection } from "./admin-navigation";

interface AdminSidebarProps {
  activeSection: string;
  activeSub: string;
  onNavigate: (section: string, sub?: string) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  collapsedTablet: boolean;
  onToggleCollapse: () => void;
}

export function AdminSidebar({
  activeSection,
  activeSub,
  onNavigate,
  isOpenMobile,
  onCloseMobile,
  collapsedTablet,
  onToggleCollapse,
}: AdminSidebarProps) {
  // Collapsed sections within sidebar
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (groupId: string) => {
    setCollapsedGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const content = (
    <div className="flex flex-col h-full bg-surface border-r border-border select-none">
      {/* Brand Header */}
      <div className="h-16 px-5 border-b border-border flex items-center justify-between bg-background/40 shrink-0">
        <div className="flex items-center gap-3">
          <div className="size-8 border border-gold/40 bg-gold/10 flex items-center justify-center font-display font-bold text-gold text-sm tracking-tighter">
            AN
          </div>
          {(!collapsedTablet || isOpenMobile) && (
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-semibold tracking-tight text-foreground text-sm uppercase">
                  Atelier Noir
                </span>
                <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 bg-gold/10 text-gold border border-gold/30">
                  CMS
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground tracking-widest uppercase">
                Enterprise Suite
              </p>
            </div>
          )}
        </div>

        {/* Mobile close button */}
        {isOpenMobile && (
          <button
            type="button"
            onClick={onCloseMobile}
            className="md:hidden p-1.5 text-muted-foreground hover:text-foreground border border-border"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Navigation Groups List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin scrollbar-thumb-border">
        {ADMIN_NAVIGATION.map((section) => {
          const isGroupCollapsed = collapsedGroups[section.id];

          return (
            <div key={section.id} className="space-y-1">
              {/* Section Header */}
              {(!collapsedTablet || isOpenMobile) && (
                <button
                  type="button"
                  onClick={() => toggleGroup(section.id)}
                  className="w-full flex items-center justify-between px-2.5 py-1 text-[10px] uppercase font-semibold tracking-wider text-muted-foreground/70 hover:text-foreground transition-colors group"
                >
                  <span>{section.title}</span>
                  <ChevronDown
                    className={`size-3 text-muted-foreground transition-transform duration-200 ${
                      isGroupCollapsed ? "-rotate-90" : ""
                    }`}
                  />
                </button>
              )}

              {/* Items in section */}
              {!isGroupCollapsed && (
                <div className="space-y-0.5 mt-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      activeSection === section.id &&
                      (activeSub === item.id || (!activeSub && item.id === "overview"));

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          onNavigate(section.id, item.id);
                          if (isOpenMobile) onCloseMobile();
                        }}
                        title={item.label}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-xs transition-all duration-150 relative group ${
                          isActive
                            ? "bg-foreground text-background font-medium shadow-xs"
                            : "text-muted-foreground hover:text-foreground hover:bg-surface-2"
                        }`}
                      >
                        {/* Active Accent Border Indicator */}
                        {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold" />}

                        <Icon
                          className={`size-4 shrink-0 transition-colors ${
                            isActive
                              ? "text-background"
                              : "text-muted-foreground group-hover:text-gold"
                          }`}
                        />

                        {(!collapsedTablet || isOpenMobile) && (
                          <>
                            <span className="truncate flex-1 text-left">{item.label}</span>
                            {item.badge && (
                              <span
                                className={`text-[10px] font-mono px-1.5 py-0.2 shrink-0 ${
                                  isActive
                                    ? "bg-background text-foreground font-semibold"
                                    : "bg-surface-2 text-muted-foreground border border-border group-hover:border-gold/30 group-hover:text-gold"
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Profile & Store Preview */}
      <div className="p-3 border-t border-border bg-background/50 space-y-2 shrink-0">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-between px-3 py-2 text-xs text-muted-foreground hover:text-foreground border border-border hover:border-gold/50 bg-surface transition-all group"
        >
          <div className="flex items-center gap-2">
            <ExternalLink className="size-3.5 text-gold group-hover:translate-x-0.5 transition-transform" />
            {(!collapsedTablet || isOpenMobile) && <span>Live Storefront</span>}
          </div>
          {(!collapsedTablet || isOpenMobile) && (
            <span className="text-[10px] uppercase font-mono text-gold">200 OK</span>
          )}
        </a>

        {/* User Card */}
        {(!collapsedTablet || isOpenMobile) && (
          <div className="flex items-center gap-3 p-2 bg-surface border border-border">
            <div className="size-7 border border-gold/30 bg-gold/10 text-gold flex items-center justify-center font-display font-medium text-xs">
              LN
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-foreground truncate">Laurent Noir</p>
              <p className="text-[10px] text-muted-foreground truncate">Principal Director</p>
            </div>
            <span className="size-2 bg-emerald-500 rounded-full" title="Active" />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop/Tablet Sidebar */}
      <aside
        className={`hidden md:block h-screen sticky top-0 transition-all duration-300 z-30 shrink-0 ${
          collapsedTablet ? "w-16" : "w-64 lg:w-72"
        }`}
      >
        {content}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-xs animate-fade-in-soft"
            onClick={onCloseMobile}
          />
          <div className="relative z-10 w-72 max-w-[85vw] h-full animate-reveal-up">{content}</div>
        </div>
      )}
    </>
  );
}
