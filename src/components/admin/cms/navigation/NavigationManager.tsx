import { useState } from "react";
import {
  Menu as MenuIcon,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Eye,
  EyeOff,
  Save,
  Grid,
  Columns,
  Sparkles,
  Smartphone,
  Monitor,
  PanelBottom,
  Check,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";
import type { NavItem, MegaMenuColumn } from "../pages-types";
import { INITIAL_HEADER_NAV } from "../pages-initial-data";

export function NavigationManager() {
  const [navItems, setNavItems] = useState<NavItem[]>(INITIAL_HEADER_NAV);
  const [activeTab, setActiveTab] = useState<"desktop" | "mega" | "mobile">("desktop");
  const [selectedMegaNavId, setSelectedMegaNavId] = useState<string>("nav_shop");

  const selectedMegaNav = navItems.find((n) => n.id === selectedMegaNavId);

  const handleSave = () => {
    toast.success("Navigation configuration published live", {
      description: "Storefront header and mobile drawers synced across global edge CDNs.",
    });
  };

  const handleAddItem = () => {
    const newItem: NavItem = {
      id: `nav_${Date.now()}`,
      label: "NEW MENU ITEM",
      url: "/shop",
      visible: true,
    };
    setNavItems((prev) => [...prev, newItem]);
    toast.success("Menu item added to header navigation");
  };

  const handleMoveItem = (index: number, direction: "up" | "down") => {
    const newItems = [...navItems];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newItems.length) return;
    const temp = newItems[index];
    newItems[index] = newItems[targetIdx];
    newItems[targetIdx] = temp;
    setNavItems(newItems);
  };

  const handleToggleVisible = (id: string) => {
    setNavItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, visible: !item.visible } : item)),
    );
  };

  const handleDeleteItem = (id: string) => {
    setNavItems((prev) => prev.filter((item) => item.id !== id));
    toast.info("Menu item removed");
  };

  const handleUpdateItem = (id: string, updates: Partial<NavItem>) => {
    setNavItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  return (
    <div className="space-y-6 animate-fade-in-soft">
      {/* ================= HEADER CONTROL BAR ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-surface border border-border">
        <div>
          <div className="flex items-center gap-2">
            <MenuIcon className="size-5 text-gold" />
            <h2 className="text-xl font-display font-medium text-foreground uppercase tracking-wider">
              Navigation & Mega Menu Studio
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Configure desktop header routes, multi-column mega menus, and mobile drawer hierarchies.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gold text-background text-xs uppercase tracking-wider font-semibold hover:bg-foreground hover:text-background transition-colors shrink-0"
        >
          <Save className="size-4" /> Publish Navigation
        </button>
      </div>

      {/* ================= TABS ================= */}
      <div className="flex items-center gap-1 bg-surface p-1 border border-border">
        <button
          type="button"
          onClick={() => setActiveTab("desktop")}
          className={`flex-1 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 ${
            activeTab === "desktop"
              ? "bg-gold text-background font-bold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Monitor className="size-4" /> Desktop Navigation
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("mega")}
          className={`flex-1 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 ${
            activeTab === "mega"
              ? "bg-gold text-background font-bold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Columns className="size-4" /> Mega Menu Builder
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("mobile")}
          className={`flex-1 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 ${
            activeTab === "mobile"
              ? "bg-gold text-background font-bold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Smartphone className="size-4" /> Mobile Drawer
        </button>
      </div>

      {/* ================= DESKTOP NAVIGATION TAB ================= */}
      {activeTab === "desktop" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-surface border border-border">
            <span className="text-xs font-mono uppercase text-muted-foreground">
              Header Item Reordering & Route Mapping
            </span>
            <button
              type="button"
              onClick={handleAddItem}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-2 text-foreground text-xs font-mono border border-border hover:border-gold transition-colors"
            >
              <Plus className="size-3.5" /> Add Menu Item
            </button>
          </div>

          <div className="bg-surface border border-border overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border text-muted-foreground uppercase text-[10px] tracking-wider font-mono bg-surface-2/40">
                  <th className="p-3.5">Reorder</th>
                  <th className="p-3.5">Label</th>
                  <th className="p-3.5">URL / Route</th>
                  <th className="p-3.5">Badge Tag</th>
                  <th className="p-3.5">Type</th>
                  <th className="p-3.5">Visibility</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {navItems.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-surface-2/70 transition-colors">
                    <td className="p-3.5">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleMoveItem(idx, "up")}
                          disabled={idx === 0}
                          className="p-1 hover:text-gold text-muted-foreground disabled:opacity-30"
                        >
                          <MoveUp className="size-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveItem(idx, "down")}
                          disabled={idx === navItems.length - 1}
                          className="p-1 hover:text-gold text-muted-foreground disabled:opacity-30"
                        >
                          <MoveDown className="size-3.5" />
                        </button>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <input
                        type="text"
                        value={item.label}
                        onChange={(e) => handleUpdateItem(item.id, { label: e.target.value })}
                        className="px-2.5 py-1 bg-surface-2 border border-border text-xs text-foreground font-semibold focus:outline-none focus:border-gold uppercase tracking-wider"
                      />
                    </td>

                    <td className="p-3.5">
                      <input
                        type="text"
                        value={item.url}
                        onChange={(e) => handleUpdateItem(item.id, { url: e.target.value })}
                        className="px-2.5 py-1 bg-surface-2 border border-border text-xs font-mono text-gold focus:outline-none focus:border-gold"
                      />
                    </td>

                    <td className="p-3.5">
                      <input
                        type="text"
                        placeholder="None"
                        value={item.badge || ""}
                        onChange={(e) => handleUpdateItem(item.id, { badge: e.target.value })}
                        className="px-2 py-1 bg-surface-2 border border-border text-[11px] font-mono text-foreground focus:outline-none focus:border-gold w-20"
                      />
                    </td>

                    <td className="p-3.5">
                      <button
                        type="button"
                        onClick={() => handleUpdateItem(item.id, { isMegaMenu: !item.isMegaMenu })}
                        className={`px-2.5 py-1 text-[10px] font-mono border transition-colors ${
                          item.isMegaMenu
                            ? "bg-gold/10 text-gold border-gold/40"
                            : "bg-surface-2 text-muted-foreground border-border"
                        }`}
                      >
                        {item.isMegaMenu ? "MEGA MENU" : "Standard Link"}
                      </button>
                    </td>

                    <td className="p-3.5">
                      <button
                        type="button"
                        onClick={() => handleToggleVisible(item.id)}
                        className={`p-1.5 border transition-colors ${
                          item.visible
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : "bg-surface-2 text-muted-foreground border-border"
                        }`}
                      >
                        {item.visible ? (
                          <Eye className="size-3.5" />
                        ) : (
                          <EyeOff className="size-3.5" />
                        )}
                      </button>
                    </td>

                    <td className="p-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-1.5 text-muted-foreground hover:text-red-400 border border-border"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= MEGA MENU BUILDER TAB ================= */}
      {activeTab === "mega" && (
        <div className="space-y-6">
          <div className="p-4 bg-surface border border-border flex items-center gap-3">
            <span className="text-xs font-mono uppercase text-muted-foreground">
              Select Mega Menu Header Item:
            </span>
            <select
              value={selectedMegaNavId}
              onChange={(e) => setSelectedMegaNavId(e.target.value)}
              className="px-3 py-1.5 bg-surface-2 border border-border text-xs text-foreground font-mono focus:outline-none focus:border-gold"
            >
              {navItems.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.label} {n.isMegaMenu ? "(Mega Menu Configured)" : ""}
                </option>
              ))}
            </select>
          </div>

          {selectedMegaNav && selectedMegaNav.megaMenu ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Columns Editor */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between p-4 bg-surface border border-border">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
                    Mega Menu Layout Columns ({selectedMegaNav.megaMenu.columns.length})
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedMegaNav.megaMenu.columns.map((col) => (
                    <div key={col.id} className="p-4 bg-surface border border-border space-y-3">
                      <div className="border-b border-border pb-2">
                        <span className="text-[10px] font-mono text-gold uppercase block">
                          Column Title
                        </span>
                        <p className="text-xs font-bold text-foreground uppercase tracking-wider">
                          {col.title}
                        </p>
                      </div>

                      <div className="space-y-1.5">
                        <span className="text-[10px] font-mono text-muted-foreground uppercase">
                          Column Links
                        </span>
                        {col.links.map((lnk) => (
                          <div
                            key={lnk.id}
                            className="p-2 bg-surface-2 border border-border text-xs flex items-center justify-between"
                          >
                            <span className="text-foreground truncate">{lnk.label}</span>
                            {lnk.badge && (
                              <span className="text-[9px] font-mono text-gold bg-gold/10 px-1 border border-gold/30">
                                {lnk.badge}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Showcase Card Editor */}
              <div className="p-5 bg-surface border border-border space-y-4">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground border-b border-border pb-2">
                  Featured Card Showcase
                </h3>

                <div>
                  <label className="text-[11px] font-mono uppercase text-muted-foreground block mb-1">
                    Featured Image URL
                  </label>
                  <input
                    type="text"
                    value={selectedMegaNav.megaMenu.featuredImage || ""}
                    className="w-full px-3 py-2 bg-surface-2 border border-border text-xs font-mono text-foreground focus:outline-none"
                    readOnly
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-muted-foreground block mb-1">
                    Featured Title
                  </label>
                  <input
                    type="text"
                    value={selectedMegaNav.megaMenu.featuredTitle || ""}
                    className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
                    readOnly
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-muted-foreground block mb-1">
                    CTA Button Label
                  </label>
                  <input
                    type="text"
                    value={selectedMegaNav.megaMenu.featuredCtaLabel || ""}
                    className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
                    readOnly
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center border border-dashed border-border space-y-3 bg-surface">
              <Columns className="size-8 text-gold mx-auto" />
              <p className="text-sm font-display text-foreground uppercase tracking-wider">
                No Mega Menu Configured
              </p>
              <p className="text-xs text-muted-foreground">
                Toggle "MEGA MENU" on this item in the Desktop Navigation tab to enable columns and
                card showcases.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ================= MOBILE DRAWER TAB ================= */}
      {activeTab === "mobile" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 bg-surface border border-border space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground border-b border-border pb-2">
              Mobile Drawer Configuration
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Mobile navigation utilizes nested accordion sections with comfortable 44px+ touch
              targets and quick-access customer concierge CTAs.
            </p>

            <div className="space-y-2">
              {navItems
                .filter((n) => n.visible)
                .map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-surface-2 border border-border text-xs flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-semibold uppercase tracking-wider text-foreground">
                        {item.label}
                      </span>
                      {item.badge && (
                        <span className="text-[9px] font-mono text-gold bg-gold/10 px-1 border border-gold/30">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground">{item.url}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Phone Frame Live Preview */}
          <div className="p-6 bg-surface border border-border flex justify-center items-center">
            <div className="w-[320px] h-[520px] bg-black border-4 border-surface-2 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
              <div className="p-3 bg-surface border-b border-border flex items-center justify-between text-[11px] font-mono">
                <span className="text-gold font-bold">STUDIO NOIR</span>
                <span className="text-muted-foreground">✕ Close</span>
              </div>
              <div className="p-4 space-y-3 flex-1 overflow-y-auto">
                {navItems
                  .filter((n) => n.visible)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-surface-2 border border-border flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-foreground"
                    >
                      <span>{item.label}</span>
                      {item.isMegaMenu && <ChevronDown className="size-3.5 text-gold" />}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
