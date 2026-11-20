import { ResumeSheet } from './ResumeViewer';

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-ink px-4 py-8 text-bone sm:px-8 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <nav className="mb-8 flex items-center justify-between gap-4">
          <a href="/" className="text-xs font-bold uppercase tracking-[0.28em] text-gold-bright hover:text-bone">Masum Kaji</a>
          <div className="flex items-center gap-3">
            <a href="/kaji-masum-hossen-resume.pdf" download className="rounded-md bg-gold-bright px-4 py-2.5 text-xs font-bold text-ink transition hover:bg-bone">Download PDF ↓</a>
            <a href="/" className="rounded-md border border-white/15 px-4 py-2.5 text-xs font-semibold text-bone hover:border-gold-bright/60">Portfolio ↗</a>
          </div>
        </nav>
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.32em] text-gold-bright">Public Resume</p>
        <h1 className="mb-8 font-display text-5xl tracking-wide sm:text-6xl">Kaji Masum Hossen</h1>
        <ResumeSheet />
        <footer className="mt-8 border-t border-white/10 pt-5 text-center text-xs text-mist">
          <a href="/" className="hover:text-gold-bright">masumkaji.tech</a> · Research Analyst · Business Strategist · Finance Specialist
        </footer>
      </div>
    </main>
  );
}
