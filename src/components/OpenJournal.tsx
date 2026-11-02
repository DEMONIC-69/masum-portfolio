import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { marketViews, type MarketView } from '../data/portfolio';
import { EASE, SectionHeading } from './fx';

const filters = ['All', 'Daily', 'Weekly', 'Monthly'] as const;

export default function OpenJournal() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All');
  const views = useMemo(() => marketViews.filter((item) => filter === 'All' || item.cadence === filter), [filter]);

  return <>
    <SectionHeading kicker="Research notes · updated as views develop" title="Market Journal" aside={<p className="max-w-sm text-sm leading-relaxed text-mist">Daily, weekly, and monthly perspectives on markets. Each view can include a thesis, evidence, scenarios, risks, and source links.</p>} />
    <div className="gutter mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter market views by timeframe">
      {filters.map((item) => <button key={item} type="button" onClick={() => setFilter(item)} aria-pressed={filter === item} className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[.16em] transition ${filter === item ? 'border-gold/70 bg-gold/10 text-gold-bright' : 'border-white/10 text-mist hover:border-white/25 hover:text-bone'}`}>{item}</button>)}
    </div>
    {views.length ? <div className="gutter grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {views.map((view, i) => <MarketCard key={`${view.date}-${view.title}`} view={view} index={i} />)}
    </div> : <div className="gutter"><div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[.045] to-transparent px-6 py-8 sm:px-9"><p className="text-[10px] font-bold uppercase tracking-[.26em] text-gold-bright">The journal is ready for its first dated view</p><h3 className="mt-3 font-display text-3xl text-bone">A clear process makes a useful market note.</h3><p className="mt-3 max-w-2xl text-sm leading-relaxed text-mist">Each post can show the idea, the evidence behind it, the alternative scenarios, and what would change the view. No predictions or performance claims need to be implied.</p><div className="mt-6 grid gap-3 md:grid-cols-3">{[
      ['Daily', 'Session context', 'Catalysts, key levels, scenarios, and invalidation for the day.'],
      ['Weekly', 'The market map', 'What changed, which assets matter, and what could shift the thesis.'],
      ['Monthly', 'The bigger picture', 'Macro themes, research updates, and lessons from the month.'],
    ].map(([cadence, title, description]) => <div key={cadence} className="rounded-xl border border-white/10 bg-black/20 p-4"><p className="text-[9px] font-bold uppercase tracking-[.2em] text-gold-bright">{cadence} view</p><h4 className="mt-2 text-sm font-semibold text-bone">{title}</h4><p className="mt-2 text-xs leading-relaxed text-mist">{description}</p></div>)}</div><p className="mt-5 text-[10px] leading-relaxed text-smoke">When the first view is published, it will appear here with its date, market, source links, scenarios, and risks.</p></div></div>}
    <p className="gutter mt-5 text-xs leading-relaxed text-smoke">Research commentary for education and discussion. It is not personalized financial advice or a trade instruction. Views can change; check the date and linked sources.</p>
  </>;
}

function MarketCard({ view, index }: { view: MarketView; index: number }) {
  return <motion.a href="/market-notes/btcusd-sfx-go/" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .55, delay: index * .05, ease: EASE }} className="block overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/[.045] to-transparent p-5 text-left transition hover:border-gold/40 hover:bg-white/[.025]">
      <div className="flex items-center justify-between gap-3"><span className="text-[10px] font-bold uppercase tracking-[.22em] text-gold-bright">{view.market}</span><span className="rounded-full border border-white/10 px-2.5 py-1 text-[9px] uppercase tracking-widest text-smoke">{view.cadence}</span></div>
      <p className="mt-5 text-[10px] uppercase tracking-[.18em] text-smoke">{view.date}</p><h3 className="mt-2 font-display text-2xl text-bone">{view.title}</h3><p className="mt-3 text-sm leading-relaxed text-mist">{view.summary}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.18em] text-gold-bright">Read full note <span aria-hidden>↗</span></span>
  </motion.a>;
}
