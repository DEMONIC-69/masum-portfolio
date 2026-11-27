import { ventureStudies } from '../data/portfolio';

type Story = 'siftmirth' | 'monee-forum';

const linkClass = 'inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-xs font-semibold text-bone transition hover:border-gold-bright hover:text-gold-bright';
const panelClass = 'rounded-2xl border border-white/10 bg-white/[.025] p-5 sm:p-7';

export default function StoryPage({ story }: { story: Story }) {
  const siftmirth = ventureStudies.find((item) => item.name === 'Siftmirth')!;
  const monee = ventureStudies.find((item) => item.name === 'Monee Forum')!;
  const isSiftmirth = story === 'siftmirth';
  const isMonee = story === 'monee-forum';
  const title = isSiftmirth ? 'Siftmirth — Venture Case Study' : 'Monee Forum — Venture Case Study';
  const kicker = isSiftmirth ? siftmirth.label : monee.label;
  const intro = isSiftmirth
    ? 'A one-person, AI-assisted personalized gifting venture: the idea, operating model, reported results, and what the build taught me.'
    : 'A creator project about online income and business education that I grew to more than 225,000 subscribers before selling the channel.';

  return <div className="min-h-screen bg-ink text-bone">
    <header className="sticky top-0 z-20 border-b border-white/10 bg-ink/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <a href="/" className="text-xs font-bold uppercase tracking-[.3em] text-gold-bright">M <span className="text-mist">Portfolio</span></a>
        <a href="/#ventures" className={linkClass}>← Back to ventures</a>
      </div>
    </header>
    <main className="mx-auto max-w-6xl px-5 pb-20 pt-12 sm:px-8 sm:pt-20">
      <article>
        <p className="text-[10px] font-bold uppercase tracking-[.3em] text-gold-bright">{kicker}</p>
        <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[.95] tracking-wide sm:text-7xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-mist sm:text-lg">{intro}</p>

        {isSiftmirth && <>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Dashboard revenue', '$375', 'Founder-supplied dashboard snapshot'],
              ['Estimated net profit', '~$195', 'Founder estimate after listed costs'],
              ['Reported sale price', '$1,000', 'Founder-reported business sale'],
              ['Operating model', 'Solo + AI', 'No conventional team'],
            ].map(([label, value, note]) => <div key={label} className={`${panelClass} border-gold/20`}><p className="text-[9px] font-bold uppercase tracking-[.18em] text-smoke">{label}</p><p className="mt-3 font-display text-3xl text-gold-bright">{value}</p><p className="mt-2 text-xs leading-relaxed text-mist">{note}</p></div>)}
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
            <section className={panelClass}><p className="text-[10px] font-bold uppercase tracking-[.24em] text-gold-bright">The idea</p><h2 className="mt-3 font-display text-3xl">Make the surprise feel personal.</h2><p className="mt-4 text-sm leading-relaxed text-mist">Siftmirth was conceived as a personalized surprise and product-discovery service for curious people and gift-givers. Customers could share tastes, budgets, sizes, sensitivities, and firm no-goes so a themed selection could feel unexpected without being careless. Feedback was intended to make future recommendations more personal.</p><p className="mt-4 text-sm leading-relaxed text-mist">The intended customer problem was familiar: wanting to discover something that fits your taste, or give someone a thoughtful gift when you are unsure what they would like.</p></section>
            <figure className="overflow-hidden rounded-2xl border border-white/10 bg-white"><img src="/certificates/siftmirth-revenue-evidence.webp" alt="Founder-supplied Siftmirth dashboard snapshot showing 436 views, 14 users, $375 revenue, and one company" className="h-full max-h-[430px] w-full object-contain"/><figcaption className="border-t border-black/10 px-4 py-3 text-xs leading-relaxed text-[#555]">Founder-supplied dashboard snapshot; not an audited financial statement.</figcaption></figure>
          </div>
          <section className={`${panelClass} mt-5`}><p className="text-[10px] font-bold uppercase tracking-[.24em] text-gold-bright">How I built it</p><div className="mt-5 grid gap-4 md:grid-cols-3"><div><h3 className="font-semibold">AI-assisted setup</h3><p className="mt-2 text-sm leading-relaxed text-mist">I used Polsia.ai to help set up the business, website, and workflows. Claude AI contributed to ideation, and ChatGPT supported graphics and design.</p></div><div><h3 className="font-semibold">One-person operation</h3><p className="mt-2 text-sm leading-relaxed text-mist">I ran the project without a conventional team, using AI tools to support customer handling, support, promotion, and marketing.</p></div><div><h3 className="font-semibold">A considered promise</h3><p className="mt-2 text-sm leading-relaxed text-mist">The concept centered on thoughtful curation, explicit customer boundaries, and a personal touch rather than surprise for its own sake.</p></div></div><p className="mt-5 border-t border-white/10 pt-4 text-xs leading-relaxed text-smoke">These are founder-reported tools and product plans. The supplied material does not verify that every personalization, fulfillment, or feedback workflow was live before the sale.</p></section>
          <section className={`${panelClass} mt-5`}><p className="text-[10px] font-bold uppercase tracking-[.24em] text-gold-bright">Reported economics</p><p className="mt-3 max-w-3xl text-sm leading-relaxed text-mist">The dashboard snapshot records $375 revenue. My estimated costs were product $125, packaging $10, shipping $25, advertising $10, payment fees $2–$3, refunds $0, tax $5, and transaction costs $1–$2. That gives an estimated operating profit of roughly $195–$197. I separately reported selling the business for $1,000; the sale price is not included in the operating-profit estimate.</p></section>
          <section className={`${panelClass} mt-5`}><p className="text-[10px] font-bold uppercase tracking-[.24em] text-gold-bright">What I took from the build</p><ul className="mt-4 grid gap-3 text-sm leading-relaxed text-mist sm:grid-cols-2"><li><strong className="text-bone">Keep the promise focused.</strong> Thoughtful curation depends on knowing who the experience is for.</li><li><strong className="text-bone">Make constraints count.</strong> Budget, sensitivities, and explicit exclusions matter as much as novelty.</li><li><strong className="text-bone">Track the full cost.</strong> Revenue alone does not explain the economics of an order.</li><li><strong className="text-bone">Use AI with ownership.</strong> Automation can help a solo founder move faster, while quality and exceptions still need attention.</li></ul></section>
          <p className="mt-6 text-xs leading-relaxed text-smoke">This case study is based on founder-provided materials. Figures are not independently audited; repeat purchasing, product-market fit, and tax or legal compliance are not established by the evidence here.</p>
        </>}

        {isMonee && <>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">{[['Subscribers', '225K+'], ['Channel', 'Monee Forum'], ['Outcome', 'Built & sold']].map(([label, value]) => <div key={label} className={panelClass}><p className="text-[9px] font-bold uppercase tracking-[.18em] text-smoke">{label}</p><p className="mt-3 font-display text-3xl text-gold-bright">{value}</p></div>)}</div>
          <div className="mt-10 grid gap-5 md:grid-cols-2"><section className={panelClass}><p className="text-[10px] font-bold uppercase tracking-[.24em] text-gold-bright">The channel</p><h2 className="mt-3 font-display text-3xl">Content about online income and business.</h2><p className="mt-4 text-sm leading-relaxed text-mist">Monee Forum was a YouTube channel focused on online money, online business, and business education. I grew it to more than 225,000 subscribers and later sold the channel.</p></section><section className={panelClass}><p className="text-[10px] font-bold uppercase tracking-[.24em] text-gold-bright">The documented arc</p><ol className="mt-4 space-y-4 text-sm leading-relaxed text-mist"><li><span className="mr-3 text-gold-bright">01</span>Started and developed a channel around online income and business education.</li><li><span className="mr-3 text-gold-bright">02</span>Built the audience to 225K+ subscribers.</li><li><span className="mr-3 text-gold-bright">03</span>Sold the channel as a creator-built digital asset.</li></ol></section></div>
          <p className="mt-6 text-xs leading-relaxed text-smoke">The public record here is limited to the channel topic, subscriber milestone, and reported sale. Revenue, timeline, acquisition methods, and sale terms have not been provided for this case study.</p>
        </>}

        <nav className="mt-10 flex flex-wrap gap-3" aria-label="Related pages"><a href="/#ventures" className={linkClass}>Venture case studies ↗</a><a href="/#journal" className={linkClass}>Market journal ↗</a><a href="/" className={linkClass}>Portfolio home ↗</a></nav>
      </article>
    </main>
  </div>;
}
