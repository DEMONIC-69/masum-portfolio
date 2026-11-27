import { useState, type FormEvent } from 'react';
import { profile } from '../data/portfolio';

const inquiryTypes = [
  'Professional opportunity',
  'Research or media inquiry',
  'Business collaboration',
  'Speaking or interview',
  'Other',
];

export default function ContactPage() {
  const [notice, setNotice] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') ?? '').trim();
    const email = String(form.get('email') ?? '').trim();
    const organization = String(form.get('organization') ?? '').trim();
    const inquiry = String(form.get('inquiry') ?? '').trim();
    const message = String(form.get('message') ?? '').trim();
    const subject = `${inquiry || 'Website inquiry'} — ${name}`;
    const body = [
      `Name: ${name}`,
      `Reply email: ${email}`,
      organization ? `Organization: ${organization}` : '',
      `Inquiry type: ${inquiry}`,
      '',
      message,
    ].filter((line) => line !== '').join('\n');
    // mailto uses URI percent encoding; form-style encoding would leave '+'
    // characters in some clients instead of turning them back into spaces.
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setNotice('Your email app should open with the inquiry ready to send. If it does not, use the email link beside the form.');
  }

  const fieldClass = 'mt-2 min-h-12 w-full rounded-lg border border-white/15 bg-black/30 px-4 py-3 text-sm text-bone outline-none transition placeholder:text-smoke focus:border-gold-bright/70';

  return (
    <main className="min-h-screen bg-ink px-4 py-8 text-bone sm:px-8 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <nav className="mb-12 flex items-center justify-between gap-4">
          <a href="/" className="text-xs font-bold uppercase tracking-[.28em] text-gold-bright hover:text-bone">M Portfolio</a>
          <a href="/links/" className="rounded-md border border-white/15 px-4 py-2.5 text-xs font-semibold text-bone transition hover:border-gold-bright/60">All links ↗</a>
        </nav>

        <header className="max-w-3xl">
          <p className="text-[10px] font-bold uppercase tracking-[.32em] text-gold-bright">Contact · TheMasumKaji</p>
          <h1 className="mt-4 font-display text-6xl leading-[.88] tracking-wide sm:text-7xl">LET’S START<br />A CONVERSATION.</h1>
          <p className="mt-5 max-w-2xl font-serif text-2xl italic leading-relaxed text-bone/90">Professional inquiries, thoughtful collaborations, and good questions are welcome.</p>
        </header>

        <div className="mt-10 grid gap-6 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
          <aside className="rounded-2xl border border-white/10 bg-white/[.025] p-6 sm:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[.25em] text-gold-bright">Reach me directly</p>
            <h2 className="mt-3 font-display text-4xl tracking-wide">MASUM KAJI</h2>
            <p className="mt-2 text-sm leading-relaxed text-mist">Research analyst · Business strategist · Finance specialist</p>
            <div className="mt-7 space-y-4 border-t border-white/10 pt-5 text-sm">
              <a href={`mailto:${profile.email}`} className="block break-all text-gold-bright underline decoration-gold-bright/30 underline-offset-4 hover:text-bone">{profile.email}</a>
              {profile.links.linkedin && <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="block text-mist transition hover:text-bone">LinkedIn profile ↗</a>}
              <a href="/resume/" className="block text-mist transition hover:text-bone">View resume →</a>
            </div>
            <p className="mt-7 text-xs leading-relaxed text-smoke">Please include enough context for me to understand your request. I aim to reply when I can; response times may vary.</p>
          </aside>

          <section className="rounded-2xl border border-gold-bright/25 bg-[radial-gradient(ellipse_at_top_right,rgba(217,180,106,.11),transparent_58%),linear-gradient(145deg,#151513,#0d0f11)] p-6 sm:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[.25em] text-gold-bright">Send an inquiry</p>
            <h2 className="mt-3 font-display text-4xl tracking-wide">WHAT CAN I HELP WITH?</h2>
            <p className="mt-2 text-sm leading-relaxed text-mist">Share your contact details and a short note. Your email address is used only to reply to your inquiry.</p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-xs font-semibold text-bone/85">Your name <span className="text-gold-bright">*</span>
                  <input className={fieldClass} name="name" type="text" autoComplete="name" placeholder="Full name" minLength={2} maxLength={100} required />
                </label>
                <label className="block text-xs font-semibold text-bone/85">Email for reply <span className="text-gold-bright">*</span>
                  <input className={fieldClass} name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength={254} required />
                </label>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-xs font-semibold text-bone/85">Organization <span className="font-normal text-smoke">(optional)</span>
                  <input className={fieldClass} name="organization" type="text" autoComplete="organization" placeholder="Company or organization" maxLength={120} />
                </label>
                <label className="block text-xs font-semibold text-bone/85">What is this about? <span className="text-gold-bright">*</span>
                  <select className={fieldClass} name="inquiry" required defaultValue="">
                    <option value="" disabled>Select an inquiry type</option>
                    {inquiryTypes.map((type) => <option key={type} value={type} className="bg-[#111216]">{type}</option>)}
                  </select>
                </label>
              </div>
              <label className="block text-xs font-semibold text-bone/85">Your message <span className="text-gold-bright">*</span>
                <textarea className={`${fieldClass} min-h-36 resize-y`} name="message" placeholder="A little context, what you need, and any useful timeline…" minLength={10} maxLength={5000} required />
              </label>
              <button type="submit" className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-gold-bright px-5 text-sm font-bold text-[#17130b] transition hover:bg-[#f0ce83] sm:w-auto">PREPARE EMAIL <span aria-hidden>↗</span></button>
              {notice && <p role="status" className="rounded-lg border border-gold-bright/20 bg-black/20 p-3 text-xs leading-relaxed text-bone/80">{notice} <a className="text-gold-bright underline underline-offset-2" href={`mailto:${profile.email}`}>Email me directly</a>.</p>}
              <p className="text-[10px] leading-relaxed text-smoke">This page does not store or submit form data to a server. It opens your email app with a draft addressed to Masum Kaji, and you choose whether to send it.</p>
            </form>
          </section>
        </div>
        <footer className="mt-10 border-t border-white/10 pt-5 text-center text-xs text-mist"><a href="/" className="hover:text-gold-bright">masumkaji.tech</a> · <a href="/links/" className="hover:text-gold-bright">All links</a> · TheMasumKaji</footer>
      </div>
    </main>
  );
}
