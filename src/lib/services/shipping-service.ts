import { REGIONS, type Region } from "../catalog";

export interface ShippingRateOption {
  id: string;
  name: string;
  note: string;
  carrier: string;
  priceEur: number;
  estimatedTransitDays: string;
  freeThresholdEur?: number;
}

export interface ShippingCalculationResult {
  region: Region;
  classification: "INTERNAL SHIPPING CALCULATION";
  standardShippingEur: number;
  expressShippingEur: number;
  qualifiesForFreeStandard: boolean;
  freeShippingThresholdEur: number;
  estimatedDelivery: string;
  taxNote: string;
  carrier: string;
  options: ShippingRateOption[];
}

export const shippingService = {
  getRegion(countryOrCode: string): Region {
    const found = REGIONS.find(
      (r) =>
        r.code.toUpperCase() === countryOrCode.toUpperCase() ||
        r.country.toLowerCase() === countryOrCode.toLowerCase(),
    );
    return found || REGIONS[0]!;
  },

  calculateRates(countryOrCode: string, subtotalEur: number): ShippingCalculationResult {
    const region = this.getRegion(countryOrCode);
    const freeShippingThresholdEur = 80;
    const qualifiesForFreeStandard = subtotalEur >= freeShippingThresholdEur;

    let carrier = "DHL Express";
    if (region.code === "UK") carrier = "Royal Mail Tracked";
    else if (region.code === "US" || region.code === "CA") carrier = "FedEx International";
    else if (region.code === "SA") carrier = "Aramex / DHL";
    else if (region.code === "BD") carrier = "DHL International";
    else if (region.code === "EU") carrier = "PostNL / DHL";

    const standardPrice = qualifiesForFreeStandard ? 0 : 6.9;
    const expressPrice = 14.9;

    const options: ShippingRateOption[] = [
      {
        id: "standard",
        name: "Standard Delivery",
        note: "Tracked, carbon-offset made-to-order dispatch",
        carrier,
        priceEur: standardPrice,
        estimatedTransitDays: region.delivery,
        freeThresholdEur: freeShippingThresholdEur,
      },
      {
        id: "express",
        name: "Express Courier",
        note: "Priority studio production & direct air courier",
        carrier,
        priceEur: expressPrice,
        estimatedTransitDays: "2–4 working days",
      },
    ];

    return {
      region,
      classification: "INTERNAL SHIPPING CALCULATION",
      standardShippingEur: standardPrice,
      expressShippingEur: expressPrice,
      qualifiesForFreeStandard,
      freeShippingThresholdEur,
      estimatedDelivery: region.delivery,
      taxNote: region.taxNote,
      carrier,
      options,
    };
  },
};
