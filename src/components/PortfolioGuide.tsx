import { useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { profile } from '../data/portfolio';

type Message = { from: 'guide' | 'visitor'; text: string };

const suggestions = ['What is Masum building?', 'Tell me about Siftmirth', 'What is his background?'];

function answerFor(question: string) {
  const q = question.toLowerCase();
  if (/siftmirth|gift|venture|business/.test(q)) return 'Siftmirth was Masum’s personalized gift business. He reports $375 in revenue, about $195 in net profit after listed costs, and a $1,000 sale price. The detailed venture case study is in the Ventures section.';
  if (/fund|prop|trade|trading|atlas|tradeify|profit|pnl|p&l|gold|market/.test(q)) return 'Masum is documenting his market research and trading process, including equity and gold views and a trade journal. His portfolio records passing both V Prop Trader phases and shares selected historical Atlas Funded trade examples. These are personal milestones, not investment advice.';
  if (/build|now|current|project|win with|youtube/.test(q)) return 'Masum is currently developing Win With Masum, publishing research on equities and gold, keeping a process-first trade journal, and studying Geography and Basics of AI at Midnapore City College. The Now section has the latest project snapshot.';
  if (/journey|background|story|creator|youtube|monee|coding|discord|skill/.test(q)) return 'Masum’s experience spans content creation, coding, entrepreneurship, and markets. He grew Monee Forum to 225K+ YouTube subscribers before selling it, built Discord bots with Python and JavaScript, and now studies Geography at Midnapore City College while developing Win With Masum.';
  if (/contact|email|linkedin|instagram|reach/.test(q)) return `You can reach Masum at ${profile.email}, or use the LinkedIn, YouTube, and Instagram links in the contact section.`;
  if (/finance|financial|personal finance|education|mission|goal/.test(q)) return 'Masum is interested in helping young people make more informed decisions through practical education about money, business, markets, and personal finance. His longer-term goal is a social enterprise that creates meaningful work and support for people with limited opportunities.';
  return 'I can help with Masum’s background, current projects, Siftmirth, market work, or contact details. Try one of the suggested questions, or explore the Now, Journey, Ventures, and Market Views sections.';
}

function MiniAvatar({ small = false, mood = 'friendly' }: { small?: boolean; mood?: 'friendly' | 'thinking' | 'happy' }) {
  return (
    <span className={`relative grid shrink-0 place-items-center overflow-hidden rounded-full border border-gold-bright/60 bg-[radial-gradient(circle_at_50%_24%,#4b3920,#181511_68%)] shadow-[0_0_24px_rgba(217,180,106,.18)] ${small ? 'h-9 w-9' : 'h-14 w-14'}`} aria-hidden="true">
      <svg viewBox="0 0 64 64" className="h-[90%] w-[90%]" fill="none">
        <path d="M17 25c0-13 7-20 16-20 10 0 17 8 17 20v9H17v-9Z" fill="#171719" stroke="#d9b46a" strokeWidth="1.8" />
        <path d="M21 25c2-7 6-11 12-11 7 0 11 4 14 11l-3 3-4-4-5 3-5-3-5 4-4-3Z" fill="#090a0c" />
        <path d="M24 34c0-5 3-8 8-8s8 3 8 8v6c0 6-3 10-8 10s-8-4-8-10v-6Z" fill="#dcae82" />
        {mood === 'thinking' ? <path d="M27 36h1m8 0h1" stroke="#171719" strokeWidth="2.6" strokeLinecap="round" /> : <path d="M26.5 36c1.3-1.2 2.7-1.2 4 0m3 0c1.3-1.2 2.7-1.2 4 0" stroke="#171719" strokeWidth="1.8" strokeLinecap="round" />}
        <path d={mood === 'thinking' ? 'M30 43c1.2-.5 2.8-.5 4 0' : mood === 'happy' ? 'M28 41c2 4 6 4 8 0' : 'M29 43c2 2 4 2 6 0'} stroke="#8b5544" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M15 63c1-11 8-17 17-17s16 6 17 17" fill="#101113" stroke="#d9b46a" strokeWidth="1.8" />
        <path d="m29 48 3 5 3-5" stroke="#f4f1ec" strokeWidth="2" strokeLinejoin="round" />
        <path d="M32 53v10" stroke="#d9b46a" strokeWidth="1.6" />
        <circle cx="51" cy="15" r="7" fill="#101113" stroke="#d9b46a" strokeWidth="1.5" />
        <path d="M51 11v8m-3-4h6" stroke="#f4f1ec" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
      {!small && <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#111316] bg-emerald-400" />}
    </span>
  );
}

export default function PortfolioGuide() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [thinking, setThinking] = useState(false);
  const [happy, setHappy] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: 'guide', text: 'Hey! I’m Masum’s portfolio guide. Ask me about his journey, projects, market work, or how to get in touch.' },
  ]);
  const listRef = useRef<HTMLDivElement>(null);

  const ask = (raw: string) => {
    const text = raw.trim();
    if (!text) return;
    setMessages((current) => [...current, { from: 'visitor', text }]);
    setQuestion('');
    setThinking(true);
    window.setTimeout(() => {
      setMessages((current) => [...current, { from: 'guide', text: answerFor(text) }]);
      setThinking(false);
      setHappy(true);
      window.setTimeout(() => setHappy(false), 1500);
      requestAnimationFrame(() => listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' }));
    }, 420);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    ask(question);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[95] sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.section
            aria-label="Masum’s portfolio guide"
            className="glass absolute bottom-[4.5rem] right-0 flex max-h-[min(76dvh,560px)] w-[min(360px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-gold-bright/25 bg-[#0d0f11]/95 shadow-[0_24px_80px_rgba(0,0,0,.65)] backdrop-blur-2xl sm:bottom-[5rem]"
            initial={{ opacity: 0, y: 18, scale: .96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: .98 }}
            transition={{ duration: .22 }}
          >
            <header className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5">
              <MiniAvatar small />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-bone">Masum’s AI Guide</p>
                <p className="mt-0.5 text-[10px] uppercase tracking-[.16em] text-smoke">Curated answers · public info</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close portfolio guide" className="grid h-9 w-9 place-items-center rounded-full text-lg text-mist transition hover:bg-white/10 hover:text-bone">×</button>
            </header>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
              {messages.map((message, index) => (
                <div key={`${index}-${message.from}`} className={`flex ${message.from === 'visitor' ? 'justify-end' : 'justify-start'}`}>
                  {message.from === 'guide' && <MiniAvatar small mood={happy ? 'happy' : 'friendly'} />}
                  <p className={`max-w-[84%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${message.from === 'visitor' ? 'ml-2 rounded-br-sm bg-gold-bright text-[#16120b]' : 'ml-2 border border-white/10 bg-white/[.055] text-bone/85'}`}>
                    {message.text}
                  </p>
                </div>
              ))}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pl-11 pt-1">
                  {suggestions.map((suggestion) => <button key={suggestion} type="button" onClick={() => ask(suggestion)} className="rounded-full border border-gold-bright/25 px-2.5 py-1.5 text-[10px] text-gold-bright transition hover:bg-gold-bright/10">{suggestion}</button>)}
                </div>
              )}
              {thinking && <div className="ml-11 flex items-center gap-1.5 text-[10px] text-smoke"><MiniAvatar small mood="thinking" /><span className="ml-1">Thinking</span><span className="animate-pulse text-gold-bright">•••</span></div>}
            </div>

            <form onSubmit={submit} className="flex items-center gap-2 border-t border-white/10 p-3">
              <label className="sr-only" htmlFor="portfolio-guide-question">Ask about Masum</label>
              <input id="portfolio-guide-question" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask about Masum…" className="min-w-0 flex-1 rounded-full border border-white/10 bg-black/30 px-4 py-2.5 text-xs text-bone outline-none placeholder:text-smoke focus:border-gold-bright/50" />
              <button type="submit" aria-label="Send question" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold-bright text-lg font-semibold text-[#15120d] transition hover:bg-[#f0ce83]">↑</button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label={open ? 'Close Masum’s AI Guide' : 'Open Masum’s AI Guide'}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="group relative grid h-14 w-14 place-items-center rounded-full border border-gold-bright/55 bg-[#111316] shadow-[0_8px_32px_rgba(0,0,0,.55),0_0_28px_rgba(217,180,106,.14)] transition hover:-translate-y-1 hover:border-gold-bright sm:h-16 sm:w-16"
        animate={{ y: open ? 0 : [0, -4, 0] }}
        transition={{ y: open ? { duration: .2 } : { duration: 3, repeat: Infinity, ease: 'easeInOut' } }}
        whileTap={{ scale: .94 }}
      >
        <span className="absolute inset-1 rounded-full border border-white/10" />
        <MiniAvatar small mood={happy ? 'happy' : thinking ? 'thinking' : 'friendly'} />
        <span className="absolute -left-2 -top-2 rounded-full border border-gold-bright/35 bg-[#101113] px-2 py-1 text-[8px] font-bold uppercase tracking-[.12em] text-gold-bright shadow">Ask Masum</span>
      </motion.button>
    </div>
  );
}
