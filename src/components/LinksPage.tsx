import { profile } from '../data/portfolio';

type LinkCard = {
  label: string;
  detail: string;
  href: string;
  external?: boolean;
  primary?: boolean;
};

const links: LinkCard[] = [
  { label: 'Portfolio', detail: 'Research, ventures, work, and the full story.', href: '/', primary: true },
  { label: 'Market Notes', detail: 'Subscribe for research, market views, and decision notes.', href: '/newsletter/' },
  { label: 'Resume', detail: 'View the public resume and download the PDF.', href: '/resume/' },
  { label: 'YouTube', detail: 'Subscribe to TheMasumKaji on YouTube.', href: profile.links.youtube ?? 'https://www.youtube.com/', external: true },
  { label: 'Instagram', detail: 'Follow TheMasumKaji for updates and behind the scenes.', href: profile.links.instagram ?? 'https://www.instagram.com/themasumkaji/', external: true },
  { label: 'LinkedIn', detail: 'Connect professionally and follow my journey.', href: profile.links.linkedin ?? 'https://www.linkedin.com/', external: true },
  { label: 'Email', detail: 'For opportunities, collaborations, and conversations.', href: `mailto:${profile.email}` },
];

export default function LinksPage() {
  return (
    <main className="min-h-screen bg-ink px-4 py-8 text-bone sm:px-8 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <nav className="mb-12 flex items-center justify-between gap-4">
          <a href="/" className="text-xs font-bold uppercase tracking-[.28em] text-gold-bright hover:text-bone">M Portfolio</a>
          <a href="/" className="rounded-md border border-white/15 px-4 py-2.5 text-xs font-semibold text-bone transition hover:border-gold-bright/60">Back to portfolio ↗</a>
        </nav>
        <header className="text-center">
          <figure className="mx-auto mb-5 grid h-28 w-28 place-items-end overflow-hidden rounded-full border border-gold-bright/40 bg-[radial-gradient(circle_at_50%_20%,rgba(217,180,106,.3),transparent_65%),#101114] shadow-[0_0_36px_rgba(217,180,106,.12)]">
            <img src="/assets/masum-kaji-research-analyst.png" width="1347" height="1167" alt="Masum Kaji, research analyst, investor, and creator of TheMasumKaji" className="h-[118%] w-[118%] max-w-none object-contain object-bottom" />
          </figure>
          <p className="text-[10px] font-bold uppercase tracking-[.32em] text-gold-bright">TheMasumKaji</p>
          <h1 className="mt-3 font-display text-6xl leading-[.88] tracking-wide sm:text-7xl">ALL THE<br />IMPORTANT LINKS</h1>
          <p className="mx-auto mt-5 max-w-xl font-serif text-2xl italic leading-relaxed text-bone/90">One place for the work, research, and the journey.</p>
        </header>
        <section className="mt-10 grid gap-3" aria-label="Important links">
          {links.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              className={`group flex items-center gap-4 rounded-xl border p-5 transition sm:p-6 ${link.primary ? 'border-gold-bright/45 bg-[radial-gradient(ellipse_at_top_right,rgba(217,180,106,.17),transparent_58%),linear-gradient(145deg,#191712,#101114)] hover:border-gold-bright' : 'border-white/10 bg-white/[.025] hover:border-gold-bright/45 hover:bg-white/[.045]'}`}
            >
              <span className="font-display text-3xl tracking-wide text-gold-bright">0{index + 1}</span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-3xl leading-none tracking-wide sm:text-4xl">{link.label}</span>
                <span className="mt-2 block text-xs leading-relaxed text-mist sm:text-sm">{link.detail}</span>
              </span>
              <span className="text-xl text-gold-bright transition-transform group-hover:translate-x-1" aria-hidden="true">{link.external ? '↗' : '→'}</span>
            </a>
          ))}
        </section>
        <footer className="mt-10 border-t border-white/10 pt-5 text-center text-xs text-mist">masumkaji.tech · TheMasumKaji</footer>
      </div>
    </main>
  );
}
