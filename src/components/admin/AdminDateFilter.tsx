import { Calendar, ChevronDown } from "lucide-react";
import type { DateRangeKey } from "./admin-data";

interface AdminDateFilterProps {
  currentRange: DateRangeKey;
  onChange: (range: DateRangeKey) => void;
}

export function AdminDateFilter({ currentRange, onChange }: AdminDateFilterProps) {
  const options: { id: DateRangeKey; label: string }[] = [
    { id: "today", label: "Today" },
    { id: "7d", label: "7 Days" },
    { id: "30d", label: "30 Days" },
    { id: "90d", label: "90 Days" },
    { id: "year", label: "This Year" },
    { id: "custom", label: "Custom Range" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Desktop/Tablet segmented control */}
      <div className="hidden sm:inline-flex items-center p-1 bg-surface border border-border rounded-none">
        {options.map((opt) => {
          const isActive = currentRange === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider font-medium transition-all duration-200 ${
                isActive
                  ? "bg-foreground text-background font-semibold shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface-2"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* Mobile dropdown selector */}
      <div className="sm:hidden relative w-full">
        <div className="flex items-center justify-between w-full px-3 py-2 bg-surface border border-border text-xs uppercase tracking-wider">
          <span className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="size-3.5 text-gold" />
            Range:
          </span>
          <select
            value={currentRange}
            onChange={(e) => onChange(e.target.value as DateRangeKey)}
            className="bg-transparent text-foreground font-medium text-xs focus:outline-none cursor-pointer"
          >
            {options.map((opt) => (
              <option key={opt.id} value={opt.id} className="bg-surface text-foreground">
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
