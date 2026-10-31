import { motion } from 'framer-motion';
import { currentFocus } from '../data/portfolio';
import { EASE, SectionHeading } from './fx';

export default function CurrentlyBuilding() {
  return <>
    <SectionHeading kicker="Live priorities" title="Currently Building" aside={<p className="max-w-sm text-sm leading-relaxed text-mist">A current snapshot of the work, research, and learning behind the next chapter.</p>} />
    <div className="gutter grid gap-3 md:grid-cols-2">
      {currentFocus.map((item, i) => <motion.article key={item.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .65, delay: i * .07, ease: EASE }} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#101113] p-5 sm:p-7">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(70%_100%_at_100%_0%,rgba(217,180,106,0.10),transparent_65%)] opacity-70 transition group-hover:opacity-100" />
        <div className="relative flex items-start justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[.25em] text-gold-bright">{item.signal}</p><h3 className="mt-3 font-display text-2xl tracking-wide text-bone sm:text-3xl">{item.title}</h3></div><span className="rounded-full border border-gold/30 px-3 py-1 text-[10px] uppercase tracking-widest text-gold-bright">{item.status}</span></div>
        <p className="relative mt-4 max-w-xl text-sm leading-relaxed text-mist">{item.detail}</p>
        <div className="relative mt-6 h-px w-full bg-gradient-to-r from-gold/50 via-white/10 to-transparent" />
      </motion.article>)}
    </div>
    <p className="gutter mt-4 text-xs text-smoke">This board is updated as priorities change. No live account balances or private financial details are shown.</p>
  </>;
}
