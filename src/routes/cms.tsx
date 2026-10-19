import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";

export const Route = createFileRoute("/cms")({
  head: () => ({
    meta: [
      { title: "Enterprise CMS & Admin Console | Atelier Noir" },
      {
        name: "description",
        content:
          "Enterprise management dashboard, commerce fulfillment pipeline, and editorial CMS for Atelier Noir.",
      },
    ],
  }),
  component: CMSPage,
});

function CMSPage() {
  return <AdminShell />;
}
