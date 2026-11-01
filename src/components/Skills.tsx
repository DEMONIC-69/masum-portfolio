import { useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { skillCategories, skillEvidence, type Skill } from '../data/portfolio';
import { EASE, SectionHeading } from './fx';

const HUES = ['#d9b46a'];

const ICONS: Record<string, ReactNode> = {
  'Global Markets': <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></>,
  'Commodity Markets': <><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5M12 13v8"/></>,
  'Capital Allocation': <><path d="M4 7h15l-3-3M20 17H5l3 3"/><path d="M19 7 16 4M5 17l3 3"/></>,
  'Market Research': <><path d="M4 19V5M4 19h17"/><path d="m7 15 4-4 3 2 6-7"/><circle cx="20" cy="6" r="1"/></>,
  'Prop Trading': <><path d="M4 20V9m5 11V4m5 16v-8m5 8V6"/><path d="M2 12h4m1-5h4m1 8h4m1-6h4"/></>,
  YouTube: <><rect x="3" y="5" width="18" height="14" rx="4"/><path d="m10 9 5 3-5 3V9Z"/></>,
  'Audience Growth': <><path d="M4 19V5m0 14h17"/><path d="m7 15 4-4 3 2 6-7m-5 0h5v5"/></>,
  'Social Media': <><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="m8.2 10.8 7.5-3.6m-7.5 6 7.5 3.6"/></>,
  'Community Operations': <><circle cx="9" cy="8" r="3"/><path d="M3 20v-1a6 6 0 0 1 12 0v1M16 5.5a3 3 0 0 1 0 5.8m2 3a5 5 0 0 1 3 4.7V20"/></>,
  'Content Strategy': <><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4.5h6M8 10h8m-8 4h8m-8 4h5"/></>,
  'After Effects': <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 9h3m-3 3h5m2-3h3m-3 3h4M7 16h4m2 0h4"/></>,
  'Premiere Pro': <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 5v14m10-14v14M3 9h4m10 0h4M3 15h4m10 0h4"/></>,
  Photoshop: <><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="9" r="1.5"/><path d="m5 17 5-5 3 3 2-2 4 4"/></>,
  'Video Editing': <><circle cx="6" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><path d="m8 7 12 10M8 17 20 7m-9 2 2-2m-2 10 2 2"/></>,
  Python: <><path d="M12 3H8a3 3 0 0 0-3 3v4h8v2H5v3a3 3 0 0 0 3 3h4v-5h2v5h2a3 3 0 0 0 3-3v-4H11V9h8V6a3 3 0 0 0-3-3h-4Z"/><circle cx="9" cy="6" r=".7" fill="currentColor" stroke="none"/><circle cx="15" cy="18" r=".7" fill="currentColor" stroke="none"/></>,
  JavaScript: <><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M11 8v7a2 2 0 0 1-4 0m7-1a2 2 0 0 0 4 0c0-2-4-1-4-4a2 2 0 0 1 4 0"/></>,
  'Discord Bots': <><rect x="4" y="7" width="16" height="13" rx="4"/><path d="M8 7 7 4m9 3 1-3M9 13h.01M15 13h.01M9 17c2 1 4 1 6 0"/></>,
  'Bot Features': <><path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1m0-12.8-2.1 2.1m-8.6 8.6-2.1 2.1"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></>,
  'Chat-based Games': <><path d="M7 9h10a4 4 0 0 1 3.8 5.2l-.7 2.3a2 2 0 0 1-3.2 1l-2.2-1.7h-5l-2.2 1.7a2 2 0 0 1-3.2-1l-.7-2.3A4 4 0 0 1 7 9Z"/><path d="M8 12v4m-2-2h4m6-.5h.01M18 15.5h.01"/></>,
  Entrepreneurship: <><rect x="3" y="8" width="18" height="12" rx="2"/><path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-13 5h18m-11-1v2h4v-2"/></>,
  Sales: <><path d="M4 12h13m-4-4 4 4-4 4"/><path d="M5 6h4m-4 12h4"/><circle cx="19" cy="12" r="2"/></>,
  'E-commerce': <><path d="M3 4h2l2 11h11l3-8H6"/><circle cx="9" cy="19" r="1.5"/><circle cx="17" cy="19" r="1.5"/></>,
  'Community Building': <><circle cx="9" cy="8" r="3"/><path d="M3 20v-1a6 6 0 0 1 12 0v1m1-12a3 3 0 0 1 0 5m2 2a5 5 0 0 1 3 4v1"/></>,
  'Business Operations': <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.2h-2.6v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H6.3v-2.6h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5v-.2H15v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.2V14h-.2a1.7 1.7 0 0 0-1.5 1Z"/></>,
};

export default function Skills() {
  const [cat, setCat] = useState(0);
  const category = skillCategories[cat];
  const hue = HUES[cat % HUES.length];

  if (!category) {
    return (
      <>
        <SectionHeading kicker="Skills & tools" title="My Skill Universe" />
        <p className="gutter text-sm text-mist">Skills will be grouped by the work and projects they support.</p>
      </>
    );
  }

  return (
    <>
      <SectionHeading kicker="Capabilities" title="My Skill Universe" aside={<p className="max-w-xs text-sm text-mist">A focused map of the tools and capabilities used across markets, content, creative work, coding, and ventures.</p>} />

      <div className="gutter grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-14">
        {/* genre list */}
        <div className="rail -mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0" role="tablist" aria-label="Skill categories">
          {skillCategories.map((c, i) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={i === cat}
              onClick={() => setCat(i)}
              className={`group relative shrink-0 rounded-lg px-4 py-3 text-left transition lg:px-5 ${i === cat ? 'text-bone' : 'text-smoke hover:text-bone'}`}
            >
              {i === cat && <motion.span layoutId="skill-tab" className="absolute inset-0 rounded-lg bg-white/[0.07] ring-1 ring-white/10" transition={{ duration: 0.45, ease: EASE }} />}
              {i === cat && <motion.span layoutId="skill-bar" className="absolute bottom-2 left-0 top-2 hidden w-[3px] rounded lg:block" style={{ background: hue }} />}
              <span className="relative block font-display text-2xl tracking-wide lg:text-3xl">{c.title}</span>
              <span className="relative hidden text-xs text-smoke lg:block">
                {c.skills.length} skills · {c.subtitle}
              </span>
            </button>
          ))}
        </div>

        {/* skill cards */}
        <div className="min-h-[340px]">
          <AnimatePresence mode="wait">
            <motion.div key={category.id} initial="hidden" animate="show" exit="exit" transition={{ staggerChildren: 0.05 }}>
              <motion.p
                className="mb-5 text-sm text-mist"
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1 }, exit: { opacity: 0 } }}
              >
                <span className="font-semibold text-bone">{category.title}</span> — {category.subtitle}
              </motion.p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                {category.skills.map((s) => (
                  <SkillCard key={s.name} skill={s} hue={hue} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

function SkillCard({ skill, hue }: { skill: Skill; hue: string }) {
  const [open, setOpen] = useState(false);
  const evidence = skillEvidence[skill.name];

  return (
    <motion.button
      type="button"
      onHoverStart={() => setOpen(true)}
      onHoverEnd={() => setOpen(false)}
      onClick={() => setOpen((o) => !o)}
      aria-expanded={open}
      variants={{
        hidden: { opacity: 0, y: 24, scale: 0.94, filter: 'blur(6px)' },
        show: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.55, ease: EASE } },
        exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
      }}
      whileHover={{ y: -6 }}
      className="group relative flex min-h-[148px] flex-col overflow-hidden rounded-xl bg-ink-2 p-4 text-left ring-1 ring-white/10 transition-shadow duration-500 hover:ring-white/20"
      style={{ boxShadow: open ? `0 18px 50px -12px ${hue}55, 0 0 0 1px ${hue}66` : undefined }}
    >
      <div aria-hidden className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition duration-500 group-hover:opacity-60" style={{ background: hue }} />
      <motion.span
        className="relative flex h-12 w-12 items-center justify-center rounded-lg"
        style={{ background: `${hue}1f`, color: hue, boxShadow: `inset 0 0 0 1px ${hue}55` }}
        animate={open ? { rotate: [0, -8, 8, 0], scale: 1.08 } : { rotate: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        aria-hidden
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          {ICONS[skill.name] ?? <><circle cx="12" cy="12" r="9"/><path d="M8 12h8m-4-4v8"/></>}
        </svg>
      </motion.span>
      <span className="relative mt-4 flex items-center gap-2 text-[15px] font-semibold text-bone">
        {skill.name}
        {skill.note && (
          <span className="rounded px-1.5 py-px text-[9px] font-bold uppercase tracking-wider text-ink" style={{ background: hue }}>
            {skill.note}
          </span>
        )}
      </span>
      <AnimatePresence initial={false}>
        {open && evidence && (
          <motion.span
            className="relative mt-2 block text-[11px] leading-snug text-mist"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {evidence.join(' · ')}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
