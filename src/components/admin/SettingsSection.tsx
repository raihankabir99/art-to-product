import { useState } from "react";
import {
  Settings,
  Store,
  Globe,
  Search,
  ShieldCheck,
  Zap,
  ListOrdered,
  Save,
  CheckCircle2,
  Lock,
  Plus,
  Trash2,
} from "lucide-react";
import { RECENT_AUDIT_LOGS } from "./admin-data";
import { toast } from "sonner";

interface SettingsSectionProps {
  subSection: string;
}

export function SettingsSection({ subSection }: SettingsSectionProps) {
  const [storeName, setStoreName] = useState("Atelier Noir");
  const [supportEmail, setSupportEmail] = useState("concierge@ateliernoir.com");
  const [currency, setCurrency] = useState("EUR");
  const [autoRouting, setAutoRouting] = useState(true);

  const staffMembers = [
    {
      name: "Laurent Noir",
      email: "laurent@ateliernoir.com",
      role: "Principal Director / Super Admin",
      status: "Active",
      lastLogin: "Just now",
    },
    {
      name: "Elena Brand",
      email: "elena@ateliernoir.com",
      role: "Lead Fashion Editor",
      status: "Active",
      lastLogin: "2 hours ago",
    },
    {
      name: "Marcus Sterling",
      email: "marcus@ateliernoir.com",
      role: "Fulfillment & Supply Chain Lead",
      status: "Active",
      lastLogin: "Yesterday",
    },
    {
      name: "Sarah Chen",
      email: "sarah@ateliernoir.com",
      role: "Marketing Analyst",
      status: "Active",
      lastLogin: "3 days ago",
    },
  ];

  const integrations = [
    {
      name: "Prodigi Multi-Region POD API",
      category: "Fulfillment",
      status: "Connected (Live)",
      node: "EU Central (Berlin) & APAC",
      latency: "42ms",
    },
    {
      name: "Gelato Global Print Network",
      category: "Fulfillment",
      status: "Connected (Live)",
      node: "North America (US) & Nordics",
      latency: "58ms",
    },
    {
      name: "Printify Studio Integration",
      category: "Fulfillment",
      status: "Connected (Live)",
      node: "London Atelier Hub",
      latency: "36ms",
    },
    {
      name: "Stripe Enterprise Payments",
      category: "Commerce",
      status: "Verified (3D Secure 2.0)",
      node: "Global Gateway",
      latency: "19ms",
    },
  ];

  const handleSave = () => {
    toast.success("Settings saved and propagated to all edge nodes");
  };

  return (
    <div className="space-y-6 animate-fade-in-soft">
      {/* ================= GENERAL & STORE SETTINGS ================= */}
      {(subSection === "general" || subSection === "store") && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-surface border border-border">
            <div>
              <div className="flex items-center gap-2">
                <Settings className="size-4 text-gold" />
                <h2 className="text-xl font-display font-medium text-foreground uppercase tracking-wider">
                  Store Preferences & Configuration
                </h2>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Configure primary brand metadata, transactional communication addresses, and
                fulfillment defaults.
              </p>
            </div>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gold text-background text-xs uppercase tracking-wider font-semibold hover:bg-foreground hover:text-background transition-colors"
            >
              <Save className="size-4" /> Save Settings
            </button>
          </div>

          <div className="p-6 bg-surface border border-border space-y-4 max-w-2xl">
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                Store Name
              </label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                Concierge & Support Email
              </label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                Default Base Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3 py-2 bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
              >
                <option value="EUR">EUR (€) - Eurozone</option>
                <option value="USD">USD ($) - United States</option>
                <option value="GBP">GBP (£) - United Kingdom</option>
                <option value="CHF">CHF - Switzerland</option>
              </select>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-border">
              <div>
                <p className="text-xs font-medium text-foreground">
                  Automated Geolocation POD Routing
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Direct orders to the lowest latency certified print facility
                </p>
              </div>
              <input
                type="checkbox"
                checked={autoRouting}
                onChange={(e) => setAutoRouting(e.target.checked)}
                className="accent-gold size-4 cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* ================= USERS & ROLES ================= */}
      {subSection === "users-roles" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-surface border border-border">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-gold" />
                <h2 className="text-xl font-display font-medium text-foreground uppercase tracking-wider">
                  Staff Members & Role-Based Access Control (RBAC)
                </h2>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Manage executive credentials, editor permissions, and fulfillment dispatch team
                access.
              </p>
            </div>
            <button
              type="button"
              onClick={() => toast.info("Invite modal opened")}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gold text-background text-xs uppercase tracking-wider font-semibold hover:bg-foreground hover:text-background transition-colors"
            >
              <Plus className="size-4" /> Invite Staff Member
            </button>
          </div>

          <div className="bg-surface border border-border overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border text-muted-foreground uppercase text-[10px] tracking-wider font-mono bg-surface-2/40">
                  <th className="p-3.5">Member Name</th>
                  <th className="p-3.5">Email Address</th>
                  <th className="p-3.5">Assigned Role</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Last Login</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {staffMembers.map((member, idx) => (
                  <tr key={idx} className="hover:bg-surface-2/70 transition-colors">
                    <td className="p-3.5 font-medium text-foreground">{member.name}</td>
                    <td className="p-3.5 font-mono text-muted-foreground">{member.email}</td>
                    <td className="p-3.5">
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-gold/10 text-gold border border-gold/30">
                        {member.role}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className="text-[10px] font-mono text-emerald-400">
                        ● {member.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right font-mono text-muted-foreground">
                      {member.lastLogin}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= INTEGRATIONS ================= */}
      {subSection === "integrations" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-surface border border-border">
            <div>
              <div className="flex items-center gap-2">
                <Zap className="size-4 text-gold" />
                <h2 className="text-xl font-display font-medium text-foreground uppercase tracking-wider">
                  API Connectors & Third-Party Integrations
                </h2>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Direct webhook connections to Print-on-Demand providers, merchant payment
                processing, and cloud databases.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400 border border-emerald-500/20 bg-emerald-950/20 px-3 py-1.5">
              All 4 Connectors Verified
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {integrations.map((item, idx) => (
              <div key={idx} className="p-5 bg-surface border border-border space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono text-gold px-1.5 py-0.5 border border-gold/30 bg-gold/10">
                    {item.category}
                  </span>
                  <span className="text-xs font-mono text-emerald-400">{item.status}</span>
                </div>
                <h3 className="text-sm font-semibold text-foreground">{item.name}</h3>
                <div className="pt-2 border-t border-border flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <span>Hub: {item.node}</span>
                  <span>Latency: {item.latency}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= AUDIT LOG ================= */}
      {subSection === "audit" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-surface border border-border">
            <div>
              <div className="flex items-center gap-2">
                <ListOrdered className="size-4 text-gold" />
                <h2 className="text-xl font-display font-medium text-foreground uppercase tracking-wider">
                  Enterprise Audit Ledger
                </h2>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Immutable chronological log of all administrator actions, stock updates, and
                security checkpoints.
              </p>
            </div>
            <button
              type="button"
              onClick={() => toast.success("Exporting cryptographically signed audit log")}
              className="px-4 py-2 bg-surface text-foreground border border-border text-xs uppercase tracking-wider hover:border-gold"
            >
              Export Signed Log
            </button>
          </div>

          <div className="space-y-3">
            {RECENT_AUDIT_LOGS.map((log) => (
              <div
                key={log.id}
                className="p-4 bg-surface border border-border flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="size-2 bg-gold rounded-full" />
                  <div>
                    <p className="font-semibold text-foreground">
                      {log.action} — <span className="text-gold">{log.target}</span>
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Performed by {log.actor} [{log.category}]
                    </p>
                  </div>
                </div>
                <span className="font-mono text-muted-foreground text-[11px]">{log.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
