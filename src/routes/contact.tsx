import { createFileRoute } from "@tanstack/react-router";
import { PageFrame, CtaButton, Field } from "@/components/site/shared";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Book a Consultation — Anugraha Jathakalaya" },
      {
        name: "description",
        content:
          "Reserve a private sitting with Sri. V. Govindan Namboodiri. In person at Mylapore, Chennai, or by secure video call — anywhere in the world.",
      },
      { property: "og:title", content: "Book a Consultation — Anugraha Jathakalaya" },
      {
        property: "og:description",
        content: "Reserve a private consultation, in person in Chennai or by video call worldwide.",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: "https://id-preview--e95ab885-1ec5-48f1-a545-fe163a27f99d.lovable.app/contact",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://id-preview--e95ab885-1ec5-48f1-a545-fe163a27f99d.lovable.app/contact",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageFrame>
      <section className="relative pb-24 pt-40 md:pt-44" style={{ background: "#050F22" }}>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 md:px-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <div className="text-[10px] uppercase tracking-[0.32em]" style={{ color: "#D4AF37" }}>
              Reserve a Sitting
            </div>
            <h1 className="mt-4 font-display text-4xl leading-tight text-ivory md:text-[44px]">
              A private hour with the śāstra.
            </h1>
            <p className="mt-6 font-serif-italic text-xl" style={{ color: "#C9C3B0" }}>
              Consultations by appointment. In person at our study in Chennai, or by secure video
              call.
            </p>
            <div className="mt-10 space-y-4 text-[14px]" style={{ color: "#C9C3B0" }}>
              <div className="flex items-baseline gap-4">
                <span
                  className="w-24 uppercase tracking-[0.22em] text-[11px]"
                  style={{ color: "#D4AF37" }}
                >
                  Hours
                </span>
                <span>Mon–Sat · 07:00 – 19:00 IST</span>
              </div>
              <div className="flex items-baseline gap-4">
                <span
                  className="w-24 uppercase tracking-[0.22em] text-[11px]"
                  style={{ color: "#D4AF37" }}
                >
                  Address
                </span>
                <span>No. 7, Kutchery Road, Mylapore, Chennai 600004</span>
              </div>
              <div className="flex items-baseline gap-4">
                <span
                  className="w-24 uppercase tracking-[0.22em] text-[11px]"
                  style={{ color: "#D4AF37" }}
                >
                  Contact
                </span>
                <span>+91 99999 99999 · office@anugrahajyotisham.in</span>
              </div>
            </div>
          </div>

          <form
            className="glass-card p-8 md:p-10"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Field label="Full Name" placeholder="Your name" />
              <Field label="Phone" placeholder="+91 …" />
              <Field label="Date of Birth" type="date" />
              <Field label="Time of Birth" type="time" />
              <div className="md:col-span-2">
                <Field label="Place of Birth" placeholder="Town, State" />
              </div>
              <div className="md:col-span-2">
                <label
                  className="mb-2 block text-[11px] uppercase tracking-[0.22em]"
                  style={{ color: "#D4AF37" }}
                >
                  Nature of Consultation
                </label>
                <select className="field w-full px-4 py-3 text-[14px]">
                  <option>Jyotisha — Birth chart reading</option>
                  <option>Nadi — Palm-leaf consultation</option>
                  <option>Vaasthu — Home / workplace</option>
                  <option>Marriage compatibility</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label
                  className="mb-2 block text-[11px] uppercase tracking-[0.22em]"
                  style={{ color: "#D4AF37" }}
                >
                  Your Question
                </label>
                <textarea
                  rows={4}
                  className="field w-full px-4 py-3 text-[14px]"
                  placeholder="Briefly describe the concern you wish to bring…"
                />
              </div>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <CtaButton type="submit">Request Appointment</CtaButton>
              <span className="font-serif-italic text-[13px]" style={{ color: "#C9C3B0" }}>
                We reply within one working day.
              </span>
            </div>
          </form>
        </div>
      </section>
    </PageFrame>
  );
}
