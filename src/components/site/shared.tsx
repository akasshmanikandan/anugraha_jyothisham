import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import bhadrakaliPhoto from "@/assets/god-photo-3.jpeg";
import vinayagarPhoto from "@/assets/deity-vinayagar.jpg";
import vishnumayaPhoto from "@/assets/photo.png";
import { useLanguage, type Language } from "@/contexts/LanguageContext";

/* ================= Data ================= */

export const SERVICES = [
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

export const TESTIMONIALS = [
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

export const PROCESS = [
  { n: "01", t: "Book", d: "Reserve a private slot at a time of your choosing." },
  { n: "02", t: "Birth Details", d: "Share date, time and place of birth in confidence." },
  { n: "03", t: "Consultation", d: "A one-on-one reading held in person or by call." },
  { n: "04", t: "Remedies", d: "Receive personalised mantras, yantras and rituals." },
  { n: "05", t: "Follow-up", d: "Periodic guidance as the dasha and planets shift." },
];

export const FAQS = [
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

/* ================= Service Icons ================= */

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

/* ================= FX hooks ================= */

/** 3D toggle state, reflected on <html data-fx> for CSS overrides. */
export function useFx3d(): [boolean, () => void] {
  const [fx3d, setFx3d] = useState(true);
  useEffect(() => {
    document.documentElement.dataset.fx = fx3d ? "on" : "off";
    return () => {
      document.documentElement.dataset.fx = "on";
    };
  }, [fx3d]);
  return [fx3d, () => setFx3d((v) => !v)];
}

/** Scroll-linked 3D depth: sets --p (-1..1) on every [data-d3] element. */
export function useScrollDepth() {
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
}

/* ================= Chrome ================= */

export function SiteHeader() {
  const { lang, setLang, t } = useLanguage();
  const linkCls = "hover:text-ivory transition-colors";
  const languages: Language[] = ["en", "ta", "ml", "hi"];
  return (
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
          <Link to="/" className="font-display text-[15px] tracking-[0.24em] text-ivory">
            ANUGRAHA <span style={{ color: "#D4AF37" }}>·</span> JYOTHISHALAYA
          </Link>
          <nav
            className="hidden items-center gap-9 text-[12px] uppercase tracking-[0.22em] md:flex"
            style={{ color: "#C9C3B0" }}
          >
            <Link to="/services" className={linkCls} activeProps={{ style: { color: "#D4AF37" } }}>
              {t.nav.services}
            </Link>
            <Link to="/about" className={linkCls} activeProps={{ style: { color: "#D4AF37" } }}>
              {t.nav.about}
            </Link>
            <Link to="/faq" className={linkCls} activeProps={{ style: { color: "#D4AF37" } }}>
              {t.nav.faq}
            </Link>
            <Link to="/contact" className={linkCls} activeProps={{ style: { color: "#D4AF37" } }}>
              {t.nav.contact || "Contact"}
            </Link>
          </nav>
          <div className="hidden items-center gap-4 md:flex">
            <div className="flex items-center gap-1" aria-label={t.hero.chooseLang}>
              {languages.map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  className="px-2 py-1 text-[10px] uppercase tracking-[0.16em] transition-colors"
                  style={{ color: lang === code ? "#D4AF37" : "#C9C3B0" }}
                  aria-pressed={lang === code}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>
            <Link
              to="/contact"
              className="text-[12px] uppercase tracking-[0.22em]"
              style={{ color: "#D4AF37" }}
            >
              {t.nav.book}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const { t } = useLanguage();
  return (
    <footer className="relative overflow-hidden pt-16" style={{ background: "#050F22" }}>
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="font-display text-[15px] tracking-[0.28em] text-ivory">
              ANUGRAHA <span style={{ color: "#D4AF37" }}>·</span> JYOTHISHALAYA
            </div>
            <p className="mt-5 max-w-md font-serif-italic text-lg" style={{ color: "#C9C3B0" }}>
              {t.footer.description}
            </p>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.28em]" style={{ color: "#D4AF37" }}>
              {t.footer.headers.consultation}
            </div>
            <ul className="mt-4 space-y-2 text-[14px]" style={{ color: "#C9C3B0" }}>
              <li>
                <Link to="/services">{t.services.eyebrow}</Link>
              </li>
              <li>
                <Link to="/about">{t.about.eyebrow}</Link>
              </li>
              <li>
                <Link to="/contact">{t.book.eyebrow}</Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.28em]" style={{ color: "#D4AF37" }}>
              {t.footer.headers.contact}
            </div>
            <ul className="mt-4 space-y-2 text-[14px]" style={{ color: "#C9C3B0" }}>
              <li>{t.book.contactVal}</li>
              <li>{t.book.addressVal}</li>
            </ul>
          </div>
        </div>

        {/* Temple silhouette */}
        <div className="mt-16 -mb-2">
          <TempleSilhouette />
        </div>
        <div
          className="flex flex-wrap items-center justify-between gap-3 border-t py-6 text-[11px] uppercase tracking-[0.22em]"
          style={{ borderColor: "rgba(212,175,55,0.2)", color: "#C9C3B0" }}
        >
          <span>{t.footer.copyright}</span>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://www.troyflex.dev/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-ivory"
              style={{ color: "#D4AF37" }}
            >
              Developed by Troyflex
            </a>
            <span
              className="font-serif-italic normal-case tracking-normal text-[13px]"
              style={{ color: "#D4AF37" }}
            >
              {t.footer.shanti}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/** Page shell: background, scroll-depth fx, toggle, header, footer. */
export function PageFrame({ children }: { children: ReactNode }) {
  useFx3d();
  useScrollDepth();
  return (
    <div
      className="min-h-screen text-ivory"
      style={{ background: "#081A34", color: "#F7F4EA" }}
    >
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}

/* ================= Small components ================= */

export function CtaButton({
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
    variant === "maroon" ? "bg-maroon text-ivory hover:bg-maroon-deep" : "bg-transparent text-ivory";
  const className = `cta-btn group inline-flex items-center gap-3 px-7 py-4 text-[13px] uppercase tracking-[0.22em] font-medium border border-gold/40 transition-colors duration-300 ${cls}`;
  const style = { borderColor: "rgba(212,175,55,0.4)" };
  const inner = (
    <>
      <svg className="cta-trace" preserveAspectRatio="none" viewBox="0 0 200 60">
        <rect x="0.5" y="0.5" width="199" height="59" />
      </svg>
      <span className="relative z-10">{children}</span>
    </>
  );
  if (href?.startsWith("/")) {
    return (
      <Link to={href} className={className} style={style}>
        {inner}
      </Link>
    );
  }
  const Cmp: any = href ? "a" : "button";
  return (
    <Cmp href={href} onClick={onClick} type={type} className={className} style={style}>
      {inner}
    </Cmp>
  );
}

export function SectionDivider() {
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
      <div className="divider-diamond h-2.5 w-2.5 border border-gold" style={{ borderColor: "#D4AF37" }} />
      <div className="h-px w-24 md:w-48 gold-hairline" />
    </div>
  );
}

export function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
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

export function StatBlock({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl md:text-4xl" style={{ color: "#D4AF37" }}>
        <Counter end={end} suffix={suffix} />
      </div>
      <div className="mt-2 text-[11px] uppercase tracking-[0.22em]" style={{ color: "#C9C3B0" }}>
        {label}
      </div>
    </div>
  );
}

export function SectionHeading({
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
      <h2 className="mt-5 font-display text-4xl leading-tight text-ivory md:text-[48px]">{title}</h2>
      <p className="mt-6 font-serif-italic text-xl" style={{ color: "#C9C3B0" }}>
        {quote}
      </p>
    </div>
  );
}

export function Field({
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
      <label
        className="mb-2 block text-[11px] uppercase tracking-[0.22em]"
        style={{ color: "#D4AF37" }}
      >
        {label}
      </label>
      <input type={type} placeholder={placeholder} className="field w-full px-4 py-3 text-[14px]" />
    </div>
  );
}

export function ServiceCard({ s }: { s: (typeof SERVICES)[number] }) {
  return (
    <article
      data-d3="card"
      className="service-card group relative overflow-hidden p-8 md:p-10"
      style={{ background: "#081A34" }}
    >
      <div className="mb-6">
        <s.Icon />
      </div>
      <div className="mb-1 text-[10px] uppercase tracking-[0.28em]" style={{ color: "#D4AF37" }}>
        {s.sub}
      </div>
      <h3 className="font-display text-2xl text-ivory">{s.title}</h3>
      <p className="mt-4 text-[14.5px] leading-relaxed" style={{ color: "#C9C3B0" }}>
        {s.body}
      </p>
    </article>
  );
}

export function FaqAccordion({ items = FAQS }: { items?: typeof FAQS }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  return (
    <div className="mt-14 divide-y" style={{ borderColor: "rgba(212,175,55,0.2)" }}>
      {items.map((f, i) => {
        const open = openFaq === i;
        return (
          <div
            key={i}
            className="py-6"
            style={{
              borderTop: i === 0 ? "1px solid rgba(212,175,55,0.2)" : undefined,
              borderBottom: "1px solid rgba(212,175,55,0.2)",
            }}
          >
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
                <span className="relative block h-full w-full" style={{ color: "#D4AF37" }}>
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
                <p className="pt-5 pr-10 text-[15px] leading-relaxed" style={{ color: "#C9C3B0" }}>
                  {f.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function TempleSilhouette() {
  const { lang } = useLanguage();
  const names: Record<Language, string[]> = {
    en: ["Bhadrakali", "Vinayagar", "Vishnumaya"],
    ta: ["பத்ரகாளி", "விநாயகர்", "விஷ்ணுமாயா"],
    ml: ["ഭദ്രകാളി", "ഗണപതി", "വിഷ്ണുമായ"],
    hi: ["भद्रकाली", "विनायक", "विष्णुमाया"],
  };
  const deities = [
    { src: bhadrakaliPhoto, name: names[lang][0] },
    { src: vinayagarPhoto, name: names[lang][1] },
    { src: vishnumayaPhoto, name: names[lang][2] },
  ];
  return (
    <div className="grid grid-cols-3 items-end gap-3 md:gap-8" aria-label="Temple deities">
      {deities.map((deity) => (
        <figure key={deity.name} className="text-center">
          <div
            className="mx-auto aspect-[3/4] max-h-52 overflow-hidden border"
            style={{
              borderColor: "rgba(212,175,55,0.35)",
              clipPath: "polygon(50% 0%, 86% 16%, 100% 44%, 100% 100%, 0 100%, 0 44%, 14% 16%)",
              background: "#081A34",
            }}
          >
            <img src={deity.src} alt={deity.name} className="h-full w-full object-cover" loading="lazy" />
          </div>
          <figcaption
            className="mt-3 font-display text-[11px] uppercase tracking-[0.18em] md:text-[13px]"
            style={{ color: "#D4AF37" }}
          >
            {deity.name}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
