import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { profile, viewerProfiles, type ProfileId } from '../data/portfolio';
import { EASE } from './fx';

type AudienceProfileId = Exclude<ProfileId, 'masum'>;

function AudienceIcon({ id, size }: { id: AudienceProfileId; size: 'sm' | 'lg' }) {
  const iconSize = size === 'lg'
    ? 'h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-bone drop-shadow-[0_8px_18px_rgba(217,180,106,0.2)]'
    : 'h-5 w-5 text-bone';

  if (id === 'recruiter') {
    return (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className={iconSize} aria-hidden="true">
        <path d="M12 24h40a4 4 0 0 1 4 4v25a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V28a4 4 0 0 1 4-4Z" />
        <path d="M22 24v-6a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v6M8 35h48" />
        <path d="M28 35v8h8v-8" stroke="#f0d18d" />
        <path d="M17 24v-2M47 24v-2" />
      </svg>
    );
  }

  if (id === 'investor') {
    return (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className={iconSize} aria-hidden="true">
        <path d="M10 54h44" />
        <rect x="15" y="35" width="8" height="19" rx="2" />
        <rect x="28" y="28" width="8" height="26" rx="2" />
        <rect x="41" y="20" width="8" height="34" rx="2" />
        <path d="m13 29 13-9 9 4 17-13" stroke="#f0d18d" />
        <path d="M44 11h8v8" stroke="#f0d18d" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={iconSize} aria-hidden="true">
      <path d="M10 18h44M10 32h44M10 46h44" strokeOpacity="0.24" />
      <path d="M17 12v40M31 18v34M45 10v42" />
      <rect x="12" y="23" width="10" height="13" rx="1.5" stroke="#f0d18d" />
      <rect x="26" y="30" width="10" height="12" rx="1.5" />
      <rect x="40" y="19" width="10" height="16" rx="1.5" stroke="#f0d18d" />
    </svg>
  );
}

export function ProfileAvatar({ id, size = 'lg' }: { id: ProfileId; size?: 'sm' | 'lg' }) {
  const p = viewerProfiles.find((v) => v.id === id)!;
  const box = size === 'lg' ? 'h-24 w-24 sm:h-32 sm:w-32 md:h-36 md:w-36 rounded-xl' : 'h-8 w-8 rounded-md';
  if (id === 'masum') {
    return (
      <span className={`relative block overflow-hidden ${box}`} style={{ background: 'radial-gradient(circle at 50% 30%, #29251b, #111316)' }}>
        <img src={profile.portrait.src} alt="" className="absolute inset-x-0 bottom-0 mx-auto h-[115%] w-auto max-w-none object-contain object-bottom" />
      </span>
    );
  }
  return (
    <span
      className={`relative flex items-center justify-center overflow-hidden font-display text-bone ${box}`}
      style={{ background: `linear-gradient(145deg, ${p.color}, #0b0b10 120%)` }}
    >
      <AudienceIcon id={id} size={size} />
    </span>
  );
}

export default function ProfileSelector({ onPick }: { onPick: (id: ProfileId) => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onPick('masum');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onPick]);

  return (
    <motion.div
      className="fixed inset-0 z-[110] flex flex-col items-center justify-center overflow-y-auto bg-ink px-4 py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.08, filter: 'blur(10px)' }}
      transition={{ duration: 0.7, ease: EASE }}
      role="dialog"
      aria-label="Who's watching?"
    >
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(217,180,106,0.06),transparent_70%)]" />
      <motion.h2
        className="relative mb-10 text-center font-sans text-3xl font-medium tracking-tight text-bone sm:text-5xl"
        initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        Who&apos;s watching?
      </motion.h2>
      <motion.ul
        className="relative grid grid-cols-2 gap-6 sm:flex sm:gap-8"
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.08, delayChildren: 0.2 }}
      >
        {viewerProfiles.map((p) => (
          <motion.li key={p.id} variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}>
            <button type="button" onClick={() => onPick(p.id)} data-cursor="play" className="group flex flex-col items-center gap-3 text-center">
              <span className="relative rounded-xl ring-2 ring-transparent transition duration-300 group-hover:scale-105 group-hover:ring-bone group-focus-visible:ring-bone">
                <ProfileAvatar id={p.id} />
                {p.id === 'masum' && (
                  <span className="absolute -left-2 -top-2 rounded-full bg-gold px-2 py-0.5 text-[9px] font-bold tracking-[0.18em] text-ink">MAIN</span>
                )}
              </span>
              <span className="font-sans text-sm font-medium text-mist transition group-hover:text-bone sm:text-base">{p.name}</span>
              <span className="max-w-[9rem] text-[11px] leading-snug text-smoke">{p.blurb}</span>
            </button>
          </motion.li>
        ))}
      </motion.ul>
      <p className="relative mt-12 max-w-md text-center text-xs leading-relaxed text-smoke">
        Every profile starts with {profile.displayName}&apos;s portfolio and changes what plays first.
      </p>
    </motion.div>
  );
}
