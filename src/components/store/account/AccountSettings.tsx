import { useState } from "react";
import { Lock, Bell, Globe, Shield, LogOut, Trash2, Check, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/store/ui";
import { useStore } from "@/components/store/store";
import { type Currency, type Region } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export function AccountSettings({
  onSignOutRequest,
  onDeleteAccountRequest,
}: {
  onSignOutRequest: () => void;
  onDeleteAccountRequest: () => void;
}) {
  const { region, setRegion, currency, setCurrency } = useStore();

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // Notifications State
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [productionAlerts, setProductionAlerts] = useState(true);
  const [collectorNews, setCollectorNews] = useState(false);
  const [studioDrops, setStudioDrops] = useState(true);

  // Privacy State
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [personalizationEnabled, setPersonalizationEnabled] = useState(true);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      toast.error("Please enter your current password.");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    setIsUpdatingPassword(true);
    setTimeout(() => {
      setIsUpdatingPassword(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Security password updated successfully.");
    }, 600);
  };

  return (
    <div className="space-y-12 max-w-4xl">
      {/* Header */}
      <div className="border-b border-border pb-6">
        <h2 className="text-h3 font-medium">Account Settings</h2>
        <p className="text-meta text-muted-foreground mt-1">
          Security, currency preferences, notification thresholds, and privacy controls.
        </p>
      </div>

      {/* 1. PASSWORD & SECURITY */}
      <section className="border border-border bg-surface p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <Lock className="size-5 text-gold" />
          <div>
            <h3 className="text-h4 font-medium">Password & Security</h3>
            <p className="text-meta text-muted-foreground text-xs">
              Keep your studio account secure with a unique passphrase.
            </p>
          </div>
        </div>

        <form onSubmit={handlePasswordSubmit} className="space-y-5">
          <Field
            label="Current Password"
            type="password"
            placeholder="••••••••"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="New Password"
              type="password"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <Field
              label="Confirm New Password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="bg-surface-2 p-3 text-xs text-muted-foreground space-y-1 border border-border">
            <p className="font-medium text-foreground">Password requirements:</p>
            <p
              className={cn(
                "flex items-center gap-1.5",
                newPassword.length >= 8 ? "text-gold" : "",
              )}
            >
              <Check className="size-3" /> At least 8 characters
            </p>
            <p
              className={cn(
                "flex items-center gap-1.5",
                /[0-9]/.test(newPassword) ? "text-gold" : "",
              )}
            >
              <Check className="size-3" /> Includes at least one number or symbol
            </p>
          </div>

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              disabled={isUpdatingPassword}
              className="uppercase tracking-wider text-xs px-5"
            >
              {isUpdatingPassword ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </form>
      </section>

      {/* 2. REGIONAL & CURRENCY PREFERENCES */}
      <section className="border border-border bg-surface p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <Globe className="size-5 text-gold" />
          <div>
            <h3 className="text-h4 font-medium">Regional & Currency Preferences</h3>
            <p className="text-meta text-muted-foreground text-xs">
              Configure your default pricing display and studio locale.
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="text-label text-xs uppercase tracking-wider text-muted-foreground block mb-2">
              Currency
            </label>
            <select
              value={currency}
              onChange={(e) => {
                setCurrency(e.target.value as Currency);
                toast.success(`Currency set to ${e.target.value}`);
              }}
              className="text-body-sm h-12 w-full border border-border bg-surface px-4 focus-visible:border-foreground"
            >
              <option value="EUR">EUR (€) — Euro (Default)</option>
              <option value="USD">USD ($) — US Dollar</option>
              <option value="GBP">GBP (£) — British Pound</option>
              <option value="JPY">JPY (¥) — Japanese Yen</option>
              <option value="CAD">CAD ($) — Canadian Dollar</option>
              <option value="AUD">AUD ($) — Australian Dollar</option>
            </select>
          </div>

          <div>
            <label className="text-label text-xs uppercase tracking-wider text-muted-foreground block mb-2">
              Regional Delivery Zone
            </label>
            <select
              value={region}
              onChange={(e) => {
                setRegion(e.target.value as Region);
                toast.success(`Shipping region set to ${e.target.value}`);
              }}
              className="text-body-sm h-12 w-full border border-border bg-surface px-4 focus-visible:border-foreground"
            >
              <option value="EU">European Union (Amsterdam Studio)</option>
              <option value="US">United States (Domestic POD)</option>
              <option value="UK">United Kingdom (London Hub)</option>
              <option value="Global">Rest of World (DHL Express)</option>
            </select>
          </div>
        </div>
      </section>

      {/* 3. COMMUNICATION & NOTIFICATIONS */}
      <section className="border border-border bg-surface p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <Bell className="size-5 text-gold" />
          <div>
            <h3 className="text-h4 font-medium">Communication & Notifications</h3>
            <p className="text-meta text-muted-foreground text-xs">
              Choose the channels and frequencies for updates from the atelier.
            </p>
          </div>
        </div>

        <div className="space-y-4 divide-y divide-border">
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-body-sm font-medium">Order Status & Courier Tracking</p>
              <p className="text-meta text-muted-foreground text-xs">
                Real-time email alerts when your order enters printing, ships, and arrives.
              </p>
            </div>
            <input
              type="checkbox"
              checked={orderUpdates}
              onChange={(e) => {
                setOrderUpdates(e.target.checked);
                toast.success("Notification preferences updated.");
              }}
              className="size-5 accent-gold cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            <div>
              <p className="text-body-sm font-medium">Production & Quality Reports</p>
              <p className="text-meta text-muted-foreground text-xs">
                Notifications regarding studio pigment test checks and packaging timestamps.
              </p>
            </div>
            <input
              type="checkbox"
              checked={productionAlerts}
              onChange={(e) => {
                setProductionAlerts(e.target.checked);
                toast.success("Notification preferences updated.");
              }}
              className="size-5 accent-gold cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            <div>
              <p className="text-body-sm font-medium">Exclusive Studio Drops</p>
              <p className="text-meta text-muted-foreground text-xs">
                Early access invitations to limited edition design releases (max 1/month).
              </p>
            </div>
            <input
              type="checkbox"
              checked={studioDrops}
              onChange={(e) => {
                setStudioDrops(e.target.checked);
                toast.success("Notification preferences updated.");
              }}
              className="size-5 accent-gold cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            <div>
              <p className="text-body-sm font-medium">Collector Editorial & Stories</p>
              <p className="text-meta text-muted-foreground text-xs">
                Behind-the-scenes essays on typography, architecture, and print craft.
              </p>
            </div>
            <input
              type="checkbox"
              checked={collectorNews}
              onChange={(e) => {
                setCollectorNews(e.target.checked);
                toast.success("Notification preferences updated.");
              }}
              className="size-5 accent-gold cursor-pointer"
            />
          </div>
        </div>
      </section>

      {/* 4. PRIVACY & DATA PREFERENCES */}
      <section className="border border-border bg-surface p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <Shield className="size-5 text-gold" />
          <div>
            <h3 className="text-h4 font-medium">Privacy & Data Governance</h3>
            <p className="text-meta text-muted-foreground text-xs">
              GDPR-compliant controls for tracking and session management.
            </p>
          </div>
        </div>

        <div className="space-y-4 divide-y divide-border">
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-body-sm font-medium">Anonymous Usage Analytics</p>
              <p className="text-meta text-muted-foreground text-xs">
                Helps us optimize mockup rendering and site performance.
              </p>
            </div>
            <input
              type="checkbox"
              checked={analyticsEnabled}
              onChange={(e) => {
                setAnalyticsEnabled(e.target.checked);
                toast.success("Privacy preferences updated.");
              }}
              className="size-5 accent-gold cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            <div>
              <p className="text-body-sm font-medium">Personalized Design Recommendations</p>
              <p className="text-meta text-muted-foreground text-xs">
                Tailors gallery views based on your wishlist and browsing history.
              </p>
            </div>
            <input
              type="checkbox"
              checked={personalizationEnabled}
              onChange={(e) => {
                setPersonalizationEnabled(e.target.checked);
                toast.success("Privacy preferences updated.");
              }}
              className="size-5 accent-gold cursor-pointer"
            />
          </div>
        </div>
      </section>

      {/* 5. ACCOUNT ACTIONS */}
      <section className="border border-border bg-surface p-6 sm:p-8 space-y-6">
        <h3 className="text-h4 font-medium border-b border-border pb-4">Account Actions</h3>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-border p-5">
          <div>
            <p className="text-body-sm font-medium">Sign Out of Session</p>
            <p className="text-meta text-muted-foreground text-xs">
              End your active session on this device.
            </p>
          </div>
          <Button
            type="button"
            variant="secondary"
            onClick={onSignOutRequest}
            className="gap-1.5 uppercase text-xs tracking-wider"
          >
            <LogOut className="size-3.5" /> Sign Out
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-destructive/30 bg-destructive/5 p-5">
          <div>
            <p className="text-body-sm font-medium text-destructive">Delete Account</p>
            <p className="text-meta text-muted-foreground text-xs">
              Permanently remove your account, saved addresses, and profile data.
            </p>
          </div>
          <Button
            type="button"
            variant="destructive"
            onClick={onDeleteAccountRequest}
            className="gap-1.5 uppercase text-xs tracking-wider"
          >
            <Trash2 className="size-3.5" /> Delete Account
          </Button>
        </div>
      </section>
    </div>
  );
}
