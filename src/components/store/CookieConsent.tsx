import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Overlay } from "./ui";

const KEY = "an-cookie-choice";

const GROUPS = [
  {
    id: "necessary" as const,
    name: "Strictly necessary",
    body: "Keeps your bag, region and language working. These cannot be switched off.",
    locked: true,
  },
  {
    id: "analytics" as const,
    name: "Analytics",
    body: "Anonymous measurement of which pages and designs are used, so we can improve them.",
    locked: false,
  },
  {
    id: "marketing" as const,
    name: "Marketing",
    body: "Lets us show relevant campaigns for your region and measure whether they were useful.",
    locked: false,
  },
];

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [settings, setSettings] = useState(false);
  const [prefs, setPrefs] = useState({ analytics: true, marketing: false });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.localStorage.getItem(KEY)) setVisible(true);
  }, []);

  function decide(choice: string) {
    try {
      window.localStorage.setItem(KEY, choice);
    } catch {
      /* preference storage unavailable — the banner simply reappears */
    }
    setVisible(false);
    setSettings(false);
    toast.success("Cookie preferences saved");
  }

  if (!visible) return null;

  return (
    <>
      <div
        role="region"
        aria-label="Cookie preferences"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur-xl"
      >
        <div className="container-page flex flex-col gap-4 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-label">Cookies</p>
            <p className="text-body-sm mt-2 text-muted-foreground">
              We use strictly necessary cookies to run the store, and optional cookies to understand
              how it is used across regions. You choose what else we may set.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" onClick={() => setSettings(true)}>
              Manage preferences
            </Button>
            <Button variant="secondary" onClick={() => decide("necessary")}>
              Reject optional
            </Button>
            <Button onClick={() => decide("all")}>Accept all</Button>
          </div>
        </div>
      </div>

      <Overlay
        open={settings}
        onClose={() => setSettings(false)}
        title="Cookie settings"
        side="center"
        footer={
          <div className="flex flex-wrap justify-end gap-3">
            <Button variant="secondary" onClick={() => decide("necessary")}>
              Reject optional
            </Button>
            <Button onClick={() => decide(JSON.stringify(prefs))}>Save preferences</Button>
          </div>
        }
      >
        <ul className="space-y-4">
          {GROUPS.map((g) => {
            const checked = g.locked || prefs[g.id as "analytics" | "marketing"];
            return (
              <li key={g.id} className="flex items-start justify-between gap-6 border border-border p-5">
                <div className="min-w-0">
                  <p className="text-h4">{g.name}</p>
                  <p className="text-body-sm mt-2 text-muted-foreground">{g.body}</p>
                </div>
                <label className="text-label flex shrink-0 items-center gap-3">
                  <span className="text-muted-foreground">{checked ? "On" : "Off"}</span>
                  <input
                    type="checkbox"
                    className="size-5 accent-[var(--gold)]"
                    checked={checked}
                    disabled={g.locked}
                    aria-label={`${g.name} cookies`}
                    onChange={(e) =>
                      setPrefs((p) => ({ ...p, [g.id]: e.target.checked }))
                    }
                  />
                </label>
              </li>
            );
          })}
        </ul>
      </Overlay>
    </>
  );
}
