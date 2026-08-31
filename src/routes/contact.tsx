import { createFileRoute } from "@tanstack/react-router";
import { PageFrame, CtaButton, Field } from "@/components/site/shared";
import { useLanguage } from "@/contexts/LanguageContext";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Book an Astrologer in Perambur, Chennai | Anugraha Jyothishalaya" },
      {
        name: "description",
        content:
          "Book a private astrology consultation with Anugraha Jyothishalaya in Perambur, Chennai for horoscope reading, Nadi astrology, marriage matching, Vaasthu, and remedies.",
      },
      { property: "og:title", content: "Book an Astrologer in Perambur, Chennai" },
      {
        property: "og:description",
        content: "Request an appointment with Govindan Namboodiri VG at Anugraha Jyothishalaya in Perambur, Chennai.",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: "https://anugrahajyothishalaya.com/contact",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://anugrahajyothishalaya.com/contact",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useLanguage();
  const form = t.book.form;
  return (
    <PageFrame>
      <section className="relative pb-24 pt-40 md:pt-44" style={{ background: "#050F22" }}>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 md:px-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <div className="text-[10px] uppercase tracking-[0.32em]" style={{ color: "#D4AF37" }}>
              {t.book.eyebrow}
            </div>
            <h1 className="mt-4 font-display text-4xl leading-tight text-ivory md:text-[44px]">
              {t.book.title}
            </h1>
            <p className="mt-6 font-serif-italic text-xl" style={{ color: "#C9C3B0" }}>
              {t.book.quote}
            </p>
            <div className="mt-10 space-y-4 text-[14px]" style={{ color: "#C9C3B0" }}>
              <div className="flex items-baseline gap-4">
                <span
                  className="w-24 uppercase tracking-[0.22em] text-[11px]"
                  style={{ color: "#D4AF37" }}
                >
                  {t.book.hoursLabel}
                </span>
                <span>{t.book.hoursVal}</span>
              </div>
              <div className="flex items-baseline gap-4">
                <span
                  className="w-24 uppercase tracking-[0.22em] text-[11px]"
                  style={{ color: "#D4AF37" }}
                >
                  {t.book.addressLabel}
                </span>
                <span>{t.book.addressVal}</span>
              </div>
              <div className="flex items-baseline gap-4">
                <span
                  className="w-24 uppercase tracking-[0.22em] text-[11px]"
                  style={{ color: "#D4AF37" }}
                >
                  {t.book.contactLabel}
                </span>
                <span>{t.book.contactVal}</span>
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
              <Field label={form.name} placeholder={form.namePlaceholder} />
              <Field label={form.phone} placeholder={form.phonePlaceholder} />
              <Field label={form.dob} type="date" />
              <Field label={form.tob} type="time" />
              <div className="md:col-span-2">
                <Field label={form.pob} placeholder={form.pobPlaceholder} />
              </div>
              <div className="md:col-span-2">
                <label
                  className="mb-2 block text-[11px] uppercase tracking-[0.22em]"
                  style={{ color: "#D4AF37" }}
                >
                  {form.nature}
                </label>
                <select className="field w-full px-4 py-3 text-[14px]">
                  {form.natureOptions.map((option: string) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label
                  className="mb-2 block text-[11px] uppercase tracking-[0.22em]"
                  style={{ color: "#D4AF37" }}
                >
                  {form.question}
                </label>
                <textarea
                  rows={4}
                  className="field w-full px-4 py-3 text-[14px]"
                  placeholder={form.questionPlaceholder}
                />
              </div>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <CtaButton type="submit">{form.submit}</CtaButton>
              <span className="font-serif-italic text-[13px]" style={{ color: "#C9C3B0" }}>
                {form.replyNote}
              </span>
            </div>
          </form>
        </div>
      </section>
    </PageFrame>
  );
}
