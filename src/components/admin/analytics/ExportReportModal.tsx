import { useState } from "react";
import { X, Download, FileText, FileSpreadsheet, Check, CheckCircle2, Clock } from "lucide-react";

interface ExportReportModalProps {
  open: boolean;
  onClose: () => void;
}

export function ExportReportModal({ open, onClose }: ExportReportModalProps) {
  const [format, setFormat] = useState<"PDF" | "CSV" | "XLSX">("PDF");
  const [dataWindow, setDataWindow] = useState("30d");
  const [exporting, setExporting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!open) return null;

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1200);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in-soft">
      <div className="bg-surface border border-gold/40 w-full max-w-md p-6 space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        >
          <X className="size-4" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <Download className="size-4 text-gold" />
            <h3 className="text-sm font-display font-medium text-foreground uppercase tracking-wider">
              Export Business Intelligence Data
            </h3>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Generate an archival compilation of verified transactions and POD telemetry.
          </p>
        </div>

        <div className="space-y-4 text-xs font-mono">
          <div>
            <label className="block text-muted-foreground uppercase text-[10px] mb-1.5">
              Export Format
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["PDF", "CSV", "XLSX"] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setFormat(fmt)}
                  className={`py-2 text-center border transition-all ${
                    format === fmt
                      ? "bg-gold text-black font-semibold border-gold"
                      : "bg-surface-2 border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-muted-foreground uppercase text-[10px] mb-1.5">
              Aggregation Range
            </label>
            <select
              value={dataWindow}
              onChange={(e) => setDataWindow(e.target.value)}
              className="w-full px-3 py-2 bg-surface-2 border border-border text-foreground focus:outline-none focus:border-gold"
            >
              <option value="today">Today's Ingress</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days (Standard)</option>
              <option value="90d">Quarterly (90 Days)</option>
              <option value="12m">Trailing 12 Months</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-border text-muted-foreground hover:text-foreground text-xs font-mono uppercase"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={exporting}
            className="px-5 py-2 bg-gold text-black hover:bg-gold/90 text-xs font-mono font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors disabled:opacity-50"
          >
            {exporting ? (
              <>
                <Clock className="size-3.5 animate-spin" /> Compiling...
              </>
            ) : success ? (
              <>
                <CheckCircle2 className="size-3.5 text-black" /> Exported!
              </>
            ) : (
              <>
                <Download className="size-3.5" /> Download {format}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
