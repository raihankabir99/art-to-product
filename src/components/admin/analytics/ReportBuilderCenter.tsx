import { useState } from "react";
import {
  FileText,
  Download,
  Calendar,
  Layers,
  Sparkles,
  CheckCircle2,
  Clock,
  Trash2,
  Share2,
  Printer,
  Plus,
  Play,
  Filter,
  Check,
  FileSpreadsheet,
} from "lucide-react";
import { SAVED_REPORTS_LIST, SCHEDULED_REPORTS_LIST } from "./analytics-mock-data";
import type { SavedReportItem, ScheduledReportItem } from "./types";

interface ReportBuilderCenterProps {
  onOpenExportModal?: () => void;
}

export function ReportBuilderCenter({ onOpenExportModal }: ReportBuilderCenterProps) {
  const [activeTab, setActiveTab] = useState<"builder" | "saved" | "scheduled">("builder");

  // Builder state
  const [reportTitle, setReportTitle] = useState("Enterprise Merchandising & Production Audit");
  const [dateRange, setDateRange] = useState("30d");
  const [includedSections, setIncludedSections] = useState({
    executive: true,
    revenue: true,
    designs: true,
    products: true,
    customers: true,
    geo: true,
    marketing: true,
    pod: true,
    returns: false,
    seo: false,
  });
  const [exportFormat, setExportFormat] = useState<"PDF" | "CSV" | "XLSX">("PDF");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPreview, setGeneratedPreview] = useState(false);

  // Saved reports list state
  const [savedReports, setSavedReports] = useState<SavedReportItem[]>(SAVED_REPORTS_LIST);
  const [scheduledReports, setScheduledReports] =
    useState<ScheduledReportItem[]>(SCHEDULED_REPORTS_LIST);

  const toggleSection = (key: keyof typeof includedSections) => {
    setIncludedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedPreview(true);
    }, 900);
  };

  const handleDeleteSaved = (id: string) => {
    setSavedReports((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="space-y-8 animate-fade-in-soft">
      {/* Sub Navigation */}
      <div className="flex items-center gap-2 border-b border-border pb-4">
        <button
          onClick={() => setActiveTab("builder")}
          className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors ${
            activeTab === "builder"
              ? "bg-gold text-black font-semibold"
              : "bg-surface-2 text-muted-foreground hover:text-foreground border border-border"
          }`}
        >
          Visual Report Builder
        </button>
        <button
          onClick={() => setActiveTab("saved")}
          className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors ${
            activeTab === "saved"
              ? "bg-gold text-black font-semibold"
              : "bg-surface-2 text-muted-foreground hover:text-foreground border border-border"
          }`}
        >
          Saved Reports Library ({savedReports.length})
        </button>
        <button
          onClick={() => setActiveTab("scheduled")}
          className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors ${
            activeTab === "scheduled"
              ? "bg-gold text-black font-semibold"
              : "bg-surface-2 text-muted-foreground hover:text-foreground border border-border"
          }`}
        >
          Scheduled Automated Broadcasts ({scheduledReports.length})
        </button>
      </div>

      {/* 1. REPORT BUILDER */}
      {activeTab === "builder" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Builder Controls */}
          <div className="lg:col-span-6 p-6 bg-surface border border-border space-y-6">
            <div>
              <h3 className="text-sm font-display font-medium text-foreground uppercase tracking-wider">
                Report Configuration
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Customize data modules, aggregation windows, and export layouts.
              </p>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-muted-foreground uppercase text-[10px] mb-1.5">
                  Report Title
                </label>
                <input
                  type="text"
                  value={reportTitle}
                  onChange={(e) => setReportTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-surface-2 border border-border text-foreground focus:outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-muted-foreground uppercase text-[10px] mb-1.5">
                    Aggregation Window
                  </label>
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="w-full px-3 py-2 bg-surface-2 border border-border text-foreground focus:outline-none focus:border-gold"
                  >
                    <option value="today">Today (Live Ingress)</option>
                    <option value="7d">Last 7 Days</option>
                    <option value="30d">Last 30 Days (Standard)</option>
                    <option value="90d">Last Quarter (90 Days)</option>
                    <option value="12m">Trailing 12 Months</option>
                  </select>
                </div>

                <div>
                  <label className="block text-muted-foreground uppercase text-[10px] mb-1.5">
                    Export Format
                  </label>
                  <div className="flex items-center gap-1">
                    {(["PDF", "CSV", "XLSX"] as const).map((fmt) => (
                      <button
                        key={fmt}
                        onClick={() => setExportFormat(fmt)}
                        className={`flex-1 py-2 text-center text-xs uppercase border transition-colors ${
                          exportFormat === fmt
                            ? "bg-gold text-black font-semibold border-gold"
                            : "bg-surface-2 border-border text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-muted-foreground uppercase text-[10px] mb-2">
                  Include Modules ({Object.values(includedSections).filter(Boolean).length}{" "}
                  Selected)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries({
                    executive: "Executive KPI Briefing",
                    revenue: "Revenue & AOV Trajectory",
                    designs: "Artwork & 13 Silhouettes Matrix",
                    products: "Product Catalog Performance",
                    customers: "Cohort Retention & Funnel",
                    geo: "Geographic Ingress Markets",
                    marketing: "Attribution & ROAS",
                    pod: "POD Fulfillment & SLA",
                    returns: "Returns & Refund Reasons",
                    seo: "Search SERP & Keywords",
                  }).map(([key, label]) => {
                    const isChecked = includedSections[key as keyof typeof includedSections];
                    return (
                      <button
                        key={key}
                        onClick={() => toggleSection(key as keyof typeof includedSections)}
                        className={`p-2.5 text-left border flex items-center justify-between text-xs transition-colors ${
                          isChecked
                            ? "bg-surface-2 border-gold/50 text-foreground font-medium"
                            : "bg-surface border-border text-muted-foreground"
                        }`}
                      >
                        <span className="truncate">{label}</span>
                        {isChecked && <Check className="size-3.5 text-gold flex-shrink-0 ml-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-between">
              <span className="text-[11px] font-mono text-muted-foreground">
                Simulated compilation in ~1.2s
              </span>
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="px-5 py-2.5 bg-gold text-black hover:bg-gold/90 font-mono text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Clock className="size-4 animate-spin" /> Compiling Telemetry...
                  </>
                ) : (
                  <>
                    <Play className="size-4" /> Generate Report Preview
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Generated Preview */}
          <div className="lg:col-span-6 p-6 bg-surface border border-border flex flex-col justify-between">
            {generatedPreview ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-emerald-400">
                      Report Generated Successfully
                    </span>
                    <h4 className="text-sm font-display font-semibold text-foreground mt-0.5">
                      {reportTitle}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        alert(`Downloaded ${reportTitle}.${exportFormat.toLowerCase()}`)
                      }
                      className="px-3 py-1 bg-gold text-black hover:bg-gold/90 font-mono text-xs font-semibold uppercase flex items-center gap-1.5"
                    >
                      <Download className="size-3.5" /> Download {exportFormat}
                    </button>
                  </div>
                </div>

                {/* Mock Paper Sheet Preview */}
                <div className="p-6 bg-surface-2 border border-border text-xs font-mono space-y-4 shadow-2xl">
                  <div className="flex justify-between border-b border-border pb-3">
                    <div>
                      <div className="font-display font-bold text-sm text-foreground">
                        ATELIER NOIR
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        ENTERPRISE TELEMETRY AUDIT
                      </div>
                    </div>
                    <div className="text-right text-[10px] text-muted-foreground">
                      <div>Generated: Today, 14:30 CET</div>
                      <div>Window: 30-Day Aggregation</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center py-2 bg-surface border border-border">
                    <div>
                      <span className="text-[10px] text-muted-foreground block">GROSS REVENUE</span>
                      <span className="text-sm font-bold text-foreground">€48,920.00</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground block">TOTAL ORDERS</span>
                      <span className="text-sm font-bold text-foreground">742</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground block">
                        FULFILLMENT SLA
                      </span>
                      <span className="text-sm font-bold text-emerald-400">98.8%</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-[11px]">
                    <div className="font-semibold text-gold uppercase text-[10px]">
                      Executive Highlights:
                    </div>
                    <p className="text-foreground/90">
                      • Highest converting silhouette: Hoodies (€18,260.00 GMV across German/French
                      nodes).
                    </p>
                    <p className="text-foreground/90">
                      • Top artwork: Midnight Lion (€18,450.00 total across 13 canvas categories).
                    </p>
                    <p className="text-foreground/90">
                      • Zero production bottlenecks logged across Berlin, London, Milan print hubs.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-muted-foreground pt-2">
                  <span>File Size: ~2.4 MB • Cryptographically Signed</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => alert("Report scheduled for weekly dispatch")}
                      className="text-gold hover:underline"
                    >
                      + Add to Automated Schedule
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3">
                <FileText className="size-10 text-muted-foreground/40" />
                <h4 className="text-sm font-display font-medium text-foreground uppercase tracking-wider">
                  Report Preview Canvas
                </h4>
                <p className="text-xs text-muted-foreground max-w-sm">
                  Configure the parameters on the left and click "Generate Report Preview" to
                  compile live enterprise telemetry.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. SAVED REPORTS LIST */}
      {activeTab === "saved" && (
        <div className="bg-surface border border-border overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-surface-2 border-b border-border text-muted-foreground uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Report Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Compiled By</th>
                <th className="py-3 px-4">Last Generated</th>
                <th className="py-3 px-4">Cadence</th>
                <th className="py-3 px-4">Format</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {savedReports.map((rep) => (
                <tr key={rep.id} className="hover:bg-surface-2/60 transition-colors">
                  <td className="py-3 px-4 font-semibold text-foreground flex items-center gap-2">
                    <FileText className="size-4 text-gold flex-shrink-0" />
                    <span>{rep.name}</span>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{rep.category}</td>
                  <td className="py-3 px-4 text-muted-foreground">{rep.createdBy}</td>
                  <td className="py-3 px-4 text-foreground">{rep.lastUpdated}</td>
                  <td className="py-3 px-4 text-gold">{rep.schedule}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 text-[10px] bg-surface-2 border border-border text-foreground font-semibold">
                      {rep.format} ({rep.fileSize})
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => alert(`Downloading ${rep.name}`)}
                        className="p-1 text-muted-foreground hover:text-gold"
                        title="Download"
                      >
                        <Download className="size-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteSaved(rep.id)}
                        className="p-1 text-muted-foreground hover:text-rose-400"
                        title="Delete"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 3. SCHEDULED REPORTS */}
      {activeTab === "scheduled" && (
        <div className="bg-surface border border-border overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-surface-2 border-b border-border text-muted-foreground uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Broadcast Name</th>
                <th className="py-3 px-4">Frequency</th>
                <th className="py-3 px-4">Recipients</th>
                <th className="py-3 px-4">Report Payload</th>
                <th className="py-3 px-4">Next Delivery</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {scheduledReports.map((sch) => (
                <tr key={sch.id} className="hover:bg-surface-2/60 transition-colors">
                  <td className="py-3 px-4 font-semibold text-foreground">{sch.name}</td>
                  <td className="py-3 px-4 text-gold font-medium">{sch.frequency}</td>
                  <td className="py-3 px-4 text-muted-foreground truncate max-w-[200px]">
                    {sch.recipients.join(", ")}
                  </td>
                  <td className="py-3 px-4 text-foreground">{sch.reportType}</td>
                  <td className="py-3 px-4 text-muted-foreground">{sch.nextDelivery}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="px-2 py-0.5 text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                      {sch.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
