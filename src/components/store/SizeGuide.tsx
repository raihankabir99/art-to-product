import { Overlay } from "./ui";
import type { ProductType } from "@/lib/catalog";

const APPAREL_ROWS: [string, string, string, string][] = [
  ["XS", "46", "66", "60"],
  ["S", "51", "69", "63"],
  ["M", "56", "72", "66"],
  ["L", "61", "74", "68"],
  ["XL", "66", "76", "70"],
  ["XXL", "71", "78", "72"],
];

const KIDS_ROWS: [string, string, string, string][] = [
  ["2Y", "31", "40", "24"],
  ["4Y", "33", "44", "26"],
  ["6Y", "35", "48", "29"],
  ["8Y", "38", "53", "32"],
  ["10Y", "40", "57", "35"],
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
  const kids = type.category === "Kids";
  const rows = kids ? KIDS_ROWS : APPAREL_ROWS;
  const apparel = type.surface === "apparel" && !!type.sizes;

  return (
    <Overlay open={open} onClose={onClose} title="Size guide" side="center">
      <p className="text-h3">{type.name}</p>
      <p className="text-body mt-3 text-muted-foreground">
        Measurements are of the garment laid flat, in centimetres. Allow 1–2cm tolerance — every
        piece is cut and printed to order.
      </p>

      {apparel ? (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[30rem] border-collapse">
            <caption className="sr-only">{type.name} measurements in centimetres</caption>
            <thead>
              <tr className="border-b border-border-strong">
                {["Size", "Chest (½)", "Length", "Sleeve"].map((h) => (
                  <th key={h} scope="col" className="text-label py-3 text-left text-muted-foreground">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r[0]} className="border-b border-border">
                  <th scope="row" className="text-h4 py-3 text-left">
                    {r[0]}
                  </th>
                  {r.slice(1).map((cell, i) => (
                    <td key={i} className="text-body-sm py-3 tabular-nums text-muted-foreground">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-8 border border-border p-5">
          <p className="text-label">Dimensions</p>
          <p className="text-body mt-3 text-muted-foreground">{type.fulfilment}</p>
          {type.sizes ? (
            <p className="text-body-sm mt-3 text-muted-foreground">
              Available options: {type.sizes.join(" · ")}
            </p>
          ) : null}
        </div>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="border border-border p-5">
          <p className="text-label">How to measure</p>
          <p className="text-body-sm mt-3 text-muted-foreground">
            Lay a garment you already wear flat, measure across the chest one inch below the armhole,
            and compare it to the half-chest column.
          </p>
        </div>
        <div className="border border-border p-5">
          <p className="text-label">Between sizes?</p>
          <p className="text-body-sm mt-3 text-muted-foreground">
            Our apparel is cut relaxed. Size down for a closer fit, or stay true to size for the
            intended boxy silhouette.
          </p>
        </div>
      </div>
    </Overlay>
  );
}
