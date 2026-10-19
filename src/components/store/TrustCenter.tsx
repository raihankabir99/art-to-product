import { ShieldCheck, Sparkles, Truck, Headphones, FileCheck2, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

interface TrustCenterProps {
  className?: string;
  showCta?: boolean;
}

export const TRUST_PILLARS = [
  {
    icon: ShieldCheck,
    title: "Secure Checkout",
    description:
      "All transactions are processed through encrypted 256-bit SSL protocols. We never store raw payment card data on our servers.",
  },
  {
    icon: Sparkles,
    title: "On-Demand Production",
    description:
      "Each object is individually printed and proofed after your order is placed, eliminating dead inventory and excess production waste.",
  },
  {
    icon: Truck,
    title: "Order Tracking",
    description:
      "Step-by-step transparency from artwork proofing to doorstep delivery with regional courier tracking numbers provided at dispatch.",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    description:
      "Our studio concierge team responds to every inquiry within one working day, Monday through Friday, Central European Time.",
  },
  {
    icon: FileCheck2,
    title: "Clear Policies",
    description:
      "Transparent 30-day return eligibility for unworn pieces, honest shipping estimates, and upfront regional tax information.",
  },
];

export function TrustCenter({ className, showCta = true }: TrustCenterProps) {
  return (
    <section className={cn("section container-page border-t border-border", className)}>
      <div className="flex flex-col items-center text-center">
        <span className="text-label text-gold uppercase tracking-widest font-semibold">
          Studio Standards
        </span>
        <h2 className="text-h1 mt-3 font-heading tracking-tight text-foreground">
          Shop with Confidence.
        </h2>
        <p className="text-body-lg mt-3 max-w-2xl text-muted-foreground">
          Every piece is produced with intention, backed by transparent policies and dedicated
          customer care across all international destinations.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {TRUST_PILLARS.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div
              key={pillar.title}
              className="flex flex-col justify-between border border-border bg-surface p-6 transition-colors hover:border-gold/50"
            >
              <div>
                <div className="flex size-10 items-center justify-center border border-border bg-surface-2 text-gold">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-h4 mt-5 font-heading text-foreground">{pillar.title}</h3>
                <p className="text-body-sm mt-2 leading-relaxed text-muted-foreground">
                  {pillar.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {showCta && (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-center">
          <Link
            to="/faq"
            className="text-label text-gold hover:underline inline-flex items-center gap-1.5"
          >
            Read our Frequently Asked Questions <ArrowRight className="size-3.5" />
          </Link>
          <span className="text-border hidden sm:inline">·</span>
          <Link
            to="/contact"
            className="text-label text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5"
          >
            Speak with our Studio Team <ArrowRight className="size-3.5" />
          </Link>
        </div>
      )}
    </section>
  );
}
