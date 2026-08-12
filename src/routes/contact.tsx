import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/store/page";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Atelier Noir" },
      { name: "description", content: "Questions about an order, a design or a collaboration? The studio replies within one working day." },
      { property: "og:title", content: "Contact | Atelier Noir" },
      { property: "og:description", content: "Questions about an order, a design or a collaboration? The studio replies within one working day." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHero title="Contact" intro="We reply within one working day, Monday to Friday, CET." trail={[{ label: "Contact" }]} />
      <section className="section container-narrow">
        <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); toast.success("Message sent. We'll be in touch."); }}>
          <div>
            <label htmlFor="c-name" className="text-label text-muted-foreground">Name</label>
            <input id="c-name" required className="text-body-sm mt-3 h-12 w-full border border-border bg-transparent px-4" />
          </div>
          <div>
            <label htmlFor="c-email" className="text-label text-muted-foreground">Email</label>
            <input id="c-email" type="email" required className="text-body-sm mt-3 h-12 w-full border border-border bg-transparent px-4" />
          </div>
          <div>
            <label htmlFor="c-msg" className="text-label text-muted-foreground">Message</label>
            <textarea id="c-msg" rows={6} required className="text-body-sm mt-3 w-full border border-border bg-transparent p-4" />
          </div>
          <Button type="submit" size="block">Send message</Button>
        </form>
      </section>
    </>
  );
}
