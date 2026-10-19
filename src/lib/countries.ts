export interface CountryOption {
  code: string;
  name: string;
  regionCode: string;
  defaultPostalPlaceholder: string;
  postalLabel: string;
  stateLabel?: string;
}

export const COUNTRIES: CountryOption[] = [
  {
    code: "DE",
    name: "Germany",
    regionCode: "EU",
    defaultPostalPlaceholder: "10115",
    postalLabel: "Postal code",
  },
  {
    code: "FR",
    name: "France",
    regionCode: "EU",
    defaultPostalPlaceholder: "75001",
    postalLabel: "Postal code",
  },
  {
    code: "NL",
    name: "Netherlands",
    regionCode: "EU",
    defaultPostalPlaceholder: "1016 HD",
    postalLabel: "Postal code",
  },
  {
    code: "IT",
    name: "Italy",
    regionCode: "EU",
    defaultPostalPlaceholder: "00187",
    postalLabel: "CAP",
  },
  {
    code: "ES",
    name: "Spain",
    regionCode: "EU",
    defaultPostalPlaceholder: "28001",
    postalLabel: "Código postal",
  },
  {
    code: "BE",
    name: "Belgium",
    regionCode: "EU",
    defaultPostalPlaceholder: "1000",
    postalLabel: "Postal code",
  },
  {
    code: "SE",
    name: "Sweden",
    regionCode: "EU",
    defaultPostalPlaceholder: "111 22",
    postalLabel: "Postnummer",
  },
  {
    code: "DK",
    name: "Denmark",
    regionCode: "EU",
    defaultPostalPlaceholder: "1050",
    postalLabel: "Postnummer",
  },
  {
    code: "AT",
    name: "Austria",
    regionCode: "EU",
    defaultPostalPlaceholder: "1010",
    postalLabel: "PLZ",
  },
  {
    code: "IE",
    name: "Ireland",
    regionCode: "EU",
    defaultPostalPlaceholder: "D02 X285",
    postalLabel: "Eircode",
  },
  {
    code: "PT",
    name: "Portugal",
    regionCode: "EU",
    defaultPostalPlaceholder: "1100-001",
    postalLabel: "Código postal",
  },
  {
    code: "PL",
    name: "Poland",
    regionCode: "EU",
    defaultPostalPlaceholder: "00-001",
    postalLabel: "Kod pocztowy",
  },
  {
    code: "GB",
    name: "United Kingdom",
    regionCode: "GB",
    defaultPostalPlaceholder: "EC1A 1BB",
    postalLabel: "Postcode",
  },
  {
    code: "CH",
    name: "Switzerland",
    regionCode: "CH",
    defaultPostalPlaceholder: "8001",
    postalLabel: "PLZ",
  },
  {
    code: "NO",
    name: "Norway",
    regionCode: "NO",
    defaultPostalPlaceholder: "0150",
    postalLabel: "Postnummer",
  },
  {
    code: "US",
    name: "United States",
    regionCode: "US",
    defaultPostalPlaceholder: "10001",
    postalLabel: "ZIP code",
    stateLabel: "State",
  },
  {
    code: "CA",
    name: "Canada",
    regionCode: "CA",
    defaultPostalPlaceholder: "M5V 2T6",
    postalLabel: "Postal code",
    stateLabel: "Province",
  },
  {
    code: "SA",
    name: "Saudi Arabia",
    regionCode: "SA",
    defaultPostalPlaceholder: "12211",
    postalLabel: "Postal code",
    stateLabel: "Province / Region",
  },
  {
    code: "AE",
    name: "United Arab Emirates",
    regionCode: "SA",
    defaultPostalPlaceholder: "00000",
    postalLabel: "PO Box / Code",
    stateLabel: "Emirate",
  },
  {
    code: "AU",
    name: "Australia",
    regionCode: "EU",
    defaultPostalPlaceholder: "2000",
    postalLabel: "Postcode",
    stateLabel: "State",
  },
  {
    code: "JP",
    name: "Japan",
    regionCode: "EU",
    defaultPostalPlaceholder: "100-0001",
    postalLabel: "Postal code",
    stateLabel: "Prefecture",
  },
  {
    code: "BD",
    name: "Bangladesh",
    regionCode: "BD",
    defaultPostalPlaceholder: "1212",
    postalLabel: "Postal code",
    stateLabel: "Division / City",
  },
];

export function findCountry(codeOrName: string): CountryOption {
  const query = codeOrName.trim().toLowerCase();
  const match = COUNTRIES.find(
    (c) => c.code.toLowerCase() === query || c.name.toLowerCase() === query,
  );
  return match || COUNTRIES[0]!;
}
