import { createFileRoute } from "@tanstack/react-router";
import {
  PageFrame,
  SectionDivider,
  SectionHeading,
  ServiceCard,
  CtaButton,
  SERVICES,
} from "@/components/site/shared";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Anugraha Jathakalaya" },
      {
        name: "description",
        content:
          "Nine sacred disciplines: Jyotisha, Tantrikam, Mantrikam, Vaithiyam, Thambulam, Face Reading, Nadi, Vaasthu and Numerology — by Sri. V. Govindan Namboodiri.",
      },
      { property: "og:title", content: "Services — Anugraha Jathakalaya" },
      {
        property: "og:description",
        content: "Nine sacred disciplines of Vedic consultation, rooted in tradition.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <PageFrame>
      <section className="mx-auto max-w-7xl px-6 pt-40 md:px-10 md:pt-44">
        <SectionHeading
          eyebrow="The Nine Disciplines"
          title="Sacred Consultations"
          quote="Each art a lamp; together, they illumine the whole of one life."
        />
        <div
          className="mt-16 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3"
          style={{ background: "rgba(212,175,55,0.15)" }}
        >
          {SERVICES.map((s) => (
            <ServiceCard key={s.title} s={s} />
          ))}
        </div>

        <SectionDivider />

        <div className="pb-10 text-center">
          <p className="font-serif-italic text-xl" style={{ color: "#C9C3B0" }}>
            Unsure which discipline answers your question? Begin with a brief conversation.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <CtaButton href="/contact">Book Consultation</CtaButton>
            <CtaButton href="https://wa.me/919999999999" variant="maroon">
              WhatsApp
            </CtaButton>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
