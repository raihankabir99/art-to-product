import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageHero, Prose } from "@/components/store/page";

const DOCS: Record<string, { title: string; intro: string }> = {
  privacy: { title: "Privacy Policy", intro: "How we collect, use and protect your personal data under the GDPR." },
  terms: { title: "Terms & Conditions", intro: "The terms that apply when you order from Atelier Noir." },
  cookies: { title: "Cookie Policy", intro: "The cookies we use and how you can control them." },
  refunds: { title: "Refund Policy", intro: "When and how refunds are issued for made-to-order pieces." },
};

export const Route = createFileRoute("/legal/$doc")({
  loader: ({ params }) => {
    const doc = DOCS[params.doc];
    if (!doc) throw notFound();
    return { doc };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Document unavailable | Atelier Noir" }, { name: "robots", content: "noindex" }] };
    const d = loaderData.doc;
    return {
      meta: [
        { title: `${d.title} | Atelier Noir` },
        { name: "description", content: d.intro },
        { property: "og:title", content: `${d.title} | Atelier Noir` },
        { property: "og:description", content: d.intro },
      ],
    };
  },
  component: LegalDoc,
});

function LegalDoc() {
  const { doc } = Route.useLoaderData();
  return (
    <>
      <PageHero title={doc.title} intro={doc.intro} trail={[{ label: doc.title }]} />
      <section className="section container-narrow">
        <Prose>
          <p>Last updated 12 August 2026. This document is a placeholder written for design purposes and should be replaced with reviewed legal copy before launch.</p>
          <h2>Scope</h2>
          <p>These terms apply to every order placed through this website, in every market we serve.</p>
          <h2>Your rights</h2>
          <p>EU and UK customers keep all statutory rights, including the right to withdraw from a distance purchase within fourteen days where applicable.</p>
          <h2>Contact</h2>
          <p>Questions about this document can be sent to the studio through the contact page.</p>
        </Prose>
      </section>
    </>
  );
}
