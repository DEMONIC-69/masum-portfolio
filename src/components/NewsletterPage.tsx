const username = import.meta.env.VITE_BUTTONDOWN_USERNAME?.trim();
const signupUrl = username ? `https://buttondown.com/api/emails/embed-subscribe/${encodeURIComponent(username)}` : '';

const topics = [
  ['Market briefs', 'Gold, major indices, macro events, and the context behind notable moves.'],
  ['Equity research', 'Company research, key data points, sources, and open questions.'],
  ['Money & business', 'Personal finance education, business lessons, and experiments in progress.'],
  ['Decision notes', 'Selected reflections on my own investment decisions and process, when I choose to share them.'],
];

export default function NewsletterPage() {
  return (
    <main className="min-h-screen bg-ink px-4 py-8 text-bone sm:px-8 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <nav className="mb-12 flex items-center justify-between gap-4">
          <a href="/" className="text-xs font-bold uppercase tracking-[.28em] text-gold-bright hover:text-bone">Masum Kaji</a>
          <a href="/" className="rounded-md border border-white/15 px-4 py-2.5 text-xs font-semibold text-bone hover:border-gold-bright/60">Back to portfolio ↗</a>
        </nav>
        <div className="grid gap-10 lg:grid-cols-[1fr_.85fr] lg:items-start">
          <section>
            <p className="text-[10px] font-bold uppercase tracking-[.32em] text-gold-bright">Letters from the research desk</p>
            <h1 className="mt-4 max-w-2xl font-display text-6xl leading-[.9] tracking-wide sm:text-7xl">MARKET<br />NOTES</h1>
            <p className="mt-6 max-w-xl font-serif text-2xl italic leading-relaxed text-bone/90">Thoughtful notes on markets, money, and building businesses.</p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-mist">A readable email digest of research and lessons I’m willing to share as the work develops. Expect useful market observations when there’s something worth saying, with deeper weekly or monthly research as it’s ready.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {topics.map(([title, detail], i) => (
                <article key={title} className="rounded-xl border border-white/10 bg-white/[.025] p-4">
                  <p className="text-[9px] font-bold tracking-[.24em] text-gold-bright">0{i + 1} / FIELD NOTE</p>
                  <h2 className="mt-3 font-display text-2xl tracking-wide">{title}</h2>
                  <p className="mt-2 text-xs leading-relaxed text-mist">{detail}</p>
                </article>
              ))}
            </div>
          </section>
          <section id="subscribe" className="rounded-2xl border border-gold-bright/25 bg-[radial-gradient(ellipse_at_top_right,rgba(217,180,106,.14),transparent_58%),linear-gradient(145deg,#151513,#0d0f11)] p-6 sm:p-8 lg:sticky lg:top-8">
            <p className="text-[10px] font-bold uppercase tracking-[.28em] text-gold-bright">The research letter</p>
            <h2 className="mt-3 font-display text-4xl leading-none tracking-wide sm:text-5xl">GET THE NOTES</h2>
            <p className="mt-3 text-sm leading-relaxed text-mist">Join the list for new market views, research, and selected personal finance and business insights.</p>
            {signupUrl ? (
              <form action={signupUrl} method="post" className="mt-7 space-y-4">
                <input type="hidden" name="embed" value="1" />
                <label className="block">
                  <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[.16em] text-bone/80">Email address</span>
                  <input required type="email" name="email" autoComplete="email" placeholder="you@example.com" className="min-h-12 w-full rounded-lg border border-white/15 bg-black/35 px-4 text-sm text-bone outline-none placeholder:text-smoke focus:border-gold-bright/60" />
                </label>
                <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-mist">
                  <input required type="checkbox" className="mt-0.5 accent-[#d9b46a]" />
                  <span>I agree to receive Market Notes by email. I can unsubscribe at any time.</span>
                </label>
                <button type="submit" className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-gold-bright px-5 text-sm font-bold text-[#17130b] transition hover:bg-[#f0ce83]">SUBSCRIBE <span aria-hidden>↗</span></button>
                <p className="text-[10px] leading-relaxed text-smoke">Buttondown handles your email subscription. Notes reflect personal research and experience; they are not individualized financial advice or a recommendation to buy or sell.</p>
              </form>
            ) : (
              <div className="mt-7 rounded-xl border border-white/10 bg-black/25 p-4">
                <p className="text-sm font-medium text-bone">Signup is being connected</p>
                <p className="mt-1 text-xs leading-relaxed text-mist">The newsletter provider hasn’t been configured in this site build yet.</p>
              </div>
            )}
          </section>
        </div>
        <footer className="mt-12 border-t border-white/10 pt-5 text-center text-xs text-mist"><a href="/" className="hover:text-gold-bright">masumkaji.tech</a> · <a href="/resume/" className="hover:text-gold-bright">Resume</a></footer>
      </div>
    </main>
  );
}
