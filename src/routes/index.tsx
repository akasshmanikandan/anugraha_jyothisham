import { ClientOnly, createFileRoute, Link } from "@tanstack/react-router";
import { Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";

const VedicScene = lazy(() => import("@/components/VedicScene"));

import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import sreeChakra from "@/assets/sree-chakra.png.asset.json";

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
  const [wick, setWick] = useState(0);
  const [fx3d, toggleFx] = useFx3d();
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

  const headline = useMemo(() => ["Guiding", "Lives", "Through", "Ancient", "Wisdom"], []);

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
              Since 2009 · Rooted in Śāstra
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
              A private consultancy in Vedic astrology, sacred ritual and the quiet arts of remedy —
              carried forward from a lineage of temple astrologers.
            </p>

            <div className="hero-ctas mt-10 flex flex-wrap items-center gap-4">
              <CtaButton href="/contact">Book Consultation</CtaButton>
              <CtaButton href="https://wa.me/919999999999" variant="maroon">
                WhatsApp
              </CtaButton>
            </div>

            <div
              className="hero-stats mt-16 grid grid-cols-3 gap-6 border-t pt-8"
              style={{ borderColor: "rgba(212,175,55,0.18)" }}
            >
              <StatBlock end={16} suffix="+" label="Years of Practice" />
              <StatBlock end={5000} suffix="+" label="Clients Guided" />
              <StatBlock end={9} suffix="" label="Sacred Disciplines" />
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
          eyebrow="The Nine Disciplines"
          title="Sacred Consultations"
          quote="Each art a lamp; together, they illumine the whole of one life."
        />
        <div
          className="mt-16 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3"
          style={{ background: "rgba(212,175,55,0.15)" }}
        >
          {SERVICES.slice(0, 3).map((s) => (
            <ServiceCard key={s.title} s={s} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <CtaButton href="/services">View All Nine Disciplines</CtaButton>
        </div>
      </section>

      <SectionDivider />

      {/* About preview */}
      <section className="relative py-24" style={{ background: "#050F22" }}>
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
            <h2 className="mt-4 font-display text-4xl md:text-[44px] text-ivory leading-tight">
              Sri. V. Govindan Namboodiri
            </h2>
            <p
              className="mt-3 text-[12px] uppercase tracking-[0.28em]"
              style={{ color: "#D4AF37" }}
            >
              Vedic Astrologer
            </p>
            <p className="mt-8 text-[15px] leading-relaxed" style={{ color: "#C9C3B0" }}>
              Horoscope and predictions, marriage matching, muhurtha, numerology, lucky names and
              rasi gems — with all kinds of parihara rituals and Homam performed. Astrological
              services anywhere in the world, in Tamil, English, Hindi and Malayalam.
            </p>
            <div className="mt-8">
              <CtaButton href="/about">About the Practice</CtaButton>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Process Timeline */}
      <section className="relative py-24" style={{ background: "#050F22" }}>
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionHeading
            eyebrow="Consultation Path"
            title="Five Steps, Held with Care"
            quote="The right path is walked slowly, one lamp at a time."
          />

          <div ref={timelineRef} className="relative mt-20">
            <div className="wick-line" />
            <div className="wick-fill" style={{ ["--wick" as string]: `${wick}%` }} />

            <ol className="relative grid grid-cols-2 gap-y-14 md:grid-cols-5 md:gap-y-0">
              {PROCESS.map((p, i) => {
                const active = wick > (i / (PROCESS.length - 1)) * 100 - 5;
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
            eyebrow="Voices"
            title="Words Left Behind"
            quote="Gratitude is the only offering that outlasts the ritual."
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
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <figure key={i} className="glass-card w-[380px] shrink-0 p-8">
                <div className="font-display text-3xl leading-none" style={{ color: "#D4AF37" }}>
                  &ldquo;
                </div>
                <blockquote className="mt-3 font-serif-italic text-[17px] leading-relaxed text-ivory">
                  {t.q}
                </blockquote>
                <figcaption
                  className="mt-6 text-[12px] uppercase tracking-[0.22em]"
                  style={{ color: "#C9C3B0" }}
                >
                  {t.n} · <span style={{ color: "#D4AF37" }}>{t.r}</span>
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
          eyebrow="From the Practice"
          title="Instruments & Rituals"
          quote="The tools are old; the questions, always new."
        />
        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[gallery1, gallery2, gallery3, gallery4].map((g, i) => (
            <figure
              key={i}
              data-d3="deep"
              className="relative overflow-hidden"
              style={{
                borderRadius: 12,
                border: "1px solid rgba(212,175,55,0.2)",
                transitionDelay: `${i * 40}ms`,
              }}
            >
              <img
                src={g}
                alt=""
                width={1024}
                height={1280}
                loading="lazy"
                className="h-64 w-full object-cover md:h-80"
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
      </section>

      <SectionDivider />

      {/* FAQ preview */}
      <section className="mx-auto max-w-4xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Questions"
          title="Before You Begin"
          quote="Ask freely — clarity is itself a first remedy."
        />
        <FaqAccordion items={FAQS.slice(0, 3)} />
        <div className="mt-10 text-center">
          <CtaButton href="/faq">Read All Questions</CtaButton>
        </div>
      </section>

      <SectionDivider />

      {/* Contact preview */}
      <section className="relative py-24" style={{ background: "#050F22" }}>
        <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
          <div className="text-[10px] uppercase tracking-[0.32em]" style={{ color: "#D4AF37" }}>
            Reserve a Sitting
          </div>
          <h2 className="mt-4 font-display text-4xl leading-tight text-ivory md:text-[44px]">
            A private hour with the śāstra.
          </h2>
          <p
            className="mx-auto mt-6 max-w-2xl font-serif-italic text-xl"
            style={{ color: "#C9C3B0" }}
          >
            Consultations by appointment, in person at Mylapore, Chennai, or by secure video call —
            anywhere in the world.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <CtaButton href="/contact">Book a Consultation</CtaButton>
            <CtaButton href="https://wa.me/919999999999" variant="maroon">
              WhatsApp
            </CtaButton>
          </div>
          <p className="mt-8 text-[13px]" style={{ color: "#C9C3B0" }}>
            Mon–Sat · 07:00 – 19:00 IST · +91 99999 99999 ·{" "}
            <Link to="/contact" className="underline" style={{ color: "#D4AF37" }}>
              Full details &amp; appointment form
            </Link>
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
