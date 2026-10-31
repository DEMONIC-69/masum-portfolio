import { motion } from 'framer-motion';
import { journalEntries } from '../data/portfolio';
import { EASE, SectionHeading } from './fx';

export default function OpenJournal() {
  return <>
    <SectionHeading kicker="Notes & observations" title="Open Journal" aside={<p className="max-w-sm text-sm leading-relaxed text-mist">A growing knowledge vault for market research, business lessons, books, and ideas worth revisiting.</p>} />
    <div className="gutter grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {journalEntries.map((entry, i) => <motion.article key={entry.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6, delay: i * .06, ease: EASE }} className="relative flex min-h-[255px] flex-col rounded-xl border border-white/10 bg-gradient-to-br from-white/[.045] to-transparent p-5">
        <div className="flex items-center justify-between gap-2"><span className="text-[10px] font-bold uppercase tracking-[.22em] text-gold-bright">{entry.category}</span><span className="rounded-full border border-white/10 px-2 py-1 text-[9px] uppercase tracking-widest text-smoke">{entry.status}</span></div>
        <p className="mt-5 text-[10px] uppercase tracking-[.18em] text-smoke">{entry.date}</p><h3 className="mt-2 font-display text-2xl text-bone">{entry.title}</h3><p className="mt-3 flex-1 text-sm leading-relaxed text-mist">{entry.summary}</p>
        <div className="mt-5 flex flex-wrap gap-2">{entry.tags.map((tag) => <span key={tag} className="text-[10px] text-bone/60">#{tag.replace(/\s+/g, '')}</span>)}</div>
      </motion.article>)}
    </div>
    <p className="gutter mt-5 text-xs text-smoke">To publish a note, add a dated entry in <span className="text-gold-bright">journalEntries</span> in the central portfolio data. Draft prompts are not published claims or trade calls.</p>
  </>;
}
