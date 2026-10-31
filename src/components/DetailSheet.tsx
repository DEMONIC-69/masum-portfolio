import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { useScrollLock } from '../hooks/smoothScroll';
import { EASE } from './fx';

export type DetailSheetData = { eyebrow: string; title: string; subtitle: string; meta: string; facts: string[]; note: string };

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
        <div className="mt-8 grid gap-3 sm:grid-cols-2">{data.facts.map((fact, i) => <div key={fact} className="rounded-xl border border-white/10 bg-white/[.03] p-4"><span className="text-[10px] font-bold tracking-[.2em] text-gold">{String(i + 1).padStart(2, '0')}</span><p className="mt-2 text-sm leading-relaxed text-bone/80">{fact}</p></div>)}</div>
        <div className="mt-8 border-l border-gold/60 pl-4"><p className="text-[10px] font-bold uppercase tracking-[.24em] text-gold-bright">Reflection</p><p className="mt-2 text-sm leading-relaxed text-mist">{data.note}</p></div>
      </div>
    </motion.article>
  </motion.div>, document.body);
}
