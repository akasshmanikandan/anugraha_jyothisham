import { createFileRoute } from "@tanstack/react-router";
import {
  PageFrame,
  SectionDivider,
  SectionHeading,
  FaqAccordion,
  CtaButton,
} from "@/components/site/shared";
import { useLanguage } from "@/contexts/LanguageContext";

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
      {
        property: "og:url",
        content: "https://id-preview--e95ab885-1ec5-48f1-a545-fe163a27f99d.lovable.app/faq",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://id-preview--e95ab885-1ec5-48f1-a545-fe163a27f99d.lovable.app/faq",
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const { t } = useLanguage();
  return (
    <PageFrame>
      <section className="mx-auto max-w-4xl px-6 pt-40 md:px-10 md:pt-44">
        <SectionHeading
          eyebrow={t.faq.eyebrow}
          title={t.faq.title}
          quote={t.faq.quote}
        />
        <FaqAccordion items={t.faq.items} />

        <SectionDivider />

        <div className="pb-10 text-center">
          <p className="font-serif-italic text-xl" style={{ color: "#C9C3B0" }}>
            {t.faq.notAnswered || "A question not answered here? Write to us directly."}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <CtaButton href="/contact">{t.nav.contact || "Contact Us"}</CtaButton>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
