import { useEffect, useState } from 'react';

const endpoint = 'https://masum-portfolio-visitor-counter.masumkaji.workers.dev';
const sessionKey = 'masum-portfolio-visit-counted';

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadCount() {
      try {
        let countedThisSession = false;
        try {
          countedThisSession = sessionStorage.getItem(sessionKey) === '1';
        } catch {
          // Count this page visit when browser storage is unavailable.
        }

        const response = countedThisSession
          ? await fetch(`${endpoint}/count`, { cache: 'no-store' })
          : await fetch(`${endpoint}/visit`, { method: 'POST', cache: 'no-store' });

        if (!response.ok) throw new Error('Counter request failed');
        const result = (await response.json()) as { total?: number };
        if (typeof result.total !== 'number' || !Number.isFinite(result.total)) {
          throw new Error('Counter returned an invalid total');
        }

        if (!countedThisSession) {
          try {
            sessionStorage.setItem(sessionKey, '1');
          } catch {
            // The counter still works; a later page load may count again.
          }
        }

        if (active) setCount(result.total);
      } catch {
        if (active) setAvailable(false);
      }
    }

    void loadCount();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="mx-auto mt-8 flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2.5 text-left">
      <span aria-hidden="true" className="relative flex h-2.5 w-2.5 shrink-0">
        {available && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-bright/60" />}
        <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${available ? 'bg-gold-bright' : 'bg-smoke'}`} />
      </span>
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mist sm:text-[11px]">
        {count !== null ? (
          <><span className="mr-1.5 font-mono text-sm font-bold tabular-nums text-gold-bright">{count.toLocaleString()}</span> lifetime visits</>
        ) : available ? 'Loading visit count…' : 'Visit count unavailable'}
      </span>
      <span className="sr-only" aria-live="polite">{count === null ? '' : `${count.toLocaleString()} lifetime site visits`}</span>
    </div>
  );
}
