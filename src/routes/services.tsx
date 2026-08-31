import { createFileRoute } from "@tanstack/react-router";
import {
  PageFrame,
  SectionDivider,
  SectionHeading,
  ServiceCard,
  CtaButton,
  SERVICES,
} from "@/components/site/shared";
import { useLanguage } from "@/contexts/LanguageContext";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Astrology Services in Chennai | Jyotisha, Nadi, Vaasthu & More - Anugraha Jyothishalaya" },
      {
        name: "description",
        content:
          "Explore nine traditional astrology services in Chennai with Govindan Namboodiri VG: Jyotisha, Tantrikam, Mantrikam, Vaithiyam, Thambulam, Samudrika, Nadi, Vaasthu, and Numerology.",
      },
      { property: "og:title", content: "Astrology Services in Chennai | Anugraha Jyothishalaya" },
      {
        property: "og:description",
        content: "Nine sacred disciplines of Vedic consultation from an astrologer in Chennai, rooted in traditional Sastric practice.",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content:
          "https://anugrahajyothishalaya.com/services",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://anugrahajyothishalaya.com/services",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { t } = useLanguage();
  const services = SERVICES.map((service, index) => ({ ...service, ...t.services.items[index] }));
  return (
    <PageFrame>
      <section className="mx-auto max-w-7xl px-6 pt-40 md:px-10 md:pt-44">
        <SectionHeading
          eyebrow={t.services.eyebrow}
          title={t.services.title}
          quote={t.services.quote}
        />
        <div
          className="mt-16 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3"
          style={{ background: "rgba(212,175,55,0.15)" }}
        >
          {services.map((s) => (
            <ServiceCard key={s.title} s={s} />
          ))}
        </div>

        <SectionDivider />

        <div className="pb-10 text-center">
          <p className="font-serif-italic text-xl" style={{ color: "#C9C3B0" }}>
            {t.services.unsure || "Unsure which discipline answers your question? Begin with a brief conversation."}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <CtaButton href="/contact">{t.hero.bookBtn}</CtaButton>
            <CtaButton href="https://wa.me/919999999999" variant="maroon">
              {t.hero.whatsappBtn}
            </CtaButton>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
