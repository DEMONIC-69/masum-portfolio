import { useState } from 'react';
import { motion } from 'framer-motion';
import { achievements, certifications, education, experience, profile, projects, skillCategories } from '../data/portfolio';
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
              <Magnetic className="w-full">
                <a
                  href={profile.resumePdf}
                  download
                  data-cursor="link"
                  className="glass flex min-h-12 w-full items-center justify-center gap-2 rounded-md px-6 text-[15px] font-semibold text-bone transition hover:bg-white/15"
                >
                  ⤓ Download Resume
                </a>
              </Magnetic>
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
        <ResumeSheet />
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

function H({ children }: { children: string }) {
  return <h4 className="mb-3 mt-7 border-b border-white/10 pb-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-gold-bright first:mt-0">{children}</h4>;
}

export function ResumeSheet() {
  const hasDetails =
    education.length + experience.length + projects.length + skillCategories.length + achievements.length + certifications.length > 0;

  return (
    <article className="relative overflow-hidden rounded-2xl bg-[linear-gradient(180deg,#15171a,#0d0f11)] p-6 ring-1 ring-white/10 sm:p-10">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-bright/70 to-transparent" />
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <p className="text-[10px] font-bold tracking-[0.34em] text-smoke">PROFILE</p>
          <h3 className="mt-1 font-display text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[0.9] tracking-wide text-bone">{profile.fullName}</h3>
          <p className="mt-2 text-xs font-semibold tracking-[0.18em] text-mist">{profile.role}</p>
        </div>
        <div className="text-xs leading-relaxed text-mist sm:text-right">
          {profile.location && <p>{profile.location}</p>}
          {profile.email && <a href={`mailto:${profile.email}`} className="block hover:text-bone">{profile.email}</a>}
          {profile.links.linkedin && <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="block hover:text-bone">LinkedIn ↗</a>}
          {profile.links.youtube && <a href={profile.links.youtube} target="_blank" rel="noreferrer" className="block hover:text-bone">YouTube ↗</a>}
          {profile.links.instagram && <a href={profile.links.instagram} target="_blank" rel="noreferrer" className="block hover:text-bone">Instagram ↗</a>}
          {profile.links.github && <a href={profile.links.github} target="_blank" rel="noreferrer" className="block hover:text-bone">GitHub ↗</a>}
        </div>
      </header>

      <p className="font-serif text-2xl italic leading-snug text-bone">{profile.fullStory}</p>

      {!hasDetails && <p className="mt-6 text-sm text-mist">Education, work, projects, skills, and milestones have not been added yet.</p>}

      {education.length > 0 && (
        <section>
          <H>Education</H>
          {education.map((e) => (
            <div key={e.school} className="mb-4">
              <div className="flex flex-wrap justify-between gap-x-3">
                <p className="text-sm font-semibold text-bone">{e.school}, {e.place}</p>
                <p className="text-xs text-smoke">{e.period}</p>
              </div>
              <p className="text-xs text-mist">{e.degree} · <span className="text-bone/80">{e.score}</span></p>
              {e.currentCourses && e.currentCourses.length > 0 && (
                <p className="mt-1 text-xs text-mist">Current coursework: {e.currentCourses.join(', ')}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {experience.length > 0 && (
        <section>
          <H>Work Experience</H>
          {experience.map((x) => (
            <div key={x.company}>
              <div className="flex flex-wrap justify-between gap-x-3">
                <p className="text-sm font-semibold text-bone">{x.company} — {x.role}</p>
                <p className="text-xs text-smoke">{x.period}</p>
              </div>
              <ul className="mt-2 space-y-1.5">
                {x.points.map((point) => <li key={point} className="text-xs leading-relaxed text-mist">{point}</li>)}
              </ul>
            </div>
          ))}
        </section>
      )}

      {projects.length > 0 && (
        <section>
          <H>Projects</H>
          {projects.map((p) => <p key={p.id} className="mb-3 text-sm text-bone">{p.title} <span className="text-xs text-mist">· {p.year} · {p.stack.join(', ')}</span></p>)}
        </section>
      )}

      {skillCategories.length > 0 && (
        <section>
          <H>Skills</H>
          {skillCategories.map((c) => <p key={c.id} className="mb-2 text-xs leading-relaxed text-mist"><span className="font-semibold text-bone">{c.title}: </span>{c.skills.map((s) => s.name).join(', ')}</p>)}
        </section>
      )}

      {achievements.length > 0 && (
        <section>
          <H>Achievements</H>
          {achievements.map((a) => <p key={a.id} className="mb-2 text-xs leading-relaxed text-mist"><span className="font-semibold text-bone">{a.title} — {a.org}. </span>{a.detail}</p>)}
        </section>
      )}

      {certifications.length > 0 && (
        <section>
          <H>Certifications</H>
          {certifications.map((c) => <p key={c.name} className="mb-2 text-xs leading-relaxed text-mist">{c.issuer}: {c.name}</p>)}
        </section>
      )}
    </article>
  );
}
