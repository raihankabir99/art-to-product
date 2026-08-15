import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";

const KEY = "an_announcement_dismissed_v1";

/**
 * Slim, dismissible announcement strip above the header.
 * No countdowns, no fake urgency — one editorial line only.
 */
export function AnnouncementBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      setVisible(localStorage.getItem(KEY) !== "1");
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="relative border-b border-border bg-surface">
      <div className="container-page grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-2.5">
        <p className="text-label min-w-0 truncate text-center text-muted-foreground sm:text-left">
          <span className="text-gold">New drop</span>
          <span className="mx-2 opacity-40" aria-hidden="true">
            /
          </span>
          <Link to="/new" className="link-underline text-foreground/85 hover:text-foreground">
            Explore the latest collection
          </Link>
        </p>
        <button
          type="button"
          aria-label="Dismiss announcement"
          onClick={() => {
            setVisible(false);
            try {
              localStorage.setItem(KEY, "1");
            } catch {
              /* ignore */
            }
          }}
          className="-mr-2 inline-flex size-8 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
