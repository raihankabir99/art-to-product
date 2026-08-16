import { createFileRoute, Outlet } from "@tanstack/react-router";
import type { ProductTypeId } from "@/lib/catalog";

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): { type?: ProductTypeId } => {
    const t = search["type"];
    return typeof t === "string" ? { type: t as ProductTypeId } : {};
  },
  component: () => <Outlet />,
});
