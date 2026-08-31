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
      { title: "Astrologer in Chennai - Frequently Asked Questions | Anugraha Jyothishalaya" },
      {
        name: "description",
        content:
          "Answers to common consultation questions for Chennai and Perambur clients, including Nadi astrology, horoscope readings, marriage matching, remedies, and follow-up guidance.",
      },
      { property: "og:title", content: "Astrologer in Chennai FAQ | Anugraha Jyothishalaya" },
      {
        property: "og:description",
        content: "Consultation guidance for clients seeking a Vedic astrologer in Chennai or Perambur.",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: "https://anugrahajyothishalaya.com/faq",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://anugrahajyothishalaya.com/faq",
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
