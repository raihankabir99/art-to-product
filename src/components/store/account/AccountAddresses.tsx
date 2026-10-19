import { useState } from "react";
import { Plus, MapPin, Check, Trash2, Edit2, X, Phone, Globe } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/store/ui";
import { ADDRESSES as INITIAL_ADDRESSES, type Address } from "@/lib/account-data";
import { cn } from "@/lib/utils";

const COUNTRIES = [
  "Netherlands",
  "Germany",
  "France",
  "United Kingdom",
  "United States",
  "Canada",
  "Japan",
  "Australia",
  "Italy",
  "Spain",
  "Sweden",
  "Denmark",
  "Norway",
  "Switzerland",
  "Austria",
  "Belgium",
  "Singapore",
  "United Arab Emirates",
];

export function AccountAddresses({
  addresses,
  setAddresses,
}: {
  addresses: Address[];
  setAddresses: React.Dispatch<React.SetStateAction<Address[]>>;
}) {
  const [isAddingOrEditing, setIsAddingOrEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [label, setLabel] = useState("Home");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [stateRegion, setStateRegion] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("Netherlands");
  const [phone, setPhone] = useState("");
  const [isDefault, setIsDefault] = useState(false);

  const resetForm = () => {
    setLabel("Home");
    setFirstName("");
    setLastName("");
    setAddress1("");
    setAddress2("");
    setCity("");
    setStateRegion("");
    setPostalCode("");
    setCountry("Netherlands");
    setPhone("");
    setIsDefault(false);
    setEditingId(null);
    setIsAddingOrEditing(false);
  };

  const handleStartAdd = () => {
    resetForm();
    setIsAddingOrEditing(true);
  };

  const handleStartEdit = (addr: Address) => {
    setEditingId(addr.id);
    setLabel(addr.label);
    const parts = addr.name.split(" ");
    setFirstName(parts[0] || "");
    setLastName(parts.slice(1).join(" ") || "");
    setAddress1(addr.lines[0] || "");
    setAddress2(addr.lines[1] || "");
    setCity(addr.lines[2]?.split(" ")?.[1] || "Amsterdam");
    setPostalCode(addr.lines[2]?.split(" ")?.[0] || "1016 HD");
    setCountry(addr.country);
    setIsDefault(addr.isDefault);
    setIsAddingOrEditing(true);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !address1 || !city || !postalCode) {
      toast.error("Please fill in all required address fields.");
      return;
    }

    const fullName = `${firstName} ${lastName}`.trim();
    const formattedLines = [
      address1,
      address2 ? address2 : null,
      `${postalCode} ${city}${stateRegion ? `, ${stateRegion}` : ""}`,
    ].filter(Boolean) as string[];

    if (editingId) {
      // Update existing
      setAddresses((prev) =>
        prev.map((item) => {
          if (item.id === editingId) {
            return {
              ...item,
              label,
              name: fullName,
              lines: formattedLines,
              country,
              isDefault: isDefault ? true : item.isDefault,
            };
          }
          return isDefault ? { ...item, isDefault: false } : item;
        }),
      );
      toast.success("Address updated successfully.");
    } else {
      // Create new
      const newAddress: Address = {
        id: `addr_${Date.now()}`,
        label,
        name: fullName,
        lines: formattedLines,
        country,
        isDefault: isDefault || addresses.length === 0,
      };

      setAddresses((prev) => {
        if (newAddress.isDefault) {
          return [newAddress, ...prev.map((a) => ({ ...a, isDefault: false }))];
        }
        return [...prev, newAddress];
      });
      toast.success("New address saved.");
    }

    resetForm();
  };

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id,
      })),
    );
    toast.success("Default shipping address updated.");
  };

  const handleRemove = (id: string) => {
    setAddresses((prev) => {
      const remaining = prev.filter((a) => a.id !== id);
      if (remaining.length > 0 && !remaining.some((a) => a.isDefault)) {
        remaining[0].isDefault = true;
      }
      return remaining;
    });
    toast.info("Address removed.");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-h3 font-medium">Saved Addresses</h2>
            <span className="text-label text-gold text-xs px-2.5 py-0.5 bg-surface border border-border">
              {addresses.length}
            </span>
          </div>
          <p className="text-meta text-muted-foreground mt-1">
            Manage your delivery destinations for instant checkout worldwide.
          </p>
        </div>

        {!isAddingOrEditing && (
          <Button
            type="button"
            onClick={handleStartAdd}
            size="sm"
            className="gap-1.5 uppercase text-xs tracking-wider"
          >
            <Plus className="size-3.5" /> Add New Address
          </Button>
        )}
      </div>

      {/* Add / Edit Form Modal / Block */}
      {isAddingOrEditing && (
        <div className="border border-gold/40 bg-surface p-6 sm:p-8 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
            <h3 className="text-h4 font-medium flex items-center gap-2">
              <MapPin className="size-4 text-gold" />
              {editingId ? "Edit Address" : "Add New Address"}
            </h3>
            <button
              type="button"
              onClick={resetForm}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          </div>

          <form onSubmit={handleSaveAddress} className="space-y-5">
            {/* Label Selector */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-label text-xs uppercase tracking-wider text-muted-foreground block mb-2">
                  Address Label
                </label>
                <div className="flex gap-2">
                  {["Home", "Studio", "Office", "Other"].map((lbl) => (
                    <button
                      key={lbl}
                      type="button"
                      onClick={() => setLabel(lbl)}
                      className={cn(
                        "text-label text-xs px-3 py-2 border transition-all",
                        label === lbl
                          ? "border-foreground bg-foreground text-background"
                          : "border-border text-muted-foreground hover:border-foreground",
                      )}
                    >
                      {lbl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="country-select"
                  className="text-label text-xs uppercase tracking-wider text-muted-foreground block mb-2"
                >
                  Country / Region
                </label>
                <select
                  id="country-select"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="text-body-sm h-12 w-full border border-border bg-surface px-4 focus-visible:border-foreground focus-visible:outline-none"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c} className="bg-surface text-foreground">
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Names */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="First Name *"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Alex"
                required
              />
              <Field
                label="Last Name *"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Rivera"
                required
              />
            </div>

            {/* Address Lines */}
            <Field
              label="Street Address *"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              placeholder="Prinsengracht 214"
              required
            />

            <Field
              label="Apartment, Suite, Unit (Optional)"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              placeholder="Apt 4B / Studio floor"
            />

            {/* City, State, Postal Code */}
            <div className="grid gap-4 sm:grid-cols-3">
              <Field
                label="Postal Code *"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="1016 HD"
                required
              />
              <Field
                label="City *"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Amsterdam"
                required
              />
              <Field
                label="State / Region"
                value={stateRegion}
                onChange={(e) => setStateRegion(e.target.value)}
                placeholder="North Holland"
              />
            </div>

            {/* Phone */}
            <Field
              label="Phone Number (for delivery courier)"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+31 6 12345678"
            />

            {/* Checkbox Default */}
            <div className="flex items-center gap-3 pt-2">
              <input
                id="is-default-address"
                type="checkbox"
                checked={isDefault}
                onChange={(e) => setIsDefault(e.target.checked)}
                className="size-4 accent-gold border-border"
              />
              <label
                htmlFor="is-default-address"
                className="text-body-sm text-foreground cursor-pointer"
              >
                Set as primary default shipping address
              </label>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <Button type="button" variant="secondary" onClick={resetForm}>
                Cancel
              </Button>
              <Button type="submit" className="uppercase tracking-wider text-xs">
                Save Address
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Address Cards Grid */}
      {addresses.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={cn(
                "flex flex-col justify-between border bg-surface p-6 transition-all",
                addr.isDefault ? "border-gold" : "border-border hover:border-border-strong",
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-4 border-b border-border pb-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="text-h4 font-medium">{addr.label}</span>
                  </div>
                  {addr.isDefault ? (
                    <span className="text-label text-[11px] uppercase tracking-wider text-gold px-2.5 py-0.5 border border-gold/40 bg-gold/5">
                      Default Address
                    </span>
                  ) : null}
                </div>

                <address className="text-body-sm not-italic space-y-1 text-muted-foreground">
                  <p className="font-medium text-foreground">{addr.name}</p>
                  {addr.lines.map((l, idx) => (
                    <p key={idx}>{l}</p>
                  ))}
                  <p className="pt-1 text-foreground font-medium">{addr.country}</p>
                </address>
              </div>

              {/* Card Actions */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => handleStartEdit(addr)}
                    className="text-label text-xs uppercase tracking-wider link-underline hover:text-foreground text-muted-foreground"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(addr.id)}
                    className="text-label text-xs uppercase tracking-wider text-destructive/80 hover:text-destructive link-underline"
                  >
                    Remove
                  </button>
                </div>

                {!addr.isDefault && (
                  <button
                    type="button"
                    onClick={() => handleSetDefault(addr.id)}
                    className="text-label text-xs uppercase tracking-wider text-gold hover:underline"
                  >
                    Make Default
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-border bg-surface p-12 text-center space-y-4">
          <MapPin className="size-10 mx-auto text-muted-foreground/60" />
          <h3 className="text-h3 font-medium">No saved addresses yet</h3>
          <p className="text-body-sm text-muted-foreground max-w-md mx-auto">
            Add a primary shipping address to streamline your future commissions and print
            deliveries.
          </p>
          <Button type="button" onClick={handleStartAdd} className="mt-2">
            + Add First Address
          </Button>
        </div>
      )}
    </div>
  );
}
