import { useState } from "react";
import { Overlay } from "./ui";
import { Badge } from "@/components/ui/badge";
import type { ProductType } from "@/lib/catalog";

type Unit = "cm" | "in";
type GuideTab = "tshirt" | "hoodie" | "kids" | "dimensions";

const TSHIRT_ROWS: {
  size: string;
  chestCm: string;
  lengthCm: string;
  sleeveCm: string;
  chestIn: string;
  lengthIn: string;
  sleeveIn: string;
}[] = [
  {
    size: "XS",
    chestCm: "48",
    lengthCm: "68",
    sleeveCm: "20",
    chestIn: "18.9",
    lengthIn: "26.8",
    sleeveIn: "7.9",
  },
  {
    size: "S",
    chestCm: "51",
    lengthCm: "70",
    sleeveCm: "21",
    chestIn: "20.1",
    lengthIn: "27.6",
    sleeveIn: "8.3",
  },
  {
    size: "M",
    chestCm: "54",
    lengthCm: "72",
    sleeveCm: "22",
    chestIn: "21.3",
    lengthIn: "28.3",
    sleeveIn: "8.7",
  },
  {
    size: "L",
    chestCm: "57",
    lengthCm: "74",
    sleeveCm: "23",
    chestIn: "22.4",
    lengthIn: "29.1",
    sleeveIn: "9.1",
  },
  {
    size: "XL",
    chestCm: "60",
    lengthCm: "76",
    sleeveCm: "24",
    chestIn: "23.6",
    lengthIn: "29.9",
    sleeveIn: "9.4",
  },
  {
    size: "XXL",
    chestCm: "64",
    lengthCm: "78",
    sleeveCm: "25",
    chestIn: "25.2",
    lengthIn: "30.7",
    sleeveIn: "9.8",
  },
  {
    size: "3XL",
    chestCm: "68",
    lengthCm: "80",
    sleeveCm: "26",
    chestIn: "26.8",
    lengthIn: "31.5",
    sleeveIn: "10.2",
  },
];

const HOODIE_ROWS: {
  size: string;
  chestCm: string;
  lengthCm: string;
  sleeveCm: string;
  chestIn: string;
  lengthIn: string;
  sleeveIn: string;
}[] = [
  {
    size: "XS",
    chestCm: "52",
    lengthCm: "66",
    sleeveCm: "62",
    chestIn: "20.5",
    lengthIn: "26.0",
    sleeveIn: "24.4",
  },
  {
    size: "S",
    chestCm: "55",
    lengthCm: "69",
    sleeveCm: "64",
    chestIn: "21.7",
    lengthIn: "27.2",
    sleeveIn: "25.2",
  },
  {
    size: "M",
    chestCm: "58",
    lengthCm: "72",
    sleeveCm: "66",
    chestIn: "22.8",
    lengthIn: "28.3",
    sleeveIn: "26.0",
  },
  {
    size: "L",
    chestCm: "61",
    lengthCm: "74",
    sleeveCm: "68",
    chestIn: "24.0",
    lengthIn: "29.1",
    sleeveIn: "26.8",
  },
  {
    size: "XL",
    chestCm: "65",
    lengthCm: "76",
    sleeveCm: "70",
    chestIn: "25.6",
    lengthIn: "29.9",
    sleeveIn: "27.6",
  },
  {
    size: "XXL",
    chestCm: "69",
    lengthCm: "78",
    sleeveCm: "72",
    chestIn: "27.2",
    lengthIn: "30.7",
    sleeveIn: "28.3",
  },
  {
    size: "3XL",
    chestCm: "73",
    lengthCm: "80",
    sleeveCm: "74",
    chestIn: "28.7",
    lengthIn: "31.5",
    sleeveIn: "29.1",
  },
];

const KIDS_ROWS: {
  size: string;
  age: string;
  chestCm: string;
  lengthCm: string;
  chestIn: string;
  lengthIn: string;
}[] = [
  { size: "2Y", age: "1–2 Yrs", chestCm: "31", lengthCm: "40", chestIn: "12.2", lengthIn: "15.7" },
  { size: "4Y", age: "3–4 Yrs", chestCm: "33", lengthCm: "44", chestIn: "13.0", lengthIn: "17.3" },
  { size: "6Y", age: "5–6 Yrs", chestCm: "35", lengthCm: "48", chestIn: "13.8", lengthIn: "18.9" },
  { size: "8Y", age: "7–8 Yrs", chestCm: "38", lengthCm: "53", chestIn: "15.0", lengthIn: "20.9" },
  {
    size: "10Y",
    age: "9–10 Yrs",
    chestCm: "40",
    lengthCm: "57",
    chestIn: "15.7",
    lengthIn: "22.4",
  },
];

export function SizeGuide({
  open,
  onClose,
  type,
}: {
  open: boolean;
  onClose: () => void;
  type: ProductType;
}) {
  const [unit, setUnit] = useState<Unit>("cm");

  const initialTab = (): GuideTab => {
    if (type.id === "hoodie" || type.id === "sweatshirt") return "hoodie";
    if (type.category === "Kids") return "kids";
    if (type.surface !== "apparel") return "dimensions";
    return "tshirt";
  };

  const [activeTab, setActiveTab] = useState<GuideTab>(initialTab);

  return (
    <Overlay open={open} onClose={onClose} title="Size & Dimension Guide" side="center">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <p className="text-h3">{type.name}</p>
            <p className="text-body-sm text-muted-foreground mt-1">
              Garments laid flat. Allow 1–2cm (0.5") tolerance due to artisan garment-dyeing &
              custom DTG finishing.
            </p>
          </div>

          {/* Unit Toggle */}
          <div className="flex items-center gap-1 border border-border p-1">
            <button
              type="button"
              onClick={() => setUnit("cm")}
              className={`text-label px-3 py-1 text-xs transition-colors ${
                unit === "cm"
                  ? "bg-foreground text-background font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Metric (CM)
            </button>
            <button
              type="button"
              onClick={() => setUnit("in")}
              className={`text-label px-3 py-1 text-xs transition-colors ${
                unit === "in"
                  ? "bg-foreground text-background font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Imperial (INCH)
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 overflow-x-auto border-b border-border pb-2 no-scrollbar">
          {[
            { id: "tshirt", label: "T-Shirts" },
            { id: "hoodie", label: "Hoodies & Sweats" },
            { id: "kids", label: "Kids & Baby" },
            { id: "dimensions", label: "Objects & Formats" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as GuideTab)}
              className={`text-label whitespace-nowrap px-4 py-2 border transition-colors ${
                activeTab === tab.id
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tables Content */}
        {activeTab === "tshirt" && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[32rem] border-collapse">
              <caption className="sr-only">T-Shirt size measurements</caption>
              <thead>
                <tr className="border-b border-border-strong text-left">
                  <th scope="col" className="text-label py-3 text-muted-foreground">
                    Size
                  </th>
                  <th scope="col" className="text-label py-3 text-muted-foreground">
                    Half-Chest ({unit})
                  </th>
                  <th scope="col" className="text-label py-3 text-muted-foreground">
                    Body Length ({unit})
                  </th>
                  <th scope="col" className="text-label py-3 text-muted-foreground">
                    Sleeve ({unit})
                  </th>
                </tr>
              </thead>
              <tbody>
                {TSHIRT_ROWS.map((r) => (
                  <tr
                    key={r.size}
                    className="border-b border-border hover:bg-surface/50 transition-colors"
                  >
                    <th scope="row" className="text-h4 py-3 text-left font-medium">
                      {r.size}
                    </th>
                    <td className="text-body-sm py-3 tabular-nums text-muted-foreground">
                      {unit === "cm" ? r.chestCm : r.chestIn}
                    </td>
                    <td className="text-body-sm py-3 tabular-nums text-muted-foreground">
                      {unit === "cm" ? r.lengthCm : r.lengthIn}
                    </td>
                    <td className="text-body-sm py-3 tabular-nums text-muted-foreground">
                      {unit === "cm" ? r.sleeveCm : r.sleeveIn}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "hoodie" && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[32rem] border-collapse">
              <caption className="sr-only">Hoodie & Sweatshirt size measurements</caption>
              <thead>
                <tr className="border-b border-border-strong text-left">
                  <th scope="col" className="text-label py-3 text-muted-foreground">
                    Size
                  </th>
                  <th scope="col" className="text-label py-3 text-muted-foreground">
                    Half-Chest ({unit})
                  </th>
                  <th scope="col" className="text-label py-3 text-muted-foreground">
                    Body Length ({unit})
                  </th>
                  <th scope="col" className="text-label py-3 text-muted-foreground">
                    Sleeve Length ({unit})
                  </th>
                </tr>
              </thead>
              <tbody>
                {HOODIE_ROWS.map((r) => (
                  <tr
                    key={r.size}
                    className="border-b border-border hover:bg-surface/50 transition-colors"
                  >
                    <th scope="row" className="text-h4 py-3 text-left font-medium">
                      {r.size}
                    </th>
                    <td className="text-body-sm py-3 tabular-nums text-muted-foreground">
                      {unit === "cm" ? r.chestCm : r.chestIn}
                    </td>
                    <td className="text-body-sm py-3 tabular-nums text-muted-foreground">
                      {unit === "cm" ? r.lengthCm : r.lengthIn}
                    </td>
                    <td className="text-body-sm py-3 tabular-nums text-muted-foreground">
                      {unit === "cm" ? r.sleeveCm : r.sleeveIn}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "kids" && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[32rem] border-collapse">
              <caption className="sr-only">Kids & Baby size measurements</caption>
              <thead>
                <tr className="border-b border-border-strong text-left">
                  <th scope="col" className="text-label py-3 text-muted-foreground">
                    Size
                  </th>
                  <th scope="col" className="text-label py-3 text-muted-foreground">
                    Approx. Age
                  </th>
                  <th scope="col" className="text-label py-3 text-muted-foreground">
                    Half-Chest ({unit})
                  </th>
                  <th scope="col" className="text-label py-3 text-muted-foreground">
                    Length ({unit})
                  </th>
                </tr>
              </thead>
              <tbody>
                {KIDS_ROWS.map((r) => (
                  <tr
                    key={r.size}
                    className="border-b border-border hover:bg-surface/50 transition-colors"
                  >
                    <th scope="row" className="text-h4 py-3 text-left font-medium">
                      {r.size}
                    </th>
                    <td className="text-body-sm py-3 text-muted-foreground">{r.age}</td>
                    <td className="text-body-sm py-3 tabular-nums text-muted-foreground">
                      {unit === "cm" ? r.chestCm : r.chestIn}
                    </td>
                    <td className="text-body-sm py-3 tabular-nums text-muted-foreground">
                      {unit === "cm" ? r.lengthCm : r.lengthIn}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "dimensions" && (
          <div className="space-y-4">
            <div className="border border-border p-4">
              <p className="text-label text-gold">Posters & Fine Art Prints</p>
              <p className="text-body-sm mt-2 text-muted-foreground">
                A4 (210 × 297mm) · A3 (297 × 420mm) · A2 (420 × 594mm) · A1 (594 × 841mm). Printed
                on 240gsm matte archival stock.
              </p>
            </div>
            <div className="border border-border p-4">
              <p className="text-label text-gold">Canvas Tote Bag & Cushions</p>
              <p className="text-body-sm mt-2 text-muted-foreground">
                Tote: 38cm × 42cm with 65cm reinforced handles. Cushion: 45cm × 45cm with concealed
                zipper and soft polyester insert.
              </p>
            </div>
            <div className="border border-border p-4">
              <p className="text-label text-gold">Stoneware Mug & Drinkware</p>
              <p className="text-body-sm mt-2 text-muted-foreground">
                11 oz (325ml) capacity. 9.5cm height × 8.2cm diameter. Dishwasher & microwave safe.
              </p>
            </div>
          </div>
        )}

        {/* Guidance Blocks */}
        <div className="grid gap-4 sm:grid-cols-2 pt-2">
          <div className="border border-border p-5 bg-surface/50">
            <p className="text-label text-foreground flex items-center gap-2">
              <Badge variant="outline" className="text-gold border-gold/40">
                1
              </Badge>{" "}
              How to Measure
            </p>
            <p className="text-body-sm mt-3 text-muted-foreground">
              Lay an existing favourite garment flat. Measure horizontally 2.5cm (1 inch) below the
              armhole seam for Half-Chest, and from the highest point of the shoulder down for Total
              Length.
            </p>
          </div>
          <div className="border border-border p-5 bg-surface/50">
            <p className="text-label text-foreground flex items-center gap-2">
              <Badge variant="outline" className="text-gold border-gold/40">
                2
              </Badge>{" "}
              Fit & Cut Advice
            </p>
            <p className="text-body-sm mt-3 text-muted-foreground">
              Atelier Mono garments are cut in a relaxed contemporary boxy silhouette. Size down for
              a tailored look, or take your regular size for an effortless drape.
            </p>
          </div>
        </div>
      </div>
    </Overlay>
  );
}
