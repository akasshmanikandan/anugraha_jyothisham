# Anugraha Wisdom

Build a landing page for Anugraha Jyotisham, a premium traditional Indian Vedic astrology and spiritual consultation brand. Dark, luxury, editorial — think Aman Resorts meets a temple manuscript, not a SaaS template.

Visual system (fixed — don't deviate)

Background: deep midnight blue #081A34, with #050F22 for recessed sections

Primary accent: antique gold #D4AF37 (thin 1px borders, never filled blocks of it)

Secondary: ivory #F7F4EA for text

Accent: deep maroon #6D1F2D used sparingly (WhatsApp CTA, badges)

Headings in Cinzel, quotes/taglines in Cormorant Garamond italic, body in Inter

Glassmorphism cards: near-black glass with a 1px gold-at-20%-opacity border, 16px radius, no drop shadows that read as "Bootstrap card"

The actual ask: motion direction

I don't want the default AI-website motion language — no generic "fade-up + 20px translate on scroll" applied uniformly to every div, no bouncy spring on every hover, no particle.js starfield, no gradient blob that pulses in the background. That's the tell of a templated build and I want the opposite: motion that feels choreographed and specific to this subject.

Design one orchestrated hero sequence on load, then keep everything else quiet:

Page loads on a bare midnight canvas.

A large zodiac wheel (concentric rings + 12 glyphs, thin gold hairlines) draws itself in with stroke-dasharray/stroke-dashoffset line-drawing animation, ring by ring, outer to inner, over ~1.8s.

As the wheel completes, the headline characters fade in with a very slight upward drift, staggered by word (not by letter — letter-stagger reads as a template default), timed to land just as the wheel finishes.

The wheel then settles into an extremely slow ambient rotation (60–120s per revolution) that never fully stops — this is the page's idle "breathing."

Beyond the hero, use motion sparingly and give each instance a reason tied to the content:

Stats counters (16+ years, 5000+ clients) count up from 0 only once, triggered on first scroll into view — not on every re-scroll.

Section dividers (the thin gold ornamental line-and-diamond motif): the diamond rotates 45° into place as it enters view, like a seal being stamped, rather than fading.

Service cards: on hover, the card's icon traces itself briefly (a quick 300ms stroke-draw replay), and a soft gold radial glow blooms from the top edge — no lift-and-shadow "floating card" cliché.

Process timeline (Book → Birth Details → Consultation → Remedies → Follow-up): the connecting dotted line fills left-to-right as the user scrolls through the section, like a wick lighting, so progress through the steps is visually tied to scroll position.

Testimonial cards: gentle horizontal auto-scroll (marquee-style, pause on hover), not a carousel with dots and arrows.

Cursor interaction (desktop only): a faint trailing gold dust/ember particle follows the cursor at low opacity within the hero only — subtle, not a gimmick, and it should fade out completely outside the hero section.

CTA buttons: on hover, the gold border traces itself around the perimeter (like a seal closing) rather than a background color swap or scale-up.

Explicit avoid list

No uniform "everything fades up on scroll" — vary or omit entirely for most elements

No spring/bounce easing on buttons or cards

No floating/pulsing gradient orbs in the background

No particle.js-style generic starfield

No carousel dots/arrows for testimonials

No confetti, no emoji, no generic "AI startup" iconography (rockets, lightbulbs, sparkle-star icons)

No letter-by-letter text scramble/decode effects — too "hacker terminal," wrong register for this brand

Sections to include

Hero (headline "Guiding Lives Through Ancient Wisdom," stats, dual CTA: Book Consultation / WhatsApp) → Services grid (9 cards: Astrology, Tantrikam, Mantrikam, Vaithiyam, Thambulam, Face Reading, Nadi, Vaasthu, Numerology) → About (astrologer bio, timeline) → Why Choose Us → Consultation Process (5 steps) → Testimonials → Gallery → FAQ accordion (smooth height animation, not instant snap) → Appointment form (dark inputs, gold focus rings) → Footer with temple silhouette.

Respect prefers-reduced-motion: disable the ambient wheel rotation, cursor trail, and scroll-triggered fills for users who request it — replace with instant/static states, not just slower versions.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e95ab885-1ec5-48f1-a545-fe163a27f99d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
