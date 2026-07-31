import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import astrologerImg from "@/assets/astrologer.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anugraha Jyotisham — Guiding Lives Through Ancient Wisdom" },
      {
        name: "description",
        content:
          "Traditional Vedic astrology, tantrikam, mantrikam and spiritual remedies from Anugraha Jyotisham. Sixteen years of guidance rooted in the śāstras.",
      },
      { property: "og:title", content: "Anugraha Jyotisham — Ancient Vedic Wisdom" },
      {
        property: "og:description",
        content:
          "Personal consultations in Jyotisha, Nadi, Vaasthu and Numerology. Rooted in tradition, delivered with discretion.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

/* ---------------- Zodiac Wheel ---------------- */

const ZODIAC_GLYPHS = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];

function ZodiacWheel() {
  return (
    <div className="wheel relative aspect-square w-full max-w-[560px]">
      <svg viewBox="-300 -300 600 600" className="w-full h-full">
        <g className="wheel-rotator">
          {/* Outer ring */}
          <circle
            cx="0"
            cy="0"
            r="280"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="0.75"
            opacity="0.9"
            data-draw
            style={{ ["--dash" as string]: 1800, ["--delay" as string]: 0 }}
          />
          <circle
            cx="0"
            cy="0"
            r="275"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="0.35"
            opacity="0.6"
            data-draw
            style={{ ["--dash" as string]: 1800, ["--delay" as string]: 120 }}
          />
          {/* Second ring */}
          <circle
            cx="0"
            cy="0"
            r="235"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="0.5"
            opacity="0.75"
            data-draw
            style={{ ["--dash" as string]: 1500, ["--delay" as string]: 300 }}
          />
          {/* Glyph ring baseline */}
          <circle
            cx="0"
            cy="0"
            r="205"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="0.35"
            opacity="0.55"
            data-draw
            style={{ ["--dash" as string]: 1300, ["--delay" as string]: 450 }}
          />
          {/* 12 divisions */}
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * 30 * Math.PI) / 180;
            const x1 = Math.cos(a) * 205;
            const y1 = Math.sin(a) * 205;
            const x2 = Math.cos(a) * 275;
            const y2 = Math.sin(a) * 275;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#D4AF37"
                strokeWidth="0.5"
                opacity="0.7"
                data-draw
                style={{ ["--dash" as string]: 100, ["--delay" as string]: 600 + i * 40 }}
              />
            );
          })}
          {/* Glyphs */}
          {ZODIAC_GLYPHS.map((g, i) => {
            const a = ((i * 30 + 15 - 90) * Math.PI) / 180;
            const x = Math.cos(a) * 240;
            const y = Math.sin(a) * 240;
            return (
              <text
                key={g}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="20"
                fill="#D4AF37"
                opacity="0.85"
                style={{
                  fontFamily: "Cinzel, serif",
                  animation: `drift-in 500ms ease-out ${1000 + i * 60}ms both`,
                }}
              >
                {g}
              </text>
            );
          })}
          {/* Inner rings */}
          <circle
            cx="0"
            cy="0"
            r="165"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="0.4"
            opacity="0.55"
            data-draw
            style={{ ["--dash" as string]: 1100, ["--delay" as string]: 700 }}
          />
          <circle
            cx="0"
            cy="0"
            r="120"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="0.4"
            opacity="0.5"
            data-draw
            style={{ ["--dash" as string]: 800, ["--delay" as string]: 900 }}
          />
          {/* Inner 8-point rose */}
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i * 45 * Math.PI) / 180;
            return (
              <line
                key={i}
                x1={0}
                y1={0}
                x2={Math.cos(a) * 120}
                y2={Math.sin(a) * 120}
                stroke="#D4AF37"
                strokeWidth="0.3"
                opacity="0.45"
                data-draw
                style={{ ["--dash" as string]: 130, ["--delay" as string]: 1100 + i * 30 }}
              />
            );
          })}
          {/* Innermost lotus dot */}
          <circle
            cx="0"
            cy="0"
            r="60"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="0.4"
            opacity="0.6"
            data-draw
            style={{ ["--dash" as string]: 400, ["--delay" as string]: 1300 }}
          />
          <circle
            cx="0"
            cy="0"
            r="4"
            fill="#D4AF37"
            style={{ animation: "drift-in 500ms ease-out 1600ms both" }}
          />
        </g>
      </svg>
      {/* soft central glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(212,175,55,0.10), transparent 55%)",
        }}
      />
    </div>
  );
}

/* ---------------- CTA Button ---------------- */

function CtaButton({
  children,
  variant = "ghost",
  href,
  onClick,
  type,
}: {
  children: React.ReactNode;
  variant?: "ghost" | "maroon";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const cls =
    variant === "maroon"
      ? "bg-maroon text-ivory hover:bg-maroon-deep"
      : "bg-transparent text-ivory";
  const Cmp: any = href ? "a" : "button";
  return (
    <Cmp
      href={href}
      onClick={onClick}
      type={type}
      className={`cta-btn group inline-flex items-center gap-3 px-7 py-4 text-[13px] uppercase tracking-[0.22em] font-medium border border-gold/40 transition-colors duration-300 ${cls}`}
      style={{ borderColor: "rgba(212,175,55,0.4)" }}
    >
      <svg className="cta-trace" preserveAspectRatio="none" viewBox="0 0 200 60">
        <rect x="0.5" y="0.5" width="199" height="59" />
      </svg>
      <span className="relative z-10">{children}</span>
    </Cmp>
  );
}

/* ---------------- Section Divider ---------------- */

function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.querySelector(".divider-diamond")?.classList.add("in-view");
            obs.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="flex items-center justify-center gap-4 py-14">
      <div className="h-px w-24 md:w-48 gold-hairline" />
      <div
        className="divider-diamond h-2.5 w-2.5 border border-gold"
        style={{ borderColor: "#D4AF37" }}
      />
      <div className="h-px w-24 md:w-48 gold-hairline" />
    </div>
  );
}

/* ---------------- Counter ---------------- */

function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const doneRef = useRef(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !doneRef.current) {
            doneRef.current = true;
            const dur = 1600;
            const start = performance.now();
            const step = (t: number) => {
              const p = Math.min(1, (t - start) / dur);
              const eased = 1 - Math.pow(1 - p, 3);
              setValue(Math.round(end * eased));
              if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);
  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

/* ---------------- Service Icons (thin gold stroke SVGs) ---------------- */

const stroke = {
  fill: "none",
  stroke: "#D4AF37",
  strokeWidth: 1,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function IconAstrology() {
  return (
    <svg viewBox="0 0 48 48" width="40" height="40" className="icon-stroke">
      <circle cx="24" cy="24" r="18" {...stroke} />
      <circle cx="24" cy="24" r="12" {...stroke} />
      <circle cx="24" cy="24" r="6" {...stroke} />
      <line x1="24" y1="6" x2="24" y2="42" {...stroke} />
      <line x1="6" y1="24" x2="42" y2="24" {...stroke} />
    </svg>
  );
}
function IconTantrikam() {
  return (
    <svg viewBox="0 0 48 48" width="40" height="40" className="icon-stroke">
      <polygon points="24,6 42,38 6,38" {...stroke} />
      <polygon points="24,42 6,10 42,10" {...stroke} />
    </svg>
  );
}
function IconMantrikam() {
  return (
    <svg viewBox="0 0 48 48" width="40" height="40" className="icon-stroke">
      <path d="M24 6 C 14 14, 14 34, 24 42 C 34 34, 34 14, 24 6 Z" {...stroke} />
      <circle cx="24" cy="24" r="3" {...stroke} />
    </svg>
  );
}
function IconVaithiyam() {
  return (
    <svg viewBox="0 0 48 48" width="40" height="40" className="icon-stroke">
      <path d="M18 8 L18 22 C 12 26, 12 38, 24 42 C 36 38, 36 26, 30 22 L30 8" {...stroke} />
      <line x1="18" y1="14" x2="30" y2="14" {...stroke} />
    </svg>
  );
}
function IconThambulam() {
  return (
    <svg viewBox="0 0 48 48" width="40" height="40" className="icon-stroke">
      <path d="M24 42 C 8 30, 8 12, 24 8 C 40 12, 40 30, 24 42 Z" {...stroke} />
      <path d="M24 8 C 24 20, 24 30, 24 42" {...stroke} />
    </svg>
  );
}
function IconFaceReading() {
  return (
    <svg viewBox="0 0 48 48" width="40" height="40" className="icon-stroke">
      <ellipse cx="24" cy="24" rx="12" ry="16" {...stroke} />
      <circle cx="19" cy="21" r="1" {...stroke} />
      <circle cx="29" cy="21" r="1" {...stroke} />
      <path d="M19 30 Q 24 33, 29 30" {...stroke} />
    </svg>
  );
}
function IconNadi() {
  return (
    <svg viewBox="0 0 48 48" width="40" height="40" className="icon-stroke">
      <path d="M6 24 Q 12 12, 18 24 T 30 24 T 42 24" {...stroke} />
      <line x1="6" y1="34" x2="42" y2="34" {...stroke} />
      <line x1="6" y1="14" x2="42" y2="14" {...stroke} />
    </svg>
  );
}
function IconVaasthu() {
  return (
    <svg viewBox="0 0 48 48" width="40" height="40" className="icon-stroke">
      <polyline points="8,22 24,8 40,22 40,40 8,40 8,22" {...stroke} />
      <line x1="24" y1="8" x2="24" y2="40" {...stroke} />
      <line x1="8" y1="22" x2="40" y2="22" {...stroke} />
    </svg>
  );
}
function IconNumerology() {
  return (
    <svg viewBox="0 0 48 48" width="40" height="40" className="icon-stroke">
      <circle cx="24" cy="24" r="18" {...stroke} />
      <polyline points="20,14 20,34" {...stroke} />
      <polyline points="14,20 20,14 26,20" {...stroke} />
      <polyline points="30,30 30,18 34,22" {...stroke} />
    </svg>
  );
}

const SERVICES = [
  {
    title: "Jyotisha",
    sub: "Astrology",
    body: "Vedic birth-chart analysis, dasha periods, and planetary remedies read from the sidereal śāstras.",
    Icon: IconAstrology,
  },
  {
    title: "Tantrikam",
    sub: "Sacred Rituals",
    body: "Traditional yantra installation and homa ceremonies for protection, prosperity and clarity.",
    Icon: IconTantrikam,
  },
  {
    title: "Mantrikam",
    sub: "Mantra Sādhana",
    body: "Personalised bīja and moola mantras with proper vidhi for chanting, initiation and japa.",
    Icon: IconMantrikam,
  },
  {
    title: "Vaithiyam",
    sub: "Ayurvedic Guidance",
    body: "Prakṛti-based counsel for restoring balance across dosha, diet and daily discipline.",
    Icon: IconVaithiyam,
  },
  {
    title: "Thambulam",
    sub: "Betel Leaf Divination",
    body: "Ancient south-Indian oracle reading for time-sensitive questions and turning points.",
    Icon: IconThambulam,
  },
  {
    title: "Sāmudrika",
    sub: "Face Reading",
    body: "Reading the temperament and destiny inscribed in the features of the face.",
    Icon: IconFaceReading,
  },
  {
    title: "Nadi",
    sub: "Palm-Leaf Reading",
    body: "Consultation of the Nadi granthas — recorded lives inscribed centuries before your birth.",
    Icon: IconNadi,
  },
  {
    title: "Vaasthu",
    sub: "Sacred Geometry",
    body: "Aligning homes, workplaces and temples with the directions, elements and mandala grid.",
    Icon: IconVaasthu,
  },
  {
    title: "Numerology",
    sub: "Science of Numbers",
    body: "Names, dates and vibrational numbers harmonised for personal and family wellbeing.",
    Icon: IconNumerology,
  },
];

/* ---------------- Testimonials ---------------- */

const TESTIMONIALS = [
  {
    q: "The remedies suggested were precise and deeply rooted in scripture. My family found peace after years of turbulence.",
    n: "Lakshmi Narayanan",
    r: "Chennai",
  },
  {
    q: "A rare astrologer who does not sensationalise. Every reading carried the weight of tradition and calm authority.",
    n: "Ananya Iyer",
    r: "Bengaluru",
  },
  {
    q: "Consulted for my son's marriage compatibility. The clarity we received made the decision effortless.",
    n: "Rajesh Menon",
    r: "Kochi",
  },
  {
    q: "Vaasthu recommendations for our new home changed the entire atmosphere. Quiet, dignified guidance.",
    n: "Priya Subramanian",
    r: "Coimbatore",
  },
  {
    q: "The Nadi reading was uncanny. Nothing embellished, nothing withheld — an honest window into karma.",
    n: "Vikram Bhatt",
    r: "Mumbai",
  },
  {
    q: "After a year of practising the mantra given to me, I feel a stillness I did not know was possible.",
    n: "Meera Krishnan",
    r: "Trivandrum",
  },
];

/* ---------------- Process Steps ---------------- */

const PROCESS = [
  { n: "01", t: "Book", d: "Reserve a private slot at a time of your choosing." },
  { n: "02", t: "Birth Details", d: "Share date, time and place of birth in confidence." },
  { n: "03", t: "Consultation", d: "A one-on-one reading held in person or by call." },
  { n: "04", t: "Remedies", d: "Receive personalised mantras, yantras and rituals." },
  { n: "05", t: "Follow-up", d: "Periodic guidance as the dasha and planets shift." },
];

/* ---------------- FAQ ---------------- */

const FAQS = [
  {
    q: "How is a traditional consultation different from an online report?",
    a: "A śāstric reading examines the interplay of chart, dasha, transits and lineage — nuances a template cannot see. Every remedy prescribed considers your capacity to practise it.",
  },
  {
    q: "What information do I need to share before booking?",
    a: "Your date of birth, exact time of birth (as close as possible), and place of birth. If unknown, we can perform a rectification session first.",
  },
  {
    q: "Are the remedies difficult to follow?",
    a: "Remedies are always calibrated to your life. Some are as simple as a mantra at dawn; others involve pooja on specific tithis. Nothing is asked of you that cannot be honoured.",
  },
  {
    q: "Is my consultation confidential?",
    a: "Absolutely. Every reading, chart and personal detail remains strictly between you and the astrologer.",
  },
  {
    q: "Do you offer follow-up consultations?",
    a: "Yes. Most clients return once or twice a year, and during significant dasha transitions or life events.",
  },
];

/* ---------------- Main page ---------------- */

function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [wick, setWick] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
      // Leader follows mouse with easing; each subsequent ember follows the previous.
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
        // ease opacity smoothly
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

  /* Scroll-linked 3D depth: sets --p (-1..1) on every [data-d3] element */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let queued = false;

    const update = () => {
      queued = false;
      const vh = window.innerHeight;
      const nodes = document.querySelectorAll<HTMLElement>("[data-d3]");
      nodes.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -vh * 0.4 || r.top > vh * 1.4) return;
        const center = r.top + r.height / 2;
        const p = Math.max(-1, Math.min(1, (center - vh / 2) / vh));
        el.style.setProperty("--p", p.toFixed(4));
      });
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
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
      // start filling when top passes 80% of viewport, end at 20%
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

  const headline = useMemo(
    () => ["Guiding", "Lives", "Through", "Ancient", "Wisdom"],
    []
  );

  return (
    <div className="min-h-screen text-ivory" style={{ background: "#081A34", color: "#F7F4EA" }}>
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40">
        <div
          className="border-b"
          style={{
            borderColor: "rgba(212,175,55,0.15)",
            background: "rgba(8,26,52,0.55)",
            backdropFilter: "blur(14px)",
          }}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
            <a href="#top" className="font-display text-[15px] tracking-[0.24em] text-ivory">
              ANUGRAHA <span style={{ color: "#D4AF37" }}>·</span> JYOTISHAM
            </a>
            <nav className="hidden items-center gap-9 text-[12px] uppercase tracking-[0.22em] md:flex" style={{ color: "#C9C3B0" }}>
              <a href="#services" className="hover:text-ivory transition-colors">Services</a>
              <a href="#about" className="hover:text-ivory transition-colors">About</a>
              <a href="#process" className="hover:text-ivory transition-colors">Process</a>
              <a href="#testimonials" className="hover:text-ivory transition-colors">Voices</a>
              <a href="#faq" className="hover:text-ivory transition-colors">FAQ</a>
            </nav>
            <a
              href="#book"
              className="hidden text-[12px] uppercase tracking-[0.22em] md:inline-block"
              style={{ color: "#D4AF37" }}
            >
              Book →
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section
        id="top"
        ref={heroRef}
        className="relative overflow-hidden pt-40 pb-24 md:pt-44 md:pb-32"
      >
        {/* Subtle vignette — not a pulsing orb */}
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
              <CtaButton href="#book">Book Consultation</CtaButton>
              <CtaButton href="https://wa.me/919999999999" variant="maroon">
                WhatsApp
              </CtaButton>
            </div>

            <div className="hero-stats mt-16 grid grid-cols-3 gap-6 border-t pt-8" style={{ borderColor: "rgba(212,175,55,0.18)" }}>
              <StatBlock end={16} suffix="+" label="Years of Practice" />
              <StatBlock end={5000} suffix="+" label="Clients Guided" />
              <StatBlock end={9} suffix="" label="Sacred Disciplines" />
            </div>
          </div>

          <div className="relative mx-auto flex items-center justify-center">
            <ZodiacWheel />
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Services */}
      <section id="services" className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          eyebrow="The Nine Disciplines"
          title="Sacred Consultations"
          quote="Each art a lamp; together, they illumine the whole of one life."
        />
        <div className="mt-16 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3" style={{ background: "rgba(212,175,55,0.15)" }}>
          {SERVICES.map((s) => (
            <article
              key={s.title}
              data-d3="card"
              className="service-card group relative overflow-hidden p-8 md:p-10"
              style={{ background: "#081A34" }}
            >

              <div className="mb-6">
                <s.Icon />
              </div>
              <div
                className="mb-1 text-[10px] uppercase tracking-[0.28em]"
                style={{ color: "#D4AF37" }}
              >
                {s.sub}
              </div>
              <h3 className="font-display text-2xl text-ivory">{s.title}</h3>
              <p className="mt-4 text-[14.5px] leading-relaxed" style={{ color: "#C9C3B0" }}>
                {s.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* About */}
      <section id="about" className="relative py-24" style={{ background: "#050F22" }}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 md:px-10 lg:grid-cols-2">
          <div className="relative">
            <div className="relative overflow-hidden" style={{ borderRadius: 16 }}>
              <img
                src={astrologerImg}
                alt="Portrait of the astrologer"
                width={1024}
                height={1280}
                loading="lazy"
                className="h-auto w-full object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  boxShadow: "inset 0 0 0 1px rgba(212,175,55,0.35)",
                  background: "linear-gradient(180deg, transparent 50%, rgba(5,15,34,0.55) 100%)",
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
              Pandit Sri Anantha Śāstri
            </h2>
            <p className="mt-6 font-serif-italic text-xl" style={{ color: "#C9C3B0" }}>
              "The sky is a mirror. My work is only to hold the mirror steady."
            </p>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: "#C9C3B0" }}>
              <p>
                Trained from the age of eleven in the temple town of Thanjavur, Sri Anantha is the
                fifth in an unbroken lineage of Jyotisha ācāryas. His practice weaves the
                Bṛhat Parāśara Horā Śāstra with the living traditions of Nadi and Tantrikam.
              </p>
              <p>
                Over sixteen years he has consulted for families, monastics and public figures with
                the same care — never sensational, never rushed, always faithful to the śāstras.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                ["1998", "Initiation at Thanjavur temple"],
                ["2005", "Guru-paramparā ordination"],
                ["2009", "Founded Anugraha Jyotisham"],
                ["2019", "Lineage in Nadi śāstra completed"],
              ].map(([yr, ev]) => (
                <div key={yr} className="border-l pl-4" style={{ borderColor: "rgba(212,175,55,0.35)" }}>
                  <div className="font-display text-[13px]" style={{ color: "#D4AF37" }}>
                    {yr}
                  </div>
                  <div className="mt-1 text-[14px]" style={{ color: "#F7F4EA" }}>
                    {ev}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Why Choose Us */}
      <section className="mx-auto max-w-7xl px-6 md:px-10">
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

      <SectionDivider />

      {/* Process Timeline */}
      <section id="process" className="relative py-24" style={{ background: "#050F22" }}>
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
                        boxShadow: active
                          ? "0 0 24px rgba(212,175,55,0.35)"
                          : "none",
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
      <section id="testimonials" className="overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionHeading
            eyebrow="Voices"
            title="Words Left Behind"
            quote="Gratitude is the only offering that outlasts the ritual."
          />
        </div>
        <div className="marquee relative mt-16 overflow-hidden">
          {/* edge fades */}
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
                <figcaption className="mt-6 text-[12px] uppercase tracking-[0.22em]" style={{ color: "#C9C3B0" }}>
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
                  background:
                    "linear-gradient(180deg, transparent 60%, rgba(5,15,34,0.7) 100%)",
                }}
              />
            </figure>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-4xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Questions"
          title="Before You Begin"
          quote="Ask freely — clarity is itself a first remedy."
        />
        <div className="mt-14 divide-y" style={{ borderColor: "rgba(212,175,55,0.2)" }}>
          {FAQS.map((f, i) => {
            const open = openFaq === i;
            return (
              <div key={i} className="py-6" style={{ borderTop: i === 0 ? "1px solid rgba(212,175,55,0.2)" : undefined, borderBottom: "1px solid rgba(212,175,55,0.2)" }}>
                <button
                  onClick={() => setOpenFaq(open ? null : i)}
                  className="flex w-full items-center justify-between gap-4 text-left"
                >
                  <span className="font-display text-lg text-ivory md:text-xl">{f.q}</span>
                  <span
                    className="inline-block h-6 w-6 shrink-0 border transition-transform duration-500"
                    style={{
                      borderColor: "rgba(212,175,55,0.6)",
                      transform: open ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    <span
                      className="relative block h-full w-full"
                      style={{ color: "#D4AF37" }}
                    >
                      <span
                        className="absolute left-1/2 top-1/2 h-px w-3 -translate-x-1/2 -translate-y-1/2"
                        style={{ background: "#D4AF37" }}
                      />
                      <span
                        className="absolute left-1/2 top-1/2 h-3 w-px -translate-x-1/2 -translate-y-1/2"
                        style={{ background: "#D4AF37" }}
                      />
                    </span>
                  </span>
                </button>
                <div className={`faq-panel ${open ? "open" : ""} mt-0`}>
                  <div>
                    <p
                      className="pt-5 pr-10 text-[15px] leading-relaxed"
                      style={{ color: "#C9C3B0" }}
                    >
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <SectionDivider />

      {/* Appointment Form */}
      <section id="book" className="relative py-24" style={{ background: "#050F22" }}>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 md:px-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <div className="text-[10px] uppercase tracking-[0.32em]" style={{ color: "#D4AF37" }}>
              Reserve a Sitting
            </div>
            <h2 className="mt-4 font-display text-4xl leading-tight text-ivory md:text-[44px]">
              A private hour with the śāstra.
            </h2>
            <p className="mt-6 font-serif-italic text-xl" style={{ color: "#C9C3B0" }}>
              Consultations by appointment. In person at our study in Chennai, or by secure video
              call.
            </p>
            <div className="mt-10 space-y-4 text-[14px]" style={{ color: "#C9C3B0" }}>
              <div className="flex items-baseline gap-4">
                <span className="w-24 uppercase tracking-[0.22em] text-[11px]" style={{ color: "#D4AF37" }}>
                  Hours
                </span>
                <span>Mon–Sat · 07:00 – 19:00 IST</span>
              </div>
              <div className="flex items-baseline gap-4">
                <span className="w-24 uppercase tracking-[0.22em] text-[11px]" style={{ color: "#D4AF37" }}>
                  Address
                </span>
                <span>No. 7, Kutchery Road, Mylapore, Chennai 600004</span>
              </div>
              <div className="flex items-baseline gap-4">
                <span className="w-24 uppercase tracking-[0.22em] text-[11px]" style={{ color: "#D4AF37" }}>
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
                <label className="mb-2 block text-[11px] uppercase tracking-[0.22em]" style={{ color: "#D4AF37" }}>
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
                <label className="mb-2 block text-[11px] uppercase tracking-[0.22em]" style={{ color: "#D4AF37" }}>
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

      {/* Footer with temple silhouette */}
      <footer className="relative overflow-hidden pt-16" style={{ background: "#050F22" }}>
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="font-display text-[15px] tracking-[0.28em] text-ivory">
                ANUGRAHA <span style={{ color: "#D4AF37" }}>·</span> JYOTISHAM
              </div>
              <p className="mt-5 max-w-md font-serif-italic text-lg" style={{ color: "#C9C3B0" }}>
                A private consultancy in traditional Vedic astrology and spiritual practice.
              </p>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.28em]" style={{ color: "#D4AF37" }}>
                Consultation
              </div>
              <ul className="mt-4 space-y-2 text-[14px]" style={{ color: "#C9C3B0" }}>
                <li><a href="#services">Nine Disciplines</a></li>
                <li><a href="#process">Process</a></li>
                <li><a href="#book">Book a Sitting</a></li>
              </ul>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.28em]" style={{ color: "#D4AF37" }}>
                Contact
              </div>
              <ul className="mt-4 space-y-2 text-[14px]" style={{ color: "#C9C3B0" }}>
                <li>+91 99999 99999</li>
                <li>office@anugrahajyotisham.in</li>
                <li>Mylapore, Chennai</li>
              </ul>
            </div>
          </div>

          {/* Temple silhouette */}
          <div className="mt-16 -mb-2">
            <TempleSilhouette />
          </div>
          <div
            className="flex items-center justify-between border-t py-6 text-[11px] uppercase tracking-[0.22em]"
            style={{ borderColor: "rgba(212,175,55,0.2)", color: "#C9C3B0" }}
          >
            <span>© 2026 Anugraha Jyotisham. All rights reserved.</span>
            <span className="font-serif-italic normal-case tracking-normal text-[13px]" style={{ color: "#D4AF37" }}>
              Ōm śānti śānti śānti
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ---------------- Small components ---------------- */

function StatBlock({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl md:text-4xl" style={{ color: "#D4AF37" }}>
        <Counter end={end} suffix={suffix} />
      </div>
      <div
        className="mt-2 text-[11px] uppercase tracking-[0.22em]"
        style={{ color: "#C9C3B0" }}
      >
        {label}
      </div>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  quote,
}: {
  eyebrow: string;
  title: string;
  quote: string;
}) {
  return (
    <div data-d3="float" className="mx-auto max-w-3xl text-center">
      <div className="text-[10px] uppercase tracking-[0.36em]" style={{ color: "#D4AF37" }}>
        {eyebrow}
      </div>
      <h2 className="mt-5 font-display text-4xl leading-tight text-ivory md:text-[48px]">
        {title}
      </h2>
      <p className="mt-6 font-serif-italic text-xl" style={{ color: "#C9C3B0" }}>
        {quote}
      </p>
    </div>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-[11px] uppercase tracking-[0.22em]" style={{ color: "#D4AF37" }}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="field w-full px-4 py-3 text-[14px]"
      />
    </div>
  );
}

function TempleSilhouette() {
  // Wide South-Indian gopuram silhouette. Thin gold hairline top edge.
  return (
    <svg
      viewBox="0 -20 1200 220"
      className="w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="tg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#0A2140" />
          <stop offset="100%" stopColor="#050F22" />
        </linearGradient>
      </defs>
      {/* left small shikhara */}
      <path
        d="M 0 200 L 0 140 L 60 140 L 60 120 L 80 100 L 100 80 L 120 100 L 140 120 L 140 140 L 200 140 L 200 200 Z"
        fill="url(#tg)"
        stroke="#D4AF37"
        strokeWidth="0.6"
        strokeOpacity="0.55"
      />
      {/* main gopuram */}
      <path
        d="M 240 200 L 240 130 L 300 130 L 300 110 L 320 90 L 340 70 L 360 50 L 380 30 L 400 15 L 420 30 L 440 50 L 460 70 L 480 90 L 500 110 L 500 130 L 560 130 L 560 200 Z"
        fill="url(#tg)"
        stroke="#D4AF37"
        strokeWidth="0.75"
        strokeOpacity="0.65"
      />
      {/* kalasha */}
      <circle cx="400" cy="10" r="4" fill="#D4AF37" opacity="0.85" />
      <line x1="400" y1="4" x2="400" y2="15" stroke="#D4AF37" strokeWidth="0.7" opacity="0.7" />
      {/* right big gopuram (mirrored, taller) */}
      <path
        d="M 600 200 L 600 150 L 660 150 L 660 130 L 680 110 L 700 90 L 720 70 L 740 45 L 760 20 L 780 0 L 800 20 L 820 45 L 840 70 L 860 90 L 880 110 L 900 130 L 900 150 L 960 150 L 960 200 Z"
        fill="url(#tg)"
        stroke="#D4AF37"
        strokeWidth="0.75"
        strokeOpacity="0.7"
      />
      <circle cx="780" cy="-4" r="4" fill="#D4AF37" opacity="0.9" />
      <line x1="780" y1="-10" x2="780" y2="4" stroke="#D4AF37" strokeWidth="0.7" opacity="0.75" />
      {/* right small shikhara */}
      <path
        d="M 1000 200 L 1000 140 L 1060 140 L 1060 120 L 1080 100 L 1100 80 L 1120 100 L 1140 120 L 1140 140 L 1200 140 L 1200 200 Z"
        fill="url(#tg)"
        stroke="#D4AF37"
        strokeWidth="0.6"
        strokeOpacity="0.55"
      />
      {/* horizon hairline */}
      <line x1="0" y1="199" x2="1200" y2="199" stroke="#D4AF37" strokeOpacity="0.25" strokeWidth="0.6" />
    </svg>
  );
}
