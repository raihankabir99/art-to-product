import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Edit2,
  Lock,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Mockup } from "@/components/store/Mockup";
import { Field } from "@/components/store/ui";
import { useStore } from "@/components/store/store";
import { COUNTRIES, findCountry } from "@/lib/countries";
import { designBySlug } from "@/lib/catalog";
import { shippingService } from "@/lib/services/shipping-service";
import { orderService } from "@/lib/services/order-service";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout | Atelier Noir" },
      {
        name: "description",
        content: "Secure checkout. Made-to-order craft with international delivery.",
      },
    ],
  }),
  component: CheckoutPage,
});

const STEPS = ["Information", "Shipping", "Delivery", "Payment", "Review"] as const;

function CheckoutPage() {
  const navigate = useNavigate();
  const {
    cart,
    clearCart,
    cartTotal,
    format,
    region,
    coupon,
    discount,
    applyCoupon,
    clearCoupon,
    couponError,
    user,
  } = useStore();

  const [step, setStep] = useState(0);
  const [promoCodeInput, setPromoCodeInput] = useState("");

  // Step 1: Customer Contact
  const [email, setEmail] = useState(user?.email || "ada@atelier-noir.com");
  const [phone, setPhone] = useState("+31 6 12345678");
  const [createAccount, setCreateAccount] = useState(false);
  const [firstName, setFirstName] = useState(user?.user_metadata?.first_name || "Ada");
  const [lastName, setLastName] = useState(user?.user_metadata?.last_name || "Lindqvist");

  // Step 2: Shipping Address
  const [countryCode, setCountryCode] = useState(
    region.code === "GB" ? "GB" : region.code === "US" ? "US" : "NL",
  );
  const [addressLine1, setAddressLine1] = useState("Keizersgracht 421");
  const [addressLine2, setAddressLine2] = useState("Studio 3B");
  const [city, setCity] = useState("Amsterdam");
  const [stateRegion, setStateRegion] = useState("North Holland");
  const [postalCode, setPostalCode] = useState("1016 EK");
  const [saveAddress, setSaveAddress] = useState(true);

  // Step 3: Delivery Method
  const [deliveryMethodId, setDeliveryMethodId] = useState("standard");

  // Step 4: Payment Section
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "apple_pay" | "google_pay" | "paypal"
  >("card");
  const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");
  const [cardExpiry, setCardExpiry] = useState("08 / 29");
  const [cardCvc, setCardCvc] = useState("884");
  const [cardHolder, setCardHolder] = useState("Ada Lindqvist");
  const [savePayment, setSavePayment] = useState(true);

  // Billing Address toggle
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [billingCountry, setBillingCountry] = useState("NL");
  const [billingAddress, setBillingAddress] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingPostal, setBillingPostal] = useState("");

  // Step 5: Terms Acceptance
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Validation & Submitting state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);

  const selectedCountry = findCountry(countryCode);

  const effectiveBase = Math.max(0, cartTotal - discount);
  const shippingCalculation = shippingService.calculateRates(selectedCountry.name, effectiveBase);
  const selectedDeliveryOption =
    shippingCalculation.options.find((o) => o.id === deliveryMethodId) ||
    shippingCalculation.options[0]!;
  const shippingFee = cart.length === 0 ? 0 : selectedDeliveryOption.priceEur;
  const orderFinalTotal = cart.length === 0 ? 0 : effectiveBase + shippingFee;

  // Step Validation Helpers
  const validateStep = (currentStep: number): boolean => {
    const errs: Record<string, string> = {};

    if (currentStep === 0) {
      if (!email.trim() || !email.includes("@")) {
        errs.email = "Please enter a valid email address.";
      }
      if (!firstName.trim()) {
        errs.firstName = "First name is required.";
      }
      if (!lastName.trim()) {
        errs.lastName = "Last name is required.";
      }
    } else if (currentStep === 1) {
      if (!addressLine1.trim()) {
        errs.addressLine1 = "Please enter your street address.";
      }
      if (!city.trim()) {
        errs.city = "Please enter your city.";
      }
      if (!postalCode.trim()) {
        errs.postalCode = "Please enter a valid postal code.";
      }
    } else if (currentStep === 3 && paymentMethod === "card") {
      if (!cardNumber.trim() || cardNumber.replace(/\s+/g, "").length < 15) {
        errs.cardNumber = "Please enter a valid card number.";
      }
      if (!cardExpiry.trim()) {
        errs.cardExpiry = "Expiry date required.";
      }
      if (!cardCvc.trim() || cardCvc.length < 3) {
        errs.cardCvc = "CVC code required.";
      }
      if (!cardHolder.trim()) {
        errs.cardHolder = "Cardholder name required.";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep((s) => Math.min(STEPS.length - 1, s + 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      toast.error("Please complete the required fields.");
    }
  };

  const handlePlaceOrder = async () => {
    if (!termsAccepted) {
      setErrors((prev) => ({ ...prev, terms: "Please accept the terms to continue." }));
      toast.error("Please accept the Terms & Conditions to place your order.");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate production queuing and local state record
      const fullAddressLines = [addressLine1];
      if (addressLine2.trim()) fullAddressLines.push(addressLine2.trim());

      const res = await orderService.createOrder({
        userId: user?.id,
        customerEmail: email,
        customerFirstName: firstName,
        customerLastName: lastName,
        items: cart,
        couponCode: coupon?.code,
        discountEur: discount,
        shippingMethodId: deliveryMethodId,
        shippingAddress: {
          first_name: firstName,
          last_name: lastName,
          lines: fullAddressLines,
          city,
          postal_code: postalCode,
          country: selectedCountry.name,
        },
        currency: region.currency,
        exchangeRate: region.rate,
      });

      if (res.order) {
        clearCart();
        toast.success("Order placed successfully!");
        navigate({
          to: "/order-confirmation",
          search: { orderId: res.order.order_number },
        });
      } else {
        toast.error(res.error || "Could not process order.");
      }
    } catch {
      toast.error("An error occurred while creating your order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Simplified Checkout Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur-md sticky top-0 z-40">
        <div className="container-page flex h-18 items-center justify-between">
          <Link
            to="/"
            className="text-h3 font-normal tracking-[0.24em] uppercase hover:text-gold transition-colors"
          >
            Atelier Noir
          </Link>

          <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-[0.16em]">
            <Lock className="size-3.5 text-gold" aria-hidden="true" />
            <span className="font-medium text-foreground">Secure Checkout</span>
          </div>
        </div>
      </header>

      {/* Mobile Collapsible Order Summary Bar */}
      <div className="lg:hidden border-b border-border bg-surface/30 px-5 py-3.5">
        <button
          type="button"
          onClick={() => setMobileSummaryOpen(!mobileSummaryOpen)}
          className="flex w-full items-center justify-between text-body-sm font-medium"
          aria-expanded={mobileSummaryOpen}
        >
          <span className="flex items-center gap-2 text-gold">
            <span>Order summary</span>
            {mobileSummaryOpen ? (
              <ChevronUp className="size-4" />
            ) : (
              <ChevronDown className="size-4" />
            )}
          </span>
          <span className="text-price font-semibold">{format(orderFinalTotal)}</span>
        </button>

        {mobileSummaryOpen && (
          <div className="mt-4 border-t border-border/60 pt-4 space-y-4">
            <ul className="divide-y divide-border/60">
              {cart.map((line) => {
                const design = designBySlug(line.designSlug);
                return (
                  <li key={line.id} className="flex items-center gap-3 py-2.5">
                    <div className="size-12 border border-border bg-surface shrink-0">
                      {design && (
                        <Mockup
                          design={design}
                          productId={line.productId}
                          colorValue={line.colorValue}
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1 text-xs">
                      <p className="font-medium truncate">{line.productName}</p>
                      <p className="text-meta text-muted-foreground truncate">
                        {line.designName} · {line.color} · ×{line.qty}
                      </p>
                    </div>
                    <span className="text-price text-xs">{format(line.price * line.qty)}</span>
                  </li>
                );
              })}
            </ul>
            <div className="border-t border-border/60 pt-3 text-xs space-y-1.5">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{format(cartTotal)}</span>
              </div>
              {coupon && (
                <div className="flex justify-between text-gold">
                  <span>Discount ({coupon.code})</span>
                  <span>−{format(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? "Free" : format(shippingFee)}</span>
              </div>
              <div className="flex justify-between font-medium text-foreground pt-1 border-t border-border/40">
                <span>Total</span>
                <span>{format(orderFinalTotal)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <main className="container-page py-10 lg:py-14">
        {cart.length === 0 && !isSubmitting ? (
          <div className="mx-auto max-w-lg py-16 text-center">
            <h2 className="text-h2">Your bag is empty</h2>
            <p className="text-body mt-4 text-muted-foreground">
              Please add pieces to your cart before proceeding to checkout.
            </p>
            <div className="mt-8">
              <Button asChild>
                <Link to="/shop">Explore collection</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
            {/* Left Column: Multi-Step Checkout Flow */}
            <div>
              {/* Progress Indicator */}
              <nav aria-label="Checkout Progress" className="mb-10 border-b border-border pb-6">
                <ol className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs uppercase tracking-[0.14em]">
                  {STEPS.map((s, idx) => {
                    const isCompleted = idx < step;
                    const isCurrent = idx === step;
                    return (
                      <li key={s} className="flex items-center gap-2 sm:gap-4">
                        <button
                          type="button"
                          onClick={() => {
                            if (isCompleted) setStep(idx);
                          }}
                          disabled={!isCompleted}
                          className={cn(
                            "flex items-center gap-2 transition-colors",
                            isCurrent
                              ? "text-gold font-bold"
                              : isCompleted
                                ? "text-foreground hover:text-gold cursor-pointer"
                                : "text-muted-foreground/60 cursor-default",
                          )}
                          aria-current={isCurrent ? "step" : undefined}
                        >
                          <span
                            className={cn(
                              "grid size-6 place-items-center rounded-none border text-[11px]",
                              isCurrent
                                ? "border-gold text-gold bg-gold/10"
                                : isCompleted
                                  ? "border-foreground text-foreground"
                                  : "border-border text-muted-foreground",
                            )}
                          >
                            {isCompleted ? <Check className="size-3" /> : idx + 1}
                          </span>
                          <span className="hidden sm:inline">{s}</span>
                        </button>
                        {idx < STEPS.length - 1 && (
                          <span className="text-muted-foreground/40 select-none">/</span>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </nav>

              {/* Step Forms */}
              <div className="space-y-8">
                {/* STEP 0: CONTACT INFORMATION */}
                {step === 0 && (
                  <fieldset className="space-y-6">
                    <div>
                      <legend className="text-h3">Contact information</legend>
                      <p className="text-meta text-muted-foreground mt-1">
                        We will send order confirmation and tracking updates here.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <Field
                        label="Email address"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                        }}
                        placeholder="ada@atelier-noir.com"
                        required
                        {...(errors.email ? { error: errors.email } : {})}
                      />

                      <Field
                        label="Phone number"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+31 6 12345678"
                      />

                      <label className="flex items-center gap-3 cursor-pointer select-none pt-2">
                        <input
                          type="checkbox"
                          checked={createAccount}
                          onChange={(e) => setCreateAccount(e.target.checked)}
                          className="size-4 border border-input accent-[var(--gold)]"
                        />
                        <span className="text-body-sm text-muted-foreground">
                          Create an account for faster checkout and order tracking
                        </span>
                      </label>
                    </div>

                    <div className="border-t border-border/60 pt-6">
                      <h4 className="text-label text-muted-foreground uppercase mb-4">
                        Customer name
                      </h4>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field
                          label="First name"
                          value={firstName}
                          onChange={(e) => {
                            setFirstName(e.target.value);
                            if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: "" }));
                          }}
                          placeholder="Ada"
                          required
                          {...(errors.firstName ? { error: errors.firstName } : {})}
                        />
                        <Field
                          label="Last name"
                          value={lastName}
                          onChange={(e) => {
                            setLastName(e.target.value);
                            if (errors.lastName) setErrors((prev) => ({ ...prev, lastName: "" }));
                          }}
                          placeholder="Lindqvist"
                          required
                          {...(errors.lastName ? { error: errors.lastName } : {})}
                        />
                      </div>
                    </div>
                  </fieldset>
                )}

                {/* STEP 1: SHIPPING ADDRESS */}
                {step === 1 && (
                  <fieldset className="space-y-6">
                    <div>
                      <legend className="text-h3">Shipping address</legend>
                      <p className="text-meta text-muted-foreground mt-1">
                        Where should our studio deliver your custom made-to-order parcel?
                      </p>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <label
                          htmlFor="country-select"
                          className="text-label text-muted-foreground block mb-2"
                        >
                          Country / Region
                        </label>
                        <select
                          id="country-select"
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="h-12 w-full border border-input bg-background px-4 text-body-sm focus-visible:border-gold focus-visible:outline-none"
                        >
                          {COUNTRIES.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <Field
                        label="Address (street and number)"
                        value={addressLine1}
                        onChange={(e) => {
                          setAddressLine1(e.target.value);
                          if (errors.addressLine1)
                            setErrors((prev) => ({ ...prev, addressLine1: "" }));
                        }}
                        placeholder="Keizersgracht 421"
                        required
                        {...(errors.addressLine1 ? { error: errors.addressLine1 } : {})}
                      />

                      <Field
                        label="Apartment, suite, unit (optional)"
                        value={addressLine2}
                        onChange={(e) => setAddressLine2(e.target.value)}
                        placeholder="Studio 3B"
                      />

                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field
                          label="City"
                          value={city}
                          onChange={(e) => {
                            setCity(e.target.value);
                            if (errors.city) setErrors((prev) => ({ ...prev, city: "" }));
                          }}
                          placeholder="Amsterdam"
                          required
                          {...(errors.city ? { error: errors.city } : {})}
                        />
                        <Field
                          label={selectedCountry.stateLabel || "State / Region"}
                          value={stateRegion}
                          onChange={(e) => setStateRegion(e.target.value)}
                          placeholder="North Holland"
                        />
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field
                          label={selectedCountry.postalLabel || "Postal code"}
                          value={postalCode}
                          onChange={(e) => {
                            setPostalCode(e.target.value);
                            if (errors.postalCode)
                              setErrors((prev) => ({ ...prev, postalCode: "" }));
                          }}
                          placeholder={selectedCountry.defaultPostalPlaceholder}
                          required
                          {...(errors.postalCode ? { error: errors.postalCode } : {})}
                        />
                        <Field
                          label="Delivery phone (optional)"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+31 6 12345678"
                        />
                      </div>

                      <label className="flex items-center gap-3 cursor-pointer select-none pt-2">
                        <input
                          type="checkbox"
                          checked={saveAddress}
                          onChange={(e) => setSaveAddress(e.target.checked)}
                          className="size-4 border border-input accent-[var(--gold)]"
                        />
                        <span className="text-body-sm text-muted-foreground">
                          Save this address for future orders
                        </span>
                      </label>
                    </div>
                  </fieldset>
                )}

                {/* STEP 2: DELIVERY METHOD */}
                {step === 2 && (
                  <fieldset className="space-y-6">
                    <div>
                      <legend className="text-h3">Delivery method</legend>
                      <p className="text-meta text-muted-foreground mt-1">
                        Select your preferred shipping carrier and timeline for{" "}
                        {selectedCountry.name}.
                      </p>
                    </div>

                    <div className="space-y-3.5">
                      {shippingCalculation.options.map((opt) => {
                        const isSelected = deliveryMethodId === opt.id;
                        return (
                          <label
                            key={opt.id}
                            className={cn(
                              "flex cursor-pointer items-center justify-between gap-4 border p-5 transition-colors",
                              isSelected
                                ? "border-gold bg-surface/40"
                                : "border-border hover:border-foreground/40",
                            )}
                          >
                            <div className="flex items-start gap-4">
                              <input
                                type="radio"
                                name="delivery-method"
                                value={opt.id}
                                checked={isSelected}
                                onChange={() => setDeliveryMethodId(opt.id)}
                                className="mt-1 accent-[var(--gold)]"
                              />
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-h4 font-medium">{opt.name}</span>
                                  {opt.priceEur === 0 && (
                                    <span className="text-label bg-gold/10 text-gold px-2 py-0.5 text-[10px] uppercase">
                                      Free
                                    </span>
                                  )}
                                </div>
                                <p className="text-meta mt-1 text-muted-foreground">
                                  {opt.carrier} · Estimated {opt.estimatedTransitDays}
                                </p>
                                <p className="text-meta text-muted-foreground mt-0.5">{opt.note}</p>
                              </div>
                            </div>
                            <span className="text-price font-semibold text-base">
                              {opt.priceEur === 0 ? "Free" : format(opt.priceEur)}
                            </span>
                          </label>
                        );
                      })}
                    </div>

                    <div className="border border-border/60 bg-surface/20 p-4 text-meta text-muted-foreground flex items-center gap-3">
                      <Truck className="size-4 text-gold shrink-0" />
                      <span>
                        All parcels are individually packaged with carbon-neutral transit
                        protection.
                      </span>
                    </div>
                  </fieldset>
                )}

                {/* STEP 3: PAYMENT SECTION */}
                {step === 3 && (
                  <fieldset className="space-y-6">
                    <div>
                      <legend className="text-h3">Payment details</legend>
                      <p className="text-meta text-muted-foreground mt-1">
                        Transactions are encrypted and processed securely.
                      </p>
                    </div>

                    {/* Payment Method Selector Tabs */}
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("card")}
                        className={cn(
                          "flex flex-col items-center justify-center gap-2 border p-4 text-xs uppercase tracking-wider transition-colors",
                          paymentMethod === "card"
                            ? "border-gold bg-surface text-gold font-bold"
                            : "border-border text-muted-foreground hover:text-foreground",
                        )}
                      >
                        <CreditCard className="size-5" />
                        <span>Card</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("apple_pay")}
                        className={cn(
                          "flex flex-col items-center justify-center gap-2 border p-4 text-xs uppercase tracking-wider transition-colors",
                          paymentMethod === "apple_pay"
                            ? "border-gold bg-surface text-gold font-bold"
                            : "border-border text-muted-foreground hover:text-foreground",
                        )}
                      >
                        <span className="text-base font-bold">Pay</span>
                        <span>Apple Pay</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("google_pay")}
                        className={cn(
                          "flex flex-col items-center justify-center gap-2 border p-4 text-xs uppercase tracking-wider transition-colors",
                          paymentMethod === "google_pay"
                            ? "border-gold bg-surface text-gold font-bold"
                            : "border-border text-muted-foreground hover:text-foreground",
                        )}
                      >
                        <span className="text-base font-bold">GPay</span>
                        <span>Google Pay</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("paypal")}
                        className={cn(
                          "flex flex-col items-center justify-center gap-2 border p-4 text-xs uppercase tracking-wider transition-colors",
                          paymentMethod === "paypal"
                            ? "border-gold bg-surface text-gold font-bold"
                            : "border-border text-muted-foreground hover:text-foreground",
                        )}
                      >
                        <span className="text-base font-bold italic">PayPal</span>
                        <span>PayPal</span>
                      </button>
                    </div>

                    {paymentMethod === "card" ? (
                      <div className="border border-border p-5 space-y-4 bg-surface/30">
                        <Field
                          label="Card number"
                          value={cardNumber}
                          onChange={(e) => {
                            setCardNumber(e.target.value);
                            if (errors.cardNumber)
                              setErrors((prev) => ({ ...prev, cardNumber: "" }));
                          }}
                          placeholder="4242 4242 4242 4242"
                          inputMode="numeric"
                          required
                          {...(errors.cardNumber ? { error: errors.cardNumber } : {})}
                        />

                        <div className="grid gap-4 sm:grid-cols-2">
                          <Field
                            label="Expiration date"
                            value={cardExpiry}
                            onChange={(e) => {
                              setCardExpiry(e.target.value);
                              if (errors.cardExpiry)
                                setErrors((prev) => ({ ...prev, cardExpiry: "" }));
                            }}
                            placeholder="MM / YY"
                            required
                            {...(errors.cardExpiry ? { error: errors.cardExpiry } : {})}
                          />
                          <Field
                            label="Security code (CVC)"
                            value={cardCvc}
                            onChange={(e) => {
                              setCardCvc(e.target.value);
                              if (errors.cardCvc) setErrors((prev) => ({ ...prev, cardCvc: "" }));
                            }}
                            placeholder="123"
                            inputMode="numeric"
                            required
                            {...(errors.cardCvc ? { error: errors.cardCvc } : {})}
                          />
                        </div>

                        <Field
                          label="Cardholder name"
                          value={cardHolder}
                          onChange={(e) => {
                            setCardHolder(e.target.value);
                            if (errors.cardHolder)
                              setErrors((prev) => ({ ...prev, cardHolder: "" }));
                          }}
                          placeholder="Ada Lindqvist"
                          required
                          {...(errors.cardHolder ? { error: errors.cardHolder } : {})}
                        />

                        <label className="flex items-center gap-3 cursor-pointer select-none pt-2">
                          <input
                            type="checkbox"
                            checked={savePayment}
                            onChange={(e) => setSavePayment(e.target.checked)}
                            className="size-4 border border-input accent-[var(--gold)]"
                          />
                          <span className="text-body-sm text-muted-foreground">
                            Save payment method for future orders
                          </span>
                        </label>
                      </div>
                    ) : (
                      <div className="border border-border p-6 text-center space-y-2 bg-surface/30">
                        <p className="text-body font-medium capitalize">
                          {paymentMethod.replace("_", " ")} selected
                        </p>
                        <p className="text-meta text-muted-foreground">
                          You will be prompted to authenticate with{" "}
                          {paymentMethod.replace("_", " ")} upon placing your order.
                        </p>
                      </div>
                    )}

                    {/* Subtle Security Notice */}
                    <div className="flex items-center gap-2 text-meta text-muted-foreground pt-1">
                      <ShieldCheck className="size-4 text-gold shrink-0" />
                      <span>
                        Secure 256-bit encryption. Your card details are never stored unencrypted.
                      </span>
                    </div>

                    {/* Billing Address Section */}
                    <div className="border-t border-border pt-6 space-y-4">
                      <h4 className="text-label uppercase tracking-wider">Billing address</h4>
                      <label className="flex items-center gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={sameAsShipping}
                          onChange={(e) => setSameAsShipping(e.target.checked)}
                          className="size-4 border border-input accent-[var(--gold)]"
                        />
                        <span className="text-body-sm">Same as shipping address</span>
                      </label>

                      {!sameAsShipping && (
                        <div className="border border-border p-5 space-y-4 bg-surface/20 mt-4">
                          <div>
                            <label
                              htmlFor="billing-country"
                              className="text-label text-muted-foreground block mb-2"
                            >
                              Country
                            </label>
                            <select
                              id="billing-country"
                              value={billingCountry}
                              onChange={(e) => setBillingCountry(e.target.value)}
                              className="h-12 w-full border border-input bg-background px-4 text-body-sm"
                            >
                              {COUNTRIES.map((c) => (
                                <option key={c.code} value={c.code}>
                                  {c.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <Field
                            label="Billing Street Address"
                            value={billingAddress}
                            onChange={(e) => setBillingAddress(e.target.value)}
                            placeholder="Street and number"
                          />
                          <div className="grid gap-4 sm:grid-cols-2">
                            <Field
                              label="City"
                              value={billingCity}
                              onChange={(e) => setBillingCity(e.target.value)}
                              placeholder="City"
                            />
                            <Field
                              label="Postal Code"
                              value={billingPostal}
                              onChange={(e) => setBillingPostal(e.target.value)}
                              placeholder="Postal code"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </fieldset>
                )}

                {/* STEP 4: ORDER REVIEW */}
                {step === 4 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-h3">Review your order</h3>
                      <p className="text-meta text-muted-foreground mt-1">
                        Please review your details before placing your order.
                      </p>
                    </div>

                    {/* Summary Review Cards */}
                    <div className="divide-y divide-border border border-border bg-surface/30">
                      {/* Contact Review */}
                      <div className="flex items-start justify-between p-5">
                        <div>
                          <p className="text-label text-muted-foreground uppercase text-[11px]">
                            Contact
                          </p>
                          <p className="text-body font-medium mt-1">
                            {firstName} {lastName}
                          </p>
                          <p className="text-meta text-muted-foreground">
                            {email} · {phone}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setStep(0)}
                          className="text-label link-underline flex items-center gap-1 text-gold"
                        >
                          <Edit2 className="size-3" /> Edit
                        </button>
                      </div>

                      {/* Shipping Address Review */}
                      <div className="flex items-start justify-between p-5">
                        <div>
                          <p className="text-label text-muted-foreground uppercase text-[11px]">
                            Ship to
                          </p>
                          <p className="text-body font-medium mt-1">
                            {addressLine1} {addressLine2}
                          </p>
                          <p className="text-meta text-muted-foreground">
                            {city}, {postalCode} · {selectedCountry.name}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="text-label link-underline flex items-center gap-1 text-gold"
                        >
                          <Edit2 className="size-3" /> Edit
                        </button>
                      </div>

                      {/* Delivery Review */}
                      <div className="flex items-start justify-between p-5">
                        <div>
                          <p className="text-label text-muted-foreground uppercase text-[11px]">
                            Delivery method
                          </p>
                          <p className="text-body font-medium mt-1">
                            {selectedDeliveryOption.name}
                          </p>
                          <p className="text-meta text-muted-foreground">
                            {selectedDeliveryOption.carrier} ·{" "}
                            {selectedDeliveryOption.estimatedTransitDays} (
                            {shippingFee === 0 ? "Free" : format(shippingFee)})
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="text-label link-underline flex items-center gap-1 text-gold"
                        >
                          <Edit2 className="size-3" /> Edit
                        </button>
                      </div>

                      {/* Payment Review */}
                      <div className="flex items-start justify-between p-5">
                        <div>
                          <p className="text-label text-muted-foreground uppercase text-[11px]">
                            Payment
                          </p>
                          <p className="text-body font-medium mt-1">
                            {paymentMethod === "card"
                              ? `Card ending in •••• ${cardNumber.slice(-4)}`
                              : paymentMethod.replace("_", " ")}
                          </p>
                          <p className="text-meta text-muted-foreground">
                            Billing:{" "}
                            {sameAsShipping
                              ? "Same as shipping address"
                              : `${billingAddress}, ${billingCity}`}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setStep(3)}
                          className="text-label link-underline flex items-center gap-1 text-gold"
                        >
                          <Edit2 className="size-3" /> Edit
                        </button>
                      </div>
                    </div>

                    {/* Terms Acceptance Checkbox */}
                    <div className="border border-border p-5 space-y-3 bg-surface/10">
                      <label className="flex items-start gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={termsAccepted}
                          onChange={(e) => {
                            setTermsAccepted(e.target.checked);
                            if (errors.terms) setErrors((prev) => ({ ...prev, terms: "" }));
                          }}
                          className="mt-1 size-4 border border-input accent-[var(--gold)] shrink-0"
                        />
                        <span className="text-body-sm text-muted-foreground">
                          I agree to the{" "}
                          <Link
                            to="/help/terms"
                            className="text-foreground underline hover:text-gold"
                            target="_blank"
                          >
                            Terms & Conditions
                          </Link>{" "}
                          and acknowledge the{" "}
                          <Link
                            to="/help/privacy"
                            className="text-foreground underline hover:text-gold"
                            target="_blank"
                          >
                            Privacy Policy
                          </Link>
                          . Every piece is crafted on demand for you.
                        </span>
                      </label>
                      {errors.terms && (
                        <p className="text-meta text-destructive" role="alert">
                          {errors.terms}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Bottom Step Actions */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
                  {step > 0 ? (
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setStep((s) => s - 1)}
                      className="inline-flex items-center gap-2"
                    >
                      <ArrowLeft className="size-3.5" /> Back to {STEPS[step - 1]}
                    </Button>
                  ) : (
                    <Button asChild variant="secondary">
                      <Link to="/cart" className="inline-flex items-center gap-2">
                        <ArrowLeft className="size-3.5" /> Return to bag
                      </Link>
                    </Button>
                  )}

                  {step < STEPS.length - 1 ? (
                    <Button type="button" onClick={handleNextStep} className="px-8">
                      Continue to {STEPS[step + 1]}
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={handlePlaceOrder}
                      disabled={!termsAccepted || isSubmitting}
                      loading={isSubmitting}
                      className="px-8 font-semibold tracking-wider uppercase h-13"
                    >
                      {isSubmitting
                        ? "Processing order..."
                        : `Place order · ${format(orderFinalTotal)}`}
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Desktop Order Summary */}
            <aside className="hidden lg:block h-fit border border-border bg-surface/30 p-6 lg:sticky lg:top-28">
              <h2 className="text-label tracking-[0.16em] uppercase">Order summary</h2>

              <ul className="mt-6 space-y-4 border-b border-border pb-6 max-h-[380px] overflow-y-auto">
                {cart.map((line, idx) => {
                  const design = designBySlug(line.designSlug);
                  const sameDesignCount = cart.filter(
                    (c) => c.designSlug === line.designSlug,
                  ).length;
                  const isFirstOfDesign =
                    cart.findIndex((c) => c.designSlug === line.designSlug) === idx;

                  return (
                    <li key={line.id} className="space-y-2">
                      {isFirstOfDesign && sameDesignCount > 1 && (
                        <div className="flex items-center justify-between bg-surface/80 border border-border/80 px-2.5 py-1 text-[10px] uppercase tracking-wider text-gold">
                          <span>Design: {line.designName}</span>
                          <span className="text-muted-foreground">{sameDesignCount} in cart</span>
                        </div>
                      )}
                      <div className="grid grid-cols-[64px_minmax(0,1fr)_auto] items-center gap-4">
                        <div className="aspect-square border border-border bg-surface">
                          {design && (
                            <Mockup
                              design={design}
                              productId={line.productId}
                              colorValue={line.colorValue}
                            />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-body-sm font-medium truncate">{line.productName}</p>
                          <p className="text-meta text-gold truncate text-[11px] uppercase tracking-wider">
                            {line.designName}
                          </p>
                          <p className="text-meta text-muted-foreground mt-0.5">
                            {line.color}
                            {line.size ? ` · ${line.size}` : ""} · ×{line.qty}
                          </p>
                        </div>
                        <span className="text-price text-body-sm font-medium">
                          {format(line.price * line.qty)}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Promo Code Input in Checkout */}
              <div className="mt-5 border-b border-border/60 pb-5">
                <p className="text-label mb-2 uppercase text-[11px] text-muted-foreground">
                  Promo code
                </p>
                {coupon ? (
                  <div className="flex items-center justify-between border border-border bg-surface p-2.5 text-xs">
                    <div className="flex items-center gap-2">
                      <Check className="size-3.5 text-gold" />
                      <span className="text-label text-gold font-bold">{coupon.code}</span>
                      <span className="text-muted-foreground text-[11px]">({coupon.label})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        clearCoupon();
                        toast("Promo code removed");
                      }}
                      className="text-label link-underline text-[11px] text-muted-foreground hover:text-foreground"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCodeInput}
                        onChange={(e) => setPromoCodeInput(e.target.value)}
                        placeholder="SUMMER10"
                        aria-label="Enter promo code"
                        className="h-10 w-full border border-input bg-transparent px-3 text-xs uppercase tracking-wider placeholder:normal-case placeholder:tracking-normal placeholder:text-muted-foreground focus-visible:border-gold focus-visible:outline-none"
                      />
                      <Button
                        type="button"
                        variant="secondary"
                        className="h-10 px-4 text-xs uppercase tracking-wider"
                        onClick={() => {
                          if (!promoCodeInput.trim()) return;
                          const ok = applyCoupon(promoCodeInput);
                          if (ok) {
                            toast.success(`${promoCodeInput.toUpperCase()} applied`);
                            setPromoCodeInput("");
                          } else {
                            toast.error(couponError || "Invalid promo code");
                          }
                        }}
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <dl className="mt-5 space-y-3 text-body-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd className="text-price font-medium">{format(cartTotal)}</dd>
                </div>

                {coupon && (
                  <div className="flex justify-between text-gold">
                    <dt>Discount ({coupon.code})</dt>
                    <dd className="text-price font-medium">−{format(discount)}</dd>
                  </div>
                )}

                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Shipping</dt>
                  <dd className="text-price">
                    {shippingFee === 0 ? (
                      <span className="text-gold">Free</span>
                    ) : (
                      format(shippingFee)
                    )}
                  </dd>
                </div>

                <div className="flex justify-between border-b border-border/60 pb-3">
                  <dt className="text-muted-foreground">Duties / VAT</dt>
                  <dd className="text-meta text-muted-foreground">
                    {selectedCountry.regionCode === "EU" ? "VAT included" : "Calculated upon entry"}
                  </dd>
                </div>

                <div className="flex items-baseline justify-between pt-2">
                  <dt className="text-label uppercase">Total</dt>
                  <dd className="text-price text-xl font-bold text-foreground">
                    {format(orderFinalTotal)}
                  </dd>
                </div>
              </dl>

              {/* Trust Badges */}
              <div className="mt-6 border-t border-border pt-5 space-y-2 text-[11px] text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Lock className="size-3.5 text-gold shrink-0" />
                  <span>256-Bit SSL Encrypted & PCI Compliant</span>
                </p>
                <p className="flex items-center gap-2">
                  <ShieldCheck className="size-3.5 text-gold shrink-0" />
                  <span>Studio Made-to-Order Quality Control</span>
                </p>
                <p className="flex items-center gap-2">
                  <Truck className="size-3.5 text-gold shrink-0" />
                  <span>Carbon-Neutral Worldwide Delivery</span>
                </p>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
