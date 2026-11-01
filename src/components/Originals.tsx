import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { projects, type Project } from '../data/portfolio';
import { useDesktop, useReducedMotionPref } from '../hooks/useMedia';
import { EASE, RevealText } from './fx';
import ProjectCard from './ProjectCard';

/**
 * ORIGINALS — on desktop the section pins and scrolls sideways like a title sequence.
 * On touch / small screens / reduced motion it becomes a native swipe rail.
 */
export default function Originals({ onOpen }: { onOpen: (p: Project) => void }) {
  const desktop = useDesktop();
  const reduced = useReducedMotionPref();
  return desktop && !reduced ? <PinnedOriginals onOpen={onOpen} /> : <RailOriginals onOpen={onOpen} />;
}

function Intro() {
  return (
    <div className="flex w-full shrink-0 flex-col justify-center lg:w-[34vw]">
      <p className="mb-3 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-gold-bright">
        <span className="h-px w-8 bg-gold-bright" /> Founder research desk
      </p>
      <RevealText as="h2" text="RESEARCH" className="font-display text-[clamp(3.5rem,9vw,8rem)] leading-[0.85] text-bone" />
      <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-mist">A growing record of business case studies and market research, with dated views, evidence, scenarios, and risks.</p>
      <div className="mt-6 flex flex-wrap gap-2">
        <a href="#ventures" className="rounded-full border border-gold/50 bg-gold/10 px-3 py-2 text-[9px] font-bold uppercase tracking-[.16em] text-gold-bright transition hover:bg-gold/20">Siftmirth case file ↗</a>
        <a href="#journal" className="rounded-full border border-white/15 px-3 py-2 text-[9px] font-bold uppercase tracking-[.16em] text-mist transition hover:border-white/35 hover:text-bone">Market journal ↗</a>
      </div>
      <p className="mt-6 hidden text-xs tracking-[0.24em] text-smoke lg:block">SCROLL TO BROWSE →</p>
    </div>
  );
}

function SiftmirthCaseFile() {
  return (
    <a href="#ventures" className="group relative flex aspect-[3/4] w-[70vw] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-2xl border border-gold/30 bg-[radial-gradient(90%_80%_at_100%_0%,rgba(217,180,106,.2),transparent_70%),linear-gradient(145deg,#1b1710,#0e0f11)] p-6 transition hover:-translate-y-1 hover:border-gold/70 sm:w-[44vw] lg:aspect-auto lg:h-[66vh] lg:w-[24vw] lg:p-7">
      <div><p className="text-[9px] font-bold uppercase tracking-[.25em] text-gold-bright">Featured founder case file</p><h3 className="mt-5 font-display text-4xl tracking-wide text-bone">Siftmirth</h3><p className="mt-3 text-xs leading-relaxed text-mist">A one-person, AI-assisted gifting venture: product idea, operating model, recorded sales, costs, and exit.</p></div>
      <div><div className="grid grid-cols-2 gap-2"><span className="rounded-lg border border-white/10 bg-black/25 p-3"><span className="block text-[8px] uppercase tracking-widest text-smoke">Revenue</span><span className="mt-1 block font-display text-xl text-bone">$375</span></span><span className="rounded-lg border border-white/10 bg-black/25 p-3"><span className="block text-[8px] uppercase tracking-widest text-smoke">Est. net</span><span className="mt-1 block font-display text-xl text-gold-bright">~$195</span></span></div><span className="mt-5 inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.18em] text-gold-bright">Open the full case study <span className="transition-transform group-hover:translate-x-1">↗</span></span></div>
    </a>
  );
}

function CoverageCard({ label, title, summary }: { label: string; title: string; summary: string }) {
  return (
    <a href="#journal" className="group flex aspect-[3/4] w-[70vw] shrink-0 snap-start flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-br from-white/[.055] to-transparent p-6 transition hover:-translate-y-1 hover:border-white/25 sm:w-[44vw] lg:aspect-auto lg:h-[66vh] lg:w-[24vw] lg:p-7">
      <div><p className="text-[9px] font-bold uppercase tracking-[.25em] text-gold-bright">{label}</p><h3 className="mt-5 font-display text-3xl tracking-wide text-bone">{title}</h3><p className="mt-3 text-xs leading-relaxed text-mist">{summary}</p></div>
      <span className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.18em] text-mist transition group-hover:text-bone">Read dated market views <span className="transition-transform group-hover:translate-x-1">↗</span></span>
    </a>
  );
}

function PinnedOriginals({ onOpen }: { onOpen: (p: Project) => void }) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const distMV = useMotionValue(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (!track.current) return;
      const d = Math.max(0, track.current.scrollWidth - window.innerWidth);
      setDist(d);
      distMV.set(d);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [distMV]);

  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] });
  const raw = useTransform([scrollYProgress, distMV], ([p, d]: number[]) => -p * d);
  const x = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 });
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={wrap} style={{ height: `calc(100vh + ${dist}px)` }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(50%_60%_at_70%_50%,rgba(217,180,106,0.05),transparent_70%)]" />
        <motion.div ref={track} style={{ x }} className="gutter relative flex items-center gap-8 pr-[12vw]" data-cursor="drag">
          <Intro />
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onOpen={() => onOpen(p)} />
          ))}
          <SiftmirthCaseFile />
          <CoverageCard label="Coverage in progress" title="Gold & Commodities" summary="Dated research on market structure, catalysts, scenarios, and the risks that could invalidate a view." />
          <CoverageCard label="Coverage in progress" title="Equities & Nasdaq" summary="Company and index research focused on evidence, valuation context, catalysts, and downside cases." />
        </motion.div>
        <div className="gutter absolute inset-x-0 bottom-8 flex items-center gap-4">
          <span className="text-[10px] font-bold tracking-[0.3em] text-smoke">RESEARCH</span>
          <div className="h-[2px] flex-1 overflow-hidden rounded bg-white/10">
            <motion.div className="h-full origin-left bg-gold" style={{ scaleX: bar }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function RailOriginals({ onOpen }: { onOpen: (p: Project) => void }) {
  return (
    <div className="py-6">
      <div className="gutter mb-6">
        <Intro />
      </div>
      <motion.div
        className="rail gutter flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6"
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} onOpen={() => onOpen(p)} />
        ))}
        <SiftmirthCaseFile />
        <CoverageCard label="Coverage in progress" title="Gold & Commodities" summary="Dated research on market structure, catalysts, scenarios, and the risks that could invalidate a view." />
        <CoverageCard label="Coverage in progress" title="Equities & Nasdaq" summary="Company and index research focused on evidence, valuation context, catalysts, and downside cases." />
      </motion.div>
    </div>
  );
}
