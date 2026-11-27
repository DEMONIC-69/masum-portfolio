import type { ReactNode } from 'react';
import { profile } from '../data/portfolio';

type LinkCard = {
  label: string;
  detail: string;
  href: string;
  icon: 'home' | 'notes' | 'resume' | 'contact' | 'youtube' | 'instagram' | 'linkedin' | 'email';
  external?: boolean;
  primary?: boolean;
};

const links: LinkCard[] = [
  { label: 'Portfolio', detail: 'Research, ventures, work, and the full story.', href: '/', icon: 'home', primary: true },
  { label: 'Market Notes', detail: 'Subscribe for research, market views, and decision notes.', href: '/newsletter/', icon: 'notes' },
  { label: 'Resume', detail: 'View the public resume and download the PDF.', href: '/resume/', icon: 'resume' },
  { label: 'Contact', detail: 'Send a professional inquiry or collaboration request.', href: '/contact/', icon: 'contact' },
  { label: 'YouTube', detail: 'Subscribe to TheMasumKaji on YouTube.', href: profile.links.youtube ?? 'https://www.youtube.com/', icon: 'youtube', external: true },
  { label: 'Instagram', detail: 'Follow TheMasumKaji for updates and behind the scenes.', href: profile.links.instagram ?? 'https://www.instagram.com/themasumkaji/', icon: 'instagram', external: true },
  { label: 'LinkedIn', detail: 'Connect professionally and follow my journey.', href: profile.links.linkedin ?? 'https://www.linkedin.com/', icon: 'linkedin', external: true },
  { label: 'Email', detail: 'For opportunities, collaborations, and conversations.', href: `mailto:${profile.email}`, icon: 'email', external: true },
];

function LinkIcon({ name }: { name: LinkCard['icon'] }) {
  const shared = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, strokeWidth: 1.7 };
  const shapes: Record<LinkCard['icon'], ReactNode> = {
    home: <><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9M9 20v-6h6v6" /></>,
    notes: <><path d="M7 3h8l4 4v14H7z" /><path d="M15 3v5h4M10 12h6M10 16h6" /></>,
    resume: <><path d="M7 3h8l4 4v14H7z" /><path d="M15 3v5h4M10 12h6M10 16h6" /><path d="M4 7v14" /></>,
    contact: <><path d="M4 5h16v12H9l-5 4z" /><path d="M8 10h8M8 13h5" /></>,
    youtube: <><rect x="3" y="5" width="18" height="14" rx="4" /><path d="m10 9 5 3-5 3z" fill="currentColor" stroke="none" /></>,
    instagram: <><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.8" r=".8" fill="currentColor" stroke="none" /></>,
    linkedin: <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7M8 7v.01M12 17v-7m0 3a3 3 0 0 1 6 0v4" /></>,
    email: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
  };

  return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" {...shared}>{shapes[name]}</svg>;
}

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
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-mist">Masum Kaji is a research analyst, investor, market researcher, and YouTube creator. Explore global markets, equity and stock-market research, commodities, business strategy, and selected trading notes.</p>
        </header>
        <section className="mt-10 grid gap-3" aria-label="Important links">
          {links.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              className={`group flex items-center gap-4 rounded-xl border p-5 transition sm:p-6 ${link.primary ? 'border-gold-bright/45 bg-[radial-gradient(ellipse_at_top_right,rgba(217,180,106,.17),transparent_58%),linear-gradient(145deg,#191712,#101114)] hover:border-gold-bright' : 'border-white/10 bg-white/[.025] hover:border-gold-bright/45 hover:bg-white/[.045]'}`}
            >
              <span className="flex w-14 shrink-0 flex-col items-center gap-2 text-gold-bright sm:w-16">
                <span className="font-display text-3xl leading-none tracking-wide">0{index + 1}</span>
                <span className="grid h-9 w-9 place-items-center rounded-full border border-gold-bright/25 bg-black/20 text-gold-bright transition group-hover:border-gold-bright/70 group-hover:bg-gold-bright/10"><LinkIcon name={link.icon} /></span>
              </span>
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
