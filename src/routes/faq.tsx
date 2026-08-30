import { createFileRoute } from "@tanstack/react-router";
import {
  PageFrame,
  SectionDivider,
  SectionHeading,
  FaqAccordion,
  CtaButton,
} from "@/components/site/shared";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Anugraha Jathakalaya" },
      {
        name: "description",
        content:
          "Questions before you begin — what to share before booking, how remedies are prescribed, confidentiality and follow-up consultations.",
      },
      { property: "og:title", content: "FAQ — Anugraha Jathakalaya" },
      {
        property: "og:description",
        content: "Everything to know before booking a traditional Vedic consultation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <PageFrame>
      <section className="mx-auto max-w-4xl px-6 pt-40 md:px-10 md:pt-44">
        <SectionHeading
          eyebrow="Questions"
          title="Before You Begin"
          quote="Ask freely — clarity is itself a first remedy."
        />
        <FaqAccordion />

        <SectionDivider />

        <div className="pb-10 text-center">
          <p className="font-serif-italic text-xl" style={{ color: "#C9C3B0" }}>
            A question not answered here? Write to us directly.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <CtaButton href="/contact">Contact Us</CtaButton>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
