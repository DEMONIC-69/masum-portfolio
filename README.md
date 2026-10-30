# Masum Kaji — Portfolio

A cinematic, streaming-inspired portfolio for Masum Kaji.

**Opening name:** MASUM KAJI
**Positioning:** Research Analyst • Capital Allocator • Commodity Researcher
**Visual direction:** charcoal and black with subtle gold accents
**Hero image:** supplied transparent portrait, optimized for responsive use

The finance positioning, current studies, contact links, achievements, and certificates use details Masum supplied or supporting records. Research examples, work history, and résumé details remain empty until verified information is provided.

## Run locally

Requires Node.js 18 or newer.

~~~bash
npm install
npm run dev
~~~

Open the local URL Vite prints, usually http://localhost:5173.

## Update the portfolio

The central content is in src/data/portfolio.ts. Add details there only after they are confirmed.

- profile: name, positioning, bio, links, portrait
- projects, seasons, education, experience
- skillCategories, achievements, certifications, topPicks, introSlides

The page layout and animations are kept in src/components/. The dark charcoal and gold palette is in src/index.css.

## Portrait

The site now uses the supplied transparent portrait, optimized into responsive WebP images for the opening sequence, hero, About section, Play Intro, and Masum profile tile on the viewer selection screen. The original template portraits are not used.

The source portrait is src/assets/masum-portrait.png. The image script creates responsive WebP versions and a social card from it.

~~~bash
npm run images
~~~

The Milestones section includes the supplied NISM/SEBI participation certificates, LearnTube forex certificate, and Atlas Funded and V Prop Trader records. Supporting screenshots for the trading and business milestones are in public/certificates/.

## Backups

Before customization, the original source and public assets were copied to _local-backups/2026-10-30-before-masum/. That folder is excluded from Git. The original template archive, source photos, portrait assets, and résumé are preserved there and are no longer in the active project or public/assets/.
