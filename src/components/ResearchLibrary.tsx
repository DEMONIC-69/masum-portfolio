import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { libraryItems, type LibraryItem } from '../data/portfolio';
import { EASE, SectionHeading } from './fx';

const filters = ['All', 'Book', 'PDF / Report', 'Quote', 'Resource'] as const;

export default function ResearchLibrary() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All');
  const items = useMemo(() => libraryItems.filter((item) => filter === 'All' || item.kind === filter), [filter]);

  return <>
    <SectionHeading kicker="A curated shelf · growing over time" title="Research Library" aside={<p className="max-w-sm text-sm leading-relaxed text-mist">Books, papers, quotes, and useful resources I’ve selected. The archive will grow as I read and find material worth sharing.</p>} />
    <div className="gutter mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter library by type">
      {filters.map((item) => <button key={item} type="button" onClick={() => setFilter(item)} aria-pressed={filter === item} className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[.16em] transition ${filter === item ? 'border-gold/70 bg-gold/10 text-gold-bright' : 'border-white/10 text-mist hover:border-white/25 hover:text-bone'}`}>{item}</button>)}
    </div>
    {items.length ? <div className="gutter grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item, i) => <LibraryCard key={`${item.kind}-${item.title}`} item={item} index={i} />)}
    </div> : <div className="gutter"><div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[.045] to-transparent px-6 py-10 sm:px-9"><p className="text-[10px] font-bold uppercase tracking-[.26em] text-gold-bright">The shelf is ready</p><h3 className="mt-3 font-display text-3xl text-bone">Save only what’s worth returning to.</h3><p className="mt-3 max-w-2xl text-sm leading-relaxed text-mist">Add books, PDFs, quotes, and links to <code className="text-gold-bright">libraryItems</code> in <code className="text-gold-bright">src/data/portfolio.ts</code>. For a file you can share, place it in <code className="text-gold-bright">public/library/</code> and use its public path as the item URL.</p></div></div>}
  </>;
}

function LibraryCard({ item, index }: { item: LibraryItem; index: number }) {
  return <motion.article initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .55, delay: index * .05, ease: EASE }} className="flex min-h-56 flex-col rounded-xl border border-white/10 bg-gradient-to-br from-white/[.045] to-transparent p-5">
    <div className="flex items-center justify-between gap-3"><span className="text-[10px] font-bold uppercase tracking-[.22em] text-gold-bright">{item.kind}</span>{item.date && <span className="text-[10px] uppercase tracking-widest text-smoke">{item.date}</span>}</div>
    <h3 className="mt-5 font-display text-2xl text-bone">{item.title}</h3>{item.creator && <p className="mt-1 text-xs text-smoke">{item.creator}</p>}
    <p className="mt-3 flex-1 text-sm leading-relaxed text-mist">{item.kind === 'Quote' && item.description.length > 0 ? `“${item.description}”` : item.description}</p>
    {item.tags.length > 0 && <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1">{item.tags.map((tag) => <span key={tag} className="text-[10px] text-bone/60">#{tag.replace(/\s+/g, '')}</span>)}</div>}
    {item.url && <a href={item.url} target={item.url.startsWith('http') ? '_blank' : undefined} rel={item.url.startsWith('http') ? 'noreferrer' : undefined} className="mt-5 inline-flex w-fit items-center gap-2 border-b border-gold/40 pb-1 text-[10px] font-semibold uppercase tracking-[.18em] text-gold-bright hover:border-gold-bright">{item.kind === 'Book' ? 'Book details' : item.kind === 'PDF / Report' ? 'Open PDF' : 'Open resource'} <span aria-hidden>↗</span></a>}
  </motion.article>;
}
