/** Central portfolio data. Keep entries limited to facts Masum has confirmed. */

const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

export type Palette = { from: string; via: string; to: string; accent: string };

export const profile = {
  fullName: 'MASUM KAJI',
  displayName: 'Masum Kaji',
  originalLabel: 'MASUM KAJI',
  role: 'RESEARCH ANALYST • CAPITAL ALLOCATOR • COMMODITY RESEARCHER',
  tagline: ['RESEARCH ANALYST', 'CAPITAL ALLOCATOR', 'COMMODITY RESEARCHER'],
  intro: 'I’m a research analyst specializing in short- and long-term capital allocation across global assets, with a focus on commodity markets. I’m also a prop firm trader.',
  location: undefined as string | undefined,
  email: 'masumkaji07@gmail.com',
  links: { linkedin: 'https://www.linkedin.com/in/masum-kaji-543a38266/', youtube: 'https://youtube.com/@winwithmasum', instagram: 'https://www.instagram.com/winwithmasum/' } as { linkedin?: string; github?: string; youtube?: string; instagram?: string },
  resumePdf: undefined as string | undefined,
  portrait: {
    src: publicAsset('assets/portrait-1100.webp'),
    srcSet: `${publicAsset('assets/portrait-420.webp')} 420w, ${publicAsset('assets/portrait-720.webp')} 720w, ${publicAsset('assets/portrait-1100.webp')} 1100w`,
    alt: 'Portrait of Masum Kaji.',
  },
  interests: [] as string[],
};

export type Metric = { value: string; label: string };
export type Project = {
  id: string;
  title: string;
  year: string;
  genre: string;
  logline: string;
  stack: string[];
  build: string[];
  features: string[];
  metrics: Metric[];
  github?: string;
  palette: Palette;
  motif: 'shield' | 'flow' | 'tenants';
};
export const projects: Project[] = [];

export type Achievement = { id: string; title: string; org: string; detail: string; laurel: string; link?: string };
export const achievements: Achievement[] = [
  {
    id: 'tradeify-grand-cup',
    title: 'Grand Cup',
    org: 'Tradeify',
    detail: 'Grew a $50,000 prop account to $54,905.36, a $4,905.36 gain, and ranked #2,360 worldwide in Tradeify’s $1M Grand Cup.',
    laurel: 'WORLD RANK #2,360',
    link: publicAsset('certificates/tradeify-grand-cup.webp'),
  },
  {
    id: 'atlas-funded',
    title: 'One Step Access',
    org: 'Atlas Funded',
    detail: 'Passed the evaluation and received Atlas Funded trader status.',
    laurel: 'EVALUATION PASSED',
    link: publicAsset('certificates/atlas-funded-one-step-certificate.webp'),
  },
  {
    id: 'v-prop-challenge',
    title: 'Challenge Passed',
    org: 'V Prop Trader',
    detail: 'Passed the $1,000 Challenge Phase and advanced to the Evaluation Phase.',
    laurel: 'CHALLENGE PASSED',
    link: publicAsset('certificates/v-prop-challenge-certificate.webp'),
  },
  {
    id: 'siftmirth',
    title: 'Siftmirth',
    org: 'Business Built & Sold',
    detail: 'Built a personalized gift company, generated $375 in revenue, and sold the business for $1,000.',
    laurel: 'FOUNDED & SOLD',
    link: publicAsset('certificates/siftmirth-revenue-evidence.webp'),
  },
  {
    id: 'monee-forum',
    title: 'Monee Forum',
    org: 'YouTube Channel • Built & Sold',
    detail: 'Grew an online income and business education channel to 225K+ subscribers, then sold it.',
    laurel: '225K+ SUBSCRIBERS',
    link: publicAsset('certificates/monee-forum-subscriber-evidence.webp'),
  },
];
export type Certification = { issuer: string; name: string; link: string };
export const certifications: Certification[] = [
  {
    issuer: 'NISM • SEBI',
    name: 'National Financial Literacy Quiz 2026 (Online Round) — Participation, Midnapore City College (UG Category)',
    link: publicAsset('certificates/national-financial-literacy-quiz-2026.pdf'),
  },
  {
    issuer: 'NISM • SEBI',
    name: 'SEBI Investor Awareness Test — Participation, March 26, 2026',
    link: publicAsset('certificates/sebi-investor-awareness-test-2026.pdf'),
  },
  {
    issuer: 'Mahindra Rise • Breath Beings',
    name: 'The Quiet Power Quiz — Participation, 2026',
    link: publicAsset('certificates/quiet-power-quiz-2026.pdf'),
  },
  {
    issuer: 'Atlas Funded',
    name: 'One Step Access — Evaluation Completion',
    link: publicAsset('certificates/atlas-funded-one-step-certificate.webp'),
  },
  {
    issuer: 'V Prop Trader',
    name: 'Trading Challenge — Challenge Phase Passed, 12 January 2026',
    link: publicAsset('certificates/v-prop-challenge-certificate.webp'),
  },
  {
    issuer: 'LearnTube.ai • OSB Group',
    name: 'Introduction to Forex Trading — Course Completion, 30 June 2025',
    link: publicAsset('certificates/learntube-forex-trading-certificate.webp'),
  },
];

export type Skill = { name: string; mono: string; note?: string };
export type SkillCategory = { id: string; title: string; subtitle: string; skills: Skill[] };
export const skillCategories: SkillCategory[] = [];
export const skillEvidence: Record<string, string[]> = {};

export type Education = { school: string; place: string; degree: string; period: string; score: string };
export const education: Education[] = [];
export type Experience = { company: string; role: string; place: string; period: string; points: string[] };
export const experience: Experience[] = [];

export type Episode = { code: string; title: string; description: string; tags: string[]; runtime: string; palette: Palette };
export type Season = { number: number; title: string; period: string; synopsis: string; episodes: Episode[] };
export const seasons: Season[] = [];

export type TopPick = { label: string; title: string; detail: string; palette: Palette };
export const topPicks: TopPick[] = [];

export type IntroSlide = { kicker: string; title: string; lines: string[]; chips?: string[] };
export const introSlides: IntroSlide[] = [
  {
    kicker: 'Introduction',
    title: 'Masum Kaji',
    lines: ['Specializing in short- and long-term capital allocation across global assets.', 'Focused on commodity markets. Prop firm trader.'],
  },
];

export type ProfileId = 'masum' | 'recruiter' | 'investor' | 'trader';
export type SectionId = 'about' | 'journey' | 'originals' | 'picks' | 'skills' | 'moments' | 'story';

const order: SectionId[] = ['about', 'journey', 'originals', 'picks', 'skills', 'moments', 'story'];
export const viewerProfiles: { id: ProfileId; name: string; blurb: string; color: string; order: SectionId[] }[] = [
  { id: 'masum', name: 'Masum', blurb: 'The full portfolio', color: '#d9b46a', order },
  { id: 'recruiter', name: 'Recruiter', blurb: 'Profile and work first', color: '#d9b46a', order: ['story', 'moments', 'skills', 'originals', 'about', 'journey', 'picks'] },
  { id: 'investor', name: 'Investor', blurb: 'Research and allocation first', color: '#b38a3b', order: ['originals', 'picks', 'skills', 'journey', 'moments', 'about', 'story'] },
  { id: 'trader', name: 'Trader', blurb: 'Markets and trading first', color: '#e5c886', order: ['originals', 'journey', 'picks', 'skills', 'moments', 'about', 'story'] },
];

const neutral: Palette = { from: '#111316', via: '#27251f', to: '#090a0c', accent: '#d9b46a' };
export const sectionMeta: Record<SectionId, { nav: string; card: string; meta: string; palette: Palette }> = {
  about: { nav: 'About', card: 'About Masum', meta: 'Research Analyst • Prop Firm Trader', palette: neutral },
  journey: { nav: 'Journey', card: 'My Journey', meta: 'Background and milestones', palette: neutral },
  originals: { nav: 'Research', card: 'Research & Ideas', meta: 'Market analysis and research notes', palette: neutral },
  picks: { nav: 'Highlights', card: 'Highlights', meta: 'Selected highlights', palette: neutral },
  skills: { nav: 'Skills', card: 'My Skills', meta: 'Skills and tools', palette: neutral },
  moments: { nav: 'Milestones', card: 'Milestones', meta: 'Achievements and credentials', palette: neutral },
  story: { nav: 'Profile', card: 'Profile', meta: 'Profile details', palette: neutral },
};
