import { ClientOnly, createFileRoute, Link } from "@tanstack/react-router";
import { Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";

const VedicScene = lazy(() => import("@/components/VedicScene"));

import sreeChakra from "@/assets/sree-chakra.png";
import godPhoto1 from "@/assets/god-photo-1.jpeg";
import ritual1 from "@/assets/ritual-1.jpeg";
import ritual2 from "@/assets/ritual-2.jpeg";
import ritual3 from "@/assets/ritual-3.jpeg";
import ritual4 from "@/assets/ritual-4.jpeg";
import ritual5 from "@/assets/ritual-5.jpeg";
import ritual6 from "@/assets/ritual-6.jpeg";
import ritual8 from "@/assets/ritual-8.jpeg";
import godPhoto4 from "@/assets/god-photo-4.jpeg";
import astrologerBackdrop from "@/assets/photo.png";
import { useLanguage, type Language } from "@/contexts/LanguageContext";

import {
  CtaButton,
  FAQS,
  FaqAccordion,
  FxToggle,
  PROCESS,
  SERVICES,
  SectionDivider,
  SectionHeading,
  ServiceCard,
  SiteFooter,
  SiteHeader,
  StatBlock,
  TESTIMONIALS,
  useFx3d,
  useScrollDepth,
} from "@/components/site/shared";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anugraha Jathakalaya — Vedic Astrology by Sri. V. Govindan Namboodiri" },
      {
        name: "description",
        content:
          "Anugraha Jathakalaya — Sri. V. Govindan Namboodiri, Vedic Astrologer. Horoscope, marriage matching, muhurtha, numerology, lucky name and rasi gems. Services anywhere in the world.",
      },
      { property: "og:title", content: "Anugraha Jathakalaya — Vedic Astrology" },
      {
        property: "og:description",
        content:
          "Personal consultations in Jyotisha, Nadi, Vaasthu and Numerology. Rooted in tradition, delivered with discretion.",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: "https://id-preview--e95ab885-1ec5-48f1-a545-fe163a27f99d.lovable.app/",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://id-preview--e95ab885-1ec5-48f1-a545-fe163a27f99d.lovable.app/",
      },
    ],
  }),
  component: LandingPage,
});

/* ---------------- Zodiac Wheel (2D fallback) ---------------- */

const ZODIAC_GLYPHS = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];

function ZodiacWheel() {
  return (
    <div className="wheel relative aspect-square w-full max-w-[560px]">
      <svg viewBox="-300 -300 600 600" className="w-full h-full">
        <g className="wheel-rotator">
          <circle
            cx="0" cy="0" r="280" fill="none" stroke="#D4AF37" strokeWidth="0.75" opacity="0.9"
            data-draw style={{ ["--dash" as string]: 1800, ["--delay" as string]: 0 }}
          />
          <circle
            cx="0" cy="0" r="275" fill="none" stroke="#D4AF37" strokeWidth="0.35" opacity="0.6"
            data-draw style={{ ["--dash" as string]: 1800, ["--delay" as string]: 120 }}
          />
          <circle
            cx="0" cy="0" r="235" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.75"
            data-draw style={{ ["--dash" as string]: 1500, ["--delay" as string]: 300 }}
          />
          <circle
            cx="0" cy="0" r="205" fill="none" stroke="#D4AF37" strokeWidth="0.35" opacity="0.55"
            data-draw style={{ ["--dash" as string]: 1300, ["--delay" as string]: 450 }}
          />
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * 30 * Math.PI) / 180;
            const x1 = +(Math.cos(a) * 205).toFixed(3);
            const y1 = +(Math.sin(a) * 205).toFixed(3);
            const x2 = +(Math.cos(a) * 275).toFixed(3);
            const y2 = +(Math.sin(a) * 275).toFixed(3);
            return (
              <line
                key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="#D4AF37" strokeWidth="0.5" opacity="0.7" data-draw
                style={{ ["--dash" as string]: 100, ["--delay" as string]: 600 + i * 40 }}
              />
            );
          })}
          {ZODIAC_GLYPHS.map((g, i) => {
            const a = ((i * 30 + 15 - 90) * Math.PI) / 180;
            const x = Math.cos(a) * 240;
            const y = Math.sin(a) * 240;
            return (
              <text
                key={g} x={x} y={y} textAnchor="middle" dominantBaseline="central"
                fontSize="20" fill="#D4AF37" opacity="0.85"
                style={{
                  fontFamily: "Cinzel, serif",
                  animation: `drift-in 500ms ease-out ${1000 + i * 60}ms both`,
                }}
              >
                {g}
              </text>
            );
          })}
          <circle
            cx="0" cy="0" r="165" fill="none" stroke="#D4AF37" strokeWidth="0.4" opacity="0.55"
            data-draw style={{ ["--dash" as string]: 1100, ["--delay" as string]: 700 }}
          />
          <circle
            cx="0" cy="0" r="120" fill="none" stroke="#D4AF37" strokeWidth="0.4" opacity="0.5"
            data-draw style={{ ["--dash" as string]: 800, ["--delay" as string]: 900 }}
          />
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i * 45 * Math.PI) / 180;
            return (
              <line
                key={i} x1={0} y1={0} x2={Math.cos(a) * 120} y2={Math.sin(a) * 120}
                stroke="#D4AF37" strokeWidth="0.3" opacity="0.45" data-draw
                style={{ ["--dash" as string]: 130, ["--delay" as string]: 1100 + i * 30 }}
              />
            );
          })}
          <circle
            cx="0" cy="0" r="60" fill="none" stroke="#D4AF37" strokeWidth="0.4" opacity="0.6"
            data-draw style={{ ["--dash" as string]: 400, ["--delay" as string]: 1300 }}
          />
          <circle
            cx="0" cy="0" r="4" fill="#D4AF37"
            style={{ animation: "drift-in 500ms ease-out 1600ms both" }}
          />
        </g>
      </svg>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(212,175,55,0.10), transparent 55%)",
        }}
      />
    </div>
  );
}

/* ---------------- Main page ---------------- */

function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const galleryStripRef = useRef<HTMLDivElement>(null);
  const [wick, setWick] = useState(0);
  const [fx3d, toggleFx] = useFx3d();
  const { lang, setLang, t } = useLanguage();
  useScrollDepth();

  /* Cursor embers — desktop hero only */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const hero = heroRef.current;
    if (!hero) return;

    const embers: HTMLDivElement[] = [];
    const N = 14;
    for (let i = 0; i < N; i++) {
      const e = document.createElement("div");
      e.className = "ember";
      e.style.opacity = "0";
      document.body.appendChild(e);
      embers.push(e);
    }

    const positions = Array.from({ length: N }, () => ({ x: 0, y: 0 }));
    let mouseX = -9999;
    let mouseY = -9999;
    let inside = false;

    const onMove = (ev: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      inside =
        ev.clientX >= rect.left &&
        ev.clientX <= rect.right &&
        ev.clientY >= rect.top &&
        ev.clientY <= rect.bottom;
      mouseX = ev.clientX;
      mouseY = ev.clientY;
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const tick = () => {
      const targetX = inside ? mouseX : positions[0].x;
      const targetY = inside ? mouseY : positions[0].y;
      positions[0].x += (targetX - positions[0].x) * 0.28;
      positions[0].y += (targetY - positions[0].y) * 0.28;
      for (let i = 1; i < N; i++) {
        positions[i].x += (positions[i - 1].x - positions[i].x) * 0.32;
        positions[i].y += (positions[i - 1].y - positions[i].y) * 0.32;
      }
      for (let i = 0; i < N; i++) {
        const baseOpacity = inside ? 0.55 * (1 - i / N) : 0;
        const drift = inside ? (Math.random() - 0.5) * 1.4 : 0;
        embers[i].style.transform = `translate3d(${positions[i].x + drift - 3}px, ${
          positions[i].y + drift - 3
        }px, 0) scale(${1 - i / (N * 1.6)})`;
        const cur = parseFloat(embers[i].style.opacity || "0");
        const next = cur + (baseOpacity - cur) * 0.12;
        embers[i].style.opacity = String(next);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      embers.forEach((e) => e.remove());
    };
  }, []);

  /* Timeline wick fill on scroll */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = timelineRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh * 0.6;
      const passed = Math.min(total, Math.max(0, vh * 0.8 - rect.top));
      setWick(Math.min(100, (passed / total) * 100));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const headline = useMemo(() => t.hero.headline, [t.hero.headline]);
  const services = SERVICES.map((service, index) => ({ ...service, ...t.services.items[index] }));
  const process = t.process.steps;
  const galleryPhotos = useMemo(
    () => [godPhoto1, ritual1, ritual2, ritual3, ritual4, ritual5, ritual6, ritual8],
    []
  );
  const languageOptions: { code: Language; label: string }[] = [
    { code: "en", label: "English" },
    { code: "ta", label: "Tamil" },
    { code: "ml", label: "Malayalam" },
    { code: "hi", label: "Hindi" },
  ];

  return (
    <div className="min-h-screen text-ivory" style={{ background: "#081A34", color: "#F7F4EA" }}>
      <FxToggle fx3d={fx3d} toggle={toggleFx} />
      <SiteHeader />

      {/* Hero */}
      <section
        id="top"
        ref={heroRef}
        className="relative overflow-hidden pt-40 pb-24 md:pt-44 md:pb-32"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 20%, rgba(212,175,55,0.06), transparent 60%), radial-gradient(ellipse at 80% 90%, rgba(109,31,45,0.10), transparent 60%)",
          }}
        />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 md:px-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <div
              className="hero-tagline mb-8 inline-flex items-center gap-3 border px-4 py-1.5 text-[10px] uppercase tracking-[0.32em]"
              style={{ borderColor: "rgba(212,175,55,0.35)", color: "#D4AF37" }}
            >
              <span className="h-1 w-1 rounded-full" style={{ background: "#D4AF37" }} />
              {t.hero.tagline}
            </div>

            <h1 className="font-display text-[42px] leading-[1.05] tracking-tight text-ivory sm:text-[54px] md:text-[64px] lg:text-[68px]">
              {headline.map((w, i) => (
                <span key={i}>
                  <span className="hero-word" style={{ ["--i" as string]: i }}>
                    {w}
                  </span>
                  {i < headline.length - 1 ? " " : ""}
                </span>
              ))}
            </h1>

            <p
              className="hero-tagline mt-8 max-w-xl font-serif-italic text-xl md:text-[22px]"
              style={{ color: "#C9C3B0" }}
            >
              {t.hero.description}
            </p>

            <div className="hero-tagline mt-12">
              <div
                className="text-[10px] uppercase tracking-[0.32em]"
                style={{ color: "#D4AF37" }}
              >
                {t.hero.chooseLang}
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-4">
                {languageOptions.map((option) => (
                  <button
                    key={option.code}
                    type="button"
                    onClick={() => setLang(option.code)}
                    aria-pressed={lang === option.code}
                    className="min-w-[136px] border px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.22em] transition-colors"
                    style={{
                      borderColor: lang === option.code ? "#D4AF37" : "rgba(212,175,55,0.28)",
                      color: lang === option.code ? "#D4AF37" : "#C9C3B0",
                      background: lang === option.code ? "rgba(212,175,55,0.08)" : "rgba(5,15,34,0.22)",
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="hero-ctas mt-10 flex flex-wrap items-center gap-4">
              <CtaButton href="/contact">{t.hero.bookBtn}</CtaButton>
              <CtaButton href="https://wa.me/919999999999" variant="maroon">
                {t.hero.whatsappBtn}
              </CtaButton>
            </div>

            <div
              className="hero-stats mt-16 grid grid-cols-3 gap-6 border-t pt-8"
              style={{ borderColor: "rgba(212,175,55,0.18)" }}
            >
              <StatBlock end={16} suffix="+" label={t.hero.yearsPractice} />
              <StatBlock end={5000} suffix="+" label={t.hero.clientsGuided} />
              <StatBlock end={9} suffix="" label={t.hero.sacredDisciplines} />
            </div>
          </div>

          <div data-d3="near" className="relative mx-auto flex w-full items-center justify-center">
            {fx3d ? (
              <ClientOnly fallback={<ZodiacWheel />}>
                <Suspense fallback={<ZodiacWheel />}>
                  <VedicScene />
                </Suspense>
              </ClientOnly>
            ) : (
              <ZodiacWheel />
            )}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Services preview */}
      <section className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          eyebrow={t.services.eyebrow}
          title={t.services.title}
          quote={t.services.quote}
        />
        <div
          className="mt-16 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3"
          style={{ background: "rgba(212,175,55,0.15)" }}
        >
          {services.slice(0, 3).map((s) => (
            <ServiceCard key={s.title} s={s} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <CtaButton href="/services">{t.services.viewAll || "View All Nine Disciplines"}</CtaButton>
        </div>
      </section>

      <SectionDivider />

      {/* About preview */}
      <section className="relative py-24" style={{ background: "#050F22" }}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-16 px-6 md:px-10 lg:grid-cols-2">
          <div data-d3="deep" className="relative">
            <div
              className="relative overflow-hidden shadow-2xl"
              style={{
                borderRadius: 16,
                backgroundImage: `linear-gradient(180deg, rgba(5,15,34,0.08), rgba(5,15,34,0.18)), url(${godPhoto4})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              <img
                src={sreeChakra}
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
          <div
            className="relative overflow-hidden px-8 py-10 md:px-14 md:py-12"
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(109,31,45,0.74), rgba(5,15,34,0.58)), url(${astrologerBackdrop})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="text-[10px] uppercase tracking-[0.32em]" style={{ color: "#D4AF37" }}>
              {t.about.eyebrow}
            </div>
            <h2 className="mt-4 font-display text-4xl md:text-[44px] text-ivory leading-tight">
              {t.about.title}
            </h2>
            <p
              className="mt-3 text-[12px] uppercase tracking-[0.28em]"
              style={{ color: "#D4AF37" }}
            >
              {t.about.sub}
            </p>
            <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {t.about.bullets.map((item: string) => (
                <div
                  key={item}
                  className="flex items-start gap-3 text-[15px] leading-relaxed"
                  style={{ color: "#E7DDC8" }}
                >
                  <span style={{ color: "#D4AF37" }}>•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 text-[15px] leading-relaxed" style={{ color: "#E7DDC8" }}>
              {t.about.parihara}
            </p>
            <div className="mt-8 border-l pl-5" style={{ borderColor: "rgba(212,175,55,0.55)" }}>
              <p className="font-display text-[15px] leading-relaxed tracking-[0.08em] text-ivory">
                {t.about.bannerText}
              </p>
              <p
                className="mt-2 text-[13px] uppercase tracking-[0.24em]"
                style={{ color: "#D4AF37" }}
              >
                {t.about.languagesText}
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Process Timeline */}
      <section className="relative py-24" style={{ background: "#050F22" }}>
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionHeading
            eyebrow={t.process.eyebrow}
            title={t.process.title}
            quote={t.process.quote}
          />

          <div ref={timelineRef} className="relative mt-20">
            <div className="wick-line" />
            <div className="wick-fill" style={{ ["--wick" as string]: `${wick}%` }} />

            <ol className="relative grid grid-cols-2 gap-y-14 md:grid-cols-5 md:gap-y-0">
              {process.map((p, i) => {
                const active = wick > (i / (process.length - 1)) * 100 - 5;
                return (
                  <li key={p.n} className="relative flex flex-col items-center px-3 text-center">
                    <div
                      className="relative flex h-14 w-14 items-center justify-center rounded-full transition-colors duration-500"
                      style={{
                        background: "#050F22",
                        border: `1px solid ${active ? "#D4AF37" : "rgba(212,175,55,0.3)"}`,
                        boxShadow: active ? "0 0 24px rgba(212,175,55,0.35)" : "none",
                      }}
                    >
                      <span
                        className="font-display text-[13px]"
                        style={{ color: active ? "#D4AF37" : "#C9C3B0" }}
                      >
                        {p.n}
                      </span>
                    </div>
                    <h4 className="mt-6 font-display text-lg text-ivory">{p.t}</h4>
                    <p className="mt-2 max-w-[180px] text-[13px]" style={{ color: "#C9C3B0" }}>
                      {p.d}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Testimonials */}
      <section className="overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionHeading
            eyebrow={t.testimonials.eyebrow}
            title={t.testimonials.title}
            quote={t.testimonials.quote}
          />
        </div>
        <div className="marquee relative mt-16 overflow-hidden">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32"
            style={{ background: "linear-gradient(to right, #081A34, transparent)" }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32"
            style={{ background: "linear-gradient(to left, #081A34, transparent)" }}
          />
          <div className="marquee-track flex gap-6 w-max py-4">
            {[...t.testimonials.items, ...t.testimonials.items].map((testimonial, i) => (
              <figure key={i} className="glass-card w-[380px] shrink-0 p-8">
                <div className="font-display text-3xl leading-none" style={{ color: "#D4AF37" }}>
                  &ldquo;
                </div>
                <blockquote className="mt-3 font-serif-italic text-[17px] leading-relaxed text-ivory">
                  {testimonial.q}
                </blockquote>
                <figcaption
                  className="mt-6 text-[12px] uppercase tracking-[0.22em]"
                  style={{ color: "#C9C3B0" }}
                >
                  {testimonial.n} · <span style={{ color: "#D4AF37" }}>{testimonial.r}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Gallery */}
      <section className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          eyebrow={t.gallery.eyebrow}
          title={t.gallery.title}
          quote={t.gallery.quote}
        />
        <div className="mt-16">
          <div className="mb-5 flex items-center justify-between gap-4">
            <p className="text-[11px] uppercase tracking-[0.28em]" style={{ color: "#C9C3B0" }}>
              {t.gallery.scrollArchive}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => galleryStripRef.current?.scrollBy({ left: -420, behavior: "smooth" })}
                className="border px-3 py-2 text-[11px] uppercase tracking-[0.2em] transition-colors hover:bg-[rgba(212,175,55,0.08)]"
                style={{ borderColor: "rgba(212,175,55,0.25)", color: "#D4AF37" }}
              >
                {t.gallery.prev}
              </button>
              <button
                type="button"
                onClick={() => galleryStripRef.current?.scrollBy({ left: 420, behavior: "smooth" })}
                className="border px-3 py-2 text-[11px] uppercase tracking-[0.2em] transition-colors hover:bg-[rgba(212,175,55,0.08)]"
                style={{ borderColor: "rgba(212,175,55,0.25)", color: "#D4AF37" }}
              >
                {t.gallery.next}
              </button>
            </div>
          </div>
          <div
            ref={galleryStripRef}
            className="flex gap-4 overflow-x-auto pb-4 pr-2"
            style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(212,175,55,0.35) transparent" }}
          >
          {galleryPhotos.map((g, i) => (
            <figure
              key={i}
              data-d3="deep"
              className="relative shrink-0 overflow-hidden"
              style={{
                borderRadius: 12,
                border: "1px solid rgba(212,175,55,0.2)",
                width: "min(78vw, 320px)",
                aspectRatio: "3 / 4",
                transitionDelay: `${i * 40}ms`,
              }}
            >
              <img
                src={g}
                alt={t.seo.galleryAlts?.[i] || ""}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: "linear-gradient(180deg, transparent 60%, rgba(5,15,34,0.7) 100%)",
                }}
              />
            </figure>
          ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* FAQ preview */}
      <section className="mx-auto max-w-4xl px-6 md:px-10">
        <SectionHeading
          eyebrow={t.faq.eyebrow}
          title={t.faq.title}
          quote={t.faq.quote}
        />
        <FaqAccordion items={t.faq.items.slice(0, 3)} />
        <div className="mt-10 text-center">
          <CtaButton href="/faq">{t.faq.readAll || "Read All Questions"}</CtaButton>
        </div>
      </section>

      <SectionDivider />

      {/* Contact preview */}
      <section className="relative py-24" style={{ background: "#050F22" }}>
        <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
          <div className="text-[10px] uppercase tracking-[0.32em]" style={{ color: "#D4AF37" }}>
            {t.book.eyebrow}
          </div>
          <h2 className="mt-4 font-display text-4xl leading-tight text-ivory md:text-[44px]">
            {t.book.title}
          </h2>
          <p
            className="mx-auto mt-6 max-w-2xl font-serif-italic text-xl"
            style={{ color: "#C9C3B0" }}
          >
            {t.book.quote}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <CtaButton href="/contact">{t.hero.bookBtn}</CtaButton>
            <CtaButton href="https://wa.me/919999999999" variant="maroon">
              {t.hero.whatsappBtn}
            </CtaButton>
          </div>
          <p className="mt-8 text-[13px]" style={{ color: "#C9C3B0" }}>
            {t.book.hoursVal} · {t.book.contactVal} ·{" "}
            <Link to="/contact" className="underline" style={{ color: "#D4AF37" }}>
              {t.book.fullDetails || "Full details & appointment form"}
            </Link>
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
