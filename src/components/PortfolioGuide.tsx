import { useEffect, useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type ChatMessage = { role: 'user' | 'model'; text: string };
type Mood = 'idle' | 'listening' | 'thinking' | 'speaking' | 'happy';

const endpoint = import.meta.env.VITE_MASUM_AI_ENDPOINT?.trim();
const suggestions = [
  'What is Masum working on now?',
  'How did he build and sell Siftmirth?',
  'Tell me about his creator journey',
  'What market research does he share?',
];

function MasumAvatar({ mood = 'idle', small = false, hero = false }: { mood?: Mood; small?: boolean; hero?: boolean }) {
  return (
    <span className={`masum-avatar masum-avatar--${mood} ${small ? 'masum-avatar--small' : ''} ${hero ? 'masum-avatar--hero' : ''}`} aria-hidden="true">
      <span className="masum-avatar__orbit" />
      <svg className="masum-avatar__figure" viewBox="0 0 240 260" role="presentation">
        <ellipse className="masum-avatar__aura" cx="120" cy="142" rx="103" ry="104" />
        <g className="masum-avatar__body">
          <path className="masum-avatar__jacket" d="M44 244c3-54 28-80 59-88h34c31 8 56 34 59 88H44Z" />
          <path className="masum-avatar__shirt" d="m95 158 25 29 25-29-8-14h-34l-8 14Z" />
          <path className="masum-avatar__tie" d="m113 177 7 10 7-10 9 67h-32l9-67Z" />
          <path className="masum-avatar__lapel" d="m94 156 26 31-20 6-15-27 9-10Zm52 0-26 31 20 6 15-27-9-10Z" />
          <path className="masum-avatar__neck" d="M104 135h32v31c-9 12-23 12-32 0v-31Z" />
          <g className="masum-avatar__head">
            <ellipse className="masum-avatar__ear" cx="64" cy="101" rx="11" ry="18" />
            <ellipse className="masum-avatar__ear" cx="176" cy="101" rx="11" ry="18" />
            <path className="masum-avatar__face" d="M69 79c0-32 21-52 51-52s51 20 51 52v35c0 35-22 58-51 58s-51-23-51-58V79Z" />
            <path className="masum-avatar__hair" d="M67 91c-5-33 4-62 28-72 8-16 29-18 41-11 28-3 48 19 39 53 12 13 9 27 4 39l-5 4c-2-16-9-29-18-37-12 7-24 8-38 4-13 8-27 10-41 7-3 7-5 17-6 27l-5-2c-5-4-6-7-5-12Z" />
            <path className="masum-avatar__fringe" d="M73 73c13-19 27-27 42-26 10-11 23-15 42-11-8 7-12 13-14 20 11-5 19-4 28 1-12 5-18 12-19 21-15-5-29-5-44 1-13 6-23 6-35 3Z" />
            <path className="masum-avatar__brow" d="M83 93c8-5 18-6 27-2m20 0c8-4 18-3 27 2" />
            <g className="masum-avatar__eyes">
              <ellipse className="masum-avatar__eye-white" cx="97" cy="106" rx="10" ry="8" />
              <ellipse className="masum-avatar__eye-white" cx="143" cy="106" rx="10" ry="8" />
              <circle className="masum-avatar__pupil" cx="99" cy="107" r="4.5" />
              <circle className="masum-avatar__pupil" cx="141" cy="107" r="4.5" />
              <circle className="masum-avatar__glint" cx="100" cy="105" r="1.2" />
              <circle className="masum-avatar__glint" cx="142" cy="105" r="1.2" />
            </g>
            <path className="masum-avatar__nose" d="M119 108c-1 8-4 13-8 17 5 4 11 4 17 0" />
            <path className="masum-avatar__mouth masum-avatar__mouth--neutral" d="M105 137c8 4 22 4 30 0" />
            <path className="masum-avatar__mouth masum-avatar__mouth--happy" d="M103 134c8 14 25 14 34 0" />
            <ellipse className="masum-avatar__mouth-open" cx="120" cy="138" rx="7" ry="2" />
            <ellipse className="masum-avatar__blush" cx="82" cy="124" rx="8" ry="4" />
            <ellipse className="masum-avatar__blush" cx="158" cy="124" rx="8" ry="4" />
          </g>
        </g>
        <g className="masum-avatar__wave">
          <path d="M176 210c15-9 24-23 26-39l3-18c1-7 9-8 12-2 2 5 1 13 0 19 8-10 16-11 19-6 3 5-3 14-7 19 10-4 16 1 14 7-2 7-12 12-20 14-6 16-18 26-35 31l-12-25Z" />
          <path className="masum-avatar__wave-cuff" d="m176 210 20 26-9 8-24-25 13-9Z" />
        </g>
      </svg>
      <span className="masum-avatar__spark masum-avatar__spark--one">✦</span>
      <span className="masum-avatar__spark masum-avatar__spark--two">✧</span>
      <span className="masum-avatar__status" />
    </span>
  );
}

export default function PortfolioGuide() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [busy, setBusy] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState('');
  const listRef = useRef<HTMLDivElement>(null);

  const mood: Mood = busy ? 'thinking' : speaking ? 'speaking' : open ? 'listening' : 'idle';

  useEffect(() => {
    if (open && listRef.current) listRef.current.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, busy, open]);

  const ask = async (raw: string) => {
    const text = raw.trim();
    if (!text || busy) return;
    if (!endpoint) {
      setError('The AI connection is not active yet. Masum needs to connect the private AI service before this can answer.');
      return;
    }

    const nextMessages: ChatMessage[] = [...messages, { role: 'user', text: text.slice(0, 700) }];
    setMessages(nextMessages);
    setQuestion('');
    setError('');
    setBusy(true);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages.slice(-8) }),
      });
      const payload = await response.json().catch(() => ({})) as { answer?: string; error?: string };
      if (!response.ok || !payload.answer) throw new Error(payload.error || 'The AI could not answer just now. Please try again shortly.');
      setMessages((current) => [...current, { role: 'model', text: payload.answer!.slice(0, 2400) }]);
      setSpeaking(true);
      window.setTimeout(() => setSpeaking(false), 2600);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Connection failed. Please try again.');
      // Keep the visitor's question visible so a transient provider error doesn't erase it.
    } finally {
      setBusy(false);
    }
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void ask(question);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[95] sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.section
            aria-label="Ask Masum AI"
            className="masum-ai-panel absolute bottom-[5rem] right-0 flex max-h-[min(78dvh,650px)] w-[min(390px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[1.35rem] border border-gold-bright/30 bg-[#0b0d0f]/[.97] shadow-[0_28px_100px_rgba(0,0,0,.72),0_0_55px_rgba(217,180,106,.09)] backdrop-blur-2xl"
            initial={{ opacity: 0, y: 22, scale: .94, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 12, scale: .98, filter: 'blur(5px)' }}
            transition={{ duration: .25, ease: 'easeOut' }}
          >
            <header className="relative flex items-center gap-3 overflow-hidden border-b border-white/10 px-4 py-3.5">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(217,180,106,.12),transparent_58%)]" />
              <MasumAvatar hero mood={mood} />
              <div className="relative min-w-0 flex-1">
                <p className="text-sm font-semibold text-bone">Ask Masum AI</p>
                <p className="mt-0.5 text-[10px] uppercase tracking-[.15em] text-smoke">{endpoint ? 'Portfolio assistant · beta' : 'AI connection needed'}</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close Ask Masum AI" className="relative grid h-9 w-9 place-items-center rounded-full text-xl text-mist transition hover:bg-white/10 hover:text-bone">×</button>
            </header>

            <div ref={listRef} className="min-h-44 flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite" aria-relevant="additions text">
              {messages.length === 0 && (
                <div className="space-y-4">
                  <div className="flex items-start gap-2.5">
                    <MasumAvatar small mood="happy" />
                    <div className="max-w-[86%] rounded-2xl rounded-tl-sm border border-white/10 bg-white/[.055] px-3.5 py-3 text-xs leading-relaxed text-bone/85">
                      <p className="font-medium text-bone">Hey, I’m Masum’s portfolio assistant.</p>
                      <p className="mt-1.5">Ask about his journey, ventures, current projects, or the research he publishes.</p>
                    </div>
                  </div>
                  {!endpoint && <p className="ml-11 rounded-xl border border-gold-bright/20 bg-gold-bright/[.045] px-3 py-2 text-[10px] leading-relaxed text-gold-bright/90">The AI service is being connected. Questions will be sent to Gemini after setup; please don’t enter private information.</p>}
                  <div className="flex flex-wrap gap-2 pl-11">
                    {suggestions.map((suggestion) => (
                      <button key={suggestion} type="button" disabled={!endpoint || busy} onClick={() => void ask(suggestion)} className="rounded-full border border-gold-bright/25 bg-gold-bright/[.04] px-2.5 py-2 text-left text-[10px] leading-snug text-gold-bright transition hover:border-gold-bright/55 hover:bg-gold-bright/10 disabled:cursor-default disabled:opacity-60">{suggestion}</button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((message, index) => (
                <div key={`${index}-${message.role}`} className={`flex items-end gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.role === 'model' && <MasumAvatar small mood="speaking" />}
                  <p className={`max-w-[84%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${message.role === 'user' ? 'rounded-br-sm bg-gold-bright text-[#16120b]' : 'rounded-bl-sm border border-white/10 bg-white/[.055] text-bone/85'}`}>{message.text}</p>
                </div>
              ))}
              {busy && <div className="flex items-center gap-2.5 pl-1"><MasumAvatar small mood="thinking" /><span className="text-[11px] text-smoke">Thinking through that<span className="masum-ai-dots ml-1 text-gold-bright">···</span></span></div>}
              {error && <p role="status" className="ml-11 rounded-xl border border-amber-300/20 bg-amber-200/[.06] px-3 py-2 text-[11px] leading-relaxed text-amber-100/80">{error}</p>}
            </div>

            <form onSubmit={submit} className="flex items-center gap-2 border-t border-white/10 p-3">
              <label className="sr-only" htmlFor="portfolio-guide-question">Ask Masum AI a question</label>
              <input id="portfolio-guide-question" value={question} onChange={(event) => setQuestion(event.target.value)} maxLength={700} disabled={!endpoint || busy} placeholder={endpoint ? 'Ask about Masum…' : 'AI connection is being set up'} className="min-w-0 flex-1 rounded-full border border-white/10 bg-black/35 px-4 py-3 text-xs text-bone outline-none placeholder:text-smoke focus:border-gold-bright/55 disabled:opacity-60" />
              <button type="submit" aria-label="Send question" disabled={!endpoint || busy || !question.trim()} className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold-bright text-lg font-semibold text-[#15120d] transition hover:bg-[#f0ce83] disabled:cursor-not-allowed disabled:opacity-45">↑</button>
            </form>
            <p className="px-4 pb-3 text-[9px] leading-relaxed text-smoke/80">Questions are processed by Google Gemini after setup. Don’t share private information. No live market data or personalized financial advice.</p>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label={open ? 'Close Ask Masum AI' : 'Open Ask Masum AI'}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="masum-ai-launch group relative grid h-[4.15rem] w-[4.15rem] place-items-center rounded-full border border-gold-bright/65 bg-[#111316] shadow-[0_8px_32px_rgba(0,0,0,.6),0_0_30px_rgba(217,180,106,.16)] transition hover:-translate-y-1 hover:border-gold-bright"
        animate={{ y: open ? 0 : [0, -4, 0] }}
        transition={{ y: open ? { duration: .2 } : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' } }}
        whileTap={{ scale: .94 }}
      >
        <MasumAvatar mood={mood} />
        <span className="absolute -left-2 -top-2 rounded-full border border-gold-bright/40 bg-[#101113] px-2 py-1 text-[8px] font-bold uppercase tracking-[.12em] text-gold-bright shadow">{endpoint ? 'Ask AI' : 'AI setup'}</span>
      </motion.button>
    </div>
  );
}
