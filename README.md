# Masum Kaji — Portfolio

A cinematic, streaming-inspired portfolio for Masum Kaji.

**Opening name:** MASUM KAJI
**Positioning:** Research Analyst • Business Strategist • Finance Specialist
**Visual direction:** charcoal and black with subtle gold accents
**Hero image:** supplied transparent portrait, optimized for responsive use

The finance positioning, current studies, contact links, journey, skills, achievements, and certificates use details Masum supplied or supporting records. The Research section is reserved for specific research notes and projects as they are developed.

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
- marketViews for dated daily, weekly, and monthly market notes
- libraryItems for books, PDFs/reports, quotes, and external resources

## Publish a market view

The Market Journal starts empty so no sample or placeholder is presented as your research. To publish a view, add an item to `marketViews` in `src/data/portfolio.ts`:

~~~ts
{
  date: '2026-11-01',
  cadence: 'Weekly', // 'Daily' | 'Weekly' | 'Monthly'
  market: 'Gold',
  title: 'Your view title',
  summary: 'A concise overview shown on the card.',
  thesis: 'Your central idea and timeframe.',
  evidence: ['A sourced observation or catalyst.'],
  scenarios: ['What could happen under the base or alternate case.'],
  risks: ['What could invalidate the view or change your mind.'],
  sources: [{ label: 'Source name', url: 'https://example.com/source' }],
},
~~~

The page adds timeframe filters and expandable detail cards automatically. Add newer entries at the top of the array. Keep sources and the date with each view; the site includes an educational-use notice.

## Add to the Research Library

Place files you have the right to share inside `public/library/` (create the folder if needed). Give files simple names, for example `gold-market-structure-notes.pdf`. Then add a record to `libraryItems` in `src/data/portfolio.ts`:

~~~ts
{
  kind: 'PDF / Report', // 'Book' | 'PDF / Report' | 'Quote' | 'Resource'
  title: 'Title shown in the archive',
  creator: 'Author or publisher',
  date: '2026',
  description: 'Why this is useful or what you took from it.',
  tags: ['Markets', 'Gold'],
  url: publicAsset('library/gold-market-structure-notes.pdf'),
},
~~~

For a quote, put the quote itself in `description` and credit the author in `creator`; a `url` is optional. Use a trusted external URL for a link/resource, or `publicAsset('library/your-file.pdf')` for a file in the library folder. The archive filters by type automatically.

These sections are content-managed through the project files, not a public upload form. After editing, run `npm run dev` to preview locally, then commit and publish through the existing hosting workflow when you are ready.

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
