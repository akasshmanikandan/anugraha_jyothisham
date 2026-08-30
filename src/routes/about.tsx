import { createFileRoute } from "@tanstack/react-router";
import { PageFrame, SectionDivider, SectionHeading } from "@/components/site/shared";
import sreeChakra from "@/assets/sree-chakra.png.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Sri. V. Govindan Namboodiri — Anugraha Jathakalaya" },
      {
        name: "description",
        content:
          "Sri. V. Govindan Namboodiri, Vedic Astrologer — horoscope, marriage matching, muhurtha, numerology, lucky name and rasi gems. Services anywhere in the world, in Tamil, English, Hindi and Malayalam.",
      },
      { property: "og:title", content: "About — Anugraha Jathakalaya" },
      {
        property: "og:description",
        content:
          "Meet Sri. V. Govindan Namboodiri, Vedic Astrologer, and the lineage behind Anugraha Jathakalaya.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageFrame>
      {/* Astrologer */}
      <section className="relative pb-24 pt-40 md:pt-44" style={{ background: "#050F22" }}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 md:px-10 lg:grid-cols-2">
          <div data-d3="deep" className="relative">
            <div
              className="relative overflow-hidden"
              style={{ borderRadius: 16, background: "#050F22" }}
            >
              <img
                src={sreeChakra.url}
                alt="Sri Chakra (Sri Yantra) plaque in gold and maroon"
                width={512}
                height={512}
                loading="lazy"
                className="h-auto w-full object-contain"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  boxShadow: "inset 0 0 0 1px rgba(212,175,55,0.35)",
                  background: "linear-gradient(180deg, transparent 60%, rgba(5,15,34,0.45) 100%)",
                }}
              />
            </div>
            <div
              className="absolute -bottom-6 -right-6 hidden h-24 w-24 border md:block"
              style={{ borderColor: "rgba(212,175,55,0.4)" }}
            />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.32em]" style={{ color: "#D4AF37" }}>
              The Astrologer
            </div>
            <h1 className="mt-4 font-display text-4xl md:text-[44px] text-ivory leading-tight">
              Sri. V. Govindan Namboodiri
            </h1>
            <p className="mt-3 text-[12px] uppercase tracking-[0.28em]" style={{ color: "#D4AF37" }}>
              Vedic Astrologer
            </p>
            <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {[
                "Basic Horoscope, Predictions",
                "Total Horoscope, Predictions",
                "Birthday Annual Forecast",
                "Marriage Matching",
                "Muhurtha Date and Time",
                "Numerology Predictions",
                "Suitable & Lucky Name",
                "Lucky Rasi Gems",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 text-[15px]"
                  style={{ color: "#C9C3B0" }}
                >
                  <span style={{ color: "#D4AF37" }}>◆</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 text-[15px] leading-relaxed" style={{ color: "#C9C3B0" }}>
              All kinds of parihara related religious rituals and Homam are performed.
            </p>
            <div className="mt-8 border-l pl-5" style={{ borderColor: "rgba(212,175,55,0.35)" }}>
              <p className="font-display text-[15px] leading-relaxed tracking-[0.08em] text-ivory">
                WE PROVIDE ASTROLOGICAL SERVICES “ANYWHERE IN THE WORLD”
              </p>
              <p
                className="mt-2 text-[13px] uppercase tracking-[0.24em]"
                style={{ color: "#D4AF37" }}
              >
                Tamil · English · Hindi · Malayalam
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Why Choose Us */}
      <section className="mx-auto max-w-7xl px-6 pb-10 md:px-10">
        <SectionHeading
          eyebrow="Why Anugraha"
          title="Tradition, Held Whole"
          quote="What is old must not be antique — it must be alive."
        />
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              t: "Unbroken Lineage",
              d: "Five generations of temple astrologers, taught in the classical guru-śiṣya tradition.",
            },
            {
              t: "Śāstric Fidelity",
              d: "Every reading grounded in Parāśara, Jaimini and Nadi literature — never intuition alone.",
            },
            {
              t: "Discreet Practice",
              d: "Consultations by appointment only, held with the confidentiality of a physician.",
            },
            {
              t: "Practical Remedies",
              d: "Prescriptions calibrated to your life — never asking what you cannot faithfully do.",
            },
          ].map((x, i) => (
            <div key={i} className="glass-card p-8">
              <div
                className="mb-5 font-display text-[13px] tracking-[0.3em]"
                style={{ color: "#D4AF37" }}
              >
                0{i + 1}
              </div>
              <h3 className="font-display text-xl text-ivory">{x.t}</h3>
              <p className="mt-4 text-[14.5px] leading-relaxed" style={{ color: "#C9C3B0" }}>
                {x.d}
              </p>
            </div>
          ))}
        </div>
      </section>
    </PageFrame>
  );
}
