import { useState, useEffect } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { AdminCommandPalette } from "./AdminCommandPalette";
import { AdminNotifications } from "./AdminNotifications";
import { QuickActionModals, type ModalType } from "./QuickActionModals";
import { DashboardOverview } from "./DashboardOverview";
import { CommerceSection } from "./CommerceSection";
import { CMSSection } from "./CMSSection";
import { MarketingSection } from "./MarketingSection";
import { AIAutomationSection } from "./AIAutomationSection";
import { AnalyticsSection } from "./AnalyticsSection";
import { SettingsSection } from "./SettingsSection";
import { INITIAL_NOTIFICATIONS } from "./admin-data";

export function AdminShell() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [activeSub, setActiveSub] = useState("overview");

  // Overlays
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collapsedTablet, setCollapsedTablet] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);

  // Sync with URL query or hash if needed
  const handleNavigate = (section: string, sub?: string) => {
    setActiveSection(section);
    setActiveSub(sub || "overview");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const unreadCount = INITIAL_NOTIFICATIONS.filter((n) => n.unread).length;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row antialiased selection:bg-gold/30 selection:text-foreground">
      {/* 1. Side Navigation Bar */}
      <AdminSidebar
        activeSection={activeSection}
        activeSub={activeSub}
        onNavigate={handleNavigate}
        isOpenMobile={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
        collapsedTablet={collapsedTablet}
        onToggleCollapse={() => setCollapsedTablet(!collapsedTablet)}
      />

      {/* 2. Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-background">
        {/* Top Header */}
        <AdminHeader
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onOpenSearch={() => setSearchOpen(true)}
          onOpenNotifications={() => setNotificationsOpen(true)}
          unreadNotificationsCount={unreadCount}
          activeSection={activeSection}
          activeSub={activeSub}
          onNavigate={handleNavigate}
        />

        {/* Dynamic Workspace Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeSection === "dashboard" && (
            <DashboardOverview
              onNavigate={handleNavigate}
              onOpenModal={(type) => setModalType(type)}
            />
          )}

          {activeSection === "commerce" && (
            <CommerceSection subSection={activeSub} onOpenModal={(type) => setModalType(type)} />
          )}

          {activeSection === "cms" && (
            <CMSSection subSection={activeSub} onOpenModal={(type) => setModalType(type)} />
          )}

          {activeSection === "marketing" && (
            <MarketingSection subSection={activeSub} onOpenModal={(type) => setModalType(type)} />
          )}

          {activeSection === "ai-automation" && <AIAutomationSection subSection={activeSub} />}

          {activeSection === "analytics" && <AnalyticsSection subSection={activeSub} />}

          {activeSection === "settings" && <SettingsSection subSection={activeSub} />}
        </main>
      </div>

      {/* 3. Global Command Palette (⌘K) */}
      <AdminCommandPalette
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* 4. Slide-in Notification Center */}
      <AdminNotifications
        open={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* 5. Quick Action Creation Modals */}
      <QuickActionModals modalType={modalType} onClose={() => setModalType(null)} />
    </div>
  );
}
