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

const sunnyAnimations: Record<Mood, string> = {
  idle: 'idle',
  listening: 'waiting',
  thinking: 'review',
  speaking: 'waving',
  happy: 'jumping',
};

function SunnyAvatar({ mood = 'idle', small = false, hero = false }: { mood?: Mood; small?: boolean; hero?: boolean }) {
  return (
    <span className={`masum-avatar masum-avatar--${mood} ${small ? 'masum-avatar--small' : ''} ${hero ? 'masum-avatar--hero' : ''}`} aria-hidden="true">
      <span className="masum-avatar__orbit" />
      <span className="masum-avatar__window">
        <img className="masum-avatar__sprite" src={`${import.meta.env.BASE_URL}assets/sunny-${sunnyAnimations[mood]}.webp`} alt="" draggable="false" />
      </span>
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
            aria-label="Ask Sunny about Masum"
            className="masum-ai-panel absolute bottom-[5rem] right-0 flex max-h-[min(78dvh,650px)] w-[min(390px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[1.35rem] border border-gold-bright/30 bg-[#0b0d0f]/[.97] shadow-[0_28px_100px_rgba(0,0,0,.72),0_0_55px_rgba(217,180,106,.09)] backdrop-blur-2xl"
            initial={{ opacity: 0, y: 22, scale: .94, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 12, scale: .98, filter: 'blur(5px)' }}
            transition={{ duration: .25, ease: 'easeOut' }}
          >
            <header className="relative flex items-center gap-3 overflow-hidden border-b border-white/10 px-4 py-3.5">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(217,180,106,.12),transparent_58%)]" />
              <SunnyAvatar hero mood={mood} />
              <div className="relative min-w-0 flex-1">
                <p className="text-sm font-semibold text-bone">Sunny</p>
                <p className="mt-0.5 text-[10px] uppercase tracking-[.15em] text-smoke">{endpoint ? 'Masum’s AI companion · beta' : 'AI connection needed'}</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close Sunny assistant" className="relative grid h-9 w-9 place-items-center rounded-full text-xl text-mist transition hover:bg-white/10 hover:text-bone">×</button>
            </header>

            <div ref={listRef} className="min-h-44 flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite" aria-relevant="additions text">
              {messages.length === 0 && (
                <div className="space-y-4">
                  <div className="flex items-start gap-2.5">
                    <SunnyAvatar small mood="happy" />
                    <div className="max-w-[86%] rounded-2xl rounded-tl-sm border border-white/10 bg-white/[.055] px-3.5 py-3 text-xs leading-relaxed text-bone/85">
                      <p className="font-medium text-bone">Hey, I’m Sunny—Masum’s portfolio companion.</p>
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
                  {message.role === 'model' && <SunnyAvatar small mood="speaking" />}
                  <p className={`max-w-[84%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${message.role === 'user' ? 'rounded-br-sm bg-gold-bright text-[#16120b]' : 'rounded-bl-sm border border-white/10 bg-white/[.055] text-bone/85'}`}>{message.text}</p>
                </div>
              ))}
              {busy && <div className="flex items-center gap-2.5 pl-1"><SunnyAvatar small mood="thinking" /><span className="text-[11px] text-smoke">Thinking through that<span className="masum-ai-dots ml-1 text-gold-bright">···</span></span></div>}
              {error && <p role="status" className="ml-11 rounded-xl border border-amber-300/20 bg-amber-200/[.06] px-3 py-2 text-[11px] leading-relaxed text-amber-100/80">{error}</p>}
            </div>

            <form onSubmit={submit} className="flex items-center gap-2 border-t border-white/10 p-3">
              <label className="sr-only" htmlFor="portfolio-guide-question">Ask Sunny about Masum</label>
              <input id="portfolio-guide-question" value={question} onChange={(event) => setQuestion(event.target.value)} maxLength={700} disabled={!endpoint || busy} placeholder={endpoint ? 'Ask Sunny about Masum…' : 'AI connection is being set up'} className="min-w-0 flex-1 rounded-full border border-white/10 bg-black/35 px-4 py-3 text-xs text-bone outline-none placeholder:text-smoke focus:border-gold-bright/55 disabled:opacity-60" />
              <button type="submit" aria-label="Send question" disabled={!endpoint || busy || !question.trim()} className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold-bright text-lg font-semibold text-[#15120d] transition hover:bg-[#f0ce83] disabled:cursor-not-allowed disabled:opacity-45">↑</button>
            </form>
            <p className="px-4 pb-3 text-[9px] leading-relaxed text-smoke/80">Questions are processed by Google Gemini after setup. Don’t share private information. No live market data or personalized financial advice.</p>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label={open ? 'Close Sunny assistant' : 'Meet Sunny, Masum’s AI companion'}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="masum-ai-launch group relative grid h-[4.15rem] w-[4.15rem] place-items-center rounded-full border border-gold-bright/65 bg-[#111316] shadow-[0_8px_32px_rgba(0,0,0,.6),0_0_30px_rgba(217,180,106,.16)] transition hover:-translate-y-1 hover:border-gold-bright"
        animate={{ y: open ? 0 : [0, -4, 0] }}
        transition={{ y: open ? { duration: .2 } : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' } }}
        whileTap={{ scale: .94 }}
      >
        <SunnyAvatar mood={mood} />
        <span className="absolute -left-2 -top-2 rounded-full border border-gold-bright/40 bg-[#101113] px-2 py-1 text-[8px] font-bold uppercase tracking-[.12em] text-gold-bright shadow">{endpoint ? 'Meet Sunny' : 'Sunny · setup'}</span>
      </motion.button>
    </div>
  );
}
