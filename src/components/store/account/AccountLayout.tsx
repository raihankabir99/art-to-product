import { useState, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Package,
  Truck,
  Heart,
  MapPin,
  User,
  Settings,
  Bell,
  LogOut,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/store/page";
import { useStore } from "@/components/store/store";
import { authService, type UserProfile } from "@/lib/services/auth-service";
import { ORDERS, ADDRESSES, NOTIFICATIONS, type Order, type Address } from "@/lib/account-data";
import { AccountOverview } from "./AccountOverview";
import { AccountOrders } from "./AccountOrders";
import { AccountWishlist } from "./AccountWishlist";
import { AccountAddresses } from "./AccountAddresses";
import { AccountProfile } from "./AccountProfile";
import { AccountSettings } from "./AccountSettings";
import { AccountNotifications } from "./AccountNotifications";
import { SignOutModal, DeleteAccountModal, OrderDetailModal } from "./AccountModals";
import { cn } from "@/lib/utils";

export type AccountTab =
  | "Overview"
  | "Orders"
  | "Track Order"
  | "Wishlist"
  | "Addresses"
  | "Profile"
  | "Settings"
  | "Notifications";

export function AccountLayout({
  initialTab = "Overview",
  initialOrderId,
}: {
  initialTab?: AccountTab;
  initialOrderId?: string;
}) {
  const { user, refreshUser, wishlist, format } = useStore();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<AccountTab>(initialTab);
  const [orders, setOrders] = useState<Order[]>(ORDERS);
  const [addresses, setAddresses] = useState<Address[]>(ADDRESSES);

  // Modals state
  const [signOutModalOpen, setSignOutModalOpen] = useState(false);
  const [deleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false);
  const [selectedOrderForDetail, setSelectedOrderForDetail] = useState<Order | null>(
    initialOrderId ? orders.find((o) => o.id === initialOrderId) || null : null,
  );

  // Mobile menu dropdown state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  useEffect(() => {
    if (initialOrderId) {
      const match = orders.find((o) => o.id === initialOrderId);
      if (match) setSelectedOrderForDetail(match);
    }
  }, [initialOrderId, orders]);

  if (!user) {
    return null;
  }

  const handleSignOut = async () => {
    setSignOutModalOpen(false);
    await authService.signOut();
    await refreshUser();
    toast.success("Signed out successfully.");
    navigate({ to: "/login" });
  };

  const handleDeleteAccount = async () => {
    setDeleteAccountModalOpen(false);
    await authService.signOut();
    await refreshUser();
    toast.success("Account deleted. We hope to welcome you back soon.");
    navigate({ to: "/" });
  };

  const navItems = [
    { id: "Overview" as AccountTab, label: "Overview", icon: LayoutDashboard },
    {
      id: "Orders" as AccountTab,
      label: "Orders",
      icon: Package,
      badge: orders.length > 0 ? orders.length : undefined,
    },
    { id: "Track Order" as AccountTab, label: "Track Order", icon: Truck },
    {
      id: "Wishlist" as AccountTab,
      label: "Wishlist",
      icon: Heart,
      badge: wishlist.length > 0 ? wishlist.length : undefined,
    },
    {
      id: "Addresses" as AccountTab,
      label: "Addresses",
      icon: MapPin,
      badge: addresses.length > 0 ? addresses.length : undefined,
    },
    {
      id: "Notifications" as AccountTab,
      label: "Notifications",
      icon: Bell,
      badge: NOTIFICATIONS.filter((n) => n.unread).length || undefined,
    },
    { id: "Profile" as AccountTab, label: "Profile", icon: User },
    { id: "Settings" as AccountTab, label: "Account Settings", icon: Settings },
  ];

  const displayName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") || user.email.split("@")[0];

  return (
    <>
      <PageHero
        eyebrow="Customer Account"
        title={`Welcome back, ${displayName}`}
        intro="Manage your bespoke orders, curated wishlist, delivery addresses, and studio preferences."
        trail={[{ label: "Account" }]}
      />

      <section className="section container-page">
        {/* Mobile Navigation Dropdown */}
        <div className="mb-6 lg:hidden">
          <label className="text-label text-xs uppercase tracking-wider text-muted-foreground block mb-2">
            Account Navigation
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-12 w-full items-center justify-between border border-border bg-surface px-4 text-body-sm font-medium"
            >
              <span className="flex items-center gap-2.5">
                {navItems.find((n) => n.id === activeTab)?.label}
              </span>
              <ChevronDown
                className={cn("size-4 transition-transform", mobileMenuOpen && "rotate-180")}
              />
            </button>

            {mobileMenuOpen && (
              <div className="absolute top-full z-20 mt-1 w-full border border-border bg-surface shadow-xl">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isSelected = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        if (item.id === "Track Order") {
                          navigate({ to: "/orders" });
                        } else {
                          setActiveTab(item.id);
                        }
                        setMobileMenuOpen(false);
                      }}
                      className={cn(
                        "flex h-12 w-full items-center justify-between px-4 text-left text-body-sm transition-colors border-b border-border/40 last:border-0",
                        isSelected
                          ? "bg-foreground text-background font-medium"
                          : "text-muted-foreground hover:bg-surface-2 hover:text-foreground",
                      )}
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon className="size-4" /> {item.label}
                      </span>
                      {item.badge !== undefined && (
                        <span
                          className={cn(
                            "text-xs px-2 py-0.5 rounded-sm font-mono",
                            isSelected
                              ? "bg-background/20 text-background"
                              : "bg-surface-2 text-foreground",
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Desktop Layout Grid */}
        <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)]">
          {/* Desktop Left-Side Sidebar */}
          <aside className="hidden lg:block space-y-6">
            <div className="border border-border bg-surface p-4">
              {/* User Card */}
              <div className="flex items-center gap-3 border-b border-border pb-4 mb-4">
                <div className="grid size-11 shrink-0 place-items-center border border-gold bg-surface-2 font-mono font-semibold text-gold text-sm">
                  {user.firstName?.charAt(0) || user.email.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-h4 text-sm font-medium truncate">{displayName}</p>
                  <p className="text-meta text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
              </div>

              {/* Navigation List */}
              <nav className="space-y-1" aria-label="Account Navigation">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isSelected = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        if (item.id === "Track Order") {
                          navigate({ to: "/orders" });
                        } else {
                          setActiveTab(item.id);
                        }
                      }}
                      className={cn(
                        "flex h-11 w-full items-center justify-between px-3 text-left text-body-sm transition-all border",
                        isSelected
                          ? "border-gold bg-gold/10 text-foreground font-medium"
                          : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
                      )}
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon
                          className={cn(
                            "size-4",
                            isSelected ? "text-gold" : "text-muted-foreground",
                          )}
                        />
                        {item.label}
                      </span>
                      {item.badge !== undefined && (
                        <span
                          className={cn(
                            "text-xs px-2 py-0.5 font-mono",
                            isSelected
                              ? "bg-gold text-background font-semibold"
                              : "bg-surface-2 text-muted-foreground",
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Sign Out CTA */}
              <div className="mt-6 border-t border-border pt-4">
                <button
                  type="button"
                  onClick={() => setSignOutModalOpen(true)}
                  className="flex h-10 w-full items-center gap-2.5 px-3 text-left text-body-sm text-muted-foreground transition-colors hover:text-foreground link-underline"
                >
                  <LogOut className="size-4" />
                  Sign Out
                </button>
              </div>
            </div>

            {/* Quick Assistance Box */}
            <div className="border border-border bg-surface-2/40 p-4 space-y-2 text-xs">
              <p className="text-label uppercase tracking-wider text-gold text-[10px]">
                Studio Help
              </p>
              <p className="text-muted-foreground">
                Need bespoke support for an existing order or customized canvas?
              </p>
              <div className="pt-2 flex flex-col gap-1.5">
                <Link to="/contact" className="hover:text-gold transition-colors font-medium">
                  → Contact Concierge
                </Link>
                <Link to="/faq" className="hover:text-gold transition-colors font-medium">
                  → Shipping & Returns FAQ
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Account Area */}
          <main className="min-w-0">
            {activeTab === "Overview" && (
              <AccountOverview
                user={user}
                orders={orders}
                wishlistCount={wishlist.length}
                addressCount={addresses.length}
                format={format}
                onSelectTab={(tab) => {
                  if (tab === "Track Order") navigate({ to: "/orders" });
                  else setActiveTab(tab as AccountTab);
                }}
                onViewOrder={(order) => setSelectedOrderForDetail(order)}
              />
            )}

            {activeTab === "Orders" && (
              <AccountOrders
                orders={orders}
                format={format}
                onViewOrder={(order) => setSelectedOrderForDetail(order)}
              />
            )}

            {activeTab === "Wishlist" && <AccountWishlist />}

            {activeTab === "Addresses" && (
              <AccountAddresses addresses={addresses} setAddresses={setAddresses} />
            )}

            {activeTab === "Profile" && <AccountProfile user={user} onUserUpdated={refreshUser} />}

            {activeTab === "Notifications" && (
              <AccountNotifications
                onViewOrder={(orderId) => {
                  const match = orders.find((o) => o.id === orderId);
                  if (match) setSelectedOrderForDetail(match);
                }}
              />
            )}

            {activeTab === "Settings" && (
              <AccountSettings
                onSignOutRequest={() => setSignOutModalOpen(true)}
                onDeleteAccountRequest={() => setDeleteAccountModalOpen(true)}
              />
            )}
          </main>
        </div>
      </section>

      {/* Sign Out Modal */}
      <SignOutModal
        open={signOutModalOpen}
        onClose={() => setSignOutModalOpen(false)}
        onConfirm={handleSignOut}
      />

      {/* Delete Account Modal */}
      <DeleteAccountModal
        open={deleteAccountModalOpen}
        onClose={() => setDeleteAccountModalOpen(false)}
        onConfirm={handleDeleteAccount}
      />

      {/* Order Detail Modal */}
      <OrderDetailModal
        order={selectedOrderForDetail}
        open={!!selectedOrderForDetail}
        onClose={() => setSelectedOrderForDetail(null)}
        format={format}
      />
    </>
  );
}
