import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { useScrollLock } from '../hooks/smoothScroll';
import { EASE } from './fx';

export type DetailSheetData = { eyebrow: string; title: string; subtitle: string; meta: string; facts: string[]; note: string; kind?: 'trade-dashboard' | 'siftmirth-research' };

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
    <motion.article data-lenis-prevent className={`relative max-h-[92vh] w-full ${data.kind === 'siftmirth-research' ? 'max-w-5xl' : 'max-w-3xl'} overflow-y-auto rounded-t-2xl border border-white/10 bg-[#101113] p-6 shadow-2xl sm:rounded-2xl sm:p-10`} initial={{ y: 36, scale: .98 }} animate={{ y: 0, scale: 1 }} exit={{ y: 24, scale: .98 }} transition={{ duration: .35, ease: EASE }}>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(65%_55%_at_100%_0%,rgba(217,180,106,0.12),transparent_75%)]" />
      <button type="button" onClick={onClose} className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-bone transition hover:border-gold-bright hover:text-gold-bright" aria-label="Close details">✕</button>
      <div className="relative"><p className="text-[10px] font-bold uppercase tracking-[.3em] text-gold-bright">{data.eyebrow}</p><h2 id="detail-title" className="mt-4 pr-10 font-display text-4xl tracking-wide text-bone sm:text-6xl">{data.title}</h2><p className="mt-2 text-xs uppercase tracking-[.18em] text-smoke">{data.meta}</p><p className="mt-7 max-w-2xl text-base leading-relaxed text-bone/85 sm:text-lg">{data.subtitle}</p>
        {data.kind === 'siftmirth-research' ? <SiftmirthResearchBody /> : data.kind === 'trade-dashboard' ? <>
          <section className="mt-8 rounded-2xl border border-emerald-300/15 bg-[radial-gradient(80%_130%_at_100%_0%,rgba(100,150,105,.12),transparent_70%)] p-5 sm:p-6">
            <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[.25em] text-emerald-200/80">Atlas Funded · selected closed trades</p><h3 className="mt-2 font-display text-3xl text-bone sm:text-4xl">Trade Evidence</h3></div><div className="text-right"><p className="text-[9px] uppercase tracking-[.18em] text-smoke">Combined total shown</p><p className="font-display text-3xl text-emerald-200">$3,891.60</p></div></div>
            <div className="mt-5 grid gap-3 md:grid-cols-3">{[
              { image: 'atlas-trade-2026-05-04-1211.webp', profit: '$1,211.00', date: '05/04/2026', size: '1.0000' },
              { image: 'atlas-trade-2026-05-04-2448.webp', profit: '$2,448.00', date: '05/04/2026', size: '3.0000' },
              { image: 'atlas-trade-2026-05-05-232-60.webp', profit: '$232.60', date: '05/05/2026', size: '0.2000' },
            ].map((trade) => <figure key={trade.image} className="overflow-hidden rounded-xl border border-white/10 bg-black/35"><img src={`${import.meta.env.BASE_URL}certificates/${trade.image}`} alt={`Atlas Funded closed XAUUSD buy trade, ${trade.profit} profit, dated ${trade.date}`} loading="lazy" className="aspect-square w-full object-contain"/><figcaption className="flex items-center justify-between gap-2 border-t border-white/10 px-3 py-3"><span><span className="block text-[10px] font-semibold tracking-wide text-bone">XAUUSD · BUY · {trade.size}</span><span className="mt-1 block text-[9px] text-smoke">{trade.date} · Atlas Funded</span></span><span className="font-display text-xl text-emerald-200">{trade.profit}</span></figcaption></figure>)}</div>
            <p className="mt-4 text-[10px] leading-relaxed text-mist">Sum of these three screenshots only; it does not represent total account P&amp;L or a complete trading record.</p>
          </section>
          <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">{[['CONTEST GAIN', '$4,905.36'], ['WORLD RANK', '#2,360'], ['ACCOUNT SIZE', '$50,000'], ['CONTEST BALANCE', '$54,905.36']].map(([label, value]) => <div key={label} className="rounded-xl border border-white/10 bg-black/30 p-4"><p className="text-[9px] font-bold tracking-[.16em] text-smoke">{label}</p><p className="mt-3 font-display text-2xl text-gold-bright sm:text-3xl">{value}</p><p className="mt-1 text-[9px] uppercase tracking-widest text-mist">Tradeify Grand Cup · historical</p></div>)}</div>
          <div className="mt-5 grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
            <section className="rounded-xl border border-white/10 bg-black/25 p-5"><div className="flex items-center justify-between"><h3 className="text-[10px] font-bold uppercase tracking-[.2em] text-bone">Equity milestone</h3><span className="text-[9px] uppercase tracking-widest text-smoke">Verified contest figures</span></div><div className="relative mt-5 flex h-44 items-end gap-4 overflow-hidden rounded-lg border border-white/5 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px)] bg-[length:100%_25%] p-4"><div className="h-[48%] flex-1 rounded-t-md border border-gold/30 bg-gradient-to-t from-gold/15 to-gold/50"/><div className="h-[78%] flex-1 rounded-t-md border border-gold/40 bg-gradient-to-t from-gold/20 to-gold-bright/70"/><span className="absolute left-4 bottom-1 text-[9px] text-mist">$50K account size</span><span className="absolute right-4 top-1 text-[9px] text-gold-bright">$54.9K contest balance</span></div><p className="mt-4 text-xs leading-relaxed text-mist">Milestone comparison only. Daily equity history and other P&amp;L statistics aren’t published here.</p></section>
            <section className="overflow-hidden rounded-xl border border-white/10 bg-black/25"><div className="border-b border-white/10 px-4 py-3"><h3 className="text-[10px] font-bold uppercase tracking-[.2em] text-bone">Trade screenshot · Tradeify Grand Cup</h3></div><img src={`${import.meta.env.BASE_URL}certificates/tradeify-grand-cup.webp`} alt="Tradeify Grand Cup result showing Masum Kaji ranked 2,360" className="max-h-[270px] w-full bg-black object-contain"/><p className="px-4 py-3 text-[10px] leading-relaxed text-mist">Competition evidence. Any future screenshots should be redacted before being added.</p></section>
          </div>
        </> : <div className="mt-8 grid gap-3 sm:grid-cols-2">{data.facts.map((fact, i) => <div key={fact} className="rounded-xl border border-white/10 bg-white/[.03] p-4"><span className="text-[10px] font-bold tracking-[.2em] text-gold">{String(i + 1).padStart(2, '0')}</span><p className="mt-2 text-sm leading-relaxed text-bone/80">{fact}</p></div>)}</div>}
        {data.kind !== 'trade-dashboard' && data.kind !== 'siftmirth-research' && <div className="mt-8 border-l border-gold/60 pl-4"><p className="text-[10px] font-bold uppercase tracking-[.24em] text-gold-bright">Reflection</p><p className="mt-2 text-sm leading-relaxed text-mist">{data.note}</p></div>}
      </div>
    </motion.article>
  </motion.div>, document.body);
}

function SiftmirthResearchBody() {
  const section = 'mt-10 border-t border-white/10 pt-7';
  const heading = 'text-[10px] font-bold uppercase tracking-[.25em] text-gold-bright';
  const card = 'rounded-xl border border-white/10 bg-black/25 p-5';
  return (
    <div className="mt-8">
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: 'Dashboard revenue', value: '$375', sub: 'Recorded in the supplied Polsia snapshot' },
          { label: 'Reported sale price', value: '$1,000', sub: 'Founder-reported business sale' },
          { label: 'Net profit', value: 'Not reported', sub: 'Costs and sale accounting were not supplied' },
        ].map((metric) => <div key={metric.label} className="rounded-xl border border-gold/20 bg-[linear-gradient(145deg,rgba(217,180,106,.09),rgba(255,255,255,.02))] p-5"><p className="text-[9px] font-bold uppercase tracking-[.2em] text-smoke">{metric.label}</p><p className="mt-3 font-display text-3xl text-bone sm:text-4xl">{metric.value}</p><p className="mt-2 text-[10px] leading-relaxed text-mist">{metric.sub}</p></div>)}
      </div>

      <section className={section}>
        <p className={heading}>The company and the customer problem</p>
        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1.2fr]">
          <div className={card}>
            <h3 className="font-display text-2xl tracking-wide text-bone">Carefully chosen joy.</h3>
            <p className="mt-3 text-sm leading-relaxed text-mist">Siftmirth was conceived as a personalized gifting and product-discovery service. The name joins “sift”—filter and choose carefully—with “mirth”—joy and delight. The promise was a surprise that felt considered, rather than a random assortment.</p>
            <p className="mt-3 text-sm leading-relaxed text-mist">It addressed two related moments: someone wants to discover things that fit their taste, or a gift-giver wants to send something personal without knowing every detail about the recipient.</p>
          </div>
          <figure className="overflow-hidden rounded-xl border border-white/10 bg-white">
            <img src={`${import.meta.env.BASE_URL}certificates/siftmirth-revenue-evidence.webp`} alt="Founder-supplied Siftmirth dashboard snapshot showing 436 views, 14 users, $375 revenue, and one company" loading="lazy" className="max-h-[420px] w-full object-contain" />
            <figcaption className="border-t border-black/10 px-4 py-3 text-[10px] leading-relaxed text-[#555]">Founder-supplied dashboard snapshot. It reports 436 views, 14 users, $375 revenue, and one company at the time captured; it is not an audited financial statement.</figcaption>
          </figure>
        </div>
      </section>

      <section className={section}>
        <p className={heading}>Product concept · how the experience was designed</p>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-mist">The concept put customer preferences and hard boundaries ahead of novelty. A profile could include interests, budget, sizes, sensitivities, dislikes, explicit exclusions, and how adventurous a customer wanted a surprise to be.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[
            ['01 · Tell us', 'Capture preferences, budget, relevant sizing, sensitivities, and clear “do not send” rules.'],
            ['02 · Filter', 'Treat exclusions, safety needs, budget ceilings, and stock limits as hard constraints.'],
            ['03 · Curate', 'Build a themed selection and explain why each item fits the person and the occasion.'],
            ['04 · Learn', 'Invite ratings and corrections so future recommendations can improve—with human review for exceptions.'],
          ].map(([step, description]) => <div key={step} className={card}><p className="text-[9px] font-bold tracking-[.2em] text-gold">{step}</p><p className="mt-3 text-xs leading-relaxed text-mist">{description}</p></div>)}
        </div>
        <p className="mt-4 text-[10px] leading-relaxed text-smoke">This describes the product vision and planned workflow in the founder materials. The materials do not verify that every personalization, fulfilment, or feedback step was live before the business was sold.</p>
      </section>

      <section className={section}>
        <p className={heading}>Business model and operating setup</p>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className={card}>
            <h3 className="text-sm font-semibold text-bone">A one-person, AI-assisted build</h3>
            <p className="mt-3 text-xs leading-relaxed text-mist">The founder reports using Polsia.ai to set up the business and website and to support workflows, customer handling, support, promotion, and marketing. Claude AI contributed to ideation; ChatGPT supported graphics and design. The venture was run without a conventional team.</p>
            <p className="mt-3 text-xs leading-relaxed text-mist">AI was also used to help with payment and tax setup. That records the founder’s process; it does not establish that checkout, tax treatment, or regulatory obligations were independently verified.</p>
          </div>
          <div className={card}>
            <h3 className="text-sm font-semibold text-bone">Ways the concept could earn</h3>
            <ul className="mt-3 list-disc space-y-2 pl-4 text-xs leading-relaxed text-mist">
              <li>One-off personalized gifts and themed selections.</li>
              <li>Recurring boxes, if repeat demand and retention justify a subscription.</li>
              <li>Seasonal and occasion-led gifting.</li>
              <li>Later, product discovery partnerships with independent brands and creators.</li>
            </ul>
            <p className="mt-3 text-[10px] leading-relaxed text-smoke">These were business-model options in the research materials, not confirmed revenue streams or current offers.</p>
          </div>
        </div>
      </section>

      <section className={section}>
        <p className={heading}>Market context and positioning</p>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className={card}>
            <h3 className="text-sm font-semibold text-bone">Personalization is a baseline to beat</h3>
            <p className="mt-3 text-xs leading-relaxed text-mist">A relevant adjacent example is IPSY: its official terms describe using beauty-quiz responses, product reviews, and other feedback to curate recurring beauty boxes. This shows that quizzes and feedback loops already exist in category-specific subscriptions.</p>
            <p className="mt-3 text-xs leading-relaxed text-mist">Siftmirth’s intended distinction was broader discovery and gift-giving across themes, with explicit boundaries such as budget, size, sensitivity, and “never send” exclusions. That distinction would need to be demonstrated through product quality and customer trust; the AI label alone is not a defensible advantage.</p>
            <a href="https://www.ipsy.com/subscription-terms" target="_blank" rel="noreferrer" className="mt-4 inline-flex text-[10px] font-semibold text-gold-bright underline decoration-gold/40 underline-offset-4 hover:text-bone">Source: IPSY subscription terms ↗</a>
          </div>
          <div className={card}>
            <h3 className="text-sm font-semibold text-bone">The core trade-off</h3>
            <p className="mt-3 text-xs leading-relaxed text-mist">Customers want novelty, but a bad surprise can waste money and damage trust. Better curation means making the boundaries explicit, explaining selections, and keeping a person accountable when data is missing or the system is uncertain.</p>
            <p className="mt-3 text-xs leading-relaxed text-mist">Potential substitutes include generic mystery boxes, ready-made gift hampers, marketplaces, personal shoppers, and creator recommendations. Each competes for the same customer job in a different way; this is a category map, not a measured market-share study.</p>
          </div>
        </div>
      </section>

      <section className={section}>
        <p className={heading}>What the figures do—and do not—say</p>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className={card}>
            <p className="text-xs leading-relaxed text-mist">The supplied dashboard capture shows <strong className="text-bone">$375 in recorded revenue</strong> alongside 436 views and 14 users. The founder separately reports that the business was sold for <strong className="text-bone">$1,000</strong>. These are two different measures: revenue is not profit, and a sale price is not automatically net proceeds.</p>
          </div>
          <div className="rounded-xl border border-amber-200/15 bg-amber-100/[.035] p-5">
            <p className="text-[9px] font-bold uppercase tracking-[.2em] text-amber-100/80">Profit was not calculated</p>
            <p className="mt-3 text-xs leading-relaxed text-mist">The files do not include product costs, packaging, shipping, ad spend, payment fees, refunds, tax, or transaction terms. Without those details, a net-profit or margin figure would be invented.</p>
          </div>
        </div>
      </section>

      <section className={section}>
        <p className={heading}>Founder’s takeaways</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ['Start with a narrow promise', 'A small set of themes is easier to curate well than promising a perfect surprise for everyone.'],
            ['Protect customer trust', 'Hard exclusions and sensitivities need reliable product data, clear consent, and a human escalation path.'],
            ['Prove the economics', 'Track the full variable cost per order before describing a box as profitable or scaling paid acquisition.'],
            ['Measure repeat value', 'A first purchase is not evidence of subscription retention; test whether people choose to return.'],
            ['Keep AI accountable', 'Automation can multiply one founder’s capacity, but quality, exceptions, compliance, and fulfilment still need ownership.'],
            ['Show both build and outcome', 'The business is a useful build-in-public story because it includes a real reported result and clear unanswered questions.'],
          ].map(([title, detail]) => <div key={title} className={card}><h3 className="text-xs font-semibold text-bone">{title}</h3><p className="mt-2 text-[11px] leading-relaxed text-mist">{detail}</p></div>)}
        </div>
      </section>

      <p className="mt-8 border-l border-gold/60 pl-4 text-[10px] leading-relaxed text-smoke">Research note: built from founder-provided materials and dashboard evidence, with one official competitor reference linked above. The figures are not independently audited; product-market fit, repeat purchasing, unit economics, and tax or legal compliance are not established by the supplied materials.</p>
    </div>
  );
}
