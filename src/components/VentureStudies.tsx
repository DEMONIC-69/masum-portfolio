import { motion } from 'framer-motion';
import { ventureStudies } from '../data/portfolio';
import { EASE, SectionHeading } from './fx';
import { PosterBackdrop } from './Poster';

export default function VentureStudies() {
  return <>
    <SectionHeading kicker="Founder case files" title="Venture Case Studies" aside={<p className="max-w-sm text-sm leading-relaxed text-mist">The builds, decisions, outcomes, and lessons behind two ventures.</p>} />
    <div className="gutter grid gap-4 lg:grid-cols-2">
      {ventureStudies.map((study, i) => <motion.article key={study.name} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .75, delay: i * .1, ease: EASE }} className="relative min-h-[390px] overflow-hidden rounded-2xl border border-white/10 bg-ink-2 p-6 sm:p-9">
        <div className="absolute inset-0 opacity-70"><PosterBackdrop palette={study.palette} /></div><div className="absolute inset-0 bg-gradient-to-t from-[#090a0c] via-[#090a0c]/75 to-transparent" />
        <div className="relative flex min-h-[330px] flex-col justify-between"><div><p className="text-[10px] font-bold tracking-[.28em] text-gold-bright">{study.label}</p><h3 className="mt-5 font-display text-5xl tracking-wide text-bone sm:text-6xl">{study.name}</h3><p className="mt-4 max-w-lg text-sm leading-relaxed text-bone/80">{study.summary}</p></div><div><div className="mb-5 flex flex-wrap gap-2">{study.proof.map((point) => <span key={point} className="rounded-full border border-white/15 bg-black/30 px-3 py-1.5 text-xs text-bone">{point}</span>)}</div><p className="max-w-xl border-l border-gold/60 pl-4 text-sm leading-relaxed text-mist">{study.lessons}</p></div></div>
      </motion.article>)}
    </div>
    <p className="gutter mt-4 text-xs text-smoke">The figures above describe reported business outcomes; detailed acquisition and operating metrics can be added as they’re documented.</p>
  </>;
}
