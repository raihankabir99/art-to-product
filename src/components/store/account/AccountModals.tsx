import { useState } from "react";
import {
  AlertTriangle,
  LogOut,
  Trash2,
  X,
  PhoneCall,
  HelpCircle,
  Check,
  Package,
  MapPin,
  CreditCard,
  Clock,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Mockup } from "@/components/store/Mockup";
import { designBySlug } from "@/lib/catalog";
import type { Order } from "@/lib/account-data";
import { cn } from "@/lib/utils";

/** Sign Out Confirmation Modal */
export function SignOutModal({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="signout-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-md border border-border bg-surface p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center border border-border bg-surface-2 text-foreground">
              <LogOut className="size-5" />
            </div>
            <div>
              <p className="text-label uppercase tracking-widest text-gold text-[10px]">Session</p>
              <h2 id="signout-title" className="text-h3 font-medium">
                Sign out of your account?
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid size-9 place-items-center text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        <p className="text-body-sm mt-4 text-muted-foreground">
          You will need your email and password to sign back in. Your saved bag and wishlist items
          will remain safe in your studio profile.
        </p>

        <div className="mt-8 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
          <Button type="button" variant="secondary" onClick={onClose} className="sm:w-auto w-full">
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            className="sm:w-auto w-full bg-foreground text-background hover:bg-foreground/90 font-medium tracking-wide uppercase"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}

/** Delete Account Confirmation Modal */
export function DeleteAccountModal({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const [confirmInput, setConfirmInput] = useState("");
  const isConfirmed = confirmInput.trim().toUpperCase() === "DELETE";

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="fixed inset-0 bg-background/85 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-lg border border-destructive/50 bg-surface p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center border border-destructive/40 bg-destructive/10 text-destructive">
              <Trash2 className="size-5" />
            </div>
            <div>
              <p className="text-label uppercase tracking-widest text-destructive text-[10px]">
                Permanent Action
              </p>
              <h2 id="delete-title" className="text-h3 font-medium text-destructive">
                Delete your account?
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid size-9 place-items-center text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="mt-4 space-y-3 text-body-sm text-muted-foreground">
          <p>
            Deleting your account is{" "}
            <strong className="text-foreground">permanent and cannot be undone</strong>.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground/90">
            <li>All saved addresses and personal details will be deleted.</li>
            <li>Saved wishlists and order history records will be decoupled.</li>
            <li>
              Active physical shipments will continue delivering to their original destination.
            </li>
          </ul>
        </div>

        <div className="mt-6 border-t border-border pt-4">
          <label htmlFor="confirm-delete" className="text-label block text-muted-foreground mb-2">
            Type <strong className="text-foreground">DELETE</strong> to confirm:
          </label>
          <input
            id="confirm-delete"
            type="text"
            value={confirmInput}
            onChange={(e) => setConfirmInput(e.target.value)}
            placeholder="DELETE"
            className="text-body-sm h-11 w-full border border-border bg-transparent px-3 uppercase tracking-wider focus-visible:border-destructive focus-visible:outline-none"
          />
        </div>

        <div className="mt-8 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
          <Button type="button" variant="secondary" onClick={onClose} className="sm:w-auto w-full">
            Cancel
          </Button>
          <Button
            type="button"
            disabled={!isConfirmed}
            onClick={onConfirm}
            className="sm:w-auto w-full bg-destructive text-destructive-foreground hover:bg-destructive/90 font-medium tracking-wide uppercase disabled:opacity-40"
          >
            Delete Account Permanently
          </Button>
        </div>
      </div>
    </div>
  );
}

/** Comprehensive Order Detail Modal */
export function OrderDetailModal({
  order,
  open,
  onClose,
  format,
}: {
  order: Order | null;
  open: boolean;
  onClose: () => void;
  format: (n: number) => string;
}) {
  if (!open || !order) return null;

  const stepsList = [
    "Order Placed",
    "Payment Confirmed",
    "Sent to Production",
    "In Production",
    "Shipped",
    "Delivered",
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col border border-border bg-surface shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-5">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-label uppercase tracking-widest text-gold text-[11px]">
                Order Details
              </span>
              <span className="text-border">·</span>
              <span className="text-meta text-muted-foreground">Placed {order.placed}</span>
            </div>
            <h2 id="order-modal-title" className="text-h3 font-medium mt-0.5">
              #{order.id}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid size-10 place-items-center text-muted-foreground hover:text-foreground border border-border"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Body Content */}
        <div className="min-h-0 flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Status Timeline */}
          <div className="border border-border bg-surface-2/40 p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-label uppercase tracking-wider text-xs font-semibold">
                Production & Delivery Timeline
              </p>
              <span className="text-label text-gold font-medium px-2.5 py-1 bg-surface border border-border text-[11px]">
                {order.statusLabel || (order.step === 6 ? "Delivered" : "In Production")}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-6 pt-2">
              {stepsList.map((stepName, i) => {
                const isCompleted = order.step > i;
                const isCurrent = order.step === i;
                const isUpcoming = order.step < i;

                return (
                  <div key={stepName} className="flex flex-col items-center text-center">
                    <div
                      className={cn(
                        "grid size-7 place-items-center border text-[11px] font-medium transition-colors mb-2",
                        isCompleted && "border-gold bg-gold text-background",
                        isCurrent && "border-gold text-gold ring-2 ring-gold/20 animate-pulse",
                        isUpcoming && "border-border text-muted-foreground bg-surface",
                      )}
                    >
                      {isCompleted ? <Check className="size-3.5" /> : i + 1}
                    </div>
                    <p
                      className={cn(
                        "text-[11px] font-medium leading-tight line-clamp-2",
                        isCompleted && "text-foreground",
                        isCurrent && "text-gold font-semibold",
                        isUpcoming && "text-muted-foreground",
                      )}
                    >
                      {stepName}
                    </p>
                    <span className="text-[10px] text-muted-foreground mt-1">
                      {isCompleted ? "Done" : isCurrent ? "Active" : "Pending"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ordered Products */}
          <div>
            <h3 className="text-label uppercase tracking-wider text-xs font-semibold mb-4 text-muted-foreground">
              Items in Order ({order.items.length})
            </h3>
            <ul className="divide-y divide-border border-y border-border">
              {order.items.map((item, idx) => {
                const design = designBySlug(item.designSlug);
                return (
                  <li
                    key={idx}
                    className="grid grid-cols-[72px_minmax(0,1fr)_auto] items-center gap-4 py-4"
                  >
                    <div className="aspect-square border border-border bg-surface">
                      {design && (
                        <Mockup
                          design={design}
                          productId={item.productId}
                          colorValue={item.colorValue}
                        />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-label uppercase text-[10px] tracking-wider text-gold truncate">
                        {item.designName}
                      </p>
                      <p className="text-body-sm font-medium truncate mt-0.5">{item.productName}</p>
                      <p className="text-meta text-muted-foreground mt-0.5">
                        {item.color} {item.size ? `· Size ${item.size}` : ""} · Qty {item.qty}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-price font-medium text-body-sm">
                        {format(item.price * item.qty)}
                      </p>
                      {item.qty > 1 && (
                        <p className="text-meta text-muted-foreground text-[11px]">
                          {format(item.price)} each
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Delivery & Payment Grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="border border-border p-5">
              <p className="text-label uppercase tracking-wider text-xs font-semibold text-muted-foreground flex items-center gap-2 mb-3">
                <MapPin className="size-3.5 text-gold" /> Shipping Address
              </p>
              <address className="text-body-sm not-italic space-y-0.5 text-foreground">
                {order.address.map((line, lIdx) => (
                  <div key={lIdx}>{line}</div>
                ))}
              </address>
              <div className="mt-4 pt-3 border-t border-border/60 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Carrier:</span> {order.carrier}
                <br />
                <span className="font-medium text-foreground">Tracking:</span> {order.tracking}
              </div>
            </div>

            <div className="border border-border p-5">
              <p className="text-label uppercase tracking-wider text-xs font-semibold text-muted-foreground flex items-center gap-2 mb-3">
                <CreditCard className="size-3.5 text-gold" /> Payment Summary
              </p>
              <dl className="space-y-2 text-body-sm">
                <div className="flex justify-between text-muted-foreground">
                  <dt>Subtotal</dt>
                  <dd className="text-foreground">{format(order.subtotal || order.total)}</dd>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <dt>Shipping</dt>
                  <dd className="text-foreground">
                    {order.shippingFee ? format(order.shippingFee) : "Free"}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-border/60 pt-2 font-medium">
                  <dt>Total (incl. VAT)</dt>
                  <dd className="text-price text-base">{format(order.total)}</dd>
                </div>
              </dl>
              <p className="text-meta text-muted-foreground mt-3 pt-2 border-t border-border/60">
                Paid via {order.paymentMethod || "Visa ending in 4218"}
              </p>
            </div>
          </div>

          {/* Customer Support CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border border-border bg-surface-2/60 p-5">
            <div>
              <p className="text-label uppercase tracking-wider text-xs font-semibold">
                Need assistance with this order?
              </p>
              <p className="text-meta text-muted-foreground mt-0.5">
                Our studio concierge is available Monday to Friday for custom queries or changes.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5 shrink-0">
              <Button asChild variant="secondary" size="sm">
                <Link to="/contact">Contact Support</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link to="/faq">View FAQ</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 items-center justify-between border-t border-border px-6 py-4">
          <Button asChild variant="secondary" size="sm">
            <Link to="/orders">Open Tracking Page</Link>
          </Button>
          <Button type="button" size="sm" onClick={onClose}>
            Close Details
          </Button>
        </div>
      </div>
    </div>
  );
}
