import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";

export const Route = createFileRoute("/admin")({
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
  component: AdminPage,
});

function AdminPage() {
  return <AdminShell />;
}
