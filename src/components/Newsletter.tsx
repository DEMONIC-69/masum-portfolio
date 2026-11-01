import { motion } from 'framer-motion';
import { SectionHeading } from './fx';

const username = import.meta.env.VITE_BUTTONDOWN_USERNAME?.trim();
const signupUrl = username ? `https://buttondown.com/api/emails/embed-subscribe/${encodeURIComponent(username)}` : '';

const topics = [
  { number: '01', title: 'Market briefs', detail: 'Gold, major indices, macro events, and the context behind notable moves.' },
  { number: '02', title: 'Equity research', detail: 'Company research, key data points, sources, and open questions.' },
  { number: '03', title: 'Money & business', detail: 'Personal finance education, business lessons, and experiments in progress.' },
  { number: '04', title: 'Decision notes', detail: 'Selected reflections on my own investment decisions and process, when I choose to share them.' },
];

export default function Newsletter() {
  return (
    <div>
      <SectionHeading
        kicker="Letters from the research desk"
        title="Market Notes"
        aside={<p className="max-w-sm text-sm leading-relaxed text-mist">A readable email digest of the research, decisions, and lessons I’m willing to share as the work develops.</p>}
      />

      <div className="gutter grid gap-8 lg:grid-cols-[1fr_.9fr] lg:items-start">
        <div className="grid gap-3 sm:grid-cols-2">
          {topics.map((topic, i) => (
            <motion.article key={topic.number} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .5, delay: i * .06 }} className="rounded-xl border border-white/10 bg-white/[.025] p-4 sm:p-5">
              <p className="text-[9px] font-bold tracking-[.24em] text-gold-bright">{topic.number} / FIELD NOTE</p>
              <h3 className="mt-3 font-display text-2xl tracking-wide text-bone">{topic.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-mist">{topic.detail}</p>
            </motion.article>
          ))}
        </div>

        <div className="rounded-2xl border border-gold-bright/20 bg-[radial-gradient(ellipse_at_top_right,rgba(217,180,106,.12),transparent_58%),linear-gradient(145deg,#151513,#0d0f11)] p-5 sm:p-7">
          <p className="text-[9px] font-bold uppercase tracking-[.28em] text-gold-bright">The research letter</p>
          <h3 className="mt-3 font-display text-4xl leading-none tracking-wide text-bone sm:text-5xl">GET THE NOTES</h3>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-mist">Market observations when there’s something useful to say, with deeper weekly or monthly research as it’s ready. No promised trade alerts or guaranteed daily calls.</p>

          {signupUrl ? (
            <form action={signupUrl} method="post" className="mt-6 space-y-4">
              <input type="hidden" name="embed" value="1" />
              <label className="block">
                <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[.16em] text-bone/80">Email address</span>
                <input required type="email" name="email" autoComplete="email" placeholder="you@example.com" className="min-h-12 w-full rounded-lg border border-white/15 bg-black/35 px-4 text-sm text-bone outline-none placeholder:text-smoke focus:border-gold-bright/60" />
              </label>
              <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-mist">
                <input required type="checkbox" className="mt-0.5 accent-[#d9b46a]" />
                <span>I agree to receive Market Notes by email. I can unsubscribe at any time.</span>
              </label>
              <button type="submit" className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-gold-bright px-5 text-sm font-bold text-[#17130b] transition hover:bg-[#f0ce83]">JOIN THE RESEARCH LETTER <span aria-hidden>↗</span></button>
              <p className="text-[10px] leading-relaxed text-smoke">Your email is handled by Buttondown to manage this subscription. Notes reflect my personal research and experience, not individualized financial advice or a recommendation to buy or sell securities.</p>
            </form>
          ) : (
            <div className="mt-6 rounded-xl border border-white/10 bg-black/25 p-4">
              <p className="text-sm font-medium text-bone">Signup is being connected</p>
              <p className="mt-1 text-xs leading-relaxed text-mist">The form will activate when the newsletter account is linked. Subscriber emails will go directly to that provider.</p>
            </div>
          )}
          <p className="mt-5 border-t border-white/10 pt-4 text-[10px] leading-relaxed text-smoke">Personal investment decisions are shared selectively and with context. No private account credentials, balances, or live positions are collected from subscribers.</p>
        </div>
      </div>
    </div>
  );
}
