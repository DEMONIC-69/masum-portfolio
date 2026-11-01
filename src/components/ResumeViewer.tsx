import { useState } from 'react';
import { motion } from 'framer-motion';
import { education, profile } from '../data/portfolio';
import { useSmoothScroll } from '../hooks/smoothScroll';
import { EASE, Magnetic, SectionHeading } from './fx';

export default function ResumeSection({ onView }: { onView: () => void }) {
  const { scrollTo } = useSmoothScroll();
  return (
    <>
      <SectionHeading kicker="Profile" title="The Full Story" />
      <div className="gutter grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.1, ease: EASE }}
          style={{ transformPerspective: 1600 }}
        >
          <CollapsibleSheet />
        </motion.div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-serif text-3xl italic leading-tight text-bone">A profile in progress.</p>
          <p className="mt-3 text-sm leading-relaxed text-mist">
            This profile brings together confirmed studies, milestones, platforms, and projects. Follow the Journey section for the timeline and current direction.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Magnetic className="w-full">
              <button
                type="button"
                data-cursor="link"
                onClick={() => scrollTo('#journey', { offset: -64 })}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-bone px-6 text-[15px] font-bold text-ink transition hover:bg-white"
              >
                Explore the Journey <span aria-hidden>↗</span>
              </button>
            </Magnetic>
            <Magnetic className="w-full">
              <button
                type="button"
                data-cursor="link"
                onClick={() => scrollTo('#now', { offset: -64 })}
                className="glass flex min-h-12 w-full items-center justify-center gap-2 rounded-md px-6 text-[15px] font-semibold text-bone transition hover:bg-white/15"
              >
                See What I’m Building <span aria-hidden>↗</span>
              </button>
            </Magnetic>
            <Magnetic className="w-full">
              <button
                type="button"
                data-cursor="view"
                onClick={onView}
                className="glass flex min-h-12 w-full items-center justify-center gap-2 rounded-md px-6 text-[15px] font-semibold text-bone transition hover:bg-white/15"
              >
                View Resume <span aria-hidden>↗</span>
              </button>
            </Magnetic>
          </div>
          {profile.resumePdf && (
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={profile.resumePdf}
                download
                data-cursor="link"
                className="glass flex min-h-12 w-full items-center justify-center gap-2 rounded-md px-6 text-[15px] font-semibold text-bone transition hover:bg-white/15"
              >
                ⤓ Download Resume
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function CollapsibleSheet() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <div className={`overflow-hidden transition-[max-height] duration-700 ease-[var(--ease-cine)] md:max-h-none ${open ? 'max-h-[4000px]' : 'max-h-[560px]'}`}>
        <FullStorySheet />
      </div>
      {!open && (
        <div className="absolute inset-x-0 bottom-0 flex h-48 items-end justify-center rounded-b-2xl bg-gradient-to-t from-ink via-ink/85 to-transparent pb-4 md:hidden">
          <button type="button" onClick={() => setOpen(true)} className="glass min-h-11 rounded-full px-5 text-sm font-semibold text-bone">
            Read the full story ↓
          </button>
        </div>
      )}
    </div>
  );
}

function FullStorySheet() {
  return (
    <article className="relative overflow-hidden rounded-2xl bg-[linear-gradient(180deg,#15171a,#0d0f11)] p-6 ring-1 ring-white/10 sm:p-10">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-bright/70 to-transparent" />
      <p className="text-[10px] font-bold tracking-[0.34em] text-gold-bright">A PROFILE IN PROGRESS</p>
      <h3 className="mt-2 font-display text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[0.9] tracking-wide text-bone">The Full Story</h3>
      <p className="mt-6 font-serif text-xl italic leading-relaxed text-bone sm:text-2xl">{profile.fullStory}</p>
      <section className="mt-8 border-t border-white/10 pt-6">
        <h4 className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-gold-bright">What I’m Curious About</h4>
        <div className="flex flex-wrap gap-2">
          {profile.interests.map((interest) => <span key={interest} className="rounded-full border border-white/10 px-3 py-1.5 text-[11px] text-mist">{interest}</span>)}
        </div>
      </section>
      <section className="mt-8 border-t border-white/10 pt-6">
        <h4 className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-gold-bright">Education</h4>
        {education.map((item) => (
          <div key={item.school}>
            <p className="text-sm font-semibold text-bone">{item.degree}</p>
            <p className="mt-1 text-xs text-mist">{item.school}, {item.place} · {item.period}</p>
            {item.currentCourses?.length ? <p className="mt-1 text-xs text-mist">Current coursework: {item.currentCourses.join(', ')}</p> : null}
          </div>
        ))}
      </section>
    </article>
  );
}

export function ResumeSheet() {
  const resumeSkills = [
    'Equity research', 'Commodity and gold research', 'Nasdaq index analysis', 'Capital allocation', 'Market analysis',
    'Business strategy', 'Personal finance planning', 'Financial consulting', 'Risk management', 'Position sizing',
    'Prop-firm trading', 'Python', 'JavaScript', 'Discord bot development', 'Community operations', 'Content strategy',
    'Audience growth', 'After Effects', 'Premiere Pro', 'Photoshop', 'E-commerce', 'Sales',
  ];
  const work = [
    {
      title: 'Independent Market Research & Prop-Firm Trading',
      org: 'Self-directed / Prop-firm programs', date: 'Ongoing',
      points: [
        'Research gold (XAUUSD), commodities, and Nasdaq indices; document market structure, catalysts, scenarios, and trade risk.',
        'Passed Atlas Funded evaluation and both V Prop Trader phases; secured $25K+ in live prop-firm funding across programs including FundingPips, FundedNext, Tradeify, SFX Funded, and Goat Funded Trader.',
      ],
    },
    {
      title: 'After Effects Specialist (Agency Collaboration)', org: 'MrVish.in', date: '2025',
      points: ['Produced video edits using After Effects, with Premiere Pro and Photoshop in the production workflow.'],
    },
    {
      title: 'Co-Founder, Digital Operations & Community', org: 'WifixCastle / BUNIVERSITY', date: '2022–2025 · community founded 2024',
      points: ['Supported creator and digital operations; @wifixcastle.ig reached 23.5K followers. Co-ran BUNIVERSITY, an 8,000-member Discord community.'],
    },
    {
      title: 'Community Operations & Discord Administration', org: 'TCS and Arrow Gaming', date: '2021–2022',
      points: ['Managed day-to-day operations for a 12,000+ member esports Discord, coordinated tournaments and participant support, then administered server structure, bots, moderation, permissions, and security for Arrow Gaming.'],
    },
  ];
  const botProjects = [
    { name: 'Multipurpose Bot V4', language: 'Python', url: 'https://replit.com/@IMMDEMON/Discord-Multipurpose-Bot-V4-LATEST' },
    { name: 'Krypton', language: 'Python', url: 'https://replit.com/@IMMDEMON/Krypton' },
    { name: 'All-in-One Bot', language: 'JavaScript', url: 'https://replit.com/@IMMDEMON/All-in-one-bot' },
    { name: 'Milrato 2024', language: 'JavaScript', url: 'https://github.com/DEMONIC-69/Milrato-2024' },
    { name: 'Pearl Music', language: 'JavaScript', url: 'https://github.com/DEMONIC-69/pearl-music' },
  ];

  const sectionClass = 'mt-8 border-t border-white/10 pt-6';
  const headingClass = 'mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-gold-bright';

  return (
    <article className="relative overflow-hidden rounded-2xl bg-[linear-gradient(180deg,#15171a,#0d0f11)] p-6 ring-1 ring-white/10 sm:p-10">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-bright/70 to-transparent" />
      <header className="mb-7 flex flex-wrap items-start justify-between gap-5 border-b border-white/10 pb-6">
        <div>
          <p className="text-[10px] font-bold tracking-[0.34em] text-smoke">CURRICULUM VITAE</p>
          <h3 className="mt-1 font-display text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[0.9] tracking-wide text-bone">{profile.resumeName}</h3>
          <p className="mt-3 text-xs font-semibold leading-relaxed tracking-[0.12em] text-mist">RESEARCH ANALYST <span className="text-gold-bright">|</span> BUSINESS STRATEGIST <span className="text-gold-bright">|</span> FINANCE SPECIALIST</p>
        </div>
        <div className="text-xs leading-relaxed text-mist sm:text-right">
          <p>Midnapore, West Bengal, India</p>
          <a href={`mailto:${profile.email}`} className="block hover:text-bone">{profile.email}</a>
          <a href="https://masumkaji.tech" target="_blank" rel="noreferrer" className="block hover:text-bone">Website ↗</a>
          {profile.links.linkedin && <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="block hover:text-bone">LinkedIn ↗</a>}
        </div>
      </header>

      <section>
        <h4 className={headingClass}>Professional Summary</h4>
        <p className="max-w-4xl text-sm leading-relaxed text-bone/85">Geography undergraduate and independent market researcher focused on gold and commodity markets, Nasdaq indices, equity research, and capital allocation. Built and sold Siftmirth ($375 revenue; sold for $1,000) and grew Monee Forum to 225K+ YouTube subscribers before its sale. Self-taught Python and JavaScript developer with experience in Discord bot development, community operations, and digital ventures. Interested in business strategy and practical financial education.</p>
      </section>

      <section className={sectionClass}>
        <h4 className={headingClass}>Skills</h4>
        <div className="flex flex-wrap gap-2">
          {resumeSkills.map((skill) => <span key={skill} className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[11px] text-mist">{skill}</span>)}
        </div>
      </section>

      {education.length > 0 && (
        <section className={sectionClass}>
          <h4 className={headingClass}>Education</h4>
          {education.map((e) => (
            <div key={e.school}>
              <div className="flex flex-wrap justify-between gap-x-3 gap-y-1">
                <p className="text-sm font-semibold text-bone">{e.degree}, {e.school}</p>
                <p className="text-xs text-smoke">2025–2029 (expected)</p>
              </div>
              <p className="mt-1 text-xs text-mist">{e.place} · Currently studying</p>
              {e.currentCourses && e.currentCourses.length > 0 && (
                <p className="mt-1 text-xs text-mist">Current coursework: {e.currentCourses.join(', ')}</p>
              )}
            </div>
          ))}
        </section>
      )}

      <section className={sectionClass}>
        <h4 className={headingClass}>Experience</h4>
        <div className="space-y-5">
          {work.map((item) => (
            <div key={item.title} className="border-l border-gold-bright/40 pl-4">
              <div className="flex flex-wrap justify-between gap-x-3 gap-y-1">
                <p className="text-sm font-semibold text-bone">{item.title}</p>
                <p className="text-xs text-smoke">{item.date}</p>
              </div>
              <p className="mt-1 text-xs text-gold-bright/90">{item.org}</p>
              <ul className="mt-2 list-disc space-y-1 pl-4">
                {item.points.map((point) => <li key={point} className="text-xs leading-relaxed text-mist">{point}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className={sectionClass}>
        <h4 className={headingClass}>Selected Ventures &amp; Projects</h4>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
            <p className="text-sm font-semibold text-bone">Siftmirth</p>
            <p className="mt-1 text-xs leading-relaxed text-mist">Built and sold a personalized gift store; generated $375 revenue and sold the business for $1,000 (2026).</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
            <p className="text-sm font-semibold text-bone">Monee Forum</p>
            <p className="mt-1 text-xs leading-relaxed text-mist">Grew an online income and business education YouTube channel to 225K+ subscribers and sold it.</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="mb-2 text-xs font-semibold text-bone">Discord bots <span className="font-normal text-mist">· Python / JavaScript</span></p>
          <div className="flex flex-wrap gap-2">
            {botProjects.map((project) => <a key={project.name} href={project.url} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 px-3 py-1.5 text-[11px] text-mist transition hover:border-gold-bright/50 hover:text-bone">{project.name} · {project.language} ↗</a>)}
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <h4 className={headingClass}>Achievements &amp; Certifications</h4>
        <ul className="space-y-3">
          <li className="text-xs leading-relaxed text-mist"><span className="font-semibold text-bone">Tradeify Grand Cup:</span> ranked #2,360 worldwide in the $1M competition; $50,000 prop account reached $54,905.36 (+$4,905.36).</li>
          <li className="text-xs leading-relaxed text-mist"><span className="font-semibold text-bone">Atlas Funded:</span> evaluation passed; documented XAUUSD closed-trade profit examples of $1,211, $448, and $232.60.</li>
          <li className="text-xs leading-relaxed text-mist"><span className="font-semibold text-bone">V Prop Trader:</span> Challenge and Evaluation phases passed (January 2026).</li>
          <li className="text-xs leading-relaxed text-mist"><span className="font-semibold text-bone">LearnTube.ai / OSB Group:</span> Introduction to Forex Trading, course completion, 30 June 2025.</li>
          <li className="text-xs leading-relaxed text-mist"><span className="font-semibold text-bone">Certificates:</span> Atlas Funded evaluation achievement; V Prop Trader Challenge and Evaluation certificates.</li>
        </ul>
      </section>
    </article>
  );
}
