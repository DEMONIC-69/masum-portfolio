import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { useScrollLock } from '../hooks/smoothScroll';
import { EASE } from './fx';

export type DetailSheetData = { eyebrow: string; title: string; subtitle: string; meta: string; facts: string[]; note: string; kind?: 'trade-dashboard' };

export default function DetailSheet({ data, onClose }: { data: DetailSheetData | null; onClose: () => void }) {
  useScrollLock(Boolean(data));
  useEffect(() => {
    if (!data) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [data, onClose]);
  if (!data) return null;
  return createPortal(<motion.div className="fixed inset-0 z-[145] flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="detail-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <button type="button" aria-label="Close details" className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
    <motion.article data-lenis-prevent className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-t-2xl border border-white/10 bg-[#101113] p-6 shadow-2xl sm:rounded-2xl sm:p-10" initial={{ y: 36, scale: .98 }} animate={{ y: 0, scale: 1 }} exit={{ y: 24, scale: .98 }} transition={{ duration: .35, ease: EASE }}>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(65%_55%_at_100%_0%,rgba(217,180,106,0.12),transparent_75%)]" />
      <button type="button" onClick={onClose} className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-bone transition hover:border-gold-bright hover:text-gold-bright" aria-label="Close details">✕</button>
      <div className="relative"><p className="text-[10px] font-bold uppercase tracking-[.3em] text-gold-bright">{data.eyebrow}</p><h2 id="detail-title" className="mt-4 pr-10 font-display text-4xl tracking-wide text-bone sm:text-6xl">{data.title}</h2><p className="mt-2 text-xs uppercase tracking-[.18em] text-smoke">{data.meta}</p><p className="mt-7 max-w-2xl text-base leading-relaxed text-bone/85 sm:text-lg">{data.subtitle}</p>
        {data.kind === 'trade-dashboard' ? <>
          <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">{[['CONTEST GAIN', '$4,905.36'], ['WORLD RANK', '#2,360'], ['ACCOUNT SIZE', '$50,000'], ['CONTEST BALANCE', '$54,905.36']].map(([label, value]) => <div key={label} className="rounded-xl border border-white/10 bg-black/30 p-4"><p className="text-[9px] font-bold tracking-[.16em] text-smoke">{label}</p><p className="mt-3 font-display text-2xl text-gold-bright sm:text-3xl">{value}</p><p className="mt-1 text-[9px] uppercase tracking-widest text-mist">Tradeify Grand Cup · historical</p></div>)}</div>
          <div className="mt-5 grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
            <section className="rounded-xl border border-white/10 bg-black/25 p-5"><div className="flex items-center justify-between"><h3 className="text-[10px] font-bold uppercase tracking-[.2em] text-bone">Equity milestone</h3><span className="text-[9px] uppercase tracking-widest text-smoke">Verified contest figures</span></div><div className="relative mt-5 flex h-44 items-end gap-4 overflow-hidden rounded-lg border border-white/5 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px)] bg-[length:100%_25%] p-4"><div className="h-[48%] flex-1 rounded-t-md border border-gold/30 bg-gradient-to-t from-gold/15 to-gold/50"/><div className="h-[78%] flex-1 rounded-t-md border border-gold/40 bg-gradient-to-t from-gold/20 to-gold-bright/70"/><span className="absolute left-4 bottom-1 text-[9px] text-mist">$50K account size</span><span className="absolute right-4 top-1 text-[9px] text-gold-bright">$54.9K contest balance</span></div><p className="mt-4 text-xs leading-relaxed text-mist">Milestone comparison only. Daily equity history and other P&amp;L statistics aren’t published here.</p></section>
            <section className="overflow-hidden rounded-xl border border-white/10 bg-black/25"><div className="border-b border-white/10 px-4 py-3"><h3 className="text-[10px] font-bold uppercase tracking-[.2em] text-bone">Trade screenshot · Tradeify Grand Cup</h3></div><img src={`${import.meta.env.BASE_URL}certificates/tradeify-grand-cup.webp`} alt="Tradeify Grand Cup result showing Masum Kaji ranked 2,360" className="max-h-[270px] w-full bg-black object-contain"/><p className="px-4 py-3 text-[10px] leading-relaxed text-mist">Competition evidence. Any future screenshots should be redacted before being added.</p></section>
          </div>
        </> : <div className="mt-8 grid gap-3 sm:grid-cols-2">{data.facts.map((fact, i) => <div key={fact} className="rounded-xl border border-white/10 bg-white/[.03] p-4"><span className="text-[10px] font-bold tracking-[.2em] text-gold">{String(i + 1).padStart(2, '0')}</span><p className="mt-2 text-sm leading-relaxed text-bone/80">{fact}</p></div>)}</div>}
        {data.kind !== 'trade-dashboard' && <div className="mt-8 border-l border-gold/60 pl-4"><p className="text-[10px] font-bold uppercase tracking-[.24em] text-gold-bright">Reflection</p><p className="mt-2 text-sm leading-relaxed text-mist">{data.note}</p></div>}
      </div>
    </motion.article>
  </motion.div>, document.body);
}
