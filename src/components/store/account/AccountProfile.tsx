import { useState } from "react";
import { User, Mail, Phone, ShieldCheck, Check, Camera } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/store/ui";
import { authService, type UserProfile } from "@/lib/services/auth-service";

export function AccountProfile({
  user,
  onUserUpdated,
}: {
  user: UserProfile;
  onUserUpdated: () => void;
}) {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [phone, setPhone] = useState("+31 6 82910394");
  const [isSaving, setIsSaving] = useState(false);

  const initials =
    `${firstName.charAt(0) || user.email.charAt(0)}${lastName.charAt(0) || ""}`.toUpperCase();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await authService.updateProfile(user.id, {
        first_name: firstName,
        last_name: lastName,
      });
      toast.success("Profile details saved.");
      onUserUpdated();
    } catch {
      toast.error("Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-border pb-6">
        <h2 className="text-h3 font-medium">Personal Profile</h2>
        <p className="text-meta text-muted-foreground mt-1">
          Manage your personal details and how your studio account is identified.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
        {/* Avatar Sidebar */}
        <div className="flex flex-col items-center text-center p-6 border border-border bg-surface">
          <div className="relative group cursor-pointer">
            <div className="grid size-24 place-items-center border-2 border-gold bg-surface-2 text-foreground font-mono text-2xl font-bold tracking-wider">
              {initials}
            </div>
            <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity grid place-items-center text-xs font-medium">
              <Camera className="size-5 text-gold" />
            </div>
          </div>

          <h3 className="text-h4 font-medium mt-4">
            {firstName} {lastName}
          </h3>
          <p className="text-meta text-muted-foreground text-xs">{user.email}</p>

          <div className="mt-4 flex items-center gap-1.5 px-3 py-1 bg-gold/10 border border-gold/30 text-gold text-label text-[11px]">
            <ShieldCheck className="size-3.5" /> Studio Collector
          </div>
        </div>

        {/* Edit Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 border border-border bg-surface p-6 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Alex"
              required
            />
            <Field
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Rivera"
              required
            />
          </div>

          <div>
            <label className="text-label text-muted-foreground block mb-2">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={user.email}
                disabled
                className="text-body-sm h-12 w-full border border-border bg-surface-2/60 px-4 text-muted-foreground cursor-not-allowed pr-24"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-label text-[10px] uppercase tracking-wider text-gold px-2 py-0.5 border border-gold/30">
                Verified
              </span>
            </div>
            <p className="text-meta text-muted-foreground mt-1 text-xs">
              Contact concierge if you need to migrate your primary account email.
            </p>
          </div>

          <Field
            label="Phone Number"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+31 6 82910394"
            hint="Used for international shipping notifications and order verification."
          />

          <div className="pt-4 border-t border-border flex justify-end">
            <Button
              type="submit"
              disabled={isSaving}
              className="uppercase tracking-wider text-xs px-6"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
